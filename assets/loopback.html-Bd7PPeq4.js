import{_ as s,r as a,o as t,c as o,a as p,e}from"./app-Dvqlold4.js";const c={},u=e(`<h1 id="loopback" tabindex="-1"><a class="header-anchor" href="#loopback"><span>Loopback</span></a></h1><p>Loopback - это исходящий протокол данных, который перенаправляет данные, прошедшие через это исходящее соединение, обратно на вход маршрутизатора, что позволяет повторно обработать данные по правилам маршрутизации, не покидая Xray-core.</p><h2 id="outboundconfigurationobject" tabindex="-1"><a class="header-anchor" href="#outboundconfigurationobject"><span>OutboundConfigurationObject</span></a></h2><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;TagUseAsInbound&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>inboundTag</code>: string</p></blockquote><p>Идентификатор входящего протокола, используемый для повторной маршрутизации.</p><p>Этот идентификатор может использоваться в маршрутизации для <code>inboundTag</code>, указывая, что данные из этого исходящего соединения могут быть повторно обработаны соответствующими правилами маршрутизации.</p><h3 id="как-использовать" tabindex="-1"><a class="header-anchor" href="#как-использовать"><span>Как использовать?</span></a></h3><p>Если необходимо, чтобы трафик, уже разделенный по правилам маршрутизации, был перенаправлен другими правилами маршрутизации (например, трафик TCP и UDP, разделенный одними и теми же правилами маршрутизации, должен идти через разные исходящие соединения), можно использовать исходящее соединение <code>loopback</code>.</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;outbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;loopback&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;need-to-split&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;traffic-input&quot;</span> <span class="token comment">// Этот тег используется ниже для inboundTag в RuleObject</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp-output&quot;</span><span class="token punctuation">,</span>
      <span class="token comment">// Настройки protocol, settings, streamSettings и т. д.</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;udp-output&quot;</span><span class="token punctuation">,</span>
      <span class="token comment">// Настройки protocol, settings, streamSettings и т. д.</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;routing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;traffic-input&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// Тег, установленный в loopback</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp-output&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;traffic-input&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// Тег, установленный в loopback</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;udp&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;udp-output&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10);function i(l,r){const n=a("I18nTip");return t(),o("div",null,[p(n),u])}const k=s(c,[["render",i],["__file","loopback.html.vue"]]);export{k as default};
