import{_ as r,r as o,o as c,c as l,a as s,b as n,d as a,w as t,e as i}from"./app-JqiKuxQm.js";const u={},d=s("h1",{id:"trojan",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#trojan","aria-hidden":"true"},"#"),n(" Trojan")],-1),v={href:"https://trojan-gfw.github.io/trojan/protocol",target:"_blank",rel:"noopener noreferrer"},k=i(`<div class="custom-container danger"><p class="custom-container-title">警告</p><p>Trojan 被设计工作在正确配置的加密 TLS 隧道</p></div><h2 id="outboundconfigurationobject" tabindex="-1"><a class="header-anchor" href="#outboundconfigurationobject" aria-hidden="true">#</a> OutboundConfigurationObject</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;servers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">1234</span><span class="token punctuation">,</span>
      <span class="token property">&quot;password&quot;</span><span class="token operator">:</span> <span class="token string">&quot;password&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token string">&quot;love@xray.com&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>servers</code>: [ <a href="#serverobject">ServerObject</a> ]</p></blockquote><p>一个数组，其中每一项是一个 <a href="#serverobject">ServerObject</a>。</p><h3 id="serverobject" tabindex="-1"><a class="header-anchor" href="#serverobject" aria-hidden="true">#</a> ServerObject</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">1234</span><span class="token punctuation">,</span>
  <span class="token property">&quot;password&quot;</span><span class="token operator">:</span> <span class="token string">&quot;password&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token string">&quot;love@xray.com&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>address</code>: address</p></blockquote><p>服务端地址，支持 IPv4、IPv6 和域名。必填。</p><blockquote><p><code>port</code>: number</p></blockquote><p>服务端端口，通常与服务端监听的端口相同。</p><blockquote><p><code>password</code>: string</p></blockquote><p>密码. 必填，任意字符串。</p><blockquote><p><code>email</code>: string</p></blockquote><p>邮件地址，可选，用于标识用户</p><blockquote><p><code>level</code>: number</p></blockquote>`,16),b=s("code",null,"level",-1);function m(q,h){const p=o("ExternalLinkIcon"),e=o("RouterLink");return c(),l("div",null,[d,s("p",null,[s("a",v,[n("Trojan"),a(p)]),n(" 协议")]),k,s("p",null,[n("用户等级，连接会使用这个用户等级对应的 "),a(e,{to:"/config/policy.html#levelpolicyobject"},{default:t(()=>[n("本地策略")]),_:1}),n("。")]),s("p",null,[n("level 的值, 对应 "),a(e,{to:"/config/policy.html#policyobject"},{default:t(()=>[n("policy")]),_:1}),n(" 中 "),b,n(" 的值。 如不指定, 默认为 0。")])])}const _=r(u,[["render",m],["__file","trojan.html.vue"]]);export{_ as default};