"use strict";(self.webpackChunkXray_docs_next=self.webpackChunkXray_docs_next||[]).push([[7858],{7457:(n,s,a)=>{a.r(s),a.d(s,{data:()=>p});const p={key:"v-1e465ab0",path:"/document/level-2/warp.html",title:"通过 Cloudflare Warp 增强代理安全性",lang:"zh-CN",frontmatter:{title:"通过 Cloudflare Warp 增强代理安全性"},excerpt:"",headers:[{level:2,title:"申请 Warp 账户",slug:"申请-warp-账户",children:[]},{level:2,title:"在服务端分流回国流量至 warp",slug:"在服务端分流回国流量至-warp",children:[]},{level:2,title:"客户端使用 warp 链式代理",slug:"客户端使用-warp-链式代理",children:[]}],filePathRelative:"document/level-2/warp.md",git:{updatedTime:1674878153e3,contributors:[{name:"yuhan6665",email:"1588741+yuhan6665@users.noreply.github.com",commits:4},{name:"KoriIku",email:"86508666+KoriIku@users.noreply.github.com",commits:1}]}}},8772:(n,s,a)=>{a.r(s),a.d(s,{default:()=>f});var p=a(6252);const e=(0,p._)("h1",{id:"通过-cloudflare-warp-增强代理安全性",tabindex:"-1"},[(0,p._)("a",{class:"header-anchor",href:"#通过-cloudflare-warp-增强代理安全性","aria-hidden":"true"},"#"),(0,p.Uk)(" 通过 Cloudflare Warp 增强代理安全性")],-1),t=(0,p._)("p",null,"Xray（1.6.5+）新加入了 WireGuard 出站，虽然增加的代码和依赖会增大 core 体积，但是我们认为这是一个很有必要的新功能，原因有三：",-1),o=(0,p.Uk)("通过近期的一些讨论和"),r={href:"https://github.com/net4people/bbs/issues/129#issuecomment-1308102504",target:"_blank",rel:"noopener noreferrer"},l=(0,p.Uk)("实验"),u=(0,p.Uk)("，我们知道代理回国流量是不安全的。一种应对方式是将回国流量路由至黑洞，它的缺点是由于 geosite 和 geoip 更新的不及时或者新手不知道如何在客户端适当分流，结果流量进入黑洞，影响使用体验。 这时我们只需要将回国流量导入 Cloudflare Warp，可以在不影响使用体验的情况下达到同样的安全性。"),c=(0,p._)("li",null,"众所周知，大部分机场会记录用户访问域名的日志，某些机场还会审计和阻断一些用户流量。保护用户私密性的一个方法，就是在客户端使用链式代理。 Warp 使用的 WireGuard 轻量级 VPN 协议会在代理层内增加一层加密。对于机场而言，用户所有流量的目标都是 Warp，从而最大程度保护自己的隐私。",-1),i=(0,p._)("li",null,"方便使用，只需要一个 core 即可完成分流，Wireguard Tun，链式代理的设置。",-1),b=(0,p._)("h2",{id:"申请-warp-账户",tabindex:"-1"},[(0,p._)("a",{class:"header-anchor",href:"#申请-warp-账户","aria-hidden":"true"},"#"),(0,p.Uk)(" 申请 Warp 账户")],-1),k=(0,p._)("li",null,"感谢 Cloudflare 推动自由的互联网，现在你可以免费使用 Warp 服务，连接的时候会根据出口自动选择最近的服务器",-1),m=(0,p.Uk)("使用一台 vps，下载 "),q={href:"https://github.com/ViRb3/wgcf/releases",target:"_blank",rel:"noopener noreferrer"},d=(0,p.Uk)("wgcf"),g=(0,p._)("li",null,[(0,p.Uk)("运行 "),(0,p._)("code",null,"wgcf register"),(0,p.Uk)(" 生成 "),(0,p._)("code",null,"wgcf-account.toml")],-1),y=(0,p._)("li",null,[(0,p.Uk)("运行 "),(0,p._)("code",null,"wgcf generate"),(0,p.Uk)(" 生成 "),(0,p._)("code",null,"wgcf-profile.conf"),(0,p.Uk)(" 拷贝内容如下：")],-1),h=(0,p.uE)('<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[Interface]\nPrivateKey = 我的私钥\nAddress = 172.16.0.2/32\nAddress = 2606:4700:110:8949:fed8:2642:a640:c8e1/128\nDNS = 1.1.1.1\nMTU = 1280\n[Peer]\nPublicKey = Warp公钥\nAllowedIPs = 0.0.0.0/0\nAllowedIPs = ::/0\nEndpoint = engage.cloudflareclient.com:2408\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="在服务端分流回国流量至-warp" tabindex="-1"><a class="header-anchor" href="#在服务端分流回国流量至-warp" aria-hidden="true">#</a> 在服务端分流回国流量至 warp</h2><p>在现有出站中新增一个 WireGurad 出站</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wireguard&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;secretKey&quot;</span><span class="token operator">:</span> <span class="token string">&quot;我的私钥&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;172.16.0.2/32&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2606:4700:110:8949:fed8:2642:a640:c8e1/128&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;peers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        <span class="token property">&quot;publicKey&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Warp公钥&quot;</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;endpoint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;engage.cloudflareclient.com:2408&quot;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">]</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wireguard-1&quot;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>路由策略推荐<code>IPIfNonMatch</code></p><p>在现有路由中新增以下</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>            <span class="token punctuation">{</span>\n                <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>\n                <span class="token property">&quot;domain&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n                    <span class="token string">&quot;geosite:cn&quot;</span>\n                <span class="token punctuation">]</span><span class="token punctuation">,</span>\n                <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wireguard-1&quot;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token punctuation">{</span>\n                <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>\n                <span class="token property">&quot;ip&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n                    <span class="token string">&quot;geoip:cn&quot;</span>\n                <span class="token punctuation">]</span><span class="token punctuation">,</span>\n                <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wireguard-1&quot;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="客户端使用-warp-链式代理" tabindex="-1"><a class="header-anchor" href="#客户端使用-warp-链式代理" aria-hidden="true">#</a> 客户端使用 warp 链式代理</h2><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n   <span class="token property">&quot;outbounds&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n         <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span><span class="token string">&quot;wireguard&quot;</span><span class="token punctuation">,</span>\n         <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>\n            <span class="token property">&quot;secretKey&quot;</span><span class="token operator">:</span><span class="token string">&quot;我的私钥&quot;</span><span class="token punctuation">,</span>\n            <span class="token property">&quot;peers&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>\n               <span class="token punctuation">{</span>\n                  <span class="token property">&quot;publicKey&quot;</span><span class="token operator">:</span><span class="token string">&quot;Warp公钥&quot;</span><span class="token punctuation">,</span>\n                  <span class="token property">&quot;endpoint&quot;</span><span class="token operator">:</span><span class="token string">&quot;engage.cloudflareclient.com:2408&quot;</span>\n               <span class="token punctuation">}</span>\n            <span class="token punctuation">]</span>\n         <span class="token punctuation">}</span><span class="token punctuation">,</span>\n         <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>\n            <span class="token property">&quot;sockopt&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>\n               <span class="token property">&quot;dialerProxy&quot;</span><span class="token operator">:</span><span class="token string">&quot;proxy&quot;</span>\n            <span class="token punctuation">}</span>\n         <span class="token punctuation">}</span><span class="token punctuation">,</span>\n         <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span><span class="token string">&quot;wireguard-1&quot;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n         <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span><span class="token string">&quot;proxy&quot;</span><span class="token punctuation">,</span>\n         <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span><span class="token string">&quot;vmess&quot;</span><span class="token punctuation">,</span>\n         <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>\n            <span class="token property">&quot;vnext&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>\n               <span class="token punctuation">{</span>\n                  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span><span class="token string">&quot;我的IP&quot;</span><span class="token punctuation">,</span>\n                  <span class="token property">&quot;port&quot;</span><span class="token operator">:</span>我的端口<span class="token punctuation">,</span>\n                  <span class="token property">&quot;users&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>\n                     <span class="token punctuation">{</span>\n                        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token string">&quot;我的UUID&quot;</span><span class="token punctuation">,</span>\n                        <span class="token property">&quot;security&quot;</span><span class="token operator">:</span><span class="token string">&quot;auto&quot;</span>\n                     <span class="token punctuation">}</span>\n                  <span class="token punctuation">]</span>\n               <span class="token punctuation">}</span>\n            <span class="token punctuation">]</span>\n         <span class="token punctuation">}</span><span class="token punctuation">,</span>\n         <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>\n            <span class="token property">&quot;network&quot;</span><span class="token operator">:</span><span class="token string">&quot;tcp&quot;</span>\n         <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span>\n   <span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div>',9),f={render:function(n,s){const a=(0,p.up)("OutboundLink");return(0,p.wg)(),(0,p.iD)(p.HY,null,[e,t,(0,p._)("ol",null,[(0,p._)("li",null,[o,(0,p._)("a",r,[l,(0,p.Wm)(a)]),u]),c,i]),b,(0,p._)("ol",null,[k,(0,p._)("li",null,[m,(0,p._)("a",q,[d,(0,p.Wm)(a)])]),g,y]),h],64)}}}}]);