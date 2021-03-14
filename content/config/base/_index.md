---
alwaysopen: false
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
# head: <hr/>
hide:
# - toc
post: "&nbsp;"
title: 基础配置模块
weight: 3
---

{{% alert theme="warning" %}}**这个章节说明了所有的 Xray 基础配置模块的细节.**{{% /alert %}}

## 基础配置模块
---
{{% notice dark %}}log:[LogObject](./log){{% /notice %}}
日志配置，控制 Xray输出日志的方式. 
{{% notice dark %}}api:[ApiObject](./api) {{% /notice %}}
提供了一些API接口供远程调用。
{{% notice dark %}}dns: [DnsObject](./dns){{% /notice %}}
内置的 DNS 服务器. 如果没有配置此项，则使用系统的 DNS 设置。
{{% notice dark %}}routing: [RoutingObject](./routing){{% /notice %}}
路由功能。可以设置规则分流数据从不同的outbound发出.
{{% notice dark %}}policy: [PolicyObject](./base/policy){{% /notice %}}
本地策略，可以设置不同的用户等级和对应的策略设置。
{{% notice dark %}}inbounds: \[ [InboundObject](./inbounds) \]{{% /notice %}}
一个数组，每个元素是一个入站连接配置。
{{% notice dark %}}outbounds: \[ [OutboundObject](./outbounds) \]{{% /notice %}}
一个数组，每个元素是一个出站连接配置。
{{% notice dark %}}transport: [TransportObject](./base/transport){{% /notice %}}
用于配置 Xray 其它服务器建立和使用网络连接的方式。
{{% notice dark %}}stats: [StatsObject](./stats){{% /notice %}}
用于配置流量数据的统计。
{{% notice dark %}}reverse: [ReverseObject](./reverse){{% /notice %}}
反向代理。可以把服务器端的流量向客户端转发，即逆向流量转发
{{% notice dark %}}fakedns: [FakeDnsObject](./fakedns){{% /notice %}}
FakeDNS. 可配合透明代理使用，以获取实际域名。