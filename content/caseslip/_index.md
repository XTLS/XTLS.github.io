---
alwaysopen: true
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
# head: <hr/>
hide:
# - toc
post: "&nbsp;"
title: 大案牍术
weight: 7
---

{{% alert theme="warning" %}} **大案牍术记载了 Xray 历史上经过大量研究而破解的迷案, 虽然有些卷宗也许已经迷失在时空里...** {{% /alert %}}

<br />

## 卷宗一览
---

{{% badge success %}}结案{{% /badge %}} **《大案牍术 卷宗一》-- -- 流量统计引起性能离奇下降事件**<br>
- 在开启统计以后居然发现性能有了出乎意外的变化.
- 数据显示各种协议组合,性能的折损各不相同.
- 隐藏在这些变化之后的秘密究竟是什么呢? 
- 名侦探们经过了深入研究, 发现了秘密, 掌握了大量优化性能的新技能.
{{% notice success 相关卷宗 %}}
- [流量统计功能会使裸协议的 ReadV 和 WriteV 同时失效](https://github.com/v2fly/v2ray-core/issues/416)
- [开启各种姿势的统计对各种协议组合性能影响的测试](https://github.com/badO1a5A90/v2ray-doc/blob/main/performance_test/stats/20201110.md) 
{{% /notice %}}
{{% notice success 经办 %}} 
<img src="https://avatars2.githubusercontent.com/u/71564206?s=60" width="32px" height="32px" alt="a"/>[@rprx](https://github.com/rprx)
<img src="https://avatars2.githubusercontent.com/u/4637240?s=60" width="32px" height="32px" alt="a"/>[@Arthur Morgan](https://github.com/badO1a5A90)
{{% /notice %}}
<br />
---

{{% badge success %}}结案{{% /badge %}} **《大案牍术 卷宗二》-- -- IPv6 TCP无法使用tproxy 模式透明代理事件**<br>
- 一直以来 IPv6 TCP 都无法使用tproxy 模式透明代理.
- 名侦探抽丝剥茧解开了其中的隐秘, 解开了事件.
- 甚至发现了一些其他的代码的秘密.
{{% notice success 相关卷宗 %}}
- [任意门 tproxy 模式无法透明代理 IPv6 TCP #48](https://github.com/XTLS/Xray-core/issues/48)
- ~~有一部分丢失在时空中~~
{{% /notice %}}
{{% notice success 经办 %}} 
<img src="https://avatars2.githubusercontent.com/u/71564206?s=60" width="32px" height="32px" alt="a"/>[@rprx](https://github.com/rprx)
<img src="https://avatars2.githubusercontent.com/u/4637240?s=60" width="32px" height="32px" alt="a"/>[@Arthur Morgan](https://github.com/badO1a5A90)
{{% /notice %}}
<br />
---

{{% badge success %}}结案{{% /badge %}} **《大案牍术 卷宗三》 -- -- 我们是如何破解Splice性能下降甚至低于Direct之谜的**<br>
- splice上线以后,陆陆续续有一些用户反映"splice模式为什么比direct还慢"
- 反复测试后终于偶然复现了这个现象
- 于是进行了令人想哭的各种测试, 发现凶手竟然是...
{{% notice success 相关卷宗 %}}
- [我们是如何破解Splice性能下降甚至低于Direct之谜的](https://github.com/XTLS/Xray-core/discussions/59)
- [HARDWARE NAT](http://www.testone.top/?p=905) 
{{% /notice %}}
{{% notice success 经办 %}} 
<img src="https://avatars2.githubusercontent.com/u/71564206?s=60" width="32px" height="32px" alt="a"/>[@rprx](https://github.com/rprx)
<img src="https://avatars2.githubusercontent.com/u/4637240?s=60" width="32px" height="32px" alt="a"/>[@Arthur Morgan](https://github.com/badO1a5A90)
{{% /notice %}}
<br />
---

{{% badge danger %}}未结案{{% /badge %}}  **《大案牍术 卷宗五》 -- -- DS性能之谜?** <br>
- DS应该更快, 然而事实不是想象的那样...
- 究竟为何?
{{% notice danger 相关卷宗 %}}
- [DS 可能存在性能问题](https://github.com/v2fly/v2ray-core/issues/373) 
- [DS性能测试](https://github.com/badO1a5A90/v2ray-doc/blob/master/performance_test/DS/20201030.md)
{{% /notice %}}
{{% notice danger 经办 %}} 
<img src="https://avatars2.githubusercontent.com/u/71564206?s=60" width="32px" height="32px" alt="a"/>[@rprx](https://github.com/rprx)
<img src="https://avatars2.githubusercontent.com/u/4637240?s=60" width="32px" height="32px" alt="a"/>[@Arthur Morgan](https://github.com/badO1a5A90) 
{{% /notice %}}
<br />
---

{{% badge success %}}结案{{% /badge %}}  **《大案牍术 卷宗六》 -- -- 启动内存之优化优化再优化]**<br>
- 启动内存占用有人很少, 有人很多, 有人忽大忽小
- 名侦探们为了寻求真相, 开始了探索, 然而他们一开始甚至摸索到了错误的方向...
- 当然最终, 他们解开了谜底, 并且让启动内存占用终于完美.
{{% notice danger 相关卷宗 %}}
- [希望能够优化一下内存占用](https://github.com/XTLS/Xray-core/issues/68) 
{{% /notice %}}
{{% notice success 经办 %}} 
<img src="https://avatars2.githubusercontent.com/u/71564206?s=60" width="32px" height="32px" alt="a"/>[@rprx](https://github.com/rprx)
<img src="https://avatars2.githubusercontent.com/u/15129300?s=60" width="32px" height="32px" alt="a"/>[@AT!Mi](https://github.com/timi-owo)
<img src="https://avatars2.githubusercontent.com/u/38283893?s=60" width="32px" height="32px" alt="a"/>[@SekiBetu](https://github.com/SekiBetu)
{{% /notice %}}
<br />

---
{{% badge success %}}结案{{% /badge %}}  **《大案牍术 卷宗七》 -- -- 一核有难, 多核围观?**<br>
- 从远古时代开始就有人说CPU会出现一核有难N核围观的现象,有人见过,也有人从来没见过
- 有一天这个现象终于被100%复现了, 于是名侦探们进行了深入的研究测试和分析. 
- 在没有新的报告之前也许可以认为已经解决了...
{{% notice success 相关卷宗 %}}
- [虛擬機4核測速，只有1核跑滿，其餘3核沒盡全力跑 #81](https://github.com/XTLS/Xray-core/issues/81)
- [多核服务端单核心负载问题](https://github.com/v2fly/v2ray-core/issues/466)
- [CPUNum测试](https://github.com/XTLS/Xray-core/discussions/56#discussioncomment-221285) 
{{% /notice %}}
{{% notice success 经办 %}} 
<img src="https://avatars2.githubusercontent.com/u/71564206?s=60" width="32px" height="32px" alt="a"/>[@rprx](https://github.com/rprx)
<img src="https://avatars2.githubusercontent.com/u/53026952?s=60" width="32px" height="32px" alt="a"/>[@Chris Chau](https://github.com/i553041)
<img src="https://avatars2.githubusercontent.com/u/4637240?s=60" width="32px" height="32px" alt="a"/>[@Arthur Morgan](https://github.com/badO1a5A90)
<img src="https://avatars2.githubusercontent.com/u/47851414?s=60" width="32px" height="32px" alt="a"/> [@ldmlz](https://github.com/Menma33)
{{% /notice %}}
<br />

---
{{% badge success %}}结案{{% /badge %}}  **《大案牍术 卷宗八》 -- -- 彩虹六号! 消失的UDP!**<br>
- 某玩家在玩彩虹六号时会出现打一把就掉线的情况.
- 经过了无数次的测试和分析日志,对话了近百层,发现原因竟然是...
- 名侦探们完美的解决了这个问题.
{{% notice success 相关卷宗 %}}
- [用xray的shadowsocks协议玩彩虹六号会出现打一把就掉线的情况 #129](https://github.com/XTLS/Xray-core/issues/129)
{{% /notice %}}
{{% notice success 经办 %}} 
<img src="https://avatars2.githubusercontent.com/u/71564206?s=60" width="32px" height="32px" alt="a"/>[@rprx](https://github.com/rprx)
<img src="https://avatars2.githubusercontent.com/u/56299828?s=60" width="32px" height="32px" alt="a"/>[@GleenJi](https://github.com/GleenJi)
{{% /notice %}}
<br />

---
{{% badge success %}}结案{{% /badge %}}  **《大案牍术 卷宗九》 -- -- 充满疑惑的透明代理!** <br>
- 为何CPU资源占用率居高不下?
- 为何路由器自身不能解析域名?
- 名侦探们围绕这一系列问题展开了**深入浅出**的讨论.
{{% notice success 相关卷宗 %}}
- [1.2.1版本的CPU资源占用率高的问题 #163](https://github.com/XTLS/Xray-core/issues/163)
- [openwrt主路由iptables透明代理时，路由器自身不能解析域名 #185](https://github.com/XTLS/Xray-core/issues/185)
- [openwrt主路由运行xray客户端启用doh后大量出现`context deadline exceeded`错误信息 #186](https://github.com/XTLS/Xray-core/issues/186) 
{{% /notice %}}
{{% notice success 经办 %}} 
<img src="https://avatars2.githubusercontent.com/u/26929766?s=60" width="32px" height="32px" alt="a"/>[@nJhEqnvK](https://github.com/nJhEqnvK)
<img src="https://avatars2.githubusercontent.com/u/41363844?s=60" width="32px" height="32px" alt="a"/>[@BioniCosmos](https://github.com/BioniCosmos) 
<img src="https://avatars2.githubusercontent.com/u/35735190?s=60" width="32px" height="32px" alt="a"/>[@Ray Lin](https://github.com/finpluto)
<img src="https://avatars2.githubusercontent.com/u/4637240?s=60" width="32px" height="32px" alt="a"/>[@Arthur Morgan](https://github.com/badO1a5A90)
<img src="https://avatars2.githubusercontent.com/u/5929170?s=60" width="32px" height="32px" alt="a"/>[@70599](https://github.com/70599)
<img src="https://avatars2.githubusercontent.com/u/57820613?s=60" width="32px" height="32px" alt="a"/>[@kirin10000](https://github.com/kirin10000)
{{% /notice %}}
<br />

---
{{% badge success %}}结案{{% /badge %}}  **《大案牍术 卷宗十》 -- -- 迷失的DNS请求回包! 再次消失的UDP!** <br>
- gole的透明代理执行dig查询DNS时,只能对本地服务器有效,其余的服务器全部超时
- 子曦曦的透明代理亦是如此.
- 名侦探们开始再次寻找消失的UDP.
- 终于构建了100% 可以复现的场景.
- <img src="https://avatars2.githubusercontent.com/u/4637240?s=60" width="32px" height="32px" alt="a"/>[@Arthur Morgan](https://github.com/badO1a5A90) : 能复现就等于能解决
- <img src="https://avatars2.githubusercontent.com/u/71564206?s=60" width="32px" height="32px" alt="a"/>[@rprx](https://github.com/rprx) : 又不难 简单改改
{{% notice success 相关卷宗 %}}
~~丢失在时空中~~
{{% /notice %}}
{{% notice success 经办 %}} 
<img src="https://avatars2.githubusercontent.com/u/71564206?s=60" width="32px" height="32px" alt="a"/>[@rprx](https://github.com/rprx)
<img src="https://avatars2.githubusercontent.com/u/4637240?s=60" width="32px" height="32px" alt="a"/>[@Arthur Morgan](https://github.com/badO1a5A90)
{{% /notice %}}
<br />
---