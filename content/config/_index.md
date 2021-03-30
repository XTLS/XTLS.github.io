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
  "reverse": {},
  "fakedns":{}
}
```

{{% notice warning %}}
**TIP**\
如果你刚接触 Xray, 您可以先点击查看[快速入门中的配置运行]({{%relref "../guide/install.md" %}}), 学习最基本的配置方式, 然后查看本章节内容以掌握所有 Xray 的配置方式.
{{% /notice %}}