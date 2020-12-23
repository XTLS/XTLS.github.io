---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: vmess
weight: 7
---

# VMess

[VMess](../../developer/protocols/vmess.md) 是一个加密传输协议，通常作为 Xray 客户端和服务器之间的桥梁。

{{% notice danger important %}}
VMess 依赖于系统时间，请确保使用 Xray 的系统 UTC 时间误差在 90 秒之内，时区无关。在 Linux 系统中可以安装`ntp`服务来自动同步系统时间。</br>
{{% /notice %}}

## OutboundConfigurationObject

---

```json
{
  "vnext": [
    {
      "address": "127.0.0.1",
      "port": 37192,
      "users": [
        {
          "id": "27848739-7e62-4138-9fd3-098a63964b6b",
          "alterId": 0,
          "security": "auto",
          "level": 0
        }
      ]
    }
  ]
}
```

{{% notice dark %}} `vnext`：\[ [ServerObject](#serverobject) \]{{% /notice %}}

一个数组，包含一组的服务端配置. 

其中每一项是一个服务端配置[ServerObject](#serverobject)。

<br />

### ServerObject
---

```json
{
  "address": "127.0.0.1",
  "port": 37192,
  "users": []
}
```

{{% notice dark %}} `address`: address{{% /notice %}}

服务端地址，支持 IP 地址或者域名。

{{% notice dark %}} `port`: number{{% /notice %}}

服务端监听的端口号, 必填。

{{% notice dark %}} `users`: \[ [UserObject](#userobject) \]{{% /notice %}}

一个数组，代表一组服务端认可的用户.

其中每一项是一个用户[UserObject](#userobject)。

<br />

#### UserObject
---
```json
{
  "id": "27848739-7e62-4138-9fd3-098a63964b6b",
  "alterId": 0,
  "security": "auto",
  "level": 0
}
```

{{% notice dark %}} `id`：string{{% /notice %}}

VMess 用户的主 ID。必须是一个合法的 UUID。

{{% notice dark %}} `alterId`：number{{% /notice %}}

为了进一步防止被探测，一个用户可以在主 ID 的基础上，再额外生成多个 ID。这里只需要指定额外的 ID 的数量，推荐值为 0 代表启用 VMessAEAD。<br />
最大值 65535。这个值不能超过服务器端所指定的值。

不指定的话，默认值是 0。

{{% notice info %}}
**TIP**\
客户端 AlterID 设置为 0 代表启用 VMessAEAD ；服务端为自动适配，可同时兼容启用和未开启 VMessAEAD 的客户端。<br />
客户端可通过设置环境变量 Xray_VMESS_AEAD_DISABLED=true 强行禁用 VMessAEAD
{{% /notice %}}

{{% notice dark %}} `level`: number{{% /notice %}}

用户等级，连接会使用这个用户等级对应的[本地策略](../../policy#levelpolicyobject)。

level 的值, 对应 [policy](../../policy#policyobject) 中 level 的值. 如不指定, 默认为 0.

{{% notice dark %}} `security`: "aes-128-gcm" | "chacha20-poly1305" | "auto" | "none"{{% /notice %}}

加密方式，客户端将使用配置的加密方式发送数据，服务器端自动识别，无需配置。

- `"aes-128-gcm"`：推荐在 PC 上使用
- `"chacha20-poly1305"`：推荐在手机端使用
- `"auto"`：默认值，自动选择（运行框架为 AMD64、ARM64 或 s390x 时为 aes-128-gcm 加密方式，其他情况则为 Chacha20-Poly1305 加密方式）
- `"none"`：不加密

{{% notice info %}}
**TIP**\
推荐使用`"auto"`加密方式，这样可以永久保证安全性和兼容性。
{{% /notice %}}