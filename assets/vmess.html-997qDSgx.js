import{_ as u,r as t,o as l,c as i,a as s,d as e,w as a,b as n,e as c}from"./app-eE4giq9J.js";const r={},d=s("h1",{id:"vmess",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#vmess","aria-hidden":"true"},"#"),n(" VMess")],-1),q=c(`<div class="custom-container danger"><p class="custom-container-title">警告</p><p>VMess 依赖于系统时间，请确保使用 Xray 的系统 UTC 时间误差在 120 秒之内，时区无关。在 Linux 系统中可以安装<code>ntp</code>服务来自动同步系统时间。</p></div><h2 id="outboundconfigurationobject" tabindex="-1"><a class="header-anchor" href="#outboundconfigurationobject" aria-hidden="true">#</a> OutboundConfigurationObject</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;vnext&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">37192</span><span class="token punctuation">,</span>
      <span class="token property">&quot;users&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;5783a3e7-e373-51cd-8642-c83782b807c5&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;security&quot;</span><span class="token operator">:</span> <span class="token string">&quot;auto&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
          <span class="token property">&quot;experiments&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>vnext</code>：[ <a href="#serverobject">ServerObject</a> ]</p></blockquote><p>一个数组，包含一组的服务端配置.</p><p>其中每一项是一个服务端配置<a href="#serverobject">ServerObject</a>。</p><h3 id="serverobject" tabindex="-1"><a class="header-anchor" href="#serverobject" aria-hidden="true">#</a> ServerObject</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">37192</span><span class="token punctuation">,</span>
  <span class="token property">&quot;users&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>address</code>: address</p></blockquote><p>服务端地址，支持 IP 地址或者域名。</p><blockquote><p><code>port</code>: number</p></blockquote><p>服务端监听的端口号, 必填。</p><blockquote><p><code>users</code>: [ <a href="#userobject">UserObject</a> ]</p></blockquote><p>一个数组，代表一组服务端认可的用户.</p><p>其中每一项是一个用户<a href="#userobject">UserObject</a>。</p><h4 id="userobject" tabindex="-1"><a class="header-anchor" href="#userobject" aria-hidden="true">#</a> UserObject</h4><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;5783a3e7-e373-51cd-8642-c83782b807c5&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;security&quot;</span><span class="token operator">:</span> <span class="token string">&quot;auto&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;experiments&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>id</code>：string</p></blockquote><p>Vmess 的用户 ID，可以是任意小于 30 字节的字符串, 也可以是一个合法的 UUID.</p><p>自定义字符串和其映射的 UUID 是等价的, 这意味着你将可以这样在配置文件中写 id 来标识同一用户,即</p><ul><li>写 <code>&quot;id&quot;: &quot;我爱🍉老师1314&quot;</code>,</li><li>或写 <code>&quot;id&quot;: &quot;5783a3e7-e373-51cd-8642-c83782b807c5&quot;</code> (此 UUID 是 <code>我爱🍉老师1314</code> 的 UUID 映射)</li></ul>`,21),v={href:"https://github.com/XTLS/Xray-core/issues/158",target:"_blank",rel:"noopener noreferrer"},k=s("p",null,[n("你可以使用命令 "),s("code",null,'xray uuid -i "自定义字符串"'),n(" 生成自定义字符串所映射的的 UUID, 也可以使用命令 "),s("code",null,"xray uuid"),n(" 生成随机的 UUID。")],-1),b=s("blockquote",null,[s("p",null,[s("code",null,"level"),n(": number")])],-1),m=s("code",null,"level",-1),h=c('<blockquote><p><code>security</code>: &quot;aes-128-gcm&quot; | &quot;chacha20-poly1305&quot; | &quot;auto&quot; | &quot;none&quot; | &quot;zero&quot;</p></blockquote><p>加密方式，客户端将使用配置的加密方式发送数据，服务器端自动识别，无需配置。</p><ul><li><code>&quot;aes-128-gcm&quot;</code>：推荐在 PC 上使用</li><li><code>&quot;chacha20-poly1305&quot;</code>：推荐在手机端使用</li><li><code>&quot;auto&quot;</code>：默认值，自动选择（运行框架为 AMD64、ARM64 或 s390x 时为 aes-128-gcm 加密方式，其他情况则为 Chacha20-Poly1305 加密方式）</li><li><code>&quot;none&quot;</code>：不加密</li></ul><ul><li><code>&quot;zero&quot;</code>：不加密，也不进行消息认证 (v1.4.0+)</li></ul><div class="custom-container tip"><p class="custom-container-title">提示</p><p>推荐使用<code>&quot;auto&quot;</code>加密方式，这样可以永久保证安全性和兼容性。</p><p><code>&quot;none&quot;</code> 伪加密方式会计算并验证数据包的校验数据，由于认证算法没有硬件支持，在部分平台可能速度比有硬件加速的 <code>&quot;aes-128-gcm&quot;</code> 还慢。</p><p><code>&quot;zero&quot;</code> 伪加密方式不会加密消息也不会计算数据的校验数据，因此理论上速度会高于其他任何加密方式。实际速度可能受到其他因素影响。</p><p>不推荐在未开启 TLS 加密并强制校验证书的情况下使用 <code>&quot;none&quot;</code> <code>&quot;zero&quot;</code> 伪加密方式。 如果使用 CDN 或其他会解密 TLS 的中转平台或网络环境建立连接，不建议使用 <code>&quot;none&quot;</code> <code>&quot;zero&quot;</code> 伪加密方式。</p><p>无论使用哪种加密方式， VMess 的包头都会受到加密和认证的保护。</p></div><blockquote><p><code>experiments</code>: string</p></blockquote><p>启用的 VMess 协议实验性功能。（此处的功能为不稳定功能， 可能随时被移除）多个启用的实验之间可以用 | 字符分割，如 &quot;AuthenticatedLength|NoTerminationSignal&quot; 。</p><p>&quot;AuthenticatedLength&quot; 启用认证的数据包长度实验。此实验需要同时在客户端与服务器端同时开启，并运行相同版本的程序。</p><p>&quot;NoTerminationSignal&quot; 启用不发送断开连接标致实验。此实验可能会影响被代理的连接的稳定性。</p>',9);function g(_,y){const o=t("RouterLink"),p=t("ExternalLinkIcon");return l(),i("div",null,[d,s("p",null,[e(o,{to:"/development/protocols/vmess.html"},{default:a(()=>[n("VMess")]),_:1}),n(" 是一个加密传输协议，通常作为 Xray 客户端和服务器之间的桥梁。")]),q,s("p",null,[n("其映射标准在 "),s("a",v,[n("VLESS UUID 映射标准：将自定义字符串映射为一个 UUIDv5"),e(p)])]),k,b,s("p",null,[n("用户等级，连接会使用这个用户等级对应的 "),e(o,{to:"/config/policy.html#levelpolicyobject"},{default:a(()=>[n("本地策略")]),_:1}),n("。")]),s("p",null,[n("level 的值, 对应 "),e(o,{to:"/config/policy.html#policyobject"},{default:a(()=>[n("policy")]),_:1}),n(" 中 "),m,n(" 的值。 如不指定, 默认为 0。")]),h])}const f=u(r,[["render",g],["__file","vmess.html.vue"]]);export{f as default};
