---
date: "2020-12-23T00:00:00.000Z"
description: Project X Documentation.
title: Getting Started with Transparent Proxy
weight: 1
---

## What is Transparent Proxy(TProxy)?
General speaking the Transparent Proxy is not let the device which has been proxied feeling itself to be proxied, further speaking is the proxied device do not need to run any proxy software(such as Xray, V2rayNG and so on). When you connected to the network, your device has been proxied.

And it means that, the proxy software is running in other places, such as running in the router, all the devices connected to the Internet via the router can automatically be proxied.
## Implementation of Transparent Proxy
Now the implementation of transparent proxy has two ways:

### tun2socks

It can be implemented on Windows/Linux (including Android). Because the implementation process is relatively simple and there are few tutorials, I will briefly describe it here.

**Windows**

1. Install **[Netch](https://github.com/NetchX/Netch/releases)** , Using mode`[3] [TUN/TAP] Bypass LAN`and active it.

2. Turn on the Hotspot

3. Open`Control Panel`->`Networok and Internet`->`Network and Sharing Center`->`Change adapter settings`, find`TAP-Windows Adapter`and`Microsoft Wi-Fi Direct Virtual Adapter`.

4. Right Click`TAP-Windows Adapter`, `Properties`->`Sharing`, Check`Allow other network users to connect through this computer’s Internet connection`, select the network connection of `Microsoft Wi-Fi Direct Virtual Adapter` in `Home Network Connection`, and click OK.

**Android**

1. Configure connection V2RayNG

2. Open Hotspot

3. Hotspot settings -> Allow Hotspot use VPN(partly Android may not have this option)

### iptables/nftables

iptables & nftables are the same way to implemented Transparent Proxy, and the following uses iptables uniformly.

The Transparent Proxy which based on iptables only available in Linux system(concluding Openwrt/Android). For its more efficiency than tun2socks and it is suitable on router, make it be widely used.

The existing three vernacular transparent proxy tutorials actually talk about this transparent proxy implementation based on this scheme, they are: **[New V2Ray vernacular tutorials-Transparent Proxy](https://guide.v2fly.org/app/transparent_proxy.html)** , **[New V2Ray vernacular tutorials-TPROXY](https://guide.v2fly.org/app/tproxy.html)** , **[Tproxy Configuration](../../tproxy)** . And the first article is based on iptables-redirect mode, but is outdated and not recommended for use, only reference. The second and third articles talk about the implementation of transparent proxy based on iptables-tproxy mode.

## iptables implement the principle of transparent proxy
Linux use `Netfilter` to manage network, the `Netfilter` model is as follows:

![Netfilter](../netfilter.png)

**Assuming that a router is used as a gateway (that is, our usual way of surfing the Internet), then:**

The traffic direction of LAN devices accessing the Internet through the router:

`PREROUTING CHAIN->FORWARD CHAIN->POSTINGROUTING CHAIN`

LAN device to access the router traffic (such as login router web management interface / ssh connection router / access dns servers of router, etc.) direction:

`PREROUTING CHAIN->INPUT CHAIN->Gateway native`

The direction of traffic from the router access to the Internet:

`Gateway Native->OUTPUT CHAIN->POSTINGROUTING CHAIN`

**By using iptables to manipulate the traffic direction of `PREROUTING CHAIN` and `OUTPUT CHAIN`, and forward it to Xray, it can proxy LAN equipment and gateway native.**
## Where is the difficulty of transparent proxy?

The difficulty of transparent proxy lies in routing. The so-called routing is to distinguish which traffic is directly connected and which should be proxied, so I personally think that it is more appropriate to call it **Diversion**.

We can divide routing from easy to difficult into the following stages:

1. Proxy all the requests.

2. Local LAN IP / Multicast IP request direct connection, others request proxy.

3. Directly connect the connection request which initiated by Xray on the basic of the second point.

4. On the basis of the third point, directly connect to the connection request pointing to the IP in mainland China, and select the domestic and foreign DNS server to resolve the domestic and foreign domain names.

The three tutorials mentioned above are all in the fourth stage. So it may seem a bit difficult to understand for novices to read directly.

## Step by step implementation of transparent proxy based on iptables-tproxy from zero
### Before the start, you need to have certain basic knowledge:
1. You need to know about TCP/IP protocol, domain name and DNS server.

2. Know what is WAN port, LAN port, LAN_IP, WAN_IP and DHCP server. For the bypass route, there is only one network port, which is called the LAN port here

3. Have the most basic understanding of the Linux system (know how to run commands)

4. Be able to write the client json file configuration, and at least the configuration can be understood.
### Initial Preparation Work
**1. Prepare a gateway running Linux system**

For example, a router with OpenWRT.

**2. Prepare Xray executable files and configuration files at the gateway (router)**

The configuration file monitors port 12345 and enables tproxy:
```json
{
  "log": {
    "loglevel": "warning"
  },
  "inbounds": [
    {
      "port": 12345,
      "protocol": "dokodemo-door",
      "settings": {
        "network": "tcp,udp",
        "followRedirect": true
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
       The configuration of your server
    }
  ]
}
```
We start from easy to difficult. Without writing routing, we only write one inbound and one outbound.
### First, let’s try to do the first stage
Forward all traffic of the `PREROUTING CHAIN` to Xray.

Run Xray and execute the following commands:
```bash
ip rule add fwmark 1 table 100
ip route add local 0.0.0.0/0 dev lo table 100
iptables -t mangle -N XRAY
iptables -t mangle -A XRAY -p tcp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A XRAY -p udp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A PREROUTING -j XRAY
```
After you have entered, if you use ssh to connect to the gateway, you will find that the ssh is disconnected (don’t worry, it can be restored after power off and restart), and the transparent proxy cannot access the Internet; if your gateway is Virtual machine, you will find that the gateway itself cannot access the Internet, and there will appear many requests about the source address as the destination address and the destination address as WAN_IP in the access_log of Xray.

Theoretically, the gateway's local access to the public network will only go through the `OUTPUT CHAIN` and `POSTROUTING CHAIN`. Why does manipulation of the `PREROUTING CHAIN` cause the gateway to fail to access the Internet? This is because network communication is often two-way. Although the gateway does not need to pass through the `PREROUTING CHAIN` to access the public IP, the accessed server return information to the gateway must pass through the `PREROUTING CHAIN`, and this part is forwarded to Xray. Therefore, a reverse request in the log appears.

Let's modify the rules. If the source IP is not from LAN, and then return. Restart the gateway, run Xray, and execute the following commands:
```bash
ip rule add fwmark 1 table 100
ip route add local 0.0.0.0/0 dev lo table 100
iptables -t mangle -N XRAY
# "Gateway LAN_IP address segment" obtained by running the command "ip address | grep -w "inet" | awk'{print $2}'", is one of them
iptables -t mangle -A XRAY ! -s Gateway LAN_IP address segment -j RETURN
iptables -t mangle -A XRAY -p tcp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A XRAY -p udp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A PREROUTING -j XRAY
```
Then you will find that although the ssh connection is broken, the transparent proxy is already available. As long as modify the system dns to public dns, we will be able to access the Internet (because the gateway cannot be accessed now, so set dns to the gateway will not work).

At this point, the first stage is finished. The reason why the gateway cannot be accessed is that the proxy rules proxy all the traffic, including the traffic which access to the gateway. Imagine accessing your local gateway on the VPS, it is definitely not accessible. So we need to connect this part of traffic directly. Please read the second stage:
### Second stage
Restart the gateway, run Xray, and execute the following commands:
```bash
ip rule add fwmark 1 table 100
ip route add local 0.0.0.0/0 dev lo table 100
iptables -t mangle -N XRAY

# All the target address at network segment where the gateway is located request direct connection
# Obtained by running the command "ip address | grep -w "inet" | awk'{print $2}'", generally there are multiple
iptables -t mangle -A XRAY -d Network segment 1 where the gateway is located -j RETURN
iptables -t mangle -A XRAY -d Network segment 2 where the gateway is located -j RETURN
...

# Request direct connection when the destination address is multicast IP
iptables -t mangle -A XRAY -d 224.0.0.0/4 -j RETURN
iptables -t mangle -A XRAY -d 255.255.255.255/32 -j RETURN

iptables -t mangle -A XRAY -p tcp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A XRAY -p udp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A PREROUTING -j XRAY
```
After using this rule, the previous rule `iptables -t mangle -A XRAY ! -s Gateway LAN_IP address segment -j RETURN` becomes a redundant rule and can be deleted.

At this point, the second stage is completed. The gateway is already accessible, and ssh will not be disconnected.

### The third stage

The DNS we usually use comes from routers, but this iptables rule only proxies the devices in the local area network, but does not proxy the gateway native, so the returned DNS query results may be wrong or polluted.

iptables-tproxy do not support `OUTPUT CHAIN` operation, but `Netfilter` has a feature, after marking the packet as `1` at `OUTPUT CHAIN` , the corresponding packet will be rerouted to the `PREROUTING CHAIN`. Therefore, the request that the gateway native needs to proxy, we can mark `1` at `OUTPUT CHAIN` .

If you want to proxy all the requests sent by the gateway native, it will introduce a problem, Xray runs on the gateway, Xray sends a request to the proxy server, and the request is proxied again, will form a loop.

Therefore, to proxy the gateway native, it is necessary to avoid loopback happening, that is, to circumvent Xray request traffic in proxy rules.

**There are three common methods:**

1. Directly connect to the traffic which target address to VPS

Restart the gateway, run Xray, and execute the following commands:
```bash
#Proxy LAN Device
#Inherit the results of the previous stage
ip rule add fwmark 1 table 100
ip route add local 0.0.0.0/0 dev lo table 100
iptables -t mangle -N XRAY
iptables -t mangle -A XRAY -d Network segment 1 where the gateway is located -j RETURN
iptables -t mangle -A XRAY -d Network segment 2 where the gateway is located -j RETURN
...
iptables -t mangle -A XRAY -d 224.0.0.0/4 -j RETURN
iptables -t mangle -A XRAY -d 255.255.255.255/32 -j RETURN
iptables -t mangle -A XRAY -p tcp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A XRAY -p udp -j TPROXY --on-port 12345 --tproxy-mark 1
iptables -t mangle -A PREROUTING -j XRAY

#Proxy Gateway Native
iptables -t mangle -N XRAY_MASK
iptables -t mangle -A XRAY_MASK -d Network segment 1 where the gateway is located -j RETURN
iptables -t mangle -A XRAY_MASK -d Network segment 2 where the gateway is located -j RETURN
...
iptables -t mangle -A XRAY_MASK -d 224.0.0.0/4 -j RETURN
iptables -t mangle -A XRAY_MASK -d 255.255.255.255/32 -j RETURN
iptables -t mangle -A XRAY_MASK -d VPS Public IP/32 -j RETURN
iptables -t mangle -A XRAY_MASK -j MARK --set-mark 1
iptables -t mangle -A OUTPUT -p tcp -j XRAY_MASK
iptables -t mangle -A OUTPUT -p udp -j XRAY_MASK
```
But to configure like this has a disadvantage. If you use CDN or have a lot of VPS, it is hard to write rules.

2. Circumvent through Mark

The three vernacular tutorials all use this method to circumvent, and refer it by yourself, so I won't repeat them here.

3. Circumvent through gid (recommended)

Reference **[[TProxy]Avoid Xray traffic through gid](../../iptables_gid)**

This completes the third stage agent, which is usually called the global agent. But remember to set the DNS server of the gateway to a foreign DNS server, otherwise the polluted results may still be returned.

### Fourth stage
In fact, not everyone needs to achieve the fourth stage. The global proxy is already applicable for most situations.

Especially for bypass routes. When proxy is required, adjust the gateway to the bypass route IP, and when proxy is not required, change the gateway back to the main route IP.

As for the specific realization of the fourth stage, refer to the three vernacular tutorials. After understanding the above content, reading the three vernacular tutorials will be easier to understand.
### Proxy ipv6
The above rules only take effect for ipv4. If you want to proxy ipv6 requests, use the ip6tables command, which is basically the same as iptables. Refer to **[[TProxy]Avoid Xray traffic through gid#4-set iptables rules](../../iptables_gid#4-设置iptables规则)**
# Other considerations for transparent proxy of iptables
1. If the gateway which perform as a proxy is used as the main route, add a `iptables -t mangle -A XRAY ! -s Gateway LAN_IP address segment -j RETURN` to the `PREROUTING CHAIN` rule, these are the commands that used in the first stage and deleted in the second stage. If you don't write it, other people on the same network segment in the WAN port can fill in the gateway which is your WAN_IP, for stealing your transparent proxy to use, it may also bring a certain degree of danger.

2. The third article in **[New V2Ray vernacular guide-Transparent Proxy(TPROXY)#Setting Gateway](https://guide.v2fly.org/app/tproxy.html#设置网关)** says: `Manually configure the network of PC and point the default gateway to the address of the Raspberry Pi, which is 192.168.1.22. At this time, the PC should be able to access the Internet normally (because no proxy has been set up yet, "normally" means that the domestic website can be accessed)`. In fact, even if IP forwarding is turned on in Ubuntu, CentOS, debian and other systems, the PC cannot access the Internet, this is normal. In fact, only OpenWRT can achieve as described in the text. According to **[@BioniCosmos](https://github.com/BioniCosmos)** remind, this is because the general Linux system does not have Masquery rules.

3. **[The Problem of "Too many open files"](https://guide.v2fly.org/app/tproxy.html#解决-too-many-open-files-问题)** , Refer the solution to **[[TProxy]Avoid Xray traffic through gid-Configure the maximum file opening number & Run Xray client](../../iptables_gid#3-配置最大文件大开数运行xray客户端)**

4. Regarding enable the ip_forward, to be added...

5. To prevent the existing connected package from passing through TPROXY twice, to be added...

6. Main routing, single-arm routing and bypass routing, to be added...
