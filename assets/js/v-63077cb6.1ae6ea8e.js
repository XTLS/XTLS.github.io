"use strict";(self.webpackChunkXray_docs_next=self.webpackChunkXray_docs_next||[]).push([[9685],{192:(s,n,a)=>{a.r(n),a.d(n,{data:()=>o});const o={key:"v-63077cb6",path:"/en/config/outbounds/shadowsocks.html",title:"Shadowsocks",lang:"en-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"OutboundConfigurationObject",slug:"outboundconfigurationobject",children:[{level:3,title:"ServerObject",slug:"serverobject",children:[]}]}],filePathRelative:"en/config/outbounds/shadowsocks.md",git:{updatedTime:1622027153e3,contributors:[{name:"hmol233",email:"82594500+hmol233@users.noreply.github.com",commits:1}]}}},2510:(s,n,a)=>{a.r(n),a.d(n,{default:()=>g});var o=a(6252);const e=(0,o._)("h1",{id:"shadowsocks",tabindex:"-1"},[(0,o._)("a",{class:"header-anchor",href:"#shadowsocks","aria-hidden":"true"},"#"),(0,o.Uk)(" Shadowsocks")],-1),p={href:"https://zh.wikipedia.org/wiki/Shadowsocks",target:"_blank",rel:"noopener noreferrer"},t=(0,o.Uk)("Shadowsocks"),l=(0,o.Uk)(" 协议，兼容大部分其它版本的实现。"),r=(0,o.uE)('<p>目前兼容性如下：</p><ul><li><p>支持 TCP 和 UDP 数据包转发，其中 UDP 可选择性关闭；</p></li><li><p>推荐的加密方式：</p><ul><li>AES-256-GCM</li><li>AES-128-GCM</li><li>ChaCha20-Poly1305 或称 ChaCha20-IETF-Poly1305</li><li>none 或 plain</li></ul><p>不推荐的加密方式:</p><ul><li>AES-256-CFB</li><li>AES-128-CFB</li><li>ChaCha20</li><li>ChaCha20-IETF</li></ul></li></ul><div class="custom-container danger"><p class="custom-container-title">DANGER</p><p>&quot;none&quot; 不加密方式下，服务器端不会验证 &quot;password&quot; 中的密码。为确保安全性, 一般需要加上 TLS 并在传输层使用安全配置，例如 WebSocket 配置较长的 path</p></div><h2 id="outboundconfigurationobject" tabindex="-1"><a class="header-anchor" href="#outboundconfigurationobject" aria-hidden="true">#</a> OutboundConfigurationObject</h2><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;servers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>\n      <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token string">&quot;love@xray.com&quot;</span><span class="token punctuation">,</span>\n      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>\n      <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">1234</span><span class="token punctuation">,</span>\n      <span class="token property">&quot;method&quot;</span><span class="token operator">:</span> <span class="token string">&quot;加密方式&quot;</span><span class="token punctuation">,</span>\n      <span class="token property">&quot;password&quot;</span><span class="token operator">:</span> <span class="token string">&quot;密码&quot;</span><span class="token punctuation">,</span>\n      <span class="token property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">0</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><blockquote><p><code>servers</code>: [<a href="#serverobject">ServerObject</a>]</p></blockquote><p>一个数组，代表一组 Shadowsocks 服务端设置, 其中每一项是一个 <a href="#serverobject">ServerObject</a>。</p><h3 id="serverobject" tabindex="-1"><a class="header-anchor" href="#serverobject" aria-hidden="true">#</a> ServerObject</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token string">&quot;love@xray.com&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">1234</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;method&quot;</span><span class="token operator">:</span> <span class="token string">&quot;加密方式&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;password&quot;</span><span class="token operator">:</span> <span class="token string">&quot;密码&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">0</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><blockquote><p><code>email</code>: string</p></blockquote><p>邮件地址，可选，用于标识用户</p><blockquote><p><code>address</code>: address</p></blockquote><p>Shadowsocks 服务端地址，支持 IPv4、IPv6 和域名。必填。</p><blockquote><p><code>port</code>: number</p></blockquote><p>Shadowsocks 服务端端口。必填。</p><blockquote><p><code>method</code>: string</p></blockquote><p>必填。</p><ul><li>推荐的加密方式： <ul><li>AES-256-GCM</li><li>AES-128-GCM</li><li>ChaCha20-Poly1305 或称 ChaCha20-IETF-Poly1305</li><li>none 或 plain</li></ul></li></ul><blockquote><p><code>password</code>: string</p></blockquote><p>必填。任意字符串。</p><p>Shadowsocks 协议不限制密码长度，但短密码会更可能被破解，建议使用 16 字符或更长的密码。</p><blockquote><p><code>level</code>: number</p></blockquote>',22),c=(0,o.Uk)("用户等级，连接会使用这个用户等级对应的 "),u=(0,o.Uk)("本地策略"),i=(0,o.Uk)("。"),k=(0,o._)("code",null,"level",-1),d=(0,o.Uk)(" 的值, 对应 "),b=(0,o.Uk)("policy"),h=(0,o.Uk)(" 中 "),q=(0,o._)("code",null,"level",-1),m=(0,o.Uk)(" 的值。 如不指定, 默认为 0。"),g={render:function(s,n){const a=(0,o.up)("OutboundLink"),g=(0,o.up)("RouterLink");return(0,o.wg)(),(0,o.iD)(o.HY,null,[e,(0,o._)("p",null,[(0,o._)("a",p,[t,(0,o.Wm)(a)]),l]),r,(0,o._)("p",null,[c,(0,o.Wm)(g,{to:"/en/config/policy.html#levelpolicyobject"},{default:(0,o.w5)((()=>[u])),_:1}),i]),(0,o._)("p",null,[k,d,(0,o.Wm)(g,{to:"/en/config/policy.html#policyobject"},{default:(0,o.w5)((()=>[b])),_:1}),h,q,m])],64)}}}}]);