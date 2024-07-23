import{_ as i,r as p,o as l,c as u,a,b as s,d as n,e}from"./app-n-I8ebL6.js";const r={},c=e(`<h1 id="метрики" tabindex="-1"><a class="header-anchor" href="#метрики"><span>Метрики</span></a></h1><p>Более простой (и, надеюсь, лучший) способ экспорта статистики.</p><h2 id="связанные-настроики" tabindex="-1"><a class="header-anchor" href="#связанные-настроики"><span>Связанные настройки</span></a></h2><p>Можно добавить входящее подключение <code>metrics</code> в раздел <code>inbounds</code>:</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code>    <span class="token property">&quot;inbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Добавьте правило маршрутизации для входящего подключения <code>metrics</code> в раздел <code>routing</code>:</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code>    <span class="token property">&quot;routing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Добавьте <code>metrics</code> в основные настройки:</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code>    <span class="token property">&quot;metrics&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;metrics_out&quot;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="использование" tabindex="-1"><a class="header-anchor" href="#использование"><span>Использование</span></a></h2><h3 id="pprof" tabindex="-1"><a class="header-anchor" href="#pprof"><span>pprof</span></a></h3><p>Откройте <code>http://127.0.0.1:11111/debug/pprof/</code> или используйте утилиту <code>go tool pprof</code>, чтобы начать профилирование или просмотреть запущенные горутины.</p><h3 id="expvars" tabindex="-1"><a class="header-anchor" href="#expvars"><span>expvars</span></a></h3><p>Откройте <code>http://127.0.0.1:11111/debug/vars</code>.</p><p>Экспортируемые переменные включают:</p><ul><li><code>stats</code> - статистика по входящим, исходящим подключениям и пользователям.</li><li><code>observatory</code> - результаты мониторинга.</li></ul>`,16),d={href:"https://github.com/yichya/luci-app-xray",target:"_blank",rel:"noopener noreferrer"},v=s("code",null,"cmdline",-1),k=s("code",null,"memstats",-1),b=e(`<details><summary>Показать</summary><br><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,1),m={href:"https://github.com/netdata/netdata",target:"_blank",rel:"noopener noreferrer"},q=e(`<ol><li>Отредактируйте соответствующий файл конфигурации (<code>sudo /etc/netdata/edit-config python.d/go_expvar.conf</code>).</li><li>Используйте следующий файл конфигурации в качестве примера:</li></ol><details><summary>Показать</summary><br><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>xray:
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>И вы получите красивый график, подобный этому:</p><p><img src="https://github.com/chika0801/Xray-docs-next/assets/88967758/455e88ce-ced2-4593-a9fa-425bb293215b" alt="160428235-2988bf69-5d6c-41ec-8267-1bd512508aa8"></p><h3 id="дополнительно" tabindex="-1"><a class="header-anchor" href="#дополнительно"><span>Дополнительно</span></a></h3><p>Возможно, лучше использовать пустой объект <code>stats</code> в конфигурационном файле, чем добавлять <code>metrics</code>?</p><p><strong>Изменение:</strong> удалены настройки, связанные с Prometheus, и добавлено использование expvars.</p>`,7);function y(_,h){const o=p("I18nTip"),t=p("ExternalLinkIcon");return l(),u("div",null,[a(o),c,s("p",null,[n("Например, с помощью "),s("a",d,[n("luci-app-xray"),a(t)]),n(" вы, скорее всего, получите результат, подобный этому (стандартные переменные expvar, такие как "),v,n(" и "),k,n(", опущены):")]),b,s("p",null,[n("Чтобы лучше визуализировать эти данные, можно использовать "),s("a",m,[n("Netdata"),a(t)]),n(" (с плагином python.d):")]),q])}const g=i(r,[["render",y],["__file","metrics.html.vue"]]);export{g as default};
