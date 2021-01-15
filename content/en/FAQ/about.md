---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: 关于Xray
weight: 8
---

{{% panel theme="warning" header="**Q: XXX功能什么时候出来呀!** " %}}

康明宋
{{% /panel %}}

{{% panel theme="warning" header="**Q: 为什么会开发 Xray ?** " %}}

兴趣使然

 <img src="../hero.jpg" width = "20%" height = "20%" alt="hero" align="left" />

{{% /panel %}}

{{% panel theme="warning" header="**Q: Xray收钱吗? 可以按我的要求定制吗?** " %}}

Xray 不沾钱,这是个兴趣使然的项目.<br>
Xray 不接受定制, 只根据大家的需求进行兴趣使然的开发.

{{% /panel %}}

{{% panel theme="warning" header="**Q: XXX也是你们开发的吗?** " %}}

**请明辨您获取资源的来源, 小心使用, 谨防蜜罐**<br />
我们的开发均托管在 github, 不在[project X 仓库](https://github.com/XTLS)的, 都不属于 project X 开发.

当然也有很多大佬支持着 Xray 的开发和完善了生态圈, 请见[这里](../../links).

我们也欢迎所有人一起来完善 Xray.

{{% /panel %}}

{{% panel theme="warning" header="**Q:  Xray 和 v2ray 还有 v2fly 是什么关系啊?** " %}}

~~禁忌の歷史迷局~~

v2ray-core 项目是继Shadowsocks项目之后活跃的独立项目。<br>
但在2019年，原作者Victoria Raymond突然从 GitHub 项目、社交网站等失联，开发一度陷入停滞。

v2fly项目组基于v2ray项目的技术基础，fork并成立了社区化项目v2fly。<br>
后续于2020年9月与 GitHub 官方沟通确认后，取消了与原 v2ray 项目的fork关系，正式成为独立的社区项目组织。

随后，v2fly社区的贡献者之一 rprx，给v2fly项目带来了VLESS协议，回落分流，XTLS黑科技等一系列更新，v2fly项目进入了"腹泻式"更新时期。<br>
v2fly社区一些成员在某些技术选择及社区理念方面与 rprx 产生分歧。<br>
此后在一些其他外因的促使下，v2fly社区自 v4.33.0 版本起移除了其核心对 XTLS 的支持，但保留了 VLESS 协议支持。<br>
最终 rprx 决定独立分支并成立 project X 社区进行维护。

2020年11月25日，Xray 1.0正式发布，成为了基于原 v2ray 项目基础的第二个社区分支版本。

Xray 一直保持着前行，并且在将来也会保持不断前行，您可以在[大史记](../../about/new)查看 Xray 一路前行中发生的各种杂事秘辛。

---

Xray 项目的核心技术创新是：

- VLESS 协议

- 回落分流
防主动探测, 强大而且灵活的分流.

- XTLS 及流控
保证数据流获得标准TLS加密的同时，借助readV, Zero Copy等技术，最大限度减少数据流转过程中冗余的资源使用（表现为性能大幅提升、CPU 占用大幅降低、网速和延迟接近接近硬件的极限）

Xray 项目的核心社区理念是：

- 活跃的开发社区

  Xray 保持着活跃的开发与更新，项目成立至今保持着每周有效更新的节奏，积极倾听社区反馈和用户痛点，快速迭代新特性、并持续解决历史遗留问题（详情可直接参考相关 release notes）

- 明确的价值追求

  Xray项目组反对技术壁垒化、倡导社区分享和互助，坚定维护友善积极的社区氛围。
{{% /panel %}}

<br />
