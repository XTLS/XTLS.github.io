---
alwaysopen: true
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
# head: <hr/>
hide:
- toc
# post: "&nbsp;\U0001F44B"
title: 协议详解
weight: 2
---

{{% alert theme="warning" %}}**这个章节包含了 Xray 中所使用协议的详细剖析**{{% /alert %}}

<br />

{{% notice dark %}}[vless](./vless){{% /notice %}}
VLESS 是一个无状态的轻量传输协议，可以作为 Xray 客户端和服务器之间的桥梁。
{{% notice dark %}}[vmess](./vmess){{% /notice %}}
VMess 是一个加密传输协议，可以作为 Xray 客户端和服务器之间的桥梁。
{{% notice dark %}}[Mux.Cool](./muxcool){{% /notice %}}
Mux.Cool 协议是一个多路复用传输协议，用于在一条已建立的数据流中传输多个各自独立的数据流。
{{% notice dark %}}[mKCP](./mkcp){{% /notice %}}
mKCP 是流式传输协议，由 [KCP 协议](https://github.com/skywind3000/kcp)修改而来，可以按顺序传输任意的数据流。
