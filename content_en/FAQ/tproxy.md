---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: 透明代理相关问题
weight: 4
---

{{% panel theme="warning" header="**Q: 我搭建了透明代理给我和我同宿舍/隔壁宿舍的同学用, 日志中出现很多 too many open files .怎么办? 急,在线等.** " %}}

~~让你的同学少用BT过代理下载American Video~~ <br />

在 /etc/systemd/system/xray.service 的 [Service] 下加 LimitNPROC=10000 和 LimitNOFILE=1000000.

{{% /panel %}}

{{% panel theme="warning" header="**Q: sniffing的具体功能是什么，什么时候发挥作用?** " %}}

sniffing流量探测主要作用是用在透明代理等用途.

他的一个典型工作流程是这样的.<br />
比如你有一个设备上网,去访问abc.com, 首先设备通过DNS查询得到abc.com的IP是1.2.3.4,然后设备会向1.2.3.4发起连接.<br />
- 透明代理不设置嗅探的话,收到的连接请求是1.2.3.4,是不能走域名规则的路由分流的.
- 透明代理设置了sniffing,处理这个流量时,会从这个流量的数据中,嗅探出域名,abc.com. 然后把1.2.3.4重置为abc.com. 路由就可以根据域名进行符合域名规则的分流, 或者做更多的事情.

因为变成了一个向abc.com请求的连接,就可以做更多的事情,包括路由域名规则分流, 重新做DNS解析等等...

另一个sniffing的作用是可以嗅探BT流量的标识,把流量归类成BT类型. 然后可以在路由中根据BT类型来做规则,比如服务端用来拦截BT流量,比如客户端把BT流量固定发送到某个VPS去代理等.

{{% /panel %}}
