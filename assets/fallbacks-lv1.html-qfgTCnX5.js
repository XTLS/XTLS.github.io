import{_ as i,r as p,o as r,c as u,a as n,b as s,d as a,w as l,e as o}from"./app-eE4giq9J.js";const d={},k=n("h1",{id:"回落-fallbacks-功能简析",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#回落-fallbacks-功能简析","aria-hidden":"true"},"#"),s(" 回落 (fallbacks) 功能简析")],-1),v=n("p",null,"在使用 Xray 的过程中，你一定无数次的听说了【回落】这个功能。本文就稍微说明一下这个功能的逻辑以及使用方式。",-1),m=n("h2",{id:"_1-回顾《小小白白话文》中的回落",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-回顾《小小白白话文》中的回落","aria-hidden":"true"},"#"),s(" 1. 回顾《小小白白话文》中的回落")],-1),q=n("code",null,"VLESS",-1),b=o(`<div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;inbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">443</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vless&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;clients&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token comment">// ... ...</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;decryption&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;fallbacks&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;dest&quot;</span><span class="token operator">:</span> <span class="token number">8080</span> <span class="token comment">// 默认回落到防探测的代理</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// ... ...</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这一段配置用人话要怎么解释呢？</p>`,2),E=o('<li><p><strong><code>Xray</code> 的入站端口 <code>[inbound port]</code> 是 <code>443</code></strong></p><p>即由 <code>Xray</code> 负责监听 <code>443</code> 端口的 <code>HTTPS</code> 流量</p></li><li><p><strong><code>Xray</code> 的入站协议 <code>[inbound protocol]</code> 是 <code>vless</code></strong></p><p>只有 <code>vless</code> 协议的流量才会流入 <code>Xray</code> 中做后续处理。</p><div class="custom-container warning"><p class="custom-container-title">注意</p><p><strong>注：</strong> <code>VLESS</code> 这个轻量协议开发的初衷就是给 <code>xray</code> 及 <code>v2fly</code> 等核心引入回落功能、并同时减少冗余校验/加密。（当然，到目前为止，<code>xray</code> 中的 <code>trojan</code> 协议也已完整支持回落功能。）</p></div></li><li><p><strong>回落目标端口 <code>[fallback dest]</code> 是 <code>8080</code></strong></p><p><code>Xray</code> 接受 <code>443</code> 端口的访问流量后，属于 <code>vless</code> 协议的流量、由 <code>Xray</code> 进行内部处理并转发至出站模块。而其他非 <code>vless</code> 协议的流量，则转发至 <code>8080</code> 端口。</p><div class="custom-container warning"><p class="custom-container-title">注意</p><p><strong>问：到底是单数还是复数？</strong></p><p>答：一定有聪明的同学发现，配置文件中，明明是复数 <code>inbounds</code>, <code>fallbacks</code>，为什么我解释的时候都是单数：<code>inbound</code>, <code>fallback</code> 呢？</p><p>因为，配置文件中用复数，说明 <code>xray</code> 支持 N 个同等级的元素（即 N 个入站，M 个回落等等），上面的示例解析中仅仅是其中一个，所以我用了单数。</p></div></li><li><p><strong>回落给 <code>8080</code> 端口的流量，由后续程序处理</strong></p><p>小小白白话文中的示例，就是 <code>8080</code> 端口由 <code>Nginx</code> 处理，根据配置找到并展示小熊猫的网页。</p></li>',4),y=n("p",null,[n("strong",null,"总结，小小白白话文示例中的最简单回落，完整数据路线如下：")],-1),g=o('<h2 id="_2-重新认识回落-what-how-v1" tabindex="-1"><a class="header-anchor" href="#_2-重新认识回落-what-how-v1" aria-hidden="true">#</a> 2. 重新认识回落 (WHAT, HOW <code>v1</code>)</h2><p>基于上面的示例，你应该就可以明白什么是回落（What）和怎么回落（How）了，简单地说就是下面这几个要素：</p><ol><li>回落的时间是流量进入 <code>Xray监听端口</code> 后</li><li>回落的依据是 <code>协议类型</code> 等流量特征</li><li>回落的目标是某个 <code>端口</code></li><li>被回落的流量由监听 <code>回落端口</code> 的后续程序接手</li></ol><h2 id="_3-为什么要回落-why-v1" tabindex="-1"><a class="header-anchor" href="#_3-为什么要回落-why-v1" aria-hidden="true">#</a> 3. 为什么要回落 (WHY <code>v1</code>)</h2><p>最初，是为了防御 <strong>【主动探测】</strong> (Active Probing)</p><p><strong>主动探测：</strong> 简单粗暴的理解，就是指外部通过发送特定的网络请求，并解读服务器的回应内容，来推测服务器端是否运行了 <code>xray</code>, <code>v2fly</code>, <code>shadowsocks</code> 等代理工具。一旦可以准确认定，则服务器可能受到干扰或阻断。</p><p>之所以可以根据服务器回应内容进行解读，就是因为一次完整的数据请求，其实有很多数据交换的步骤，每一个步骤，都会产生一些软件特征。用大白话说就是：</p><ul><li>正常的网站的回应，一定【会有】类似 <code>Nginx</code>, <code>Apache</code>, <code>MySQL</code> 的 Web 服务、数据库等工具的特征</li><li>正常的网站的回应，一定【不会有】类似 <code>xray</code>, <code>v2fly</code>, <code>shadowsocks</code> 等代理工具的特征</li></ul><p>于是，当我们给 <code>Xray</code> 提供了【回落】功能后（如上例，回落给 <code>Nginx</code>），面对任何用来探测的请求，产生的结果是：</p><ul><li>探测流量无法掌握你的 <code>VLESS</code> 要素，故都会被回落至 <code>Nginx</code></li><li>探测流量全都回落进入 <code>Nginx</code> ，故 VPS 服务器的回应一定【会有】 <code>Nginx</code> 的特征</li><li>因为 <code>Xray</code> 本身不对探测流量做任何回应 ，所以 VPS 的回应一定【不会有】 <code>Xray</code> 的特征</li></ul><p>至此，【回落】功能就从数据交互逻辑上解决了服务器被 <strong>【主动探测】</strong> 的安全隐患。</p><h2 id="_4-重新认识【回落の完全体】-what-why-how-v2" tabindex="-1"><a class="header-anchor" href="#_4-重新认识【回落の完全体】-what-why-how-v2" aria-hidden="true">#</a> 4. 重新认识【回落の完全体】 (WHAT, WHY, HOW <code>v2</code>)</h2><p>为什么又要再次认识回落呢？ 因为，上面仅仅说清楚了基于“协议”的、抵抗【主动探测】的初版回落。</p>',13),h={href:"https://github.com/rprx",target:"_blank",rel:"noopener noreferrer"},A=n("code",null,"VLESS",-1),_=n("code",null,"fallback",-1),X=n("code",null,"path",-1),x=n("code",null,"alpn",-1),B=o('<p>基于这个开发理念，【回落】功能才逐渐成长为现在的完全体，即完成了 <code>纯伪装 --&gt; ws分流 --&gt; 多协议多特征分流</code> 的进化。最终版甚至完全替代了以前要用 Web 服务器、其他工具才能完成的分流的功能。且由于上述的【回落/分流】处理都在首包判断阶段以毫秒级的速度完成、不涉及任何数据操作，所以几乎没有任何过程损耗。</p><p><strong>因此，现在 <code>Xray</code> 中【完整体的回落功能】，同时具备下述属性：</strong></p><ul><li><strong>安全：</strong> 充分抵御主动探测攻击</li><li><strong>高效：</strong> 几乎毫无性能损失</li><li><strong>灵活：</strong> 数据灵活分流、常用端口复用（如 443）</li></ul><div class="custom-container tip"><p class="custom-container-title">啰嗦君</p><p>这样多轮介绍虽然略显繁琐，但只有这样层层深入展开，才能充分的说明【回落の完全体】独有的强大！</p></div><h2 id="_5-多层回落示例及解读" tabindex="-1"><a class="header-anchor" href="#_5-多层回落示例及解读" aria-hidden="true">#</a> 5. 多层回落示例及解读</h2>',5),S={href:"https://github.com/XTLS/Xray-examples/blob/main/VLESS-TCP-XTLS-WHATEVER/",target:"_blank",rel:"noopener noreferrer"},f=o(`<h3 id="_5-1-首先-我将服务器端配置的-443-监听段摘抄如下" tabindex="-1"><a class="header-anchor" href="#_5-1-首先-我将服务器端配置的-443-监听段摘抄如下" aria-hidden="true">#</a> 5.1 首先，我将服务器端配置的 443 监听段摘抄如下：</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">443</span><span class="token punctuation">,</span>
  <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vless&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;clients&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 填写你的 UUID</span>
        <span class="token property">&quot;flow&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xtls-rprx-vision&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token string">&quot;love@example.com&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;decryption&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;fallbacks&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;dest&quot;</span><span class="token operator">:</span> <span class="token number">1310</span><span class="token punctuation">,</span> <span class="token comment">// 默认回落到 Xray 的 Trojan 协议</span>
        <span class="token property">&quot;xver&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/websocket&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 必须换成自定义的 PATH</span>
        <span class="token property">&quot;dest&quot;</span><span class="token operator">:</span> <span class="token number">1234</span><span class="token punctuation">,</span>
        <span class="token property">&quot;xver&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/vmesstcp&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 必须换成自定义的 PATH</span>
        <span class="token property">&quot;dest&quot;</span><span class="token operator">:</span> <span class="token number">2345</span><span class="token punctuation">,</span>
        <span class="token property">&quot;xver&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/vmessws&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 必须换成自定义的 PATH</span>
        <span class="token property">&quot;dest&quot;</span><span class="token operator">:</span> <span class="token number">3456</span><span class="token punctuation">,</span>
        <span class="token property">&quot;xver&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;security&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tls&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;tlsSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;alpn&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;http/1.1&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;certificates&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;certificateFile&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/path/to/fullchain.crt&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 换成你的证书，绝对路径</span>
          <span class="token property">&quot;keyFile&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/path/to/private.key&quot;</span> <span class="token comment">// 换成你的私钥，绝对路径</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这一段配置用人话要怎么解释呢？</p>`,3),C=o("<li><p><strong><code>Xray</code> 的入站端口 (<code>inbound port</code>) 是 <code>443</code></strong></p><p>即由 <code>Xray</code> 负责监听 <code>443</code> 端口的 <code>HTTPS</code> 流量，并使用 <code>certificates</code> 项下设定的 <code>TLS</code> 证书来进行验证</p></li><li><p><strong><code>Xray</code> 的入站协议 (<code>inbound protocol</code>) 是 <code>vless</code></strong></p><p><code>vless</code> 协议流量直接流入 <code>Xray</code> 中做后续处理</p></li><li><p><strong>非 <code>VLESS</code> 协议流量有 4 个不同的回落目标：</strong></p><ol><li><code>path</code> 为 <code>websocket</code> 的流量，回落给端口 <code>1234</code> 后续处理</li><li><code>path</code> 为 <code>vmesstcp</code> 的流量，回落给端口 <code>2345</code> 后续处理</li><li><code>path</code> 为 <code>vmessws</code> 的流量，回落给端口 <code>3456</code> 后续处理</li><li>其它所有流量，回落给端口 <code>1310</code> 后续处理</li></ol></li><li><p><strong><code>xver</code> 为 <code>1</code> 表示开启 <code>proxy protocol</code> 功能，向后传递来源真实 IP</strong></p></li>",4),T=n("p",null,[n("strong",null,"上述回落结构如下图所示：")],-1),w=n("li",null,[n("p",null,[n("strong",null,"网页回落不见了！")]),n("p",null,[s("没错，聪明的同学应该发现了，防御【主动探测】的 "),n("code",null,"nginx回落"),s(" 不见了！！！这是为什么呢？会不会不安全？别急，我们继续分析：")])],-1),P=o(`<h3 id="_5-2-后续监听处理的配置段摘抄如下" tabindex="-1"><a class="header-anchor" href="#_5-2-后续监听处理的配置段摘抄如下" aria-hidden="true">#</a> 5.2 后续监听处理的配置段摘抄如下：</h3><ol><li><p>后续处理回落至 <code>1310</code> 端口的流量，按照下面的配置验证、处理：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">1310</span><span class="token punctuation">,</span>
  <span class="token property">&quot;listen&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;trojan&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;clients&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;password&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 填写你的密码</span>
        <span class="token property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token string">&quot;love@example.com&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;fallbacks&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;dest&quot;</span><span class="token operator">:</span> <span class="token number">80</span> <span class="token comment">// 或者回落到其它也防探测的代理</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;security&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;tcpSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;acceptProxyProtocol&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看，神奇的事情发生了， <code>trojan</code> 协议这里又出现了一个新的 <code>fallbacks</code>。前面已经说过，<code>xray</code> 中的 <code>trojan</code> 协议也具有完整的回落能力，所以，此时 <code>trojan</code> 协议可以再次做判断和回落（这也就是传说中的套娃回落了）：</p><ul><li>所有 <code>trojan</code> 协议的流量，流入 <code>Xray</code> 中做后续处理</li><li>所有非 <code>trojan</code> 协议的流量，转发至 <code>80</code> 端口，【主动探测】的防御，完成！</li></ul></li><li><p>后续处理回落至 <code>1234</code> 端口的流量，仔细看！它其实是 <code>vless+ws</code>：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">1234</span><span class="token punctuation">,</span>
  <span class="token property">&quot;listen&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vless&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;clients&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 填写你的 UUID</span>
        <span class="token property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token string">&quot;love@example.com&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;decryption&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ws&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;security&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;wsSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;acceptProxyProtocol&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 提醒：若你用 Nginx/Caddy 等反代 WS，需要删掉这行</span>
      <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/websocket&quot;</span> <span class="token comment">// 必须换成自定义的 PATH，需要和分流的一致</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>后续处理回落至 <code>2345</code> 端口的流量，仔细看！它其实是 <code>vmess直连</code>：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">2345</span><span class="token punctuation">,</span>
  <span class="token property">&quot;listen&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vmess&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;clients&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 填写你的 UUID</span>
        <span class="token property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token string">&quot;love@example.com&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;security&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;tcpSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;acceptProxyProtocol&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token property">&quot;header&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;http&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;request&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;/vmesstcp&quot;</span> <span class="token comment">// 必须换成自定义的 PATH，需要和分流的一致</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>后续处理回落至 <code>3456</code> 端口的流量，再仔细看！它其实是是 <code>vmess+ws(+cdn)</code>。</p><div class="custom-container warning"><p class="custom-container-title">说明</p><p>你没看错，这就是 v2fly 曾经推荐的组合之一，并可完整支持 <code>CDN</code>。现已加入完美回落套餐哦！</p></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">3456</span><span class="token punctuation">,</span>
  <span class="token property">&quot;listen&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vmess&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;clients&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 填写你的 UUID</span>
        <span class="token property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token string">&quot;love@example.com&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ws&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;security&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;wsSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;acceptProxyProtocol&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 提醒：若你用 Nginx/Caddy 等反代 WS，需要删掉这行</span>
      <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/vmessws&quot;</span> <span class="token comment">// 必须换成自定义的 PATH，需要和分流的一致</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>至此，我们就能够完整的画出模板的回落路线了：</p></li></ol>`,2),H=n("h2",{id:"_6-结语",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_6-结语","aria-hidden":"true"},"#"),s(" 6. 结语")],-1),F=n("p",null,[s("至此，"),n("code",null,"Xray"),s(" 的【回落】功能就介绍完了。希望本文能够对你理解 "),n("code",null,"Xray"),s(" 的强大有所帮助。")],-1),L=n("h2",{id:"_7-附加题",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_7-附加题","aria-hidden":"true"},"#"),s(" 7. 附加题")],-1),j={href:"https://github.com/XTLS/Xray-examples/blob/main/VLESS-TCP-XTLS-WHATEVER/",target:"_blank",rel:"noopener noreferrer"},N=n("p",null,"提示：HTTP 自动跳转 HTTPS",-1);function D(V,W){const c=p("RouterLink"),t=p("Mermaid"),e=p("ExternalLinkIcon");return r(),u("div",null,[k,v,m,n("p",null,[s("如果你用了《小小白白话文》中的"),a(c,{to:"/document/level-0/ch07-xray-server.html#_7-4-%E9%85%8D%E7%BD%AExray"},{default:l(()=>[s("Xray 配置")]),_:1}),s("，并完成了"),a(c,{to:"/document/level-0/ch07-xray-server.html#_7-8-%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%BC%98%E5%8C%96%E4%B9%8B%E4%BA%8C-%E5%BC%80%E5%90%AFhttp%E8%87%AA%E5%8A%A8%E8%B7%B3%E8%BD%AChttps"},{default:l(()=>[s("HTTP 自动跳转 HTTPS 优化")]),_:1}),s("，那么你已经有了基于 "),q,s(" 协议的简易回落：")]),b,n("ol",null,[E,n("li",null,[y,a(t,{identifier:"mermaid_382ee1e9",graph:"graph%20LR;%0A%0AW(%E5%A4%96%E9%83%A8%20HTTP:80%20%E8%AF%B7%E6%B1%82)%20--%3E%20N80(HTTP:80)%0A%0Asubgraph%20Nginx%20%E5%A4%96%E9%83%A8%E7%9B%91%E5%90%AC%0AN80%20-.-%20N301(301%E8%BD%AC%E5%86%99)%20-.-%20N443(HTTPS:443)%0Aend%0A%0AN443%20--%3E%20X(Xray%20%E7%9B%91%E5%90%AC%20443)%20.-%20X1%7B%E5%85%A5%E7%AB%99%E5%88%A4%E6%96%AD%7D%0AX1%20--%3E%20%7C%E6%8E%A5%E6%94%B6%20VLESS%20%E6%B5%81%E9%87%8F%7C%20X2(Xray%E5%86%85%E9%83%A8%E8%A7%84%E5%88%99)%0AX2%20--%3E%20O(Xray%20Outbounds%20%E5%87%BA%E7%AB%99)%0AX1%20==%3E%20%7C%E5%9B%9E%E8%90%BD%20%E9%9D%9EVLESS%20%E6%B5%81%E9%87%8F%7C%20N8080(Nginx:8080)%0AN8080:::nginxclass%20==%3E%20H(index.html)%0A%0AH:::nginxclass%0AclassDef%20nginxclass%20fill:#FFFFDE%0A%0A"})])]),g,n("p",null,[s("在 "),n("a",h,[s("RPRX"),a(e)]),s(" 不断开发迭代 "),A,s(" 协议及 "),_,s(" 功能的过程中，逐渐发现，回落完全可以更加灵活强大，只要在保证抵抗【主动探测】的前提下，充分利用数据首包中的信息，其实可以做到多元素、多层次的回落。（如 "),X,s(", "),x,s(" 等）")]),B,n("p",null,[s("理解了【回落の完全体】是什么，那就可以动手操作配置多层回落了。其实，项目已经提供了非常完整的示例，即官方模板中的 "),n("a",S,[s("VLESS-TCP-XTLS-WHATEVER"),a(e)]),s("。")]),f,n("ol",null,[C,n("li",null,[T,a(t,{identifier:"mermaid_64a56832",graph:"graph%20LR;%0A%0AW443(%E5%A4%96%E9%83%A8%20HTTP:443%20%E8%AF%B7%E6%B1%82)%20--%3E%20X443(Xray-inbound:%20443)%20.-%20X1%7B%E5%85%A5%E7%AB%99%E5%88%A4%E6%96%AD%7D%0AX1%20--%3E%20%7C%E5%8D%8F%E8%AE%AE%20=%20VLESS%20%E7%9A%84%E6%B5%81%E9%87%8F%7C%20X2(Xray%E5%86%85%E9%83%A8%E8%A7%84%E5%88%99)%0AX2%20--%3E%20O(Xray%20Outbounds%20%E5%87%BA%E7%AB%99)%0A%0AX1%20--%3E%20%7Cpath%20=%20/websocket%20%E7%9A%84%E6%B5%81%E9%87%8F%7C%20X1234(Xray-inbound:1234)%0AX1%20--%3E%20%7Cpath%20=%20/vmesstcp%20%E7%9A%84%E6%B5%81%E9%87%8F%7C%20X2345(Xray-inbound:2345)%0AX1%20--%3E%20%7Cpath%20=%20/vmessws%20%E7%9A%84%E6%B5%81%E9%87%8F%7C%20X3456(Xray-inbound:3456)%0AX1%20--%3E%20%7C%E5%85%B6%E5%AE%83%E6%89%80%E6%9C%89%E6%B5%81%E9%87%8F%7C%20X1310(Xray-inbound:1310)%0A%0A"})]),w]),P,a(t,{identifier:"mermaid_64a5619e",graph:"%20%20%20%20graph%20LR;%0A%0A%20%20%20%20W443(%E5%A4%96%E9%83%A8%20HTTP:443%20%E8%AF%B7%E6%B1%82)%20--%3E%20X443(Xray-inbound:%20443)%20.-%20X1%7B%E5%85%A5%E7%AB%99%E5%88%A4%E6%96%AD%7D%0A%20%20%20%20X1%20--%3E%20%7C%E5%8D%8F%E8%AE%AE%20=%20VLESS%20%E7%9A%84%E6%B5%81%E9%87%8F%7C%20X2(Xray%E5%86%85%E9%83%A8%E8%A7%84%E5%88%99)%0A%20%20%20%20X2%20--%3E%20XO(Xray%20Outbounds%20%E5%87%BA%E7%AB%99)%0A%0A%20%20%20%20X1%20--%3E%20%7Cpath%20=%20/websocket%20%E7%9A%84%E6%B5%81%E9%87%8F%7C%20X1234(Xray-inbound:1234)%0A%20%20%20%20X1%20--%3E%20%7Cpath%20=%20/vmesstcp%20%E7%9A%84%E6%B5%81%E9%87%8F%7C%20X2345(Xray-inbound:2345)%0A%20%20%20%20X1%20--%3E%20%7Cpath%20=%20/vmessws%20%E7%9A%84%E6%B5%81%E9%87%8F%7C%20X3456(Xray-inbound:3456)%0A%20%20%20%20X1%20--%3E%20%7C%E5%85%B6%E5%AE%83%E6%89%80%E6%9C%89%E6%B5%81%E9%87%8F%7C%20X1310(Xray-inbound:1310)%0A%0A%20%20%20%20X1234%20--%3E%20X2%0A%20%20%20%20X2345%20--%3E%20X2%0A%20%20%20%20X3456%20--%3E%20X2%0A%0A%20%20%20%20X1310%20--%3E%20%7C%E5%8D%8F%E8%AE%AE%20=%20trojan%20%E7%9A%84%E6%B5%81%E9%87%8F%7C%20X2%0A%20%20%20%20X1310%20--%3E%20%7C%E5%85%B6%E4%BB%96%E6%89%80%E6%9C%89%E6%B5%81%E9%87%8F%7C%20N80(Nginx:80)%0A%0A%20%20%20%20N80:::nginxclass%20--%3E%20H(index.html)%0A%0A%20%20%20%20H:::nginxclass%0A%20%20%20%20classDef%20nginxclass%20fill:#FFFFDE%0A"}),H,F,L,n("p",null,[s("我再无耻的留一个附加题：本文详解的 "),n("a",j,[s("VLESS-TCP-XTLS-WHATEVER"),a(e)]),s(" 模板？是否有可以优化的地方？")]),N])}const O=i(d,[["render",D],["__file","fallbacks-lv1.html.vue"]]);export{O as default};
