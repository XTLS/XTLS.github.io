---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: 命令参数
weight: 3
---

{{% notice info %}}
**TIP**\
Xray 使用 go 风格的命令及参数
{{% /notice %}}

## 获取基本命令

---

您可以运行 xray help 来获得所有 xray 最基础的用法, 以及可用的命令及说明.

```
Xray is a platform for building proxies.

Usage:

        xray <command> [arguments]

The commands are:

        run          Run Xray with config, the default command
        version      Show current version of Xray
        api          Call an API in an Xray process
        tls          TLS tools
        uuid         Generate new UUIDs

Use "xray help <command>" for more information about a command.
```

<br />

### xray run
---
使用方法:
```
 xray run [-c config.json] [-confdir dir]
```

Run Xray with config, the default command.

The -config=file, -c=file flags set the config files for
Xray. Multiple assign is accepted.

The -confdir=dir flag sets a dir with multiple json config

The -format=json flag sets the format of config files.
Default "json".

The -test flag tells Xray to test config files only,
without launching the server

<br />

### xray version
---
使用方法:
```
 xray version
```
Version prints the build information for Xray executables.

<br />

### xray api
---
使用方法:
```
xray api <command> [arguments]
```

The commands are:

        restartlogger Restart the logger
        stats         Get statistics
        statsquery    Query statistics
        statssys      Get system statistics
        adi           Add inbounds
        ado           Add outbounds
        rmi           Remove inbounds
        rmo           Remove outbounds

<br />

### xray tls
---
使用方法:
```
xray tls <command> [arguments]
```

The commands are:

        cert         Generate TLS certificates
        ping         Ping the domain with TLS handshake

<br />

### xray uuid
---
使用方法:
```
xray uuid
```
Generate new UUIDs.

<br />

{{% notice info %}}
当`-config`没有指定时，Xray 将先后尝试从以下路径加载`config.json`:
- 工作目录（Working Directory）
- [环境变量](../config/env.md)中`Xray.location.asset`所指定的路径
{{% /notice %}}

