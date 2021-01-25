---
alwaysopen: false
date: "2021-01-05T00:00:00.000Z"
description: 入门心得
# head: <hr/>
hide:
# - toc
# - nextpage
post: "&nbsp;📙"
title: 路由 (routing) 功能简析
weight: 2
---


如果说Xray的【强大】主要体现在它极致的速度和广泛的兼容性。那么Xray的【灵活】，则主要应应该归功于它巧妙的【路由】功能。本文就稍微说明一下这个功能的逻辑以及使用方式。

## 1. 初识【路由】三兄弟

要理解路由，就要理解完整的路由功能需要有三兄弟来合力完成：1. **入站**；2. **路由**；3. **出站**。

<img src="../routing-lv1-img01-trio.png"  alt="路由三兄弟"/>

三兄弟桃园结义，不求同年同月同日生，但求同年同月同日死。

所以谨记：任何一个元素错误，就可能导致路由功能无法正常工作。

因为路由的灵活性非常高，只看技术文档很容易把自己绕晕，所以本文我们用几个具体的示例来逐层讲解。

{{% notice warning  %}}
**罗嗦君：** 路由功能实在过于灵活，所以本文的示例，都是为了讲解对应的概念，实际使用时请根据自己的需求进行调整。
{{% /notice %}}


</br>

## 2. 基本功： “兄弟一条心”

下图的示例，就是在客户端的 `Xray` 入站接收APP数据、在路由100%转发给出站，并从出站流向VPS。

</br>

{{<mermaid align="left">}}
graph LR;

    S(APP数据) .-> I[入站]

    subgraph Xray
    I --> R[路由] --> O[出站] 
    end

    O .-> V(VPS)

    V:::greyclass
    S:::greyclass
    R:::routingclass
    classDef greyclass fill:#C0C0C0
    classDef routingclass fill:#FFFFDE

{{< /mermaid >}}

下面我们来逐个分析：

</br>

**2.1 入站**

{{% notice warning  %}}
**入站：** 就是流量如何流入 `Xray` 
{{% /notice %}}

下面的入站配置示例，用大白话说就是：数据按照 `socks` 协议，通过 `10808` 端口，从本机 `127.0.0.1` 流入`Xray`。同时，`Xray` 将这个入站用 `[tag]` 命名为 `inbound-10808`。

```
"inbounds": [
    {
        "tag": "inbound-10808",
        "protocol": "socks",
        "listen": "127.0.0.1",
        "port": 10808,
        "settings": {
            "udp": true
        }
    }
]
```

</br>

**2.2 出站**

{{% notice warning  %}}
**出站：** 就是流量如何流出 `Xray` 
{{% /notice %}}

下面的出站配置示例，用大白话说就是：数据按照 `vless` 协议，以 `tcp + xtls (direct)` 的方式、及其他相关设置，把流量发送给对应的VPS。同时，`Xray` 将这个出站用 `[tag]` 命名为 `proxy-out-vless`：

```
"outbounds": [
    {
        "tag": "proxy-out-vless",
        "protocol": "vless",
        "settings": {
            "vnext": [
                {
                    "address": "a-name.yourdomain.com",
                    "port": 443,
                    "users": [
                        {
                            "id": "uuiduuid-uuid-uuid-uuid-uuiduuiduuid",
                            "flow": "xtls-rprx-direct",
                            "encryption": "none",
                            "level": 0
                        }
                    ]
                }
            ]
        },
        "streamSettings": {
            "network": "tcp",
            "security": "xtls",
            "xtlsSettings": {
                "serverName": "a-name.yourdomain.com"
            }
        }
    }
]
```

</br>

**2.3 路由**

{{% notice warning  %}}
**路由：** 就是把【入站】和【出站】之间的通道，用某种【条件】串联起来
{{% /notice %}}

下面的路由配置示例，用大白话说就是：把所有通过 `[tag]="inbound-10808"` 入站流入 `Xray` 的流量，`100%` 全部流转导入 `[tag]="proxy-out-vless"` 的出站，没有任何分流或其他操作。

```
"routing": {
    "domainStrategy": "AsIs",
    "rules": [
        {
            "type": "field",
            "inboundTag": [
                "inbound-10808"
            ],
            "outboundTag": "proxy-out-vless"
        },
    ]
}
```

至此，我们最开始设计的极简规则【客户端的 `Xray` 入站接收APP数据、在路由100%转发给出站，并从出站流向VPS】已经完成。


</br>

**2.4 路由配置项解析之一：流量筛选的依据**

注意观察路由配置，我们可以看到几个新名词：

1. `"domainStrategy": "AsIs"`
2. `“rules”`
3. `"type": "field"` 
4. `"inboundTag": ["inbound-10808"]`
5. `"outboundTag": "proxy-out-vless"`

其中 `domainStrategy` 我们暂且按下不表，先简单说明后面几个：

| 配置名称 | 配置值 | 配置说明 |
|:--:|:--:|:--|
| `“rules”` | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | 它的内层就是【路由规则】的明细设置 |
| `"type"` | `"field"` | 该项暂时没有特别定义，但是不能省略，所以记得写上就好 |
| `"inboundTag"` | `["inbound-10808"]` | 筛选流量的 **【依据】** 是【入站Tag】，具体 **【条件】** 现在只有一个：【入站来源是 `inbound-10808`】 |
| `"outboundTag"` | `"proxy-out-vless"`  | 当上面的筛选条件成立时（即入站`[tag]="inbound-10808"`时 ），`Xray` 会将流量导入 `[tag]="proxy-out-vless"` 的出站 |

本例中，我们只有一个入站，它的`"inboundTag" = "inbound-10808"` 。我们也只有一个出站，它的 `[tag]="proxy-out-vless"`。所以根据上面这个路由规则，从唯一入站端口 `10808` 流入`Xray`的流量，`100%` 符合筛选条件、会被路由模块选中，然后转发给唯一的出站。

至此，**入站**、**路由**、**出站** 三兄弟就已经可以携手工作了。当然，现在这个100%转发的工作并没有什么特别的意义。那么接下来，我们就看看这种分工合作的机制可以带来什么好处。


</br>

## 3. 小试牛刀： “三分天下域名” `[geosite.dat]`

</br>

{{<mermaid align="left">}}
graph LR;

    S(APP数据) .-> I[入站]

    subgraph Xray
    I --> R[路由] -- "geosite:category-ads-all" --> O1[block]
    R[路由] -- "geosite:cn" --> O2[direct]
    R[路由] -- "geosite:geolocation-!cn" --> O3[proxy]

    end

    O2 .-> D(国内服务器)
    O3 .-> V(VPS)

    O1:::redclass
    V:::greyclass
    S:::greyclass
    R:::routingclass

    classDef redclass fill:#FF0000
    classDef greyclass fill:#C0C0C0
    classDef routingclass fill:#FFFFDE,stroke:#000000

{{< /mermaid >}}

</br>

这个配置逻辑，其实就是最简单、最常用的（《小小白白话文》中也在用的）路由配置三件套：
    
1. 广告流量屏蔽 `[block]`
2. 国内流量直连 `[direct]`
3. 国外流量转发VPS `[proxy]`


</br>

**3.1 入站**

保持上例的 `inbound-10808` 不变。

</br>

**3.2 出站**

在上例的基础上，我们已经有了 `[proxy]` 的出站 `"proxy-out-vless"`，所以它保持不变。显而易见，我们需要加入两个新的出站方式：`[block]` 和 `[direct]`。：

```
"outbounds": [
    {
        "tag": "proxy-out-vless",
        ......
    },
    {
        "tag": "block",
        "protocol": "blackhole"
    },
    {
        "tag": "direct-out",
        "protocol": "freedom"
    }
]
```

上面的配置用大白话翻译如下：
1. 上例中的 `[proxy-out-vless]` 出站配置保持不变
2. 加入 **`blackhole` 黑洞协议**，通过这个协议出站的流量，其实都被发送到了 `Xray` 内部的黑洞里陷入虚无，于是效果就是屏蔽 `[block]`
3. 加入 **`freedom` 自由协议**，通过这个协议出站的流量，是自由的离开`Xray`去寻找原定的服务器，就像从没有来过，于是效果就是直连 `[direct]`。（我这里起名叫做 `[direct-out]` 是为了强调它是一个出站）


</br>

**3.3 路由**

接下来就是见证奇迹的时刻了，我们可以用【路由】的配置把这些连接起来！

```
"routing": {
    "domainStrategy": "AsIs",
    "rules": [
        {
            "type": "field",
            "domain": [
                "geosite:category-ads-all"
            ],
            "outboundTag": "block"
        },
        {
            "type": "field",
            "domain": [
                "geosite:cn"
            ],
            "outboundTag": "direct-out"
        },        
        {
            "type": "field",
            "domain": [
                "geosite:geolocation-!cn"
            ],
            "outboundTag": "proxy-out-vless"
        }
    ]
}
```

为了理解这个配置文件，我们要稍微解释一下这里出现的几个新配置项：

- `"domain": "geosite:category-ads-all"`
- `"domain": "geosite:cn"`
- `"domain": "geosite:geolocation-!cn"`


</br>

**3.4 认识路由文件之一： `geosite.dat`**

其实，聪明的你大概可以通过这些配置项的名称猜出来个大概：

- `"domain"`：就是这次筛选流量的 **【依据】** 是 **【域名】** （而不再是入站tag）
- `"geosite"`：就是 `Xray` 会去 `geosite.dat` 文件中寻找 **【符合条件的域名】**
- `"category-ads-all"`：就是该文件中的 **【所有广告类域名】**
- `"cn"`：就是该文件中的 **【中国域名】**
- `"geolocation-!cn"`：就是该文件中的 **【非中国域名】**


结合这些说明，3.3 中的配置用大白话翻译就是：

1. APP试图访问国外域名 `"domain": "geolocation-!cn"` 的流量，通过 `[proxy-out-vless]` 出站，转发至VPS
2. APP试图访问国外域名广告域名 `"domain": "geosite:category-ads-all"` 的流量，通过 `[block]` 出站，转发至黑洞进行屏蔽
3. APP试图访问国外域名国内域名 `"domain": "geosite:cn"` 的流量，通过 `[direct-out]` 出站，自由离开完成直连

这时，才让【路由功能】的好处稍微得到了一些展现。

</br>

**3.5 所以 `geosite.dat` 到底是什么？不是有个 `GFWList` 吗？**

你想，这世界上的域名何止千万，如果我们每写一个基于【域名】匹配的路由规则，都要自己收集、手动输入域名，那效率将会何其低下！

而如果所有的域名都只有一个种类，`[direct], [proxy], [block]` 只能三选其一，那又是多么的不方便！

就如关羽需要他的青龙偃月刀，`geosite.dat` 文件便作为【路由功能】驱使的神兵利器横空出世了，它致力于为用户提供成熟完善的【域名分类表】。让用户可以简单的通过 `geosite:xxx` 这种格式方便的调用任何子类，定制符合自身需求的路由规则。

这种模块化结构提供的灵活性，其实远超传统的一揽子防火墙域名列表 [`GFWList`](https://github.com/gfwlist/gfwlist)。为什么这么说呢？比如，你可以指定苹果的域名 `geosite:apple` 和icloud相关域名 `geosite:icloud` 通过代理 `[proxy]`，但是苹果的软件域名 `geosite:apple-update` 保持直连 `[direct]` 来保持最大下载速度。

{{% notice warning  %}}
**注意：** 现在，`geosite.dat` 文件其实有多种选择：

最初，从 `Victoria Raymond` 主力维护 `Project V` 项目时期，便提供了最初的配套项目：[`domain-list-community`](https://github.com/v2ray/domain-list-community)，用来收集、沉淀、分类各种常用的域名类型；

之后，随着V姐突然消失导致 `Project V` 的原项目开发陷入停滞，`v2fly` 社区维护并持续更新了社区版本的 [`domain-list-community`](https://github.com/v2fly/domain-list-community)；

同时，[@Loyalsoldier](Loyalsoldier) 维护了其个人修改增强的路由规则文件 [v2ray-rules-dat](https://github.com/Loyalsoldier/v2ray-rules-dat)，提供了诸多不同的选择和分类逻辑；

另外，`Project X` 也计划于未来定制维护更适合 `Xray` 使用的路由规则文件 [Xray-rules-dat](https://github.com/XTLS/Xray-rules-dat)。~~(你们看，文件夹都建好了，所以快了快了)~~

甚至，你还可以定制自己的 `geosite` 文件，外挂给 `Xray` 使用，但是这个就跑题了，本文不展开。

如果你发现有些你遇到的域名没有被合理分类，请向上面的项目们提出 `issue` 甚至提交 `Pull Request` 吧！社区列表社区维护，人人为我我为人人！

{{% /notice %}}

</br>

**3.6 军师锦囊藏奇兵：一条隐藏的路由规则**

事实上，当你认真思考上面的规则，不难发现一个问题，我们的所有规则都只规定了【当入站流量 **符合某种条件时** 应该被转发给哪个出站】，那么，如果 `geosite.dat` 文件不全面，我们的入站流量【**不符合任何条件时**】，`Xray` 会怎么处理呢？

{{% notice warning  %}}
**注意：** 如果你认为【不符合条件当然就无法连接啦！】的话，你可要重新思考一下哦。因为只有指定了 `[block]` 规则，才会被导入到 `blackhole` 黑洞协议从而阻断连接
{{% /notice %}}

事实上，`Xray` 为了避免路由规则不完全导致的规则混乱，已经贴心的提供了一条隐藏的路由规则：【**当入站流量不符合任何条件时，转发给第一个出站** 】

这样，就不会有任何流量被漏掉了。所以，你一定要把你最信赖的心腹大将放在【第一条出站】，让它为你守城护池。

</br>

**3.7 再看“三分天下域名”的大地图**

因为我们在前面的示例中把 `[proxy-out-vless]` 放在了出站的第一位，所以隐藏规则生效时，流量会通过 `vless` 协议被转发至远端的VPS。因此，`Xray` 此时的完整工作逻辑如下：

{{<mermaid align="left">}}
graph LR;

    S(APP数据) .-> I[入站]

    subgraph Xray
    I --> R[路由] -- "geosite:category-ads-all" --> O1[block]
    R[路由] -- "geosite:cn" --> O2[direct]
    R[路由] -- "geosite:geolocation-!cn" --> O3[proxy]
    R[路由] -. "没有命中规则的流量" .-> O4[第一条出站]

    end

    O2 .-> D(国内服务器)
    O3 .-> V(VPS)
    O4 .-> V(VPS)

    O1:::redclass
    V:::greyclass
    S:::greyclass
    R:::routingclass

    classDef redclass fill:#FF0000
    classDef greyclass fill:#C0C0C0
    classDef routingclass fill:#FFFFDE,stroke:#000000

{{< /mermaid >}}

</br>

事实上，这就是传统所谓的 **【默认科学上网、国内网站白名单直连】** 的配置。


</br>

## 4. “三分天下” 的逆转

既然我们已经配置出了 **【默认科学上网、国内网站白名单直连】** 的路由规则，那么是否能配置出和他正好相反的 **【默认直连、国外网站白名单科学上网】** 呢？

答案很简单： **【当然可以！】**

没错，只要你在出站规则中， **【把直连规则放在第一位】** 即可！

```
"outbounds": [
    {
        "tag": "direct-out",
        "protocol": "freedom"
    },
    {
        "tag": "proxy-out-vless",
        ......
    },
    {
        "tag": "block",
        "protocol": "blackhole"
    }
]
```

此时，路由规则其实变成了：

{{<mermaid align="left">}}
graph LR;

    S(APP数据) .-> I[入站]

    subgraph Xray
    I --> R[路由] -- "geosite:category-ads-all" --> O1[block]
    R[路由] -- "geosite:geolocation-!cn" --> O3[proxy]
    R[路由] -- "geosite:cn" --> O2[direct]
    R[路由] -. "没有命中规则的流量" .-> O4[第一条出站]

    end

    O2 .-> D(国内服务器)
    O3 .-> V(VPS)
    O4 .-> D

    O1:::redclass
    V:::greyclass
    S:::greyclass
    R:::routingclass
    classDef redclass fill:#FF0000
    classDef greyclass fill:#C0C0C0
    classDef routingclass fill:#FFFFDE,stroke:#000000

{{< /mermaid >}}

是不是，无比的简单啊？

至此，我们已经解释完了 **【如何利用 `geosite.dat` 文件，通过路由规则，根据【域名】来分流网络流量】**


</br>

## 5. 崭露锋芒 - 多种路由匹配条件 `[域名], [IP], [协议], etc.`

虽然三分天下其实已经可以让网络流量合理很多，但这个规则只能说是如《隆中对》一般指出了明确的战略方向。在战术执行时，其实还有很多细节需要推敲。比如：

1. 我读了《小小白白话文》后，给VPS新申请了一个域名 `proxy.yourdomain.com` 希望无论如何都代理怎么办？
2. 如果我还有个 `blog.yourdomain.com` 希望无论如何都直连怎么办？
3. 本机 `127.0.0.1` 的内部流量，是否正确直连了？
4. 路由器、本地局域网 `192.168.*.*` 的流量，是否正确直连了？
5. 我的国内DNS查询（如 `223.5.5.5`）是否正确直连了？
6. 我的国外DNS查询（如 `1.1.1.1`）是否正确代理了？
7. 其他类似国内公共DNS一样没有域名、只有IP地址的国内网站，是否正确直连了？
8. 其他类似国外公共DNS一样没有域名、只有IP地址的国外网站，是否正确代理了？
9. BT下载的流量，虽然是国外，但是通过一般VPS下载的话，很可能导致VPS被封，这该如何强制直连？
10. ......

首先做一个统一的解答：【`geosite.dat` 中只有常用域名，所以 **无法处理上述任何一个基于IP地址的规则、基于协议的规则，或者未知新域名的规则** 】，那么根据前面的配置，上面这些情况全部都会触发隐藏路由规则【**当入站流量不符合任何条件时，转发给第一个出站** 】，换言之：

- 当你的第一个出站是 `[direct-out]` 时，需要直连的都正确了，需要代理的则都错误
- 当你的第一个出站是 `[proxy-out-vless]` 时，需要代理的都正确了，需要直连的则都错误

那么，我们是否有办法精确的控制这些呢，让所有的流量都被正确配置呢？【**当然有！** 】

我们只是需要更多的【**流量判断依据**】而已

</br>

**5.1 基于域名的判断依据：`[domain], [full]` 等配置项**

1. 如果需要匹配某个子域名，如 `a-name.yourdomain.com`，我们使用 `full: "a-name.yourdomain.com"`
2. 前面的 `问题1` 和 `问题2`，就可以通过给 `proxy.yourdomain.com` 指定 `[proxy-out-vless]` 出站，给 `direct.yourdomain.com` 指定 `[direct-out]` 出站来解决
3. 如果需要匹配 `yourdomain.com` 的所有子域名，我们使用 `domain: "yourdomain.com"` 实现
4. 上述两个可以成为两个独立的路由规则，达到某些子域名直连，其他子域名代理的配置
5. 另外，`[domain]` 还支持正则表达式等匹配方式。详情请参考 [《基础配置模块 - 路由》文档](../../../config/base/routing/)

上述配置如下：

```
"routing": {
    "domainStrategy": "AsIs",
    "rules": [
        {
            "type": "field",
            "full": [
                "direct.yourdomain.com"
            ],
            "outboundTag": "direct-out"
        },        
        {
            "type": "field",
            "full": [
                "proxy.yourdomain.com"
            ],
            "outboundTag": "proxy-out-vless"
        },
        {
            "type": "field",
            "domain": [
                "yourdomain.com"
            ],
            "outboundTag": "proxy-out-vless"
        }
    ]
}
```

</br>

**5.2 基于IP地址的判断依据：`geoip.dat`及 `[ip]` 等配置项**

类似于 `geosite.dat`，`geoip.dat`文件是供【路由功能】驱使的第二个神兵利器，它致力于为用户提供成熟完善的【IP分类表】。让用户可以简单的通过 `geoip:xxx` 这种格式方便的调用任何子类，定制符合自身需求的路由规则 。

1. 解决前面的 `[问题3], [问题4]`，我们使用 `geoip:private` 类别来指定 `[direct-out]`
2. 解决前面的 `[问题5]`，我们使用 `ip: "223.5.5.5` 来指定 `[direct-out]`
3. 解决前面的 `[问题6]`，我们使用 `ip: "1.1.1.1` 来指定 `[proxy-out-vless]`
4. 解决前面的 `[问题7]`，我们使用 `geoip:cn` 类别来指定 `[direct-out]`
5. 解决前面的 `[问题8]`，由于 `geoip` 中暂无【非中国IP】这个分类，所以我们用隐藏规则代替，也就是将 `[proxy-out-vless]` 放在第一个出站

上述配置如下：
    
```
"routing": {
    "domainStrategy": "AsIs",
    "rules": [
        {
            "type": "field",
            "ip": [
                "geoip:private",
                "geoip:cn",
                "223.5.5.5"
            ],
            "outboundTag": "direct-out"
        },
        {
            "type": "field",
            "ip": [
                "1.1.1.1"
            ],
            "outboundTag": "proxy-out-vless"
        }
    ]
}
```

</br>

**5.3 基于协议类型的判断依据：`[protocol]` 等**

1. 解决前面的 `[问题9]`，我们使用 `"protocol": ["bittorrent"]` 类别来指定 `[direct-out]`

```
"routing": {
    "domainStrategy": "AsIs",
    "rules": [
        {
            "type": "field",
            "protocol": [
                "bittorrent"
            ],
            "outboundTag": "direct-out"
        }
    ]
}
```

**5.4 还有很多判断依据！**

我们一直在强调 `Xray` 的路由功能何其强大灵活，就是因为，它除了我们已经讲过的内容之外，还支持很多判断条件！我在此简单罗列如下：

本文讲过的：
- `inboundTag`
- `domain`
- `ip`
- `protocol`

本文还没有讲过的：
- `port`
- `sourcePort`
- `network`
- `source`
- `user`
- `attrs`

内容实在是过多，而且全部展开就不是 `level-1` 的内容了，所以，需要这些复杂条件的朋友，请仔细阅读 [《基础配置模块 - 路由》文档](../../../config/base/routing/) 即可！


</br>

## 6. 战术和战略的回顾

到现在为止，我们已经完成了一个战略雄伟、战术精准的路由规则。我们现在就对他们进行一次完整的正回顾。

{{% notice warning  %}}
**注意：** 路由生效的顺序是：【从上往下，依次判断】，所以我一般推荐的规则顺序是：

`[1-block] --> [2-direct] --> [3-proxy] --> [4-first-outbound]`
{{% /notice %}}


```
"routing": {
    "domainStrategy": "AsIs",
    "rules": [
        // [1-block]
        {
            "type": "field",
            "domain": [
                "geosite:category-ads-all"
            ],
            "outboundTag": "block"
        },
        // [2-direct]
        {
            "type": "field",
            "ip": [
                "geoip:private",
                "geoip:cn",
                "223.5.5.5"
            ],
            "outboundTag": "direct-out"
        },
        {
            "type": "field",
            "full": [
                "direct.yourdomain.com"
            ],
            "outboundTag": "direct-out"
        },
        {
            "type": "field",
            "protocol": [
                "bittorrent"
            ],
            "outboundTag": "direct-out"
        },
        // [3-proxy]
        {
            "type": "field",
            "domain": [
                "geosite:geolocation-!cn"
            ],
            "outboundTag": "proxy-out-vless"
        },
        {
            "type": "field",
            "ip": [
                "1.1.1.1"
            ],
            "outboundTag": "proxy-out-vless"
        },
        {
            "type": "field",
            "full": [
                "proxy.yourdomain.com"
            ],
            "outboundTag": "proxy-out-vless"
        },
        {
            "type": "field",
            "domain": [
                "yourdomain.com"
            ],
            "outboundTag": "proxy-out-vless"
        }
        // [4-first-outbound]
        // 这里就不用写规则了，对于无法匹配的流量，`Xray`会自动调用第一条出站
    ]
}
```


此时，路由规则其实变成了：

{{<mermaid align="left">}}
graph LR;

    S(APP数据) .-> I[入站]

    subgraph Xray
    I --> R[路由] -- "geosite:category-ads-all" --> O1[block]

    R[路由] -- "geosite:cn" --> O2[direct]
    R[路由] -- "geoip:private" --> O2[direct]
    R[路由] -- "ip:223.5.5.5" --> O2[direct]
    R[路由] -- "direct.yourdomain.com" --> O2[direct]
    R[路由] -- "protocol:bittorrent" --> O2[direct]

    R[路由] -- "geosite:geolocation-!cn" --> O3[proxy]
    R[路由] -- "ip:1.1.1.1" --> O3[proxy]
    R[路由] -- "proxy.yourdomain.com" --> O3[proxy]
    R[路由] -- "*.yourdomain.com" --> O3[proxy]

    R[路由] -. "没有命中规则的流量" .-> O4[第一条出站]

    end

    O2 .-> D(国内服务器)
    O3 .-> V(VPS)

    O1:::redclass
    V:::greyclass
    S:::greyclass
    R:::routingclass
    classDef redclass fill:#FF0000
    classDef greyclass fill:#C0C0C0
    classDef routingclass fill:#FFFFDE,stroke:#000000

{{< /mermaid >}}

至于第一条出站是 `[direct-out]` 还是 `[proxy-out-vless]`，这就全看你的需求了。


</br>

## 7. 思考题

迄今为止，我们都是在【单入站】和【单出站】的基础上，讲解【路由】内部的各种配置逻辑。

但是，如你所知，`Xray` 本身是支持多端口，多协议的。那么，如果我问你：

1. 我希望 `vless` 协议将我所有的网页和APP流量转发给美国的服务器
2. 我希望 `trojan` 协议将我的所有NetFlix流量转发给日本的服务器
3. 我希望 `shadowsocks` 协议将我所有的游戏流量转发给香港的服务器

这样的配置是否能通过路由实现呢？

答案，当然是 **【完全可以】** 啦！ 但是这个对于 `level-1` 来说已经超纲了，就留给各位自由的探索吧！


</br>

## 8. 结语

至此，`Xray` 的【路由】功能就介绍完了。希望本文能够对你理解 `Xray` 的强大有所帮助。
