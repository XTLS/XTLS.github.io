---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: VLESS
weight: 5
---

{{% notice danger important %}}
目前 VLESS 没有自带加密，请用于可靠信道，如 TLS。</br>
目前 VLESS 不支持分享。</br>
{{% /notice %}}

VLESS 是一个无状态的轻量传输协议，它分为入站和出站两部分，可以作为 Xray 客户端和服务器之间的桥梁。

与 [VMess](../vmess) 不同，VLESS 不依赖于系统时间，认证方式同样为 UUID，但不需要 alterId。

## InboundConfigurationObject

```json
{
  "clients": [
    {
      "id": "5783a3e7-e373-51cd-8642-c83782b807c5",
      "level": 0,
      "email": "love@xray.com",
      "flow": "xtls-rprx-direct"
    }
  ],
  "decryption": "none",
  "fallbacks": [
    {
      "dest": 80
    }
  ]
}
```

{{% notice dark %}} `clients`: \[ [ClientObject](#clientobject) \]{{% /notice %}}

一个数组，代表一组服务端认可的用户.

其中每一项是一个用户 [ClientObject](#clientobject)。

{{% notice dark %}} `decryption`: "none"{{% /notice %}}
现阶段需要填 `"none"`，不能留空。</br>
若未正确设置 decryption 的值，使用 Xray 或 -test 时会收到错误信息。

注意这里是 decryption，和 clients 同级。</br>
decryption 和 vmess 协议的 encryption 的位置不同，是因为若套一层约定加密，服务端需要先解密才能知道是哪个用户。</br>

{{% notice dark %}} `fallbacks`: \[ [FallbackObject](../../fallback) \]{{% /notice %}}

一个数组，包含一系列强大的回落分流配置（可选）。<br>
fallbacks 的具体配置请点击[FallbackObject](../../fallback/#fallbacks-配置)

</br>

### ClientObject

---

```json
{
  "id": "5783a3e7-e373-51cd-8642-c83782b807c5",
  "level": 0,
  "email": "love@xray.com",
  "flow": "xtls-rprx-direct"
}
```

{{% notice dark %}} `id`: string{{% /notice %}}

VLESS 的用户 ID，可以是任意小于30字节的字符串, 也可以是一个合法的UUID. </br>
自定义字符串和其映射的 UUID 是等价的, 这意味着你将可以这样在配置文件中写id来标识同一用户,即
  - 写    "id": "我爱🍉老师1314",
  - 或写    "id": "5783a3e7-e373-51cd-8642-c83782b807c5" (此UUID是 `我爱🍉老师1314` 的 UUID 映射)  
 
其映射标准在[VLESS UUID 映射标准：将自定义字符串映射为一个 UUIDv5](https://github.com/XTLS/Xray-core/issues/158)

你可以使用命令 `xray uuid -i "自定义字符串"` 生成自定义字符串所映射的的 UUID.</br>
也可以使用命令 `xray uuid` 生成随机的UUID. 

{{% notice dark %}} `level`: number{{% /notice %}}

用户等级，连接会使用这个用户等级对应的[本地策略](../../base/policy#levelpolicyobject)。

level 的值, 对应 [policy](../../base/policy#policyobject) 中 level 的值. 如不指定, 默认为 0.

{{% notice dark %}} `email`: string{{% /notice %}}

用户邮箱，用于区分不同用户的流量（会体现在日志、统计中）。

{{% notice dark %}} `flow`: string{{% /notice %}}

流控模式，用于选择 XTLS 的算法。

目前入站协议中有以下流控模式可选：

- `xtls-rprx-origin`：最初的流控模式，此时客户端仅可选择 `xtls-rprx-origin` 和 `xtls-rprx-origin-udp443` 这两种流控模式。该模式纪念价值大于实际使用价值
- `xtls-rprx-direct`：**推荐**，所有平台皆可使用的典型流控方式，此时客户端可选择任何流控模式

{{% notice warning %}}
**注意**

当 `flow` 被指定时，还需要将该入站协议的 `streamSettings.security` 一项指定为 `xtls`，`tlsSettings` 改为 `xtlsSettings`。详情请参考 [streamSettings](../../base/transport#streamsettingsobject)。

此外，目前 XTLS 仅支持 TCP、mKCP、DomainSocket 这三种传输方式。
{{% /notice %}}

</br>