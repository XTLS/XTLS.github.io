import{_ as o,r as t,o as l,c as r,a as s,b as n,d as a,e as i}from"./app-yHo85pjB.js";const c={},u=n("h1",{id:"透明代理-tproxy-配置教程",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#透明代理-tproxy-配置教程"},[n("span",null,"透明代理（TProxy）配置教程")])],-1),d={href:"https://guide.v2fly.org/app/tproxy.html",target:"_blank",rel:"noopener noreferrer"},v=n("p",null,"本文中所有配置已在 Raspberry Pi 2B、Ubuntu 20.04 环境下测试成功，如在其它环境中使用请自行调整配置。",-1),k=n("h2",{id:"开始之前",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#开始之前"},[n("span",null,"开始之前")])],-1),m=n("p",null,"请检查您的设备是否有可用的网络连接，且服务端已经配置成功，客户端已经安装完毕。",-1),b={href:"https://github.com/XTLS/Xray-core/discussions/59",target:"_blank",rel:"noopener noreferrer"},q=n("p",null,"这里我想要补充的是，很多透明代理教程会使用 Netfilter 进行分流，使直连流量直接发出而不经过 Xray，这时必须开启 IP 转发；也有的教程，如本文，会将所有流量导入 Xray 之中，由 Xray 的路由模块进行分流，这时无需开启 IP 转发。",-1),g=n("h2",{id:"xray-配置",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#xray-配置"},[n("span",null,"Xray 配置")])],-1),y={href:"https://github.com/Loyalsoldier/v2ray-rules-dat",target:"_blank",rel:"noopener noreferrer"},f=i(`<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">curl</span> <span class="token parameter variable">-oL</span> /usr/local/share/xray/geoip.dat https://github.com/Loyalsoldier/v2ray-rules-dat/releases/latest/download/geoip.dat
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="netfilter-配置" tabindex="-1"><a class="header-anchor" href="#netfilter-配置"><span>Netfilter 配置</span></a></h2><div class="custom-container warning"><p class="custom-container-title">注意</p><p>nftables 配置与 iptables 配置二选一，不可同时使用。</p></div><div class="language-nftables line-numbers-mode" data-ext="nftables" data-title="nftables"><pre class="language-nftables"><code>#!/usr/sbin/nft -f

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">使用方法</p><p>将上述配置写入一个文件（如 <code>nft.conf</code>），之后将该文件赋予可执行权限，最后使用 root 权限执行该文件即可（<code># ./nft.conf</code>）。</p></div><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-N</span> XRAY
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-d</span> <span class="token number">10.0</span>.0.0/8 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-d</span> <span class="token number">100.64</span>.0.0/10 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-d</span> <span class="token number">127.0</span>.0.0/8 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-d</span> <span class="token number">169.254</span>.0.0/16 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-d</span> <span class="token number">172.16</span>.0.0/12 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-d</span> <span class="token number">192.0</span>.0.0/24 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-d</span> <span class="token number">224.0</span>.0.0/4 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-d</span> <span class="token number">240.0</span>.0.0/4 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-d</span> <span class="token number">255.255</span>.255.255/32 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-d</span> <span class="token number">192.168</span>.0.0/16 <span class="token parameter variable">-p</span> tcp <span class="token operator">!</span> <span class="token parameter variable">--dport</span> <span class="token number">53</span> <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-d</span> <span class="token number">192.168</span>.0.0/16 <span class="token parameter variable">-p</span> udp <span class="token operator">!</span> <span class="token parameter variable">--dport</span> <span class="token number">53</span> <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> TPROXY --on-port <span class="token number">12345</span> --tproxy-mark <span class="token number">1</span>
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-p</span> udp <span class="token parameter variable">-j</span> TPROXY --on-port <span class="token number">12345</span> --tproxy-mark <span class="token number">1</span>
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-j</span> XRAY

iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-N</span> XRAY_SELF
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_SELF <span class="token parameter variable">-d</span> <span class="token number">10.0</span>.0.0/8 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_SELF <span class="token parameter variable">-d</span> <span class="token number">100.64</span>.0.0/10 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_SELF <span class="token parameter variable">-d</span> <span class="token number">127.0</span>.0.0/8 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_SELF <span class="token parameter variable">-d</span> <span class="token number">169.254</span>.0.0/16 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_SELF <span class="token parameter variable">-d</span> <span class="token number">172.16</span>.0.0/12 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_SELF <span class="token parameter variable">-d</span> <span class="token number">192.0</span>.0.0/24 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_SELF <span class="token parameter variable">-d</span> <span class="token number">224.0</span>.0.0/4 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_SELF <span class="token parameter variable">-d</span> <span class="token number">240.0</span>.0.0/4 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_SELF <span class="token parameter variable">-d</span> <span class="token number">255.255</span>.255.255/32 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_SELF <span class="token parameter variable">-d</span> <span class="token number">192.168</span>.0.0/16 <span class="token parameter variable">-p</span> tcp <span class="token operator">!</span> <span class="token parameter variable">--dport</span> <span class="token number">53</span> <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_SELF <span class="token parameter variable">-d</span> <span class="token number">192.168</span>.0.0/16 <span class="token parameter variable">-p</span> udp <span class="token operator">!</span> <span class="token parameter variable">--dport</span> <span class="token number">53</span> <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_SELF <span class="token parameter variable">-m</span> mark <span class="token parameter variable">--mark</span> <span class="token number">2</span> <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_SELF <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> MARK --set-mark <span class="token number">1</span>
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_SELF <span class="token parameter variable">-p</span> udp <span class="token parameter variable">-j</span> MARK --set-mark <span class="token number">1</span>
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> OUTPUT <span class="token parameter variable">-j</span> XRAY_SELF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置完成后，将局域网内其它设备的默认网关改为该设备 IP，就可以直接翻墙了。在其它主机和本机皆测试成功后，可进行下一步配置。</p><h2 id="配置永久化与开机自启" tabindex="-1"><a class="header-anchor" href="#配置永久化与开机自启"><span>配置永久化与开机自启</span></a></h2><p>首先将已经编辑好的 nftables 配置文件移动到 <code>/etc</code> 目录下，并重命名为 <code>nftables.conf</code>。然后编辑 <code>/lib/systemd/system/nftables.service</code>。</p><div class="language-ini line-numbers-mode" data-ext="ini" data-title="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Unit</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Description</span><span class="token punctuation">=</span><span class="token value attr-value">nftables</span>
<span class="token key attr-name">Documentation</span><span class="token punctuation">=</span><span class="token value attr-value">man:nft(8) http://wiki.nftables.org</span>
<span class="token key attr-name">Wants</span><span class="token punctuation">=</span><span class="token value attr-value">network-pre.target</span>
<span class="token key attr-name">Before</span><span class="token punctuation">=</span><span class="token value attr-value">network-pre.target shutdown.target</span>
<span class="token key attr-name">Conflicts</span><span class="token punctuation">=</span><span class="token value attr-value">shutdown.target</span>
<span class="token key attr-name">DefaultDependencies</span><span class="token punctuation">=</span><span class="token value attr-value">no</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Service</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Type</span><span class="token punctuation">=</span><span class="token value attr-value">oneshot</span>
<span class="token key attr-name">RemainAfterExit</span><span class="token punctuation">=</span><span class="token value attr-value">yes</span>
<span class="token key attr-name">StandardInput</span><span class="token punctuation">=</span><span class="token value attr-value">null</span>
<span class="token key attr-name">ProtectSystem</span><span class="token punctuation">=</span><span class="token value attr-value">full</span>
<span class="token key attr-name">ProtectHome</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token key attr-name">ExecStart</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/sbin/nft -f /etc/nftables.conf ; /usr/sbin/ip route add local default dev lo table 100 ; /usr/sbin/ip rule add fwmark 1 table 100</span>
<span class="token key attr-name">ExecReload</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/sbin/nft -f /etc/nftables.conf</span>
<span class="token key attr-name">ExecStop</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/sbin/nft flush ruleset ; /usr/sbin/ip route del local default dev lo table 100 ; /usr/sbin/ip rule del table 100</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Install</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">WantedBy</span><span class="token punctuation">=</span><span class="token value attr-value">sysinit.target</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后 enable 即可。</p><p>关于 iptables 的永久化，建议直接安装 <code>iptables-persistent</code>。</p><p>安装过程中会提示你选择“是否保存配置”，如果已经将 iptables 配置写入系统，那么此时选择“是”即可；如果尚未写入也没有关系，安装完毕后将配置写入，然后执行 <code>netfilter-persistent save</code> 即可（需要 root 权限）。</p><p>之后编辑 <code>/lib/systemd/system/netfilter-persistent.service</code>。</p><div class="language-ini line-numbers-mode" data-ext="ini" data-title="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Unit</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Description</span><span class="token punctuation">=</span><span class="token value attr-value">netfilter persistent configuration</span>
<span class="token key attr-name">DefaultDependencies</span><span class="token punctuation">=</span><span class="token value attr-value">no</span>
<span class="token key attr-name">Wants</span><span class="token punctuation">=</span><span class="token value attr-value">network-pre.target systemd-modules-load.service local-fs.target</span>
<span class="token key attr-name">Before</span><span class="token punctuation">=</span><span class="token value attr-value">network-pre.target shutdown.target</span>
<span class="token key attr-name">After</span><span class="token punctuation">=</span><span class="token value attr-value">systemd-modules-load.service local-fs.target</span>
<span class="token key attr-name">Conflicts</span><span class="token punctuation">=</span><span class="token value attr-value">shutdown.target</span>
<span class="token key attr-name">Documentation</span><span class="token punctuation">=</span><span class="token value attr-value">man:netfilter-persistent(8)</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Service</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Type</span><span class="token punctuation">=</span><span class="token value attr-value">oneshot</span>
<span class="token key attr-name">RemainAfterExit</span><span class="token punctuation">=</span><span class="token value attr-value">yes</span>
<span class="token key attr-name">ExecStart</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/sbin/netfilter-persistent start ; /usr/sbin/ip route add local default dev lo table 100 ; /usr/sbin/ip rule add fwmark 1 table 100</span>
<span class="token key attr-name">ExecStop</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/sbin/netfilter-persistent stop ; /usr/sbin/ip route flush dev lo table 100 ; /usr/sbin/ip rule del table 100</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Install</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">WantedBy</span><span class="token punctuation">=</span><span class="token value attr-value">multi-user.target</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19);function R(h,A){const p=t("I18nTip"),e=t("ExternalLinkIcon");return l(),r("div",null,[u,s(p),n("p",null,[a("本配置基于"),n("a",d,[a("TProxy 透明代理的新 V2Ray 白话文教程"),s(e)]),a("，加入了 Xray 的新特性，使用 VLESS + XTLS Vision 方案，并将旧教程中默认出站代理的分流方式改为默认出站直连，使用者请按照实际情况进行修改。")]),v,k,m,n("p",null,[a("需注意的是，目前很多透明代理教程都会将 Linux 系统的 IP 转发打开，但这样会导致 Splice 性能下降。详情请参考"),n("a",b,[a("大案牍术破案纪实第三篇--我们是如何破解 Splice 性能下降甚至低于 Direct 之谜的"),s(e)]),a("。")]),q,g,n("p",null,[a("为了更好的分流体验，请替换默认路由规则文件为 "),n("a",y,[a("Loyalsoldier/v2ray-rules-dat"),s(e)]),a("，否则 Xray-core 将无法加载本配置。")]),f])}const E=o(c,[["render",R],["__file","tproxy.html.vue"]]);export{E as default};
