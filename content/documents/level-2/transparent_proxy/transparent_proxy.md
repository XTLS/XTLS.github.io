---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: 透明代理入门 
weight: 1
---

## 1. 什么是透明代理
透明代理简单地说就是不让被代理的设备感觉到自己被代理了，即被代理的设备上不需要运行任何代理软件(比如Xray、V2RayNG等)，当你连接上网络时，你的设备就已经被代理了。

这也意味着，代理的软件运行在别的地方。比如让代理软件运行在路由器中，通过路由器上网的设备就自动被代理了。
## 2. 透明代理的实现
透明代理的实现目前主要有两种方式：

### 2.1 tun2socks

可用于Windows/Linux(包括安卓)系统。实现过程比较简单，这里简单描述一下：

**Windows**

1. 安装 **[Netch](https://github.com/NetchX/Netch/releases)** ，使用模式`[3] Bypass LAN`启动。

2. 开启热点

3. 打开`控制面板`->`网络和 Internet`->`网络和共享中心`->`更改适配器设置`，找到`aioCloud`和`Microsoft Wi-Fi Direct Virtual Adapter`。

4. 鼠标右键点击`aioCloud`，`属性`->`共享`，勾选`允许其他网络用户通过此计算机的 Internet 连接来连接`，在`家庭网络连接`中选择`Microsoft Wi-Fi Direct Virtual Adapter`对应的网络连接，点击确定。

**Android**

1. 配置连接V2RayNG

2. 开启热点

3. 热点设置 -> 允许热点使用VPN(部分安卓系统可能没有这个选项，就开不了)

### 2.2 iptables/nftables

iptables与nftables实现透明代理的原理相同，下文统称iptables。

基于iptables的透明代理实现只能用于Linux系统(如OpenWRT/安卓)。由于其比tun2socks更高效率以及适合在路由器中配置而广泛使用。

现存的三篇白话文透明代理教程其实讲的都是基于这种方案的透明代理实现，它们是： **[新 V2Ray 白话文指南-透明代理](https://guide.v2fly.org/app/transparent_proxy.html)** 、 **[新 V2Ray 白话文指南-透明代理(TPROXY)](https://guide.v2fly.org/app/tproxy.html)** 、 **[透明代理（TProxy）配置教程](../../tproxy)** 。其中第一篇是基于iptables-redirect模式，已经过时了，不建议使用，仅供参考。第二篇和第三篇讲的都是基于iptables-tproxy模式的透明代理实现。

## 3. iptables实现透明代理原理
Linux使用`Netfilter`模型来管理网络，`Netfilter`模型如下：

![Netfilter](../netfilter.png)

**假设使用路由器作为网关(即我们平时的上网方式)，那么：**

局域网设备通过路由器访问互联网的流量方向：

`PREROUTING链->FORWARD链->POSTINGROUTING链`

局域网设备访问路由器的流量(如登陆路由器web管理界面/ssh连接路由器/访问路由器的dns服务器等)方向：

`PREROUTING链->INPUT链->网关本机`

路由器访问互联网的流量方向：

`网关本机->OUTPUT链->POSTINGROUTING链`

**通过使用iptables操控`PREROUTING链`和`OUTPUT链`的流量走向，转发到Xray，就可以代理局域网设备和网关本机。**
## 4. 透明代理难在哪里

透明代理的难点就在于路由，所谓路由，就是区分哪些流量是直连的，哪些该被代理，所以我个人认为叫做**分流**更加合适。

我们可以把路由由易到难分为以下几个阶段：

1. 代理全部请求

2. 本地局域网IP/组播IP请求直连，其它请求代理

3. 在2的基础上直连Xray发起的连接请求

4. 在3的基础上直连指向中国大陆IP的连接请求，并对国内外域名选择国内外DNS服务器解析。

上面说的三篇白话文透明代理教程，都是在第四阶段。所以新手直接阅读可能显得有点难懂。

## 5. 从零开始一步步实现基于iptables-tproxy的透明代理
### 5.1 在开始之前，你需要有一定的基础知识：
1. 大致了解TCP/IP协议簇(如IP/子网掩码/网段/子网规划/TCP协议/UDP协议/端口)、域名和DNS服务器

2. 知道什么是WAN口，LAN口，LAN_IP，WAN_IP以及DHCP服务器。对于旁路由，只有一个网口，这里称其为LAN口

3. 对Linux系统有最基础的了解(知道怎么运行命令)

4. 能够手写客户端json配置文件，至少要能看懂

5. 强烈先阅读一下上述三篇白话文教程，即使是看不懂
### 5.2 前期准备工作
**1. 准备一个运行Linux系统的设备**

如果使用OpenWRT，可能需要安装一些依赖，因为OpenWRT作为嵌入式系统，精简了许多Linux发行版应该带有的东西：
```bash
# iptables的tproxy模块，使用下面这条命令安装：
opkg install iptables-mod-tproxy
# ca证书和ssl库：用于进行TLS连接
# 使用 "wget -O- https://www.baidu.com" 命令检查OpenWRT是否已经预装了ca证书和ssl库，如果已经预装了，就不需要再安装了
# 如果没有预装，执行 "wget -O- https://www.baidu.com" 命令时会提示错误。使用下面这条命令安装ca证书和openssl库：
opkg install libopenssl ca-certificates
```
**2. 将运行Linux系统的设备接入你的网络环境中，并作为下游设备的网关**

1. 作为主路由

即你的路由器本身就是`运行Linux系统的设备`。比如你家只有一台某品牌的路由器，家里所有设备都用这台路由器上网，并且这台路由器刷了OpenWRT的系统，那么这台路由器就已经满足条件了，可以给家里所有设备做透明代理

2. 作为旁路由

适合单网口设备，只需要将`运行Linux系统的设备`正常连路由器上网，然后将其它设备的网关设为它即可

比如你家有一台某品牌的路由器，家里所有设备都用这台路由器上网，这些上网设备当中就包含一台树莓派，它运行着Linux系统。将其它上网设备的默认网关设置为树莓派的IP(树莓派的默认网关依然是路由器LAN_IP)，树莓派就可以作为旁路由给这些设备做透明代理了。这可能导致这些设备无法正常上网，但是没有关系，跟着教程走完就能上网了

3. 其它，如单臂路由，多级路由，因为是入门教程，较为复杂就不多展开讲了，感兴趣可自行谷歌

**2. 在运行Linux系统的网关上准备好Xray可执行文件以及配置文件**

配置文件监听12345端口，开启tproxy：
```json
{
  "log": {
    "loglevel": "warning"
  },
  "inbounds": [
    {
      "port": 12345,
      "protocol": "dokodemo-door",
      "settings": {
        "network": "tcp,udp",
        "followRedirect": true
      },
      "streamSettings": {
        "sockopt": {
          "tproxy": "tproxy"
        }
      }
    }
  ],
  "outbounds": [
    {
       你的服务器配置
    }
  ]
}
```
我们从最简单的开始，不写routing，只写一个inbound一个outbound。
### 5.3 首先，我们先试试做到第一阶段
将所有`PREROUTING链`的流量，都转发到Xray中。

运行Xray，执行以下指令：
```bash
ip rule add fwmark 1 table 100
ip route add local 0.0.0.0/0 dev lo table 100
iptables -t mangle -N XRAY
iptables -t mangle -A XRAY -p tcp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A XRAY -p udp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A PREROUTING -j XRAY
```
当你输入完之后，如果你是使用ssh连接到网关上的，你会发现ssh的连接断开了(不用紧张，断电重启即可恢复)，并且透明代理无法上网；如果你是的网关是虚拟机，你会发现网关本身也无法上网，并且Xray日志access_log中出现许多源地址为目标地址，目标地址为WAN_IP的请求。

理论上网关本机访问公网只会经过`OUTPUT链`和`POSTROUTING链`，为什么操控`PREROUTING链`会导致网关无法上网呢？这是因为网络通讯往往是双向的，虽然网关访问公网IP不需要经过`PREROUTING链`，但被访问的服务器向网关返回信息时要经过`PREROUTING链`，且这部分被转发到Xray了，因此出现了日志中的反向请求。

我们修改一下规则，源IP不是来自局域网的则返回。重启网关，运行Xray，执行以下指令：
```bash
ip rule add fwmark 1 table 100
ip route add local 0.0.0.0/0 dev lo table 100
iptables -t mangle -N XRAY
# "网关LAN_IP地址段" 通过运行命令"ip address | grep -w "inet" | awk '{print $2}'"获得，是其中的一个
iptables -t mangle -A XRAY ! -s 网关LAN_IP地址段 -j RETURN
iptables -t mangle -A XRAY -p tcp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A XRAY -p udp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A PREROUTING -j XRAY
```
然后你会发现，虽然ssh连接断开了，但是透明代理已经可用了。只要我们修改系统dns为公共dns，就能正常上网了(因为现在网关访问不了，所以dns设置为网关是不行的)。

至此，第一阶段就完成了。之所以无法访问网关，是因为代理规则代理了全部流量，包括访问网关的流量。试想在VPS上访问你本地的网关，肯定是访问不了的，所以我们要对这部分流量直连，请看第二阶段：
### 5.4 第二阶段
重启网关，运行Xray，执行以下指令：
```bash
ip rule add fwmark 1 table 100
ip route add local 0.0.0.0/0 dev lo table 100
iptables -t mangle -N XRAY

# 所有目标地址在网关所在网段的请求直连
# 通过运行命令"ip address | grep -w "inet" | awk '{print $2}'"获得，一般来说有多个
iptables -t mangle -A XRAY -d 网关所在网段1 -j RETURN
iptables -t mangle -A XRAY -d 网关所在网段2 -j RETURN
...

# 目标地址为组播IP/E类地址/广播IP的请求直连
iptables -t mangle -A XRAY -d 224.0.0.0/3 -j RETURN

iptables -t mangle -A XRAY -p tcp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A XRAY -p udp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A PREROUTING -j XRAY
```
使用这条规则后，上一条规则`iptables -t mangle -A XRAY ! -s 网关LAN_IP地址段 -j RETURN`便成为了多余规则，可以删去。

至此，第二阶段完成。网关已经可以访问，ssh不会断开。

### 5.5 第三阶段

前两个阶段只代理了网关下游的设备，却没有代理网关本身。这样会导致一个问题，我们平时用的DNS服务器一般设置为默认网关，而网关又没有被代理，这就需要手动设置每个上网设备的DNS，否则返回的DNS查询结果可能是错误的或者污染的。

那如何代理网关本身呢？iptables-tproxy不支持对`OUTPUT链`操作，但是`Netfilter`有个特性，在`OUTPUT链`给包打标记为`1`后相应的包会重路由到`PREROUTING链`上。所以我们就给网关需要代理的包在`OUTPUT链`上`标记1`即可。

但如果代理网关发出的全部连接，就会引入一个问题，Xray运行在网关，Xray向代理服务端发起连接，这个连接又被代理了，就形成了回环。

因此要代理网关，就要避免回环发生，即在代理规则中规避来自Xray的流量。

**常见的方法有三种：**

1. 直连目标地址为VPS的流量

重启网关，运行Xray，执行以下指令：
```bash
#代理局域网设备
#继承上一个阶段的成果
ip rule add fwmark 1 table 100
ip route add local 0.0.0.0/0 dev lo table 100
iptables -t mangle -N XRAY
iptables -t mangle -A XRAY -d 网关所在网段1 -j RETURN
iptables -t mangle -A XRAY -d 网关所在网段2 -j RETURN
...
iptables -t mangle -A XRAY -d 224.0.0.0/3 -j RETURN
iptables -t mangle -A XRAY -p tcp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A XRAY -p udp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A PREROUTING -j XRAY

#代理网关本机
iptables -t mangle -N XRAY_MASK
iptables -t mangle -A XRAY_MASK -d 网关所在网段1 -j RETURN
iptables -t mangle -A XRAY_MASK -d 网关所在网段2 -j RETURN
...
iptables -t mangle -A XRAY_MASK -d 224.0.0.0/3 -j RETURN
iptables -t mangle -A XRAY_MASK -d VPS公网ip/32 -j RETURN
iptables -t mangle -A XRAY_MASK -j MARK --set-mark 1
iptables -t mangle -A OUTPUT -p tcp -j XRAY_MASK
iptables -t mangle -A OUTPUT -p udp -j XRAY_MASK
```
但是这么配置有个缺点，如果使用CDN或者VPS很多的话，就不好写规则了。

2. 通过mark规避

三个白话文教程都是使用这种方法规避，自行参考，这里不再赘述。

3. 通过gid规避(推荐)

参考 **[[透明代理]通过gid规避Xray流量](../../iptables_gid)**

这样就完成了第三阶段的代理，也就是平时说的全局代理。但是记得把网关的DNS服务器设置为国外的DNS服务器，否则可能依然返回被污染的结果。

### 5.6 第四阶段
其实，并不是所有人都需要实现第四阶段。全局代理对于大部分情况已经适用。

特别是对于旁路由而言。需要代理时，将网关调成旁路由的IP，不需要代理时，将网关换回主路由IP。

至于第四阶段的具体实现，那三篇白话文教程讲得很详细了。在理解了上面的内容后，再去看那三篇白话文教程，就比较容易理解了。
### 5.7 代理ipv6
上面的规则只对ipv4生效，如果还想要代理ipv6请求，则使用ip6tables命令，用法与iptables基本相同。参考 **[[透明代理]通过gid规避Xray流量#4-设置iptables规则](../../iptables_gid#4-设置iptables规则)**
### 5.8 iptables透明代理的其它注意事项
1. 如果作为代理的网关作为主路由，要在`PREROUTING链`规则中加一条`iptables -t mangle -A XRAY ! -s 网关LAN_IP地址段 -j RETURN`，即在第一阶段使用、第二阶段被删除的指令。如果不写，WAN口中同网段的其它人可以将网关填写成你的WAN_IP，从而蹭你的透明代理用，还可能带来一定的危险性。

2. **[too many open files 问题](https://guide.v2fly.org/app/tproxy.html#解决-too-many-open-files-问题)** ，解决方法见 **[[透明代理]通过gid规避Xray流量-配置最大文件大开数&运行Xray客户端](../../iptables_gid#3-配置最大文件大开数运行xray客户端)**

3. **[新 V2Ray 白话文指南-透明代理(TPROXY)#设置网关](https://guide.v2fly.org/app/tproxy.html#设置网关)** 中的第三条说：`手动配置 PC 的网络，将默认网关指向树莓派的地址即 192.168.1.22。此时 PC 应当能正常上网（由于还没设置代理，“正常”是指可以上国内的网站）`。实际上，Ubuntu、CentOS、debian等系统就算开启了IP转发，PC也不能正常上网，这是正常的。事实上只有OpenWRT能做到文中所描述的那样，据 **[@BioniCosmos](https://github.com/BioniCosmos)** 点拨，这是由于一般的Linux系统没有Masquery规则。

4. 关于开启ip_forward，待补充...

5. 避免已有连接的包二次通过 TPROXY ,待补充...
