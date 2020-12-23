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
