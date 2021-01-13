---
alwaysopen: false
date: "2021-01-05T00:00:00.000Z"
description: 小小白白话文
# head: <hr/>
hide:
# - toc
# - nextpage
post: "&nbsp;📙"
title: 【第6章】证书管理篇
weight: 6
---

## 6.1 申请TLS证书
---

接下来我们要做的，是为我们的域名申请一个真实的TLS证书，使网站具备标准TLS加密的能力及HTTPS访问的能力。这就是Xray等现阶段安全代理工具确保流量充分加密最重要的工具。

{{% notice warning  %}} 
**注意：** 请不要轻易使用自签证书。它并没有让操作简单太多，但增加了无谓的风险（如中间人攻击）。
{{% /notice %}}

这里我会使用一个叫做 [`acme.sh`](https://github.com/acmesh-official/acme.sh) 的证书管理工具，它简单、轻量、高效，并可完成证书自动更新。

另外，我相信，现在你已经逐渐熟悉了Linux的基础操作，所以已经多次出现的命令从本章开始不再重复截图、只做简单的描述。如果实在想不起来怎么用的话，就稍微复习一下前面的章节吧。


</br>

## 6.2 安装 `acme.sh`
---

1. 小小白白Linux基础命令：
    | 编号 | 命令名称 | 命令说明 |
    |:--:|:--:|:--:|
    | `cmd-12` | `wget` | 访问（或下载）某个网页文件 |
    | `cmd-13` | `acme.sh` | acme.sh证书管理相关的命令 |

2. 运行安装脚本
    ```
    $ wget -O -  https://get.acme.sh | sh
    ```

3. 让 `acme.sh` 命令生效
    ```
    $ . .bashrc
    ```

4. 开启 `acme.sh` 的自动升级
    ```
    $ acme.sh --upgrade --auto-upgrade
    ```

5. 到这一步的完整流程如下图：

    <img src="../ch06-img01-acme-install.gif"  alt="acme.sh安装演示"/>


</br>

## 6.3 申请证书
---

1. 申请证书的命令如下 (本文以ECC证书为例，因为目前没有任何理由不用ECC证书)：
    ```
    $ acme.sh --issue -d 二级域名.你的域名.com -w /home/vpsadmin/www/webpage --keylength ec-256
    ```

2. 你最终应该看到类似这样的提示：
    ```
    vpsadmin@vps-server:~$ acme.sh --issue -d 二级域名.你的域名.com -w /home/vpsadmin/www/webpage --keylength ec-256
    [Wed 30 Dec 2022 15:22:51 AM EST] Using CA: https://acme-v02.api.letsencrypt.org/directory
    [Wed 30 Dec 2022 15:22:51 AM EST] Creating domain key
    [Wed 30 Dec 2022 15:22:51 AM EST] The domain key is here: /home/vpsadmin/.acme.sh/二级域名.你的域名.com_ecc/二级域名.你的域名.com.key
    [Wed 30 Dec 2022 15:22:51 AM EST] Single domain='二级域名.你的域名.com'
    [Wed 30 Dec 2022 15:22:51 AM EST] Getting domain auth token for each domain
    [Wed 30 Dec 2022 15:22:51 AM EST] Getting webroot for domain='二级域名.你的域名.com'
    [Wed 30 Dec 2022 15:22:51 AM EST] Verifying: 二级域名.你的域名.com
    [Wed 30 Dec 2022 15:22:51 AM EST] Pending
    [Wed 30 Dec 2022 15:22:51 AM EST] Success
    [Wed 30 Dec 2022 15:22:51 AM EST] Verify finished, start to sign.
    [Wed 30 Dec 2022 15:22:51 AM EST] Lets finalize the order.
    [Wed 30 Dec 2022 15:22:51 AM EST] Le_OrderFinalize='https://acme-v02.api.letsencrypt.org/acme/finalize/490205996/7730242872'
    [Wed 30 Dec 2022 15:22:51 AM EST] Downloading cert.
    [Wed 30 Dec 2022 15:22:51 AM EST] Le_LinkCert='https://acme-v02.api.letsencrypt.org/acme/cert/vsxvk0oldnuobe51ayxz4dms62sk2dwmw9zhuw'
    [Wed 30 Dec 2022 15:22:51 AM EST] Cert success.
    -----BEGIN CERTIFICATE-----
    sxlYqPvWreKgD5b8JyOQX0Yg2MLoRUoDyqVkd31PthIiwzdckoh5eD3JU7ysYBtN
    cTFK4LGOfjqi8Ks87EVJdK9IaSAu7ZC6h5to0eqpJ5PLhaM3e6yJBbHmYA8w1Smp
    wAb3tdoHZ9ttUIm9CrSzvDBt6BBT6GqYdDamMyCYBLooMyDEM4CUFsOzCRrEqqvC
    2mTTEmhvpojo5rhdTSJxibozyNWTGwoTj0v9pTUeQcGqLIzqi4DowjBHD5guwRid
    SjAFnm6JT2xUQgWFm58A1gv1OhbH1TRPUUmtE1nFEN7YiSjI4xgxqAXT3CLD2EUb
    wXlUrO6c75zSsQP4bRMzgOjJUqHtSb6IEqELzt4M7KzL5iCOruCChCo2DZxUwvVX
    tOoaAyQJzCbTqE6aUqwiKi3gVyoxvDP9mI5JdRYzsDL6GVud7EHPnYeMl9ubLZAK
    0vg84mbMP3f6mYM4KRa1cqiyOIcQPT4AzGFYVv4sm049bZQg7sd0Bz9CaFvE7yDA
    1y17XlgCDnsjxl66bqI1vkENN9XT5xeFHONqc18b5fZEKSIvdX7iWPFWp1PyMPpG
    0pMCP1EymZNFxIMJLgbWqExwLWfPc5Ib3PjBaIqhXPnw6sT2MQSxXwDupq1UJVhV
    7E3hQRVlwI4CXi6WLHJMNvNRyyK87gCrLH1bKYsPeRVaz77poWBq49zwBCts6hPY
    IeF4ltGXyANNIOPEi8vy138fRU4LYh81d8FjOtFfJZogMjwhfNvapqxPMsioPlmX
    TnZu0n7setrVNUEfTMHWqPpDgk5MPrWLA4LapqaDfEX4pwnQJLMwMi6s94z165c0
    iMRSKA1yU5zqv8aNsDfPoY4OkSPWs4MaXgRRSLBsUfZ15DwQXPk76kegHIyxWvwF
    tYw9HKR5QCMK66fa0z4aJoFVFLK0IIOGEZOanRFUCnkLUDd3QZ3YU8lEcrj7Uxos
    haiRNICyC6UfsCJ94a8vcNyMosPv3xBLMp19WXgiFYqEFQkntkv1FLRI35fjeJmg
    0fmD9VG9bkzGPHihJgQLRlCHasGf6XrdfkSsODAyCUHUHJ0RzqF4YEZMcxDxzuQ2
    YO7bFwj7S3mUdVPZ6MPasjxdyBjJgEBMch2uy4AhmudXfEBQBye8W6ZI4ztZjLVV
    FmP4SIuaNUmMe20TjR8b9NVC96AhxOanWT3mRROsdokpKQGTJvl27EHH8KuAbUOc
    G6KtPy4wslNZNXWcBy9n63RcWak12r7kAIFn38tZxmlw2WUKoRSMAH64GcDTjRQd
    Am65hBHzvGrj93wEuVNIebvNIsJOlng3HFjpIxVqKGMCIfWIKGDE3YzK3p4LbGZ6
    NZFQWYJLNVf2M9CCJfbEImPYgvctrxl39H6KVYPCw1SAdaj9NneUqmREOQkKoEB0
    x6PmNirbMscHhQPSC0JQaqUgaQFgba1ALmzRYAnYhNb0twkTxWbY7DBkAarxqMIp
    yiLKcBFc5H7dgJCImo7us7aJeftC44uWkPM=
    -----END CERTIFICATE-----
    [Wed 30 Dec 2022 15:22:52 AM EST] Your cert is in  /home/vpsadmin/.acme.sh/二级域名.你的域名.com_ecc/二级域名.你的域名.com.cer
    [Wed 30 Dec 2022 15:22:52 AM EST] Your cert key is in  /home/vpsadmin/.acme.sh/二级域名.你的域名.com_ecc/二级域名.你的域名.com.key
    [Wed 30 Dec 2022 15:22:52 AM EST] The intermediate CA cert is in  /home/vpsadmin/.acme.sh/二级域名.你的域名.com_ecc/ca.cer
    [Wed 30 Dec 2022 15:22:52 AM EST] And the full chain certs is there:  /home/vpsadmin/.acme.sh/二级域名.你的域名.com_ecc/fullchain.cer
    ```

</br>

## 6.4 你的进度
---

至此，Xray所需要的两个基础设施终于全部就位！千呼万唤始出来的Xray马上就要揭开面纱，我们终于要进入最激动人心章节啦！


{{% notice dark PROGRESS  %}} `⬛⬛⬛⬛⬛⬛⬜⬜ 75%` {{% /notice %}}
