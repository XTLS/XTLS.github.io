---
date: "2020-12-23T00:00:00.000Z"
description: Project X Documents
title: Routing
weight: 4
---

The routing function module allows inbound data to be sent out by different outbound connections according to different rules for the purpose of on-demand proxying.

For example, in a common use of splitting domestic and international traffic, xray can use internal mechanisms to determine traffic from different regions and send them to different outbound proxies.

## RoutingObject
---
`RoutingObject` corresponds to the `routing` entry in the configuration file.

```json
{
  "routing": {
    "domainStrategy": "AsIs",
    "rules": [],
    "balancers": []
  }
}
```
{{% notice dark %}}`domainStrategy`: "AsIs" | "IPIfNonMatch" | "IPOnDemand"{{% /notice %}} 

Domain name resolution policies, using different policies depending on the settings.

* `"AsIs"`: Use only domain names for routing. Default value.
* `"IPIfNonMatch"`: resolves the domain name to an IP (A record or AAAA record) to be matched again when the domain name does not match any rules.
  * When a domain name has multiple A records, attempts to match all of them until one of them matches a rule.
  * the resolved IP only works for routing purposes, the original domain name is still used in forwarded packets.
* `"IPOnDemand"`: when any IP-based rule is encountered during matching, the domain name is immediately resolved to IP for matching.

{{% notice dark %}}`rules`: \[[RuleObject](#ruleobject)\]{{% /notice %}}

Corresponds to an array, each element of which is a rule.

For each connection, the route will be judged against these rules in turn, and when a rule is in effect, the connection will be forwarded to the `outboundTag` or `balancerTag` it specifies.

{{% notice info %}}
**TIP**\
When no rule is matched, traffic is sent by default from the first outbound.
{{% /notice %}}

{{% notice dark %}}`balancers`: \[ [BalancerObject](#balancerobject) \]{{% /notice %}}
 
An array, each element of which is a configuration of a load balancer.

When a rule points to a load balancer, xray will select an outbound through this load balancer, which will then forward the traffic.

<br />
### RuleObject
---
```json
{
    "type": "field",
    "domain": [
        "baidu.com",
        "qq.com",
        "geosite:cn"
    ],
    "ip": [
        "0.0.0.0/8",
        "10.0.0.0/8",
        "fc00::/7",
        "fe80::/10",
        "geoip:cn"
    ],
    "port": "53,443,1000-2000",
    "sourcePort": "53,443,1000-2000",
    "network": "tcp",
    "source": [
        "10.0.0.1"
    ],
    "user": [
        "love@xray.com"
    ],
    "inboundTag": [
        "tag-vmess"
    ],
    "protocol": [
        "http",
        "tls",
        "bittorrent"
    ],
    "attrs": "attrs[':method'] == 'GET'",
    "outboundTag": "direct",
    "balancerTag": "balancer"
}
```

<br />
{{% notice danger important %}}
When multiple attributes are specified at the same time, these attributes need to be **satisfied at the same time** for the current rule to take effect.
{{% /notice %}}
<br />  

{{% notice dark %}}`type`: "field"{{% /notice %}}

Currently only the option `"field"` is supported.

{{% notice dark %}}`domain`: \[string\]{{% /notice %}}

An array where each item of the array is a match for a domain name. There are several forms.

* Plain string: The rule takes effect when this string matches any part of the target domain name. For example, "sina.com" can match "sina.com", "sina.com.cn" and "www.sina.com", but not "sina.cn".
* Regular expression: starts with `"regexp:"` and the rest is a regular expression. The rule takes effect when this regular expression matches the target domain name. For example "regexp:\\\\.goo.*\\\\.com$" matches "www.google.com" or "fonts.googleapis.com", but not "google.com".
* Subdomain (recommended): starts with `"domain:"` and the remainder is a domain name. This rule takes effect when this domain name is the target domain or a subdomain of it. For example, `domain:xray.com` matches `www.xray.com`, `xray.com`, but not `wxray.com`.
* Full match: starts with `"full:"` and the rest is a domain name. The rule takes effect when this domain name matches the target domain name in full. For example, "full:xray.com" matches "xray.com" but not "www.xray.com".
* Predefined domain name list: starts with `"geosite:"` and the rest is a name, e.g. `geosite:google` or `geosite:cn`. See [list of predefined domains](# list of predefined domains) for a list of names and domains.
* Load the domain name from a file: in the form of `"ext:file:tag"`, must start with `ext:` (lowercase) followed by the file name and tag, the file is stored in [resource directory](. /env#resource file path) in the same format as `geosite.dat`, and the tag must be present in the file.
 {{% notice info %}}
**TIP**\
`"ext:geoip.dat:cn"` is equivalent to `"geoip:cn"`
{{% /notice %}}

{{% notice dark %}}`ip`: \[string\]{{% /notice %}}

An array where each element of the array represents an IP range. This rule takes effect when an element matches the target IP. There are several forms.

* IP: in the form of `"127.0.0.1"`.
* [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing): in the form of `"10.0.0.0/8"`.
* Predefined IP list: This list is preconfigured in each Xray installation package and is named `geoip.dat`. It is used as `"geoip:cn"` and must start with `geoip:` (lower case) followed by a two-character country code to support almost any country with internet access.
  * Special value: `"geoip:private"`, contains all private addresses, e.g. `127.0.0.1`.
* Load IP from file: shaped like `"ext:file:tag"`, must start with `ext:` (lowercase) followed by the file name and tag, file is stored in [resource directory](../env#resource file path) in the same format as `geoip.dat` The tag must be present in the file.

{{% notice dark %}}`port`：number | string{{% /notice %}}

The target port range, which has three forms.

* `"a-b"`: both a and b are positive integers and less than 65536. this range is a back-and-forth closed interval, and this rule takes effect when the target port falls within this range.
* `a`: a is a positive integer and is less than 65536. this rule takes effect when the target port is a.
* A mixture of the above two forms, separated by a comma ",". For example: `"53,443,1000-2000"`.

{{% notice dark %}}`sourcePort`：number | string{{% /notice %}}

Source port, in three forms.

* `"a-b"`: both a and b are positive integers and less than 65536. this range is a back-and-forth closed interval, and this rule takes effect when the target port falls within this range.
* `a`: a is a positive integer and is less than 65536. this rule takes effect when the target port is a.
* A mixture of the above two forms, separated by a comma ",". For example: `"53,443,1000-2000"`.

{{% notice dark %}}`network`: "tcp" | "udp" | "tcp,udp"{{% /notice %}}

The available values are "tcp", "udp" or "tcp,udp". This rule takes effect when the connection method is the specified method.

{{% notice dark %}}`source`: \[string\]{{% /notice %}}

An array where each element of the array represents an IP range. This rule takes effect when an element matches the target IP. There are several forms.

* IP: in the form of `"127.0.0.1"`.
* [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing): in the form of `"10.0.0.0/8"`.
* Predefined IP list: This list is preconfigured in each Xray installation package and is named `geoip.dat`. It is used as `"geoip:cn"` and must start with `geoip:` (lower case) followed by a two-character country code to support almost any country with internet access.
  * Special value: `"geoip:private"`, contains all private addresses, e.g. `127.0.0.1`.
* Load IP from file: shaped like `"ext:file:tag"`, must start with `ext:` (lowercase) followed by the file name and tag, file is stored in [resource directory](../env#resource file path) in the same format as `geoip.dat` The tag must be present in the file.

{{% notice dark %}}`user`: \[string\]{{% /notice %}}

An array, where each element of the array is an email address. This rule takes effect when an element matches the source user.

{{% notice dark %}}`inboundTag`: \[string\]{{% /notice %}}

An array, each element of which is an identifier. This rule takes effect when an element matches the identifier of an inbound protocol.

{{% notice dark %}}`protocol`: \[ "http" | "tls" | "bittorrent" \]{{% /notice %}}

An array, each element of which represents a protocol. This rule takes effect when a protocol matches the protocol type of the current connection.
 {{% notice info %}}
**TIP**\
The `sniffing` option in the inbound proxy must be enabled to sniff out the protocol type used by the connection.
{{% /notice %}}

{{% notice dark %}}`attrs`: string{{% /notice %}}

A script that detects the value of an attribute of the traffic. This rule takes effect when this script returns a true value.

The script language is [Starlark](https://github.com/bazelbuild/starlark) and its syntax is a subset of Python. The script accepts a global variable `attrs`, which contains traffic-related attributes.

Currently only http inbound proxies will set this attribute.

Examples.

* Detecting HTTP GET: `"attrs[':method'] == 'GET'"`
* Detect HTTP Path: `"attrs[':path'].startswith('/test')"`
* Detect Content Type: `"attrs['accept'].index('text/html') >= 0"`

{{% notice dark %}}`outboundTag`: string{{% /notice %}}

Corresponds to an outbound tag.

{{% notice dark %}}`balancerTag`: string{{% /notice %}}

Corresponds to a balancer tag.

 {{% notice info %}}
**TIP**\
`balancerTag` and `outboundTag` must be either. When both are specified, `outboundTag` takes effect.
{{% /notice %}}


<br />
### BalancerObject
---
Load Balancer Configuration. When a load balancer is in effect, it will select the most appropriate outbound for traffic forwarding from the specified outbound, as configured.

```json
{
    "tag": "balancer",
    "selector": []
}
```

{{% notice dark %}}`tag`: string{{% /notice %}}

The identifier of this load balancer to match the `balancerTag` in the `RuleObject`.

{{% notice dark %}}`selector`: \[ string \]{{% /notice %}}


An array of strings, each of which will be used to match against the prefix of the outbound identifier. Of the following outbound identifiers: `[ "a", "ab", "c", "ba" ]`, `"selector": ["a"]` will match to `[ "a", "ab" ]`.

If more than one outbound is matched, the load balancer will now randomly select one of them as the final outbound.

<br />
### List of predefined domains
---
This list is pre-populated in every xray installation package with the file name `geosite.dat`. This file contains a number of common domain names, used as: `geosite:filename`, e.g. `geosite:google` indicates a route filter or DNS filter for domains within the file that match those contained within `google`.

Common domain names are.

* `category-ads`: Contains common advertising domains.
* `category-ads-all`: contains common ad domains, as well as the ad provider's domain name.
* `cn`: equivalent to a combination of `geolocation-cn` and `tld-cn`.
* `apple`: contains most of the domains owned by Apple.
* `google`: Contains most of the domain names under the Google umbrella.
* `microsoft`: Contains most of the domain names under the Microsoft umbrella.
* `facebook`: Includes most of the domain names owned by Facebook.
* `twitter`: Contains most of the domains owned by Twitter.
* `telegram`: contains most of Telegram's domain names.
* `geolocation-cn`: Contains common mainland site domains.
* `geolocation-!cn`: Includes common non-continental domain names, also includes `tld-!cn`.
* `tld-cn`: contains the top-level domain names managed by CNNIC for mainland China, such as those ending in `.cn`, `. China`.
* `tld-!cn`: contains top-level domain names not used in mainland China, such as those ending with `.hk` (Hong Kong), `.tw` (Taiwan), `.jp` (Japan), `.sg` (Singapore), `.us` (USA), `.ca` (Canada), etc.
