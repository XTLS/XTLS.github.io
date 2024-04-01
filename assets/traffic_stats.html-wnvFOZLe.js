import{_ as t,r as e,o as p,c as o,a as s,b as n,d as l,e as i}from"./app-vz7HvU5a.js";const c={},u=s("h1",{id:"流量统计配置教程",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#流量统计配置教程"},[s("span",null,"流量统计配置教程")])],-1),r={href:"https://guide.v2fly.org/advanced/traffic.html",target:"_blank",rel:"noopener noreferrer"},d=i(`<h2 id="查看流量信息" tabindex="-1"><a class="header-anchor" href="#查看流量信息"><span>查看流量信息</span></a></h2><p>配置方法与 v2fly 一致。 查看流量信息是 xray 命令行的其中一个功能。配置内设置的 api dokodemo-door 端口，即为 <code>--server</code> 参数的端口。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>xray api statsquery <span class="token parameter variable">--server</span><span class="token operator">=</span><span class="token number">127.0</span>.0.1:10085 <span class="token comment">#查看所有流量</span>
xray <span class="token builtin class-name">help</span> api statsquery <span class="token comment">#statsquery 查询匹配的记录</span>
xray <span class="token builtin class-name">help</span> api stats <span class="token comment">#stats 查询一个记录</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出例子：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;stat&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;inbound&gt;&gt;&gt;vmess-quic&gt;&gt;&gt;traffic&gt;&gt;&gt;downlink&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1176&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;user&gt;&gt;&gt;love@example.com&gt;&gt;&gt;traffic&gt;&gt;&gt;downlink&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2040&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;inbound&gt;&gt;&gt;api&gt;&gt;&gt;traffic&gt;&gt;&gt;uplink&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;14247&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;user&gt;&gt;&gt;love@example.com&gt;&gt;&gt;traffic&gt;&gt;&gt;uplink&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2520&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;inbound&gt;&gt;&gt;api&gt;&gt;&gt;traffic&gt;&gt;&gt;downlink&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;87618&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;outbound&gt;&gt;&gt;direct&gt;&gt;&gt;traffic&gt;&gt;&gt;downlink&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;inbound&gt;&gt;&gt;vmess-quic&gt;&gt;&gt;traffic&gt;&gt;&gt;uplink&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1691&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;outbound&gt;&gt;&gt;direct&gt;&gt;&gt;traffic&gt;&gt;&gt;uplink&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="流量信息的处理" tabindex="-1"><a class="header-anchor" href="#流量信息的处理"><span>流量信息的处理</span></a></h2><p>把以下脚本保存到 <code>traffic.sh</code>，注意使用 <code>chmod 755 traffic.sh</code> 授予执行权限。注意调整修改 <code>_APISERVER</code> 一行的连接具体的端口参数。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token assign-left variable">_APISERVER</span><span class="token operator">=</span><span class="token number">127.0</span>.0.1:10085
<span class="token assign-left variable">_XRAY</span><span class="token operator">=</span>/usr/local/bin/xray

<span class="token function-name function">apidata</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">local</span> <span class="token assign-left variable">ARGS</span><span class="token operator">=</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">$1</span> <span class="token operator">==</span> <span class="token string">&quot;reset&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
      <span class="token assign-left variable">ARGS</span><span class="token operator">=</span><span class="token string">&quot;-reset=true&quot;</span>
    <span class="token keyword">fi</span>
    <span class="token variable">$_XRAY</span> api statsquery <span class="token parameter variable">--server</span><span class="token operator">=</span><span class="token variable">$_APISERVER</span> <span class="token string">&quot;<span class="token variable">\${ARGS}</span>&quot;</span> <span class="token punctuation">\\</span>
    <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{
        if (match($1, /&quot;name&quot;:/)) {
            f=1; gsub(/^&quot;|link&quot;|,$/, &quot;&quot;, $2);
            split($2, p,  &quot;&gt;&gt;&gt;&quot;);
            printf &quot;%s:%s-&gt;%s\\t&quot;, p[1],p[2],p[4];
        }
        else if (match($1, /&quot;value&quot;:/) &amp;&amp; f){
          f = 0;
          gsub(/&quot;/, &quot;&quot;, $2);
          printf &quot;%.0f\\n&quot;, $2;
        }
        else if (match($0, /}/) &amp;&amp; f) { f = 0; print 0; }
    }&#39;</span>
<span class="token punctuation">}</span>

<span class="token function-name function">print_sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">local</span> <span class="token assign-left variable">DATA</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$1</span>&quot;</span>
    <span class="token builtin class-name">local</span> <span class="token assign-left variable">PREFIX</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$2</span>&quot;</span>
    <span class="token builtin class-name">local</span> <span class="token assign-left variable">SORTED</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$DATA</span>&quot;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;^<span class="token variable">\${PREFIX}</span>&quot;</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-r</span><span class="token variable">)</span></span>
    <span class="token builtin class-name">local</span> <span class="token assign-left variable">SUM</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$SORTED</span>&quot;</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;
        /-&gt;up/{us+=$2}
        /-&gt;down/{ds+=$2}
        END{
            printf &quot;SUM-&gt;up:\\t%.0f\\nSUM-&gt;down:\\t%.0f\\nSUM-&gt;TOTAL:\\t%.0f\\n&quot;, us, ds, us+ds;
        }&#39;</span><span class="token variable">)</span></span>
    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token variable">\${SORTED}</span><span class="token entity" title="\\n">\\n</span><span class="token variable">\${SUM}</span>&quot;</span> <span class="token punctuation">\\</span>
    <span class="token operator">|</span> numfmt <span class="token parameter variable">--field</span><span class="token operator">=</span><span class="token number">2</span> <span class="token parameter variable">--suffix</span><span class="token operator">=</span>B <span class="token parameter variable">--to</span><span class="token operator">=</span>iec <span class="token punctuation">\\</span>
    <span class="token operator">|</span> <span class="token function">column</span> <span class="token parameter variable">-t</span>
<span class="token punctuation">}</span>

<span class="token assign-left variable">DATA</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>apidata $1<span class="token variable">)</span></span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;------------Inbound----------&quot;</span>
print_sum <span class="token string">&quot;<span class="token variable">$DATA</span>&quot;</span> <span class="token string">&quot;inbound&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;-----------------------------&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;------------Outbound----------&quot;</span>
print_sum <span class="token string">&quot;<span class="token variable">$DATA</span>&quot;</span> <span class="token string">&quot;outbound&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;-----------------------------&quot;</span>
<span class="token builtin class-name">echo</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;-------------User------------&quot;</span>
print_sum <span class="token string">&quot;<span class="token variable">$DATA</span>&quot;</span> <span class="token string">&quot;user&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;-----------------------------&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function v(k,b){const a=e("ExternalLinkIcon");return p(),o("div",null,[u,s("p",null,[n("请熟悉"),s("a",r,[n("流量统计 白话文教程"),l(a)]),n("，本文在其基础上适配了 Xray（1.5.9+）。")]),d])}const g=t(c,[["render",v],["__file","traffic_stats.html.vue"]]);export{g as default};
