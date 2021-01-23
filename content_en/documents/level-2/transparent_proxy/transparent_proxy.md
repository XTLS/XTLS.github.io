---
date: "2020-12-23T00:00:00.000Z"
description: Project X Documentation.
title: Getting Started with Transparent Proxy
weight: 1
---

## What is Transparent Proxy(TProxy)?
General speaking the Transparent Proxy is not let the device which has been proxied feeling itself to be proxied, further speaking is the proxied device do not need to run any proxy software(such as Xray, V2rayNG and so on). When you connected to the network, your device has been proxied.

And it means that, the proxy software is running in other places, such as running in the router, all the devices connected to the Internet via the router can automatically be proxied.
## Implementation of Transparent Proxy
Now the implementation of transparent proxy has two ways:

### tun2socks

It can be implemented on Windows/Linux (including Android). Because the implementation process is relatively simple and there are few tutorials, I will briefly describe it here.

**Windows**

1. Install **[Netch](https://github.com/NetchX/Netch/releases)** ，Using mode`[3] [TUN/TAP] Bypass LAN`and active it.

2. Turn on the Hotspot

3. Open`Control Panel`->`Networok and Internet`->`Network and Sharing Center`->`Change adapter settings`，find`TAP-Windows Adapter`and`Microsoft Wi-Fi Direct Virtual Adapter`。

4. Right Click`TAP-Windows Adapter`，`Properties`->`Sharing`，Check`Allow other network users to connect through this computer’s Internet connection`，select the network connection of `Microsoft Wi-Fi Direct Virtual Adapter` in `Home Network Connection`, and click OK.

**Android**

1. Configure connection V2RayNG

2. Open Hotspot

3. Hotspot settings -> Allow Hotspot use VPN(partly Android may not have this option)

### iptables/nftables

iptables & nftables are the same way to implemented Transparent Proxy，and the following uses iptables uniformly.

The Transparent Proxy which based on iptables only available in Linux system(concluding Openwrt/Android). For its more efficiency than tun2socks and it is suitable on router, make it be widely used.

The existing three vernacular transparent proxy tutorials actually talk about this transparent proxy implementation based on this scheme，they are： **[New V2Ray vernacular tutorials-Transparent Proxy](https://guide.v2fly.org/app/transparent_proxy.html)** , **[New V2Ray vernacular tutorials-TPROXY](https://guide.v2fly.org/app/tproxy.html)** , **[Tproxy Configuration](../../tproxy)** . And the first article is based on iptables-redirect mode, but is outdated and not recommended for use, only reference. The second and third articles talk about the implementation of transparent proxy based on iptables-tproxy mode.

## iptables implement the principle of transparent proxy
Linux use `Netfilter` to manage network，the `Netfilter` model is as follows:

![Netfilter](../netfilter.png)

**Assuming that a router is used as a gateway (that is, our usual way of surfing the Internet), then:**

The traffic direction of LAN devices accessing the Internet through the router:

`PREROUTING CHAIN->FORWARD CHAIN->POSTINGROUTING CHAIN`

LAN device to access the router traffic (such as login router web management interface / ssh connection router / access dns servers of router, etc.) direction:

`PREROUTING CHAIN->INPUT CHAIN->Gateway native`

The direction of traffic from the router access to the Internet:

`Gateway Native->OUTPUT CHAIN->POSTINGROUTING CHAIN`

**By using iptables to manipulate the traffic direction of `PREROUTING CHAIN` and `OUTPUT CHAIN`, and forward it to Xray, it can proxy LAN equipment and gateway native.**
## Where is the difficulty of transparent proxy?

The difficulty of transparent proxy lies in routing. The so-called routing is to distinguish which traffic is directly connected and which should be proxied, so I personally think that it is more appropriate to call it **Diversion**.

We can divide routing from easy to difficult into the following stages:

1. Proxy all the requests.

2. Local LAN IP / Multicast IP request direct connection，others request proxy.

3. Directly connect the connection request which initiated by Xray on the basic of the second point.

4. On the basis of the third point, directly connect to the connection request pointing to the IP in mainland China, and select the domestic and foreign DNS server to resolve the domestic and foreign domain names.

The three tutorials mentioned above are all in the fourth stage. So it may seem a bit difficult to understand for novices to read directly.

## Step by step implementation of transparent proxy based on iptables-tproxy from zero
### Before the start, you need to have certain basic knowledge:
1. You need to know about TCP/IP protocol, domain name and DNS server.

2. Know what is WAN port, LAN port, LAN_IP, WAN_IP and DHCP server. For the bypass route, there is only one network port, which is called the LAN port here

3. Have the most basic understanding of the Linux system (know how to run commands)

4. Be able to write the client json file configuration, and at least the configuration can be understood.
### Initial Preparation Work
**1. Prepare a gateway running Linux system**

For example, a router with OpenWRT.

**2. Prepare Xray executable files and configuration files at the gateway (router)**

The configuration file monitors port 12345 and enables tproxy:
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
       The configuration of your server
    }
  ]
}
```
We start from easy to difficult. Without writing routing, we only write one inbound and one outbound.
### First, let’s try to do the first stage
Forward all traffic of the `PREROUTING CHAIN` to Xray.

Run Xray and execute the following commands:
```bash
ip rule add fwmark 1 table 100
ip route add local 0.0.0.0/0 dev lo table 100
iptables -t mangle -N XRAY
iptables -t mangle -A XRAY -p tcp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A XRAY -p udp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A PREROUTING -j XRAY
```
After you have entered, if you use ssh to connect to the gateway, you will find that the ssh is disconnected (don’t worry, it can be restored after power off and restart), and the transparent proxy cannot access the Internet; if your gateway is Virtual machine, you will find that the gateway itself cannot access the Internet, and there will appear many requests about the source address as the destination address and the destination address as WAN_IP in the access_log of Xray.

Theoretically, the gateway's local access to the public network will only go through the `OUTPUT CHAIN` and `POSTROUTING CHAIN`. Why does manipulation of the `PREROUTING CHAIN` cause the gateway to fail to access the Internet? This is because network communication is often two-way. Although the gateway does not need to pass through the `PREROUTING CHAIN` to access the public IP, the accessed server return information to the gateway must pass through the `PREROUTING CHAIN`, and this part is forwarded to Xray. Therefore, a reverse request in the log appears.

Let's modify the rules. If the source IP is not from LAN, and then return. Restart the gateway, run Xray, and execute the following commands:
```bash
ip rule add fwmark 1 table 100
ip route add local 0.0.0.0/0 dev lo table 100
iptables -t mangle -N XRAY
# "Gateway LAN_IP address segment" obtained by running the command "ip address | grep -w "inet" | awk'{print $2}'"，is one of them
iptables -t mangle -A XRAY ! -s Gateway LAN_IP address segment -j RETURN
iptables -t mangle -A XRAY -p tcp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A XRAY -p udp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A PREROUTING -j XRAY
```
然后你会发现，虽然ssh连接断开了，但是透明代理已经可用了。只要我们修改系统dns为公共dns，就能正常上网了(因为现在网关访问不了，所以dns设置为网关是不行的)。

至此，第一阶段就完成了。之所以无法访问网关，是因为代理规则代理了全部流量，包括访问网关的流量。试想在VPS上访问你本地的网关，肯定是访问不了的，所以我们要对这部分流量直连，请看第二阶段：
### Second stage
Restart the gateway, run Xray, and execute the following commands:
```bash
ip rule add fwmark 1 table 100
ip route add local 0.0.0.0/0 dev lo table 100
iptables -t mangle -N XRAY

# 所有目标地址在网关所在网段的请求直连
# 通过运行命令"ip address | grep -w "inet" | awk '{print $2}'"获得，一般来说有多个
iptables -t mangle -A XRAY -d Network segment 1 where the gateway is located -j RETURN
iptables -t mangle -A XRAY -d Network segment 2 where the gateway is located -j RETURN
...

# 目标地址为组播IP的请求直连
iptables -t mangle -A XRAY -d 224.0.0.0/4 -j RETURN
iptables -t mangle -A XRAY -d 255.255.255.255/32 -j RETURN

iptables -t mangle -A XRAY -p tcp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A XRAY -p udp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A PREROUTING -j XRAY
```
After using this rule, the previous rule `iptables -t mangle -A XRAY ! -s Gateway LAN_IP address segment -j RETURN` becomes a redundant rule and can be deleted.

At this point, the second stage is completed. The gateway is already accessible, and ssh will not be disconnected.

### The third stage

The DNS we usually use comes from routers, but this iptables rule only proxies the devices in the local area network, but does not proxy the gateway native, so the returned DNS query results may be wrong or polluted.

iptables-tproxy do not support `OUTPUT CHAIN` operation，but `Netfilter` has a feature，after marking the packet as `1` at `OUTPUT CHAIN` , the corresponding packet will be rerouted to the `PREROUTING CHAIN`. Therefore, the request that the gateway native needs to proxy, we can mark `1` at `OUTPUT CHAIN` .

If you want to proxy all the requests sent by the gateway native, it will introduce a problem, Xray runs on the gateway, Xray sends a request to the proxy server, and the request is proxied again, will form a loop.

Therefore, to proxy the gateway native, it is necessary to avoid loopback happening, that is, to circumvent Xray request traffic in proxy rules.

**There are three common methods:**

1. Directly connect to the traffic which target address to VPS

Restart the gateway, run Xray, and execute the following commands:
```bash
#Proxy LAN Device
#Inherit the results of the previous stage
ip rule add fwmark 1 table 100
ip route add local 0.0.0.0/0 dev lo table 100
iptables -t mangle -N XRAY
iptables -t mangle -A XRAY -d Network segment 1 where the gateway is located -j RETURN
iptables -t mangle -A XRAY -d Network segment 2 where the gateway is located -j RETURN
...
iptables -t mangle -A XRAY -d 224.0.0.0/4 -j RETURN
iptables -t mangle -A XRAY -d 255.255.255.255/32 -j RETURN
iptables -t mangle -A XRAY -p tcp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A XRAY -p udp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A PREROUTING -j XRAY

#Proxy Gateway Native
iptables -t mangle -N XRAY_MASK
iptables -t mangle -A XRAY_MASK -d Network segment 1 where the gateway is located -j RETURN
iptables -t mangle -A XRAY_MASK -d Network segment 2 where the gateway is located -j RETURN
...
iptables -t mangle -A XRAY_MASK -d 224.0.0.0/4 -j RETURN
iptables -t mangle -A XRAY_MASK -d 255.255.255.255/32 -j RETURN
iptables -t mangle -A XRAY_MASK -d VPS Public IP/32 -j RETURN
iptables -t mangle -A XRAY_MASK -j MARK --set-mark 1
iptables -t mangle -A OUTPUT -p tcp -j XRAY_MASK
iptables -t mangle -A OUTPUT -p udp -j XRAY_MASK
```
But to configure like this has a disadvantage. If you use CDN or have a lot of VPS, it is hard to write rules.

2. Circumvent through Mark

The three vernacular tutorials all use this method to circumvent, and refer it by yourself, so I won't repeat them here.

3. Circumvent through gid (recommended)

Reference **[[TProxy]Avoid Xray traffic through gid](../../iptables_gid)**

This completes the third stage agent, which is usually called the global agent. But remember to set the DNS server of the gateway to a foreign DNS server, otherwise the polluted results may still be returned.

### 第四阶段
其实，并不是所有人都需要实现第四阶段。全局代理对于大部分情况已经适用。

特别是对于旁路由而言。需要代理时，将网关调成旁路由的IP，不需要代理时，将网关换回主路由IP。

至于第四阶段的具体实现，那三篇白话文教程讲的都是。在理解了上面的内容后，再去看那三篇白话文教程，就比较容易理解了。
### 代理ipv6
上面的规则只对ipv4生效，如果还想要代理ipv6请求，则使用ip6tables命令，用法与iptables基本相同。参考 **[[透明代理]通过gid规避Xray流量#4-设置iptables规则](../../iptables_gid#4-设置iptables规则)**
# iptables透明代理的其它注意事项
1. 如果作为代理的网关作为主路由，要在`PREROUTING链`规则中加一条`iptables -t mangle -A XRAY ! -s 网关LAN_IP地址段 -j RETURN`，即在第一阶段使用、第二阶段被删除的指令。如果不写，WAN口中同网段的其它人可以将网关填写成你的WAN_IP，从而蹭你的透明代理用，还可能带来一定的危险性。

2. **[新 V2Ray 白话文指南-透明代理(TPROXY)#设置网关](https://guide.v2fly.org/app/tproxy.html#设置网关)** 中的第三条说：`手动配置 PC 的网络，将默认网关指向树莓派的地址即 192.168.1.22。此时 PC 应当能正常上网（由于还没设置代理，“正常”是指可以上国内的网站）`。实际上，Ubuntu、CentOS、debian等系统就算开启了IP转发，PC也不能正常上网，这是正常的。事实上只有OpenWRT能做到文中所描述的那样，据 **[@BioniCosmos](https://github.com/BioniCosmos)** 点拨，这是由于一般的Linux系统没有Masquery规则。

3. **[The Problem of "Too many open files"](https://guide.v2fly.org/app/tproxy.html#解决-too-many-open-files-问题)** ，解决方法见 **[[透明代理]通过gid规避Xray流量-配置最大文件大开数&运行Xray客户端](../../iptables_gid#3-配置最大文件大开数运行xray客户端)**

4. 关于开启ip_forward，待补充...

5. 避免已有连接的包二次通过 TPROXY ,待补充...

6. 主路由、单臂路由与旁路由，待补充...
