import{_ as i,r as o,o as d,c as u,a as s,b as n,d as e,w as p,e as t}from"./app-mdDHIF5z.js";const h={},k=n("h1",{id:"splithttp-h2-quic-h3",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#splithttp-h2-quic-h3"},[n("span",null,"SplitHTTP (H2, QUIC H3)")])],-1),b=t(`<p>Используется для загрузки с помощью HTTP-фрагментированной передачи, загрузка осуществляется с помощью нескольких HTTP POST-запросов.</p><p>Может использоваться через CDN, не поддерживающие WebSocket, но есть несколько требований:</p><ul><li>CDN должен поддерживать HTTP-фрагментированную передачу и потоковые ответы без буферизации. Ядро будет отправлять различную информацию, чтобы сообщить CDN об этом, но CDN должна ее соблюдать. Если промежуточный узел не поддерживает потоковые ответы и зависает, этот транспорт, скорее всего, не будет работать.</li></ul><p>Цель та же, что и у V2fly Meek, но благодаря использованию фрагментированной загрузки скорость загрузки выше, а скорость отдачи оптимизирована, но все еще очень ограничена, поэтому к HTTP-прокси предъявляются более высокие требования (см. выше).</p><p><code>SplitHTTP</code> также принимает заголовок <code>X-Forwarded-For</code>.</p><h2 id="splithttpobject" tabindex="-1"><a class="header-anchor" href="#splithttpobject"><span>SplitHttpObject</span></a></h2><p><code>SplitHttpObject</code> соответствует элементу <code>splithttpSettings</code> в конфигурации транспорта.</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;host&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xray.com&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;headers&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;key&quot;</span><span class="token operator">:</span> <span class="token string">&quot;value&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;scMaxEachPostBytes&quot;</span><span class="token operator">:</span> <span class="token number">1000000</span><span class="token punctuation">,</span>
  <span class="token property">&quot;scMaxConcurrentPosts&quot;</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
  <span class="token property">&quot;scMinPostsIntervalMs&quot;</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>
  <span class="token property">&quot;noSSEHeader&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;xPaddingBytes&quot;</span><span class="token operator">:</span> <span class="token string">&quot;100-1000&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;xmux&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;maxConcurrency&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;maxConnections&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;cMaxReuseTimes&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;cMaxLifetimeMs&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>path</code>: string</p></blockquote><p>Путь HTTP-протокола, используемый SplitHTTP. Значение по умолчанию — <code>&quot;/&quot;</code>.</p><blockquote><p><code>host</code>: string</p></blockquote><p>Хост, отправляемый в HTTP-запросе SplitHTTP. Значение по умолчанию пустое. Если значение на сервере пустое, значение хоста, отправляемое клиентом, не проверяется.</p><p>Если значение указано на сервере или в <code>headers</code>, оно будет сравниваться со значением хоста в запросе клиента.</p><p>Приоритет выбора хоста для отправки клиентом: <code>host</code> &gt; <code>headers</code> &gt; <code>address</code>.</p><blockquote><p><code>headers</code>: map {string: string}</p></blockquote><p>Только для клиента. Пользовательские HTTP-заголовки. Пара «ключ-значение», где каждый ключ представляет собой имя HTTP-заголовка, а соответствующее значение — строка.</p><blockquote><p><code>scMaxEachPostBytes</code>: int | string</p></blockquote><p>Максимальный размер блока выгрузки в байтах. Значение по умолчанию — 1000000 (1 МБ).</p><p>Размер, установленный на клиенте, должен быть меньше этого значения, иначе запрос POST, размер которого превышает значение, установленное на сервере, будет отклонен.</p><p>Это значение должно быть меньше максимального размера тела запроса, разрешенного CDN или другим обратным прокси-сервером HTTP, иначе будет выдаваться ошибка HTTP 413.</p><p>Также может быть строкой в формате &quot;500000-1000000&quot;, и ядро будет случайным образом выбирать значение из этого диапазона для уменьшения цифрового следа.</p><blockquote><p><code>scMaxConcurrentPosts</code>: int | string</p></blockquote><p>Максимальное количество одновременных запросов POST на одно соединение. Значение по умолчанию — 100.</p><p>Параллельная выгрузка также (и в основном) контролируется параметром <code>scMinPostsIntervalMs</code>, поэтому это значение является лишь страховкой.</p><p>Фактическое количество запросов, отправляемых клиентом, должно быть меньше, чем на сервере. (На практике, поскольку указанного выше ограничения трудно достичь, клиент может фактически установить значение, превышающее значение на сервере, но это не рекомендуется).</p><p>Также может быть строкой в формате &quot;50-100&quot;, и ядро будет случайным образом выбирать значение из этого диапазона для уменьшения цифрового следа.</p><blockquote><p><code>scMinPostsIntervalMs</code>: int | string</p></blockquote><p>Только для клиента. Минимальный интервал между запросами POST на выгрузку. Значение по умолчанию — 30.</p><p>Также может быть строкой в формате &quot;10-50&quot;, и ядро будет случайным образом выбирать значение из этого диапазона для уменьшения цифрового следа.</p><blockquote><p><code>noSSEHeader</code>: bool</p></blockquote><p>Только для сервера. Не отправлять заголовок ответа <code>Content-Type: text/event-stream</code>. Значение по умолчанию — <code>false</code> (то есть заголовок будет отправлен).</p><blockquote><p><code>xPaddingBytes</code>: int | string</p></blockquote>`,32),m=n("code",null,'"100-1000"',-1),q=n("p",null,[e("Значение "),n("code",null,"-1"),e(" полностью отключает заполнение.")],-1),T=n("blockquote",null,[n("p",null,[n("code",null,"xmux"),e(": "),n("a",{href:"#xmuxobject"},"XmuxObject")])],-1),v=n("h2",{id:"xmuxobject",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#xmuxobject"},[n("span",null,"XmuxObject")])],-1),x=t(`<p>Позволяет пользователям контролировать поведение мультиплексирования SplitHTTP в h2 и h3. Если не настроено, по умолчанию все запросы мультиплексируются в одно TCP/QUIC-соединение.</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;maxConcurrency&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;maxConnections&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;cMaxReuseTimes&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;cMaxLifetimeMs&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Поскольку по умолчанию используется неограниченное мультиплексирование, <code>xmux</code> фактически ограничивает его. Кроме того, не включайте mux.cool.</p><p>Объяснение терминов:</p>`,4),_=n("li",null,'Потоки будут мультиплексироваться в физические соединения, например: Соединение 1 (Поток 1, Поток 2, Поток 3) Соединение 2 (Поток 4, Поток 5, Поток 6) ... и так далее. В других источниках вы можете встретить описание "соединение-подключение", это то же самое.',-1),g=t('<blockquote><p><code>maxConcurrency</code>: int/string</p></blockquote><p>Значение по умолчанию — 0 (неограниченно). Максимальное количество потоков, мультиплексируемых в одном соединении. Когда количество потоков в соединении достигает этого значения, ядро создает дополнительные соединения для размещения новых потоков, аналогично параметру <code>concurrency</code> в mux.cool.</p><blockquote><p><code>maxConnections</code>: int/string</p></blockquote><p>Значение по умолчанию — 0 (неограниченно). Максимальное количество открытых соединений. Ядро будет активно открывать новые соединения для каждого потока до тех пор, пока не будет достигнуто это значение. Затем ядро начнет мультиплексировать потоки в уже установленные соединения. Конфликтует с <code>maxConcurrency</code>.</p><blockquote><p><code>cMaxReuseTimes</code>: int/string</p></blockquote><p>Значение по умолчанию — 0 (неограниченно). Максимальное количество раз, которое соединение может быть использовано повторно. По достижении этого значения ядро больше не будет назначать потоки этому соединению, и оно будет разорвано после закрытия последнего внутреннего потока.</p><blockquote><p><code>cMaxLifetimeMs</code>: int/string</p></blockquote><p>Значение по умолчанию — 0 (неограниченно). Максимальное время &quot;жизни&quot; соединения. По истечении этого времени ядро больше не будет назначать потоки этому соединению, и оно будет разорвано после закрытия последнего внутреннего потока.</p><h2 id="версия-http" tabindex="-1"><a class="header-anchor" href="#версия-http"><span>Версия HTTP</span></a></h2><h3 id="поведение-клиента" tabindex="-1"><a class="header-anchor" href="#поведение-клиента"><span>Поведение клиента</span></a></h3><p>По умолчанию клиент будет использовать http/1.1, если TLS не включен, и h2, если TLS включен.</p><p>Если TLS включен, можно указать конкретную версию HTTP (http/1.1, h2, h3) в массиве <code>alpn</code> в настройках TLS (работает только в том случае, если массив содержит только один элемент, если указано несколько элементов, будет использоваться поведение по умолчанию).</p><h3 id="поведение-сервера" tabindex="-1"><a class="header-anchor" href="#поведение-сервера"><span>Поведение сервера</span></a></h3><p>По умолчанию сервер будет прослушивать TCP-порт и обрабатывать трафик http/1.1 и h2.</p><p>Если TLS включен, можно указать <code>h3</code> в массиве <code>alpn</code> в настройках TLS. В этом случае сервер будет прослушивать UDP-порт и обрабатывать трафик h3.</p><h3 id="советы" tabindex="-1"><a class="header-anchor" href="#советы"><span>Советы</span></a></h3><p>Поскольку этот протокол основан на стандартных HTTP-запросах, он нечувствителен к преобразованию версий HTTP, и различные промежуточные узлы могут преобразовывать версии HTTP.</p><p>Например, если вы хотите использовать h3 для подключения к Cloudflare, но Cloudflare не будет использовать h3 для обратного подключения, а будет использовать http/1.1 или h2, то на клиенте <code>alpn</code> должен быть установлен в <code>h3</code>, а на сервере — нет, поскольку запросы, отправляемые на сервер, не будут использовать h3.</p><h2 id="browser-dialer" tabindex="-1"><a class="header-anchor" href="#browser-dialer"><span>Browser Dialer</span></a></h2>',19),P=n("h2",{id:"подробности-протокола",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#подробности-протокола"},[n("span",null,"Подробности протокола")])],-1),f={href:"https://github.com/XTLS/Xray-core/pull/3412",target:"_blank",rel:"noopener noreferrer"},y={href:"https://github.com/XTLS/Xray-core/pull/3462",target:"_blank",rel:"noopener noreferrer"},H=t('<ol><li>Загрузка начинается с запроса <code>GET /&lt;UUID&gt;</code>. Сервер немедленно отвечает <code>200 OK</code> и <code>Transfer Encoding:chunked</code> и сразу же отправляет двухбайтовую полезную нагрузку, чтобы заставить HTTP-промежуточные узлы сбросить заголовки.</li></ol><p>На данный момент сервер отправляет следующие заголовки:</p><ul><li><code>X-Accel-Buffering: no</code> — отключает буферизацию.</li><li><code>Content-Type: text/event-stream</code> — отключает буферизацию на некоторых промежуточных узлах, можно отключить с помощью опции <code>&quot;noSSEHeader&quot;</code>.</li><li><code>Transfer-Encoding: chunked</code> — кодировка передачи данных, используется только в HTTP/1.1.</li><li><code>Cache-Control: no-store</code> — отключает любое возможное кэширование ответов.</li></ul><ol start="2"><li><p>Выгрузка начинается с запроса <code>POST /&lt;UUID&gt;/&lt;seq&gt;</code>. <code>seq</code> работает аналогично порядковому номеру TCP, начиная с 0. Пакеты данных могут отправляться одновременно, сервер должен пересобрать данные в соответствии с порядковым номером. Порядковый номер не должен сбрасываться.</p><p>Клиент может открывать запросы на выгрузку и загрузку в любом порядке, любой из них может инициировать сеанс, но соединение <code>GET</code> должно быть открыто в течение 30 секунд, иначе сеанс будет разорван.</p></li><li><p>Запрос <code>GET</code> будет оставаться открытым до тех пор, пока соединение не будет разорвано. Как сервер, так и клиент могут закрыть соединение. Конкретное поведение зависит от версии HTTP.</p></li></ol><p>Рекомендации:</p><ul><li><p>Не ожидайте, что CDN будет правильно передавать все заголовки. Цель этого протокола — обойти CDN, которые не поддерживают WS, а такие CDN обычно ведут себя не очень хорошо.</p></li><li><p>Следует предполагать, что все HTTP-соединения не поддерживают потоковые запросы, поэтому размер каждого пакета, отправляемого по исходящему соединению, должен основываться на задержке, пропускной способности и ограничениях самого промежуточного узла (аналогично MTU и алгоритму Нейгла в TCP).</p></li></ul>',6);function C(S,M){const r=o("I18nTip"),c=o("Badge"),a=o("RouterLink"),l=o("ExternalLinkIcon");return d(),u("div",null,[s(r),k,s(c,{text:"v1.8.16+",type:"warning"}),b,n("p",null,[e("Задает размер заполнения для запросов (исходящих) и ответов (входящих), используемый для уменьшения отпечатка запроса. Единица измерения: байты. Значение по умолчанию: "),m,e(". При каждом запросе случайным образом выбирается число из этого диапазона. Тип: "),s(a,{to:"/ru/development/intro/guide.html#int32range"},{default:p(()=>[e("Int32Range")]),_:1})]),q,T,v,s(c,{text:"v24.9.19+",type:"warning"}),x,n("ul",null,[_,n("li",null,[e("Все следующие поля имеют тип "),s(a,{to:"/ru/development/intro/guide.html#int32range"},{default:p(()=>[e("Int32Range")]),_:1}),e(":")])]),g,n("p",null,[e("При использовании HTTPS этот транспорт также поддерживает "),s(a,{to:"/ru/config/features/browser_dialer.html"},{default:p(()=>[e("Browser Dialer")]),_:1}),e(".")]),P,n("p",null,[e("Подробное обсуждение см. в "),n("a",f,[e("#3412"),s(l)]),e(" и "),n("a",y,[e("#3462"),s(l)]),e(". Ниже приведено краткое описание и требования к совместимости реализации:")]),H])}const L=i(h,[["render",C],["__file","splithttp.html.vue"]]);export{L as default};
