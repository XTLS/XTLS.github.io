import{_ as p,r as s,o as c,c as i,a,b as l,d as n,w as u,e}from"./app-DAcij5Kp.js";const d={},r=e(`<h1 id="fakedns" tabindex="-1"><a class="header-anchor" href="#fakedns"><span>FakeDNS</span></a></h1><p>FakeDNS 通过伪造 DNS 以获取目标域名，能够降低 DNS 查询时的延迟、配合透明代理获取目标域名。</p><div class="custom-container warning"><p class="custom-container-title">注意</p><p>FakeDNS 有可能会污染本地 DNS，导致 Xray 关闭后“无法访问网络”。</p></div><h2 id="fakednsobject" tabindex="-1"><a class="header-anchor" href="#fakednsobject"><span>FakeDNSObject</span></a></h2><p><code>FakeDNSObject</code> 对应配置文件的 <code>fakedns</code> 项。</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;ipPool&quot;</span><span class="token operator">:</span> <span class="token string">&quot;198.18.0.0/16&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;poolSize&quot;</span><span class="token operator">:</span> <span class="token number">65535</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>FakeDnsObject</code> 亦可配置为一个包含多个 FakeIP Pool 的数组。当收到 DNS 查询请求时，FakeDNS 会返回一组同时由多个 FakeIP Pool 得到的一组 FakeIP。</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token property">&quot;ipPool&quot;</span><span class="token operator">:</span> <span class="token string">&quot;198.18.0.0/15&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;poolSize&quot;</span><span class="token operator">:</span> <span class="token number">65535</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token property">&quot;ipPool&quot;</span><span class="token operator">:</span> <span class="token string">&quot;fc00::/18&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;poolSize&quot;</span><span class="token operator">:</span> <span class="token number">65535</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>ipPool</code>: CIDR</p></blockquote><p>FakeDNS 将使用此选项指定的 IP 块分配地址。</p><blockquote><p><code>poolSize</code>: int</p></blockquote><p>指定 FakeDNS 储存的 域名-IP 映射的最大数目。当映射数超过此值后，会按照 LRU 规则淘汰映射。默认为 65535。</p><div class="custom-container warning"><p class="custom-container-title">注意</p><p><code>poolSize</code> 必须小于或等于 <code>ipPool</code> 对应的地址总数。</p></div><div class="custom-container tip"><p class="custom-container-title">提示</p><p>若配置文件中 <code>dns</code> 项设置了 <code>fakedns</code> 但配置文件没有设置 <code>FakeDnsObject</code>，Xray 会根据 DNS 组件的 <code>queryStrategy</code> 来初始化 <code>FakeDnsObject</code>。</p><p><code>queryStrategy</code> 为 <code>UseIP</code> 时，初始化的 FakeIP Pool 相当于</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token property">&quot;ipPool&quot;</span><span class="token operator">:</span> <span class="token string">&quot;198.18.0.0/15&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;poolSize&quot;</span><span class="token operator">:</span> <span class="token number">32768</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token property">&quot;ipPool&quot;</span><span class="token operator">:</span> <span class="token string">&quot;fc00::/18&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;poolSize&quot;</span><span class="token operator">:</span> <span class="token number">32768</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>queryStrategy</code> 为 <code>UseIPv4</code> 时，初始化的 FakeIP Pool 相当于</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;ipPool&quot;</span><span class="token operator">:</span> <span class="token string">&quot;198.18.0.0/15&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;poolSize&quot;</span><span class="token operator">:</span> <span class="token number">65535</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>queryStrategy</code> 为 <code>UseIPv6</code> 时，初始化的 FakeIP Pool 相当于</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;ipPool&quot;</span><span class="token operator">:</span> <span class="token string">&quot;fc00::/18&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;poolSize&quot;</span><span class="token operator">:</span> <span class="token number">65535</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h3 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用"><span>如何使用？</span></a></h3>`,15),k=e(`<p>只有将 DNS 查询路由到 FakeDNS，才能使其发挥作用。</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;dns&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;servers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;fakedns&quot;</span><span class="token punctuation">,</span> <span class="token comment">// fakedns 排在首位</span>
      <span class="token string">&quot;8.8.8.8&quot;</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;outbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dns&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dns-out&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;routing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;dns-in&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 劫持来自 DNS 查询入口的 DNS 流量，或劫持来自透明代理入站的 DNS 流量。</span>
        <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">53</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dns-out&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当外部 DNS 请求进入 FakeDNS 组件时，它会返回位于自己 <code>ipPool</code> 内的 IP 地址作为域名的虚构解析结果，并记录该域名与虚构解析结果之间的映射关系。</p><p>另外，你需要在<strong>客户端</strong>接收需代理流量的入站中开启 <code>Sniffing</code>，并使用 <code>fakedns</code> 目标地址重置。</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token property">&quot;sniffing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;enabled&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;destOverride&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;fakedns&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 使用 &quot;fakedns&quot;，或与其它 sniffer 搭配使用，或直接使用 &quot;fakedns+others&quot;</span>
  <span class="token property">&quot;metadataOnly&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>        <span class="token comment">// 此项为 true 时 destOverride 仅可使用 fakedns</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">注意</p><p>如果 FakeIP 没有被正确的还原为域名，将无法连接到服务器。</p></div><h3 id="与其它类型-dns-搭配使用" tabindex="-1"><a class="header-anchor" href="#与其它类型-dns-搭配使用"><span>与其它类型 DNS 搭配使用</span></a></h3><h4 id="与-dns-分流共存" tabindex="-1"><a class="header-anchor" href="#与-dns-分流共存"><span>与 DNS 分流共存</span></a></h4><p>使用 DNS 分流时，为了使 <code>fakedns</code> 拥有高优先级，需要对其增加与其他类型 DNS 相同的 <code>domains</code>。</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;servers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;fakedns&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token comment">// 与下方分流所用的内容一致</span>
        <span class="token string">&quot;geosite:cn&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;domain:example.com&quot;</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.2.3.4&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geosite:cn&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;expectIPs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geoip:cn&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.1.1.1&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;domain:example.com&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string">&quot;8.8.8.8&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="fakedns-黑名单" tabindex="-1"><a class="header-anchor" href="#fakedns-黑名单"><span>FakeDNS 黑名单</span></a></h4><p>如不希望某些域名使用 FakeDNS，则可在其它类型的 DNS 配置中添加 <code>domains</code> 配置，使指定域名在匹配时其它 DNS 服务器拥有比 FakeDNS 更高的优先级，进而实现 FakeDNS 的黑名单机制。</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;servers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;fakedns&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.2.3.4&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;domain:do-not-use-fakedns.com&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="fakedns-白名单" tabindex="-1"><a class="header-anchor" href="#fakedns-白名单"><span>FakeDNS 白名单</span></a></h4><p>如希望仅某些域名使用 FakeDNS，则可在 <code>fakedns</code> 增加 <code>domains</code> 配置，使指定域名在匹配时 <code>fakedns</code> 拥有比其它 DNS 服务器更高的优先级，进而实现 FakeDNS 的白名单机制。</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;servers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;1.2.3.4&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;fakedns&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;domain:only-this-use-fakedns.com&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16);function v(m,q){const o=s("I18nTip"),t=s("RouterLink");return c(),i("div",null,[a(o),r,l("p",null,[n("FakeDNS 本质上是一个 "),a(t,{to:"/config/dns.html#serverobject"},{default:u(()=>[n("DNS 服务器")]),_:1}),n("，能够与任意 DNS 规则配合使用。")]),k])}const g=p(d,[["render",v],["__file","fakedns.html.vue"]]);export{g as default};
