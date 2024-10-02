import{_ as l,r as o,o as i,c,a,b as n,d as s,e as t}from"./app-D_yyvImn.js";const r="/assets/xray-fallbacks-gLm6MqAx.svg",u="/assets/xray-dns-records-lpau4JTO.webp",d="/assets/cf-api-token-permissions-for-acme-BmGfLU86.webp",v={},k=n("h1",{id:"通过-sni-回落功能实现伪装与按域名分流",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#通过-sni-回落功能实现伪装与按域名分流"},[n("span",null,"通过 SNI 回落功能实现伪装与按域名分流")])],-1),m=t(`<p>VLESS 是一种很轻的协议，和 Trojan 一样，不对流量进行复杂的加密和混淆，而是大隐隐于市，通过 TLS 协议加密，混杂在其他 HTTPS 流量中，在墙内外穿进穿出。为了更好的伪装以应对主动探测，Fallbacks 回落功能随 VLESS 同时出现。这篇教程将演示如何使用 Xray 中 VLESS 入站协议的回落功能配合 Nginx 或 Caddy 在保证伪装完全的前提下实现按域名分流。</p><h2 id="应用情景" tabindex="-1"><a class="header-anchor" href="#应用情景"><span>应用情景</span></a></h2><p>由于 XTLS，Xray 需要监听 443 端口，这导致如果之前有网站运行在服务器上，那么此时网站无法运行或需要运行在其他端口上，这显然是不合理的。有以下三种方案可以解决这个问题：</p><ul><li><p>Xray 监听其他常用端口（如 22、3389、8443）</p><p>这个方案是最简单的，但不够完美。</p></li><li><p>Nginx 或 HAProxy 监听 443 端口，通过 SNI 分流做 L4 反向代理，实现端口复用</p><p>这个方案比较复杂，需要对 Nginx 或 HAProxy 的使用有一定了解，此处不作过多解释。</p></li><li><p>Xray 监听 443 端口，通过 Fallbacks 功能 SNI 分流将网站流量回落到 Nginx 或 Caddy</p><p>这个方案难度适中，也是此教程接下来想要演示的方案。</p></li></ul><h2 id="sni-简介" tabindex="-1"><a class="header-anchor" href="#sni-简介"><span>SNI 简介</span></a></h2><p>服务器名称指示（英语：<strong>S</strong>erver <strong>N</strong>ame <strong>I</strong>ndication，缩写：<strong>SNI</strong>）是 TLS 的一个扩展协议。熟悉反向代理的朋友都知道，如果想要通过域名将流量代理到正确的内容上，需要以下配置：</p><div class="language-nginx line-numbers-mode" data-ext="nginx" data-title="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">proxy_set_header</span> Host 主机名</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这句的作用是将名为 “Host” 的 HTTP Header 设定为某个主机名。为什么要这样做？一般而言，一台服务器对应一个 IP，但却运行多个网站，访问者通过域名查询到 IP 以访问服务器，那么问题来了，如何确定访问者想要访问的是哪一个网站？这需要“基于名称的虚拟主机”。</p><p>当 Web 服务器收到访问请求后，它会查看请求的主机头，使访问者访问正确的网站。然而当 HTTP 协议被 TLS 协议加密后，这种简单的方法就无法实现了。因为 TLS 握手发生在服务器看到任何 HTTP 头之前，因此，服务器不可能使用 HTTP 主机头中的信息来决定呈现哪个证书，更无法决定访问者的访问目标。</p><p>SNI 的原理也很简单，它通过让客户端发送主机名作为 TLS 协商的一部分来解决此问题。所以在使用 Nginx 对 HTTPS 协议进行反向代理时，需要在配置中加入 <code>proxy_ssl_server_name on;</code>，此时 Nginx 会向被代理的服务器发送 SNI 信息，解决了 HTTPS 协议下虚拟主机失效的问题。另外，使用 SNI 时，即使不指定主机头，也可以正确访问网站。</p><h2 id="思路" tabindex="-1"><a class="header-anchor" href="#思路"><span>思路</span></a></h2><p><img src="`+r+'" alt="Xray 回落流程"></p><p>从 443 端口接收到流量后，Xray 会把 TLS 解密后首包长度 &lt; 18、协议版本无效或身份认证失败的流量通过对 name、path、alpn 的匹配转发到 dest 指定的地址。</p><h2 id="添加-dns-记录" tabindex="-1"><a class="header-anchor" href="#添加-dns-记录"><span>添加 DNS 记录</span></a></h2><p><img src="'+u+'" alt="DNS 记录"></p><p>请按实际情况修改域名和 IP。</p><h2 id="申请-tls-证书" tabindex="-1"><a class="header-anchor" href="#申请-tls-证书"><span>申请 TLS 证书</span></a></h2>',17),b=n("code",null,"*.example.com",-1),h=n("code",null,"example.com",-1),q=n("code",null,"*.*.example.com",-1),f={href:"https://zh.wikipedia.org/wiki/%E4%B8%BB%E9%A2%98%E5%A4%87%E7%94%A8%E5%90%8D%E7%A7%B0",target:"_blank",rel:"noopener noreferrer"},y=n("sup",{class:"footnote-ref"},[n("a",{href:"#fn1",id:"fnref1"},"[1]")],-1),g={href:"https://acme.sh",target:"_blank",rel:"noopener noreferrer"},_={href:"https://github.com/acmesh-official/acme.sh/wiki/dnsapi",target:"_blank",rel:"noopener noreferrer"},x={href:"https://dash.cloudflare.com/profile/api-tokens",target:"_blank",rel:"noopener noreferrer"},T=t('<p><img src="'+d+`" alt="API Token 的权限设置"></p><p>权限部分至关重要，其他部分任意。</p><p>创建完毕后，你会得到一串神秘字符，请将其妥善保管到安全且不会丢失的地方，因为它不再会显示。这串字符就是即将用到的 <code>CF_Token</code>。</p><div class="custom-container tip"><p class="custom-container-title">注意</p><p>以下操作需要在 root 用户下进行，使用 sudo 会出现错误。</p></div><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> https://get.acme.sh <span class="token operator">|</span> <span class="token function">sh</span> <span class="token comment"># 安装 acme.sh</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CF_Token</span><span class="token operator">=</span><span class="token string">&quot;sdfsdfsdfljlbjkljlkjsdfoiwje&quot;</span> <span class="token comment"># 设定 API Token 变量</span>
acme.sh <span class="token parameter variable">--issue</span> <span class="token parameter variable">-d</span> example.com <span class="token parameter variable">-d</span> *.example.com <span class="token parameter variable">--dns</span> dns_cf <span class="token comment"># 使用 DNS-01 验证方式申请证书</span>
<span class="token function">mkdir</span> /etc/ssl/xray <span class="token comment"># 新建证书存放目录</span>
acme.sh --install-cert <span class="token parameter variable">-d</span> example.com --fullchain-file /etc/ssl/xray/cert.pem --key-file /etc/ssl/xray/privkey.key <span class="token parameter variable">--reloadcmd</span> <span class="token string">&quot;chown nobody:nogroup -R /etc/ssl/xray &amp;&amp; systemctl restart xray&quot;</span> <span class="token comment"># 安装证书到指定目录并设定自动续签生效指令</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="xray-配置" tabindex="-1"><a class="header-anchor" href="#xray-配置"><span>Xray 配置</span></a></h2><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;log&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;loglevel&quot;</span><span class="token operator">:</span> <span class="token string">&quot;warning&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;inbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">443</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vless&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;clients&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UUID&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;flow&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xtls-rprx-vision&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;decryption&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;fallbacks&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;example.com&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/vmessws&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;dest&quot;</span><span class="token operator">:</span> <span class="token number">5000</span><span class="token punctuation">,</span>
            <span class="token property">&quot;xver&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;dest&quot;</span><span class="token operator">:</span> <span class="token number">5001</span><span class="token punctuation">,</span>
            <span class="token property">&quot;xver&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;alpn&quot;</span><span class="token operator">:</span> <span class="token string">&quot;h2&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;dest&quot;</span><span class="token operator">:</span> <span class="token number">5002</span><span class="token punctuation">,</span>
            <span class="token property">&quot;xver&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;blog.example.com&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;dest&quot;</span><span class="token operator">:</span> <span class="token number">5003</span><span class="token punctuation">,</span>
            <span class="token property">&quot;xver&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;blog.example.com&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;alpn&quot;</span><span class="token operator">:</span> <span class="token string">&quot;h2&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;dest&quot;</span><span class="token operator">:</span> <span class="token number">5004</span><span class="token punctuation">,</span>
            <span class="token property">&quot;xver&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;security&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tls&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;tlsSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;alpn&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;h2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;http/1.1&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token property">&quot;certificates&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
              <span class="token property">&quot;certificateFile&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/etc/ssl/xray/cert.pem&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;keyFile&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/etc/ssl/xray/privkey.key&quot;</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;listen&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">5000</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vmess&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;clients&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UUID&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ws&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wsSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;acceptProxyProtocol&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/vmessws&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;outbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;freedom&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上配置针对于 Nginx，以下是需要注意的一些细节。</p><ul><li><p>有关 Proxy Protocol</p><p>Proxy Protocol 是 HaProxy 开发的一种旨在解决代理时容易丢失客户端信息问题的协议，常用于链式代理和反向代理。传统的处理方法往往较为复杂且有诸多限制，而 Proxy Protocol 非常简单地在传输数据时附带上原始连接四元组信息的数据包，解决了这个问题。</p><p>凡事皆有利弊，Proxy Protocol 也是如此。</p><ul><li>有发送必须有接收，反之亦然</li><li>同一端口不能既兼容带 Proxy Protocol 数据的连接又兼容不带数据的连接（如：Nginx 同端口的不同虚拟主机（server），本质是上一条）<sup class="footnote-ref"><a href="#fn2" id="fnref2">[2]</a></sup><sup class="footnote-ref"><a href="#fn3" id="fnref3">[3]</a></sup></li></ul><p>在遇到异常时，请考虑配置是否符合上述条件。</p><p>此处，我们使用 Proxy Protocol 让被回落到的目标获取到客户端的真实 IP。</p><p>另外，当 Xray 的某个入站配置存在 <code>&quot;acceptProxyProtocol&quot;: true</code> 时，ReadV 将失效。</p></li><li><p>有关 HTTP/2</p><p>首先，<code>inbounds.streamSettings.tlsSettings.alpn</code> 有顺序，应将 <code>h2</code> 放前，<code>http/1.1</code> 放后，在优先使用 HTTP/2 的同时保证兼容性；反过来会导致 HTTP/2 在协商时变为 HTTP/1.1，成为无效配置。</p><p>在上述配置中，每条回落到 Nginx 的配置都要分成两个。这是因为 h2 是强制 TLS 加密的 HTTP/2 连接，这有益于数据在互联网中传输的安全，但在服务器内部没有必要；而 h2c 是非加密的 HTTP/2 连接，适合该环境。然而，Nginx 不能在同一端口上同时监听 HTTP/1.1 和 h2c，为了解决这个问题，需要在回落中指定 <code>alpn</code> 项（是 <code>fallbacks</code> 而不是 <code>tlsSettings</code> 里面的），以尝试匹配 TLS ALPN 协商结果。</p><p>建议 <code>alpn</code> 项只按需用两种填法：<sup class="footnote-ref"><a href="#fn4" id="fnref4">[4]</a></sup></p><ul><li>省略</li><li><code>&quot;h2&quot;</code></li></ul><p>如果使用 Caddy 就大可不必如此繁杂了，因为它<strong>可以</strong>在同一端口上同时监听 HTTP/1.1 和 h2c，配置改动如下：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;fallbacks&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;example.com&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/vmessws&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;dest&quot;</span><span class="token operator">:</span> <span class="token number">5000</span><span class="token punctuation">,</span>
      <span class="token property">&quot;xver&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;dest&quot;</span><span class="token operator">:</span> <span class="token number">5001</span><span class="token punctuation">,</span>
      <span class="token property">&quot;xver&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;blog.example.com&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;dest&quot;</span><span class="token operator">:</span> <span class="token number">5002</span><span class="token punctuation">,</span>
      <span class="token property">&quot;xver&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="nginx-配置" tabindex="-1"><a class="header-anchor" href="#nginx-配置"><span>Nginx 配置</span></a></h2><p>Nginx 将通过官方源进行安装。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token function">curl</span> gnupg2 ca-certificates lsb-release
<span class="token builtin class-name">echo</span> <span class="token string">&quot;deb [arch=amd64] http://nginx.org/packages/ubuntu <span class="token variable"><span class="token variable">\`</span>lsb_release <span class="token parameter variable">-cs</span><span class="token variable">\`</span></span> nginx&quot;</span> <span class="token punctuation">\\</span>
    <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/apt/sources.list.d/nginx.list
<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://nginx.org/keys/nginx_signing.key <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -
<span class="token function">sudo</span> <span class="token function">apt</span> update
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除 <code>/etc/nginx/conf.d/default.conf</code> 并创建 <code>/etc/nginx/conf.d/fallbacks.conf</code>，内容如下：</p><div class="language-nginx line-numbers-mode" data-ext="nginx" data-title="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">set_real_ip_from</span> 127.0.0.1</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">real_ip_header</span> proxy_protocol</span><span class="token punctuation">;</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> 127.0.0.1:5001 proxy_protocol default_server</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">listen</span> 127.0.0.1:5002 proxy_protocol default_server http2</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">root</span> /srv/http/default</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> 127.0.0.1:5003 proxy_protocol</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">listen</span> 127.0.0.1:5004 proxy_protocol http2</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">server_name</span> blog.example.com</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">root</span> /srv/http/blog.example.com</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">return</span> <span class="token number">301</span> https://<span class="token variable">$host</span><span class="token variable">$request_uri</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="caddy-配置" tabindex="-1"><a class="header-anchor" href="#caddy-配置"><span>Caddy 配置</span></a></h2>`,15),w={href:"https://caddyserver.com/docs/install",target:"_blank",rel:"noopener noreferrer"},P=t(`<p>为了使 Caddy 能获取到访问者的真实 IP，需要编译带有 Proxy Protocol 模块的 Caddy。建议直接在 Caddy 官网上在线编译。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">curl</span> <span class="token parameter variable">-o</span> /usr/bin/caddy <span class="token string">&quot;https://caddyserver.com/api/download?os=linux&amp;arch=amd64&amp;p=github.com%2Fmastercactapus%2Fcaddy2-proxyprotocol&amp;idempotency=79074247675458&quot;</span>
<span class="token function">sudo</span> <span class="token function">chmod</span> +x /usr/bin/caddy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>直接替换即可。</p><div class="custom-container tip"><p class="custom-container-title">提示</p><p>建议先通过官网文档安装 Caddy，再替换二进制文件。这样做无需手动设定进程守护。</p></div><p>编辑 <code>/etc/caddy/Caddyfile</code>：</p><div class="language-Caddyfile line-numbers-mode" data-ext="Caddyfile" data-title="Caddyfile"><pre class="language-Caddyfile"><code>{
    servers 127.0.0.1:5001 {
        listener_wrappers {
            proxy_protocol
        }
	protocol {
            allow_h2c
        }
    }
    servers 127.0.0.1:5002 {
        listener_wrappers {
            proxy_protocol
        }
	protocol {
            allow_h2c
        }
    }
}

:5001 {
    root * /srv/http/default
    file_server
    log
    bind 127.0.0.1
}

http://blog.example.com:5002 {
    root * /srv/http/blog.example.com
    file_server
    log
    bind 127.0.0.1
}

:80 {
    redir https://{host}{uri} permanent
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>`,7),S={href:"https://zh.wikipedia.org/wiki/%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%90%8D%E7%A7%B0%E6%8C%87%E7%A4%BA",target:"_blank",rel:"noopener noreferrer"},N={href:"https://github.com/acmesh-official/acme.sh/wiki",target:"_blank",rel:"noopener noreferrer"},L={href:"https://zh.wikipedia.org/wiki/HTTP/2",target:"_blank",rel:"noopener noreferrer"},H=n("h2",{id:"引用",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#引用"},[n("span",null,"引用")])],-1),I=n("hr",{class:"footnotes-sep"},null,-1),C={class:"footnotes"},E={class:"footnotes-list"},A={id:"fn1",class:"footnote-item"},j={href:"https://letsencrypt.org/zh-cn/docs/faq/",target:"_blank",rel:"noopener noreferrer"},B=n("a",{href:"#fnref1",class:"footnote-backref"},"↩︎",-1),D={id:"fn2",class:"footnote-item"},X={href:"https://www.haproxy.com/blog/haproxy/proxy-protocol/",target:"_blank",rel:"noopener noreferrer"},F=n("a",{href:"#fnref2",class:"footnote-backref"},"↩︎",-1),V={id:"fn3",class:"footnote-item"},U={href:"https://www.jianshu.com/p/cc8d592582c9",target:"_blank",rel:"noopener noreferrer"},z=n("a",{href:"#fnref3",class:"footnote-backref"},"↩︎",-1),W={id:"fn4",class:"footnote-item"},R={href:"https://github.com/rprx/v2fly-github-io/blob/master/docs/config/protocols/vless.md",target:"_blank",rel:"noopener noreferrer"},$=n("a",{href:"#fnref4",class:"footnote-backref"},"↩︎",-1);function G(J,M){const p=o("I18nTip"),e=o("ExternalLinkIcon");return i(),c("div",null,[k,a(p),m,n("p",null,[s("由于要对不同前缀的域名进行分流，但一个通配符证书的作用域仅限于两“.”之间（例如：申请 "),b,s("，"),h,s(" 和 "),q,s(" 并不能使用该证书），故需申请 "),n("a",f,[s("SAN"),a(e)]),s(" 通配符证书。根据 Let's Encrypt 官网信息"),y,s("，申请通配符证书要求 DNS-01 验证方式，此处演示 NS 记录为 Cloudflare 的域名通过 "),n("a",g,[s("acme.sh"),a(e)]),s(" 申请 Let's Encrypt 的免费 TLS 证书。使用其他域名托管商的申请方法请阅读 "),n("a",_,[s("dnsapi · acmesh-official/acme.sh Wiki"),a(e)]),s("。")]),n("p",null,[s("首先需要到 "),n("a",x,[s("Cloudflare 面板"),a(e)]),s("创建 API Token。参数如下：")]),T,n("p",null,[s("安装 Caddy 请参阅 "),n("a",w,[s("Install — Caddy Documentation"),a(e)]),s("。")]),P,n("ol",null,[n("li",null,[n("a",S,[s("服务器名称指示 - 维基百科，自由的百科全书"),a(e)])]),n("li",null,[n("a",N,[s("Home · acmesh-official/acme.sh Wiki"),a(e)])]),n("li",null,[n("a",L,[s("HTTP/2 - 维基百科，自由的百科全书"),a(e)])])]),H,I,n("section",C,[n("ol",E,[n("li",A,[n("p",null,[n("a",j,[s("常见问题 - Let's Encrypt - 免费的 SSL/TLS 证书"),a(e)]),s(),B])]),n("li",D,[n("p",null,[n("a",X,[s("Proxy Protocol - HAProxy Technologies"),a(e)]),s(),F])]),n("li",V,[n("p",null,[n("a",U,[s("proxy protocol 介绍及 nginx 配置 - 简书"),a(e)]),s(),z])]),n("li",W,[n("p",null,[n("a",R,[s("v2fly-github-io/vless.md at master · rprx/v2fly-github-io"),a(e)]),s(),$])])])])])}const K=l(v,[["render",G],["__file","fallbacks-with-sni.html.vue"]]);export{K as default};
