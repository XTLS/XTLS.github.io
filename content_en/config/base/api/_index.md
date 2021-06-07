---
date: "2020-12-23T00:00:00.000Z"
description: Project X Documents
title: API interfaces
weight: 2
---



The API interface configuration provides a number of [gRPC-based](https://grpc.io/) API interfaces for remote calls.

The interface can be opened via the api configuration module. When api configuration is enabled, xray will create its own outbound proxy to which all inbound API connections must be manually routed via [Routing](../routing) rules.

Please refer to the [related configurations](#Related configurations) in this section.

If you are developer, please refer to the [API document](https://github.com/crossfw/Xray-API-documents)

{{% notice warning %}}
Most users will not use this API and newcomers can simply ignore it.
{{% /notice %}}

## ApiObject
---
`ApiObject` corresponds to the `api` entry in the configuration file.

```json
{
  "api": {
    "tag": "api",
    "services": [
      "HandlerService",
      "LoggerService",
      "StatsService"
    ]
  }
}
```
{{% notice dark %}} `tag`: string{{% /notice %}}

Outbound agent tag.

{{% notice dark %}} `services`: \[string\]{{% /notice %}}

List of open APIs, check [API list](# Supported-api-lists). for optional values.

<br />
## Related configurations
---

You can add an api's inbound to the inbounds configuration.

```json
"inbounds": [
  {
    "listen": "127.0.0.1",
    "port": 10085,
    "protocol": "dokodemo-door",
    "settings": {
      "address": "127.0.0.1"
    },
    "tag": "api"
  }
]
```

Add routing rules for api inbound in the routing configuration.

```json
"routing": {
  "settings": {
    "rules": [
      {
        "inboundTag": [
          "api"
        ],
        "outboundTag": "api",
        "type": "field"
      }
    ]
  },
  "strategy": "rules"
}
```

<br />
## Supported-api-lists
---

### HandlerService

Some of the APIs that are available for modifications to inbound and outbound agents are

- Adding a new inbound agent.
- Adding a new outbound agent.
- Removing an existing inbound agent.
- deleting an existing outbound agent.
- adding a user to an inbound agent. (only VMess, VLESS, Trojan, Shadowsocks (v1.3.0+) are supported)
- deleting a user from an inbound agent. (only VMess, VLESS, Trojan, Shadowsocks (v1.3.0+) are supported)

### LoggerService

Support for restarting the built-in Logger, which can be used in conjunction with logrotate for some log file manipulation.

### StatsService

Built-in statistical services, see [Statistical Information](../stats) for details.
