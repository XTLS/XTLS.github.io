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

{{% panel theme="warning" header="**Q: 如何配置才能在myssl或者ssllibs得到双A+的评价？** " %}}

首先，这不是必需的，即便没有双A+，甚至只有B，也并不意味着不安全。

你现在可以这样做:

1. 前提, 你的证书是ECC证书, 比如你用acme.sh可以这样获取
```
./acme.sh --issue -d "your.domain" -w /var/www/html -k ec-256 --cert-file /etc/xray/"your.domain"/"your.domain".cer --key-file /etc/xray/"your.domain"/"your.domain".key --fullchain-file /etc/xray/"your.domain"/fullchain.cer --force

```

<br /> 

2. 只需简单的在 **服务端的** TLS 配置 (streamsettings中的tlsSettings/xtlsSettings) 中加入
```
"minVersion": "1.2"
```
**即可在myssl或ssllabs上获得A**

 <br /> 

3. 然后在回落的网站服务器上开启HSTS,如 Nginx 只需配置   
```
add_header Strict-Transport-Security "max-age=63072000" always;
```
**即可在myssl或ssllabs上获得A+**

{{% /panel %}}

<br />

{{% panel theme="warning" header="**Q: 什么是UDP fullcone?** " %}}

fullcone的核心改变在于对游戏性能、使用到UDP的语音视频性能的优化。

很多游戏会测试网络类型，类型过低甚至不能联机。fullcone一般都可以达到最佳类型。

{{% /panel %}}

<br />

{{% panel theme="warning" header="**Q: 实现Full Cone NAT时,设置了iptables后降低了NAT等级怎么办?** " %}}

请参见[这个issue里提出的方式](https://github.com/XTLS/Xray-core/issues/161)

{{% /panel %}}

<br />

{{% panel theme="warning" header="**Q: 打开证书的时候提示没有权限?** " %}}

1. 首先需要给证书文件以读取权限.
2. 其次要给证书所在目录及上层目录x权限.

{{% /panel %}}

<br />

{{% panel theme="warning" header="**Q: log 里面有大量报 warning 的信息, 好可怕!** " %}}

连接异常断开是常有的现象, 如果能正常使用, 不必惊慌, 如果不能正常使用, 拿好你的配置文件和log, 去开一个issue.

{{% /panel %}}

<br />

