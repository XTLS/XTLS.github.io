import{_ as l,r as p,o as i,c as r,a,b as s,d as n,e as t}from"./app-D4VaaYjY.js";const c={},u=s("h1",{id:"tproxy-透明代理-ipv4-and-ipv6-配置教程",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#tproxy-透明代理-ipv4-and-ipv6-配置教程"},[s("span",null,"TProxy 透明代理（ipv4 and ipv6）配置教程")])],-1),d={href:"https://guide.v2fly.org/app/tproxy.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://xtls.github.io/document/level-2/tproxy.html#%E5%BC%80%E5%A7%8B%E4%B9%8B%E5%89%8D",target:"_blank",rel:"noopener noreferrer"},k={href:"https://xtls.github.io/document/level-2/iptables_gid.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/XTLS/Xray-examples",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/chika0801/Xray-examples",target:"_blank",rel:"noopener noreferrer"},q={href:"https://github.com/lxhao61/integrated-examples",target:"_blank",rel:"noopener noreferrer"},g=t('<div class="custom-container warning"><p class="custom-container-title">注意</p><p>若使用其他配置，你需要着重注意客户端配置中 <code>outbound</code> 中<code>tag</code> 为 <code>proxy</code> 的部分，其他部分不变</p><p>服务端配置也要同时改变</p></div><p>此配置意在解决例如 Netflix 等默认使用 ipv6 连接的网站无法通过旁路由进行代理的问题，或对 ipv6 代理有需要。</p><p>本文网络结构为单臂旁路由</p><p>本文中所有配置已在 Arch Linux (Kernel: 6.0.10) 环境下测试成功，如在其它环境中同理</p><p>注意安装相应程序 <code># sudo apt install iptables ip6tables</code> 或 <code># sudo apt install nftables</code>。</p>',5),y={href:"https://github.com/XTLS/Xray-core/releases/download/v1.7.0/Xray-linux-64.zip",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/XTLS/Xray-install/blob/main/install-release.sh",target:"_blank",rel:"noopener noreferrer"},f=s("code",null,"# chmod 700 install-release.sh",-1),x=s("code",null,"# ./install-release.sh --local Xray-linux-64.zip",-1),R=t(`<h2 id="xray-配置" tabindex="-1"><a class="header-anchor" href="#xray-配置"><span>Xray 配置</span></a></h2><h3 id="客户端配置" tabindex="-1"><a class="header-anchor" href="#客户端配置"><span>客户端配置</span></a></h3><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;log&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;loglevel&quot;</span><span class="token operator">:</span> <span class="token string">&quot;warning&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;inbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;all-in&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">12345</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dokodemo-door&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp,udp&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;followRedirect&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;sniffing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;enabled&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">&quot;destOverride&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;http&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;tls&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;quic&quot;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;sockopt&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;tproxy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tproxy&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;mark&quot;</span><span class="token operator">:</span> <span class="token number">255</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">10808</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;socks&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;sniffing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;enabled&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">&quot;destOverride&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;http&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;tls&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;quic&quot;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;auth&quot;</span><span class="token operator">:</span> <span class="token string">&quot;noauth&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;udp&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;outbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token comment">//此为默认outbound，路由(routing)模块若未匹配到任何规则，则默认走此 proxy 出口，如果你希望直连国内优先请将下面 direct 出口放到 outbound 第一，看不懂可忽略</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;proxy&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vless&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;vnext&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;yourdomain.domain&quot;</span><span class="token punctuation">,</span> <span class="token comment">//改为你自己的域名，直接填写ipv4或ipv6地址也可以</span>
            <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">443</span><span class="token punctuation">,</span>
            <span class="token property">&quot;users&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">{</span>
                <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;uuid&quot;</span><span class="token punctuation">,</span> <span class="token comment">//填写uuid，可通过在终端中输入 xray uuid 生成；此处也支持任意字符串（https://xtls.github.io/config/inbounds/vless.html#clientobject）</span>
                <span class="token property">&quot;encryption&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;flow&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xtls-rprx-vision&quot;</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;sockopt&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;mark&quot;</span><span class="token operator">:</span> <span class="token number">255</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;security&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tls&quot;</span><span class="token punctuation">,</span> <span class="token comment">//注意使用 xtls-rprx-vision 流控此处需为 tls</span>
        <span class="token property">&quot;tlsSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token comment">//注意使用 xtls-rprx-vision 流控此处需为 tlsSettings</span>
          <span class="token property">&quot;allowInsecure&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
          <span class="token property">&quot;serverName&quot;</span><span class="token operator">:</span> <span class="token string">&quot;yourdomain.domain&quot;</span><span class="token punctuation">,</span> <span class="token comment">//改为你自己的域名</span>
          <span class="token property">&quot;fingerprint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;chrome&quot;</span> <span class="token comment">//此设置建议先看下Release, https://github.com/XTLS/Xray-core/releases/tag/v1.7.3</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;freedom&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;domainStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UseIP&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;sockopt&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;mark&quot;</span><span class="token operator">:</span> <span class="token number">255</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;block&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;blackhole&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;response&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;http&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dns-out&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dns&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;sockopt&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;mark&quot;</span><span class="token operator">:</span> <span class="token number">255</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;dns&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;hosts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;domain:googleapis.cn&quot;</span><span class="token operator">:</span> <span class="token string">&quot;googleapis.com&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;dns.google&quot;</span><span class="token operator">:</span> <span class="token string">&quot;8.8.8.8&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;你的VPS域名&quot;</span><span class="token operator">:</span> <span class="token string">&quot;你的VSP IP&quot;</span> <span class="token comment">//如果 outbound 的 proxy 里 address 填的域名：希望代理走ipv4，这里 VPS IP 填VPS的ipv4, 希望代理走ipv6，这里VPS IP 填VPS的ipv6；outbound 的 proxy 里 address 填的 IP，这行不用写。</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;servers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;https://1.1.1.1/dns-query&quot;</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;119.29.29.29&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geosite:cn&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;expectIPs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geoip:cn&quot;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token string">&quot;https://dns.google/dns-query&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;223.5.5.5&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;localhost&quot;</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;routing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;domainMatcher&quot;</span><span class="token operator">:</span> <span class="token string">&quot;mph&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;domainStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;IPIfNonMatch&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;domain&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geosite:category-ads-all&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;block&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;all-in&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">123</span><span class="token punctuation">,</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;udp&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;all-in&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">53</span><span class="token punctuation">,</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;udp&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dns-out&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;ip&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;119.29.29.29&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;223.5.5.5&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;bittorrent&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;ip&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geoip:private&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;geoip:cn&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">//此处可加入 VPS IP 避免 ssh 时被代理</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;domain&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geosite:cn&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;ip&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;1.1.1.1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;8.8.8.8&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;proxy&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;domain&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;geosite:geolocation-!cn&quot;</span><span class="token punctuation">,</span>
          <span class="token string">&quot;domain:googleapis.cn&quot;</span><span class="token punctuation">,</span>
          <span class="token string">&quot;dns.google&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;proxy&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="服务端配置" tabindex="-1"><a class="header-anchor" href="#服务端配置"><span>服务端配置</span></a></h3><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;log&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;loglevel&quot;</span><span class="token operator">:</span> <span class="token string">&quot;warning&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;routing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;domainStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;IPIfNonMatch&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token comment">//阻止 cnip 提高安全性，或者可以将 cn 流量导入 warp 中，详见https://xtls.github.io/document/level-2/warp.html</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;ip&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geoip:cn&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;block&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;inbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">443</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vless&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;clients&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;uuid&quot;</span><span class="token punctuation">,</span> <span class="token comment">//与客户端相同</span>
            <span class="token property">&quot;flow&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xtls-rprx-vision&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;decryption&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;fallbacks&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;dest&quot;</span><span class="token operator">:</span> <span class="token number">8080</span> <span class="token comment">//回落，需要 web 配合，参见白话文，不设置也行</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;security&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tls&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;tlsSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;certificates&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
              <span class="token property">&quot;certificateFile&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/etc/ssl/private/fullchain.crt&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;keyFile&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/etc/ssl/private/crt.key&quot;</span> <span class="token comment">//参照小小白话文将生成的 fullchain.crt 以及 cert.key证书的路径相应填于此处(https://xtls.github.io/document/level-0/ch06-certificates.html#_6-4-%E6%AD%A3%E5%BC%8F%E8%AF%81%E4%B9%A6%E7%94%B3%E8%AF%B7)</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;sniffing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;enabled&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">&quot;destOverride&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;http&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;tls&quot;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;outbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;freedom&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;blackhole&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;block&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="netfilter-配置" tabindex="-1"><a class="header-anchor" href="#netfilter-配置"><span>Netfilter 配置</span></a></h2><h3 id="首先设置策略路由" tabindex="-1"><a class="header-anchor" href="#首先设置策略路由"><span>首先设置策略路由</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 设置策略路由 v4</span>
<span class="token function">ip</span> rule <span class="token function">add</span> fwmark <span class="token number">1</span> table <span class="token number">100</span>
<span class="token function">ip</span> route <span class="token function">add</span> <span class="token builtin class-name">local</span> <span class="token number">0.0</span>.0.0/0 dev lo table <span class="token number">100</span>

<span class="token comment"># 设置策略路由 v6</span>
<span class="token function">ip</span> <span class="token parameter variable">-6</span> rule <span class="token function">add</span> fwmark <span class="token number">1</span> table <span class="token number">106</span>
<span class="token function">ip</span> <span class="token parameter variable">-6</span> route <span class="token function">add</span> <span class="token builtin class-name">local</span> ::/0 dev lo table <span class="token number">106</span>

<span class="token comment"># 直连从主路由发出</span>
<span class="token function">ip</span> route <span class="token function">add</span> default via <span class="token number">192.168</span>.31.1 <span class="token comment">#写主路由 ipv4, 采用局域网设备上网设置方法一可不写此命令</span>
<span class="token function">ip</span> <span class="token parameter variable">-6</span> route <span class="token function">add</span> default via fd00:6868:6868::1 <span class="token comment">#写主路由 ipv6, 采用局域网设备上网设置方法一可不写此命令</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">使用方法</p><p>直接将命令复制到旁路由终端执行</p></div><div class="custom-container tip"><p class="custom-container-title">关于直连从主路由发出</p><p>在旁路由使用命令<code>ip route show</code>，如果使用下属方法一，则<code>default via</code>后应是主路由 ip，无需更改；如使用下述方法二，则<code>default via</code>后应是旁路由 ip，此时直连网站 DNS 解析会回环，造成直连网站无法访问，因此需指定为主路由 ip。</p></div><p>如果是在路由器上指定了默认网关为旁路由（亦即下述“局域网设备上网设置方法二”），那么就需要设置上述 <code># 直连从主路由发出</code> ，除了通过 iproute2 命令行方式设置，也可以通过 dhcpcd 或者 systemctl-network 设置静态 IP，这里以 dhcpcd 为例，编辑 <code>/etc/dhcpcd.conf</code> 文件，在最下方加入如下配置，具体 IP 根据你的实际情况修改，其中 <code>interface</code> 可以通过 <code># ip link show</code> 查看要设定的网口或者无线设备。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>interface enp0s25
static ip_address=192.168.31.100/24
static ip6_address=fd00:6868:6868::8888/64
static routers=192.168.31.1
static domain_name_servers=192.168.31.1 fd00:6868:6868::1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样通过静态 IP 设置 IP 及网关后就无需每次开机设置 <code># 直连从主路由发出</code>。</p><div class="custom-container warning"><p class="custom-container-title">注意</p><p>以下 nftables 配置与 iptables 配置二选一，不可同时使用。</p></div><h3 id="使用-iptables" tabindex="-1"><a class="header-anchor" href="#使用-iptables"><span>使用 iptables</span></a></h3><p>此处配置将 ipv4 与 ipv6 写在同一文件中。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 代理局域网设备 v4</span>
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-N</span> XRAY
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-d</span> <span class="token number">127.0</span>.0.1/32 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-d</span> <span class="token number">224.0</span>.0.0/4 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-d</span> <span class="token number">255.255</span>.255.255/32 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-d</span> <span class="token number">192.168</span>.0.0/16 <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-d</span> <span class="token number">192.168</span>.0.0/16 <span class="token parameter variable">-p</span> udp <span class="token operator">!</span> <span class="token parameter variable">--dport</span> <span class="token number">53</span> <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-j</span> RETURN <span class="token parameter variable">-m</span> mark <span class="token parameter variable">--mark</span> 0xff
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-p</span> udp <span class="token parameter variable">-j</span> TPROXY --on-ip <span class="token number">127.0</span>.0.1 --on-port <span class="token number">12345</span> --tproxy-mark <span class="token number">1</span>
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> TPROXY --on-ip <span class="token number">127.0</span>.0.1 --on-port <span class="token number">12345</span> --tproxy-mark <span class="token number">1</span>
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-j</span> XRAY

<span class="token comment"># 代理局域网设备 v6</span>
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-N</span> XRAY6
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6 <span class="token parameter variable">-d</span> ::1/128 <span class="token parameter variable">-j</span> RETURN
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6 <span class="token parameter variable">-d</span> fe80::/10 <span class="token parameter variable">-j</span> RETURN
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6 <span class="token parameter variable">-d</span> fd00::/8 <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> RETURN
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6 <span class="token parameter variable">-d</span> fd00::/8 <span class="token parameter variable">-p</span> udp <span class="token operator">!</span> <span class="token parameter variable">--dport</span> <span class="token number">53</span> <span class="token parameter variable">-j</span> RETURN
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6 <span class="token parameter variable">-j</span> RETURN <span class="token parameter variable">-m</span> mark <span class="token parameter variable">--mark</span> 0xff
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6 <span class="token parameter variable">-p</span> udp <span class="token parameter variable">-j</span> TPROXY --on-ip ::1 --on-port <span class="token number">12345</span> --tproxy-mark <span class="token number">1</span>
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6 <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> TPROXY --on-ip ::1 --on-port <span class="token number">12345</span> --tproxy-mark <span class="token number">1</span>
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-j</span> XRAY6

<span class="token comment"># 代理网关本机 v4</span>
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-N</span> XRAY_MASK
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_MASK <span class="token parameter variable">-d</span> <span class="token number">224.0</span>.0.0/4 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_MASK <span class="token parameter variable">-d</span> <span class="token number">255.255</span>.255.255/32 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_MASK <span class="token parameter variable">-d</span> <span class="token number">192.168</span>.0.0/16 <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_MASK <span class="token parameter variable">-d</span> <span class="token number">192.168</span>.0.0/16 <span class="token parameter variable">-p</span> udp <span class="token operator">!</span> <span class="token parameter variable">--dport</span> <span class="token number">53</span> <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_MASK <span class="token parameter variable">-j</span> RETURN <span class="token parameter variable">-m</span> mark <span class="token parameter variable">--mark</span> 0xff
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_MASK <span class="token parameter variable">-p</span> udp <span class="token parameter variable">-j</span> MARK --set-mark <span class="token number">1</span>
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_MASK <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> MARK --set-mark <span class="token number">1</span>
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> OUTPUT <span class="token parameter variable">-j</span> XRAY_MASK

<span class="token comment"># 代理网关本机 v6</span>
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-N</span> XRAY6_MASK
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6_MASK <span class="token parameter variable">-d</span> fe80::/10 <span class="token parameter variable">-j</span> RETURN
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6_MASK <span class="token parameter variable">-d</span> fd00::/8 <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> RETURN
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6_MASK <span class="token parameter variable">-d</span> fd00::/8 <span class="token parameter variable">-p</span> udp <span class="token operator">!</span> <span class="token parameter variable">--dport</span> <span class="token number">53</span> <span class="token parameter variable">-j</span> RETURN
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6_MASK <span class="token parameter variable">-j</span> RETURN <span class="token parameter variable">-m</span> mark <span class="token parameter variable">--mark</span> 0xff
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6_MASK <span class="token parameter variable">-p</span> udp <span class="token parameter variable">-j</span> MARK --set-mark <span class="token number">1</span>
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6_MASK <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> MARK --set-mark <span class="token number">1</span>
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> OUTPUT <span class="token parameter variable">-j</span> XRAY6_MASK

<span class="token comment"># 新建 DIVERT 规则，避免已有连接的包二次通过 TPROXY，理论上有一定的性能提升 v4</span>
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-N</span> DIVERT
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> DIVERT <span class="token parameter variable">-j</span> MARK --set-mark <span class="token number">1</span>
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> DIVERT <span class="token parameter variable">-j</span> ACCEPT
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-I</span> PREROUTING <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-m</span> socket <span class="token parameter variable">-j</span> DIVERT

<span class="token comment"># 新建 DIVERT 规则，避免已有连接的包二次通过 TPROXY，理论上有一定的性能提升 v6</span>
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-N</span> DIVERT
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> DIVERT <span class="token parameter variable">-j</span> MARK --set-mark <span class="token number">1</span>
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> DIVERT <span class="token parameter variable">-j</span> ACCEPT
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-I</span> PREROUTING <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-m</span> socket <span class="token parameter variable">-j</span> DIVERT

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">使用方法</p><p>将上述配置写入一个文件（如 <code>iptables.rules</code>），之后将该文件赋予可执行权限<code># chmod 700 ./iptables.rules</code></p><p>最后使用 root 权限执行该文件即可：<code># ./iptables.rules</code>或<code># source iptables.rules</code>。</p></div><h3 id="使用-nftables" tabindex="-1"><a class="header-anchor" href="#使用-nftables"><span>使用 nftables</span></a></h3><p>此处合并 ipv4 与 ipv6</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#!/usr/sbin/nft -f

flush ruleset

table inet xray {
        chain prerouting {
                type filter hook prerouting priority filter; policy accept;
                ip daddr { 127.0.0.0/8, 224.0.0.0/4, 255.255.255.255 } return
                meta l4proto tcp ip daddr 192.168.0.0/16 return
                ip daddr 192.168.0.0/16 udp dport != 53 return
                ip6 daddr { ::1, fe80::/10 } return
                meta l4proto tcp ip6 daddr fd00::/8 return
                ip6 daddr fd00::/8 udp dport != 53 return
                meta mark 0x000000ff return
                meta l4proto { tcp, udp } meta mark set 0x00000001 tproxy ip to 127.0.0.1:12345 accept
                meta l4proto { tcp, udp } meta mark set 0x00000001 tproxy ip6 to [::1]:12345 accept
        }

        chain output {
                type route hook output priority filter; policy accept;
                ip daddr { 127.0.0.0/8, 224.0.0.0/4, 255.255.255.255 } return
                meta l4proto tcp ip daddr 192.168.0.0/16 return
                ip daddr 192.168.0.0/16 udp dport != 53 return
                ip6 daddr { ::1, fe80::/10 } return
                meta l4proto tcp ip6 daddr fd00::/8 return
                ip6 daddr fd00::/8 udp dport != 53 return
                meta mark 0x000000ff return
                meta l4proto { tcp, udp } meta mark set 0x00000001 accept
        }

        chain divert {
                type filter hook prerouting priority mangle; policy accept;
                meta l4proto tcp socket transparent 1 meta mark set 0x00000001 accept
        }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">使用方法</p><p>将上述配置写入一个文件（如 <code>nftables.rules</code>），之后将该文件赋予可执行权限<code># chmod 700 ./nftables.rules</code></p><p>最后使用 root 权限执行该文件即可：<code># ./nftables.rules</code>或<code># source nftables.rules</code></p></div>`,22),A=s("code",null,"192.168.0.0/16",-1),_=s("code",null,"fd00::/8",-1),T=s("code",null,"ip address | grep -w inet | awk '{print $2}'",-1),E=s("code",null,"ip address | grep -w inet6 | awk '{print $2}'",-1),X={href:"https://xtls.github.io/document/level-2/iptables_gid.html#_4-%E8%AE%BE%E7%BD%AE-iptables-%E8%A7%84%E5%88%99",target:"_blank",rel:"noopener noreferrer"},S=t(`<p>或者在 windows 网络设置中查看。</p><p>又或者在路由器“上网设置”中查看。</p><p>如果前缀<code>192.168</code>, <code>fd00:</code>相同可不更改，若不同如 <code>fc00:</code>, <code>fe00:</code> 等则更改为相应值，写法可通过 Goolge 搜索得到如 <code>fc00::/7</code>, <code>fe00::/9</code>。</p><h3 id="开机自动运行-netfilter-配置" tabindex="-1"><a class="header-anchor" href="#开机自动运行-netfilter-配置"><span>开机自动运行 Netfilter 配置</span></a></h3><p>首先确认已经运行过上述相应 Netfilter 命令，并且成功测试透明代理配置，以确保接下来输出正确的文件。</p><h4 id="若使用-iptables-配置" tabindex="-1"><a class="header-anchor" href="#若使用-iptables-配置"><span>若使用 iptables 配置</span></a></h4><ol><li><p>首先通过 <code># iptables-save &gt; /root/iptables.rulesv4</code> <code># ip6tables-save &gt; /root/iptables.rulesv6</code> 将 iptables 配置写入 <code>iptables.rulesv4</code> 和 <code>iptables.rulesv6</code> 文件中</p></li><li><p>然后在 <code>/etc/systemd/system/</code> 目录下创建一个名为 <code>tproxyrules.service</code> 的文件，添加以下内容并保存</p></li></ol><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[Unit]
Description=Tproxy rules

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStartPre=/bin/sh -c &#39;until ping -c1 192.168.31.1; do sleep 1; done;&#39;
ExecStart=/sbin/ip rule add fwmark 1 table 100 ; \\
/sbin/ip -6 rule add fwmark 1 table 106 ; \\
/sbin/ip route add local 0.0.0.0/0 dev lo table 100 ; \\
/sbin/ip -6 route add local ::/0 dev lo table 106 ; \\
/sbin/ip route add default via 192.168.31.1 ; \\
/sbin/ip -6 route add default via fd00:6868:6868::1 ; \\
/sbin/iptables-restore /root/iptables.rulesv4 ; \\
/sbin/ip6tables-restore /root/iptables.rulesv6
ExecStop=/sbin/ip rule del fwmark 1 table 100 ; \\
/sbin/ip -6 rule del fwmark 1 table 106 ; \\
/sbin/ip route del local 0.0.0.0/0 dev lo table 100 ; \\
/sbin/ip -6 route del local ::/0 dev lo table 106 ; \\
/sbin/ip route del default via 192.168.31.1 ; \\
/sbin/ip -6 route del default via fd00:6868:6868::1 ; \\
/sbin/iptables -t mangle -F ; \\
/sbin/ip6tables -t mangle -F

[Install]
WantedBy=multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>最后执行 <code>systemctl enable tproxyrules</code> 命令。</li></ol><h4 id="如果使用-nftables-配置" tabindex="-1"><a class="header-anchor" href="#如果使用-nftables-配置"><span>如果使用 nftables 配置</span></a></h4><ol><li><p>首先通过 <code># nft list ruleset &gt; /root/nftables.rulesv46</code> 将 nftables 配置写入 <code>nftables.rulesv46</code> 文件中</p></li><li><p>在 <code>/etc/systemd/system/</code> 目录下创建一个名为 <code>tproxyrules.service</code> 的文件，然后添加以下内容并保存</p></li></ol><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[Unit]
Description=Tproxy rules

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStartPre=/bin/sh -c &#39;until ping -c1 192.168.31.1; do sleep 1; done;&#39;
ExecStart=/sbin/ip rule add fwmark 1 table 100 ; \\
/sbin/ip -6 rule add fwmark 1 table 106 ; \\
/sbin/ip route add local 0.0.0.0/0 dev lo table 100 ; \\
/sbin/ip -6 route add local ::/0 dev lo table 106 ; \\
/sbin/ip route add default via 192.168.31.1 ; \\
/sbin/ip -6 route add default via fd00:6868:6868::1 ; \\
/sbin/nft -f /root/nftables.rulesv46 ;
ExecStop=/sbin/ip rule del fwmark 1 table 100 ; \\
/sbin/ip -6 rule del fwmark 1 table 106 ; \\
/sbin/ip route del local 0.0.0.0/0 dev lo table 100 ; \\
/sbin/ip -6 route del local ::/0 dev lo table 106 ; \\
/sbin/ip route del default via 192.168.31.1 ; \\
/sbin/ip -6 route del default via fd00:6868:6868::1 ; \\
/sbin/nft flush ruleset

[Install]
WantedBy=multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>最后执行 <code>systemctl enable tproxyrules</code> 命令。</li></ol><div class="custom-container tip"><p class="custom-container-title">tproxyrules.service</p><p>注意其中主路由器 IP 地址，根据实际修改</p><p><code>ExecStartPre=/bin/sh -c &#39;until ping -c1 192.168.31.1; do sleep 1; done;&#39;</code> 命令为确保获得 IP 地址后再执行命令，否则会诡异报错，其中 IP 地址为主路由器地址，根据实际修改。</p></div><div class="custom-container warning"><p class="custom-container-title">注意</p><p>如果通过 dhcpcd 等设置了静态 IP 及网关，则上述相关 <code>ip route add/del</code> 设置需删除</p></div><h2 id="局域网设备上网设置" tabindex="-1"><a class="header-anchor" href="#局域网设备上网设置"><span>局域网设备上网设置</span></a></h2><p>此处假定旁路由 ipv4, ipv6 地址分别为<code>192.168.31.100</code>, <code>fd00:6868:6868::8866</code>, 旁路由的 ipv4, ipv6 地址可由命令<code>ip add</code>获得。</p><h3 id="方法一" tabindex="-1"><a class="header-anchor" href="#方法一"><span>方法一</span></a></h3><p>局域网设备上网有两种方式，第一种就是在使用设备上进行静态 IP 的配置，将网关指向旁路由 IP。注意绝大部分手机仅支持手动配置 ipv4 网关，不支持手动配置 ipv6 网关，除非 root 后进行相关设置。</p><p>以 windows 设备为例，可以先开启 DHCP 记录自动分配的 IP 以参考，然后手写静态配置。</p><div class="custom-container tip"><p class="custom-container-title">DNS 设置</p><p>此配置劫持 DNS 流量，DNS 可以随便写</p></div><p><img width="231" alt="image" src="https://user-images.githubusercontent.com/110686480/208310266-632e36b9-a23b-4b90-aa28-583b50e87c66.png"> <img width="238" alt="image" src="https://user-images.githubusercontent.com/110686480/208309659-e3172218-ef27-4a94-a017-225f8e05b611.png"></p><h3 id="方法二" tabindex="-1"><a class="header-anchor" href="#方法二"><span>方法二</span></a></h3><p>局域网设备上网的第二种方式，是在路由器上进行网关设置，这种方法对于连接到此路由器的设备无需做任何设置即可科学上网，但注意有些路由器不支持 ipv6 的网关设置，有 ipv6 需求的设备仍需在所需设备上单独手动配置 ipv6 相关设置参考方法一。</p><img width="700" alt="image" src="https://user-images.githubusercontent.com/110686480/208310174-2245a890-eb6b-4341-899f-81c6ac8255ff.png"><h2 id="finally" tabindex="-1"><a class="header-anchor" href="#finally"><span>Finally</span></a></h2><p>按照以上方法设置后设备即可双栈访问，进入测试网站比如 https://ipv6-test.com/ 可以看到如下结果 (需要代理此网站才能看到如下结果)</p><img width="700" alt="image" src="https://user-images.githubusercontent.com/110686480/208743723-f8a2751b-43d0-4353-9383-5ae0e00e9449.png"><h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后"><span>写在最后</span></a></h2><p>如今 ipv6 并未完全普及，我们日常访问的流量 99%仍为 ipv4 流量；很多 VPS 商家虽然提供 ipv6 地址，但线路优化非常垃圾，甚至处于不可用状态，为何要加入 ipV6 的设置？</p><p>可以看到目前 ipv6 处于很尴尬的境地，各种设备对于 ipv6 的支持很烂，但是都在逐步完善，同时 Windows 系统对于 ipv6 的优先级也在提高，很多浏览器也会优先进行 ipv6 的解析以及访问，很多网站也开始默认使用 ipv6 进行访问（比如 Netflix, 如果没有配置 ipv6, 浏览器打开 Netflix 会显示 Not Available 是因为没有代理 Netflix 的 ipv6 请求，当然可以选择禁用 Windows 的 ipv6，但支持 ipv6 的 pt 站就无法使用）</p><p>这种情况下 ipv4 无法完全胜任网络冲浪的需求，即使是那 1%的流量，遇到了也会让人头疼不已。</p><p>而可以预见 ipv6 也会逐步与 ipv4 分庭抗礼，所以有必要加入 ipv6 的设置。</p>`,33);function P(N,j){const o=p("I18nTip"),e=p("ExternalLinkIcon");return i(),r("div",null,[u,a(o),s("p",null,[n("本配置参考了"),s("a",d,[n("TProxy 透明代理的新 V2Ray 白话文教程"),a(e)]),n("，"),s("a",v,[n("透明代理（TProxy）配置教程"),a(e)]),n("以及"),s("a",k,[n("透明代理通过 gid 规避 Xray 流量"),a(e)]),n("，加入了透明代理对 ipv6 的支持，并且使用 VLESS-TCP-XTLS-RPRX-Vision 方案对抗封锁 (推荐使用 1.7.2 及之后版本)。")]),s("p",null,[n("关于 Xray 的配置并不是本文重点，使用者可依实际情况进行修改，具体可以参考"),s("a",m,[n("官方文档示例"),a(e)]),n("或其他优秀示例 比如"),s("a",b,[n("@chika0801"),a(e)]),n(" 又如"),s("a",q,[n("@lxhao61"),a(e)]),n("。")]),g,s("p",null,[n("若旁路由未安装 xray 程序，可以手动下载相应 xray 程序如 "),s("a",y,[n("Xray-linux-64.zip"),a(e)]),n(" ，然后复制 "),s("a",h,[n("install-release.sh"),a(e)]),n(" 文件到旁路由，赋予可执行权限 "),f,n("，然后使用 "),x,n(" 根据提示进行本地安装。")]),R,s("p",null,[n("其中，网关地址"),A,n(", "),_,n("等可由"),T,n("以及"),E,s("a",X,[n("获得"),a(e)])]),S])}const I=l(c,[["render",P],["__file","tproxy_ipv4_and_ipv6.html.vue"]]);export{I as default};
