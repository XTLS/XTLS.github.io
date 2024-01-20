import{_ as t,r as s,o as a,c,a as n,b as e,d as i,w as l,e as d}from"./app-eE4giq9J.js";const r={},p=n("h1",{id:"blackhole",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#blackhole","aria-hidden":"true"},"#"),e(" Blackhole")],-1),u=d(`<h2 id="outboundconfigurationobject" tabindex="-1"><a class="header-anchor" href="#outboundconfigurationobject" aria-hidden="true">#</a> OutboundConfigurationObject</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;response&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>response</code>: <a href="#responseobject">ResponseObject</a></p></blockquote><p>Configures the response data for the blackhole.</p><p>After receiving the data to be forwarded, the blackhole will send the specified response data and then close the connection. The data to be forwarded will be discarded. If this field is not specified, the blackhole will simply close the connection.</p><h3 id="responseobject" tabindex="-1"><a class="header-anchor" href="#responseobject" aria-hidden="true">#</a> ResponseObject</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>type</code>: &quot;http&quot; | &quot;none&quot;</p></blockquote><p>When <code>type</code> is set to <code>&quot;none&quot;</code> (default value), the blackhole will simply close the connection.</p><p>When <code>type</code> is set to <code>&quot;http&quot;</code>, the blackhole will send a simple HTTP 403 packet as the response and then close the connection.</p>`,10);function h(b,k){const o=s("RouterLink");return a(),c("div",null,[p,n("p",null,[e("Blackhole is an outbound data protocol that blocks all outbound data. When used in conjunction with "),i(o,{to:"/en/config/routing.html"},{default:l(()=>[e("routing configurations")]),_:1}),e(", it can be used to block access to certain websites.")]),u])}const f=t(r,[["render",h],["__file","blackhole.html.vue"]]);export{f as default};
