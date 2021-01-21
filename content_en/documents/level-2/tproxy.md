---
date: "2020-12-23T00:00:00.000Z"
description: Project X Documentation.
title: TProxy Configuration
weight: 2
---

This configuration is based on [New V2Ray vernacular tutorial on TProxy (transparent proxy)](https://guide.v2fly.org/app/tproxy.html) , adding the new features of Xray, using the VLESS + XTLS Splice solution, and change the default outbound proxy distribution method to the default outbound direct connection in the old tutorial, the user should modify it according to the actual situation.

All the configurations in this article have been successfully tested in Raspberry Pi 2B and Ubuntu 20.04 environments. If you use them in other environments, please adjust the configuration yourself.

## Before the Start

Please check if your device has an available network connection, and the server has been configured successfully, the client has been installed.

It should be noticed that many transparent proxy tutorials currently open the IP forwarding of the Linux system, but this will cause the performance decreasing of Splice. For details, please refer to [Chapter 3 "Record of solving the Big case"--How we cracked the mystery of Splice performance degradation even lower than Direct performance](https://github.com/XTLS/Xray-core/discussions/59).

What I want to add here is that many transparent proxy tutorials will use Netfilter to diverse traffic, so that direct traffic is sent directly without going through Xray. At this time, IP forwarding must be enabled; And some tutorials, such as this article, will import all traffic into Xray. And then Xray's routing module performs traffic distribution, and there is no need to enable IP forwarding at this time.

## Configuration of Xray

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
                        "address": "Server Domain",
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
            "Server Domain": "Server IP"
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
**TIPs**

This configuration will hijack all traffic sent to port 53 to solve the DNS pollution problem, so the address of the client and the local DNS server address of this machine can be configured at will.

In addition, because the built-in `geoip.dat` file cannot perfectly implement routing traffic diverse, some addon IPs are added to the configuration file.
{{% /notice %}}

## Policy Routing Configuration

```
# ip route add local default dev lo table 100 # Add routing table 100
# ip rule add fwmark 1 table 100 # Set rules for routing table 100
```


## Configuration of Netfilter

{{% notice warning %}}
**Notices**

Choose one of nftables configuration and iptables configuration, and cannot be used two at the same time.
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
**Instructions**

Write the above configuration into a file (such as `nft.conf`), then grant the file executable permissions, and finally execute the file with root permissions（`# ./nft.conf`）.
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

After the configuration is complete, change the default gateway of other devices in the LAN to this device IP, and you can directly overturn the wall. After other hosts and this machine are tested successfully, you can proceed to the next configuration.

## Configure Permanentization & Self-startup

{{< tabs >}}

{{% tab "nftables" %}}
First move the edited nftables configuration file to the `/etc` directory, and rename it to `nftables.conf`. And then edit `/lib/systemd/system/nftables.service`.

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

And finally enable will be done.
{{< /tab >}}

{{< tab "iptables" >}}
Regarding the permanentization of iptables, it is recommended to install directly `iptables-persistent`.

During the installation process, you will be prompted to choose "Whether to save the configuration". If the iptables configuration has been written to the system, then select "Yes" at this time; if it has not been written, it doesn't matter. After the installation is complete, write the configuration and execute `netfilter-persistent save` will be done (root permission is required).

And then edit `/lib/systemd/system/netfilter-persistent.service`.

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
