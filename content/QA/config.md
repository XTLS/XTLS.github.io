---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: 配置和运行时的问题
weight: 2
---

{{% panel theme="warning" header="**Q: 为什么windows下只有一个可执行程序? 我想要隐藏执行, 嘤嘤嘤.**" %}}

A1: <br />
方式很多,如:
建立一个hiderun.vbs文件,放在xray.exe同一目录
编辑内容为
```
CreateObject("WScript.Shell").Run "xray.exe",0
```
运行此vbs即可, 然后放个快捷方式到shell:startup里面，就可以开机启动了

---
A2: <br />
也可以通过创建window服务/计划任务等方式实现,亦可借助一些专门的后台运行的工具(不太必要)

---
A3: <br />
[CHP](http://www.commandline.co.uk/chp/) (Create Hidden Process)

---
A4: <br />
用[winsw](https://github.com/winsw/winsw)可以将xray-core添加为Win的系统服务，开机自动运行，不需要手动隐藏窗口。

---
A5: <br />
写一个bat开机启动<br />
```
@echo off
if "%1" == "h" goto begin
mshta vbscript:createobject("wscript.shell").run("%~nx0 h",0)(window.close)&&exit
:begin

D:/Xray run -c D:/Xray.json `
```
{{% /panel %}}

<br />

{{% panel theme="warning" header="**Q: 无法用做Tor前置代理 [#66](https://github.com/XTLS/Xray-core/issues/66)** " %}}

关闭 sniffing 再试试.
{{% /panel %}}

<br />

{{% panel theme="warning" header="**Q: 如何自定义.dat文件的文件位置?** " %}}

设置环境变量 XRAY_LOCATION_ASSET 的值
{{% /panel %}}

<br />

{{% panel theme="warning" header="**Q: 为什么我配置了SSL证书但不可用?** " %}}

- 检查证书权限
- 使用 fullchain 证书
{{% /panel %}}

<br />

{{% panel theme="warning" header="**Q: 我以前用gfw列表, 我现在用Xray怎么进行分流呢?** " %}}

使用geo*.dat, 并且合理配置路由规则.

{{% /panel %}}

<br />

{{% panel theme="warning" header="**Q: 我还是上一题的提问者, 那么我如何使用dat数据文件和配置路由规则达到国内走直连,其他走代理的目的呢?** " %}}

~~等待好心人写一篇小小白白话文~~

{{% /panel %}}

<br />