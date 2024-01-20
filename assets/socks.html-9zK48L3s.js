import{_ as t,r as p,o as c,c as l,a as n,b as s,d as e,w as o,e as r}from"./app-eE4giq9J.js";const u={},i=r(`<h1 id="socks" tabindex="-1"><a class="header-anchor" href="#socks" aria-hidden="true">#</a> Socks</h1><p>标准 Socks 协议实现，兼容 Socks 5。</p><div class="custom-container danger"><p class="custom-container-title">警告</p><p><strong>Socks 协议没有对传输加密，不适宜经公网中传输</strong></p></div><h2 id="outboundconfigurationobject" tabindex="-1"><a class="header-anchor" href="#outboundconfigurationobject" aria-hidden="true">#</a> OutboundConfigurationObject</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;servers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">1234</span><span class="token punctuation">,</span>
      <span class="token property">&quot;users&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;user&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test user&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;pass&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test pass&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>servers</code>: [ <a href="#serverobject">ServerObject</a> ]</p></blockquote><p>Socks 服务器列表，其中每一项是一个服务器配置。</p><h3 id="serverobject" tabindex="-1"><a class="header-anchor" href="#serverobject" aria-hidden="true">#</a> ServerObject</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">1234</span><span class="token punctuation">,</span>
  <span class="token property">&quot;users&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;user&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test user&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;pass&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test pass&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>address</code>: address</p></blockquote><p>服务器地址, 必填</p><div class="custom-container tip"><p class="custom-container-title">提示</p><p>仅支持连接到 Socks 5 服务器。</p></div><blockquote><p><code>port</code>: number</p></blockquote><p>服务器端口, 必填</p><blockquote><p><code>users</code>: [ <a href="#userobject">UserObject</a> ]</p></blockquote><p>一个数组表示的用户列表，数组中每个元素为一个用户配置。</p><p>当列表不为空时，Socks 客户端会使用用户信息进行认证；如未指定，则不进行认证。</p><p>默认值为空。</p><h4 id="userobject" tabindex="-1"><a class="header-anchor" href="#userobject" aria-hidden="true">#</a> UserObject</h4><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;user&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test user&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;pass&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test pass&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>user</code>: string</p></blockquote><p>用户名，字符串类型。必填。</p><blockquote><p><code>pass</code>: string</p></blockquote><p>密码，字符串类型。必填。</p><blockquote><p><code>level</code>: number</p></blockquote>`,25),d=n("code",null,"level",-1);function k(v,b){const a=p("RouterLink");return c(),l("div",null,[i,n("p",null,[s("用户等级，连接会使用这个用户等级对应的 "),e(a,{to:"/config/policy.html#levelpolicyobject"},{default:o(()=>[s("本地策略")]),_:1}),s("。")]),n("p",null,[s("userLevel 的值, 对应 "),e(a,{to:"/config/policy.html#policyobject"},{default:o(()=>[s("policy")]),_:1}),s(" 中 "),d,s(" 的值。 如不指定, 默认为 0。")])])}const m=t(u,[["render",k],["__file","socks.html.vue"]]);export{m as default};
