---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: 性能相关的问题
weight: 3
---


{{% panel theme="warning" header="**Q: 我是瓜瓜, 我想问 Xray 是不是最快的?**" %}}


是. 

<!-- ![](https://github.com/badO1a5A90/v2ray-doc/raw/main/performance_test/Xray/img/xray20201202.png?raw=true) -->

{{% /panel %}}

{{% panel theme="warning" header="**Q: 什么工具或协议组合最快啊?/我应该用什么工具协议组合啊?**" %}}

**个人自建上网,首先考虑安全性和伪装性,然后选择能满足自己需求的最高性能组合**

上网速率的高低, 体感的快慢, 根本的决定因素是**线路** <br />
因此所有的选择跟你的实际环境息息相关,有时候需要一些特殊手段处理, 比如
- 比如低质量的线路可用使用CF加速.
- 比如晚上高峰期严重丢包的情况下, 可用使用mkcp(上限很低), 让线路尽量跑的更流畅一些.

在通常的环境下, 各种工具/协议组合的性能的高低, 可以参考[Xray性能对比测试](https://github.com/badO1a5A90/Performance/blob/main/performance_test/Xray/speed_test_20201202.md)

{{% /panel %}}

{{% panel theme="warning" header="**Q: mac和win 使用splice是不是无解了？**" %}}

- Windows 提供了 TransmitFile，但似乎不能用于两个 TCP 对接
- Windows 10 有 WSL
  - WSL 1 使用 Splice 性能捉急.
  - 不清楚 WSL 2 会不会带来额外拷贝开销，需要更多勇士尝试并反馈.
- macOS暂无计划

{{% /panel %}}

{{% panel theme="warning" header="**Q: 有无xtls+splice+ws的计划？**" %}}

XTLS 原理上不支持 WS

不带 TLS 的 WS 理论上可以支持类似 XTLS 的东西，目前没有实现它的计划

或者 [看看这里](https://github.com/v2ray/discussion/issues/815#issuecomment-680012582)

{{% /panel %}}

<br />
