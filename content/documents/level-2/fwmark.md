---
date: "2021-03-14T00:00:00.000Z"
description: Project X 的文档.
title: 通过Xray/V2ray实现WARP“分流”-fwmark法
weight: 2
---


## 前言

之前在网络上看到WARP的IPV4和IPV6可以解锁Netflix，观看原生剧集，参考了网上很多方法，大部分都是为IPv4 Only服务器添加IPv6网络 or 为IPv6 Only服务器添加IPv4网络。即使是双栈替换，也都是全局接管，所有的流量都会走WARP出去。这种情况下并不优雅，如果我想可以任意替换，实现按需分流，那有没有更好的办法呢？有！
通过Xray/V2ray的fwmark，再简单配合WGCF的路由表功能即可实现：
① Xray/V2ray可设置指定的Tag、域名、奈飞等走WARP的IPV4或者IPV6
② 其余用户则走原IPV4或者IPV6
具体设置如下（以Debian10为例）：

## 1、安装WGCF

wgcf?是 Cloudflare WARP 的非官方 CLI 工具，它可以模拟 WARP 客户端注册账号，并生成通用的 WireGuard 配置文件。
//安装必备工具
```bash
apt update
apt install curl sudo lsb-release -y
```
//安装wgcf
```bash
curl -fsSL git.io/wgcf.sh | sudo bash
```
//注册warp账号，生成配置文件wgcf-account.toml
```bash
wgcf register
```
//生成WireGuard配置文件wgcf-profile.conf
```bash
wgcf generate
```

## 2、编辑WireGuard 配置文件wgcf-profile.conf

//原始文件
```
[Interface]
PrivateKey = xxxxxxxxxxxxxxxxxxxx
Address = 172.16.0.2/32
Address = xxxxxxxxxxxxxxxxxx/128
DNS = 1.1.1.1
MTU = 1280

[Peer]
PublicKey = xxxxxxxxxxxxxxxxxxxxx
AllowedIPs = ::/0
AllowedIPs = 0.0.0.0/0
Endpoint = engage.cloudflareclient.com:2408
```
//在[Interface]下添加如下命令：
```
Table = off
PostUP = ip -4 rule add fwmark <mark> lookup <table>
PostUP = ip -4 route add default dev wgcf table <table>
PostUP = ip -4 rule add table main suppress_prefixlength 0
PostUP = ip -6 rule add fwmark <mark> lookup 51820
PostUP = ip -6 rule add not fwmark 51820 table 51820
PostUP = ip -6 route add ::/0 dev wgcf table 51820
PostUP = ip -6 rule add table main suppress_prefixlength 0
PostDown = ip -4 rule delete fwmark <mark> lookup <table>
PostDown = ip -4 rule delete table main suppress_prefixlength 0
PostDown = ip -6 rule delete fwmark <mark> lookup 51820
PostDown = ip -6 rule delete not fwmark 51820 table 51820
PostDown = ip -6 rule delete table main suppress_prefixlength 0
```
**TIPS**
(此命令表示IPV4中fwmark为<mark>，IPV6中fwmark为<mark>，::/0全局v6走WARP)
（可根据自己需求增删命令，mark值要与Xray-core中设置为相同，table值自定）
{{% /notice %}}

保存
可顺手安装
```bash
apt install openresolv
```

## 3、启用 WireGuard 网络接口

//WireGuard配置文件复制到/etc/wireguard/并命名为wgcf.conf 
```bash
cp wgcf-profile.conf /etc/wireguard/wgcf.conf
```
//加载内核模块
```bash
modprobe wireguard
```
//检查WG模块加载是否正常
```bash
lsmod?|?grep?wireguard
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
      "settings": {
"domainStrategy": "UseIPv6"//设置默认用户走指定方式”UseIPv6”或者”UseIPv4”
}
    },
{
      "protocol": "freedom",
      "tag": "wgcf",
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
                "outboundTag": "wgcf",
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

**TIPS**
需要打开系统的ip_forward
{{% /notice %}}

## 6、完成WireGuard相关设置

//开启隧道
```bash
wg-quick up wgcf 
```
//开机自启
```bash
systemctl enable wg-quick@wgcf
systemctl start wg-quick@wgcf
```
//验证IPv4/IPv6
自行验证Google搜索myip

## 后记

CF提供了优秀的WARP，通过WARP的IP又多了许多可玩性。本文本意是可以避免的多余的流量浪费，顺便技术提升UP。大家对免费的WARP且用且珍惜，不要滥用

## 感谢

@Xray-core@V2ray-core@p3terx@w@Hiram@Luminous@Ln@JackChou



