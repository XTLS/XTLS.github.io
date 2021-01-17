---
date: "2020-01-17T00:00:00.000Z"
description: Project X Documents
title: Command parameters
weight: 3
---

{{% notice info %}}
**TIP**\
Xray uses go-style commands and parameters
{{% /notice %}}

## Get basic commands

---

You can run `xray help` to get all the basics of xray usage, as well as the available commands and instructions.

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
Usage:
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
Usage:
```
 xray version
```
Version prints the build information for Xray executables.

<br />

### xray api
---
Usage:
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
Usage:
```
xray tls <command> [arguments]
```

The commands are:

        cert         Generate TLS certificates
        ping         Ping the domain with TLS handshake

<br />

### xray uuid
---
Usage:
```
xray uuid
```
Generate new UUIDs.

<br />

{{% notice info %}}
When `-config` is not specified, xray will successively try to load `config.json` from the following path:
- `-working directory` (working directory)
- [Environment Variables](../config/env) from the path specified by `xray.location.asset`
{{% /notice %}}

