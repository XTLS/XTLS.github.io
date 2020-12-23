---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: Trojan
weight: 7
---

[Trojan](https://trojan-gfw.github.io/trojan/protocol) 协议

{{% notice danger important %}}
Trojan 被设计工作在正确配置的加密 TLS 隧道
{{% /notice %}}

## InboundConfigurationObject

---

```json
{
  "clients": [
    {
      "password": "password",
      "email": "love@xray.com",
      "level": 0
    }
  ],
  "fallbacks": [
    {
      "dest": 80
    }
  ]
}
```

{{% notice dark %}} `clients`: \[ [ClientObject](#clientobject) \]{{% /notice %}}

一个数组，代表一组服务端认可的用户.

其中每一项是一个用户[ClientObject](#clientobject)。

{{% notice dark %}} `fallbacks`: \[ [FallbackObject](../../fallback) \]{{% /notice %}}

一个数组，包含一系列强大的回落分流配置（可选）。

{{% notice  %}}
**TIP**\
Xray 的 Trojan 有完整的 fallbacks 支持，配置方式完全一致。</br>
触发回落的条件也与VLESS类似：首包长度 < 58 或第 57 个字节不为 '\r'（因为 Trojan 没有协议版本）或身份认证失败。
{{% /notice %}}

<br />
### ClientObject
---

```json
{
  "password": "password",
  "email": "love@xray.com",
  "level": 0
}
```

{{% notice dark %}} `password`: string{{% /notice %}}

必填，任意字符串。

{{% notice dark %}} `email`: string{{% /notice %}}

邮件地址，可选，用于标识用户

{{% notice dark %}} `level`: number{{% /notice %}}

用户等级，连接会使用这个用户等级对应的[本地策略](../../policy#levelpolicyobject)。

userLevel 的值, 对应 [policy](../../policy#policyobject) 中 level 的值. 如不指定, 默认为 0.

<br />


