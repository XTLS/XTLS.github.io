import{_ as d,r as a,o as l,c as r,a as s,b as e,d as n,w as c,e as o}from"./app-DBM4OJyw.js";const u={},v=o(`<h1 id="командные-аргументы" tabindex="-1"><a class="header-anchor" href="#командные-аргументы"><span>Командные аргументы</span></a></h1><div class="custom-container tip"><p class="custom-container-title">Подсказка</p><p>Xray использует команды и аргументы в стиле Go.</p></div><h2 id="базовые-команды" tabindex="-1"><a class="header-anchor" href="#базовые-команды"><span>Базовые команды</span></a></h2><p>Вы можете запустить <code>xray help</code>, чтобы получить список всех базовых команд Xray, а также их описание и примеры использования.</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Xray is a platform for building proxies.

Usage:

        xray &lt;command&gt; [arguments]

The commands are:

        run          Run Xray with config, the default command
        version      Show current version of Xray
        api          Call an API in an Xray process
        tls          TLS tools
        uuid         Generate UUIDv4 or UUIDv5
        x25519       Generate key pair for x25519 key exchange
        wg           Generate key pair for wireguard key exchange

Use &quot;xray help &lt;command&gt;&quot; for more information about a command.

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="xray-run" tabindex="-1"><a class="header-anchor" href="#xray-run"><span>xray run</span></a></h3><p>Запуск Xray с указанием одного или нескольких файлов конфигурации.</p><p>Использование:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code> xray run [-c config.json] [-confdir dir]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Run Xray with config, the default command.

The -config=file, -c=file flags set the config files for 
Xray. Multiple assign is accepted.

The -confdir=dir flag sets a dir with multiple json config

The -format=json flag sets the format of config files. 
Default &quot;auto&quot;.

The -test flag tells Xray to test config files only, 
without launching the server.

The -dump flag tells Xray to print the merged config.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>-config=</code> / <code>-c=</code>: Указывает путь к файлу конфигурации, поддерживается использование нескольких файлов. <code>-confdir=</code>: Указывает путь к папке, содержащей несколько файлов конфигурации. <code>-format=</code>: Задает формат файлов конфигурации. <code>-test</code>: Проверяет корректность файлов конфигурации. <code>-dump</code>: Выводит объединенный результат слияния нескольких файлов конфигурации.</p><div class="custom-container tip"><p class="custom-container-title">Подсказка</p><p>Помимо формата JSON по умолчанию, файлы конфигурации также могут быть в формате TOML или YAML. Если формат не указан явно, он определяется по расширению файла.</p></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code> xray run -dump
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Выводит результат слияния нескольких файлов конфигурации.</p><h3 id="xray-version" tabindex="-1"><a class="header-anchor" href="#xray-version"><span>xray version</span></a></h3><p>Выводит информацию о версии Xray, версии Golang и т. д.</p><p>Использование:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code> xray version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="xray-api" tabindex="-1"><a class="header-anchor" href="#xray-api"><span>xray api</span></a></h3><p>Вызов gRPC API Xray, который должен быть включен в файле конфигурации.</p><p>Использование:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>xray api &lt;command&gt; [arguments]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>        restartlogger Restart the logger
        stats         Get statistics
        statsquery    Query statistics
        statssys      Get system statistics
        adi           Add inbounds
        ado           Add outbounds
        rmi           Remove inbounds
        rmo           Remove outbounds
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="xray-convert" tabindex="-1"><a class="header-anchor" href="#xray-convert"><span>xray convert</span></a></h3><p>Convert config to protobuf, or convert typedMessage to JSON</p><p>usage:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>xray convert &lt;command&gt; [arguments]

The commands are:

        pb           Convert multiple json configs to protobuf
        json         Convert typedMessage to json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Sub-command <code>pb</code></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># Usage: xray convert pb [-debug] [-type] [json file] [json file] ...</span>

<span class="token comment"># mix three config files to mix.pb</span>
xray convert pb c1.json c2.json c3.json <span class="token operator">&gt;</span> mix.pb

<span class="token comment"># Use -debug option to view the content of mix.pb</span>
xray convert pb <span class="token parameter variable">-debug</span> mix.pb

<span class="token comment"># Start Xray-core with mix.pb</span>
xray <span class="token parameter variable">-c</span> mix.pb

<span class="token comment"># Detailed usage</span>
xray <span class="token builtin class-name">help</span> convert pb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Sub-command JSON</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># Usage: xray convert json [-type] [stdin:] [typedMessage file]</span>

<span class="token assign-left variable">tmsg</span><span class="token operator">=</span><span class="token string">&#39;{
  &quot;type&quot;: &quot;xray.proxy.shadowsocks.Account&quot;,
  &quot;value&quot;: &quot;CgMxMTEQBg==&quot;
}&#39;</span>

<span class="token builtin class-name">echo</span> <span class="token variable">\${tmsg}</span> <span class="token operator">|</span> xray convert json stdin:

<span class="token comment"># Outputs from above:</span>
<span class="token string">&#39;{
  &quot;cipherType&quot;: &quot;AES_256_GCM&quot;,
  &quot;password&quot;: &quot;111&quot;
}&#39;</span>

<span class="token comment"># Detailed usage</span>
xray <span class="token builtin class-name">help</span> convert json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="xray-tls" tabindex="-1"><a class="header-anchor" href="#xray-tls"><span>xray tls</span></a></h3><p>Инструменты для работы с TLS.</p><p>Использование:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>xray tls &lt;command&gt; [arguments]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>        cert          Generate TLS certificates
        ping          Ping the domain with TLS handshake
        certChainHash Calculate TLS certificates hash.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="xray-uuid" tabindex="-1"><a class="header-anchor" href="#xray-uuid"><span>xray uuid</span></a></h3><p>Генерация UUID.</p><p>Использование:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>xray uuid [-i &quot;example&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="xray-x25519" tabindex="-1"><a class="header-anchor" href="#xray-x25519"><span>xray x25519</span></a></h3><p>Генерация пары ключей x25519.</p><p>Использование:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>xray x25519 [-i &quot;(base64.RawURLEncoding)&quot; --std-encoding ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="xray-wg" tabindex="-1"><a class="header-anchor" href="#xray-wg"><span>xray wg</span></a></h3><p>Генерация пары ключей curve25519 для WireGuard.</p><p>Использование:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>xray wg [-i &quot;(base64.StdEncoding)&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,48),m={class:"custom-container tip"},p=e("p",{class:"custom-container-title"},"Подсказка",-1),b=e("p",null,[n("Если "),e("code",null,"-config"),n(" не указан, Xray попытается загрузить "),e("code",null,"config.json"),n(" из следующих мест:")],-1),x=e("li",null,"Рабочий каталог (Working Directory);",-1),g=e("code",null,"Xray.location.asset",-1);function h(y,f){const i=a("I18nTip"),t=a("RouterLink");return l(),r("div",null,[s(i),v,e("div",m,[p,b,e("ul",null,[x,e("li",null,[n("Путь, указанный в переменной окружения "),g,n(" (см. "),s(t,{to:"/ru/config/features/env.html#%D1%80%D0%B5%D1%81%D1%83%D1%80%D1%81%D0%BD%D1%8B%D0%B5-%D1%84%D0%B0%D0%B9%D0%BB%D1%8B"},{default:c(()=>[n("Переменные окружения")]),_:1}),n(").")])])])])}const _=d(u,[["render",h],["__file","command.html.vue"]]);export{_ as default};
