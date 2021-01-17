---
alwaysopen: false
date: "2020-01-17T00:00:00.000Z"
description: Project X Documents
# head: <hr/>
hide:
# - toc
# post: "&nbsp;\U0001F44B"
title: Environment Variables
weight: 11
---

Xray provides the following environment variables for modifying some of xray's underlying configuration.

<br />

## XTLS information display

---

### VLESS

---

- Name: `xray.vless.xtls.show` or `XRAY_VLESS_XTLS_SHOW`.
- Default value: `""`.

If this environment variable is set to true when using the VLESS protocol, xray will output information about XTLS in the terminal or logs.

{{% notice info %}}
**TIP**\
You can turn on this environment variable and determine if XTLS has been successfully applied based on whether XTLS-related information is output.
{{% /notice %}}

### TROJAN

---

- Name: `xray.trojan.xtls.show` or `XRAY_TROJAN_XTLS_SHOW`.
- Default value: `""`.

If this environment variable is set to true when using the trojan protocol, xray will output information about XTLS in the terminal or logs.

{{% notice info %}}
**TIP**\
You can turn on this environment variable and determine if XTLS has been successfully applied based on whether XTLS-related information is output.
{{% /notice %}}

<br />

## Resource file path

---

- Name: `xray.location.asset` or `XRAY_LOCATION_ASSET`.
- Default value: same path as xray file.

This environment variable specifies a folder location which should contain the geoip.dat and geosite.dat files.

<br />

## Configuration file location

---

- Name: `xray.location.config` or `XRAY_LOCATION_CONFIG`.
- Default value: same path as xray file.

This environment variable specifies the location of a folder that should contain the config.json file.

<br />

## Multi-configuration directory

---

- Name: `xray.location.confdir` or `XRAY_LOCATION_CONFDIR`.
- Default value: `""`.

The `.json` files in this directory are read in filename order as a multi-configuration option.

<br />
