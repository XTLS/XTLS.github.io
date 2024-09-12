import{_ as i,r as p,o as c,c as u,a,b as n,d as s,w as e,e as k}from"./app-C6gjWC4s.js";const d={},v=n("h1",{id:"透明代理-tproxy-配置教程",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#透明代理-tproxy-配置教程"},[n("span",null,"透明代理（TProxy）配置教程")])],-1),m={href:"https://guide.v2fly.org/app/tproxy.html",target:"_blank",rel:"noopener noreferrer"},b=n("p",null,"本文中所有配置已在 Raspberry Pi 2B、Ubuntu 20.04 环境下测试成功，如在其它环境中使用请自行调整配置。",-1),q=n("h2",{id:"开始之前",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#开始之前"},[n("span",null,"开始之前")])],-1),g=n("p",null,"请检查您的设备是否有可用的网络连接，且服务端已经配置成功，客户端已经安装完毕。",-1),y={href:"https://github.com/XTLS/Xray-core/discussions/59",target:"_blank",rel:"noopener noreferrer"},f=n("p",null,"这里我想要补充的是，很多透明代理教程会使用 Netfilter 进行分流，使直连流量直接发出而不经过 Xray，这时必须开启 IP 转发；也有的教程，如本文，会将所有流量导入 Xray 之中，由 Xray 的路由模块进行分流，这时无需开启 IP 转发。",-1),h=n("h2",{id:"xray-配置",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#xray-配置"},[n("span",null,"Xray 配置")])],-1),R={href:"https://github.com/Loyalsoldier/v2ray-rules-dat",target:"_blank",rel:"noopener noreferrer"},_=k(`<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">curl</span> <span class="token parameter variable">-oL</span> /usr/local/share/xray/geoip.dat https://github.com/Loyalsoldier/v2ray-rules-dat/releases/latest/download/geoip.dat
<span class="token function">sudo</span> <span class="token function">curl</span> <span class="token parameter variable">-oL</span> /usr/local/share/xray/geosite.dat https://github.com/Loyalsoldier/v2ray-rules-dat/releases/latest/download/geosite.dat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;log&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;loglevel&quot;</span><span class="token operator">:</span> <span class="token string">&quot;warning&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;error&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/var/log/xray/error.log&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;access&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/var/log/xray/access.log&quot;</span>
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
        <span class="token property">&quot;destOverride&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;http&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;tls&quot;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;sockopt&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;tproxy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tproxy&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;outbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;freedom&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;domainStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UseIPv4&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;sockopt&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;mark&quot;</span><span class="token operator">:</span> <span class="token number">2</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;proxy&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vless&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;vnext&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;服务端域名&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">443</span><span class="token punctuation">,</span>
            <span class="token property">&quot;users&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">{</span>
                <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UUID&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;flow&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xtls-rprx-vision&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;encryption&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;security&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xtls&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;sockopt&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;mark&quot;</span><span class="token operator">:</span> <span class="token number">2</span>
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
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;8.8.8.8&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;proxySettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;proxy&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;sockopt&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;mark&quot;</span><span class="token operator">:</span> <span class="token number">2</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;dns&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;hosts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;服务端域名&quot;</span><span class="token operator">:</span> <span class="token string">&quot;服务端 IP&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;servers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;119.29.29.29&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">53</span><span class="token punctuation">,</span>
        <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geosite:cn&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;expectIPs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geoip:cn&quot;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;223.5.5.5&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">53</span><span class="token punctuation">,</span>
        <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geosite:cn&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;expectIPs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geoip:cn&quot;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token string">&quot;8.8.8.8&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;1.1.1.1&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;https+local://doh.dns.sb/dns-query&quot;</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;routing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;domainStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;IPIfNonMatch&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;all-in&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">53</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dns-out&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;ip&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;8.8.8.8&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1.1.1.1&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;proxy&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;domain&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geosite:category-ads-all&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;block&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;domain&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geosite:geolocation-!cn&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;proxy&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;ip&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geoip:telegram&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;proxy&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>本配置会劫持所有发往 53 端口的流量以解决 DNS 污染问题，所以客户端和本机的 DNS 服务器的地址可以随意配置。</p></div><h2 id="策略路由配置" tabindex="-1"><a class="header-anchor" href="#策略路由配置"><span>策略路由配置</span></a></h2><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>sudo ip route add local default dev lo table 100 # 添加路由表 100
sudo ip rule add fwmark 1 table 100 # 为路由表 100 设定规则
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="netfilter-配置" tabindex="-1"><a class="header-anchor" href="#netfilter-配置"><span>Netfilter 配置</span></a></h2><div class="custom-container warning"><p class="custom-container-title">注意</p><p>nftables 配置与 iptables 配置二选一，不可同时使用。</p></div>`,7),A=n("div",{class:"language-nftables line-numbers-mode","data-ext":"nftables","data-title":"nftables"},[n("pre",{class:"language-nftables"},[n("code",null,`#!/usr/sbin/nft -f

flush ruleset

define RESERVED_IP = {
    10.0.0.0/8,
    100.64.0.0/10,
    127.0.0.0/8,
    169.254.0.0/16,
    172.16.0.0/12,
    192.0.0.0/24,
    224.0.0.0/4,
    240.0.0.0/4,
    255.255.255.255/32
}

table ip xray {
        chain prerouting {
                type filter hook prerouting priority mangle; policy accept;
                ip daddr $RESERVED_IP return
                ip daddr 192.168.0.0/16 tcp dport != 53 return
                ip daddr 192.168.0.0/16 udp dport != 53 return
                ip protocol tcp tproxy to 127.0.0.1:12345 meta mark set 1
                ip protocol udp tproxy to 127.0.0.1:12345 meta mark set 1
        }
        chain output {
                type route hook output priority mangle; policy accept;
                ip daddr $RESERVED_IP return
                ip daddr 192.168.0.0/16 tcp dport != 53 return
                ip daddr 192.168.0.0/16 udp dport != 53 return
                meta mark 2 return
                ip protocol tcp meta mark set 1
                ip protocol udp meta mark set 1
        }
}
`)]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),x=n("div",{class:"custom-container tip"},[n("p",{class:"custom-container-title"},"使用方法"),n("p",null,[s("将上述配置写入一个文件（如 "),n("code",null,"nft.conf"),s("），之后将该文件赋予可执行权限，最后使用 root 权限执行该文件即可（"),n("code",null,"# ./nft.conf"),s("）。")])],-1),E=n("div",{class:"language-bash line-numbers-mode","data-ext":"sh","data-title":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[s("iptables "),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-N"),s(` XRAY
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"10.0"),s(".0.0/8 "),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"100.64"),s(".0.0/10 "),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"127.0"),s(".0.0/8 "),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"169.254"),s(".0.0/16 "),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"172.16"),s(".0.0/12 "),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"192.0"),s(".0.0/24 "),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"224.0"),s(".0.0/4 "),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"240.0"),s(".0.0/4 "),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"255.255"),s(".255.255/32 "),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"192.168"),s(".0.0/16 "),n("span",{class:"token parameter variable"},"-p"),s(" tcp "),n("span",{class:"token operator"},"!"),s(),n("span",{class:"token parameter variable"},"--dport"),s(),n("span",{class:"token number"},"53"),s(),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"192.168"),s(".0.0/16 "),n("span",{class:"token parameter variable"},"-p"),s(" udp "),n("span",{class:"token operator"},"!"),s(),n("span",{class:"token parameter variable"},"--dport"),s(),n("span",{class:"token number"},"53"),s(),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY "),n("span",{class:"token parameter variable"},"-p"),s(" tcp "),n("span",{class:"token parameter variable"},"-j"),s(" TPROXY --on-port "),n("span",{class:"token number"},"12345"),s(" --tproxy-mark "),n("span",{class:"token number"},"1"),s(`
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY "),n("span",{class:"token parameter variable"},"-p"),s(" udp "),n("span",{class:"token parameter variable"},"-j"),s(" TPROXY --on-port "),n("span",{class:"token number"},"12345"),s(" --tproxy-mark "),n("span",{class:"token number"},"1"),s(`
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" PREROUTING "),n("span",{class:"token parameter variable"},"-j"),s(` XRAY

iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-N"),s(` XRAY_SELF
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY_SELF "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"10.0"),s(".0.0/8 "),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY_SELF "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"100.64"),s(".0.0/10 "),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY_SELF "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"127.0"),s(".0.0/8 "),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY_SELF "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"169.254"),s(".0.0/16 "),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY_SELF "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"172.16"),s(".0.0/12 "),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY_SELF "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"192.0"),s(".0.0/24 "),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY_SELF "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"224.0"),s(".0.0/4 "),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY_SELF "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"240.0"),s(".0.0/4 "),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY_SELF "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"255.255"),s(".255.255/32 "),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY_SELF "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"192.168"),s(".0.0/16 "),n("span",{class:"token parameter variable"},"-p"),s(" tcp "),n("span",{class:"token operator"},"!"),s(),n("span",{class:"token parameter variable"},"--dport"),s(),n("span",{class:"token number"},"53"),s(),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY_SELF "),n("span",{class:"token parameter variable"},"-d"),s(),n("span",{class:"token number"},"192.168"),s(".0.0/16 "),n("span",{class:"token parameter variable"},"-p"),s(" udp "),n("span",{class:"token operator"},"!"),s(),n("span",{class:"token parameter variable"},"--dport"),s(),n("span",{class:"token number"},"53"),s(),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY_SELF "),n("span",{class:"token parameter variable"},"-m"),s(" mark "),n("span",{class:"token parameter variable"},"--mark"),s(),n("span",{class:"token number"},"2"),s(),n("span",{class:"token parameter variable"},"-j"),s(` RETURN
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY_SELF "),n("span",{class:"token parameter variable"},"-p"),s(" tcp "),n("span",{class:"token parameter variable"},"-j"),s(" MARK --set-mark "),n("span",{class:"token number"},"1"),s(`
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" XRAY_SELF "),n("span",{class:"token parameter variable"},"-p"),s(" udp "),n("span",{class:"token parameter variable"},"-j"),s(" MARK --set-mark "),n("span",{class:"token number"},"1"),s(`
iptables `),n("span",{class:"token parameter variable"},"-t"),s(" mangle "),n("span",{class:"token parameter variable"},"-A"),s(" OUTPUT "),n("span",{class:"token parameter variable"},"-j"),s(` XRAY_SELF
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),T=n("p",null,"配置完成后，将局域网内其它设备的默认网关改为该设备 IP，就可以直接翻墙了。在其它主机和本机皆测试成功后，可进行下一步配置。",-1),S=n("h2",{id:"配置永久化与开机自启",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#配置永久化与开机自启"},[n("span",null,"配置永久化与开机自启")])],-1),X=n("br",null,null,-1),N=n("p",null,[s("首先将已经编辑好的 nftables 配置文件移动到 "),n("code",null,"/etc"),s(" 目录下，并重命名为 "),n("code",null,"nftables.conf"),s("。然后编辑 "),n("code",null,"/lib/systemd/system/nftables.service"),s("。")],-1),j=n("div",{class:"language-ini line-numbers-mode","data-ext":"ini","data-title":"ini"},[n("pre",{class:"language-ini"},[n("code",null,[n("span",{class:"token section"},[n("span",{class:"token punctuation"},"["),n("span",{class:"token section-name selector"},"Unit"),n("span",{class:"token punctuation"},"]")]),s(`
`),n("span",{class:"token key attr-name"},"Description"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"nftables"),s(`
`),n("span",{class:"token key attr-name"},"Documentation"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"man:nft(8) http://wiki.nftables.org"),s(`
`),n("span",{class:"token key attr-name"},"Wants"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"network-pre.target"),s(`
`),n("span",{class:"token key attr-name"},"Before"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"network-pre.target shutdown.target"),s(`
`),n("span",{class:"token key attr-name"},"Conflicts"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"shutdown.target"),s(`
`),n("span",{class:"token key attr-name"},"DefaultDependencies"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"no"),s(`

`),n("span",{class:"token section"},[n("span",{class:"token punctuation"},"["),n("span",{class:"token section-name selector"},"Service"),n("span",{class:"token punctuation"},"]")]),s(`
`),n("span",{class:"token key attr-name"},"Type"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"oneshot"),s(`
`),n("span",{class:"token key attr-name"},"RemainAfterExit"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"yes"),s(`
`),n("span",{class:"token key attr-name"},"StandardInput"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"null"),s(`
`),n("span",{class:"token key attr-name"},"ProtectSystem"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"full"),s(`
`),n("span",{class:"token key attr-name"},"ProtectHome"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"true"),s(`
`),n("span",{class:"token key attr-name"},"ExecStart"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"/usr/sbin/nft -f /etc/nftables.conf ; /usr/sbin/ip route add local default dev lo table 100 ; /usr/sbin/ip rule add fwmark 1 table 100"),s(`
`),n("span",{class:"token key attr-name"},"ExecReload"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"/usr/sbin/nft -f /etc/nftables.conf"),s(`
`),n("span",{class:"token key attr-name"},"ExecStop"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"/usr/sbin/nft flush ruleset ; /usr/sbin/ip route del local default dev lo table 100 ; /usr/sbin/ip rule del table 100"),s(`

`),n("span",{class:"token section"},[n("span",{class:"token punctuation"},"["),n("span",{class:"token section-name selector"},"Install"),n("span",{class:"token punctuation"},"]")]),s(`
`),n("span",{class:"token key attr-name"},"WantedBy"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"sysinit.target"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),Y=n("p",null,"最后 enable 即可。",-1),U=n("p",null,[s("关于 iptables 的永久化，建议直接安装 "),n("code",null,"iptables-persistent"),s("。")],-1),L=n("p",null,[s("安装过程中会提示你选择“是否保存配置”，如果已经将 iptables 配置写入系统，那么此时选择“是”即可；如果尚未写入也没有关系，安装完毕后将配置写入，然后执行 "),n("code",null,"netfilter-persistent save"),s(" 即可（需要 root 权限）。")],-1),I=n("p",null,[s("之后编辑 "),n("code",null,"/lib/systemd/system/netfilter-persistent.service"),s("。")],-1),w=n("div",{class:"language-ini line-numbers-mode","data-ext":"ini","data-title":"ini"},[n("pre",{class:"language-ini"},[n("code",null,[n("span",{class:"token section"},[n("span",{class:"token punctuation"},"["),n("span",{class:"token section-name selector"},"Unit"),n("span",{class:"token punctuation"},"]")]),s(`
`),n("span",{class:"token key attr-name"},"Description"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"netfilter persistent configuration"),s(`
`),n("span",{class:"token key attr-name"},"DefaultDependencies"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"no"),s(`
`),n("span",{class:"token key attr-name"},"Wants"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"network-pre.target systemd-modules-load.service local-fs.target"),s(`
`),n("span",{class:"token key attr-name"},"Before"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"network-pre.target shutdown.target"),s(`
`),n("span",{class:"token key attr-name"},"After"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"systemd-modules-load.service local-fs.target"),s(`
`),n("span",{class:"token key attr-name"},"Conflicts"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"shutdown.target"),s(`
`),n("span",{class:"token key attr-name"},"Documentation"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"man:netfilter-persistent(8)"),s(`

`),n("span",{class:"token section"},[n("span",{class:"token punctuation"},"["),n("span",{class:"token section-name selector"},"Service"),n("span",{class:"token punctuation"},"]")]),s(`
`),n("span",{class:"token key attr-name"},"Type"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"oneshot"),s(`
`),n("span",{class:"token key attr-name"},"RemainAfterExit"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"yes"),s(`
`),n("span",{class:"token key attr-name"},"ExecStart"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"/usr/sbin/netfilter-persistent start ; /usr/sbin/ip route add local default dev lo table 100 ; /usr/sbin/ip rule add fwmark 1 table 100"),s(`
`),n("span",{class:"token key attr-name"},"ExecStop"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"/usr/sbin/netfilter-persistent stop ; /usr/sbin/ip route flush dev lo table 100 ; /usr/sbin/ip rule del table 100"),s(`

`),n("span",{class:"token section"},[n("span",{class:"token punctuation"},"["),n("span",{class:"token section-name selector"},"Install"),n("span",{class:"token punctuation"},"]")]),s(`
`),n("span",{class:"token key attr-name"},"WantedBy"),n("span",{class:"token punctuation"},"="),n("span",{class:"token value attr-value"},"multi-user.target"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1);function P(F,D){const r=p("I18nTip"),o=p("ExternalLinkIcon"),t=p("Tab"),l=p("Tabs");return c(),u("div",null,[v,a(r),n("p",null,[s("本配置基于"),n("a",m,[s("TProxy 透明代理的新 V2Ray 白话文教程"),a(o)]),s("，加入了 Xray 的新特性，使用 VLESS + XTLS Vision 方案，并将旧教程中默认出站代理的分流方式改为默认出站直连，使用者请按照实际情况进行修改。")]),b,q,g,n("p",null,[s("需注意的是，目前很多透明代理教程都会将 Linux 系统的 IP 转发打开，但这样会导致 Splice 性能下降。详情请参考"),n("a",y,[s("大案牍术破案纪实第三篇--我们是如何破解 Splice 性能下降甚至低于 Direct 之谜的"),a(o)]),s("。")]),f,h,n("p",null,[s("为了更好的分流体验，请替换默认路由规则文件为 "),n("a",R,[s("Loyalsoldier/v2ray-rules-dat"),a(o)]),s("，否则 Xray-core 将无法加载本配置。")]),_,a(l,{title:"netfilter"},{default:e(()=>[a(t,{title:"nftables1"},{default:e(()=>[A,x]),_:1}),a(t,{title:"iptables1"},{default:e(()=>[E]),_:1})]),_:1}),T,S,X,a(l,{title:"netfilter2"},{default:e(()=>[a(t,{title:"nftables2"},{default:e(()=>[N,j,Y]),_:1}),a(t,{title:"iptables2"},{default:e(()=>[U,L,I,w]),_:1})]),_:1})])}const B=i(d,[["render",P],["__file","tproxy.html.vue"]]);export{B as default};
