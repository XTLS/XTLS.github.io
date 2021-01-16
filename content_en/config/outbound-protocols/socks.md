---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: Socks
weight: 5
---

标准 Socks 协议实现，兼容 [Socks 4](http://ftp.icm.edu.pl/packages/socks/socks4/SOCKS4.protocol)、Socks 4a 和 [Socks 5](http://ftp.icm.edu.pl/packages/socks/socks4/SOCKS4.protocol)。

{{% notice danger important %}}
**socks 协议没有对传输加密，不适宜经公网中传输**

`socks inbound` 更有意义的用法是在局域网或本机环境下监听，为其他程序提供本地服务。
{{% /notice %}}

## OutboundConfigurationObject

---

```json
{
  "servers": [
    {
      "address": "127.0.0.1",
      "port": 1234,
      "users": [
        {
          "user": "test user",
          "pass": "test pass",
          "level": 0
        }
      ]
    }
  ]
}
```

{{% notice dark %}} `servers`: \[ [ServerObject](#serverobject) \]{{% /notice %}}

Socks 服务器列表，其中每一项是一个服务器配置。

### ServerObject

```json
{
  "address": "127.0.0.1",
  "port": 1234,
  "users": [
    {
      "user": "test user",
      "pass": "test pass",
      "level": 0
    }
  ]
}
```

{{% notice dark %}} `address`: address{{% /notice %}}

服务器地址, 必填

{{% notice info %}}
**TIP**\
仅支持连接到 Socks 5 服务器。
{{% /notice %}}

{{% notice dark %}} `port`: number{{% /notice %}}

服务器端口, 必填

{{% notice dark %}} `users`: \[ [UserObject](#userobject) \]{{% /notice %}}

一个数组表示的用户列表，数组中每个元素为一个用户配置。

当列表不为空时，Socks 客户端会使用用户信息进行认证；如未指定，则不进行认证。

默认值为空。

<br />

#### UserObject
---

```json
{
  "user": "test user",
  "pass": "test pass",
  "level": 0
}
```

{{% notice dark %}} `user`: string{{% /notice %}}

用户名，字符串类型。必填。

{{% notice dark %}} `pass`: string{{% /notice %}}

密码，字符串类型。必填。

{{% notice dark %}} `level`: number{{% /notice %}}

用户等级，连接会使用这个用户等级对应的[本地策略](../../base/policy#levelpolicyobject)。

userLevel 的值, 对应 [policy](../../base/policy#policyobject) 中 level 的值. 如不指定, 默认为 0