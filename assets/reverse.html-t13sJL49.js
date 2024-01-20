import{_ as p,r as i,o as c,c as r,a as s,b as n,d as t,w as o,e as a}from"./app-eE4giq9J.js";const l={},u=a(`<h1 id="reverse-proxy" tabindex="-1"><a class="header-anchor" href="#reverse-proxy" aria-hidden="true">#</a> Reverse Proxy</h1><p>A reverse proxy forwards traffic from a server to a client, which is known as reverse traffic forwarding.</p><p>Here&#39;s how a reverse proxy generally works:</p><ul><li>Suppose there is a web server in host A, which does not have a public IP address and cannot be accessed directly on the Internet. There is another host B that can be accessed via the public network. Now we need to use B as the entry point to forward traffic from B to A.</li><li>Configure Xray in host A as a <code>bridge</code>, and also configure Xray in B as a <code>portal</code>.</li><li><code>Bridge</code> will actively establish a connection to <code>portal</code>, and the destination address of this connection can be set by itself. <code>Portal</code> will receive two types of connections: one is the connection sent by <code>bridge</code>, and the other is the connection sent by public network users. <code>Portal</code> will automatically merge the two types of connections. So <code>bridge</code> can receive public network traffic.</li><li>After receiving the public network traffic, <code>bridge</code> will forward it unchanged to the web server in host A. Of course, this step requires the cooperation of routing.</li><li><code>Bridge</code> will dynamically load balance according to the size of the traffic.</li></ul><div class="custom-container tip"><p class="custom-container-title">Tip</p><p>Reverse proxy has Mux enabled by default, so please do not enable Mux again on the outbound it uses.</p></div><div class="custom-container warning"><p class="custom-container-title">Warning</p><p>The reverse proxy function is still in the testing phase and may have some issues.</p></div><h2 id="reverseobject" tabindex="-1"><a class="header-anchor" href="#reverseobject" aria-hidden="true">#</a> ReverseObject</h2><p><code>ReverseObject</code> corresponds to the <code>reverse</code> field in the configuration file.</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;reverse&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;bridges&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bridge&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;domain&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test.xray.com&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;portals&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;portal&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;domain&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test.xray.com&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>bridges</code>: [<a href="#bridgeobject">BridgeObject</a>]</p></blockquote><p>An array in which each item represents a <code>bridge</code>. The configuration of each <code>bridge</code> is a <a href="#bridgeobject">BridgeObject</a>.</p><blockquote><p><code>portals</code>: [<a href="#portalobject">PortalObject</a>]</p></blockquote><p>An array in which each item represents a <code>portal</code>. The configuration of each <code>portal</code> is a <a href="#bridgeobject">PortalObject</a>.</p><h3 id="bridgeobject" tabindex="-1"><a class="header-anchor" href="#bridgeobject" aria-hidden="true">#</a> BridgeObject</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bridge&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;domain&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test.xray.com&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>tag</code>: string</p></blockquote>`,16),d=s("code",null,"bridge",-1),v=a(`<blockquote><p><code>domain</code>: string</p></blockquote><p>Specifies a domain name that will be used by <code>bridge</code> to send connections to <code>portal</code>. This domain name is only used for communication between <code>bridge</code> and <code>portal</code>, and does not need to actually exist.</p><h3 id="portalobject" tabindex="-1"><a class="header-anchor" href="#portalobject" aria-hidden="true">#</a> PortalObject</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;portal&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;domain&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test.xray.com&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>tag</code>: string</p></blockquote>`,5),k=s("code",null,"portal",-1),b=s("code",null,"outboundTag",-1),m=s("code",null,"portal",-1),q=a(`<blockquote><p><code>domain</code>: string</p></blockquote><p>A domain name. When the <code>portal</code> receives traffic, if the destination domain of the traffic is this domain, the <code>portal</code> assumes that the current connection is a communication connection sent by the <code>bridge</code>. Other traffic will be considered as traffic that needs to be forwarded. The work of the <code>portal</code> is to identify and splice these two types of connections.</p><div class="custom-container tip"><p class="custom-container-title">Tip</p><p>An Xray can act as a <code>bridge</code>, a <code>portal</code>, or both at the same time, depending on the needs of different scenarios.</p></div><h2 id="complete-configuration-example" tabindex="-1"><a class="header-anchor" href="#complete-configuration-example" aria-hidden="true">#</a> Complete Configuration Example</h2><p>::: tip During operation, it is recommended to enable <code>bridge</code> first, then enable <code>portal</code>. :::</p><h3 id="bridge-configuration" tabindex="-1"><a class="header-anchor" href="#bridge-configuration" aria-hidden="true">#</a> Bridge Configuration</h3><p>A <code>bridge</code> usually requires two outbounds, one for connecting to the <code>portal</code>, and the other for sending actual traffic. That is, you need to use routing to distinguish between the two types of traffic.</p><p>Reverse proxy configuration:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;bridges&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bridge&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;domain&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test.xray.com&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>outbound:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;out&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;freedom&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;redirect&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1:80&quot;</span> <span class="token comment">// Forward all traffic to web server</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vmess&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;vnext&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;portal&#39;s IP address&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">1024</span><span class="token punctuation">,</span>
        <span class="token property">&quot;users&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;5783a3e7-e373-51cd-8642-c83782b807c5&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;interconn&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Routing Configuration:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;bridge&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;domain&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;full:test.xray.com&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;interconn&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;bridge&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;out&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="portal-configuration" tabindex="-1"><a class="header-anchor" href="#portal-configuration" aria-hidden="true">#</a> Portal Configuration</h3><p><code>portal</code> usually requires two inbounds, one for receiving connections from <code>bridge</code>, and the other for receiving actual traffic. You also need to distinguish between these two types of traffic using routing.</p><p>Reverse proxy configuration:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;portals&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;portal&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;domain&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test.xray.com&quot;</span> <span class="token comment">// Must be the same as the bridge&#39;s configuration</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>inbound:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;external&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">80</span><span class="token punctuation">,</span>
  <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dokodemo-door&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">80</span><span class="token punctuation">,</span>
    <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">1024</span><span class="token punctuation">,</span>
  <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;interconn&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vmess&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;clients&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;5783a3e7-e373-51cd-8642-c83782b807c5&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Routing Configuration:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;external&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;portal&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;interconn&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;portal&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,23);function g(h,f){const e=i("RouterLink");return c(),r("div",null,[u,s("p",null,[n("All connections initiated by "),d,n(" will have this tag. It can be used to identify the connections in "),t(e,{to:"/en/config/routing.html"},{default:o(()=>[n("routing configuration")]),_:1}),n(".")]),v,s("p",null,[n("The identifier for the "),k,n(". Use "),b,n(" in "),t(e,{to:"/en/config/routing.html"},{default:o(()=>[n("routing configuration")]),_:1}),n(" to forward traffic to this "),m,n(".")]),q])}const j=p(l,[["render",g],["__file","reverse.html.vue"]]);export{j as default};
