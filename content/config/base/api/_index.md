---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: API接口
weight: 2
---



API接口配置提供了一些基于 [gRPC](https://grpc.io/)的 API 接口供远程调用。  

可以通过api配置模块开启接口. 当api配置开启时，Xray 会自建一个出站代理， 须手动将所有的 API 入站连接通过 [路由规则配置](../routing) 指向这一出站代理。  

请参考本节中的[相关配置](#相关配置)

使用API开发相关软件，请参考 [API 开发文档](https://github.com/crossfw/Xray-API-documents)

{{% notice warning %}}
大多数用户并不会用到此 API，新手可以直接忽略这一项。
{{% /notice %}}

## ApiObject
---
`ApiObject` 对应配置文件的 `api` 项。

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

出站代理标识。

{{% notice dark %}} `services`: \[string\]{{% /notice %}}

开启的 API 列表，可选的值见 [API 列表](#支持的-api-列表)。

<br />
## 相关配置
---

可以在 inbounds 配置中增加一个 api 的 inbound

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

在路由配置中增加针对api inbound的路由规则

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
## 支持的 API 列表
---

### HandlerService

一些对于入站出站代理进行修改的 API，可用的功能如下：

- 添加一个新的入站代理；
- 添加一个新的出站代理；
- 删除一个现有的入站代理；
- 删除一个现有的出站代理；
- 在一个入站代理中添加一个用户（仅支持 VMess、VLESS、Trojan、Shadowsocks（v1.3.0+））；
- 在一个入站代理中删除一个用户（仅支持 VMess、VLESS、Trojan、Shadowsocks（v1.3.0+））；

### LoggerService

支持对内置 Logger 的重启，可配合 logrotate 进行一些对日志文件的操作。

### StatsService

内置的数据统计服务，详见 [统计信息](../stats)。
