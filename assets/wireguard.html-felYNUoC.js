import{_ as c,r as t,o as u,c as r,a as s,b as n,d as e,w as i,e as a}from"./app-eE4giq9J.js";const l={},d=a(`<h1 id="wireguard" tabindex="-1"><a class="header-anchor" href="#wireguard" aria-hidden="true">#</a> Wireguard</h1><p>标准 Wireguard 协议实现。</p><div class="custom-container danger"><p class="custom-container-title">警告</p><p><strong>Wireguard 协议并非专门为翻墙而设计，若在最外层过墙，存在特征可能导致服务器被封锁</strong></p></div><h2 id="outboundconfigurationobject" tabindex="-1"><a class="header-anchor" href="#outboundconfigurationobject" aria-hidden="true">#</a> OutboundConfigurationObject</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;secretKey&quot;</span><span class="token operator">:</span> <span class="token string">&quot;PRIVATE_KEY&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// optional, default [&quot;10.0.0.1&quot;, &quot;fd59:7153:2388:b5fd:0000:0000:0000:0001&quot;]</span>
    <span class="token string">&quot;IPv4_CIDR&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;IPv6_CIDR&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;and more...&quot;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;peers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;endpoint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ENDPOINT_ADDR&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;publicKey&quot;</span><span class="token operator">:</span> <span class="token string">&quot;PUBLIC_KEY&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;mtu&quot;</span><span class="token operator">:</span> <span class="token number">1420</span><span class="token punctuation">,</span> <span class="token comment">// optional, default 1420</span>
  <span class="token property">&quot;reserved&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;workers&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">// optional, default runtime.NumCPU()</span>
  <span class="token property">&quot;domainStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ForceIP&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p><p>目前 Wireguard 协议 outbound 中不支持设置 <code>streamSettings</code></p></div><blockquote><p><code>secretKey</code>: string</p></blockquote><p>用户私钥。必填。</p><blockquote><p><code>address</code>: string array</p></blockquote><p>Wireguard 会在本地开启虚拟网卡 tun。使用一个或多个 IP 地址，支持 IPv6</p><blockquote><p><code>mtu</code>: int</p></blockquote><p>Wireguard 底层 tun 的分片大小。</p><details><summary>MTU的计算方法</summary><p>一个wireguard数据包的结构如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>- 20-byte IPv4 header or 40 byte IPv6 header
- 8-byte UDP header
- 4-byte type
- 4-byte key index
- 8-byte nonce
- N-byte encrypted data
- 16-byte authentication tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>N-byte encrypted data</code>即为我们需要的MTU的值，根据endpoint是IPv4还是IPv6，具体的值可以是1440(IPv4)或者1420(IPv6)，如果处于特殊环境下再额外减掉即可(如家宽PPPoE额外-8)。</p></details><blockquote><p><code>reserved</code> [ number ]</p></blockquote><p>Wireguard 保留字节。</p>`,15),k=s("br",null,null,-1),v=s("code",null,"reserved",-1),q=s("br",null,null,-1),b=s("code",null,"reserved",-1),m={href:"https://github.com/badafans/warp-reg",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/chise0713/warp-reg.sh",target:"_blank",rel:"noopener noreferrer"},y=a('<blockquote><p><code>workers</code>: int</p></blockquote><p>Wireguard 使用线程数。</p><blockquote><p><code>peers</code>: [ <a href="#peers">Peers</a> ]</p></blockquote><p>Wireguard 服务器列表，其中每一项是一个服务器配置。</p><blockquote><p><code>domainStrategy</code>: &quot;ForceIPv6v4&quot; | &quot;ForceIPv6&quot; | &quot;ForceIPv4v6&quot; | &quot;ForceIPv4&quot; | &quot;ForceIP&quot;</p></blockquote>',5),h=s("br",null,null,-1),_=s("code",null,'"ForceIP"',-1),P=s("br",null,null,-1),I=s("code",null,'"dns"',-1),f=s("br",null,null,-1),S=a(`<div class="custom-container tip"><p class="custom-container-title">提示</p><p>若 <code>domainStrategy</code> 的值与 <code>&quot;dns&quot;</code> 配置中 <code>&quot;queryStrategy&quot;</code> 的值产生冲突，会造成网站打开失败。</p></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>    <span class="token property">&quot;dns&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;servers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;https://1.1.1.1/dns-query&quot;</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://1.1.1.1/dns-query&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token string">&quot;geosite:openai&quot;</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token property">&quot;skipFallback&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                <span class="token property">&quot;queryStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UseIPv6&quot;</span> <span class="token comment">// 只查询 AAAA 记录</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;queryStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UseIP&quot;</span> <span class="token comment">// 同时查询 A 和 AAAA 记录，若不写此参数，默认值 UseIP，</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当 <code>domainStrategy: &quot;ForceIPv4&quot;</code> 时，控制 geosite:openai 域名查询的 DNS 字段使用了 <code>&quot;queryStrategy&quot;: &quot;UseIPv6&quot;</code>，将会导致 geosite:openai 的网站打开失败。</p><div class="custom-container tip"><p class="custom-container-title">提示</p><p>Xray-core v1.8.0 - v1.8.4 没有 <code>&quot;domainStrategy&quot;</code>。<br> 当目标地址为域名时，使用 Xray-core 内置 DNS 服务器查询获取 IP。使用 <code>&quot;dns&quot;</code> 配置中 <code>&quot;queryStrategy&quot;</code> 的值控制 IPv4 或 IPv6 优先级。<br> 若没写 <code>&quot;dns&quot;</code> 配置，使用系统 DNS 查询获取 IP，IPv4 或 IPv6 优先级由系统控制。</p></div><h3 id="peers" tabindex="-1"><a class="header-anchor" href="#peers" aria-hidden="true">#</a> Peers</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;endpoint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ENDPOINT_ADDR&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;publicKey&quot;</span><span class="token operator">:</span> <span class="token string">&quot;PUBLIC_KEY&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;preSharedKey&quot;</span><span class="token operator">:</span> <span class="token string">&quot;PRE_SHARED_KEY&quot;</span><span class="token punctuation">,</span> <span class="token comment">// optional, default &quot;0000000000000000000000000000000000000000000000000000000000000000&quot;</span>
  <span class="token property">&quot;keepAlive&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// optional, default 0</span>
  <span class="token property">&quot;allowedIPs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;0.0.0.0/0&quot;</span><span class="token punctuation">]</span> <span class="token comment">// optional, default [&quot;0.0.0.0/0&quot;, &quot;::/0&quot;]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>endpoint</code>: address</p></blockquote><p>服务器地址, 必填</p><p>URL:端口 格式，例如 <code>engage.cloudflareclient.com:2408</code><br> IP:端口 格式，例如 <code>162.159.192.1:2408</code> 或 <code>[2606:4700:d0::a29f:c001]:2408</code></p><blockquote><p><code>publicKey</code>: string</p></blockquote><p>服务器公钥，用于验证, 必填</p><blockquote><p><code>preSharedKey</code>: string</p></blockquote><p>额外的对称加密密钥</p><blockquote><p><code>keepAlive</code>: int</p></blockquote><p>心跳包时间间隔，单位为秒，默认为 0 表示无心跳</p><blockquote><p><code>allowedIPs</code>: string array</p></blockquote><p>Wireguard 仅允许特定源 IP 的流量</p>`,17);function w(x,N){const o=t("ExternalLinkIcon"),p=t("RouterLink");return u(),r("div",null,[d,s("p",null,[n("Xray-core v1.8.0 新增参数。"),k,n(" 通过 wireguard 连接 warp 时，由于 cloudflare 的限制，香港、洛杉矶部分 IP 需要有 "),v,n(" 的值才能成功连接。"),q,b,n(" 的值可使用第三方工具获得，例如："),s("a",m,[n("warp-reg"),e(o)]),n("、"),s("a",g,[n("warp-reg.sh"),e(o)]),n("。")]),y,s("p",null,[n("Xray-core v1.8.6 新增参数。"),h,n(" 若不写此参数，或留空，默认值 "),_,n("。"),P,n(" 当目标地址为域名时，使用 Xray-core "),e(p,{to:"/config/dns.html"},{default:i(()=>[n("内置 DNS 服务器")]),_:1}),n("查询获取 IP（若没写 "),I,n(" 配置，使用系统 DNS），将此 IP 通过 wireguard 发出连接。"),f]),S])}const D=c(l,[["render",w],["__file","wireguard.html.vue"]]);export{D as default};
