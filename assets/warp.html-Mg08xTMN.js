import{_ as p,r as o,o as l,c,a as n,b as s,d as t,e}from"./app-eE4giq9J.js";const u={},i=n("h1",{id:"通过-cloudflare-warp-增强代理安全性",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#通过-cloudflare-warp-增强代理安全性","aria-hidden":"true"},"#"),s(" 通过 Cloudflare Warp 增强代理安全性")],-1),r=n("p",null,"Xray（1.6.5+）新加入了 WireGuard 出站，虽然增加的代码和依赖会增大 core 体积，但是我们认为这是一个很有必要的新功能，原因有三：",-1),d={href:"https://github.com/net4people/bbs/issues/129#issuecomment-1308102504",target:"_blank",rel:"noopener noreferrer"},k=n("li",null,"众所周知，大部分机场会记录用户访问域名的日志，某些机场还会审计和阻断一些用户流量。保护用户私密性的一个方法，就是在客户端使用链式代理。 Warp 使用的 WireGuard 轻量级 VPN 协议会在代理层内增加一层加密。对于机场而言，用户所有流量的目标都是 Warp，从而最大程度保护自己的隐私。",-1),v=n("li",null,"方便使用，只需要一个 core 即可完成分流，Wireguard Tun，链式代理的设置。",-1),q=e('<h2 id="申请-warp-账户" tabindex="-1"><a class="header-anchor" href="#申请-warp-账户" aria-hidden="true">#</a> 申请 Warp 账户</h2><h3 id="感谢-cloudflare-推动自由的互联网-现在你可以免费使用-warp-服务-连接的时候会根据出口自动选择最近的服务器" tabindex="-1"><a class="header-anchor" href="#感谢-cloudflare-推动自由的互联网-现在你可以免费使用-warp-服务-连接的时候会根据出口自动选择最近的服务器" aria-hidden="true">#</a> 感谢 Cloudflare 推动自由的互联网，现在你可以免费使用 Warp 服务，连接的时候会根据出口自动选择最近的服务器</h3><h4 id="方法-1" tabindex="-1"><a class="header-anchor" href="#方法-1" aria-hidden="true">#</a> 方法 1：</h4>',3),m={href:"https://github.com/ViRb3/wgcf/releases",target:"_blank",rel:"noopener noreferrer"},b=n("li",null,[s("运行 "),n("code",null,"wgcf register"),s(" 生成 "),n("code",null,"wgcf-account.toml")],-1),g=n("li",null,[s("运行 "),n("code",null,"wgcf generate"),s(" 生成 "),n("code",null,"wgcf-profile.conf"),s(" 拷贝内容如下：")],-1),y=e(`<div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Interface</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">PrivateKey</span> <span class="token punctuation">=</span> <span class="token value attr-value">我的私钥</span>
<span class="token key attr-name">Address</span> <span class="token punctuation">=</span> <span class="token value attr-value">172.16.0.2/32</span>
<span class="token key attr-name">Address</span> <span class="token punctuation">=</span> <span class="token value attr-value">2606:4700:110:8949:fed8:2642:a640:c8e1/128</span>
<span class="token key attr-name">DNS</span> <span class="token punctuation">=</span> <span class="token value attr-value">1.1.1.1</span>
<span class="token key attr-name">MTU</span> <span class="token punctuation">=</span> <span class="token value attr-value">1280</span>
<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Peer</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">PublicKey</span> <span class="token punctuation">=</span> <span class="token value attr-value">Warp公钥</span>
<span class="token key attr-name">AllowedIPs</span> <span class="token punctuation">=</span> <span class="token value attr-value">0.0.0.0/0</span>
<span class="token key attr-name">AllowedIPs</span> <span class="token punctuation">=</span> <span class="token value attr-value">::/0</span>
<span class="token key attr-name">Endpoint</span> <span class="token punctuation">=</span> <span class="token value attr-value">engage.cloudflareclient.com:2408</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="方法-2" tabindex="-1"><a class="header-anchor" href="#方法-2" aria-hidden="true">#</a> 方法 2：</h4>`,2),h={href:"https://github.com/chise0713/warp-reg.sh",target:"_blank",rel:"noopener noreferrer"},f=e(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>bash -c &quot;$(curl -L warp-reg.vercel.app)&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>输出</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;endpoint&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
       <span class="token property">&quot;v4&quot;</span><span class="token operator">:</span> <span class="token string">&quot;162.159.192.7&quot;</span><span class="token punctuation">,</span>
       <span class="token property">&quot;v6&quot;</span><span class="token operator">:</span> <span class="token string">&quot;[2606:4700:d0::a29f:c007]&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;reserved_dec&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">35</span><span class="token punctuation">,</span> <span class="token number">74</span><span class="token punctuation">,</span> <span class="token number">190</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;reserved_hex&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0x234abe&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;reserved_str&quot;</span><span class="token operator">:</span> <span class="token string">&quot;I0q+&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;private_key&quot;</span><span class="token operator">:</span> <span class="token string">&quot;yL0kApRiZW4VFfNkKAQ/nYxnMFT3AH0dfVkj1GAlr1k=&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;public_key&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;v4&quot;</span><span class="token operator">:</span> <span class="token string">&quot;172.16.0.2&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;v6&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2606:4700:110:81f3:2a5b:3cad:9d4:9ea6&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>拷贝输出的内容</li></ol><h4 id="方法-3" tabindex="-1"><a class="header-anchor" href="#方法-3" aria-hidden="true">#</a> 方法 3：</h4>`,5),_={href:"https://github.com/ArchiveNetwork/wgcf-cli",target:"_blank",rel:"noopener noreferrer"},w=e(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>bash -c &quot;$(curl -L wgcf-cli.vercel.app)&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>运行 <code>wgcf-cli -r</code> 进行注册，输出：</li></ol><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>❯ wgcf-cli -r
<span class="token punctuation">{</span>
    <span class="token property">&quot;endpoint&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;v4&quot;</span><span class="token operator">:</span> <span class="token string">&quot;162.159.192.7:0&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;v6&quot;</span><span class="token operator">:</span> <span class="token string">&quot;[2606:4700:d0::a29f:c007]:0&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;reserved_str&quot;</span><span class="token operator">:</span> <span class="token string">&quot;6nT5&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;reserved_hex&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0xea74f9&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;reserved_dec&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token number">234</span><span class="token punctuation">,</span>
        <span class="token number">116</span><span class="token punctuation">,</span>
        <span class="token number">249</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;private_key&quot;</span><span class="token operator">:</span> <span class="token string">&quot;WIAKvgUlq5fBazhttCvjhEGpu8MmGHcb1H0iHSGlU0Q=&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;public_key&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;addresses&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;v4&quot;</span><span class="token operator">:</span> <span class="token string">&quot;172.16.0.2&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;v6&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2606:4700:110:8d9c:3c4e:2190:59d1:2d3c&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>完整文件将会保存到工作目录的 <code>wgcf.json</code> 内。</li></ul><ol start="3"><li>如果你还拥有一个 warp-plus 的密钥，你还可以运行 <code>wgcf-cli -l [密钥]</code> 进行绑定</li></ol>`,5),x={href:"https://t.me/projectXray/",target:"_blank",rel:"noopener noreferrer"},j=n("code",null,"/keyget@getwarpplusbot",-1),W=e(`<div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>❯ wgcf-cli -l 9zs5I61a-l9j8m7T5-4pC6k20X
<span class="token punctuation">{</span>
    <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cd7f4695-e9ef-4bb0-b412-5f4d84919db7&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;created&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0001-01-01T00:00:00Z&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;updated&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2023-12-14T12:32:18.689777921Z&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;premium_data&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;quota&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;warp_plus&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">&quot;referral_count&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;referral_renewal_countdown&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;role&quot;</span><span class="token operator">:</span> <span class="token string">&quot;child&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>运行 <code>wgcf-cli -g xray</code> 来生成一个WireGurad出站，他会将内容保存到 <code>wgcf.json.xray.json</code> 内</li></ol><ul><li>示例文件：</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wireguard&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;secretKey&quot;</span><span class="token operator">:</span> <span class="token string">&quot;6CRVRLgFwGajnikoVOPTDNZnDhx3EydhPsMgpxHfBCY=&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;172.16.0.2/32&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;2606:4700:110:857a:6a95:fe27:1870:2a9d/128&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;peers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;publicKey&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;allowedIPs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token string">&quot;0.0.0.0/0&quot;</span><span class="token punctuation">,</span>
                    <span class="token string">&quot;::/0&quot;</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token property">&quot;endpoint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;162.159.192.1:2408&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;reserved&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token number">240</span><span class="token punctuation">,</span>
            <span class="token number">25</span><span class="token punctuation">,</span>
            <span class="token number">146</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;mtu&quot;</span><span class="token operator">:</span> <span class="token number">1280</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wireguard&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在服务端分流回国流量至-warp" tabindex="-1"><a class="header-anchor" href="#在服务端分流回国流量至-warp" aria-hidden="true">#</a> 在服务端分流回国流量至 warp</h2><p>在现有出站中新增一个 WireGurad 出站</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wireguard&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;secretKey&quot;</span><span class="token operator">:</span> <span class="token string">&quot;我的私钥&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;172.16.0.2/32&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2606:4700:110:8949:fed8:2642:a640:c8e1/128&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;peers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;publicKey&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Warp公钥&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;endpoint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;engage.cloudflareclient.com:2408&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;reserved&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 如果你有的话，粘贴reserved到这里</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wireguard-1&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>路由策略推荐<code>IPIfNonMatch</code></p><p>在现有路由中新增以下</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>            <span class="token punctuation">{</span>
                <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;domain&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token string">&quot;geosite:cn&quot;</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wireguard-1&quot;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;ip&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token string">&quot;geoip:cn&quot;</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wireguard-1&quot;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="客户端使用-warp-链式代理" tabindex="-1"><a class="header-anchor" href="#客户端使用-warp-链式代理" aria-hidden="true">#</a> 客户端使用 warp 链式代理</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
   <span class="token property">&quot;outbounds&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
         <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span><span class="token string">&quot;wireguard&quot;</span><span class="token punctuation">,</span>
         <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;secretKey&quot;</span><span class="token operator">:</span><span class="token string">&quot;我的私钥&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;peers&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
               <span class="token punctuation">{</span>
                  <span class="token property">&quot;publicKey&quot;</span><span class="token operator">:</span><span class="token string">&quot;Warp公钥&quot;</span><span class="token punctuation">,</span>
                  <span class="token property">&quot;endpoint&quot;</span><span class="token operator">:</span><span class="token string">&quot;engage.cloudflareclient.com:2408&quot;</span>
               <span class="token punctuation">}</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">&quot;reserved&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 如果你有的话，粘贴reserved到这里</span>
         <span class="token punctuation">}</span><span class="token punctuation">,</span>
         <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;sockopt&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
               <span class="token property">&quot;dialerProxy&quot;</span><span class="token operator">:</span><span class="token string">&quot;proxy&quot;</span>
            <span class="token punctuation">}</span>
         <span class="token punctuation">}</span><span class="token punctuation">,</span>
         <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span><span class="token string">&quot;wireguard-1&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
         <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span><span class="token string">&quot;proxy&quot;</span><span class="token punctuation">,</span>
         <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span><span class="token string">&quot;vmess&quot;</span><span class="token punctuation">,</span>
         <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;vnext&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
               <span class="token punctuation">{</span>
                  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span><span class="token string">&quot;我的IP&quot;</span><span class="token punctuation">,</span>
                  <span class="token property">&quot;port&quot;</span><span class="token operator">:</span>我的端口<span class="token punctuation">,</span>
                  <span class="token property">&quot;users&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
                     <span class="token punctuation">{</span>
                        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token string">&quot;我的UUID&quot;</span><span class="token punctuation">,</span>
                        <span class="token property">&quot;security&quot;</span><span class="token operator">:</span><span class="token string">&quot;auto&quot;</span>
                     <span class="token punctuation">}</span>
                  <span class="token punctuation">]</span>
               <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
         <span class="token punctuation">}</span><span class="token punctuation">,</span>
         <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;network&quot;</span><span class="token operator">:</span><span class="token string">&quot;tcp&quot;</span>
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12);function P(I,K){const a=o("ExternalLinkIcon");return l(),c("div",null,[i,r,n("ol",null,[n("li",null,[s("通过近期的一些讨论和"),n("a",d,[s("实验"),t(a)]),s("，我们知道代理回国流量是不安全的。一种应对方式是将回国流量路由至黑洞，它的缺点是由于 geosite 和 geoip 更新的不及时或者新手不知道如何在客户端适当分流，结果流量进入黑洞，影响使用体验。 这时我们只需要将回国流量导入 Cloudflare Warp，可以在不影响使用体验的情况下达到同样的安全性。")]),k,v]),q,n("ol",null,[n("li",null,[s("使用一台 vps，下载 "),n("a",m,[s("wgcf"),t(a)])]),b,g]),y,n("ol",null,[n("li",null,[s("使用 "),n("a",h,[s("warp-reg.sh"),t(a)]),s("，运行：")])]),f,n("ol",null,[n("li",null,[s("使用"),n("a",_,[s("wgcf-cli"),t(a)]),s("，运行以下内容进行安装：")])]),w,n("ul",null,[n("li",null,[s("（密钥可以在"),n("a",x,[s("我们群"),t(a)]),s("里发送 "),j,s(" 获取）输出：")])]),W])}const F=p(u,[["render",P],["__file","warp.html.vue"]]);export{F as default};
