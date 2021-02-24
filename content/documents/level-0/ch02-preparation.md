---
alwaysopen: false
date: "2021-01-05T00:00:00.000Z"
description: 小小白白话文
# head: <hr/>
hide:
# - toc
# - nextpage
post: "&nbsp;📙"
title: 【第2章】原料准备篇
weight: 2
---

这一章比较特殊，因为涉及到金钱交易行为，本文基于项目的中立立场，不做具体的推荐。我能做的，是告诉你需要准备哪些东西。

## 2.1 获取一台VPS
---

你需要获取一台健康的、IP没有被墙的VPS，并在管理后台做下面这些基础准备：
    
1. 在VPS的后台安装 Debian 10 64bit 系统
2. 小本本记下VPS的IP地址（本文会用 `"100.200.300.400"` 来表示）
    {{% notice warning  %}}
**注意：** 这是一个故意写错的非法IP，请替换成你的真实IP）
{{% /notice %}}
3. 小本本记下VPS的SSH远程登陆端口(Port)
4. 小本本记下SSH远程登录的用户名和密码

购买VPS是一个比较复杂的事情，建议先去学习一下相关知识，选择适合自己的经济能力和线路需求的即可。另外可以选择薅一些国际大厂的羊毛（比如甲骨文和谷歌提供的永久免费或限时免费的套餐）。总之，务必量力而行。

{{% notice warning  %}}
**说明：** 关于选择 Debian 10 作为操作系统，这里稍微多说一句：不管你在网上听说了什么，不管哪个大神告诉你XXX版的Linux更好、XXX版的Linux更牛，这些Linux的派系之争**跟现在的你半毛钱关系也没有**！使用 Debian 10 足以让你的VPS服务器在安全、稳健运行的同时得到足够的优化（如cloud专用内核、及时的bbr支持等）。等你对Linux熟悉之后，再回头去尝试其他的Linux发行版也不迟
{{% /notice %}}


</br>

## 2.2 获取一个心仪的域名
---

你需要获取一个域名、并在DNS设置中添加一条A记录，指向你VPS的IP地址

1. 请选择靠谱的国际域名服务商。选择一些常见的域名后缀就行，注意不要用 `.cn` 后缀。
2. 在DNS设置中，添加一条指向你VPS的IP地址的A记录（A记录的名字可以随便起，本文会用 `"a-name"` 来表示。完整的域名则会用 `"二级域名.你的域名.com"` 或者 `"a-name.yourdomain.com"` 来表示）。效果如下图：
    
    <img src="../ch02-img01-a-name.png"  alt="添加A记录" />

    {{% notice warning  %}}
**注意：** 这**不是**一个真实可用的网址，请替换成你的真实网址
{{% /notice %}}


</br>

## 2.3 你本地电脑上需要安装的软件
---

1. SSH远程登录工具
    - Windows: [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
    - macOS/Linux: Terminal

2. 远程文件拷贝工具
    - Windows: [WinSCP](https://winscp.net/eng/index.php)
    - macOS/Linux: Terminal

3. 靠谱的文本编辑器 
    - Windows/macOS/Linux: [VSCode](https://code.visualstudio.com)  


</br>

## 2.4 你的进度
---

如果上面的原材料你都准备好了的话，你已经拿到了开启新世界大门的钥匙。那还等什么，让我们快点进入下一章，走进这扇门吧！

{{% notice dark PROGRESS  %}} `⬛⬛⬜⬜⬜⬜⬜⬜ 25%` {{% /notice %}}
