---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: VLESS
weight: 6
---

{{% notice danger important %}}
目前 VLESS 没有自带加密，请用于可靠信道，如 TLS。</br>
目前 VLESS 不支持分享。</br>
{{% /notice %}}

VLESS 是一个无状态的轻量传输协议，它分为入站和出站两部分，可以作为 Xray 客户端和服务器之间的桥梁。

与 [VMess](../vmess) 不同，VLESS 不依赖于系统时间，认证方式同样为 UUID，但不需要 alterId。

## OutboundConfigurationObject

---

```json
{
  "vnext": [
    {
      "address": "example.com",
      "port": 443,
      "users": [
        {
          "id": "27848739-7e62-4138-9fd3-098a63964b6b",
          "encryption": "none",
          "flow": "xtls-rprx-direct",
          "level": 0
        }
      ]
    }
  ]
}
```

{{% notice dark %}} `vnext`: \[ [ServerObject](#serverobject) \]{{% /notice %}}

一个数组, 表示 VLESS 服务器列表，包含一组指向服务端的配置, 其中每一项是一个服务器配置。

<br />

### ServerObject

---

```json
{
  "address": "example.com",
  "port": 443,
  "users": [
    {
      "id": "27848739-7e62-4138-9fd3-098a63964b6b",
      "encryption": "none",
      "flow": "xtls-rprx-direct",
      "level": 0
    }
  ]
}
```

{{% notice dark %}} `address`: address{{% /notice %}}

服务端地址，指向服务端，支持域名、IPv4、IPv6。

{{% notice dark %}} `port`: number{{% /notice %}}

服务端端口，通常与服务端监听的端口相同。

{{% notice dark %}} `users`: \[ [UserObject](#userobject) \]{{% /notice %}}

数组, 一组服务端认可的用户列表, 其中每一项是一个用户配置

<br />

### UserObject

---

```json
{
  "id": "27848739-7e62-4138-9fd3-098a63964b6b",
  "encryption": "none",
  "flow": "xtls-rprx-direct",
  "level": 0
}
```

{{% notice dark %}} `id`: string{{% /notice %}}

VLESS 的用户 ID，必须是一个合法的 UUID，你可以用 [在线工具]() 生成它。

{{% notice dark %}} `encryption`: "none"{{% /notice %}}

需要填 `"none"`，不能留空。

该要求是为了提醒使用者没有加密，也为了以后出加密方式时，防止使用者填错属性名或填错位置导致裸奔。</br>
若未正确设置 encryption 的值，使用 Xray 或 -test 时会收到错误信息。

{{% notice dark %}} `flow`: string{{% /notice %}}

流控模式，用于选择 XTLS 的算法。

目前出站协议中有以下流控模式可选：

- `xtls-rprx-origin`：最初的流控模式。该模式纪念价值大于实际使用价值
- `xtls-rprx-origin-udp443`：同 `xtls-rprx-origin`, 但放行了目标为 443 端口的 UDP 流量
- `xtls-rprx-direct`：所有平台皆可使用的典型流控模式
- `xtls-rprx-direct-udp443`：同 `xtls-rprx-direct`, 但是放行了目标为 443 端口的 UDP 流量
- `xtls-rprx-splice`：Linux 平台下最建议使用的流控模式
- `xtls-rprx-splice-udp443`：同 `xtls-rprx-splice`, 但是放行了目标为 443 端口的 UDP 流量

{{% notice warning %}}
**注意**

当 `flow` 被指定时，还需要将该出站协议的 `streamSettings.security` 一项指定为 `xtls`，`tlsSettings` 改为 `xtlsSettings`。详情请参考 [streamSettings](../../transport#streamsettingsobject)。

此外，目前 XTLS 仅支持 TCP、mKCP、DomainSocket 这三种传输方式。
{{% /notice %}}

{{% notice %}}
**关于 `xtls-rprx-*-udp443` 流控模式**

VLESS 和 Trojan 协议使用 TCP 传输 UDP，即 UDP over TCP，但 XTLS 不会对 UoT 的数据进行处理。所以为了防止上层应用使用 QUIC，启用 XTLS 时客户端会自动拦截 UDP/443 的请求。若不需要拦截，请在客户端填写 `xtls-rprx-*-udp443`，服务端不变。
{{% /notice %}}

{{% notice danger important %}}
Splice 是 Linux Kernel 提供的函数，系统内核直接转发 TCP，不再经过 Xray 的内存，大大减少了数据拷贝、CPU 上下文切换的次数。

Splice 模式的的使用限制：

- Linux 环境
- 入站协议为 `Dokodemo door`、`Socks`、`HTTP` 等纯净的 TCP 连接, 或其它使用了 XTLS 的入站协议
- 出站协议为 VLESS + XTLS 或 Trojan + XTLS

此外，使用 Splice 时网速显示会滞后，这是特性，不是 bug。

需要注意的是，使用 mKCP 协议时不会使用 Splice（是的，虽然没有报错，但实际上根本没用到）。
{{% /notice %}}

{{% notice dark %}} `level`: number{{% /notice %}}

用户等级，连接会使用这个用户等级对应的[本地策略](../../policy#levelpolicyobject)。

level 的值, 对应 [policy](../../policy#policyobject) 中 level 的值. 如不指定, 默认为 0.

<br />

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
- [XrayN](https://github.com/2dust/XrayN)（v3.21+），支持 Windows
- [XrayNG](https://github.com/2dust/XrayNG)（v1.3.0+），支持 Android
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
