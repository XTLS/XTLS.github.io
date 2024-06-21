import{_ as n,o,c as t,e}from"./app-4MABrf9m.js";const i={},s=e(`<h1 id="loopback" tabindex="-1"><a class="header-anchor" href="#loopback"><span>Loopback</span></a></h1><p>Loopback is an outbound protocol. It can send traffics through corresponding outbound to routing inbound, thus rerouting traffics to other routing rules without leaving Xray-core.</p><h2 id="outboundconfigurationobject" tabindex="-1"><a class="header-anchor" href="#outboundconfigurationobject"><span>OutboundConfigurationObject</span></a></h2><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;TagUseAsInbound&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>inboundTag</code>: string</p></blockquote><p>Use as an inbound tag for routing.</p><p>This tag can be used as <code>inboundTag</code> in routing rules, all traffics going through this outbound can be rerouted with routing rules with corresponding inbound tag.</p><h3 id="how-to-use" tabindex="-1"><a class="header-anchor" href="#how-to-use"><span>How to use?</span></a></h3><p>If you need to do some more detailed routing for traffics that have been routed by routing rules, like splitting routed traffics to TCP traffics and UDP traffics and send them to different outbounds, this can be done with <code>loopback</code> outbound.</p><div class="language-jsonc line-numbers-mode" data-ext="jsonc" data-title="jsonc"><pre class="language-jsonc"><code>{
  &quot;outbounds&quot;: [
    {
      &quot;protocol&quot;: &quot;loopback&quot;,
      &quot;tag&quot;: &quot;need-to-split&quot;,
      &quot;settings&quot;: {
        &quot;inboundTag&quot;: &quot;traffic-input&quot; // This tag will be used as the inboundTag inside the RuleObject 
      }
    },
    {
      &quot;tag&quot;: &quot;tcp-output&quot;,
      // protocol, settings, streamSettings etc.
    },
    {
      &quot;tag&quot;: &quot;udp-output&quot;,
      // protocol, settings, streamSettings etc.
    }
  ],
  &quot;routing&quot;: {
    &quot;rules&quot;: [
      {
        &quot;inboundTag&quot;: [&quot;traffic-input&quot;], // tag set in the loopback outbound setting
        &quot;network&quot;: &quot;tcp&quot;,
        &quot;outboundTag&quot;: &quot;tcp-output&quot;
      },
      {
        &quot;inboundTag&quot;: [&quot;traffic-input&quot;], // tag set in the loopback outbound 
        &quot;network&quot;: &quot;udp&quot;,
        &quot;outboundTag&quot;: &quot;udp-output&quot;
      }
    ]
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),u=[s];function a(d,l){return o(),t("div",null,u)}const r=n(i,[["render",a],["__file","loopback.html.vue"]]);export{r as default};
