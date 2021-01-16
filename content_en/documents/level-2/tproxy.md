---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: 透明代理（TProxy）配置教程
weight: 2
---

本配置基于[TProxy 透明代理的新 V2Ray 白话文教程](https://guide.v2fly.org/app/tproxy.html)，加入了 Xray 的新特性，使用 VLESS + XTLS Splice 方案，并将旧教程中默认出站代理的分流方式改为默认出站直连，使用者请按照实际情况进行修改。

本文中所有配置已在 Raspberry Pi 2B、Ubuntu 20.04 环境下测试成功，如在其它环境中使用请自行调整配置。

## 开始之前

请检查您的设备是否有可用的网络连接，且服务端已经配置成功，客户端已经安装完毕。

需注意的是，目前很多透明代理教程都会将 Linux 系统的 IP 转发打开，但这样会导致 Splice 性能下降。详情请参考[大案牍术破案纪实第三篇--我们是如何破解 Splice 性能下降甚至低于 Direct 之谜的](https://github.com/XTLS/Xray-core/discussions/59)。

这里我想要补充的是，很多透明代理教程会使用 Netfilter 进行分流，使直连流量直接发出而不经过 Xray，这时必须开启 IP 转发；也有的教程，如本文，会将所有流量导入 Xray 之中，由 Xray 的路由模块进行分流，这时无需开启 IP 转发。

## Xray 配置

```json
{
    "log": {
        "loglevel": "warning",
        "error": "/var/log/xray/error.log",
        "access": "/var/log/xray/access.log"
    },
    "inbounds": [
        {
            "tag": "all-in",
            "port": 12345,
            "protocol": "dokodemo-door",
            "settings": {
                "network": "tcp,udp",
                "followRedirect": true
            },
            "sniffing": {
                "enabled": true,
                "destOverride": [
                    "http",
                    "tls"
                ]
            },
            "streamSettings": {
                "sockopt": {
                    "tproxy": "tproxy"
                }
            }
        }
    ],
    "outbounds": [
        {
            "tag": "direct",
            "protocol": "freedom",
            "settings": {
                "domainStrategy": "UseIPv4"
            },
            "streamSettings": {
                "sockopt": {
                    "mark": 2
                }
            }
        },
        {
            "tag": "proxy",
            "protocol": "vless",
            "settings": {
                "vnext": [
                    {
                        "address": "服务端域名",
                        "port": 443,
                        "users": [
                            {
                                "id": "UUID",
                                "flow": "xtls-rprx-splice",
                                "encryption": "none"
                            }
                        ]
                    }
                ]
            },
            "streamSettings": {
                "network": "tcp",
                "security": "xtls",
                "sockopt": {
                    "mark": 2
                }
            }
        },
        {
            "tag": "block",
            "protocol": "blackhole",
            "settings": {
                "response": {
                    "type": "http"
                }
            }
        },
        {
            "tag": "dns-out",
            "protocol": "dns",
            "settings": {
                "address": "8.8.8.8"
            },
            "proxySettings": {
                "tag": "proxy"
            },
            "streamSettings": {
                "sockopt": {
                    "mark": 2
                }
            }
        }
    ],
    "dns": {
        "hosts": {
            "服务端域名": "服务端 IP"
        },
        "servers": [
            {
                "address": "119.29.29.29",
                "port": 53,
                "domains": [
                    "geosite:cn"
                ],
                "expectIPs": [
                    "geoip:cn"
                ]
            },
            {
                "address": "223.5.5.5",
                "port": 53,
                "domains": [
                    "geosite:cn"
                ],
                "expectIPs": [
                    "geoip:cn"
                ]
            },
            "8.8.8.8",
            "1.1.1.1",
            "https+local://doh.dns.sb/dns-query"
        ]
    },
    "routing": {
        "domainStrategy": "IPIfNonMatch",
        "rules": [
            {
                "type": "field",
                "inboundTag": [
                    "all-in"
                ],
                "port": 53,
                "outboundTag": "dns-out"
            },
            {
                "type": "field",
                "ip": [
                    "119.29.29.29",
                    "223.5.5.5"
                ],
                "outboundTag": "direct"
            },
            {
                "type": "field",
                "ip": [
                    "8.8.8.8",
                    "1.1.1.1"
                ],
                "outboundTag": "proxy"
            },
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
                    "geosite:geolocation-!cn"
                ],
                "outboundTag": "proxy"
            },
            {
                "type": "field",
                "ip": [
                    "geoip:jp",
                    "geoip:us",
                    "geoip:sg",
                    "geoip:hk",
                    "geoip:tw",
                    "109.239.140.0/24",
                    "14.102.250.18",
                    "14.102.250.19",
                    "149.154.164.0/22",
                    "149.154.168.0/22",
                    "149.154.172.0/22",
                    "174.142.105.153",
                    "50.7.31.230",
                    "67.220.91.15",
                    "67.220.91.18",
                    "67.220.91.23",
                    "69.65.19.160",
                    "72.52.81.22",
                    "85.17.73.31",
                    "91.108.4.0/22",
                    "91.108.56.0/22",
                    "91.108.56.0/23",
                    "108.177.120.94",
                    "108.177.120.0/24",
                    "172.217.0.0/16",
                    "74.125.0.0/16",
                    "23.246.0.0/18",
                    "37.77.184.0/21",
                    "45.57.0.0/17",
                    "64.120.128.0/17",
                    "66.197.128.0/17",
                    "108.175.32.0/20",
                    "192.173.64.0/18",
                    "198.38.96.0/19",
                    "198.45.48.0/20",
                    "173.245.48.0/20",
                    "103.21.244.0/22",
                    "103.22.200.0/22",
                    "103.31.4.0/22",
                    "141.101.64.0/18",
                    "108.162.192.0/18",
                    "190.93.240.0/20",
                    "188.114.96.0/20",
                    "197.234.240.0/22",
                    "198.41.128.0/17",
                    "162.158.0.0/15",
                    "104.16.0.0/12",
                    "172.64.0.0/13",
                    "131.0.72.0/22",
                    "144.220.0.0/16",
                    "52.124.128.0/17",
                    "54.230.0.0/16",
                    "54.239.128.0/18",
                    "52.82.128.0/19",
                    "99.84.0.0/16",
                    "204.246.172.0/24",
                    "54.239.192.0/19",
                    "70.132.0.0/18",
                    "13.32.0.0/15",
                    "205.251.208.0/20",
                    "13.224.0.0/14",
                    "13.35.0.0/16",
                    "204.246.164.0/22",
                    "204.246.168.0/22",
                    "71.152.0.0/17",
                    "216.137.32.0/19",
                    "205.251.249.0/24",
                    "99.86.0.0/16",
                    "52.46.0.0/18",
                    "52.84.0.0/15",
                    "204.246.173.0/24",
                    "130.176.0.0/16",
                    "205.251.200.0/21",
                    "204.246.174.0/23",
                    "64.252.128.0/18",
                    "205.251.254.0/24",
                    "143.204.0.0/16",
                    "205.251.252.0/23",
                    "204.246.176.0/20",
                    "13.249.0.0/16",
                    "54.240.128.0/18",
                    "205.251.250.0/23",
                    "52.222.128.0/17",
                    "54.182.0.0/16",
                    "54.192.0.0/16",
                    "103.2.30.0/23",
                    "125.209.208.0/20",
                    "147.92.128.0/17",
                    "203.104.144.0/21",
                    "91.108.8.0/22",
                    "91.108.12.0/22",
                    "91.108.16.0/22",
                    "149.154.160.0/20",
                    "3.123.36.126/32",
                    "35.157.215.84/32",
                    "35.157.217.255/32",
                    "52.58.209.134/32",
                    "54.93.124.31/32",
                    "54.162.243.80/32",
                    "54.173.34.141/32",
                    "54.235.23.242/32",
                    "169.45.248.118/32"
                ],
                "outboundTag": "proxy"
            }
        ]
    }
}
```

{{% notice %}}
**TIP**

本配置会劫持所有发往 53 端口的流量以解决 DNS 污染问题，所以客户端和本机的 DNS 服务器的地址可以随意配置。

此外，由于内置的 `geoip.dat` 文件无法完美实现路由分流，故在配置文件中格外添加了一些 IP。
{{% /notice %}}

## 策略路由配置

```
# ip route add local default dev lo table 100 # 添加路由表 100
# ip rule add fwmark 1 table 100 # 为路由表 100 设定规则
```


## Netfilter 配置

{{% notice warning %}}
**注意**

nftables 配置与 iptables 配置二选一，不可同时使用。
{{% /notice %}}

{{< tabs >}}

{{% tab "nftables" %}}
```
#!/usr/sbin/nft -f
  
flush ruleset

define RESERVED_IP = {
    10.0.0.0/8,
    100.64.0.0/10,
    127.0.0.0/8,
    169.254.0.0/16,
    172.16.0.0/12,
    192.0.0.0/24,
    224.0.0.0/4,
    240.0.0.0/4,
    255.255.255.255/32
}

table ip xray {
        chain prerouting {
                type filter hook prerouting priority mangle; policy accept;
                ip daddr $RESERVED_IP return
                ip daddr 192.168.0.0/16 tcp dport != 53 return
                ip daddr 192.168.0.0/16 udp dport != 53 return
                ip protocol tcp tproxy to 127.0.0.1:12345 meta mark set 1
                ip protocol udp tproxy to 127.0.0.1:12345 meta mark set 1
        }
        chain output {
                type route hook output priority mangle; policy accept;
                ip daddr $RESERVED_IP return
                ip daddr 192.168.0.0/16 tcp dport != 53 return
                ip daddr 192.168.0.0/16 udp dport != 53 return
                meta mark 2 return
                ip protocol tcp meta mark set 1
                ip protocol udp meta mark set 1
        }
}
```
{{% notice %}}
**使用方法**

将上述配置写入一个文件（如 `nft.conf`），之后将该文件赋予可执行权限，最后使用 root 权限执行该文件即可（`# ./nft.conf`）。
{{% /notice %}}
{{% /tab %}}

{{< tab "iptables" >}}
```
iptables -t mangle -N XRAY
iptables -t mangle -A XRAY -d 10.0.0.0/8 -j RETURN
iptables -t mangle -A XRAY -d 100.64.0.0/10 -j RETURN
iptables -t mangle -A XRAY -d 127.0.0.0/8 -j RETURN
iptables -t mangle -A XRAY -d 169.254.0.0/16 -j RETURN
iptables -t mangle -A XRAY -d 172.16.0.0/12 -j RETURN
iptables -t mangle -A XRAY -d 192.0.0.0/24 -j RETURN
iptables -t mangle -A XRAY -d 224.0.0.0/4 -j RETURN
iptables -t mangle -A XRAY -d 240.0.0.0/4 -j RETURN
iptables -t mangle -A XRAY -d 255.255.255.255/32 -j RETURN
iptables -t mangle -A XRAY -d 192.168.0.0/16 -p tcp ! --dport 53 -j RETURN
iptables -t mangle -A XRAY -d 192.168.0.0/16 -p udp ! --dport 53 -j RETURN
iptables -t mangle -A XRAY -p tcp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A XRAY -p udp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A PREROUTING -j XRAY

iptables -t mangle -N XRAY_SELF
iptables -t mangle -A XRAY_SELF -d 10.0.0.0/8 -j RETURN
iptables -t mangle -A XRAY_SELF -d 100.64.0.0/10 -j RETURN
iptables -t mangle -A XRAY_SELF -d 127.0.0.0/8 -j RETURN
iptables -t mangle -A XRAY_SELF -d 169.254.0.0/16 -j RETURN
iptables -t mangle -A XRAY_SELF -d 172.16.0.0/12 -j RETURN
iptables -t mangle -A XRAY_SELF -d 192.0.0.0/24 -j RETURN
iptables -t mangle -A XRAY_SELF -d 224.0.0.0/4 -j RETURN
iptables -t mangle -A XRAY_SELF -d 240.0.0.0/4 -j RETURN
iptables -t mangle -A XRAY_SELF -d 255.255.255.255/32 -j RETURN
iptables -t mangle -A XRAY_SELF -d 192.168.0.0/16 -p tcp ! --dport 53 -j RETURN
iptables -t mangle -A XRAY_SELF -d 192.168.0.0/16 -p udp ! --dport 53 -j RETURN
iptables -t mangle -A XRAY_SELF -m mark --mark 2 -j RETURN
iptables -t mangle -A XRAY_SELF -p tcp -j MARK --set-mark 1
iptables -t mangle -A XRAY_SELF -p udp -j MARK --set-mark 1
iptables -t mangle -A OUTPUT -j XRAY_SELF
```
{{< /tab >}}

{{< /tabs >}}

配置完成后，将局域网内其它设备的默认网关改为该设备 IP，就可以直接翻墙了。在其它主机和本机皆测试成功后，可进行下一步配置。

## 配置永久化与开机自启

{{< tabs >}}

{{% tab "nftables" %}}
首先将已经编辑好的 nftables 配置文件移动到 `/etc` 目录下，并重命名为 `nftables.conf`。然后编辑 `/lib/systemd/system/nftables.service`。

```ini
[Unit]
Description=nftables
Documentation=man:nft(8) http://wiki.nftables.org
Wants=network-pre.target
Before=network-pre.target shutdown.target
Conflicts=shutdown.target
DefaultDependencies=no

[Service]
Type=oneshot
RemainAfterExit=yes
StandardInput=null
ProtectSystem=full
ProtectHome=true
ExecStart=/usr/sbin/nft -f /etc/nftables.conf ; /usr/sbin/ip route add local default dev lo table 100 ; /usr/sbin/ip rule add fwmark 1 table 100
ExecReload=/usr/sbin/nft -f /etc/nftables.conf
ExecStop=/usr/sbin/nft flush ruleset ; /usr/sbin/ip route del local default dev lo table 100 ; /usr/sbin/ip rule del table 100

[Install]
WantedBy=sysinit.target
```

最后 enable 即可。
{{< /tab >}}

{{< tab "iptables" >}}
关于 iptables 的永久化，建议直接安装 `iptables-persistent`。

安装过程中会提示你选择“是否保存配置”，如果已经将 iptables 配置写入系统，那么此时选择“是”即可；如果尚未写入也没有关系，安装完毕后将配置写入，然后执行 `netfilter-persistent save` 即可（需要 root 权限）。

之后编辑 `/lib/systemd/system/netfilter-persistent.service`。

```ini
[Unit]
Description=netfilter persistent configuration
DefaultDependencies=no
Wants=network-pre.target systemd-modules-load.service local-fs.target
Before=network-pre.target shutdown.target
After=systemd-modules-load.service local-fs.target
Conflicts=shutdown.target
Documentation=man:netfilter-persistent(8)

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/usr/sbin/netfilter-persistent start ; /usr/sbin/ip route add local default dev lo table 100 ; /usr/sbin/ip rule add fwmark 1 table 100
ExecStop=/usr/sbin/netfilter-persistent stop ; /usr/sbin/ip route del local default dev lo table 100 ; /usr/sbin/ip rule del table 100

[Install]
WantedBy=multi-user.target
```
{{< /tab >}}

{{< /tabs >}}
