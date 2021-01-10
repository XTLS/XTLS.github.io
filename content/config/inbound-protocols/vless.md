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
      "id": "27848739-7e62-4138-9fd3-098a63964b6b",
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

一个数组，包含一系列强大的回落分流配置（可选）。

</br>

### ClientObject

---

```json
{
  "id": "27848739-7e62-4138-9fd3-098a63964b6b",
  "level": 0,
  "email": "love@xray.com",
  "flow": "xtls-rprx-direct"
}
```

{{% notice dark %}} `id`: string{{% /notice %}}

VLESS 的用户 ID，必须是一个合法的 UUID，你也可以用 [UUID]() 生成它。

{{% notice dark %}} `level`: number{{% /notice %}}

用户等级，连接会使用这个用户等级对应的[本地策略](../../policy#levelpolicyobject)。

level 的值, 对应 [policy](../../policy#policyobject) 中 level 的值. 如不指定, 默认为 0.

{{% notice dark %}} `email`: string{{% /notice %}}

用户邮箱，用于区分不同用户的流量（日志、统计）。

{{% notice dark %}} `flow`: string{{% /notice %}}

流控模式，用于选择 XTLS 的算法。

目前入站协议中有以下流控模式可选：

- `xtls-rprx-origin`：最初的流控模式，此时客户端仅可选择 `xtls-rprx-origin` 和 `xtls-rprx-origin-udp443` 这两种流控模式。该模式纪念价值大于实际使用价值
- `xtls-rprx-direct`：**推荐**，所有平台皆可使用的典型流控方式，此时客户端可选择任何流控模式

{{% notice warning %}}
**注意**

当 `flow` 被指定时，还需要将该入站协议的 `streamSettings.security` 一项指定为 `xtls`，`tlsSettings` 改为 `xtlsSettings`。详情请参考 [streamSettings](../../transport#streamsettingsobject)。

此外，目前 XTLS 仅支持 TCP、mKCP、DomainSocket 这三种传输方式。
{{% /notice %}}

</br>

## 配置模板
---

[Xray-examples](https://github.com/xtls/Xray-examples) 有完整的 VLESS 配置示例供参考。（但目前不能保证其它协议的配置示例质量）

</br>

## 客户端开发指引
---
1. VLESS 协议本身还会有不兼容升级，但客户端配置文件参数基本上是只增不减的。**所以如果你开发了用 core 的客户端，现在就可以适配。** iOS 客户端的协议实现则需紧跟升级。
2. **视觉标准：UI 标识请统一用 VLESS**，而不是 VLess / Vless / vless，配置文件不受影响，代码内则顺其自然。
3. `encryption` 应做成输入框而不是选择框，新配置的默认值应为 `none`，若用户置空则应代填 `none`。

**以下为已支持图形化配置 VLESS 的部分客户端列表，推荐使用：**（按实现时间先后顺序排列）

<!-- - [QXray](https://github.com/QXray/QXray)（v2.6.3+），支持 Linux、macOS、Windows
- [v2raN](https://github.com/2dust/XrayN)（v3.21+），支持 Windows
- [v2rayNG](https://github.com/2dust/XrayNG)（v1.3.0+），支持 Android
- [PassWall](https://github.com/xiaorouji/openwrt-package)（v3.9.35+），支持 OpenWrt
- [XrayA](https://github.com/mzz2017/XrayA)（v1.0.0+），支持 Linux
- [XrayU](https://github.com/yanue/XrayU)（v3.0.0+），支持 macOS -->

</br>

## 新型协议回落模式解析
---
{{% badge warning %}}In progress{{% /badge %}}

</br>

## VLESS 分享链接标准
---
{{% badge warning %}}In progress{{% /badge %}}
