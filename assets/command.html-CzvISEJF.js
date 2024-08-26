import{_ as d,r as a,o as l,c as r,a as s,b as e,w as c,d as n,e as o}from"./app-Cm_VB5CF.js";const v={},u=o(`<h1 id="命令参数" tabindex="-1"><a class="header-anchor" href="#命令参数"><span>命令参数</span></a></h1><div class="custom-container tip"><p class="custom-container-title">提示</p><p>Xray 使用 Go 风格的命令及参数</p></div><h2 id="获取基本命令" tabindex="-1"><a class="header-anchor" href="#获取基本命令"><span>获取基本命令</span></a></h2><p>您可以运行 <code>xray help</code> 来获得所有 xray 最基础的用法, 以及可用的命令及说明。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Xray is a platform for building proxies.

Usage:

        xray &lt;command&gt; [arguments]

The commands are:

        run          Run Xray with config, the default command
        version      Show current version of Xray
        api          Call an API in an Xray process
        convert      Convert configs
        tls          TLS tools
        uuid         Generate UUIDv4 or UUIDv5
        x25519       Generate key pair for x25519 key exchange
        wg           Generate key pair for wireguard key exchange

Use &quot;xray help &lt;command&gt;&quot; for more information about a command.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="xray-run" tabindex="-1"><a class="header-anchor" href="#xray-run"><span>xray run</span></a></h3><p>指定一个或多个配置文件，并运行。</p><p>使用方法:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code> xray run [-c config.json] [-confdir dir]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Run Xray with config, the default command.

The -config=file, -c=file flags set the config files for 
Xray. Multiple assign is accepted.

The -confdir=dir flag sets a dir with multiple json config

The -format=json flag sets the format of config files. 
Default &quot;auto&quot;.

The -test flag tells Xray to test config files only, 
without launching the server.

The -dump flag tells Xray to print the merged config.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>-config=</code> / <code>-c=</code> 用于指定使用的配置文件的位置，支持多文件配置。 <code>-confdir=</code> 用于指定一个包含多个配置文件的文件夹。 <code>-format=</code> 用于指定使用的配置文件的格式。 <code>-test</code> 用于测试配置文件的合法性。 <code>-dump</code> 用于显示多文件配置文件合并之后的效果。</p><div class="custom-container tip"><p class="custom-container-title">提示</p><p>配置文件除了默认的 JSON 格式外，也可以使用 TOML 和 YAML。在不指定格式的前提下会通过文件扩展名识别。</p></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code> xray run -dump
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>用以输出多文件配置融合之后的结果。</p><h3 id="xray-version" tabindex="-1"><a class="header-anchor" href="#xray-version"><span>xray version</span></a></h3><p>输出 Xray 版本、 Golang 版本等信息。</p><p>使用方法:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code> xray version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="xray-api" tabindex="-1"><a class="header-anchor" href="#xray-api"><span>xray api</span></a></h3><p>调用 Xray 的 gRPC API，需要在配置文件中开启。</p><p>使用方法:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>xray api &lt;command&gt; [arguments]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>        restartlogger Restart the logger
        stats         Get statistics
        statsquery    Query statistics
        statssys      Get system statistics
        adi           Add inbounds
        ado           Add outbounds
        rmi           Remove inbounds
        rmo           Remove outbounds
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="xray-convert" tabindex="-1"><a class="header-anchor" href="#xray-convert"><span>xray convert</span></a></h3><p>把配置文件转换成 protobuf 或者把 typedMessage 转换成 json</p><p>使用方法:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>xray convert &lt;command&gt; [arguments]

The commands are:

        pb           Convert multiple json configs to protobuf
        json         Convert typedMessage to json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>pb 子命令使用示例：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 用法：xray convert pb [-debug] [-type] [json file] [json file] ...</span>

<span class="token comment"># 把三个配置合并成 mix.pb</span>
xray convert pb c1.json c2.json c3.json <span class="token operator">&gt;</span> mix.pb

<span class="token comment"># 使用 -debug 选项查看 mix.pb 的内容</span>
xray convert pb <span class="token parameter variable">-debug</span> mix.pb

<span class="token comment"># 使用 mix.pb 启动 Xray-core</span>
xray <span class="token parameter variable">-c</span> mix.pb

<span class="token comment"># 详细说明</span>
xray <span class="token builtin class-name">help</span> convert pb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>json 子命令使用示例：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 用法：xray convert json [-type] [stdin:] [typedMessage file]</span>

<span class="token assign-left variable">tmsg</span><span class="token operator">=</span><span class="token string">&#39;{
  &quot;type&quot;: &quot;xray.proxy.shadowsocks.Account&quot;,
  &quot;value&quot;: &quot;CgMxMTEQBg==&quot;
}&#39;</span>

<span class="token builtin class-name">echo</span> <span class="token variable">\${tmsg}</span> <span class="token operator">|</span> xray convert json stdin:

<span class="token comment"># 上面这个命令的输出结果是：</span>
<span class="token string">&#39;{
  &quot;cipherType&quot;: &quot;AES_256_GCM&quot;,
  &quot;password&quot;: &quot;111&quot;
}&#39;</span>

<span class="token comment"># 详细说明</span>
xray <span class="token builtin class-name">help</span> convert json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="xray-tls" tabindex="-1"><a class="header-anchor" href="#xray-tls"><span>xray tls</span></a></h3><p>一些与 TLS 相关的工具。</p><p>使用方法:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>xray tls &lt;command&gt; [arguments]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>        cert          Generate TLS certificates
        ping          Ping the domain with TLS handshake
        certChainHash Calculate TLS certificates hash.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="xray-uuid" tabindex="-1"><a class="header-anchor" href="#xray-uuid"><span>xray uuid</span></a></h3><p>生成 UUID。</p><p>使用方法:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>xray uuid [-i &quot;example&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="xray-x25519" tabindex="-1"><a class="header-anchor" href="#xray-x25519"><span>xray x25519</span></a></h3><p>生成 x25519 密钥对。</p><p>使用方法:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>xray x25519 [-i &quot;(base64.RawURLEncoding)&quot; --std-encoding ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="xray-wg" tabindex="-1"><a class="header-anchor" href="#xray-wg"><span>xray wg</span></a></h3><p>生成 wireguard curve25519 密钥对。</p><p>使用方法:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>xray wg [-i &quot;(base64.StdEncoding)&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,48),m={class:"custom-container tip"},p=e("p",{class:"custom-container-title"},"提示",-1),b=e("p",null,[n("当 "),e("code",null,"-config"),n(" 没有指定时，Xray 将先后尝试从以下路径加载 "),e("code",null,"config.json"),n(" :")],-1),x=e("li",null,"工作目录（Working Directory）",-1),g=e("code",null,"Xray.location.asset",-1);function h(y,f){const i=a("I18nTip"),t=a("RouterLink");return l(),r("div",null,[s(i),u,e("div",m,[p,b,e("ul",null,[x,e("li",null,[s(t,{to:"/config/features/env.html#%E8%B5%84%E6%BA%90%E6%96%87%E4%BB%B6%E8%B7%AF%E5%BE%84"},{default:c(()=>[n("环境变量")]),_:1}),n("中 "),g,n(" 所指定的路径")])])])])}const _=d(v,[["render",h],["__file","command.html.vue"]]);export{_ as default};
