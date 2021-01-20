---
alwaysopen: false
date: "2021-01-05T00:00:00.000Z"
description: 小小白白话文
# head: <hr/>
hide:
# - toc
# - nextpage
post: "&nbsp;📙"
title: 【第5章】网站建设篇
weight: 5
---

## 5.1 为什么要做一个网站？
---

新人也许会迷惑，为什么科学上网还要建一个网站？我不会编程啊，是不是特别麻烦？

先回答第一个问题，建网站的原因有：

1. 申请合法的TLS证书（非常重要）
2. 提供合理的回落，防止主动探测攻击，提高安全性
3. 建设一个伪装站（如博客、私人网盘、多媒体网站、游戏网站等），直接访问时有合理的前台，使流量使用看上去更合理。

再回答第二个问题：
1. 本文作为演示，仅仅使用了一个最简单的【单文件html页面 + Nginx】来搭建，以此完成上面的目标，所以【非常简单】
2. 这个网站完全可以不仅仅是伪装，而是真的做大做强，这个复杂性就完全取决于你了
3. 对于“伪装”和“网站运营”这个目标，需要的就是各不相同、秀出真我，需要的同学可以自行搜索学习。这个内容已经完全偏离了科学上网，本文就不深入解析了。


</br>

## 5.2 登录VPS、安装运行Nginx
---

1. 这里用到的，都是之前已经详解过的命令，所以就不重复讲解了。看不懂的同学可以看看前面的章节哦。
    ```
    $ sudo apt update && sudo apt install nginx
    ```

2. 完成后，Nginx已经自动运行。此时打开Windows上的浏览器并输入 `http://100.200.300.400:80`，若看到下图的界面就说明Nginx已经正常在运行了。

    <img src="../ch05-img01-nginx-default-running.png"  alt="Nginx默认界面"/>


</br>

## 5.3. 创建一个最简单的网页
---

1. 小小白白Linux基础命令：
    | 编号 | 命令名称 | 命令说明 |
    |:--:|:--:|:--:|
    | `cmd-10` | `mkdir` | 新建文件夹 |
    | `cmd-11` | `systemctl reload` | 重新加载某个服务 |

2. 小小白白Linux基础配置文件：
    | 编号 | 配置文件位置 | 文件说明 |
    |:--:|:--:|:--:|
    | `conf-02` | `/etc/nginx/nginx.conf` | Nginx程序设置 |

3. 创建一个网站专用的文件夹`/home/vpsadmin/www/webpage/`并建立网页文件`index.html`
    ```
    $ mkdir -p ~/www/webpage/ && nano ~/www/webpage/index.html
    ```

4. 把下面的内容完整的复制进去，然后保存(`ctrl+o`)退出(`ctrl+x`)
    ```
    <html>
        <!-- Text between angle brackets is an HTML tag and is not displayed.
            Most tags, such as the HTML and /HTML tags that surround the contents of
            a page, come in pairs; some tags, like HR, for a horizontal rule, stand 
            alone. Comments, such as the text you're reading, are not displayed when
            the Web page is shown. The information between the HEAD and /HEAD tags is 
            not displayed. The information between the BODY and /BODY tags is displayed.-->
        <head>
            <title>Enter a title, displayed at the top of the window.</title>
        </head>
        <!-- The information between the BODY and /BODY tags is displayed.-->
        <body>
            <h1>Enter the main heading, usually the same as the title.</h1>
            <p>Be <b>bold</b> in stating your key points. Put them in a list: </p>
            <ul>
                <li>The first item in your list</li>
                <li>The second item; <i>italicize</i> key words</li>
            </ul>
            <p>Improve your image by including an image. </p>
            <p><img src="https://i.imgur.com/SEBww.jpg" alt="A Great HTML Resource"></p>
            <p>Add a link to your favorite <a href="https://www.dummies.com/">Web site</a>.
                Break up your page with a horizontal rule or two. 
            </p>
            <hr>
            <p>Finally, link to <a href="page2.html">another page</a> in your own Web site.</p>
            <!-- And add a copyright notice.-->
            <p>&#169; Wiley Publishing, 2011</p>
        </body>
    </html>
    ```

5. 修改 `nginx.conf` 并重启 `Nginx` 服务，将`80`端口的http访问定位到刚才建立的 `html` 页面上
    1. 修改 `nginx.conf` 。
        ```
        $ sudo nano /etc/nginx/nginx.conf
        ```
        
    2. 将下面一段，添加在 `http{}` 内，然后保存(`ctrl+o`)退出(`ctrl+x`)。（记得将域名替换为之前准备好的、包含二级域名的真实域名）
        ```
                server {
                        listen 80;
                        server_name 二级域名.你的域名.com;
                        root /home/vpsadmin/www/webpage;
                        index index.html;
                }
        ```

    3. 让 `nginx` 重新载入配置使其生效
        ```
        $ sudo systemctl reload nginx
        ```

    4. 完整的设置流程如下：

        <img src="../ch05-img02-nginx-conf-full.gif"  alt="网页设置演示"/>

    5. 此时如果你访问 `http://二级域名.你的域名.com`，你看到这样的页面则说明成功：

        <img src="../ch05-img03-nginx-http-running.png"  alt="http网页成功"/>


</br>

## 5.4 你的进度
---

至此，Xray的第一个基础设施【网页】已经就位，我们马上就进入第二个基础设施【证书】吧！

{{% notice dark PROGRESS  %}} `⬛⬛⬛⬛⬛⬜⬜⬜ 62.5%` {{% /notice %}}
