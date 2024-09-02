import{_ as d,r as n,o as r,c as l,a as i,b as e,d as a,w as c,e as o}from"./app-FINMjtCC.js";const u={},v=o(`<h1 id="командные-аргументы" tabindex="-1"><a class="header-anchor" href="#командные-аргументы"><span>Командные аргументы</span></a></h1><div class="custom-container tip"><p class="custom-container-title">Подсказка</p><p>Xray использует команды и аргументы в стиле Go.</p></div><h2 id="базовые-команды" tabindex="-1"><a class="header-anchor" href="#базовые-команды"><span>Базовые команды</span></a></h2><p>Вы можете запустить <code>xray help</code>, чтобы получить список всех базовых команд Xray, а также их описание и примеры использования.</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Xray is a platform for building proxies.

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="xray-tls" tabindex="-1"><a class="header-anchor" href="#xray-tls"><span>xray tls</span></a></h3><p>Инструменты для работы с TLS.</p><p>Использование:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>xray tls &lt;command&gt; [arguments]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>        cert          Generate TLS certificates
        ping          Ping the domain with TLS handshake
        certChainHash Calculate TLS certificates hash.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="xray-uuid" tabindex="-1"><a class="header-anchor" href="#xray-uuid"><span>xray uuid</span></a></h3><p>Генерация UUID.</p><p>Использование:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>xray uuid [-i &quot;example&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="xray-x25519" tabindex="-1"><a class="header-anchor" href="#xray-x25519"><span>xray x25519</span></a></h3><p>Генерация пары ключей x25519.</p><p>Использование:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>xray x25519 [-i &quot;(base64.RawURLEncoding)&quot; --std-encoding ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="xray-wg" tabindex="-1"><a class="header-anchor" href="#xray-wg"><span>xray wg</span></a></h3><p>Генерация пары ключей curve25519 для WireGuard.</p><p>Использование:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>xray wg [-i &quot;(base64.StdEncoding)&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,40),m={class:"custom-container tip"},p=e("p",{class:"custom-container-title"},"Подсказка",-1),x=e("p",null,[a("Если "),e("code",null,"-config"),a(" не указан, Xray попытается загрузить "),e("code",null,"config.json"),a(" из следующих мест:")],-1),h=e("li",null,"Рабочий каталог (Working Directory);",-1),g=e("code",null,"Xray.location.asset",-1);function b(f,y){const s=n("I18nTip"),t=n("RouterLink");return r(),l("div",null,[i(s),v,e("div",m,[p,x,e("ul",null,[h,e("li",null,[a("Путь, указанный в переменной окружения "),g,a(" (см. "),i(t,{to:"/ru/config/features/env.html#%D1%80%D0%B5%D1%81%D1%83%D1%80%D1%81%D0%BD%D1%8B%D0%B5-%D1%84%D0%B0%D0%B9%D0%BB%D1%8B"},{default:c(()=>[a("Переменные окружения")]),_:1}),a(").")])])])])}const D=d(u,[["render",b],["__file","command.html.vue"]]);export{D as default};
