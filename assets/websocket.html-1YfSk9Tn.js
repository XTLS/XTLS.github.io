import{_ as c,r as o,o as i,c as d,a as t,b as e,d as a,w as l,e as s}from"./app-eE4giq9J.js";const p={},u=s(`<h1 id="websocket" tabindex="-1"><a class="header-anchor" href="#websocket" aria-hidden="true">#</a> WebSocket</h1><p>Use standard WebSocket to transmit data.</p><p>WebSocket connections can be peoxied by other HTTP servers (such as Nginx) or by VLESS fallbacks path.</p><div class="custom-container tip"><p class="custom-container-title">Tip</p><p>Websocket will recognize the X-Forwarded-For header of the HTTP request to override the source address of the traffic, with a higher priority than the PROXY protocol.</p></div><h2 id="websocketobject" tabindex="-1"><a class="header-anchor" href="#websocketobject" aria-hidden="true">#</a> WebSocketObject</h2><p><code>WebSocketObject</code> corresponds to the <code>wsSettings</code> item of the transport configuration.</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;acceptProxyProtocol&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;headers&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;Host&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xray.com&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>acceptProxyProtocol</code>: true | false</p></blockquote><p>Only used for inbound, indicating whether to accept the PROXY protocol.</p>`,9),h={href:"https://www.haproxy.org/download/2.2/doc/proxy-protocol.txt",target:"_blank",rel:"noopener noreferrer"},b=t("strong",null,"If you are not familiar with it, please ignore this item.",-1),k=s(`<p>Common reverse proxy software (such as HAProxy and Nginx) can be configured to send it, and VLESS fallbacks xver can also send it.</p><p>When filled in as <code>true</code>, after the underlying TCP connection is established, the requesting party must first send PROXY protocol v1 or v2, otherwise the connection will be closed.</p><blockquote><p><code>path</code>: string</p></blockquote><p>The HTTP protocol path used by WebSocket. Default is <code>&quot;/&quot;</code></p><p>If the path contains the <code>ed</code> parameter, <code>Early Data</code> will be enabled to reduce latency, and its value is the first packet length threshold. If the length of the first packet exceeds this value, <code>Early Data</code> will not be enabled. The recommended value is 2048.</p><p>An example usage of <code>ed</code> parameter:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;path&quot;: &quot;/aabbcc&quot; //original path

&quot;path&quot;: &quot;/aabbcc?ed=2048&quot; //added ed parameter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">Warning</p><p><code>Early Data</code> uses the <code>Sec-WebSocket-Protocol</code> header to carry data. If you encounter compatibility issues, try lowering the threshold.</p></div><blockquote><p><code>headers</code>: map {string: string}</p></blockquote><p>Custom HTTP headers, a key-value pair, where each key represents the name of an HTTP header, and the corresponding value is a string.</p><p>The default value is empty.</p><h2 id="browser-dialer" tabindex="-1"><a class="header-anchor" href="#browser-dialer" aria-hidden="true">#</a> Browser Dialer</h2>`,12);function m(v,f){const n=o("ExternalLinkIcon"),r=o("RouterLink");return i(),d("div",null,[u,t("p",null,[e("The "),t("a",h,[e("PROXY protocol"),a(n)]),e(" is used to transmit the real source IP and port of the request. "),b]),k,t("p",null,[e("Use the browser to handle TLS, see "),a(r,{to:"/en/config/features/browser_dialer.html"},{default:l(()=>[e("Browser Dialer")]),_:1})])])}const w=c(p,[["render",m],["__file","websocket.html.vue"]]);export{w as default};
