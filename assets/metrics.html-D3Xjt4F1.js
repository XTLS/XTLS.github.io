import{_ as i,r as p,o as l,c as u,a,b as s,d as n,e}from"./app-CvaQq0F5.js";const r={},c=e(`<h1 id="metrics" tabindex="-1"><a class="header-anchor" href="#metrics"><span>Metrics</span></a></h1><p>A more straightforward (and hopefully better) way to export metrics.</p><h2 id="related-configurations" tabindex="-1"><a class="header-anchor" href="#related-configurations"><span>Related configurations</span></a></h2><p>It&#39;s possible to add a metrics inbound among inbounds.</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code>    <span class="token property">&quot;inbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">&quot;listen&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">11111</span><span class="token punctuation">,</span>
            <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dokodemo-door&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;metrics_in&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>And add routing rules regarding the metrics inbound in the routing configuration.</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code>    <span class="token property">&quot;routing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token string">&quot;metrics_in&quot;</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;metrics_out&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Then finally, enable metrics under the root object.</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code>    <span class="token property">&quot;metrics&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;metrics_out&quot;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>Usage</span></a></h2><h3 id="pprof" tabindex="-1"><a class="header-anchor" href="#pprof"><span>pprof</span></a></h3><p>Access <code>http://127.0.0.1:11111/debug/pprof/</code> or use go tool pprof to start profiling or inspect running goroutines.</p><h3 id="expvars" tabindex="-1"><a class="header-anchor" href="#expvars"><span>expvars</span></a></h3><p>Access <code>http://127.0.0.1:11111/debug/vars</code></p><p>Variables exported include:</p><ul><li><code>stats</code> includes statistics about inbounds, outbounds and users</li><li><code>observatory</code> includes observatory results</li></ul>`,16),d={href:"https://github.com/yichya/luci-app-xray",target:"_blank",rel:"noopener noreferrer"},v=s("code",null,"cmdline",-1),k=s("code",null,"memstats",-1),b=e(`<details><summary>Click to expand</summary><br><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;observatory&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;tcp_outbound&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;alive&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token property">&quot;delay&quot;</span><span class="token operator">:</span> <span class="token number">782</span><span class="token punctuation">,</span>
            <span class="token property">&quot;outbound_tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp_outbound&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;last_seen_time&quot;</span><span class="token operator">:</span> <span class="token number">1648477189</span><span class="token punctuation">,</span>
            <span class="token property">&quot;last_try_time&quot;</span><span class="token operator">:</span> <span class="token number">1648477189</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;udp_outbound&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;alive&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token property">&quot;delay&quot;</span><span class="token operator">:</span> <span class="token number">779</span><span class="token punctuation">,</span>
            <span class="token property">&quot;outbound_tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;udp_outbound&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;last_seen_time&quot;</span><span class="token operator">:</span> <span class="token number">1648477191</span><span class="token punctuation">,</span>
            <span class="token property">&quot;last_try_time&quot;</span><span class="token operator">:</span> <span class="token number">1648477191</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;stats&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;inbound&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;api&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;downlink&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                <span class="token property">&quot;uplink&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;dns_server_inbound_5300&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;downlink&quot;</span><span class="token operator">:</span> <span class="token number">14286</span><span class="token punctuation">,</span>
                <span class="token property">&quot;uplink&quot;</span><span class="token operator">:</span> <span class="token number">5857</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;http_inbound&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;downlink&quot;</span><span class="token operator">:</span> <span class="token number">74460</span><span class="token punctuation">,</span>
                <span class="token property">&quot;uplink&quot;</span><span class="token operator">:</span> <span class="token number">10231</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;https_inbound&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;downlink&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                <span class="token property">&quot;uplink&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;metrics&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;downlink&quot;</span><span class="token operator">:</span> <span class="token number">6327</span><span class="token punctuation">,</span>
                <span class="token property">&quot;uplink&quot;</span><span class="token operator">:</span> <span class="token number">1347</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;socks_inbound&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;downlink&quot;</span><span class="token operator">:</span> <span class="token number">19925615</span><span class="token punctuation">,</span>
                <span class="token property">&quot;uplink&quot;</span><span class="token operator">:</span> <span class="token number">5512</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;tproxy_tcp_inbound&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;downlink&quot;</span><span class="token operator">:</span> <span class="token number">4739161</span><span class="token punctuation">,</span>
                <span class="token property">&quot;uplink&quot;</span><span class="token operator">:</span> <span class="token number">1568869</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;tproxy_udp_inbound&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;downlink&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                <span class="token property">&quot;uplink&quot;</span><span class="token operator">:</span> <span class="token number">2608142</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outbound&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;blackhole_outbound&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;downlink&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                <span class="token property">&quot;uplink&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;direct&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;downlink&quot;</span><span class="token operator">:</span> <span class="token number">97714548</span><span class="token punctuation">,</span>
                <span class="token property">&quot;uplink&quot;</span><span class="token operator">:</span> <span class="token number">3234617</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;dns_server_outbound&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;downlink&quot;</span><span class="token operator">:</span> <span class="token number">7116</span><span class="token punctuation">,</span>
                <span class="token property">&quot;uplink&quot;</span><span class="token operator">:</span> <span class="token number">2229</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;manual_tproxy_outbound_tcp_1&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;downlink&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                <span class="token property">&quot;uplink&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;manual_tproxy_outbound_udp_1&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;downlink&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                <span class="token property">&quot;uplink&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;tcp_outbound&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;downlink&quot;</span><span class="token operator">:</span> <span class="token number">23873238</span><span class="token punctuation">,</span>
                <span class="token property">&quot;uplink&quot;</span><span class="token operator">:</span> <span class="token number">1049595</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;udp_outbound&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;downlink&quot;</span><span class="token operator">:</span> <span class="token number">639282</span><span class="token punctuation">,</span>
                <span class="token property">&quot;uplink&quot;</span><span class="token operator">:</span> <span class="token number">74634</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;user&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,1),m={href:"https://github.com/netdata/netdata",target:"_blank",rel:"noopener noreferrer"},y=e(`<ol><li>Edit related configuration file (<code>sudo /etc/netdata/edit-config python.d/go_expvar.conf</code>)</li><li>Take the following configuration file as an example:</li></ol><details><summary>Click to expand</summary><br><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>xray:
  name: &#39;xray&#39;
  update_every: 2
  url: &#39;http://127.0.0.1:11111/debug/vars&#39;
  collect_memstats: false
  extra_charts:
     - id: &#39;inbounds&#39;
       options:
         name: &#39;inbounds&#39;
         title: &#39;Xray System Inbounds&#39;
         units: bytes
         family: xray
         context: xray.inbounds
         chart_type: line
       lines:
         - expvar_key: stats.inbound.tproxy_tcp_inbound.downlink
           id: &#39;tcp.downlink&#39;
           algorithm: incremental
           expvar_type: int
         - expvar_key: stats.inbound.tproxy_udp_inbound.downlink
           id: &#39;udp.downlink&#39;
           algorithm: incremental
           expvar_type: int
         - expvar_key: stats.inbound.http_inbound.downlink
           id: &#39;http.downlink&#39;
           algorithm: incremental
           expvar_type: int
         - expvar_key: stats.inbound.https_inbound.downlink
           id: &#39;https.downlink&#39;
           algorithm: incremental
           expvar_type: int
         - expvar_key: stats.inbound.socks_inbound.downlink
           id: &#39;socks.downlink&#39;
           algorithm: incremental
           expvar_type: int
         - expvar_key: stats.inbound.tproxy_tcp_inbound.uplink
           id: &#39;tcp.uplink&#39;
           algorithm: incremental
           expvar_type: int
         - expvar_key: stats.inbound.tproxy_udp_inbound.uplink
           id: &#39;udp.uplink&#39;
           algorithm: incremental
           expvar_type: int
         - expvar_key: stats.inbound.http_inbound.uplink
           id: &#39;http.uplink&#39;
           algorithm: incremental
           expvar_type: int
         - expvar_key: stats.inbound.https_inbound.uplink
           id: &#39;https.uplink&#39;
           algorithm: incremental
           expvar_type: int
         - expvar_key: stats.inbound.socks_inbound.uplink
           id: &#39;socks.uplink&#39;
           algorithm: incremental
           expvar_type: int
     - id: &#39;outbounds&#39;
       options:
         name: &#39;outbounds&#39;
         title: &#39;Xray System Outbounds&#39;
         units: bytes
         family: xray
         context: xray.outbounds
         chart_type: line
       lines:
         - expvar_key: stats.outbound.tcp_outbound.downlink
           id: &#39;tcp.downlink&#39;
           algorithm: incremental
           expvar_type: int
         - expvar_key: stats.outbound.udp_outbound.downlink
           id: &#39;udp.downlink&#39;
           algorithm: incremental
           expvar_type: int
         - expvar_key: stats.outbound.direct.downlink
           id: &#39;direct.downlink&#39;
           algorithm: incremental
           expvar_type: int
         - expvar_key: stats.outbound.tcp_outbound.uplink
           id: &#39;tcp.uplink&#39;
           algorithm: incremental
           expvar_type: int
         - expvar_key: stats.outbound.udp_outbound.uplink
           id: &#39;udp.uplink&#39;
           algorithm: incremental
           expvar_type: int
         - expvar_key: stats.outbound.direct.uplink
           id: &#39;direct.uplink&#39;
           algorithm: incremental
           expvar_type: int
     - id: &#39;observatory&#39;
       options:
         name: &#39;observatory&#39;
         title: &#39;Xray Observatory Metrics&#39;
         units: milliseconds
         family: xray
         context: xray.observatory
         chart_type: line
       lines:
         - expvar_key: observatory.tcp_outbound.delay
           id: tcp
           expvar_type: int
         - expvar_key: observatory.udp_outbound.delay
           id: udp
           expvar_type: int
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>And you will get a nice plot like this:</p><p><img src="https://github.com/chika0801/Xray-docs-next/assets/88967758/455e88ce-ced2-4593-a9fa-425bb293215b" alt="160428235-2988bf69-5d6c-41ec-8267-1bd512508aa8"></p><h3 id="additional" tabindex="-1"><a class="header-anchor" href="#additional"><span>Additional</span></a></h3><p>Maybe reusing the empty object <code>stats</code> in config file is better than adding <code>metrics</code> here?</p><p><strong>Edit:</strong> removed prometheus related things and added usage about expvars</p>`,7);function q(_,h){const o=p("I18nTip"),t=p("ExternalLinkIcon");return l(),u("div",null,[a(o),c,s("p",null,[n("for example with "),s("a",d,[n("luci-app-xray"),a(t)]),n(" you are likely to get a result like this (standard expvar things like "),v,n(" and "),k,n(" are omitted)")]),b,s("p",null,[n("To get a better view of these numbers, "),s("a",m,[n("Netdata"),a(t)]),n(" (with python.d plugin) is a great option:")]),y])}const x=i(r,[["render",q],["__file","metrics.html.vue"]]);export{x as default};
