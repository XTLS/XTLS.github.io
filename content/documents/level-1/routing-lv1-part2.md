---
alwaysopen: false
date: "2021-01-05T00:00:00.000Z"
description: 入门心得
# head: <hr/>
hide:
# - toc
# - nextpage
post: "&nbsp;📙"
title: 路由 (routing) 功能简析（下）
weight: 3
---

欢迎回来继续学习 `Xray` 强大灵活的【路由】功能！

在 [《路由 (routing) 功能简析（上）》](../routing-lv1-part1) 中，我们已经对【路由】功能的逻辑有了清晰的理解，也基于 `geosite.dat` 文件做了简单的路由配置。

但需要强调的是，`geosite.dat` 仅仅是【路由】功能的一个角度而已，完整的路由功能还支持很多其他的判断依据！下面就让我们来看看都有什么可以用的内容吧！


## 5. 崭露锋芒 - 多种路由匹配条件 `[域名], [IP], [协议], etc.`

虽然在之前三分天下中，我们已经让网络流量的到了基本合理的路由分流，但截至目前位置的规则只能说是如《隆中对》一般指出了明确的战略方向而已。在战术执行时，其实还有很多细节需要推敲。比如：

1. 我读了《小小白白话文》后，给VPS新申请了一个域名 `proxy.yourdomain.com` 希望无论如何都代理怎么办？
2. 如果我还有个 `direct.yourdomain.com` 希望无论如何都直连怎么办？
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

**5.2 基于IP地址的判断依据：路由规则文件之二：`geoip.dat`及 `[ip]` 等配置项**

与 `geosite.dat` 规则文件十分类似的，我们还有 `geoip.dat` 这个规则文件，它是供【路由功能】驱使的**第二个神兵利器**，它致力于为用户提供成熟完善的【IP分类表】。让用户可以简单的通过 `geoip:xxx` 这种格式方便的调用任何子类，定制符合自身需求的路由规则 。

1. 解决前面的 `[问题3], [问题4]`，我们使用 `geoip:private` 类别来指定 `[direct-out]`
2. 解决前面的 `[问题5]`，我们使用 `ip: "223.5.5.5"` 来指定 `[direct-out]`
3. 解决前面的 `[问题6]`，我们使用 `ip: "1.1.1.1"` 来指定 `[proxy-out-vless]`
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

## 6. 大战略和小战术的整体回顾

到现在为止，我们已经累积出了一套战略雄伟、战术精准的路由规则，为了避免混乱，现在就对它进行一次完整的整理和回顾。

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

## 7. 常见错误

请大家注意看，我上面每一条路由规则，都是一个独立的匹配依据，这样才能确保生效。

新人在自定义路由规则时，经常会犯的一个错误是，在一条规则内匹配多种不同依据。比如，他希望实现的配置是：
1. 自己的 `direct.yourdomain.com` 直连
2. 国内DNS查询（如 `223.5.5.5`）直连

</br>

**7.1 错误示范**

为了实现上面的目标，他写成出了以下路由规则：

```
"routing": {
    "domainStrategy": "AsIs",
    "rules": [
        {
            "type": "field",
            "ip": [
                "223.5.5.5"
            ],
            "full": [
                "direct.yourdomain.com"
            ],
            "outboundTag": "direct-out"
        }
    ]
}
```

你能看出这里面的错误吗？乍一看，似乎是对的？

{{% notice warning  %}}
**注意：** **同一个规则之内，各个依据需要同时成立，才会匹配成功**，逻辑关系是 `AND`，而不是 `OR`。
{{% /notice %}}

换言之，这条规则的意思是：【当你访问的 ` 目标 = direct.yourdomain.com`, **并且** 同时还满足 ` 目标 = 223.5.5.5` 时，`Xray` 才会将流量转发给 `[direct-out]` 直连出站】

很显然，一个目标不可能同时等于两个不同的值，所以这不但是一个永远不可能实现的无效规则，更与原本的目标风马牛不相及。

</br>

**7.2 正确示范**

正确示范，自然就是将不同的匹配依据独立出来：

```
"routing": {
    "domainStrategy": "AsIs",
    "rules": [
        {
            "type": "field",
            "ip": [
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
        }
    ]
}
```

其实，第6点已经是我整理过的规则了，原则就是【相同的匹配依据可以合并，不同的匹配依据保持独立】。


</br>

## 8. 沟通 `[domain]` 与 `[ip]` 的桥梁：`domainStrategy`

我们在 5.4 中提交了多种流量判断的【依据】，其中一种是域名 `[domain]`、一种是 `[IP]`。

如果你初步了解过DNS的运作过程，就会知道，我们对一个域名 `[domain]` 发起访问请求时，其实需要先向 `DNS` 发起请求来解析域名 `[domain]` 对应的 `[IP]`，在得到 `[IP]` 后再向它发起实际请求。

所以，面对入站的一次域名请求，`Xray` 其实有两次机会去判断它的类型。那么，究竟是否要用这两次机会呢？这就是由 `domainStrategy` 这个配置来决定的。它有三个选项：

- `AsIs`
- `IPIfNonMatch`
- `IPOnDemand`

按么我们逐个来解释一下：

</br>

**8.1 域名策略: `"AsIs"`**

就是 "As Domain Is"，也就是说 【域名什么样，就什么样，不多折腾】。

简单粗暴理解就是说【仅用 `[domain]` 来匹配】。

这个方式的处理都在 `Xray` 内部完成，没有与外界的数据往来，所以速度最快。它的兜底策略也很清晰：即前面所说的、无法匹配的域名自动转入第一条出站处理。所以，对于常规使用路由功能这最推荐的策略。

</br>

**8.2 域名策略: `"IPIfNonMatch"`**

就是 "lookup IP if (there's) no matching rule"，也就是说【如果其他所有规则都匹配不上，那就转化成 `IP` 去匹配 `IP` 规则】。

简单粗暴理解就是说【先把访问目标和其他所有类型规则匹配，如果匹配不上，那就通过 `DNS` 查询转化成 `IP`，再从头和所有规则匹配一次】。

该策略下没有命中任何规则的这一部分域名，会需要再经历 `DNS` 查询过程、以及第二轮规则匹配的过程，其耗时会多于 `AsIs` 策略，所以并不是首选推荐的策略。

</br>

**8.3 域名策略: `"IPOnDemand"`**

这里其实说 `Demand IP` 更准确些，也就是说【当匹配时碰到任何基于 IP 的规则，将域名立即解析为 IP 进行匹配】。

简单粗暴理解就是说【只要路由规则中有 `IP` 类规则，那么所有基于域名 `[domain]` 的请求都要解析成 `[IP]` 然后去匹配 `[IP]` 类规则】。

它要对所有首次域名访问进行 `DNS` 解析，所以首次查询比较耗时。虽然由于 `Xray` 中 `DNS` 缓存机制的存在，后续对相同域名的访问速度会重回巅峰，但总体来说也不是首选推荐的策略。

{{% notice warning  %}}
**啰嗦君：** `domainStrategy` 仅对域名生效，不要搞混了哦~
{{% /notice %}}

</br>

## 9. 思考题

迄今为止，我们都是在【单入站】和【单出站】的基础上，讲解【路由】内部的各种配置逻辑。

但是，如你所知，`Xray` 本身是支持多端口，多协议的。那么，如果我问你：

1. 我希望 `VLESS` 协议将我日常的网页浏览和APP流量转发给美国的大流量服务器
2. 我希望 `trojan` 协议将我的所有Netflix流量转发给日本的服务器解锁各种二次元
3. 我希望 `shadowsocks` 协议将我所有的游戏流量转发给香港的服务器达到最低的延迟
4. 我希望有一个独立的端口，能够把 `telegram` 的流量全都转发给VPS
5. 我希望有一个独立的端口，能够把 `bittorrent` 下载流量全都转发给欧洲大盘鸡
6. 我希望......

这些想法，是否能通过【路由】功能配置实现呢？

答案当然是 **【完全可以】** 啦！ 但是这些对于 `level-1` 来说已经超纲了，就留给各位自由的探索吧！


</br>

## 10. 结语

至此，`Xray` 的【路由】功能就介绍完了。希望本文能够对你理解 `Xray` 的灵活有所帮助。
