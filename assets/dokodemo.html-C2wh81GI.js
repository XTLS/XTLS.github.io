import{_ as c,r as a,o as i,c as l,a as n,b as o,d as e,w as t,e as p}from"./app-CvaQq0F5.js";const d={},u=p(`<h1 id="dokodemo-door" tabindex="-1"><a class="header-anchor" href="#dokodemo-door"><span>Dokodemo-Door</span></a></h1><p>Dokodemo door (Anywhere Door) can listen to a local port and forward all incoming data on this port to a specified server&#39;s port, achieving the effect of port mapping.</p><h2 id="inboundconfigurationobject" tabindex="-1"><a class="header-anchor" href="#inboundconfigurationobject"><span>InboundConfigurationObject</span></a></h2><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;8.8.8.8&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">53</span><span class="token punctuation">,</span>
  <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;followRedirect&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;userLevel&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>address</code>: address</p></blockquote><p>The address to forward the traffic to. It can be an IP address like <code>&quot;1.2.3.4&quot;</code> or a domain name like <code>&quot;xray.com&quot;</code>. It is a string type.</p><p>When <code>followRedirect</code> (see below) is set to <code>true</code>, <code>address</code> can be empty.</p><blockquote><p><code>port</code>: number</p></blockquote><p>The specified port on the destination address to forward the traffic to. It should be in the range 1,655351,65535. It is a numeric value and is a required parameter.</p><blockquote><p><code>network</code>: &quot;tcp&quot; | &quot;udp&quot; | &quot;tcp,udp&quot;</p></blockquote><p>The supported network protocol type. For example, when specified as <code>&quot;tcp&quot;</code>, it will only receive TCP traffic. The default value is <code>&quot;tcp&quot;</code>.</p><blockquote><p><code>followRedirect</code>: true | false</p></blockquote><p>When set to <code>true</code>, dokodemo-door will recognize data forwarded by iptables and forward it to the corresponding destination address.</p>`,13),k=o("code",null,"tproxy",-1),h=o("blockquote",null,[o("p",null,[o("code",null,"userLevel"),e(": number")])],-1),m=o("code",null,"userLevel",-1),f=o("code",null,"level",-1),v=p(`<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>Usage</span></a></h2><p>Dokodemo-door can be used as Transparent proxy (in the next section) and can be used to mapping a port.</p><p>Some services does not support proxy likes SOCKS5, but using Tun or Tproxy could be too complicated. If these services only communicate with only one port (like iperf, Minecraft server, Wireguard endpoint, etc.), dokodemo-door can be used.</p><p>Below is an example config (if the default outbound is an effective proxy):</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;listen&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">25565</span><span class="token punctuation">,</span>
  <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dokodemo-door&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;mc.hypixel.net&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">25565</span><span class="token punctuation">,</span>
    <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;followRedirect&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token property">&quot;userLevel&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;mc&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The core will listen at <code>127.0.0.1:25565</code>, and the traffic coming in through this inbound will be send to <code>mc.hypixel.net:25565</code> (a Minecraft server) through the default outbound. Then you can connect the Minecraft client to the Hypixel server through the proxy by set the game server to <code>127.0.0.1:25565</code> in the Minecraft client.</p><h2 id="transparent-proxy-configuration-example" tabindex="-1"><a class="header-anchor" href="#transparent-proxy-configuration-example"><span>Transparent Proxy Configuration Example</span></a></h2><p>Please refer to the <a href="../../document/level-2/tproxy">Transparent Proxy (TProxy) Configuration Tutorial</a> for this section.</p>`,8);function b(q,g){const r=a("I18nTip"),s=a("RouterLink");return i(),l("div",null,[n(r),u,o("p",null,[e("Refer to the "),k,e(" setting in the "),n(s,{to:"/en/config/transport.html#sockoptobject"},{default:t(()=>[e("Transport Configuration")]),_:1}),e(" for more information.")]),h,o("p",null,[e("The user level that the connection will use to determine the corresponding "),n(s,{to:"/en/config/policy.html#levelpolicyobject"},{default:t(()=>[e("Local Policy")]),_:1}),e(".")]),o("p",null,[e("The value of "),m,e(" corresponds to the value of "),f,e(" in the "),n(s,{to:"/en/config/policy.html#policyobject"},{default:t(()=>[e("policy")]),_:1}),e(". If not specified, the default value is 0.")]),v])}const x=c(d,[["render",b],["__file","dokodemo.html.vue"]]);export{x as default};