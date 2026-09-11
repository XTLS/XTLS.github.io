import{at as e,it as t,t as n,vt as r}from"./chunks/framework.B8HA7oqK.js";var i=JSON.parse(`{"title":"Создание TLS-туннеля с помощью Nginx или Haproxy для скрытия отпечатков","description":"","frontmatter":{},"headers":[],"relativePath":"ru/document/level-2/nginx_or_haproxy_tls_tunnel.md","filePath":"ru/document/level-2/nginx_or_haproxy_tls_tunnel.md","lastUpdated":1783775751000}`),a={name:`ru/document/level-2/nginx_or_haproxy_tls_tunnel.md`};function o(n,i,a,o,s,c){return r(),t(`div`,null,[...i[0]||=[e(`<h1 id="создание-tls-туннеля-с-помощью-nginx-или-haproxy-для-скрытия-отпечатков" tabindex="-1">Создание TLS-туннеля с помощью Nginx или Haproxy для скрытия отпечатков <a class="header-anchor" href="#создание-tls-туннеля-с-помощью-nginx-или-haproxy-для-скрытия-отпечатков" aria-label="Permalink to “Создание TLS-туннеля с помощью Nginx или Haproxy для скрытия отпечатков”">​</a></h1><p>Nginx или Haproxy реализуют HTTPS-туннели, туннели HTTP/2 over HTTPS, туннели WebSocket over HTTP/2 over HTTPS, туннели gRPC over HTTP/2 over HTTPS, а также туннели gRPC over HTTP/2 over HTTPS с двусторонней аутентификацией по самозаверяющему сертификату.</p><h2 id="создание-https-туннеля-с-помощью-nginx-на-стороне-клиента-и-сервера-для-скрытия-отпечатков" tabindex="-1">Создание HTTPS-туннеля с помощью Nginx на стороне клиента и сервера для скрытия отпечатков <a class="header-anchor" href="#создание-https-туннеля-с-помощью-nginx-на-стороне-клиента-и-сервера-для-скрытия-отпечатков" aria-label="Permalink to “Создание HTTPS-туннеля с помощью Nginx на стороне клиента и сервера для скрытия отпечатков”">​</a></h2><p>Сетевая структура:</p><p>xray_client ---tcp--- nginx_client ---HTTPS--- nginx_sever ---tcp--- xray_server</p><h2 id="компиляция-nginx-с-поддержкои-with-stream" tabindex="-1">Компиляция nginx с поддержкой --with-stream <a class="header-anchor" href="#компиляция-nginx-с-поддержкои-with-stream" aria-label="Permalink to “Компиляция nginx с поддержкой --with-stream”">​</a></h2><p>Выполните компиляцию как на клиенте, так и на сервере.</p><p><code>curl -O -L http://nginx.org/download/nginx-1.22.1.tar.gz</code></p><p><code>tar -zxvf nginx-1.22.1.tar.gz</code></p><p><code>cd nginx-1.22.1</code></p><p><code>apt install gcc make</code> // Для компиляции требуются gcc и make</p><p><code>./configure --prefix=/usr/local/nginx --with-http_ssl_module --with-http_v2_module --with-stream --with-stream_ssl_module</code> // На этом шаге могут потребоваться дополнительные библиотеки, установите их в соответствии с сообщениями об ошибках.</p><p><code>make &amp;&amp; make install</code></p><p>После компиляции папка nginx будет находиться в <code>/usr/local/nginx</code>.</p><h2 id="настроика-nginx" tabindex="-1">Настройка nginx <a class="header-anchor" href="#настроика-nginx" aria-label="Permalink to “Настройка nginx”">​</a></h2><p>Отредактируйте конфигурационный файл nginx.conf.</p><p><code>vim /usr/local/nginx/conf/nginx.conf</code></p><p>Добавьте следующую конфигурацию на стороне сервера.</p><p>Получение сертификата для сервера не рассматривается в данном руководстве. Обратитесь к <a href="./../level-0/ch06-certificates.html">документации</a>.</p><div class="language- line-numbers-mode"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes dark-plus light-plus" style="--shiki-dark:#D4D4D4;--shiki-light:#000000;--shiki-dark-bg:#1E1E1E;--shiki-light-bg:#FFFFFF;" tabindex="0" dir="ltr"><code><span class="line"><span>stream {</span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        listen 443 ssl;</span></span>
<span class="line"><span>        listen [::]:443 ssl;</span></span>
<span class="line"><span>        ssl_protocols TLSv1.3;</span></span>
<span class="line"><span>        ssl_certificate /path/to/cert/domain.crt; # Путь к файлу crt</span></span>
<span class="line"><span>        ssl_certificate_key /path/to/cert/domain.key; # Путь к файлу key</span></span>
<span class="line"><span>        proxy_pass unix:/dev/shm/vless.sock; # Использование доменного сокета</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><div class="warning custom-block"><p class="custom-block-title">Внимание</p><p>Раздел stream находится на одном уровне с модулем http. Клиент может удалить раздел http, а сервер может удалить его или настроить веб-сайт для маскировки.</p></div><p>Добавьте следующую конфигурацию на стороне клиента.</p><div class="language- line-numbers-mode"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes dark-plus light-plus" style="--shiki-dark:#D4D4D4;--shiki-light:#000000;--shiki-dark-bg:#1E1E1E;--shiki-light-bg:#FFFFFF;" tabindex="0" dir="ltr"><code><span class="line"><span>stream {</span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        listen 6666;</span></span>
<span class="line"><span>        listen [::]:6666;</span></span>
<span class="line"><span>        proxy_ssl on;</span></span>
<span class="line"><span>        proxy_ssl_protocols TLSv1.3;</span></span>
<span class="line"><span>        proxy_ssl_server_name on;</span></span>
<span class="line"><span>        proxy_ssl_name yourdomain.domain; # Доменное имя сервера</span></span>
<span class="line"><span>        proxy_pass ip:443; # IP-адрес сервера, например, proxy_pass 6.6.6.6:443; или proxy_pass [2401:0:0::1]:443;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>Создайте файл <code>nginx.service</code> в папке <code>/etc/systemd/system</code>.</p><p><code>vim /etc/systemd/system/nginx.service</code></p><p>Добавьте следующий текст:</p><div class="language- line-numbers-mode"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes dark-plus light-plus" style="--shiki-dark:#D4D4D4;--shiki-light:#000000;--shiki-dark-bg:#1E1E1E;--shiki-light-bg:#FFFFFF;" tabindex="0" dir="ltr"><code><span class="line"><span>[Unit]</span></span>
<span class="line"><span>Description=The NGINX HTTP and reverse proxy server</span></span>
<span class="line"><span>After=syslog.target network-online.target remote-fs.target nss-lookup.target</span></span>
<span class="line"><span>After=xray.service</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Service]</span></span>
<span class="line"><span>Type=forking</span></span>
<span class="line"><span>ExecStartPre=/usr/local/nginx/sbin/nginx -t</span></span>
<span class="line"><span>ExecStart=/usr/local/nginx/sbin/nginx</span></span>
<span class="line"><span>ExecReload=/usr/local/nginx/sbin/nginx -s reload</span></span>
<span class="line"><span>ExecStop=/bin/kill -s QUIT $MAINPID</span></span>
<span class="line"><span>PrivateTmp=true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Install]</span></span>
<span class="line"><span>WantedBy=multi-user.target</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>Добавьте автоматический запуск при загрузке системы.</p><p><code>systemctl enable nginx</code></p><h2 id="настроика-xray" tabindex="-1">Настройка Xray <a class="header-anchor" href="#настроика-xray" aria-label="Permalink to “Настройка Xray”">​</a></h2><p>Конфигурация Xray на стороне сервера:</p><div class="language-json line-numbers-mode"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes dark-plus light-plus" style="--shiki-dark:#D4D4D4;--shiki-light:#000000;--shiki-dark-bg:#1E1E1E;--shiki-light-bg:#FFFFFF;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">{</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;log&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">    &quot;loglevel&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;none&quot;</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">  },</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;inbounds&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: [</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">    {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;listen&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;/dev/shm/vless.sock,0666&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;protocol&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;vless&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;settings&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;users&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: [</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">          {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">            &quot;id&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;uuid&quot;</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">          }</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">        ],</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;decryption&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;none&quot;</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      },</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;streamSettings&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;method&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;tcp&quot;</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      },</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;sniffing&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;enabled&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#569CD6;--shiki-light:#0000FF;">true</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;destOverride&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: [</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;http&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">, </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;tls&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">]</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      }</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">    }</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">  ],</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;outbounds&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: [</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">    {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;protocol&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;freedom&quot;</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">    }</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">  ]</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>Конфигурация Xray на стороне клиента (в данном примере используется прозрачное проксирование пограничного маршрутизатора):</p><div class="language-json line-numbers-mode"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes dark-plus light-plus" style="--shiki-dark:#D4D4D4;--shiki-light:#000000;--shiki-dark-bg:#1E1E1E;--shiki-light-bg:#FFFFFF;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">{</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;log&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">    &quot;loglevel&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;none&quot;</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">  },</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;dns&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">    &quot;servers&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: [</span></span>
<span class="line"><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">      &quot;1.1.1.1&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;address&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;119.29.29.29&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;domains&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: [</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;geosite:cn&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">],</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;expectIP&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: [</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;geoip:cn&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">]</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      }</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">    ],</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">    &quot;disableFallback&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#569CD6;--shiki-light:#0000FF;">true</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">    &quot;disableFallbackIfMatch&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#569CD6;--shiki-light:#0000FF;">true</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">  },</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;inbounds&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: [</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">    {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;tag&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;tproxy-in&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;port&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#B5CEA8;--shiki-light:#098658;">12345</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;protocol&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;tunnel&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;settings&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;allowedNetwork&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;tcp,udp&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;followRedirect&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#569CD6;--shiki-light:#0000FF;">true</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      },</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;sniffing&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;enabled&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#569CD6;--shiki-light:#0000FF;">true</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;destOverride&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: [</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;http&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">, </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;tls&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">]</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      },</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;streamSettings&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;sockopt&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">          &quot;tproxy&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;tproxy&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">          &quot;mark&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#B5CEA8;--shiki-light:#098658;">255</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">        }</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      }</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">    },</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">    {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;tag&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;http&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;port&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#B5CEA8;--shiki-light:#098658;">10808</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;listen&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;127.0.0.1&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;protocol&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;http&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;sniffing&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;enabled&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#569CD6;--shiki-light:#0000FF;">true</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;destOverride&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: [</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;http&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">, </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;tls&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">]</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      }</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">    }</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">  ],</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;outbounds&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: [</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">    {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;tag&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;nginxtls&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;protocol&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;vless&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;settings&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;address&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;127.0.0.1&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;port&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#B5CEA8;--shiki-light:#098658;">6666</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;id&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;uuid&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;encryption&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;none&quot;</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      },</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;streamSettings&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;sockopt&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">          &quot;mark&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#B5CEA8;--shiki-light:#098658;">255</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">        },</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;method&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;tcp&quot;</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      }</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">    },</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">    {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;tag&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;direct&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;protocol&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;freedom&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;streamSettings&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;sockopt&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">          &quot;mark&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#B5CEA8;--shiki-light:#098658;">255</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">        }</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      }</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">    },</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">    {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;tag&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;block&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;protocol&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;blackhole&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">      &quot;settings&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;response&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">          &quot;type&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;http&quot;</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">        }</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      }</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">    }</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">  ],</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;routing&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">    &quot;domainMatcher&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;mph&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">    &quot;domainStrategy&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;AsIs&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">    &quot;rules&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: [</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;domain&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: [</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;geosite:category-ads-all&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">],</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;outboundTag&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;block&quot;</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      },</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;port&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#B5CEA8;--shiki-light:#098658;">123</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;network&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;udp&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;outboundTag&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;direct&quot;</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      },</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;ip&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: [</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;1.1.1.1&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">],</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;outboundTag&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;proxy&quot;</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      },</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;domain&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: [</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;geosite:cn&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">],</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;outboundTag&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;direct&quot;</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      },</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;protocol&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: [</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;bittorrent&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">],</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;outboundTag&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;direct&quot;</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      },</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;ip&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: [</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;geoip:private&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">],</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;outboundTag&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;direct&quot;</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      },</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;inboundTag&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: [</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;tproxy-in&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">],</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">        &quot;outboundTag&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;nginxtls&quot;</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">      }</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">    ]</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">  }</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br></div></div><p>При использовании прозрачного проксирования необходимо добавить следующие правила в конфигурацию iptables или ip6tables:</p><div class="language- line-numbers-mode"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes dark-plus light-plus" style="--shiki-dark:#D4D4D4;--shiki-light:#000000;--shiki-dark-bg:#1E1E1E;--shiki-light-bg:#FFFFFF;" tabindex="0" dir="ltr"><code><span class="line"><span># Настройка маршрутизации по политике для IPv4</span></span>
<span class="line"><span>ip rule add fwmark 1 table 100</span></span>
<span class="line"><span>ip route add local 0.0.0.0/0 dev lo table 100</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Настройка маршрутизации по политике для IPv6</span></span>
<span class="line"><span>ip -6 rule add fwmark 1 table 106</span></span>
<span class="line"><span>ip -6 route add local ::/0 dev lo table 106</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Прямое подключение для IP-адреса VPS</span></span>
<span class="line"><span>iptables -t mangle -A XRAY_MASK -d VSP_IPv4/32 -j RETURN</span></span>
<span class="line"><span>ip6tables -t mangle -A XRAY6_MASK -d VPS_IPv6/128 -j RETURN</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="запуск-сервисов-на-клиенте-и-сервере" tabindex="-1">Запуск сервисов на клиенте и сервере <a class="header-anchor" href="#запуск-сервисов-на-клиенте-и-сервере" aria-label="Permalink to “Запуск сервисов на клиенте и сервере”">​</a></h2><p><code>systemctl restart xray</code></p><p><code>systemctl restart nginx</code></p><h2 id="завершение" tabindex="-1">Завершение <a class="header-anchor" href="#завершение" aria-label="Permalink to “Завершение”">​</a></h2><h1 id="создание-https-туннеля-с-помощью-haproxy-на-стороне-клиента-и-сервера-для-скрытия-отпечатков" tabindex="-1">Создание HTTPS-туннеля с помощью Haproxy на стороне клиента и сервера для скрытия отпечатков <a class="header-anchor" href="#создание-https-туннеля-с-помощью-haproxy-на-стороне-клиента-и-сервера-для-скрытия-отпечатков" aria-label="Permalink to “Создание HTTPS-туннеля с помощью Haproxy на стороне клиента и сервера для скрытия отпечатков”">​</a></h1><p>Установка Haproxy:</p><p><code>pacman -Su haproxy</code> или <code>apt install haproxy</code></p><p>Haproxy требует OpenSSL для обработки SSL. Проверьте версию OpenSSL и при необходимости установите или обновите ее.</p><h2 id="https-туннель" tabindex="-1">HTTPS-туннель <a class="header-anchor" href="#https-туннель" aria-label="Permalink to “HTTPS-туннель”">​</a></h2><p>Haproxy может легко реализовать HTTPS-туннель, как и описанный выше Nginx.</p><p>Сетевая структура:</p><p>xray_client ---tcp--- haproxy_client ---HTTPS--- haproxy_sever ---tcp--- xray_server</p><h3 id="конфигурация-haproxy-client-удалите-комментарии-перед-запуском" tabindex="-1">Конфигурация haproxy_client (удалите комментарии перед запуском): <a class="header-anchor" href="#конфигурация-haproxy-client-удалите-комментарии-перед-запуском" aria-label="Permalink to “Конфигурация haproxy_client (удалите комментарии перед запуском):”">​</a></h3><div class="language- line-numbers-mode"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes dark-plus light-plus" style="--shiki-dark:#D4D4D4;--shiki-light:#000000;--shiki-dark-bg:#1E1E1E;--shiki-light-bg:#FFFFFF;" tabindex="0" dir="ltr"><code><span class="line"><span>global</span></span>
<span class="line"><span>    log /dev/log local0 alert</span></span>
<span class="line"><span>    log /dev/log local1 alert</span></span>
<span class="line"><span>    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners</span></span>
<span class="line"><span>    stats timeout 30s</span></span>
<span class="line"><span>    user root</span></span>
<span class="line"><span>    group root</span></span>
<span class="line"><span>    daemon</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Принудительное использование TLS 1.3 для туннеля</span></span>
<span class="line"><span>    ssl-default-server-options ssl-min-ver TLSv1.3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>defaults</span></span>
<span class="line"><span>    log global</span></span>
<span class="line"><span>    mode tcp</span></span>
<span class="line"><span>    timeout connect 5s</span></span>
<span class="line"><span>    timeout client  300s</span></span>
<span class="line"><span>    timeout server  300s</span></span>
<span class="line"><span></span></span>
<span class="line"><span>frontend xray</span></span>
<span class="line"><span>    bind 127.0.0.1:6666 # Прослушивание порта 6666 на локальном хосте</span></span>
<span class="line"><span>    default_backend tunnel</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backend tunnel</span></span>
<span class="line"><span>    server tunnel www.example.com:443 ssl verify none sni req.hdr(host) alpn h2,http/1.1</span></span>
<span class="line"><span>    # Можно использовать доменное имя или IP-адрес. При использовании доменного имени рекомендуется указать IP-адрес в файле hosts, чтобы сократить время разрешения имени.</span></span>
<span class="line"><span>    # alpn используется для согласования с сервером. Если на стороне сервера установлено alpn h2,http1.1, то клиент может указать h2 для подключения по HTTP/2 или http1.1 для подключения по HTTP.</span></span>
<span class="line"><span>    # Рекомендуется указывать h2 в обоих случаях.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h3 id="конфигурация-haproxy-server-удалите-комментарии-перед-запуском" tabindex="-1">Конфигурация haproxy_server (удалите комментарии перед запуском): <a class="header-anchor" href="#конфигурация-haproxy-server-удалите-комментарии-перед-запуском" aria-label="Permalink to “Конфигурация haproxy_server (удалите комментарии перед запуском):”">​</a></h3><div class="language- line-numbers-mode"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes dark-plus light-plus" style="--shiki-dark:#D4D4D4;--shiki-light:#000000;--shiki-dark-bg:#1E1E1E;--shiki-light-bg:#FFFFFF;" tabindex="0" dir="ltr"><code><span class="line"><span>global</span></span>
<span class="line"><span>    log /dev/log local0 alert</span></span>
<span class="line"><span>    log /dev/log local1 alert</span></span>
<span class="line"><span>    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners</span></span>
<span class="line"><span>    stats timeout 30s</span></span>
<span class="line"><span>    user root</span></span>
<span class="line"><span>    group root</span></span>
<span class="line"><span>    daemon</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Указание наборов шифров и минимальной версии SSL 1.2 для повышения безопасности</span></span>
<span class="line"><span>    ssl-default-bind-ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256</span></span>
<span class="line"><span>    ssl-default-bind-ciphersuites TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256</span></span>
<span class="line"><span>    ssl-default-bind-options ssl-min-ver TLSv1.2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>defaults</span></span>
<span class="line"><span>    log global</span></span>
<span class="line"><span>    mode tcp</span></span>
<span class="line"><span>    timeout connect 5s</span></span>
<span class="line"><span>    timeout client  300s</span></span>
<span class="line"><span>    timeout server  300s</span></span>
<span class="line"><span></span></span>
<span class="line"><span>frontend tls-in</span></span>
<span class="line"><span>    bind :::443 ssl crt /path/to/pem alpn h2,http/1.1 # Haproxy использует pem для расшифровки SSL. Файл pem можно получить с помощью команды cat www.example.com.crt www.example.com.key &gt; www.example.com.pem</span></span>
<span class="line"><span>    default_backend xray</span></span>
<span class="line"><span>    tcp-request inspect-delay 5s</span></span>
<span class="line"><span>    tcp-request content accept if HTTP</span></span>
<span class="line"><span>    use_backend web if HTTP</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backend xray</span></span>
<span class="line"><span>    server xray /dev/shm/vless.sock # Поддерживаются абстрактные сокеты: &quot;abns@vless.sock&quot; и loopback: 127.0.0.1:6666</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backend web</span></span>
<span class="line"><span>    server web /dev/shm/h1h2c.sock # Перенаправление на веб-сайт</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><h3 id="настроика-xray-1" tabindex="-1">Настройка Xray <a class="header-anchor" href="#настроика-xray-1" aria-label="Permalink to “Настройка Xray”">​</a></h3><p>Аналогично разделу Nginx: простейшая конфигурация TCP, совместимая с любым протоколом. Рекомендуется использовать VLESS+TCP без дополнительного шифрования. Обратитесь к документации или другим примерам.</p><h2 id="websocket-over-http-2" tabindex="-1">WebSocket over HTTP/2 <a class="header-anchor" href="#websocket-over-http-2" aria-label="Permalink to “WebSocket over HTTP/2”">​</a></h2><p>Haproxy поддерживает h2c как для входящих, так и для исходящих подключений HTTP/2.</p><p>Однако в документации Xray по HTTP/2 говорится:</p><p>“В соответствии с рекомендациями по HTTP/2, клиент и сервер должны одновременно включать TLS для корректной работы этого метода передачи... В текущей версии HTTP/2 для входящих подключений (сервер) не требуется настройка TLS.”</p><p>То есть для входящих подключений можно использовать h2c, но для исходящих подключений h2c не поддерживается. Поэтому невозможно использовать схему xray_client ---h2c--- haproxy_client ---HTTP/2+TLS--- haproxy_sever ---h2c--- xray_server.</p><p>Однако можно обойти это ограничение, используя WebSocket. Haproxy поддерживает ws over HTTP/2.</p><p>Тогда сетевая структура будет выглядеть следующим образом: xray_client ---ws--- haproxy_client ---ws over HTTP/2 over HTTPS--- haproxy_sever ---ws--- xray_server.</p><h3 id="конфигурация-haproxy-client" tabindex="-1">Конфигурация haproxy_client: <a class="header-anchor" href="#конфигурация-haproxy-client" aria-label="Permalink to “Конфигурация haproxy_client:”">​</a></h3><div class="language- line-numbers-mode"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes dark-plus light-plus" style="--shiki-dark:#D4D4D4;--shiki-light:#000000;--shiki-dark-bg:#1E1E1E;--shiki-light-bg:#FFFFFF;" tabindex="0" dir="ltr"><code><span class="line"><span>global</span></span>
<span class="line"><span>    log /dev/log local0 alert</span></span>
<span class="line"><span>    log /dev/log local1 alert</span></span>
<span class="line"><span>    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners</span></span>
<span class="line"><span>    stats timeout 30s</span></span>
<span class="line"><span>    user root</span></span>
<span class="line"><span>    group root</span></span>
<span class="line"><span>    daemon</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Настройка производительности HTTP/2. Эти параметры можно изменять при возникновении проблем с производительностью HTTP/2.</span></span>
<span class="line"><span>    # Дополнительные настройки см. в разделе tune.h2 документации Haproxy: https://docs.haproxy.org/2.7/configuration.html</span></span>
<span class="line"><span>    tune.h2.initial-window-size 536870912 # Начальный размер окна, рекомендуется настроить, значение по умолчанию - 65536 байт.</span></span>
<span class="line"><span>    # При резком увеличении трафика может потребоваться время на загрузку, рекомендуется настраивать в зависимости от скорости интернета.</span></span>
<span class="line"><span>    tune.h2.max-concurrent-streams 512 # Количество одновременных потоков, можно настроить при необходимости, значение по умолчанию - 100.</span></span>
<span class="line"><span>    # Обычно не требуется изменять (не рекомендуется официальной документацией).</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ssl-default-server-options ssl-min-ver TLSv1.3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>defaults</span></span>
<span class="line"><span>    log global</span></span>
<span class="line"><span>    mode http</span></span>
<span class="line"><span>    timeout connect 5s</span></span>
<span class="line"><span>    timeout client  300s</span></span>
<span class="line"><span>    timeout server  300s</span></span>
<span class="line"><span></span></span>
<span class="line"><span>frontend xray</span></span>
<span class="line"><span>    bind 127.0.0.1:6666</span></span>
<span class="line"><span>    default_backend tunnel</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backend tunnel</span></span>
<span class="line"><span>    server tunnel www.example.com:443 ssl verify none sni req.hdr(host) ws h2 alpn h2</span></span>
<span class="line"><span>    # ws over HTTP/2</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h3 id="конфигурация-haproxy-server" tabindex="-1">Конфигурация haproxy_server: <a class="header-anchor" href="#конфигурация-haproxy-server" aria-label="Permalink to “Конфигурация haproxy_server:”">​</a></h3><div class="language- line-numbers-mode"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes dark-plus light-plus" style="--shiki-dark:#D4D4D4;--shiki-light:#000000;--shiki-dark-bg:#1E1E1E;--shiki-light-bg:#FFFFFF;" tabindex="0" dir="ltr"><code><span class="line"><span>global</span></span>
<span class="line"><span>    log /dev/log local0 alert</span></span>
<span class="line"><span>    log /dev/log local1 alert</span></span>
<span class="line"><span>    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners</span></span>
<span class="line"><span>    stats timeout 30s</span></span>
<span class="line"><span>    user root</span></span>
<span class="line"><span>    group root</span></span>
<span class="line"><span>    daemon</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Настройка производительности HTTP/2 (необязательно, но рекомендуется).</span></span>
<span class="line"><span>    tune.h2.initial-window-size 536870912</span></span>
<span class="line"><span>    tune.h2.max-concurrent-streams 512</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ssl-default-bind-ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256</span></span>
<span class="line"><span>    ssl-default-bind-ciphersuites TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256</span></span>
<span class="line"><span>    ssl-default-bind-options ssl-min-ver TLSv1.2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>defaults</span></span>
<span class="line"><span>    log global</span></span>
<span class="line"><span>    mode http</span></span>
<span class="line"><span>    timeout connect 5s</span></span>
<span class="line"><span>    timeout client  300s</span></span>
<span class="line"><span>    timeout server  300s</span></span>
<span class="line"><span></span></span>
<span class="line"><span>frontend tls-in</span></span>
<span class="line"><span>    bind :::443 ssl crt /path/to/pem alpn h2,http/1.1</span></span>
<span class="line"><span>    use_backend xray if { ssl_fc_alpn -i h2 } { path_beg /tunnel }</span></span>
<span class="line"><span>    use_backend server1 if { ssl_fc_alpn -i h2 } { path_beg /path1 }</span></span>
<span class="line"><span>    use_backend server2 if { ssl_fc_alpn -i h2 } { path_beg /path2 }</span></span>
<span class="line"><span>    use_backend server3 if { ssl_fc_alpn -i h2 } { path_beg /path3 }</span></span>
<span class="line"><span>    default_backend web</span></span>
<span class="line"><span>    # Haproxy в режиме http может разделять трафик на основе пути.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backend xray</span></span>
<span class="line"><span>    server xray abns@vless.sock ws h1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backend server1</span></span>
<span class="line"><span>    server server1 abns@server1.sock ws h1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backend server2</span></span>
<span class="line"><span>    server server2 abns@server2.sock ws h1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backend server3</span></span>
<span class="line"><span>    server server3 abns@server3.sock ws h1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backend web</span></span>
<span class="line"><span>    server web /dev/shm/h1h2c.sock</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><h3 id="настроика-xray-2" tabindex="-1">Настройка Xray <a class="header-anchor" href="#настроика-xray-2" aria-label="Permalink to “Настройка Xray”">​</a></h3><p>Простая конфигурация WebSocket, TLS не требуется. Пример конфигурации см. в документации Xray. Параметр &quot;path&quot; можно использовать для разделения трафика на стороне сервера Haproxy (клиент также может разделять трафик с помощью Haproxy, принцип аналогичен, см. конфигурацию разделения трафика на стороне сервера).</p><h2 id="grpc-over-http-2" tabindex="-1">gRPC over HTTP/2 <a class="header-anchor" href="#grpc-over-http-2" aria-label="Permalink to “gRPC over HTTP/2”">​</a></h2><p>Хотя двусторонний h2c невозможен, gRPC не требует обязательного использования TLS.</p><p>Сетевая структура: xray_client ---gRPC h2c--- haproxy_client ---gRPC over HTTP/2 over HTTPS--- haproxy_sever ---gRPC h2c--- xray_server</p><h3 id="конфигурация-haproxy-client-1" tabindex="-1">Конфигурация haproxy_client: <a class="header-anchor" href="#конфигурация-haproxy-client-1" aria-label="Permalink to “Конфигурация haproxy_client:”">​</a></h3><div class="language- line-numbers-mode"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes dark-plus light-plus" style="--shiki-dark:#D4D4D4;--shiki-light:#000000;--shiki-dark-bg:#1E1E1E;--shiki-light-bg:#FFFFFF;" tabindex="0" dir="ltr"><code><span class="line"><span>global</span></span>
<span class="line"><span>    log /dev/log local0 alert</span></span>
<span class="line"><span>    log /dev/log local1 alert</span></span>
<span class="line"><span>    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners</span></span>
<span class="line"><span>    stats timeout 30s</span></span>
<span class="line"><span>    user root</span></span>
<span class="line"><span>    group root</span></span>
<span class="line"><span>    daemon</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    tune.h2.initial-window-size 536870912</span></span>
<span class="line"><span>    tune.h2.max-concurrent-streams 512</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ssl-default-server-options ssl-min-ver TLSv1.3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>defaults</span></span>
<span class="line"><span>    log global</span></span>
<span class="line"><span>    mode http</span></span>
<span class="line"><span>    timeout connect 5s</span></span>
<span class="line"><span>    timeout client  300s</span></span>
<span class="line"><span>    timeout server  300s</span></span>
<span class="line"><span></span></span>
<span class="line"><span>frontend xray</span></span>
<span class="line"><span>    bind 127.0.0.1:6666 proto h2 # Укажите proto h2 для использования h2c</span></span>
<span class="line"><span>    default_backend tunnel</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backend tunnel</span></span>
<span class="line"><span>    server tunnel www.example.com:443 ssl verify none sni req.hdr(host) alpn h2</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h3 id="конфигурация-haproxy-server-1" tabindex="-1">Конфигурация haproxy_server: <a class="header-anchor" href="#конфигурация-haproxy-server-1" aria-label="Permalink to “Конфигурация haproxy_server:”">​</a></h3><div class="language- line-numbers-mode"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes dark-plus light-plus" style="--shiki-dark:#D4D4D4;--shiki-light:#000000;--shiki-dark-bg:#1E1E1E;--shiki-light-bg:#FFFFFF;" tabindex="0" dir="ltr"><code><span class="line"><span>global</span></span>
<span class="line"><span>    log /dev/log local0 alert</span></span>
<span class="line"><span>    log /dev/log local1 alert</span></span>
<span class="line"><span>    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners</span></span>
<span class="line"><span>    stats timeout 30s</span></span>
<span class="line"><span>    user root</span></span>
<span class="line"><span>    group root</span></span>
<span class="line"><span>    daemon</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    tune.h2.initial-window-size 536870912</span></span>
<span class="line"><span>    tune.h2.max-concurrent-streams 512</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ssl-default-bind-ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256</span></span>
<span class="line"><span>    ssl-default-bind-ciphersuites TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256</span></span>
<span class="line"><span>    ssl-default-bind-options ssl-min-ver TLSv1.2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>defaults</span></span>
<span class="line"><span>    log global</span></span>
<span class="line"><span>    mode http</span></span>
<span class="line"><span>    timeout connect 5s</span></span>
<span class="line"><span>    timeout client  300s</span></span>
<span class="line"><span>    timeout server  300s</span></span>
<span class="line"><span></span></span>
<span class="line"><span>frontend tls-in</span></span>
<span class="line"><span>    bind :::443 ssl crt /path/to/pem alpn h2,http/1.1</span></span>
<span class="line"><span>    use_backend xray if { ssl_fc_alpn -i h2 } { path_beg /tunnel } # &quot;serviceName&quot;, настроенное в gRPC Xray, можно использовать для разделения трафика в Haproxy с помощью пути.</span></span>
<span class="line"><span>    # Для удобства использования &quot;multiMode&quot; используйте параметр path_beg для сопоставления пути.</span></span>
<span class="line"><span>    use_backend server1 if { ssl_fc_alpn -i h2 } { path_beg /path1 }</span></span>
<span class="line"><span>    use_backend server2 if { ssl_fc_alpn -i h2 } { path_beg /path2 }</span></span>
<span class="line"><span>    use_backend server3 if { ssl_fc_alpn -i h2 } { path_beg /path3 }</span></span>
<span class="line"><span>    default_backend web</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backend xray</span></span>
<span class="line"><span>    server xray abns@vless.sock proto h2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backend server1</span></span>
<span class="line"><span>    server server1 abns@server1.sock proto h2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backend server2</span></span>
<span class="line"><span>    server server2 abns@server2.sock proto h2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backend server3</span></span>
<span class="line"><span>    server server3 abns@server3.sock proto h2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backend web</span></span>
<span class="line"><span>    server web /dev/shm/h1h2c.sock</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br></div></div><h3 id="настроика-xray-3" tabindex="-1">Настройка Xray <a class="header-anchor" href="#настроика-xray-3" aria-label="Permalink to “Настройка Xray”">​</a></h3><p>Простая конфигурация gRPC, TLS не требуется. Конфигурация см. в документации. Параметр serviceName можно использовать для разделения трафика.</p><h1 id="двусторонняя-аутентификация-haproxy-с-использованием-самозаверяющего-сертификата-пример-grpc" tabindex="-1">Двусторонняя аутентификация Haproxy с использованием самозаверяющего сертификата (пример gRPC) <a class="header-anchor" href="#двусторонняя-аутентификация-haproxy-с-использованием-самозаверяющего-сертификата-пример-grpc" aria-label="Permalink to “Двусторонняя аутентификация Haproxy с использованием самозаверяющего сертификата (пример gRPC)”">​</a></h1><p>Здесь используется двусторонняя аутентификация по самозаверяющему сертификату для повышения безопасности туннеля (это немного увеличивает задержку, но с gRPC это не так заметно). Сервер обрабатывает как доверенные, так и самозаверяющие сертификаты и разделяет трафик на поддельный веб-сайт и туннель.</p><p>www.example.com - доменное имя поддельного веб-сайта с доверенным сертификатом (например, сертификат, полученный в соответствии с документацией).</p><p>tunnel.example.com - доменное имя с самозаверяющим сертификатом. Самозаверяющий сертификат можно создать, например, с помощью инструкции <a href="https://learn.microsoft.com/ru-ru/azure/application-gateway/self-signed-certificates" target="_blank" rel="noreferrer">https://learn.microsoft.com/ru-ru/azure/application-gateway/self-signed-certificates</a>.</p><p>Корневой сертификат: ca.crt, сертификат сервера: server.crt, ключ сервера: server.key.</p><p>Необходимо создать как минимум файл server.pem, который клиент может использовать для двусторонней аутентификации. Также можно создать два сертификата - client и server - для двусторонней аутентификации.</p><p>Необходимо подготовить файл fullchain.crt для аутентификации (cat server.crt ca.crt &gt; fullchain.crt) и server.pem (cat server.crt server.key ca.crt &gt; server.pem) для расшифровки.</p><h3 id="конфигурация-haproxy-client-2" tabindex="-1">Конфигурация haproxy_client: <a class="header-anchor" href="#конфигурация-haproxy-client-2" aria-label="Permalink to “Конфигурация haproxy_client:”">​</a></h3><div class="language- line-numbers-mode"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes dark-plus light-plus" style="--shiki-dark:#D4D4D4;--shiki-light:#000000;--shiki-dark-bg:#1E1E1E;--shiki-light-bg:#FFFFFF;" tabindex="0" dir="ltr"><code><span class="line"><span>global</span></span>
<span class="line"><span>    log /dev/log local0 alert</span></span>
<span class="line"><span>    log /dev/log local1 alert</span></span>
<span class="line"><span>    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners</span></span>
<span class="line"><span>    stats timeout 30s</span></span>
<span class="line"><span>    user root</span></span>
<span class="line"><span>    group root</span></span>
<span class="line"><span>    daemon</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    tune.h2.initial-window-size 536870912</span></span>
<span class="line"><span>    tune.h2.max-concurrent-streams 512</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ssl-default-server-options ssl-min-ver TLSv1.3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>defaults</span></span>
<span class="line"><span>    log global</span></span>
<span class="line"><span>    mode http</span></span>
<span class="line"><span>    timeout connect 5s</span></span>
<span class="line"><span>    timeout client 300s</span></span>
<span class="line"><span>    timeout server 300s</span></span>
<span class="line"><span></span></span>
<span class="line"><span>frontend xray</span></span>
<span class="line"><span>    bind 127.0.0.1:6666 proto h2</span></span>
<span class="line"><span>    default_backend tunnel</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backend tunnel</span></span>
<span class="line"><span>    server tunnel tunnel.example.com:443 tfo allow-0rtt ssl crt /path/to/client.pem verify required ca-file /path/to/fullchain.crt sni str(tunnel.example.com) alpn h2</span></span>
<span class="line"><span>    # Доменное имя можно настроить произвольно, оно должно совпадать с самозаверяющим сертификатом.</span></span>
<span class="line"><span>    # Укажите IP-адрес в файле hosts.</span></span>
<span class="line"><span>    # Параметр str в sni устанавливает SNI, который используется сервером для идентификации.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h3 id="конфигурация-haproxy-server-2" tabindex="-1">Конфигурация haproxy_server: <a class="header-anchor" href="#конфигурация-haproxy-server-2" aria-label="Permalink to “Конфигурация haproxy_server:”">​</a></h3><div class="language- line-numbers-mode"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes dark-plus light-plus" style="--shiki-dark:#D4D4D4;--shiki-light:#000000;--shiki-dark-bg:#1E1E1E;--shiki-light-bg:#FFFFFF;" tabindex="0" dir="ltr"><code><span class="line"><span>global</span></span>
<span class="line"><span>    log /dev/log local0 alert</span></span>
<span class="line"><span>    log /dev/log local1 alert</span></span>
<span class="line"><span>    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners</span></span>
<span class="line"><span>    stats timeout 30s</span></span>
<span class="line"><span>    user root</span></span>
<span class="line"><span>    group root</span></span>
<span class="line"><span>    daemon</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    tune.h2.initial-window-size 536870912</span></span>
<span class="line"><span>    tune.h2.max-concurrent-streams 512</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ssl-default-bind-ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256</span></span>
<span class="line"><span>    ssl-default-bind-ciphersuites TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256</span></span>
<span class="line"><span>    ssl-default-bind-options ssl-min-ver TLSv1.2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>defaults</span></span>
<span class="line"><span>    log global</span></span>
<span class="line"><span>    mode http</span></span>
<span class="line"><span>    timeout connect 5s</span></span>
<span class="line"><span>    timeout client  300s</span></span>
<span class="line"><span>    timeout server  300s</span></span>
<span class="line"><span></span></span>
<span class="line"><span>frontend tls-in</span></span>
<span class="line"><span>    bind :::443 tfo allow-0rtt ssl crt /path/to/server.pem verify optional ca-file /path/to/fullchain.crt crt /path/to/www.example.com.pem alpn h2,http/1.1</span></span>
<span class="line"><span>    use_backend xray if { ssl_fc_sni tunnel.example.com } { ssl_c_used } { ssl_fc_alpn -i h2 } { path_beg /tunnel }</span></span>
<span class="line"><span>    use_backend server1 if { ssl_fc_sni atunnel.example.com } { ssl_c_used }  { ssl_fc_alpn -i h2 } { path_beg /path2 }</span></span>
<span class="line"><span>    use_backend server2 if { ssl_fc_sni btunnel.example.com } { ssl_c_used }  { ssl_fc_alpn -i h2 } { path_beg /path3 }</span></span>
<span class="line"><span>    use_backend server3 if { ssl_fc_sni ctunnel.example.com } { ssl_c_used }  { ssl_fc_alpn -i h2 } { path_beg /path4 }</span></span>
<span class="line"><span>    default_backend web</span></span>
<span class="line"><span>    # Haproxy поддерживает несколько файлов pem для расшифровки.</span></span>
<span class="line"><span>    # Разделение трафика можно выполнять на основе SNI или пути, доступны различные способы.</span></span>
<span class="line"><span>    # Дополнительные сведения об ACL см. в документации Haproxy.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backend xray</span></span>
<span class="line"><span>    server xray abns@vless.sock proto h2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backend server1</span></span>
<span class="line"><span>    server server1 abns@server1.sock proto h2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backend server2</span></span>
<span class="line"><span>    server server2 abns@server2.sock proto h2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backend server3</span></span>
<span class="line"><span>    server server3 abns@server3.sock proto h2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backend web</span></span>
<span class="line"><span>    server web /dev/shm/h1h2c.sock</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br></div></div><h3 id="настроика-xray-4" tabindex="-1">Настройка Xray <a class="header-anchor" href="#настроика-xray-4" aria-label="Permalink to “Настройка Xray”">​</a></h3><p>Простая конфигурация gRPC, TLS не требуется. Конфигурация см. в документации. Параметр serviceName можно использовать для разделения трафика.</p>`,89)]])}var s=n(a,[[`render`,o]]);export{i as __pageData,s as default};