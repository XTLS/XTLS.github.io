import{_ as n,o as s,c as a,e as t}from"./app-W-qqyeeY.js";const o={},p=t(`<h1 id="loopback" tabindex="-1"><a class="header-anchor" href="#loopback"><span>Loopback</span></a></h1><p>Loopback 是个出站数据协议，其作用为将经该出站传出的数据重新送入路由入站，以达到数据无需离开 Xray-core 即可再次被路由处理的效果。</p><h2 id="outboundconfigurationobject" tabindex="-1"><a class="header-anchor" href="#outboundconfigurationobject"><span>OutboundConfigurationObject</span></a></h2><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;TagUseAsInbound&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>inboundTag</code>: string</p></blockquote><p>用于重新路由的入站协议标识。</p><p>该标识可以在路由中用于 <code>inboundTag</code> ，表示该出站中的数据可以被对应的路由规则再次处理。</p><h3 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用"><span>如何使用？</span></a></h3><p>如果需要将已经通过路由规则分流过的流量再由其它路由规则做更细致的分流，比如由同一组路由规则分流后的 TCP 流量和 UDP 要走不同的出站，则可以使用 <code>loopback</code> 出站完成。</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;outbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;loopback&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;need-to-split&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;traffic-input&quot;</span> <span class="token comment">// 该 tag 在下方用于 RuleObject 的 inboundTag</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp-output&quot;</span><span class="token punctuation">,</span>
      <span class="token comment">// protocol, settings, streamSettings 之类的设置</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;udp-output&quot;</span><span class="token punctuation">,</span>
      <span class="token comment">// protocol, settings, streamSettings 之类的设置</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;routing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;traffic-input&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// loopback 设定的 tag</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp-output&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;traffic-input&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// loopback 设定的 tag</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;udp&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;udp-output&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),e=[p];function c(u,i){return s(),a("div",null,e)}const r=n(o,[["render",c],["__file","loopback.html.vue"]]);export{r as default};
