import{_ as e,r as n,o as s,c as a,a as t,e as c}from"./app-D86FZucm.js";const l={},p=c(`<h1 id="日志配置" tabindex="-1"><a class="header-anchor" href="#日志配置"><span>日志配置</span></a></h1><p>日志配置，控制 Xray 输出日志的方式.</p><p>Xray 有两种日志, 访问日志和错误日志, 你可以分别配置两种日志的输出方式.</p><h2 id="logobject" tabindex="-1"><a class="header-anchor" href="#logobject"><span>LogObject</span></a></h2><p>LogObject 对应配置文件的 <code>log</code> 项。</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;log&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;access&quot;</span><span class="token operator">:</span> <span class="token string">&quot;文件地址&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;error&quot;</span><span class="token operator">:</span> <span class="token string">&quot;文件地址&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;loglevel&quot;</span><span class="token operator">:</span> <span class="token string">&quot;warning&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;dnsLog&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token property">&quot;maskAddress&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>access</code>: string</p></blockquote><p>访问日志的文件地址，其值是一个合法的文件地址，如<code>&quot;/var/log/Xray/access.log&quot;</code>（Linux）或者<code>&quot;C:\\\\Temp\\\\Xray\\\\_access.log&quot;</code>（Windows）。当此项不指定或为空值时，表示将日志输出至 stdout。</p><ul><li>特殊值<code>none</code>，即关闭 access log。</li></ul><blockquote><p><code>error</code>: string</p></blockquote><p>错误日志的文件地址，其值是一个合法的文件地址，如<code>&quot;/var/log/Xray/error.log&quot;</code>（Linux）或者<code>&quot;C:\\\\Temp\\\\Xray\\\\_error.log&quot;</code>（Windows）。当此项不指定或为空值时，表示将日志输出至 stdout。</p><ul><li>特殊值<code>none</code>，即关闭 error log。</li></ul><blockquote><p><code>loglevel</code>: &quot;debug&quot; | &quot;info&quot; | &quot;warning&quot; | &quot;error&quot; | &quot;none&quot;</p></blockquote><p>error 日志的级别, 指示 error 日志需要记录的信息. 默认值为 <code>&quot;warning&quot;</code>。</p><ul><li><code>&quot;debug&quot;</code>：调试程序时用到的输出信息。同时包含所有 <code>&quot;info&quot;</code> 内容。</li><li><code>&quot;info&quot;</code>：运行时的状态信息等，不影响正常使用。同时包含所有 <code>&quot;warning&quot;</code> 内容。</li><li><code>&quot;warning&quot;</code>：发生了一些并不影响正常运行的问题时输出的信息，但有可能影响用户的体验。同时包含所有 <code>&quot;error&quot;</code> 内容。</li><li><code>&quot;error&quot;</code>：Xray 遇到了无法正常运行的问题，需要立即解决。</li><li><code>&quot;none&quot;</code>：不记录任何内容。</li></ul><blockquote><p><code>dnsLog</code>: bool</p></blockquote><p>是否启用 DNS 查询日志，例如：<code>DOH//doh.server got answer: domain.com -&gt; [ip1, ip2] 2.333ms</code></p><blockquote><p><code>maskAddress</code>: string</p></blockquote><p>IP地址遮罩，启用后将自动替换log中出现的IP地址，用于在分享日志时保护隐私，默认为空即不启用。</p><p>目前可选等级 <code>quarter</code> <code>half</code> <code>full</code> 遮罩形式对应如下</p><ul><li>ipv4 <code>1.2.*.*</code> <code>1.*.*.*</code> <code>[Masked IPv4]</code></li><li>ipv6 <code>1234:5678::/32</code> <code>1234::/16</code> <code>[Masked IPv6]</code></li></ul>`,21);function d(r,u){const o=n("I18nTip");return s(),a("div",null,[t(o),p])}const q=e(l,[["render",d],["__file","log.html.vue"]]);export{q as default};
