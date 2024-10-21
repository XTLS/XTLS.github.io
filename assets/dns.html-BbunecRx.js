import{_ as l,r as c,o as u,c as d,a as o,b as s,d as n,w as e,e as t}from"./app-C01R1QYn.js";const i={},r=t(`<h1 id="встроенныи-dns-сервер" tabindex="-1"><a class="header-anchor" href="#встроенныи-dns-сервер"><span>Встроенный DNS-сервер</span></a></h1><h2 id="dns-сервер" tabindex="-1"><a class="header-anchor" href="#dns-сервер"><span>DNS-сервер</span></a></h2><p>Встроенный DNS-модуль Xray имеет два основных назначения:</p><ul><li><p>На этапе маршрутизации: разрешает доменные имена в IP-адреса и выполняет сопоставление правил на основе полученных IP-адресов для разделения трафика. Разрешение доменных имен и разделение трафика зависят от значения <code>domainStrategy</code> в конфигурации модуля маршрутизации. Встроенный DNS-сервер будет использоваться для DNS-запросов только в том случае, если установлено одно из следующих двух значений:</p><ul><li><code>&quot;IPIfNonMatch&quot;</code>: при запросе доменного имени выполняется сопоставление домена в маршрутизации, если совпадение не найдено, для этого доменного имени используется встроенный DNS-сервер для выполнения DNS-запроса, и возвращенный IP-адрес используется для повторного сопоставления IP-маршрутизации.</li><li><code>&quot;IPOnDemand&quot;</code>: при обнаружении любого правила на основе IP-адреса доменное имя немедленно разрешается в IP-адрес для сопоставления.</li></ul></li><li><p>Разрешает целевой адрес для подключения.</p><ul><li>Например, если в исходящем подключении <code>freedom</code> установить <code>domainStrategy</code> равным <code>UseIP</code>, то запросы, отправленные этим исходящим подключением, сначала будут разрешены во встроенном сервере из доменного имени в IP-адрес, а затем будет выполнено подключение.</li><li>Например, если в <code>sockopt</code> установить <code>domainStrategy</code> равным <code>UseIP</code>, то системные подключения, инициированные этим исходящим подключением, сначала будут разрешены во встроенном сервере из доменного имени в IP-адрес, а затем будет выполнено подключение.</li></ul></li></ul><div class="custom-container tip"><p class="custom-container-title">СОВЕТ 1</p><p>DNS-запросы, отправляемые встроенным DNS-сервером, автоматически перенаправляются в соответствии с конфигурацией маршрутизации.</p></div><div class="custom-container tip"><p class="custom-container-title">СОВЕТ 2</p><p>Поддерживаются только основные IP-запросы (записи A и AAAA), записи CNAME будут запрашиваться повторно до тех пор, пока не будет возвращена запись A/AAAA. Другие запросы не будут передаваться на встроенный DNS-сервер.</p></div><h2 id="процесс-обработки-dns" tabindex="-1"><a class="header-anchor" href="#процесс-обработки-dns"><span>Процесс обработки DNS</span></a></h2><p>Если запрашиваемое доменное имя:</p><ul><li>Совпадает с сопоставлением «доменное имя - IP», «доменное имя - массив IP» в <code>hosts</code>, то этот IP или массив IP возвращается в качестве результата разрешения DNS.</li><li>Совпадает с сопоставлением «доменное имя - доменное имя» в <code>hosts</code>, то значение этого сопоставления (другое доменное имя) будет использоваться в качестве текущего запрашиваемого доменного имени, и процесс обработки DNS будет продолжаться до тех пор, пока не будет разрешен IP-адрес или возвращено пустое разрешение.</li><li>Не совпадает с <code>hosts</code>, но совпадает с одним (несколькими) списками доменов <code>domains</code> на DNS-серверах, то в соответствии с приоритетом совпадающих правил, DNS-серверы, соответствующие этим правилам, будут использоваться для запроса по очереди. Если запрос к DNS-серверу не удался или <code>expectIPs</code> не совпадает, то для запроса будет использоваться следующий DNS-сервер. В противном случае возвращается разрешенный IP-адрес. Если запрос ко всем совпадающим DNS-серверам не удался или <code>expectIPs</code> не совпадает, то компонент DNS: <ul><li>По умолчанию выполнит «откат DNS-запроса (fallback)»: DNS-серверы, которые не использовались в предыдущем неудачном запросе и для которых <code>skipFallback</code> имеет значение по умолчанию <code>false</code>, будут использоваться для запроса по очереди. Если запрос не удался или <code>expectIPs</code> не совпадает, то возвращается пустое разрешение; в противном случае возвращается разрешенный IP-адрес.</li><li>Если <code>disableFallback</code> установлен в <code>true</code>, то «откат DNS-запроса (fallback)» выполняться не будет.</li></ul></li><li>Не совпадает ни с <code>hosts</code>, ни со списками доменов <code>domains</code> на DNS-серверах, то: <ul><li>По умолчанию DNS-серверы, для которых <code>skipFallback</code> имеет значение по умолчанию <code>false</code>, будут использоваться для запроса по очереди. Если запрос к первому выбранному DNS-серверу не удался или <code>expectIPs</code> не совпадает, то для запроса будет использоваться следующий выбранный DNS-сервер. В противном случае возвращается разрешенный IP-адрес. Если запрос ко всем выбранным DNS-серверам не удался или <code>expectIPs</code> не совпадает, то возвращается пустое разрешение.</li><li>Если количество DNS-серверов, для которых <code>skipFallback</code> имеет значение по умолчанию <code>false</code>, равно 0 или <code>disableFallback</code> установлен в <code>true</code>, то для запроса будет использоваться первый DNS-сервер в конфигурации DNS. Если запрос не удался или <code>expectIPs</code> не совпадает, то возвращается пустое разрешение; в противном случае возвращается разрешенный IP-адрес.</li></ul></li></ul><h2 id="dnsobject" tabindex="-1"><a class="header-anchor" href="#dnsobject"><span>DnsObject</span></a></h2><p><code>DnsObject</code> соответствует элементу <code>dns</code> в файле конфигурации.</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;dns&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;hosts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;baidu.com&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;dns.google&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;8.8.8.8&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;8.8.4.4&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;servers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;8.8.8.8&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;8.8.4.4&quot;</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.2.3.4&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">5353</span><span class="token punctuation">,</span>
        <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;domain:xray.com&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;expectIPs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geoip:cn&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;skipFallback&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">&quot;clientIP&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.2.3.4&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://8.8.8.8/dns-query&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;geosite:netflix&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;skipFallback&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">&quot;queryStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UseIPv4&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://1.1.1.1/dns-query&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;geosite:openai&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;skipFallback&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">&quot;queryStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UseIPv6&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token string">&quot;localhost&quot;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;clientIp&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.2.3.4&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;queryStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UseIP&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;disableCache&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token property">&quot;disableFallback&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token property">&quot;disableFallbackIfMatch&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dns_inbound&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>hosts</code>: map{string: address} | map{string: [address]}</p></blockquote><p>Статический список IP-адресов, значением которого является серия &quot;доменное имя&quot;: &quot;адрес&quot; или &quot;доменное имя&quot;: [&quot;адрес 1&quot;,&quot;адрес 2&quot;]. Где адрес может быть IP-адресом или доменным именем. При разрешении доменного имени, если доменное имя соответствует элементу в этом списке:</p><ul><li>Если адрес элемента является IP-адресом, то результатом разрешения будет IP-адрес этого элемента.</li><li>Если адрес элемента является доменным именем, то для разрешения IP-адреса будет использоваться это доменное имя, а не исходное доменное имя.</li><li>Если в адресе установлено несколько IP-адресов и доменных имен, то будет возвращено только первое доменное имя, остальные IP-адреса и доменные имена будут проигнорированы.</li></ul><p>Формат доменного имени может быть следующим:</p>`,16),q=s("li",null,'Простая строка: правило вступает в силу, если эта строка полностью совпадает с целевым доменным именем. Например, "xray.com" соответствует "xray.com", но не соответствует "www.xray.com".',-1),k=s("li",null,[n("Регулярное выражение: начинается с "),s("code",null,'"regexp:"'),n(', остальная часть является регулярным выражением. Правило вступает в силу, если это регулярное выражение соответствует целевому доменному имени. Например, "regexp:\\\\.goo.*\\\\.com$" соответствует "www.google.com", "fonts.googleapis.com", но не соответствует "google.com".')],-1),v=s("li",null,[n("Поддомен (рекомендуется): начинается с "),s("code",null,'"domain:"'),n(', остальная часть является доменным именем. Правило вступает в силу, если это доменное имя является целевым доменным именем или его поддоменом. Например, "domain:xray.com" соответствует "www.xray.com" и "xray.com", но не соответствует "wxray.com".')],-1),b=s("li",null,[n("Подстрока: начинается с "),s("code",null,'"keyword:"'),n(', остальная часть является строкой. Правило вступает в силу, если эта строка соответствует любой части целевого доменного имени. Например, "keyword:sina.com" может соответствовать "sina.com", "sina.com.cn" и "www.sina.com", но не соответствует "sina.cn".')],-1),m=s("code",null,'"geosite:"',-1),y=s("code",null,"geosite:google",-1),D=s("code",null,"geosite:cn",-1),g=t('<blockquote><p><code>servers</code>: [string | <a href="#dnsserverobject">DnsServerObject</a> ]</p></blockquote><p>Список DNS-серверов, поддерживается два типа: DNS-адрес (в виде строки) и <a href="#dnsserverobject">DnsServerObject</a>.</p><p>Значение <code>&quot;localhost&quot;</code> означает использование предустановленной конфигурации DNS на локальной машине.</p><p>Если значением является DNS-адрес <code>&quot;IP:Порт&quot;</code>, например, <code>&quot;8.8.8.8:53&quot;</code>, Xray будет использовать указанный UDP-порт этого адреса для DNS-запросов. Этот запрос следует правилам маршрутизации. Если порт не указан, по умолчанию используется порт 53.</p><p>Если значение имеет вид <code>&quot;tcp://хост:порт&quot;</code>, например, <code>&quot;tcp://8.8.8.8:53&quot;</code>, Xray будет использовать <code>DNS over TCP</code> для запроса. Этот запрос следует правилам маршрутизации. Если порт не указан, по умолчанию используется порт 53.</p><p>Если значение имеет вид <code>&quot;tcp+local://хост:порт&quot;</code>, например, <code>&quot;tcp+local://8.8.8.8:53&quot;</code>, Xray будет использовать <code>локальный режим TCP (TCPL)</code> для запроса. Это означает, что DNS-запрос не будет проходить через компонент маршрутизации, а будет отправляться непосредственно через исходящее подключение Freedom, чтобы сократить время ожидания. Если порт не указан, по умолчанию используется порт 53.</p><p>Если значение имеет вид <code>&quot;https://хост:порт/dns-query&quot;</code>, например, <code>&quot;https://dns.google/dns-query&quot;</code>, Xray будет использовать <code>DNS over HTTPS</code> (RFC8484, сокращенно DOH) для запроса. Некоторые провайдеры имеют сертификаты с псевдонимами IP-адресов, можно напрямую указывать IP-адрес, например, <code>https://1.1.1.1/dns-query</code>. Также можно использовать нестандартные порты и пути, например, <code>&quot;https://a.b.c.d:8443/my-dns-query&quot;</code>.</p><p>Если значение имеет вид <code>&quot;https+local://хост:порт/dns-query&quot;</code>, например, <code>&quot;https+local://dns.google/dns-query&quot;</code>, Xray будет использовать <code>локальный режим DOH (DOHL)</code> для запроса. Это означает, что DOH-запрос не будет проходить через компонент маршрутизации, а будет отправляться непосредственно через исходящее подключение Freedom, чтобы сократить время ожидания. Обычно подходит для использования на сервере. Также можно использовать нестандартные порты и пути.</p><p>Если значение имеет вид <code>&quot;quic+local://хост&quot;</code>, например, <code>&quot;quic+local://dns.adguard.com&quot;</code>, Xray будет использовать <code>локальный режим DNS over QUIC (DOQL)</code> для запроса. Это означает, что DNS-запрос не будет проходить через компонент маршрутизации, а будет отправляться непосредственно через исходящее подключение Freedom. Этот метод требует, чтобы DNS-сервер поддерживал DNS over QUIC. По умолчанию для запроса используется порт 853, можно использовать нестандартный порт.</p><p>Если значением является <code>fakedns</code>, то для запроса будет использоваться функция FakeDNS.</p><div class="custom-container tip"><p class="custom-container-title">СОВЕТ 1</p><p>При использовании <code>localhost</code> DNS-запросы локальной машины не контролируются Xray, для того чтобы DNS-запросы перенаправлялись Xray, требуется дополнительная настройка.</p></div><div class="custom-container tip"><p class="custom-container-title">СОВЕТ 2</p><p>Инициализированные DNS-клиенты для различных правил отображаются в журнале запуска Xray с уровнем <code>info</code>, например, режимы <code>local DOH</code>, <code>remote DOH</code> и <code>udp</code>.</p></div>',12),S={class:"custom-container tip"},h=s("p",{class:"custom-container-title"},"СОВЕТ 3",-1),I=t(`<blockquote><p><code>clientIp</code>: string</p></blockquote><p>Используется для указания IP-адреса клиента при отправке DNS-запросов на сервер. Не может быть приватным адресом.</p><div class="custom-container tip"><p class="custom-container-title">СОВЕТ 1</p><p>Требуется, чтобы DNS-сервер поддерживал EDNS Client Subnet.</p></div><div class="custom-container tip"><p class="custom-container-title">СОВЕТ 2</p><p>Вы можете указать <code>clientIp</code> для всех DNS-серверов в <a href="#dnsobject">DnsObject</a>, а также указать <code>clientIp</code> для каждого DNS-сервера в конфигурации <a href="#dnsserverobject">DnsServerObject</a> (приоритет выше, чем у конфигурации <a href="#dnsobject">DnsObject</a>).</p></div><blockquote><p><code>queryStrategy</code>: &quot;UseIP&quot; | &quot;UseIPv4&quot; | &quot;UseIPv6&quot;</p></blockquote><p>Значение по умолчанию <code>UseIP</code> запрашивает как записи A, так и записи AAAA. <code>UseIPv4</code> запрашивает только записи A; <code>UseIPv6</code> запрашивает только записи AAAA.</p><p>Новая функция в Xray-core v1.8.6: <code>queryStrategy</code> можно установить отдельно для каждого <code>DNS</code> сервера.</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code>    <span class="token property">&quot;dns&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;servers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;https://1.1.1.1/dns-query&quot;</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://8.8.8.8/dns-query&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token string">&quot;geosite:netflix&quot;</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token property">&quot;skipFallback&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                <span class="token property">&quot;queryStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UseIPv4&quot;</span> <span class="token comment">// запрос записей A для домена netflix</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://1.1.1.1/dns-query&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token string">&quot;geosite:openai&quot;</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token property">&quot;skipFallback&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                <span class="token property">&quot;queryStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UseIPv6&quot;</span> <span class="token comment">// запрос записей AAAA для домена openai</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;queryStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UseIP&quot;</span> <span class="token comment">// запрос записей A и AAAA для всех остальных доменов</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">СОВЕТ 1</p><p>Глобальное значение <code>&quot;queryStrategy&quot;</code> имеет приоритет. Если значение <code>&quot;queryStrategy&quot;</code> в дочернем элементе конфликтует с глобальным значением <code>&quot;queryStrategy&quot;</code>, запрос дочернего элемента вернет пустой ответ.</p></div><div class="custom-container tip"><p class="custom-container-title">СОВЕТ 2</p><p>Если параметр <code>&quot;queryStrategy&quot;</code> не указан в дочернем элементе, используется значение глобального параметра <code>&quot;queryStrategy&quot;</code>. Поведение аналогично версиям Xray-core до v1.8.6.</p></div><p>Например:<br> Глобальное значение <code>&quot;queryStrategy&quot;: &quot;UseIPv6&quot;</code> конфликтует с дочерним значением <code>&quot;queryStrategy&quot;: &quot;UseIPv4&quot;</code>.<br> Глобальное значение <code>&quot;queryStrategy&quot;: &quot;UseIPv4&quot;</code> конфликтует с дочерним значением <code>&quot;queryStrategy&quot;: &quot;UseIPv6&quot;</code>.<br> Глобальное значение <code>&quot;queryStrategy&quot;: &quot;UseIP&quot;</code> не конфликтует с дочерним значением <code>&quot;queryStrategy&quot;: &quot;UseIPv6&quot;</code>.<br> Глобальное значение <code>&quot;queryStrategy&quot;: &quot;UseIP&quot;</code> не конфликтует с дочерним значением <code>&quot;queryStrategy&quot;: &quot;UseIPv4&quot;</code>.</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code>    <span class="token property">&quot;dns&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;servers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;https://1.1.1.1/dns-query&quot;</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://8.8.8.8/dns-query&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token string">&quot;geosite:netflix&quot;</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token property">&quot;skipFallback&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                <span class="token property">&quot;queryStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UseIPv6&quot;</span> <span class="token comment">// конфликт между глобальным значением &quot;UseIPv4&quot; и дочерним значением &quot;UseIPv6&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;queryStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UseIPv4&quot;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Запрос домена netflix вернет пустой ответ из-за конфликта значений <code>&quot;queryStrategy&quot;</code>. Запись A для домена netflix будет получена от <code>https://1.1.1.1/dns-query</code>.</p><blockquote><p><code>disableCache</code>: true | false</p></blockquote><p><code>true</code> отключает кэширование DNS, по умолчанию <code>false</code>, то есть кэширование включено.</p><blockquote><p><code>disableFallback</code>: true | false</p></blockquote><p><code>true</code> отключает откат DNS-запросов (fallback), по умолчанию <code>false</code>, то есть откат включен.</p><blockquote><p><code>disableFallbackIfMatch</code>: true | false</p></blockquote><p><code>true</code> отключает откат DNS-запросов (fallback), если сработал список доменов с приоритетным сопоставлением для DNS-сервера, по умолчанию <code>false</code>, то есть откат включен.</p><blockquote><p><code>tag</code>: string</p></blockquote><p>Трафик запросов, отправляемых встроенным DNS, за исключением режимов <code>localhost</code>, <code>fakedns</code>, <code>TCPL</code>, <code>DOHL</code> и <code>DOQL</code>, можно сопоставить в маршрутизации с помощью <code>inboundTag</code> по этому тегу.</p><h3 id="dnsserverobject" tabindex="-1"><a class="header-anchor" href="#dnsserverobject"><span>DnsServerObject</span></a></h3><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.2.3.4&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">5353</span><span class="token punctuation">,</span>
  <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;domain:xray.com&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;expectIPs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geoip:cn&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;skipFallback&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;clientIP&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.2.3.4&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>address</code>: address</p></blockquote><p>Список DNS-серверов, поддерживается два типа: DNS-адрес (в виде строки) и DnsServerObject.</p><p>Значение <code>&quot;localhost&quot;</code> означает использование предустановленной конфигурации DNS на локальной машине.</p><p>Если значением является DNS-адрес <code>&quot;IP&quot;</code>, например, <code>&quot;8.8.8.8&quot;</code>, Xray будет использовать указанный UDP-порт этого адреса для DNS-запросов. Этот запрос следует правилам маршрутизации. По умолчанию используется порт 53.</p><p>Если значение имеет вид <code>&quot;tcp://хост&quot;</code>, например, <code>&quot;tcp://8.8.8.8&quot;</code>, Xray будет использовать <code>DNS over TCP</code> для запроса. Этот запрос следует правилам маршрутизации. По умолчанию используется порт 53.</p><p>Если значение имеет вид <code>&quot;tcp+local://хост&quot;</code>, например, <code>&quot;tcp+local://8.8.8.8&quot;</code>, Xray будет использовать <code>локальный режим TCP (TCPL)</code> для запроса. Это означает, что DNS-запрос не будет проходить через компонент маршрутизации, а будет отправляться непосредственно через исходящее подключение Freedom, чтобы сократить время ожидания. Если порт не указан, по умолчанию используется порт 53.</p><p>Если значение имеет вид <code>&quot;https://хост:порт/dns-query&quot;</code>, например, <code>&quot;https://dns.google/dns-query&quot;</code>, Xray будет использовать <code>DNS over HTTPS</code> (RFC8484, сокращенно DOH) для запроса. Некоторые провайдеры имеют сертификаты с псевдонимами IP-адресов, можно напрямую указывать IP-адрес, например, <code>https://1.1.1.1/dns-query</code>. Также можно использовать нестандартные порты и пути, например, <code>&quot;https://a.b.c.d:8443/my-dns-query&quot;</code>.</p><p>Если значение имеет вид <code>&quot;https+local://хост:порт/dns-query&quot;</code>, например, <code>&quot;https+local://dns.google/dns-query&quot;</code>, Xray будет использовать <code>локальный режим DOH (DOHL)</code> для запроса. Это означает, что DOH-запрос не будет проходить через компонент маршрутизации, а будет отправляться непосредственно через исходящее подключение Freedom, чтобы сократить время ожидания. Обычно подходит для использования на сервере. Также можно использовать нестандартные порты и пути.</p><p>Если значение имеет вид <code>&quot;quic+local://хост:порт&quot;</code>, например, <code>&quot;quic+local://dns.adguard.com&quot;</code>, Xray будет использовать <code>локальный режим DOQ (DOQL)</code> для запроса. Это означает, что DNS-запрос не будет проходить через компонент маршрутизации, а будет отправляться непосредственно через исходящее подключение Freedom. Этот метод требует, чтобы DNS-сервер поддерживал DNS over QUIC. По умолчанию для запроса используется порт 853, можно использовать нестандартный порт.</p><p>Если значением является <code>fakedns</code>, то для запроса будет использоваться функция FakeDNS.</p><blockquote><p><code>port</code>: number</p></blockquote><p>Порт DNS-сервера, например, <code>53</code>. Если этот элемент не указан, по умолчанию используется значение <code>53</code>. Этот элемент не используется в режимах DOH, DOHL, DOQL, нестандартный порт должен быть указан в URL.</p><blockquote><p><code>domains</code>: [string]</p></blockquote>`,36),P=s("blockquote",null,[s("p",null,[s("code",null,"expectIPs"),n(":[string]")])],-1),N=s("p",null,[n("Если этот элемент настроен, Xray DNS будет проверять возвращаемые IP-адреса и возвращать только адреса, входящие в список "),s("code",null,"expectIPs"),n(".")],-1),f=s("p",null,"Если этот элемент не настроен, IP-адреса будут возвращены как есть.",-1),_=s("blockquote",null,[s("p",null,[s("code",null,"skipFallback"),n(": true | false")])],-1),x=s("p",null,[s("code",null,"true"),n(" - этот сервер будет пропущен при выполнении отката DNS-запроса (fallback), по умолчанию "),s("code",null,"false"),n(", то есть сервер не будет пропущен.")],-1);function j(A,U){const p=c("I18nTip"),a=c("RouterLink");return u(),d("div",null,[o(p),r,s("ul",null,[q,k,v,b,s("li",null,[n("Предопределенный список доменов: начинается с "),m,n(", остальная часть является именем, например, "),y,n(" или "),D,n(". Имена и списки доменов см. в разделе "),o(a,{to:"/ru/config/routing.html#%D0%BF%D1%80%D0%B5%D0%B4%D0%BE%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5-%D1%81%D0%BF%D0%B8%D1%81%D0%BA%D0%B8-%D0%B4%D0%BE%D0%BC%D0%B5%D0%BD%D0%BE%D0%B2"},{default:e(()=>[n("Предопределенные списки доменов")]),_:1}),n(".")])]),g,s("div",S,[h,s("p",null,[n("(v1.4.0+) Вы можете включить ведение журнала DNS-запросов в "),o(a,{to:"/ru/config/log.html"},{default:e(()=>[n("журнале")]),_:1}),n(".")])]),I,s("p",null,[n("Список доменов. Домены из этого списка будут в первую очередь запрашиваться через этот сервер. Формат доменного имени такой же, как и в "),o(a,{to:"/ru/config/routing.html#ruleobject"},{default:e(()=>[n("конфигурации маршрутизации")]),_:1}),n(".")]),P,s("p",null,[n("Список диапазонов IP-адресов, формат такой же, как и в "),o(a,{to:"/ru/config/routing.html#ruleobject"},{default:e(()=>[n("конфигурации маршрутизации")]),_:1}),n(".")]),N,f,_,x])}const B=l(i,[["render",j],["__file","dns.html.vue"]]);export{B as default};