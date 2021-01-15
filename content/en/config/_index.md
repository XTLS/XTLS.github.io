---
alwaysopen: false
date: "2021-01-15T00:00:00.000Z"
description: Documentation for Project X
# head: <hr/>
hide:
# - toc
post: "&nbsp;📜"
title: Configuration files
weight: 3
---

{{% alert theme="warning" %}}**This section will give you all the details of xray configuration. Mastered this, xray will be even more powerful in your hands.**{{% /alert %}}

## Summary

---

The xray configuration file is in json format, there is no difference between the client and server configuration formats, only the actual content of the configuration is different.
As follows:

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
If you are new to xray, you can learn the basics first by clicking on[Download and install]({{%relref "../guide/install.md" %}}), then read this section for all the ways to configure xray.
{{% /notice %}}
