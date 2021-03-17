---
date: "2021-03-14T00:00:00.000Z"
description: Project X 的文档.
title: 通过Xray将特定的流量指向特定出口，实现全局路由“分流”-fwmark法
weight: 2
---


## 前言

之前在网络上看到许多代理或者VPN会接管全局路由，如果与Xray同时安装，会导致Xray失效。参考了网络上许多教程，及时分流，也是通过维护一张或者多张CIDR路由表来实现的。这种情况下并不优雅，如果我想可以任意替换，实现按需分流，那有没有更好的办法呢？有！

通过Xray的fwmark，再简单配合路由表功能即可实现：

① Xray可设置指定的Tag、域名等走指定接口。如果您的接口是双栈的，可以指定IPV4或者IPV6
② 其余用户则走原IPV4或者IPV6

具体设置如下（以Debian10为例）：

## 1、安装代理或者VPN软件（例如Wireguard、IPsec等）

根据不同系统和不同软件，请参考官方安装方法


## 2、编辑VPN配置文件（以WireGuard为例）

//原始文件
```
[Interface]
PrivateKey = xxxxxxxxxxxxxxxxxxxx
Address = 172.16.0.2/32
Address = xxxxxxxxxxxxxxxxxx/xxx
DNS = 8.8.8.8
MTU = 1280

[Peer]
PublicKey = xxxxxxxxxxxxxxxxxxxxx
AllowedIPs = ::/0
AllowedIPs = 0.0.0.0/0
Endpoint = ip:port
```
//在[Interface]下添加如下命令：
```
Table = off
PostUP = ip -4 rule add fwmark <mark> lookup <table>
PostUP = ip -4 route add default dev <接口名称> table <table>
PostUP = ip -4 rule add table main suppress_prefixlength 0
PostUP = ip -6 rule add fwmark <mark> lookup <table>
PostUP = ip -6 rule add not fwmark <table> table <table>
PostUP = ip -6 route add ::/0 dev <接口名称> table <table>
PostUP = ip -6 rule add table main suppress_prefixlength 0
PostDown = ip -4 rule delete fwmark <mark> lookup <table>
PostDown = ip -4 rule delete table main suppress_prefixlength 0
PostDown = ip -6 rule delete fwmark <mark> lookup <table>
PostDown = ip -6 rule delete not fwmark <table> table <table>
PostDown = ip -6 rule delete table main suppress_prefixlength 0
```

{{% /notice %}}
**TIPS**

（此命令表示IPV4中fwmark为<mark>，IPV6中fwmark为<mark>，::/0全局v6走WireGuard）
（可根据自己需求增删命令，mark值要与Xray-core中设置为相同，table值自定）
（如果不支持配置文件，可以在系统中修改路由表）
{{% /notice %}}

保存

可顺手安装
```bash
apt install openresolv
```

## 3、启用 WireGuard 网络接口

//加载内核模块
```bash
modprobe wireguard
```
//检查WG模块加载是否正常
```bash
lsmod | grep wireguard
```

## 4、Xray-core配置文件修改

```json
{
  "api": {
    "services": [
      "HandlerService",
      "LoggerService",
      "StatsService"
    ],
    "tag": "api"
  },
  "inbounds": [
    {
      "listen": "127.0.0.1",
      "port": <port>,
      "protocol": "dokodemo-door",
      "settings": {
        "address": "127.0.0.1"
      },
      "tag": "api"
    }
  ],
  "outbounds": [
{
      "protocol": "freedom",
      "settings": {
"domainStrategy": "UseIPv6"//设置默认用户走指定方式”UseIPv6”或者”UseIPv4”
}
    },
{
      "protocol": "freedom",
      "tag": "wg0",
      "streamSettings": {
        "sockopt": {
          "mark": <mark>
        }
      },
      "settings": {"domainStrategy": "UseIPv6"}//设置fwmark为<mark>的用户走指定方式”UseIPv6””UseIPv4”
    },    
    {
      "protocol": "blackhole",
      "settings": {},
      "tag": "blocked"
    }
  ],
  "policy": {
    "system": {
      "statsInboundDownlink": true,
      "statsInboundUplink": true
    }
  },
  "routing": {
    "rules": [
      
{
        "inboundTag": [
          "api"
        ],
        "outboundTag": "api",
        "type": "field"
      },
{
                "type": "field",
                "outboundTag": "wg0",
                "inboundTag": [
                   "<inboundTag>"//需要之前在inbound中指定好Tag，我这里是api生成的,还可以添加域名等等
                   ]
            },
      {
        "outboundTag": "blocked",
        "protocol": [
          "bittorrent"
        ],
        "type": "field"
      }
    ]
  },
  "stats": {}
}
```

{{% notice %}}
**TIPS**

可以通过修改 "domainStrategy": "UseIPv6"来控制对应用户的访问方式
实测优先级要高于系统本身的gai.config
{{% /notice %}}

## 5、系统设置配置

{{% /notice %}}
**TIPS**

需要打开系统的ip_forward
{{% /notice %}}

## 6、完成WireGuard相关设置

//开启隧道
```bash
wg-quick up wg0
```
//开机自启
```bash
systemctl enable wg-quick@wg0
systemctl start wg-quick@wg0
```
//验证IPv4/IPv6

自行验证Google搜索myip

## 后记

本文本意是可以避免的多余的流量浪费，将路由和分流的功能交给Xray处理。避免了维护路由表的繁琐工作。顺便技术提升UP。

## 感谢

@Xray-core@V2ray-core@WireGuard@p3terx@w@Hiram@Luminous@Ln@JackChou



