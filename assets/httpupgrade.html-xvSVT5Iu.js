import{_ as s,r as a,o as r,c as p,a as t,b as e,d as c,e as o}from"./app-W-qqyeeY.js";const d={},i=o(`<h1 id="httpupgrade" tabindex="-1"><a class="header-anchor" href="#httpupgrade"><span>HTTPUpgrade</span></a></h1><p>A WebSocket-like transport protocol implementing the HTTP/1.1 upgrade and response, allowing it to be reverse proxied by web servers or CDNs just like WebSocket, but without the need to implement the remaining portions of the WebSocket protocol, yielding better performance.</p><p>Standalone usage is not recommended, but rather in conjunction with other security protocols like TLS.</p><h2 id="httpupgradeobject" tabindex="-1"><a class="header-anchor" href="#httpupgradeobject"><span>HttpUpgradeObject</span></a></h2><p>The <code>HttpUpgradeObject</code> corresponds to the <code>httpupgradeSettings</code> section under transport configurations.</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;acceptProxyProtocol&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;host&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xray.com&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;headers&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  	<span class="token property">&quot;key&quot;</span><span class="token operator">:</span> <span class="token string">&quot;value&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>acceptProxyProtocol</code>: true | false</p></blockquote><p>For inbounds only. Specifies whether to accept the PROXY protocol.</p>`,8),l={href:"https://www.haproxy.org/download/2.2/doc/proxy-protocol.txt",target:"_blank",rel:"noopener noreferrer"},u=t("strong",null,"Ignore it if you have no knowledge regarding this",-1),h=o("<p>Common reverse proxies (e.g. HAProxy, NGINX) and VLESS fallbacks xver can be configured for its inclusion.</p><p>When <code>true</code>, the downstream must first send PROXY protocol version 1 or 2 after establishing the underlying TCP connection, or the connection will be closed.</p><blockquote><p><code>path</code>: string</p></blockquote><p>HTTP path used by the HTTPUpgrade connection. Defaults to <code>&quot;/&quot;</code>.</p><p>If the <code>path</code> property include an <code>ed</code> query field (e.g. <code>/mypath?ed=2560</code>), &quot;early data&quot; will be used to decrease latency, with the value defining the threshold of the first packet&#39;s size. If the size of the first packet exceeds the defined value, &quot;early data&quot; will not be applied. The recommended value is <code>2560</code>.</p><blockquote><p><code>host</code>: string</p></blockquote><p>HTTP Host sent by the HTTPUpgrade connection. Empty by default. If this value is empty on the server, the host header sent by clients will not be validated.</p><p>If the <code>Host</code> header has been defined on the server in any way, the server will validate if the <code>Host</code> header matches.</p><p>The current priority of the <code>Host</code> header sent by clients: <code>host</code> &gt; <code>headers</code> &gt; <code>address</code></p><blockquote><p><code>headers</code>: map {string: string}</p></blockquote><p>Customized HTTP headers defined in key-value pairs. Defaults to empty.</p>",11);function b(g,k){const n=a("ExternalLinkIcon");return r(),p("div",null,[i,t("p",null,[e("The "),t("a",l,[e("PROXY protocol"),c(n)]),e(" is used to pass the real IP address and port of a connection along. "),u,e(".")]),h])}const m=s(d,[["render",b],["__file","httpupgrade.html.vue"]]);export{m as default};
