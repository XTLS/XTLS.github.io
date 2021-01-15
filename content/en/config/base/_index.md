---
alwaysopen: false
date: "2020-01-15T00:00:00.000Z"
description: Documentation for Project X
# head: <hr/>
hide:
# - toc
post: "&nbsp;"
title: Basic configuration module
weight: 3
---

{{% alert theme="warning" %}}**This section explains all the details of the Xray base configuration module.**{{% /alert %}}

## Basic configuration module
---
{{% notice dark %}}log:[LogObject](./log){{% /notice %}}
Logging configuration, which controls how the Xray outputs logs.
{{% notice dark %}}api:[ApiObject](./api) {{% /notice %}}
A number of API interfaces, which are provided for remote calls.
{{% notice dark %}}dns: [DnsObject](./dns){{% /notice %}}
The built-in DNS server. If this is not configured, the system's DNS settings will be used.
{{% notice dark %}}routing: [RoutingObject](./routing){{% /notice %}}
Routing function. Rules can be set to split data into different outbounds.
{{% notice dark %}}policy: [PolicyObject](./base/policy){{% /notice %}}
Local policies. You can set different user levels and corresponding policy settings.
{{% notice dark %}}inbounds: \[ [InboundObject](./inbounds) \]{{% /notice %}}
An array, each element of which is an inbound connection configuration.
{{% notice dark %}}outbounds: \[ [OutboundObject](./outbounds) \]{{% /notice %}}
An array, each element of which is an outbound connection configuration.
{{% notice dark %}}transport: [TransportObject](./base/transport){{% /notice %}}
This is used to configure how xray establishes and uses network connections with other servers.
{{% notice dark %}}stats: [StatsObject](./stats){{% /notice %}}
This is used to configure the statistics of traffic data.
{{% notice dark %}}reverse: [ReverseObject](./reverse){{% /notice %}}
Reverse Proxy. It can forward server-side traffic to the client, i.e. reverse traffic forwarding.
