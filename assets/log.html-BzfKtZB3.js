import{_ as e,r as t,o as n,c as a,a as s,e as l}from"./app-Obtp6Ww6.js";const c={},r=l(`<h1 id="log-configuration" tabindex="-1"><a class="header-anchor" href="#log-configuration"><span>Log Configuration</span></a></h1><p>Log configuration controls how Xray outputs logs.</p><p>Xray has two types of logs: access logs and error logs. You can configure the output method for each type of log separately.</p><h2 id="logobject" tabindex="-1"><a class="header-anchor" href="#logobject"><span>LogObject</span></a></h2><p>LogObject corresponds to the <code>log</code> item in the configuration file.</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;log&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;access&quot;</span><span class="token operator">:</span> <span class="token string">&quot;file_path&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;error&quot;</span><span class="token operator">:</span> <span class="token string">&quot;file_path&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;loglevel&quot;</span><span class="token operator">:</span> <span class="token string">&quot;warning&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;dnsLog&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token property">&quot;maskAddress&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>access</code>: string</p></blockquote><p>The file path for the access log. The value is a valid file path, such as <code>&quot;/var/log/Xray/access.log&quot;</code> (Linux) or <code>&quot;C:\\\\Temp\\\\Xray\\\\_access.log&quot;</code> (Windows). When this item is not specified or is an empty value, the log is output to stdout.</p><ul><li>The special value <code>none</code> disables access logs.</li></ul><blockquote><p><code>error</code>: string</p></blockquote><p>The file path for the error log. The value is a valid file path, such as <code>&quot;/var/log/Xray/error.log&quot;</code> (Linux) or <code>&quot;C:\\\\Temp\\\\Xray\\\\_error.log&quot;</code> (Windows). When this item is not specified or is an empty value, the log is output to stdout.</p><ul><li>The special value <code>none</code> disables error logs.</li></ul><blockquote><p><code>loglevel</code>: &quot;debug&quot; | &quot;info&quot; | &quot;warning&quot; | &quot;error&quot; | &quot;none&quot;</p></blockquote><p>The log level for error logs, indicating the information that needs to be recorded. The default value is <code>&quot;warning&quot;</code>.</p><ul><li><code>&quot;debug&quot;</code>: Output information used for debugging the program. Includes all <code>&quot;info&quot;</code> content.</li><li><code>&quot;info&quot;</code>: Runtime status information, etc., which does not affect normal use. Includes all <code>&quot;warning&quot;</code> content.</li><li><code>&quot;warning&quot;</code>: Information output when there are some problems that do not affect normal operation but may affect user experience. Includes all <code>&quot;error&quot;</code> content.</li><li><code>&quot;error&quot;</code>: Xray encountered a problem that cannot be run normally and needs to be resolved immediately.</li><li><code>&quot;none&quot;</code>: Do not record any content.</li></ul><blockquote><p><code>dnsLog</code>: bool</p></blockquote><p>Whether to enable DNS query logs, for example: <code>DOH//doh.server got answer: domain.com -&gt; [ip1, ip2] 2.333ms</code>.</p><blockquote><p><code>maskAddress</code>: &quot;quarter&quot; | &quot;half&quot; | &quot;full&quot;</p></blockquote><p>IP address masking, when enabled, will automatically replace the IP address appearing in the log. It is used to protect privacy when sharing logs. The default is empty and is not enabled.</p><p>Currently available levels are <code>quarter</code>, <code>half</code>, <code>full</code>. The mask form corresponds to the following:</p><ul><li>ipv4 <code>1.2.*.*</code> <code>1.*.*.*</code> <code>[Masked IPv4]</code></li><li>ipv6 <code>1234:5678::/32</code> <code>1234::/16</code> <code>[Masked IPv6]</code></li></ul>`,21);function u(i,p){const o=t("I18nTip");return n(),a("div",null,[s(o),r])}const q=e(c,[["render",u],["__file","log.html.vue"]]);export{q as default};
