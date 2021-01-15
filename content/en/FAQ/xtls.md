---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: XTLS相关问题
weight: 6
---

{{% panel theme="warning" header="**Q: XTLS是个啥?好吃吗?** " %}}

XTLS 是 Xray 的原创黑科技, 也是使 Xray 性能一骑绝尘的核心动力

点此查看详情 [XTLS](../../config/xtls)
{{% /panel %}}

{{% panel theme="warning" header="**Q: TLS和XTLS有啥区别?XTLS会不安全吗?** " %}}

安全性没有区别. 传输的数据都是**完全加密**的<br>
TLS / XTLS 是目前最安全的传输加密方案, 且外部看来流量类型和正常上网具有一致性.

性能有区别. XTLS比TLS快的多的多的多.<br>
启用 XTLS 并且配置合适的XTLS流控模式, 可以在保持和 TLS 相同的安全性的前提下, 性能达到数倍甚至十几倍的提升.
{{% /panel %}}

{{% panel theme="warning" header="**Q: 听说XTLS的数据是不完全加密的，是这样的吗?** " %}}

此说法错误，XTLS传输的数据是完全加密的，和TLS没有区别。

XTLS去掉了旧时代翻墙模式中不必要的对加密数据的重复加密。即:
- 如果原始数据是已经经过TLS加密的数据（通常上网，绝大部分数据都是已经TLS加密过的数据了），此时XTLS**不再**和旧时代工具一样进行无用的重复加密，从而获得卓越性能。
- 如果原始数据不是经过TLS加密的，而是明文数据，XTLS会进行TLS加密。
<br />

因此XTLS数据仍然是完全TLS加密的，并且去掉了毫无意义的不必要的重复加密，而不是所谓的不完全加密。<br>
同时外部看来流量类型和正常上网具有一致性，更具隐蔽性，是最安全的模式。
{{% /panel %}}
