import{_ as i,r as o,o as l,c as u,a,b as s,d as n,w as e,e as r}from"./app-DaULVZ3T.js";const d={},k=s("h1",{id:"配置运行",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#配置运行"},[s("span",null,"配置运行")])],-1),v=s("p",null,[s("a",{href:"./install"},"下载并安装"),n(" 了 Xray 之后，您需要对它进行一下配置。")],-1),m={href:"https://github.com/XTLS/Xray-examples",target:"_blank",rel:"noopener noreferrer"},b=r(`<div class="custom-container danger"><p class="custom-container-title">警告</p><p>为了避免你的流量被解密，<br> 你应该使用 <code>xray uuid</code> 或 <code>uuidgen</code> 生成一个独一无二的uuid <br> 在服务端上，放入 <code>inbounds[0].settings.clients[0].id</code> 内 <br> 在客户端内，放入 <code>outbounds[0].settings.vnext[0].users[0].id</code> 内 <br></p></div><h2 id="服务端配置" tabindex="-1"><a class="header-anchor" href="#服务端配置"><span>服务端配置</span></a></h2><p>你需要一台防火墙外的服务器，来运行服务器端的 Xray。配置如下：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;inbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">10086</span><span class="token punctuation">,</span> <span class="token comment">// 服务器监听端口</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vmess&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;clients&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;b831381d-6324-4d53-ad4f-8cda48b30811&quot;</span>  <span class="token comment">// 记得替换这个字段，使用 \`xray uuid\` 或 \`uuidgen\` 生成</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;outbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;freedom&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务器的配置中需要确保 <code>id</code> 和端口与客户端一致，就可以正常连接了。</p><h2 id="客户端配置" tabindex="-1"><a class="header-anchor" href="#客户端配置"><span>客户端配置</span></a></h2><p>在你的 PC（或手机）中，需要用以下配置运行 Xray ：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;inbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">1080</span><span class="token punctuation">,</span> <span class="token comment">// SOCKS 代理端口，在浏览器中需配置代理并指向这个端口</span>
      <span class="token property">&quot;listen&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;socks&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;udp&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;outbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vmess&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;vnext&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;server&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 服务器地址，请修改为你自己的服务器 ip 或域名</span>
            <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">10086</span><span class="token punctuation">,</span> <span class="token comment">// 服务器端口</span>
            <span class="token property">&quot;users&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">{</span>
                <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;b831381d-6324-4d53-ad4f-8cda48b30811&quot;</span>  <span class="token comment">// 记得替换这个字段，使用 \`xray uuid\` 或 \`uuidgen\` 生成</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;freedom&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;routing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;domainStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;IPOnDemand&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;ip&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geoip:private&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;geoip:cn&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 绕过局域网和国内IP段</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述配置唯一要更改的地方是你的服务器 IP 和用户 uuid，配置中已注明。上述配置会把除局域网（比如访问路由器）和国内IP段（比如访问bilibili、acfun）以外的所有流量转发至你的服务器。</p><h2 id="运行" tabindex="-1"><a class="header-anchor" href="#运行"><span>运行</span></a></h2><ul><li>在 Windows 和 macOS 中，配置文件通常是 Xray 同目录下的 <code>config.json</code> 文件。 <ul><li>直接运行 <code>Xray</code> 或 <code>Xray.exe</code> 即可。</li></ul></li><li>在 Linux 中，配置文件通常位于 <code>/etc/xray/</code> 或 <code>/usr/local/etc/xray/</code> 目录下。 <ul><li>运行 <code>xray run -c /etc/xray/config.json</code></li><li>或使用 systemd 等工具将 Xray 作为服务在后台运行。</li></ul></li></ul>`,11);function q(y,g){const p=o("I18nTip"),c=o("ExternalLinkIcon"),t=o("RouterLink");return l(),u("div",null,[a(p),k,v,s("p",null,[n("为了演示，这里只介绍简单的配置方式。更多的模板: "),s("a",m,[n("Xray-examples"),a(c)])]),s("p",null,[n("如需配置更复杂的功能，请参考更详细的 "),a(t,{to:"/config/"},{default:e(()=>[n("配置文件")]),_:1}),n(" 中相关说明。")]),b,s("p",null,[n("更多详细的说明可以参考 "),a(t,{to:"/config/"},{default:e(()=>[n("配置文档")]),_:1}),n(" 和 "),a(t,{to:"/document/level-0/"},{default:e(()=>[n("小小白话文")]),_:1}),n("。")])])}const _=i(d,[["render",q],["__file","config.html.vue"]]);export{_ as default};
