---
date: "2021-03-14T00:00:00.000Z"
description: Project X 的文档.
title: 通过Xray将特定的流量指向特定出口，实现全局路由“分流”-sendthrough法
weight: 2
---


## 前言

之前在上篇[通过Xray将特定的流量指向特定出口，实现全局路由“分流”-fwmark法](https://xtls.github.io/documents/level-2/fwmark/)中， 已经清晰地讲过使用fwmark分流的方式，那么除此之前，Xray还提供了sendthroug可以实现相同效果，更方便

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
Address = "your wg0 v4 address"
Address = "your wg0 v6 address"
DNS = 8.8.8.8
MTU = 1280

[Peer]
PublicKey = xxxxxxxxxxxxxxxxxxxxx
AllowedIPs = ::/0
AllowedIPs = 0.0.0.0/0
Endpoint = "ip:port"
```
//在[Interface]下添加如下命令：
```
Table = off
PostUP = ip -4 rule add from "your wg0 v4 address" lookup <table>
PostUP = ip -4 route add default dev wg0 table <table>
PostUP = ip -4 rule add table main suppress_prefixlength 0
PostUP = ip -6 rule add not fwmark <table> table <table>
PostUP = ip -6 route add ::/0 dev wg0 table <table>
PostUP = ip -6 rule add table main suppress_prefixlength 0
PostDown = ip -4 rule delete from "your wg0 v4 address" lookup <table>
PostDown = ip -4 rule delete table main suppress_prefixlength 0
PostDown = ip -6 rule delete not fwmark <table> table <table>
PostDown = ip -6 rule delete table main suppress_prefixlength 0
```

{{% notice warning %}}
**TIPS**

（此命令表示IPV4中from "your wg0 v4 address"地址的走WireGuard，IPV6中::/0全局v6走WireGuard）
（可根据自己需求增删命令，实现v6分流，也可以结合上篇实现sendThrough与fwmark融合）
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

## 4、Xray-core/V2ray-core配置文件修改

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
      "settings": {"domainStrategy": "UseIPv4"}//修改此处，可v4或者v6
    },
    {
      "tag": "wg0",
      "protocol": "freedom",
      "sendThrough": "your wg0 v4 address",//修改此处，可v4或者v6
      "settings": {"domainStrategy": "UseIPv4"}//修改此处，可v4或者v6
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

{{% notice warning %}}
**TIPS**

可以通过修改 "domainStrategy": "UseIPv6"来控制对应用户的访问方式
实测优先级要高于系统本身的gai.config
{{% /notice %}}

## 5、系统设置配置

{{% notice warning %}}
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



