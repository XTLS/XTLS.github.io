import{_ as p,r as o,o as c,c as l,a as s,b as t,d as n,e as i}from"./app-C01R1QYn.js";const r={},u=i(`<h1 id="http" tabindex="-1"><a class="header-anchor" href="#http"><span>HTTP</span></a></h1><p>Тип транспорта, основанный на HTTP/2 или HTTP/3.</p><p>Он полностью реализован в соответствии со стандартом HTTP и может быть проксирован через другие HTTP-серверы (например, Nginx).</p><p>Клиент должен включить TLS для корректной работы этого типа транспорта.</p><p>HTTP/2 и 3 имеют встроенное мультиплексирование, поэтому не рекомендуется включать mux.cool при их использовании.</p><div class="custom-container tip"><p class="custom-container-title">Подсказка</p><p><strong>В текущей версии для транспорта HTTP/2 не требуется обязательная настройка TLS на стороне сервера.</strong></p><p>Это позволяет использовать Xray в качестве бэкенд-приложения в специальных сценариях развертывания с разделением трафика, где внешний шлюз обрабатывает TLS-соединение, а связь между шлюзом и Xray осуществляется по протоколу HTTP без шифрования.</p></div><div class="custom-container tip"><p class="custom-container-title">Подсказка</p><p>Этот транспорт будет работать в режиме h3, только если alpn содержит только <code>h3</code>.</p></div><div class="custom-container warning"><p class="custom-container-title">Внимание</p><ul><li>HTTP/2 и HTTP/3 не могут быть разделены по путям отката Xray. Использование разделения по путям отката не рекомендуется.</li></ul></div><h2 id="httpobject" tabindex="-1"><a class="header-anchor" href="#httpobject"><span>HttpObject</span></a></h2><p><code>HttpObject</code> соответствует элементу <code>httpSettings</code> в конфигурации транспорта.</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;host&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;xray.com&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/random/path&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;read_idle_timeout&quot;</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
  <span class="token property">&quot;health_check_timeout&quot;</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span>
  <span class="token property">&quot;method&quot;</span><span class="token operator">:</span> <span class="token string">&quot;PUT&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;headers&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;Header&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>host</code>: [string]</p></blockquote><p>Массив строк, каждый элемент которого является доменным именем.</p><p>Клиент случайным образом выбирает доменное имя из списка для связи, а сервер проверяет, находится ли доменное имя в списке.</p><div class="custom-container tip"><p class="custom-container-title">Подсказка</p><p>Если не указывать <code>&quot;httpSettings&quot;</code> или оставить <code>&quot;host&quot;: []</code> пустым, будет использоваться значение по умолчанию <code>&quot;www.example.com&quot;</code>. Для успешного подключения необходимо, чтобы значения <code>&quot;host&quot;</code> на обеих сторонах совпадали. <code>&quot;host&quot;: [&quot;&quot;]</code> не является пустым значением.</p></div><blockquote><p><code>path</code>: string</p></blockquote><p>Путь HTTP, начинающийся с <code>/</code>. Должен совпадать на клиенте и сервере.</p><p>Значение по умолчанию: <code>&quot;/&quot;</code>.</p><blockquote><p><code>read_idle_timeout</code>: number</p></blockquote><p>Время ожидания чтения в секундах. Если в течение этого времени не получено никаких данных, будет выполнена проверка работоспособности.</p><p>По умолчанию проверка работоспособности <strong>отключена</strong>.</p><div class="custom-container tip"><p class="custom-container-title">Подсказка</p><p>Настраивается <strong>только</strong> на стороне <strong>клиента</strong>.</p></div><div class="custom-container tip"><p class="custom-container-title">Подсказка</p><p>Может помочь решить некоторые проблемы с &quot;обрывом соединения&quot;.</p></div><blockquote><p><code>health_check_timeout</code>: number</p></blockquote><p>Время ожидания проверки работоспособности в секундах. Если проверка работоспособности не будет завершена в течение этого времени, она считается неудачной. Значение по умолчанию: <code>15</code>.</p><div class="custom-container tip"><p class="custom-container-title">Подсказка</p><p>Настраивается <strong>только</strong> на стороне <strong>клиента</strong>.</p></div><blockquote><p><code>method</code>: string</p></blockquote><p>HTTP-метод. Значение по умолчанию: <code>&quot;PUT&quot;</code>.</p>`,28),d={href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods",target:"_blank",rel:"noopener noreferrer"},m=t("blockquote",null,[t("p",null,[t("code",null,"headers"),n(": map{ string: [string] }")])],-1),k=t("p",null,[t("strong",null,"Только для клиента."),n(" Пользовательские HTTP-заголовки. Представляет собой пару ключ-значение, где каждый ключ является именем HTTP-заголовка, а значением является массив.")],-1);function q(h,v){const e=o("I18nTip"),a=o("ExternalLinkIcon");return c(),l("div",null,[s(e),u,t("p",null,[n("При настройке следует руководствоваться значениями, перечисленными "),t("a",d,[n("здесь"),s(a)]),n(".")]),m,k])}const b=p(r,[["render",q],["__file","http.html.vue"]]);export{b as default};