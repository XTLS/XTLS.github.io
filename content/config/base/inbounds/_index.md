---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: Inbounds
weight: 6
---

入站连接用于接收发来的数据，可用的协议请见[inbound 可用协议列表](../../inbound-protocols)。

## InboundObject

---

`InboundObject` 对应配置文件中 `inbounds` 项的一个子元素。

```json
{
  "inbounds": [
    {
      "listen": "127.0.0.1",
      "port": 1080,
      "protocol": "协议名称",
      "settings": {},
      "streamSettings": {},
      "tag": "标识",
      "sniffing": {
        "enabled": true,
        "destOverride": ["http", "tls"]
      },
      "allocate": {
        "strategy": "always",
        "refresh": 5,
        "concurrency": 3
      }
    }
  ]
}
```

{{% notice dark %}}`listen`: address{{% /notice %}}

监听地址，IP 地址或 Unix domain socket，默认值为 `"0.0.0.0"`，表示接收所有网卡上的连接.

可以指定一个系统可用的 IP 地址。

支持填写 Unix domain socket，格式为绝对路径，形如 `"/dev/shm/domain.socket"`，可在开头加 `"@"` 代表 [abstract](https://www.man7.org/linux/man-pages/man7/unix.7.html)，`"@@"` 则代表带 padding 的 abstract。

填写 Unix domain socket 时，`port` 和 `allocate` 将被忽略，协议目前可选 VLESS、VMess、Trojan，传输方式可选 TCP、WebSocket、HTTP/2。

{{% notice dark %}}`port`: number | "env:variable" | string{{% /notice %}}

端口。接受的格式如下:

- 整型数值：实际的端口号。
- 环境变量：以 `"env:"` 开头，后面是一个环境变量的名称，如 `"env:PORT"`。Xray 会以字符串形式解析这个环境变量。
- 字符串：可以是一个数值类型的字符串，如 `"1234"`；或者一个数值范围，如 `"5-10"` 表示端口 5 到端口 10，这 6 个端口。

当只有一个端口时，Xray 会在此端口监听入站连接。当指定了一个端口范围时，取决于 `allocate` 设置。

{{% notice dark %}}`protocol`: string{{% /notice %}}

连接协议名称，可选的协议类型见[inbound 可用协议列表](../../inbound-protocols)。

{{% notice dark %}}`settings`: InboundConfigurationObject{{% /notice %}}

具体的配置内容，视协议不同而不同。详见每个协议中的 `InboundConfigurationObject`。

{{% notice dark %}}`streamSettings`: [StreamSettingsObject](../../base/transport#streamsettingsobject){{% /notice %}}

底层传输方式（transport）是当前 Xray 节点和其它节点对接的方式

{{% notice dark %}}`tag`: string{{% /notice %}}
此入站连接的标识，用于在其它的配置中定位此连接。

{{% notice danger important %}}
当其不为空时，其值必须在所有 `tag` 中 **唯一**。
{{% /notice %}}


{{% notice dark %}}`sniffing`: [SniffingObject](#sniffingobject){{% /notice %}}

流量探测主要作用于在透明代理等用途.
比如一个典型流程如下:
1. 如有一个设备上网,去访问abc.com,首先设备通过DNS查询得到abc.com的IP是1.2.3.4,然后设备会向1.2.3.4去发起连接.
2. 如果不设置嗅探,Xray收到的连接请求是1.2.3.4,并不能用于域名规则的路由分流.
3. 当设置了sniffing中的enable为true,Xray处理此连接的流量时,会从流量的数据中,嗅探出域名,即abc.com
4. Xray会把1.2.3.4重置为abc.com.路由就可以根据域名去进行路由的域名规则的分流

因为变成了一个向abc.com请求的连接, 就可以做更多的事情, 除了路由域名规则分流, 还能重新做DNS解析等其他工作.

当设置了sniffing中的enable为true, 还能嗅探出bittorrent类型的流量, 然后可以在路由中配置"protocol"项来设置规则处理BT流量, 比如服务端用来拦截BT流量, 或客户端固定转发BT流量到某个VPS去等.

{{% notice dark %}}`allocate`: [AllocateObject](#allocateobject){{% /notice %}}

当设置了多个port时, 端口分配的具体设置

<br />
### SniffingObject

---

```json
{
  "enabled": true,
  "destOverride": ["http", "tls", "fakedns"],
  "metadataOnly": false
}
```

{{% notice dark %}}`enabled`: true | false{{% /notice %}}

是否开启流量探测。

{{% notice dark %}}`destOverride`: \["http" | "tls" | "fakedns" \]{{% /notice %}}

当流量为指定类型时，按其中包括的目标地址重置当前连接的目标。

{{% notice dark %}}`metadataOnly`: true | false{{% /notice %}}

当启用时，将仅使用连接的元数据嗅探目标地址。此时，`http` 与 `tls` 将不能使用。

<br />
### AllocateObject

---

```json
{
  "strategy": "always",
  "refresh": 5,
  "concurrency": 3
}
```

{{% notice dark %}}`strategy`: "always" | "random"{{% /notice %}}

端口分配策略。 
- `"always"` 表示总是分配所有已指定的端口，`port` 中指定了多少个端口，Xray 就会监听这些端口。
- `"random"` 表示随机开放端口，每隔 `refresh` 分钟在 `port` 范围中随机选取 `concurrency` 个端口来监听。

{{% notice dark %}}`refresh`: number{{% /notice %}}

随机端口刷新间隔，单位为分钟。最小值为 `2`，建议值为 `5`。这个属性仅当 `strategy` 设置为 `"random"` 时有效。
{{% notice dark %}}`concurrency`: number{{% /notice %}}

随机端口数量。最小值为 `1`，最大值为 `port` 范围的三分之一。建议值为 `3`。
