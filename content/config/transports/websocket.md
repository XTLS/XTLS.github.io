---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: WebSocket
weight: 2
---

使用标准的 WebSocket 来传输数据。

WebSocket 连接可以被其它 HTTP 服务器（如 Nginx）分流，也可以被 VLESS fallbacks path 分流。

{{% notice info %}}
**TIP**\
Websocket 会识别 HTTP 请求的 X-Forwarded-For 头来覆写流量的源地址，优先级高于 PROXY protocol。
 {{% /notice %}}

## WebSocketObject

`WebSocketObject` 对应传输配置的 `wsSettings` 项。

```json
{
    "acceptProxyProtocol": false,
    "path": "/",
    "headers": {
        "Host": "xray.com"
    }
}
```

{{% notice dark %}} `acceptProxyProtocol`: true | false {{% /notice %}}

仅用于 inbound，指示是否接收 PROXY protocol。<br />
[PROXY protocol](https://www.haproxy.org/download/2.2/doc/proxy-protocol.txt) 专用于传递请求的真实来源 IP 和端口，**若你不了解它，请先忽略该项**。<br />
常见的反代软件（如 HAProxy、Nginx）都可以配置发送它，VLESS fallbacks xver 也可以发送它。

填写 `true` 时，最底层 TCP 连接建立后，请求方必须先发送 PROXY protocol v1 或 v2，否则连接会被关闭。

{{% notice dark %}} `path` string {{% /notice %}}

WebSocket 所使用的 HTTP 协议路径，默认值为 `"/"`。

如果路径中包含 `ed` 参数，将会启用 `Early Data` 以降低延迟，其值为首包长度阈值。如果首包长度超过此值，就不会启用 `Early Data`。建议的值为 2048。

{{% notice warning %}} 
`Early Data` 使用 `Sec-WebSocket-Protocol` 头承载数据。如果你遇到兼容性问题，可以尝试调低阈值。
{{% /notice %}}

{{% notice dark %}} `headers`: map \{string: string\} {{% /notice %}}

自定义 HTTP 头，一个键值对，每个键表示一个 HTTP 头的名称，对应的值是字符串。

默认值为空。
