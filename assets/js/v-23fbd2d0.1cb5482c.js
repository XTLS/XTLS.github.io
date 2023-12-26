"use strict";(self.webpackChunkXray_docs_next=self.webpackChunkXray_docs_next||[]).push([[6907],{4426:(e,s,n)=>{n.r(s),n.d(s,{data:()=>o});const o={key:"v-23fbd2d0",path:"/en/config/dns.html",title:"Built-in DNS Server",lang:"en-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"DNS Server",slug:"dns-server",children:[]},{level:2,title:"DNS Processing Flow",slug:"dns-processing-flow",children:[]},{level:2,title:"DnsObject",slug:"dnsobject",children:[{level:3,title:"ServerObject",slug:"serverobject",children:[]}]}],filePathRelative:"en/config/dns.md",git:{updatedTime:1703564598e3,contributors:[{name:"rootmelo92118",email:"32770959+rootmelo92118@users.noreply.github.com",commits:3},{name:"yuhan6665",email:"1588741+yuhan6665@users.noreply.github.com",commits:2},{name:"Eugene bogorad",email:"2777398+bogorad@users.noreply.github.com",commits:1},{name:"Winston2084",email:"126307318+Winston2084@users.noreply.github.com",commits:1},{name:"hmol233",email:"82594500+hmol233@users.noreply.github.com",commits:1},{name:"ちか",email:"88967758+chika0801@users.noreply.github.com",commits:1}]}}},25230:(e,s,n)=>{n.r(s),n.d(s,{default:()=>S});var o=n(66252);const t=(0,o.uE)('<h1 id="built-in-dns-server" tabindex="-1"><a class="header-anchor" href="#built-in-dns-server" aria-hidden="true">#</a> Built-in DNS Server</h1><h2 id="dns-server" tabindex="-1"><a class="header-anchor" href="#dns-server" aria-hidden="true">#</a> DNS Server</h2><p>The DNS module built into Xray has two main purposes:</p><ul><li>During the routing phase, it resolves domain names to IP addresses and performs traffic splitting based on the results of domain name resolution and the value of <code>domainStrategy</code> in the routing configuration module. The built-in DNS server is only used for DNS queries when either of the following values is set: <ul><li>&quot;IPIfNonMatch&quot;: When a domain name is requested, it first tries to match it against the <code>domain</code> entries in the routing configuration. If no match is found, the built-in DNS server is used to perform a DNS query for the domain name, and the returned IP address is used to perform IP routing matching again.</li><li>&quot;IPOnDemand&quot;: When a domain name is matched against any IP-based rule, it is immediately resolved to an IP address for matching.</li></ul></li><li>It resolves the target address for connection. <ul><li>In the <code>freedom</code> outbound setting, if <code>domainStrategy</code> is set to <code>UseIP</code>, requests made through the outbound proxy will first resolve the domain name to an IP address using the built-in server before making the connection.</li><li>In the <code>sockopt</code> setting, if <code>domainStrategy</code> is set to <code>UseIP</code>, system connections initiated through the outbound proxy will first be resolved to an IP address using the built-in server before making the connection.</li></ul></li></ul><div class="custom-container tip"><p class="custom-container-title">TIP 1</p><p>DNS queries sent by the built-in DNS server are automatically forwarded based on the routing configuration.</p></div><div class="custom-container tip"><p class="custom-container-title">TIP 2</p><p>Only basic IP queries (A and AAAA records) are supported. CNAME records will be queried repeatedly until an A/AAAA record is returned. Other queries will not enter the built-in DNS server.</p></div><h2 id="dns-processing-flow" tabindex="-1"><a class="header-anchor" href="#dns-processing-flow" aria-hidden="true">#</a> DNS Processing Flow</h2><p>If the domain name to be queried:</p><ul><li><p>Matches the mapping of &quot;domain name - IP&quot; or &quot;domain name - IP array&quot; in the <code>hosts</code>, then the IP or IP array will be returned as the DNS resolution result.</p></li><li><p>Matches the mapping of &quot;domain name - domain name&quot; in the <code>hosts</code>, then the value of this mapping (another domain name) will be used as the domain name to be queried, and enter the DNS processing flow until an IP is resolved and returned, or an empty resolution is returned.</p></li><li><p>Does not match <code>hosts</code>, but matches the <code>domains</code> list in one or more DNS servers, then according to the priority of the matching rule, use the DNS server corresponding to the rule to perform the query in sequence. If the DNS server that is hit fails to query or <code>expectIPs</code> does not match, then use the next hit DNS server to perform the query. Otherwise, return the resolved IP. If all hit DNS servers fail to query or <code>expectIPs</code> does not match, then the DNS component:</p><ul><li>By default, it will perform &quot;DNS fallback query&quot;: use the &quot;DNS server that has not been used in the last failed query and has a default value of <code>false</code> for <code>skipFallback</code>&quot; to perform the query in sequence. If the query fails or <code>expectIPs</code> does not match, return an empty resolution; otherwise, return the resolved IP.</li><li>If <code>disableFallback</code> is set to <code>true</code>, &quot;DNS fallback query&quot; will not be performed.</li></ul></li><li><p>If neither <code>hosts</code> nor the <code>domains</code> list in DNS servers matches, then:</p><ul><li>By default, use the &quot;DNS server that has a default value of <code>false</code> for <code>skipFallback</code>&quot; to perform the query in sequence. If the first selected DNS server fails to query or <code>expectIPs</code> does not match, then use the next selected DNS server to perform the query. Otherwise, return the resolved IP. If all selected DNS servers fail to query or <code>expectIPs</code> does not match, return an empty resolution.</li><li>If the number of &quot;DNS servers that have a default value of <code>false</code> for <code>skipFallback</code>&quot; is 0 or <code>disableFallback</code> is set to <code>true</code>, use the first DNS server in the DNS configuration to perform the query. If the query fails or <code>expectIPs</code> does not match, return an empty resolution; otherwise, return the resolved IP.</li></ul></li></ul><h2 id="dnsobject" tabindex="-1"><a class="header-anchor" href="#dnsobject" aria-hidden="true">#</a> DnsObject</h2><p><code>DnsObject</code> corresponds to the <code>dns</code> section in the configuration file.</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;dns&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;hosts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token property">&quot;baidu.com&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>\n      <span class="token property">&quot;dns.google&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;8.8.8.8&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;8.8.4.4&quot;</span><span class="token punctuation">]</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;servers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token string">&quot;8.8.8.8&quot;</span><span class="token punctuation">,</span>\n      <span class="token string">&quot;8.8.4.4&quot;</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.2.3.4&quot;</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">5353</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;domain:xray.com&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;expectIPs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geoip:cn&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;skipFallback&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;clientIP&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.2.3.4&quot;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://1.1.1.1/dns-query&quot;</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n          <span class="token string">&quot;geosite:netflix&quot;</span>\n        <span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;skipFallback&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;queryStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UseIPv4&quot;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://1.1.1.1/dns-query&quot;</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n          <span class="token string">&quot;geosite:openai&quot;</span>\n        <span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;skipFallback&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;queryStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UseIPv6&quot;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token string">&quot;localhost&quot;</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;clientIp&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.2.3.4&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;queryStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UseIP&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;disableCache&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;disableFallback&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;disableFallbackIfMatch&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dns_inbound&quot;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><blockquote><p><code>hosts</code>: map{string: address} | map{string: [address]}</p></blockquote><p>A list of static IP addresses, with values consisting of a series of &quot;domain&quot;: &quot;address&quot; or &quot;domain&quot;: [&quot;address 1&quot;,&quot;address 2&quot;]. The address can be an IP or a domain name. When resolving a domain name, if the domain name matches an item in this list:</p><ul><li>If the address of the item is an IP, the resolution result will be that IP.</li><li>If the address of the item is a domain name, this domain name will be used for IP resolution instead of the original domain name.</li><li>If multiple IPs and domain names are set in the address, only the first domain name will be returned, and the rest of the IPs and domain names will be ignored.</li></ul><p>The domain name can take several forms:</p><ul><li>Plain string: When this string matches the target domain name exactly, the rule takes effect. For example, &quot;xray.com&quot; matches &quot;xray.com&quot; but not &quot;www.xray.com&quot;.</li><li>Regular expression: Starting with <code>&quot;regexp:&quot;</code>, the rest is a regular expression. When this regular expression matches the target domain name, the rule takes effect. For example, &quot;regexp:\\\\.goo.*\\\\.com$&quot; matches &quot;www.google.com&quot; and &quot;fonts.googleapis.com&quot;, but not &quot;google.com&quot;.</li><li>Subdomain (recommended): Starting with <code>&quot;domain:&quot;</code>, the rest is a domain name. When this domain name is the target domain name or its subdomain, the rule takes effect. For example, &quot;domain:xray.com&quot; matches &quot;www.xray.com&quot; and &quot;xray.com&quot;, but not &quot;wxray.com&quot;.</li><li>Substring: Starting with <code>&quot;keyword:&quot;</code>, the rest is a string. When this string matches any part of the target domain name, the rule takes effect. For example, &quot;keyword:sina.com&quot; can match &quot;sina.com&quot;, &quot;sina.com.cn&quot;, and &quot;www.sina.com&quot;, but not &quot;sina.cn&quot;.</li><li>Predefined domain name list: Starting with <code>&quot;geosite:&quot;</code>, the rest is a name, such as <code>geosite:google</code> or <code>geosite:cn</code>. The names and domain name lists are listed in <a href="#predefined-domain-name-lists">Predefined Domain Name Lists</a>.</li></ul><blockquote><p><code>servers</code>: [string | <a href="#serverobject">ServerObject</a> ]</p></blockquote><p>A list of DNS servers that supports two types: DNS addresses (in string format) and <a href="#serverobject">ServerObject</a>.</p><p>When the value is <code>&quot;localhost&quot;</code>, it means to use the default DNS configuration on the local machine.</p><p>When the value is a DNS <code>&quot;IP:Port&quot;</code> address, such as <code>&quot;8.8.8.8:53&quot;</code>, Xray will use the specified UDP port of this address for DNS queries. The query follows the routing rules. When the port is not specified, the default port 53 is used.</p><p>When the value is in the form of <code>&quot;tcp://host:port&quot;</code>, such as <code>&quot;tcp://8.8.8.8:53&quot;</code>, Xray will use <code>DNS over TCP</code> for queries. The query follows the routing rules. When the port is not specified, the default port 53 is used.</p><p>When the value is in the form of <code>&quot;tcp+local://host:port&quot;</code>, such as <code>&quot;tcp+local://8.8.8.8:53&quot;</code>, Xray will use <code>TCP local mode (TCPL)</code> for queries. That is, DNS requests will not pass through the routing component and will directly request outbound through Freedom, to reduce latency. When the port is not specified, the default port 53 is used.</p><p>When the value is in the form of <code>&quot;https://host:port/dns-query&quot;</code>, such as <code>&quot;https://dns.google/dns-query&quot;</code>, Xray will use <code>DNS over HTTPS</code> (RFC8484, abbreviated as DOH) for queries. Some service providers have certificates with IP aliases, which can be directly written in IP form, such as <code>https://1.1.1.1/dns-query</code>. Non-standard ports and paths can also be used, such as <code>&quot;https://a.b.c.d:8443/my-dns-query&quot;</code>.</p><p>When the value is in the form of <code>&quot;https+local://host:port/dns-query&quot;</code>, such as <code>&quot;https+local://dns.google/dns-query&quot;</code>, Xray will use <code>DOH local mode (DOHL)</code> for queries. That is, DOH requests will not pass through the routing component and will directly request outbound through Freedom, to reduce latency. This is generally suitable for use on the server side. Non-standard ports and paths can also be used.</p><p>When the value is in the form of <code>&quot;quic+local://host&quot;</code>, such as <code>&quot;quic+local://dns.adguard.com&quot;</code>, Xray will use <code>DNS over QUIC local mode (DOQL)</code> for queries. That is, DNS requests will not pass through the routing component and will directly request outbound through Freedom. This method requires DNS server support for DNS over QUIC. The default port 784 is used for queries, and non-standard ports can also be used.</p><p>When the value is <code>fakedns</code>, the FakeDNS function will be used for queries.</p><div class="custom-container tip"><p class="custom-container-title">TIP 1</p><p>When using <code>localhost</code>, DNS requests on the local machine are not controlled by Xray and additional configuration is required to make DNS requests forwarded by Xray.</p></div><div class="custom-container tip"><p class="custom-container-title">TIP 2</p><p>DNS clients initialized with different rules will be reflected in the Xray startup log at the <code>info</code> level, such as <code>local DOH</code>, <code>remote DOH</code>, and <code>udp</code> modes.</p></div>',29),a={class:"custom-container tip"},r=(0,o._)("p",{class:"custom-container-title"},"TIP 3",-1),u=(0,o.Uk)("(v1.4.0+) DNS query logging can be enabled in the "),l=(0,o.Uk)("log"),i=(0,o.Uk)("."),c=(0,o.uE)('<blockquote><p><code>clientIp</code>: string</p></blockquote><p>Used to notify the server of the specified IP location during DNS queries. Cannot be a private address.</p><div class="custom-container tip"><p class="custom-container-title">TIP 1</p><p>EDNS Client Subnet support is required for the DNS server.</p></div><div class="custom-container tip"><p class="custom-container-title">TIP 2</p><p>You can specify <code>clientIp</code> for all DNS servers in <a href="#dnsobject">DnsObject</a>, or specify it for each DNS server in the configuration of <a href="#serverobject">ServerObject</a> (which has higher priority than the configuration in <a href="#dnsobject">DnsObject</a>).</p></div><blockquote><p><code>queryStrategy</code>: &quot;UseIP&quot; | &quot;UseIPv4&quot; | &quot;UseIPv6&quot;</p></blockquote><p><code>UseIPv4</code> only queries A records; <code>UseIPv6</code> only queries AAAA records. The default value is <code>UseIP</code>, which queries both A and AAAA records.</p><p>Xray-core v1.8.6 New feature: <code>queryStrategy</code> can be set separately for each <code>DNS</code> server.</p><div class="language-jsonc ext-jsonc line-numbers-mode"><pre class="language-jsonc"><code>    &quot;dns&quot;: {\n        &quot;servers&quot;: [\n            &quot;https://1.1.1.1/dns-query&quot;,\n            {\n                &quot;address&quot;: &quot;https://1.1.1.1/dns-query&quot;,\n                &quot;domains&quot;: [\n                    &quot;geosite:netflix&quot;\n                ],\n                &quot;skipFallback&quot;: true,\n                &quot;queryStrategy&quot;: &quot;UseIPv4&quot; // geosite:netflix&#39;s domain name uses &quot;UseIPv4&quot;\n            },\n            {\n                &quot;address&quot;: &quot;https://1.1.1.1/dns-query&quot;,\n                &quot;domains&quot;: [\n                    &quot;geosite:openai&quot;\n                ],\n                &quot;skipFallback&quot;: true,\n                &quot;queryStrategy&quot;: &quot;UseIPv6&quot; // The domain name geosite:openai uses &quot;UseIPv6&quot;.\n            }\n        ],\n        &quot;queryStrategy&quot;: &quot;UseIP&quot; // Global use of &quot;UseIP&quot;\n    }\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p><strong>NOTE：</strong><br> When the <code>&quot;queryStrategy&quot;</code> value in the child item conflicts with the global <code>&quot;queryStrategy&quot;</code> value, the query for the child item will respond null.</p><div class="language-jsonc ext-jsonc line-numbers-mode"><pre class="language-jsonc"><code>    &quot;dns&quot;: {\n        &quot;servers&quot;: [\n            &quot;https://1.1.1.1/dns-query&quot;,\n            {\n                &quot;address&quot;: &quot;https://8.8.8.8/dns-query&quot;,\n                &quot;domains&quot;: [\n                    &quot;geosite:netflix&quot;\n                ],\n                &quot;skipFallback&quot;: true,\n                &quot;queryStrategy&quot;: &quot;UseIPv6&quot; // &quot;UseIPv6&quot; conflicts with &quot;UseIPv4&quot;.\n            }\n        ],\n        &quot;queryStrategy&quot;: &quot;UseIPv4&quot;\n    }\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>Subterm geosite:netflix query gets null response due to conflicting <code>&quot;queryStrategy&quot;</code> values. geosite:netflix domain is queried by global DNS <code>https://1.1.1.1/dns-query</code> and gets A record.</p><blockquote><p><code>disableCache</code>: true | false</p></blockquote><p><code>true</code> disables DNS caching, default is <code>false</code> which means caching is not disabled.</p><blockquote><p><code>disableFallback</code>: true | false</p></blockquote><p><code>true</code> disables fallback DNS queries, default is <code>false</code> which means fallback queries are not disabled.</p><blockquote><p><code>disableFallbackIfMatch</code>: true | false</p></blockquote><p><code>true</code> disables fallback DNS queries when the matching domain list of the DNS server is hit, default is <code>false</code> which means fallback queries are not disabled.</p><blockquote><p><code>tag</code>: string</p></blockquote><p>Traffic generated by built-in DNS, except for <code>localhost</code>, <code>fakedns</code>, <code>TCPL</code>, <code>DOHL</code>, and <code>DOQL</code> modes, can be matched with <code>inboundTag</code> in routing using this identifier.</p><h3 id="serverobject" tabindex="-1"><a class="header-anchor" href="#serverobject" aria-hidden="true">#</a> ServerObject</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.2.3.4&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">5353</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;domain:xray.com&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;expectIPs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geoip:cn&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;skipFallback&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;clientIP&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.2.3.4&quot;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><blockquote><p><code>address</code>: address</p></blockquote><p>A list of DNS servers, which can be either DNS addresses (in string form) or ServerObjects.</p><p>When the value is <code>&quot;localhost&quot;</code>, it means using the local DNS configuration.</p><p>When the value is a DNS <code>&quot;IP&quot;</code> address, such as <code>&quot;8.8.8.8&quot;</code>, Xray will use the specified UDP port of this address for DNS queries. The query follows routing rules. By default, port 53 is used.</p><p>When the value is in the form of <code>&quot;tcp://host&quot;</code>, such as <code>&quot;tcp://8.8.8.8&quot;</code>, Xray will use <code>DNS over TCP</code> for the query. The query follows routing rules. By default, port 53 is used.</p><p>When the value is in the form of <code>&quot;tcp+local://host&quot;</code>, such as <code>&quot;tcp+local://8.8.8.8&quot;</code>, Xray will use <code>TCP local mode (TCPL)</code> for the query. That is, the DNS request will not go through the routing component and will be sent directly through the Freedom outbound to reduce latency. When no port is specified, port 53 is used by default.</p><p>When the value is in the form of <code>&quot;https://host:port/dns-query&quot;</code>, such as <code>&quot;https://dns.google/dns-query&quot;</code>, Xray will use <code>DNS over HTTPS</code> (RFC8484, abbreviated as DOH) for the query. Some service providers have IP alias certificates, which can be directly written in IP form, such as <code>https://1.1.1.1/dns-query</code>. Non-standard ports and paths can also be used, such as <code>&quot;https://a.b.c.d:8443/my-dns-query&quot;</code>.</p><p>When the value is in the form of <code>&quot;https+local://host:port/dns-query&quot;</code>, such as <code>&quot;https+local://dns.google/dns-query&quot;</code>, Xray will use <code>DOH local mode (DOHL)</code> for the query, which means that the DOH request will not go through the routing component and will be sent directly through the Freedom outbound to reduce latency. This is generally suitable for server-side use. Non-standard ports and paths can also be used.</p><p>When the value is in the form of <code>&quot;quic+local://host:port&quot;</code>, such as <code>&quot;quic+local://dns.adguard.com&quot;</code>, Xray will use <code>DOQ local mode (DOQL)</code> for the query, which means that the DNS request will not go through the routing component and will be sent directly through the Freedom outbound. This method requires DNS server support for DNS over QUIC. By default, port 784 is used for the query, and non-standard ports can be used.</p><p>When the value is <code>fakedns</code>, FakeDNS functionality will be used for the query.</p><blockquote><p><code>port</code>: number</p></blockquote><p>The port number of the DNS server, such as <code>53</code>. If not specified, the default is <code>53</code>. This item is not applicable when using DOH, DOHL, or DOQL modes, and non-standard ports should be specified in the URL.</p><blockquote><p><code>domains</code>: [string]</p></blockquote>',34),p=(0,o.Uk)("A list of domain names. The domain names in this list will be queried using this server first. The format of domain names is the same as in "),d=(0,o.Uk)("routing configuration"),h=(0,o.Uk)("."),q=(0,o._)("blockquote",null,[(0,o._)("p",null,[(0,o._)("code",null,"expectIPs"),(0,o.Uk)(": [string]")])],-1),m=(0,o.Uk)("A list of IP ranges in the same format as in "),b=(0,o.Uk)("routing configuration"),f=(0,o.Uk)("."),k=(0,o._)("p",null,[(0,o.Uk)("When this item is configured, Xray DNS will verify the returned IP addresses and only return addresses that are included in the "),(0,o._)("code",null,"expectIPs"),(0,o.Uk)(" list.")],-1),g=(0,o._)("p",null,"If this item is not configured, the IP address will be returned as is.",-1),y=(0,o._)("blockquote",null,[(0,o._)("p",null,[(0,o._)("code",null,"skipFallback"),(0,o.Uk)(": true | false")])],-1),v=(0,o._)("p",null,[(0,o._)("code",null,"true"),(0,o.Uk)(" means to skip this server when performing DNS fallback queries, and the default is "),(0,o._)("code",null,"false"),(0,o.Uk)(", which means not to skip.")],-1),S={render:function(e,s){const n=(0,o.up)("RouterLink");return(0,o.wg)(),(0,o.iD)(o.HY,null,[t,(0,o._)("div",a,[r,(0,o._)("p",null,[u,(0,o.Wm)(n,{to:"/en/config/log.html"},{default:(0,o.w5)((()=>[l])),_:1}),i])]),c,(0,o._)("p",null,[p,(0,o.Wm)(n,{to:"/en/config/routing.html#ruleobject"},{default:(0,o.w5)((()=>[d])),_:1}),h]),q,(0,o._)("p",null,[m,(0,o.Wm)(n,{to:"/en/config/routing.html#ruleobject"},{default:(0,o.w5)((()=>[b])),_:1}),f]),k,g,y,v],64)}}}}]);