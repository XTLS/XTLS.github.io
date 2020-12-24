---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: 下载和安装中的问题
weight: 1
---

{{% panel theme="warning" header="**Q: 我想自己下载安装包, 可是release好多文件, 我要下载哪一个呢?** " %}}

请先使用谷歌搜索您的设备型号, 确认您设备使用的架构, 然后下载对应的版本. <br />

{{% /panel %}}

{{% panel theme="warning" header="**Q: 我在VPS上运行了脚本, 好像安装好了, 可是似乎没反应?/系统服务不能启动?/我也不知道有没有安装成功?** " %}}

使用命令 'journalctl -u xray' 查看 xray 的相关日志。<br />
或者<br /> 
终端命令行中执行 'xray run -c 您的config.json文件路径' 来查看相关信息

{{% /panel %}}

{{% panel theme="warning" header="**Q: 配置文件在哪个目录。谢谢!** " %}}

这位同学你可真的是不看文档, 不过因为你**很有礼貌**, 我可以告诉你在[这里有所有文件的安装位置](https://github.com/XTLS/Xray-install#xray-install)

{{% /panel %}}


