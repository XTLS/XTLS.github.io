import{_ as n,o,c as e,e as i}from"./app-U8xM6KzC.js";const t={},s=i(`<h1 id="loopback" tabindex="-1"><a class="header-anchor" href="#loopback"><span>Loopback</span></a></h1><p>Loopback 是个出站数据协议，其作用为将经该出站传出的数据重新送入路由入站，以达到数据无需离开 Xray-core 即可再次被路由处理的效果。</p><h2 id="outboundconfigurationobject" tabindex="-1"><a class="header-anchor" href="#outboundconfigurationobject"><span>OutboundConfigurationObject</span></a></h2><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;TagUseAsInbound&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>inboundTag</code>: string</p></blockquote><p>用于重新路由的入站协议标识。</p><p>该标识可以在路由中用于 <code>inboundTag</code> ，表示该出站中的数据可以被对应的路由规则再次处理。</p><h3 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用"><span>如何使用？</span></a></h3><p>如果需要将已经通过路由规则分流过的流量再由其它路由规则做更细致的分流，比如由同一组路由规则分流后的 TCP 流量和 UDP 要走不同的出站，则可以使用 <code>loopback</code> 出站完成。</p><div class="language-jsonc line-numbers-mode" data-ext="jsonc" data-title="jsonc"><pre class="language-jsonc"><code>{
  &quot;outbounds&quot;: [
    {
      &quot;protocol&quot;: &quot;loopback&quot;,
      &quot;tag&quot;: &quot;need-to-split&quot;,
      &quot;settings&quot;: {
        &quot;tag&quot;: &quot;traffic-input&quot; // 该 tag 在下方用于 RuleObject 的 inboundTag
      }
    },
    {
      &quot;tag&quot;: &quot;tcp-output&quot;,
      // protocol, settings, streamSettings 之类的设置
    },
    {
      &quot;tag&quot;: &quot;udp-output&quot;,
      // protocol, settings, streamSettings 之类的设置
    }
  ],
  &quot;routing&quot;: {
    &quot;rules&quot;: [
      {
        &quot;inboundTag&quot;: [&quot;traffic-input&quot;], // loopback 设定的 tag
        &quot;network&quot;: &quot;tcp&quot;,
        &quot;outboundTag&quot;: &quot;tcp-output&quot;
      },
      {
        &quot;inboundTag&quot;: [&quot;traffic-input&quot;], // loopback 设定的 tag
        &quot;network&quot;: &quot;udp&quot;,
        &quot;outboundTag&quot;: &quot;udp-output&quot;
      }
    ]
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),u=[s];function a(d,l){return o(),e("div",null,u)}const r=n(t,[["render",a],["__file","loopback.html.vue"]]);export{r as default};
