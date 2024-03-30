import{_ as p,r as s,o as r,c as d,a as o,b as e,d as t,w as l,e as a}from"./app-FKQw5byO.js";const i={},u=a(`<h1 id="websocket" tabindex="-1"><a class="header-anchor" href="#websocket"><span>WebSocket</span></a></h1><p>使用标准的 WebSocket 来传输数据。</p><p>WebSocket 连接可以被其它 HTTP 服务器（如 Nginx）分流，也可以被 VLESS fallbacks path 分流。</p><div class="custom-container tip"><p class="custom-container-title">提示</p><p>Websocket 会识别 HTTP 请求的 X-Forwarded-For 头来覆写流量的源地址，优先级高于 PROXY protocol。</p></div><h2 id="websocketobject" tabindex="-1"><a class="header-anchor" href="#websocketobject"><span>WebSocketObject</span></a></h2><p><code>WebSocketObject</code> 对应传输配置的 <code>wsSettings</code> 项。</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;acceptProxyProtocol&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;host&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xray.com&quot;</span>
  <span class="token property">&quot;headers&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;host&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xray.com&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>acceptProxyProtocol</code>: true | false</p></blockquote><p>仅用于 inbound，指示是否接收 PROXY protocol。</p>`,9),k={href:"https://www.haproxy.org/download/2.2/doc/proxy-protocol.txt",target:"_blank",rel:"noopener noreferrer"},b=o("strong",null,"若你不了解它，请先忽略该项",-1),h=a('<p>常见的反代软件（如 HAProxy、Nginx）都可以配置发送它，VLESS fallbacks xver 也可以发送它。</p><p>填写 <code>true</code> 时，最底层 TCP 连接建立后，请求方必须先发送 PROXY protocol v1 或 v2，否则连接会被关闭。</p><blockquote><p><code>path</code>: string</p></blockquote><p>WebSocket 所使用的 HTTP 协议路径，默认值为 <code>&quot;/&quot;</code>。</p><p>如果客户端路径中包含 <code>ed</code> 参数(如 <code>/mypath?ed=2560</code>)，将会启用 <code>Early Data</code> 以降低延迟，在升级的同时使用 <code>Sec-WebSocket-Protocol</code> 头承载首包数据，其值为首包长度阈值。如果首包长度超过此值，就不会启用 <code>Early Data</code>。推荐值为 2560，最大值为8192，过大的值可能导致部分兼容问题，如果遇到兼容性问题，可以尝试调低阈值。</p><blockquote><p><code>host</code>: string</p></blockquote><p>WebSocket 的HTTP请求中所发送的host，默认值为空。若服务端值为空时，不验证客户端发送来的host值。</p><p>当在服务端指定该值，或在 <code>headers</code> 中指定host，将会校验与客户端请求host是否一致。</p><p>客户端选择发送的host优先级 <code>host</code> &gt; <code>headers</code> &gt; <code>address</code></p><blockquote><p><code>headers</code>: map {string: string}</p></blockquote><p>自定义 HTTP 头，一个键值对，每个键表示一个 HTTP 头的名称，对应的值是字符串。</p><p>默认值为空。</p><h2 id="browser-dialer" tabindex="-1"><a class="header-anchor" href="#browser-dialer"><span>Browser Dialer</span></a></h2>',13);function v(m,_){const n=s("ExternalLinkIcon"),c=s("RouterLink");return r(),d("div",null,[u,o("p",null,[o("a",k,[e("PROXY protocol"),t(n)]),e(" 专用于传递请求的真实来源 IP 和端口，"),b,e("。")]),h,o("p",null,[e("使用浏览器处理 TLS，详见 "),t(c,{to:"/config/features/browser_dialer.html"},{default:l(()=>[e("Browser Dialer")]),_:1})])])}const x=p(i,[["render",v],["__file","websocket.html.vue"]]);export{x as default};
