"use strict";(self.webpackChunkXray_docs_next=self.webpackChunkXray_docs_next||[]).push([[8169],{52640:(n,s,a)=>{a.r(s),a.d(s,{data:()=>e});const e={key:"v-5254cbc6",path:"/en/config/transports/tcp.html",title:"TCP",lang:"en-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"TcpObject",slug:"tcpobject",children:[{level:3,title:"NoneHeaderObject",slug:"noneheaderobject",children:[]},{level:3,title:"HttpHeaderObject",slug:"httpheaderobject",children:[]}]}],filePathRelative:"en/config/transports/tcp.md",git:{updatedTime:1679971439e3,contributors:[{name:"hmol233",email:"82594500+hmol233@users.noreply.github.com",commits:1},{name:"picklefan",email:"34882095+picklefan@users.noreply.github.com",commits:1}]}}},9772:(n,s,a)=>{a.r(s),a.d(s,{default:()=>i});var e=a(66252);const t=(0,e.uE)('<h1 id="tcp" tabindex="-1"><a class="header-anchor" href="#tcp" aria-hidden="true">#</a> TCP</h1><p>TCP (Transmission Control Protocol) is currently one of the recommended transport protocols</p><p>It can be combined with various protocols in multiple ways.</p><h2 id="tcpobject" tabindex="-1"><a class="header-anchor" href="#tcpobject" aria-hidden="true">#</a> TcpObject</h2><p><code>TcpObject</code> corresponds to the <code>tcpSettings</code> item in the Transport Protocol.</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;acceptProxyProtocol&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;header&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><blockquote><p><code>acceptProxyProtocol</code>: true | false</p></blockquote><p>Only used for inbound, indicating whether to accept the PROXY protocol.</p>',8),o=(0,e.Uk)("The "),p={href:"https://www.haproxy.org/download/2.2/doc/proxy-protocol.txt",target:"_blank",rel:"noopener noreferrer"},c=(0,e.Uk)("PROXY protocol"),r=(0,e.Uk)(" is used to transmit the real source IP and port of the request. "),l=(0,e._)("strong",null,"If you are not familiar with it, please ignore this item.",-1),u=(0,e.uE)('<p>Common reverse proxy software (such as HAProxy and Nginx) can be configured to send it, and VLESS fallbacks xver can also send it.</p><p>When filled in as <code>true</code>, after the underlying TCP connection is established, the requesting party must first send PROXY protocol v1 or v2, otherwise the connection will be closed.</p><p>The default value is <code>false</code></p><blockquote><p><code>header</code>: <a href="#noneheaderobject">NoneHeaderObject</a> | <a href="#httpheaderobject">HttpHeaderobject</a></p></blockquote><p>Packet header obfuscation settings, the default value is <code>NoneHeaderObject</code></p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>HTTP obfuscation cannot be proxied by other HTTP servers (such as Nginx), but it can be proxied by VLESS fallbacks path.</p></div><h3 id="noneheaderobject" tabindex="-1"><a class="header-anchor" href="#noneheaderobject" aria-hidden="true">#</a> NoneHeaderObject</h3><p>No header obfuscation</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><blockquote><p><code>type</code>: &quot;none&quot;</p></blockquote><p>Disable header obfuscation.</p><h3 id="httpheaderobject" tabindex="-1"><a class="header-anchor" href="#httpheaderobject" aria-hidden="true">#</a> HttpHeaderObject</h3><p>HTTP header obfuscation. The configuration must be the same between connecting inbound and outbound.</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;http&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;request&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;response&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><blockquote><p><code>type</code>: &quot;http&quot;</p></blockquote><p>Enable HTTP header obfuscation.</p><blockquote><p><code>request</code>: <a href="#httprequestobject">HTTPRequestObject</a></p></blockquote><p>HTTP request template.</p><blockquote><p><code>response</code>: <a href="#httpresponseobject">HTTPResponseObject</a></p></blockquote><p>HTTP response template.</p><h4 id="httprequestobject" tabindex="-1"><a class="header-anchor" href="#httprequestobject" aria-hidden="true">#</a> HTTPRequestObject</h4><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.1&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;method&quot;</span><span class="token operator">:</span> <span class="token string">&quot;GET&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;headers&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;Host&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;www.baidu.com&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;www.bing.com&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;User-Agent&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token string">&quot;Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36&quot;</span><span class="token punctuation">,</span>\n      <span class="token string">&quot;Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_2 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/53.0.2785.109 Mobile/14A456 Safari/601.1.46&quot;</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;Accept-Encoding&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;gzip, deflate&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;Connection&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;keep-alive&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;Pragma&quot;</span><span class="token operator">:</span> <span class="token string">&quot;no-cache&quot;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><blockquote><p><code>version</code>: string</p></blockquote><p>HTTP version, the default value is <code>&quot;1.1&quot;</code></p><blockquote><p><code>method</code>: string</p></blockquote><p>The HTTP method, the default value is <code>&quot;GET&quot;</code></p><blockquote><p><code>path</code>: [ string ]</p></blockquote><p>paths, an array of strings. The default value is <code>[&quot;/&quot;]</code>. When there are multiple values, a value is chosen randomly for each request.</p><blockquote><p><code>headers</code>: map{ string, [ string ]}</p></blockquote><p>HTTP header, a key-value pair, each key represents the name of an HTTP header, and the corresponding value is an array.</p><p>Each request will include all the keys and randomly select a corresponding value. Please refer to the <strong>default values</strong> shown in the example above.</p><h4 id="httpresponseobject" tabindex="-1"><a class="header-anchor" href="#httpresponseobject" aria-hidden="true">#</a> HTTPResponseObject</h4><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.1&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;status&quot;</span><span class="token operator">:</span> <span class="token string">&quot;200&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;reason&quot;</span><span class="token operator">:</span> <span class="token string">&quot;OK&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;headers&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;Content-Type&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;application/octet-stream&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;video/mpeg&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;Transfer-Encoding&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;chunked&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;Connection&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;keep-alive&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;Pragma&quot;</span><span class="token operator">:</span> <span class="token string">&quot;no-cache&quot;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><blockquote><p><code>version</code>: string</p></blockquote><p>HTTP version, default is <code>&quot;1.1&quot;</code></p><blockquote><p><code>status</code>: string</p></blockquote><p>HTTP status, default is <code>&quot;200&quot;</code></p><blockquote><p><code>reason</code>: string</p></blockquote><p>HTTP status description, default value is <code>&quot;OK&quot;</code></p><blockquote><p><code>headers</code>: map {string, [ string ]}</p></blockquote><p>HTTP header, a key-value pair, each key represents the name of an HTTP header, and the corresponding value is an array.</p><p>Each request will include all the keys and randomly select a corresponding value. Please refer to the <strong>default values</strong> shown in the example above.</p>',42),i={render:function(n,s){const a=(0,e.up)("OutboundLink");return(0,e.wg)(),(0,e.iD)(e.HY,null,[t,(0,e._)("p",null,[o,(0,e._)("a",p,[c,(0,e.Wm)(a)]),r,l]),u],64)}}}}]);