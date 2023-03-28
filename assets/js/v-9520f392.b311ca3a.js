"use strict";(self.webpackChunkXray_docs_next=self.webpackChunkXray_docs_next||[]).push([[7322],{15212:(e,t,a)=>{a.r(t),a.d(t,{data:()=>o});const o={key:"v-9520f392",path:"/en/config/transports/websocket.html",title:"WebSocket",lang:"en-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"WebSocketObject",slug:"websocketobject",children:[]},{level:2,title:"Browser Dialer",slug:"browser-dialer",children:[]}],filePathRelative:"en/config/transports/websocket.md",git:{updatedTime:1679971439e3,contributors:[{name:"hmol233",email:"82594500+hmol233@users.noreply.github.com",commits:1},{name:"picklefan",email:"34882095+picklefan@users.noreply.github.com",commits:1},{name:"yuhan6665",email:"1588741+yuhan6665@users.noreply.github.com",commits:1}]}}},60091:(e,t,a)=>{a.r(t),a.d(t,{default:()=>h});var o=a(66252);const s=(0,o.uE)('<h1 id="websocket" tabindex="-1"><a class="header-anchor" href="#websocket" aria-hidden="true">#</a> WebSocket</h1><p>Use standard WebSocket to transmit data.</p><p>WebSocket connections can be peoxied by other HTTP servers (such as Nginx) or by VLESS fallbacks path.</p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>Websocket will recognize the X-Forwarded-For header of the HTTP request to override the source address of the traffic, with a higher priority than the PROXY protocol.</p></div><h2 id="websocketobject" tabindex="-1"><a class="header-anchor" href="#websocketobject" aria-hidden="true">#</a> WebSocketObject</h2><p><code>WebSocketObject</code> corresponds to the <code>wsSettings</code> item of the transport configuration.</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;acceptProxyProtocol&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;headers&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;Host&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xray.com&quot;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><blockquote><p><code>acceptProxyProtocol</code>: true | false</p></blockquote><p>Only used for inbound, indicating whether to accept the PROXY protocol.</p>',9),n=(0,o.Uk)("The "),r={href:"https://www.haproxy.org/download/2.2/doc/proxy-protocol.txt",target:"_blank",rel:"noopener noreferrer"},c=(0,o.Uk)("PROXY protocol"),l=(0,o.Uk)(" is used to transmit the real source IP and port of the request. "),p=(0,o._)("strong",null,"If you are not familiar with it, please ignore this item.",-1),i=(0,o.uE)('<p>Common reverse proxy software (such as HAProxy and Nginx) can be configured to send it, and VLESS fallbacks xver can also send it.</p><p>When filled in as <code>true</code>, after the underlying TCP connection is established, the requesting party must first send PROXY protocol v1 or v2, otherwise the connection will be closed.</p><blockquote><p><code>path</code> string</p></blockquote><p>The HTTP protocol path used by WebSocket. Default is <code>&quot;/&quot;</code></p><p>If the path contains the <code>ed</code> parameter, <code>Early Data</code> will be enabled to reduce latency, and its value is the first packet length threshold. If the length of the first packet exceeds this value, <code>Early Data</code> will not be enabled. The recommended value is 2048.</p><p>An example usage of <code>ed</code> parameter:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&quot;path&quot;: &quot;/aabbcc&quot; //original path\n\n&quot;path&quot;: &quot;/aabbcc?ed=2048&quot; //added ed parameter\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p><code>Early Data</code> uses the <code>Sec-WebSocket-Protocol</code> header to carry data. If you encounter compatibility issues, try lowering the threshold.</p></div><blockquote><p><code>headers</code>: map {string: string}</p></blockquote><p>Custom HTTP headers, a key-value pair, where each key represents the name of an HTTP header, and the corresponding value is a string.</p><p>The default value is empty.</p><h2 id="browser-dialer" tabindex="-1"><a class="header-anchor" href="#browser-dialer" aria-hidden="true">#</a> Browser Dialer</h2>',12),d=(0,o.Uk)("Use the browser to handle TLS, see "),u=(0,o.Uk)("Browser Dialer"),h={render:function(e,t){const a=(0,o.up)("OutboundLink"),h=(0,o.up)("RouterLink");return(0,o.wg)(),(0,o.iD)(o.HY,null,[s,(0,o._)("p",null,[n,(0,o._)("a",r,[c,(0,o.Wm)(a)]),l,p]),i,(0,o._)("p",null,[d,(0,o.Wm)(h,{to:"/en/config/features/browser_dialer.html"},{default:(0,o.w5)((()=>[u])),_:1})])],64)}}}}]);