---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: Trojan
weight: 8
---

[Trojan](https://trojan-gfw.github.io/trojan/protocol) 协议

{{% notice danger important %}}
Trojan 被设计工作在正确配置的加密 TLS 隧道
{{% /notice %}}

## OutboundConfigurationObject

---

```json
{
  "servers": [
    {
      "address": "127.0.0.1",
      "port": 1234,
      "password": "password",
      "email": "love@xray.com",
      "flow": "xtls-rprx-direct",
      "level": 0
    }
  ]
}
```

{{% notice dark %}} `servers`: \[ [ServerObject](#serverobject) \]{{% /notice %}}

一个数组，其中每一项是一个 [ServerObject](#serverobject)。

<br />

### ServerObject

---

```json
{
  "address": "127.0.0.1",
  "port": 1234,
  "password": "password",
  "email": "love@xray.com",
  "flow": "xtls-rprx-direct",
  "level": 0
}
```

{{% notice dark %}} `address`: address{{% /notice %}}

服务端地址，支持 IPv4、IPv6 和域名。必填。

{{% notice dark %}} `port`: number{{% /notice %}}

服务端端口，通常与服务端监听的端口相同。

{{% notice dark %}} `password`: string{{% /notice %}}

密码. 必填，任意字符串。

{{% notice dark %}} `email`: string{{% /notice %}}

邮件地址，可选，用于标识用户

{{% notice dark %}} `flow`: string{{% /notice %}}

trojan 的流控模式.

目前 trojan 有以下流控模式可选:
- "xtls-rprx-origin" : 最初的流控方式
- "xtls-rprx-origin-udp443" : 同xtls-rprx-origin, 但是放行了目标为443端口的UDP流量.
- "xtls-rprx-direct" : 所有平台皆可使用的典型流控方式
- "xtls-rprx-direct-udp443" : 同xtls-rprx-direct, 但是放行了目标为443端口的UDP流量.
- "xtls-rprx-splice" : Linux 平台下最建议使用的流控方式
- "xtls-rprx-splice-udp443" : 同xtls-rprx-splice, 但是放行了目标为443端口的UDP流量.

如果填写了流控模式, 还需将 outbound 的 `security` 设置成 "xtls", 将 "tlsSettings" 改成 "xtlsSettings". 可参考[streamSettings](../../transport#streamsettingsobject)设置


{{% notice danger important %}}
Splice 是 Linux Kernel 提供的函数，系统内核直接转发 TCP，不再经过 Xray 的内存，大大减少了数据拷贝、CPU 上下文切换的次数。

splice 模式的的使用限制:
- Linux 环境
- inbound为 任意门、Socks、HTTP 等纯净的 TCP 连接, 或 XTLS 模式的inbound
- outbound 为 VLESS XTLS 或 Trojan XTLS
{{% /notice %}}

{{% notice dark %}} `level`: number{{% /notice %}}

用户等级，连接会使用这个用户等级对应的[本地策略](../../policy#levelpolicyobject)。

level 的值, 对应 [policy](../../policy#policyobject) 中 level 的值. 如不指定, 默认为 0.