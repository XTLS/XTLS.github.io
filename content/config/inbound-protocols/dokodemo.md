---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: Dokodemo door
weight: 2
---

Dokodemo door（任意门）可以监听一个本地端口，并把所有进入此端口的数据发送至指定服务器的一个端口，从而达到端口映射的效果。

## InboundConfigurationObject

---

```json
{
  "address": "8.8.8.8",
  "port": 53,
  "network": "tcp",
  "timeout": 0,
  "followRedirect": false,
  "userLevel": 0
}
```

{{% notice dark %}} `address`: address{{% /notice %}}

将流量转发到此地址。可以是一个 IP 地址，形如 `"1.2.3.4"`，或者一个域名，形如 `"xray.com"`。字符串类型。

当 `followRedirect`（见下文）为 `true` 时，`address` 可为空。

{{% notice dark %}} `port`: number{{% /notice %}}

将流量转发到目标地址的指定端口，范围 \[1, 65535\]，数值类型。必填参数。

{{% notice dark %}} `network`: "tcp" | "udp" | "tcp,udp"{{% /notice %}}

可接收的网络协议类型。比如当指定为 `"tcp"` 时，仅会接收 TCP 流量。默认值为 `"tcp"`。

{{% notice dark %}} `timeout`: number{{% /notice %}}

连接空闲的时间限制。单位为秒。默认值为 `300`。处理一个连接时，如果在 `timeout` 时间内，没有任何数据被传输，则中断该连接。

{{% notice dark %}} `followRedirect`: true | false{{% /notice %}}

当值为 `true` 时，dokodemo-door 会识别出由 iptables 转发而来的数据，并转发到相应的目标地址。

可参考 [传输配置](../../transport#sockoptobject) 中的 `tproxy` 设置。

{{% notice dark %}} `userLevel`: number{{% /notice %}}

用户等级，连接会使用这个用户等级对应的[本地策略](../../policy#levelpolicyobject)。

userLevel 的值, 对应 [policy](../../policy#policyobject) 中 level 的值. 如不指定, 默认为 0.

<br />

## 透明代理配置样例
---
