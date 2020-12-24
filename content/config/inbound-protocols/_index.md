---
alwaysopen: false
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
# head: <hr/>
hide:
- toc
# post: "&nbsp;\U0001F44B"
title: inbound可用协议列表
weight: 5
---
{{% alert theme="warning" %}}**这个章节包含了目前所有可用于inbound的协议及具体配置细节.**{{% /alert %}}

## 协议列表
---
{{% notice dark %}}[dokodemo-door](./dokodemo){{% /notice %}}
Dokodemo door（任意门）可以监听一个本地端口，并把所有进入此端口的数据发送至指定服务器的一个端口，从而达到端口映射的效果。
{{% notice dark %}}[http](./http){{% /notice %}}
HTTP 协议
{{% notice dark %}}[socks](./socks){{% /notice %}}
标准 Socks 协议实现，兼容 [Socks 4](http://ftp.icm.edu.pl/packages/socks/socks4/SOCKS4.protocol)、Socks 4a 和 [Socks 5](http://ftp.icm.edu.pl/packages/socks/socks4/SOCKS4.protocol)。
{{% notice dark %}}[vless](./vless){{% /notice %}}
VLESS 是一个无状态的轻量传输协议，可以作为 Xray 客户端和服务器之间的桥梁。
{{% notice dark %}}[VMess](./vmess){{% /notice %}}
[VMess](../../develop/protocols/vmess) 是一个加密传输协议，，可以作为 Xray 客户端和服务器之间的桥梁。
{{% notice dark %}}[trojan](./trojan){{% /notice %}}
[Trojan](https://trojan-gfw.github.io/trojan/protocol)协议
{{% notice dark %}}[shadowsocks](./shadowsocks){{% /notice %}}
[Shadowsocks](https://zh.wikipedia.org/wiki/Shadowsocks) 协议。

