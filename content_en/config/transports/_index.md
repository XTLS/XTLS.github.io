---
alwaysopen: false
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
# head: <hr/{{% notice dark %}}
hide:
  - toc
# post: "&nbsp;\U0001F44B"
title: 传输方式列表
weight: 7
---

{{% alert theme="warning" %}}**这个章节包含了目前所有的传输方式及相关的具体配置.**{{% /alert %}}

## 传输方式列表

{{% notice dark %}} `tcpSettings`: [TcpObject](./tcp){{% /notice %}}

针对 TCP 连接的配置。

{{% notice dark %}} `wsSettings`: [WebSocketObject](./websocket){{% /notice %}}

针对 WebSocket 连接的配置。

{{% notice dark %}} `dsSettings`: [DomainSocketObject](./domainsocket){{% /notice %}}

针对 Domain Socket 连接的配置。

{{% notice dark %}} `kcpSettings`: [KcpObject](./mkcp){{% /notice %}}

针对 mKCP 连接的配置。

{{% notice dark %}} `httpSettings`: [HttpObject](./h2){{% /notice %}}

针对 HTTP/2 连接的配置。

{{% notice dark %}} `quicSettings`: [QuicObject](./quic){{% /notice %}}

针对 QUIC 连接的配置。


