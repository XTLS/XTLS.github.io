import{_ as c,r as e,o as d,c as p,a as o,b as n,d as t,w as u,e as r}from"./app-eE4giq9J.js";const i={},l=o("h1",{id:"dns",tabindex:"-1"},[o("a",{class:"header-anchor",href:"#dns","aria-hidden":"true"},"#"),n(" DNS")],-1),q=o("p",null,"DNS 是一个出站协议，主要用于拦截和转发 DNS 查询。",-1),k=o("p",null,"此出站协议只能接收 DNS 流量（包含基于 UDP 和 TCP 协议的查询），其它类型的流量会导致错误。",-1),_=r(`<h2 id="outboundconfigurationobject" tabindex="-1"><a class="header-anchor" href="#outboundconfigurationobject" aria-hidden="true">#</a> OutboundConfigurationObject</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.1.1.1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">53</span><span class="token punctuation">,</span>
  <span class="token property">&quot;nonIPQuery&quot;</span><span class="token operator">:</span> <span class="token string">&quot;drop&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>network</code>: &quot;tcp&quot; | &quot;udp&quot;</p></blockquote><p>修改 DNS 流量的传输层协议，可选的值有 <code>&quot;tcp&quot;</code> 和 <code>&quot;udp&quot;</code>。当不指定时，保持来源的传输方式不变。</p><blockquote><p><code>address</code>: address</p></blockquote><p>修改 DNS 服务器地址。当不指定时，保持来源中指定的地址不变。</p><blockquote><p><code>port</code>: number</p></blockquote><p>修改 DNS 服务器端口。当不指定时，保持来源中指定的端口不变。</p><blockquote><p><code>nonIPQuery</code>: string</p></blockquote><p>控制非 IP 查询（非 A 和 AAAA），<code>&quot;drop&quot;</code> 丢弃或者 <code>&quot;skip&quot;</code> 不由内置 DNS 服务器处理，将转发给目标。默认为 <code>&quot;drop&quot;</code>。</p>`,10),b={id:"dns-配置实例",tabindex:"-1"},h=o("a",{class:"header-anchor",href:"#dns-配置实例","aria-hidden":"true"},"#",-1);function m(v,f){const s=e("RouterLink"),a=e("Badge");return d(),p("div",null,[l,q,k,o("p",null,[n("在处理 DNS 查询时，此出站协议会将 IP 查询（即 A 和 AAAA）转发给内置的 "),t(s,{to:"/config/dns.html"},{default:u(()=>[n("DNS 服务器")]),_:1}),n("。其它类型的查询流量将被转发至它们原本的目标地址。")]),_,o("h2",b,[h,n(" DNS 配置实例 "),t(a,{text:"WIP",type:"warning"})])])}const N=c(i,[["render",m],["__file","dns.html.vue"]]);export{N as default};
