---
date: "2020-01-16T00:00:00.000Z"
description: Project X Documents
title: Built-in dns server
weight: 3
---

## DNS Server

---

If the DNS server module is configured for xray, it has two main purposes.

- During the routing phase, the domain name will be resolved to an IP, and the IP obtained from the domain name resolution will be matched with rules for triage. Whether or not the domain name is resolved and triaged depends on the value of "domainStrategy" in the routing configuration module, and the built-in DNS server will only be used for DNS lookups if the following two values are set:

  - "IPIfNonMatch", when requesting a domain name, the domain will be matched and if no match is found, a DNS query will be performed using the built-in DNS server for the domain name and the IP address returned by the query will be used to perform a new IP routing match.
  - "IPOnDemand", when a match encounters any IP-based rule, resolves the domain name immediately to an IP for the match.

- Resolve the destination address for connection.
  - For example, if `domainStrategy` is set to `UseIP` in `outbound` of the `freedom` protocol, the outbound request will first resolve the domain name to an IP through the built-in server, and then connect.

{{% notice info %}}
**TIP 1**\
DNS lookup requests from the built-in DNS server are automatically forwarded according to the routing configuration.
{{% /notice %}}

{{% notice info %}}
**TIP 2**\
Only the most basic IP queries are supported (A and AAAA records).
{{% /notice %}}

<br />
## DNS processing flow
---
The DNS Server Configuration module allows you to configure multiple DNS servers and specify a priority match list.

1. If the query matches a DNS server's specified list of domain names, xray will use that DNS server for the query first.
2. if there is no match, the query is performed in top-down order.
3. only returns a list of IPs that match expectIPs.

The processing flow of the DNS server is illustrated below.

![](../dns/dns_flow.png?classes=border,shadow)

<br />
## DnsObject
---
`DnsObject` corresponds to the `dns` entry in the configuration file.

```json
{
  "dns": {
    "hosts": {
      "baidu.com": "127.0.0.1"
    },
    "servers": [
      "8.8.8.8",
      "8.8.4.4",
      {
        "address": "1.2.3.4",
        "port": 5353,
        "domains": ["domain:xray.com"],
        "expectIPs": ["geoip:cn"]
      },
      "localhost"
    ],
    "clientIp": "1.2.3.4",
    "tag": "dns_inbound"
  }
}
```

{{% notice dark %}}`hosts`: map{string: address}{{% /notice %}}

A static IP list whose values are a series of "domain names": "addresses". where the address can be either an IP or a domain name. When resolving a domain name, if the domain name matches one of the items in this list:

- When the address is an IP, the result will be the IP.
- When the address is a domain name, this domain name is used for IP resolution instead of the original domain name.

The format of a domain name can take several forms.

- Plain string: The rule takes effect when this string matches the target domain name in its entirety. For example, "xray.com" matches "xray.com" but not "www.xray.com".
- Regular expression: starts with `"regexp:"` and the rest of the rule is a regular expression. The rule takes effect when this regular expression matches the target domain name. For example "regexp:\\\\.goo.\*\\\\.com$" matches "www.google.com" or "fonts.googleapis.com", but not "google.com".
- Sub-domain (recommended): starts with `"domain:"` and the rest is a domain name. This rule works when the domain name is the target domain or a subdomain of it. For example, "domain:xray.com" matches "www.xray.com", "xray.com" but not "xray.com".
- Substring: starts with `"keyword:"` and the rest of the string is a string. The rule takes effect when this string matches any part of the target domain name. For example, "keyword:sina.com" can match "sina.com", "sina.com.cn" and "www.sina.com", but not "sina.cn".
- Predefined domain name list: starts with `"geosite:"` and the rest is a name such as `geosite:google` or `geosite:cn`. For a list of names and domains see [list of predefined domains](../routing/#list of predefined domains)。

{{% notice dark %}}`servers`: \[string | [ServerObject](#serverobject) \]{{% /notice %}}

A list of DNS servers with two supported types: DNS addresses (in string form) and [ServerObject](#serverobject).

When its value is a DNS IP address, such as `"8.8.8.8"`, xray will use port 53 of this address for DNS lookups.

When the value is `"localhost"`, it means that the local preset DNS configuration is used.

When the value is of the form `"https://host:port/dns-query"`, such as `"https://dns.google/dns-query"`, xray will use `DNS over HTTPS` (RFC8484, abbreviated DOH) for the lookup. Some service providers have IP alias certificates that can be written directly in IP form, such as `https://1.1.1.1/dns-query`. Non-standard ports and paths can also be used, such as `"https://a.b.c.d:8443/my-dns-query"` .

When the value is of the form `"https+local://host:port/dns-query"`, e.g. `"https+local://dns.google/dns-query"`, Xray will use `DOH local mode` for the query, i.e. the DOH request will not go through Routing/Outbound etc. components, and requests are made directly to the outside world to reduce time consumption. Generally suitable for use on the server side. Non-standard ports and paths can also be used.

{{% notice info %}}
**TIP 1**\
When using `localhost`, local DNS requests are not controlled by Xray and additional configuration is required to enable DNS requests to be forwarded by xray.
{{% /notice %}}

{{% notice info %}}
**TIP 2**\
DNS clients initialised with different rules are reflected in the Xray startup log at the `info` level, in patterns such as `local DOH`, `remote DOH` and `udp`.
{{% /notice %}}

{{% notice dark %}}`clientIp`: string{{% /notice %}}

Used to notify the server when DNS queries are made to specify an IP location. Cannot be a private address.

{{% notice dark %}}`tag`: string{{% /notice %}}

Query traffic from the built-in DNS, except for the `localhost` and `DOHL_` patterns, can be matched at the route using `inboundTag` with this identifier.

<br />
### ServerObject
---
```json
{
    "address": "1.2.3.4",
    "port": 5353,
    "domains": [
        "domain:xray.com"
    ],
    "expectIPs": [
        "geoip:cn"
    ]
}
```
{{% notice dark %}}`address`: address{{% /notice %}}

A list of DNS servers, of which two types are supported: DNS address (in string form) and ServerObject .

When its value is a DNS IP address, such as "8.8.8.8", xray will use port 53 of this address for DNS lookups.

When the value is "localhost", it means that the local preset DNS configuration is used.

When the value is of the form "https://host:port/dns-query", e.g. "https://dns.google/dns-query", xray will use DNS over HTTPS (RFC8484, DOH for short) for the lookup. Some service providers have IP alias certificates and can write IP forms directly, such as https://1.1.1.1/dns-query. Non-standard ports and paths can also be used, such as "https://a.b.c.d:8443/my-dns-query".

When the value is of the form "https+local://host:port/dns-query", e.g. "https+local://dns.google/dns-query", xray will use DOH local mode for the query, i.e. the DOH request will not go through the Routing/ Outbound etc. components, and requests are made directly to the outside world to reduce time consumption. Generally suitable for use on the server side. Non-standard ports and paths can also be used.

> 
{{% notice dark %}}`port`: number{{% /notice %}}

DNS server port, e.g. `53`. This defaults to `53` by default. When using DOH mode this is not valid and the non-standard port should be specified in the URL.

{{% notice dark %}}`domains`: \[string\]{{% /notice %}}

A list of domains, this list contains domains that will be prioritised for lookup using this server. The format of the domain names is the same as in [routing configuration](../routing#ruleobject).

{{% notice dark %}}`expectIPs`:\[string\]{{% /notice %}}

A list of IP ranges, in the same format as in [route configuration](../routing#ruleobject).

When this is configured, xray DNS checks the returned IP's and only returns addresses that are included in the list of expectIPs.

If this is not configured, the IP address will be returned as is.
