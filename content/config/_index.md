---
alwaysopen: false
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
# head: <hr/>
hide:
# - toc
post: "&nbsp;📜"
title: 配置文件
weight: 3
---

{{% alert theme="warning" %}}**这个章节将告诉您所有的 Xray 配置细节,掌握这些内容,在您手中 Xray 将发挥更大威力.**{{% /alert %}}

## 概述

---

Xray 的配置文件为 json 格式, 客户端和服务端的配置格式没有区别, 只是实际的配置内容不一样。  
形式如下:

```json
{
  "log": {},
  "api": {},
  "dns": {},
  "routing": {},
  "policy": {},
  "inbounds": [],
  "outbounds": [],
  "transport": {},
  "stats": {},
  "reverse": {}
}
```

{{% notice warning %}}
**TIP**\
如果你刚接触 Xray, 您可以先点击查看[快速入门中的配置运行]({{%relref "../guide/install.md" %}}), 学习最基本的配置方式, 然后查看本章节内容以掌握所有 Xray 的配置方式.
{{% /notice %}}

<br />
### 模块说明
---
{{% notice dark %}}log:[LogObject](./log){{% /notice %}}
日志配置，控制 Xray输出日志的方式. 
{{% notice dark %}}api:[ApiObject](./api) {{% /notice %}}
提供了一些API接口供远程调用。
{{% notice dark %}}dns: [DnsObject](./dns){{% /notice %}}
内置的 DNS 服务器. 如果没有配置此项，则使用系统的 DNS 设置。
{{% notice dark %}}routing: [RoutingObject](./routing){{% /notice %}}
路由功能。可以设置规则分流数据从不同的outbound发出.
{{% notice dark %}}policy: [PolicyObject](./policy){{% /notice %}}
本地策略，可以设置不同的用户等级和对应的策略设置。
{{% notice dark %}}inbounds: \[ [InboundObject](./inbounds) \]{{% /notice %}}
一个数组，每个元素是一个入站连接配置。
{{% notice dark %}}outbounds: \[ [OutboundObject](./outbounds) \]{{% /notice %}}
一个数组，每个元素是一个出站连接配置。
{{% notice dark %}}transport: [TransportObject](./transport){{% /notice %}}
用于配置 Xray 其它服务器建立和使用网络连接的方式。
{{% notice dark %}}stats: [StatsObject](./stats){{% /notice %}}
用于配置流量数据的统计。
{{% notice dark %}}reverse: [ReverseObject](./reverse){{% /notice %}}
反向代理。可以把服务器端的流量向客户端转发，即逆向流量转发
