"use strict";(self.webpackChunkXray_docs_next=self.webpackChunkXray_docs_next||[]).push([[4316],{34293:(n,a,s)=>{s.r(a),s.d(a,{data:()=>e});const e={key:"v-29188644",path:"/en/config/inbounds/trojan.html",title:"Trojan",lang:"en-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"InboundConfigurationObject",slug:"inboundconfigurationobject",children:[{level:3,title:"ClientObject",slug:"clientobject",children:[]}]}],filePathRelative:"en/config/inbounds/trojan.md",git:{updatedTime:1678161692e3,contributors:[{name:"yuhan6665",email:"1588741+yuhan6665@users.noreply.github.com",commits:4},{name:"hmol233",email:"82594500+hmol233@users.noreply.github.com",commits:1}]}}},50485:(n,a,s)=>{s.r(a),s.d(a,{default:()=>U});var e=s(66252);const t=(0,e._)("h1",{id:"trojan",tabindex:"-1"},[(0,e._)("a",{class:"header-anchor",href:"#trojan","aria-hidden":"true"},"#"),(0,e.Uk)(" Trojan")],-1),o={href:"https://trojan-gfw.github.io/trojan/protocol",target:"_blank",rel:"noopener noreferrer"},p=(0,e.Uk)("Trojan"),l=(0,e.Uk)(" 协议"),c=(0,e.uE)('<div class="custom-container danger"><p class="custom-container-title">DANGER</p><p>Trojan 被设计工作在正确配置的加密 TLS 隧道</p></div><h2 id="inboundconfigurationobject" tabindex="-1"><a class="header-anchor" href="#inboundconfigurationobject" aria-hidden="true">#</a> InboundConfigurationObject</h2><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;clients&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>\n      <span class="token property">&quot;password&quot;</span><span class="token operator">:</span> <span class="token string">&quot;password&quot;</span><span class="token punctuation">,</span>\n      <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token string">&quot;love@xray.com&quot;</span><span class="token punctuation">,</span>\n      <span class="token property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">0</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;fallbacks&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>\n      <span class="token property">&quot;dest&quot;</span><span class="token operator">:</span> <span class="token number">80</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><blockquote><p><code>clients</code>: [ <a href="#clientobject">ClientObject</a> ]</p></blockquote><p>一个数组，代表一组服务端认可的用户.</p><p>其中每一项是一个用户 <a href="#clientobject">ClientObject</a>。</p>',6),r=(0,e._)("code",null,"fallbacks",-1),u=(0,e.Uk)(": [ "),i=(0,e.Uk)("FallbackObject"),b=(0,e.Uk)(" ]"),k=(0,e.Uk)("一个数组，包含一系列强大的回落分流配置（可选）。 fallbacks 的具体配置请点击"),d=(0,e.Uk)("FallbackObject"),m=(0,e.uE)('<div class="custom-container tip"><p class="custom-container-title">TIP</p><p>Xray 的 Trojan 有完整的 fallbacks 支持，配置方式完全一致。 触发回落的条件也与 VLESS 类似：首包长度 &lt; 58 或第 57 个字节不为 <code>\\r</code>（因为 Trojan 没有协议版本）或身份认证失败。</p></div><h3 id="clientobject" tabindex="-1"><a class="header-anchor" href="#clientobject" aria-hidden="true">#</a> ClientObject</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;password&quot;</span><span class="token operator">:</span> <span class="token string">&quot;password&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token string">&quot;love@xray.com&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">0</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><blockquote><p><code>password</code>: string</p></blockquote><p>必填，任意字符串。</p><blockquote><p><code>email</code>: string</p></blockquote><p>邮件地址，可选，用于标识用户</p><div class="custom-container danger"><p class="custom-container-title">DANGER</p><p>如果存在多个 ClientObject, 请注意 email 不可以重复。</p></div><blockquote><p><code>level</code>: number</p></blockquote>',9),h=(0,e.Uk)("用户等级，连接会使用这个用户等级对应的 "),f=(0,e.Uk)("本地策略"),g=(0,e.Uk)("。"),j=(0,e.Uk)("userLevel 的值, 对应 "),q=(0,e.Uk)("policy"),v=(0,e.Uk)(" 中 "),y=(0,e._)("code",null,"level",-1),_=(0,e.Uk)(" 的值。 如不指定, 默认为 0。"),U={render:function(n,a){const s=(0,e.up)("OutboundLink"),U=(0,e.up)("RouterLink");return(0,e.wg)(),(0,e.iD)(e.HY,null,[t,(0,e._)("p",null,[(0,e._)("a",o,[p,(0,e.Wm)(s)]),l]),c,(0,e._)("blockquote",null,[(0,e._)("p",null,[r,u,(0,e.Wm)(U,{to:"/en/config/features/fallback.html"},{default:(0,e.w5)((()=>[i])),_:1}),b])]),(0,e._)("p",null,[k,(0,e.Wm)(U,{to:"/en/config/features/fallback.html#fallbacks-%E9%85%8D%E7%BD%AE"},{default:(0,e.w5)((()=>[d])),_:1})]),m,(0,e._)("p",null,[h,(0,e.Wm)(U,{to:"/en/config/policy.html#levelpolicyobject"},{default:(0,e.w5)((()=>[f])),_:1}),g]),(0,e._)("p",null,[j,(0,e.Wm)(U,{to:"/en/config/policy.html#policyobject"},{default:(0,e.w5)((()=>[q])),_:1}),v,y,_])],64)}}}}]);