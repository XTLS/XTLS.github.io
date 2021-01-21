---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: HTTP
weight: 4
---

HTTP 协议。

{{% notice danger important %}}
**http 协议没有对传输加密，不适宜经公网中传输，更容易成为被人用作攻击的肉鸡。**

`http inbound` 更有意义的用法是在局域网或本机环境下监听，为其他程序提供本地服务。
{{% /notice %}}

{{% notice info %}}
**TIP**\
 `http proxy` 只能代理 tcp 协议，udp 系的协议均不能通过。
{{% /notice %}}

## OutboundConfigurationObject

---

```json
{
  "servers": [
    {
      "address": "192.168.108.1",
      "port": 3128,
      "users": [
        {
          "user": "my-username",
          "pass": "my-password"
        }
      ]
    }
  ]
}
```

{{% notice info %}}
**TIP**\
目前 HTTP 协议 outbound 中 `streamSettings` 设置 `security` 和 `tlsSettings` 是生效的。
{{% /notice %}}

{{% notice dark %}} `servers`: \[ [ServerObject](#serverobject) \]{{% /notice %}}

HTTP 服务器列表，其中每一项是一个服务器配置，若配置多个，循环使用 (RoundRobin)。

<br />

### ServerObject

---

```json
{
  "address": "192.168.108.1",
  "port": 3128,
  "users": [
    {
      "user": "my-username",
      "pass": "my-password"
    }
  ]
}
```

{{% notice dark %}} `address`: string{{% /notice %}}

HTTP 代理服务器地址，必填。

{{% notice dark %}} `port`: int{{% /notice %}}

HTTP 代理服务器端口，必填。

{{% notice dark %}} `user`: \[[AccountObject](#accountobject)\]{{% /notice %}}

一个数组，数组中每个元素为一个用户帐号。默认值为空。

<br />

#### AccountObject

---

```json
{
  "user": "my-username",
  "pass": "my-password"
}
```

{{% notice dark %}} `user`: string{{% /notice %}}

用户名，字符串类型。必填。

{{% notice dark %}} `pass`: string{{% /notice %}}

密码，字符串类型。必填。
