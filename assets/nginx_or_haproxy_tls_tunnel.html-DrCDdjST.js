import{_ as l,r as s,o,c as p,a as e,b as r,d as n,w as c,e as a}from"./app-BQbqCP-9.js";const d={},u=a('<p>Nginx или Haproxy реализуют HTTPS-туннели, туннели HTTP/2 over HTTPS, туннели WebSocket over HTTP/2 over HTTPS, туннели gRPC over HTTP/2 over HTTPS, а также туннели gRPC over HTTP/2 over HTTPS с двусторонней аутентификацией по самозаверяющему сертификату.</p><h1 id="создание-https-туннеля-с-помощью-nginx-на-стороне-клиента-и-сервера-для-скрытия-отпечатков" tabindex="-1"><a class="header-anchor" href="#создание-https-туннеля-с-помощью-nginx-на-стороне-клиента-и-сервера-для-скрытия-отпечатков"><span>Создание HTTPS-туннеля с помощью Nginx на стороне клиента и сервера для скрытия отпечатков</span></a></h1><p>Сетевая структура:</p><p>xray_client ---tcp--- nginx_client ---HTTPS--- nginx_sever ---tcp--- xray_server</p><h2 id="компиляция-nginx-с-поддержкои-with-stream" tabindex="-1"><a class="header-anchor" href="#компиляция-nginx-с-поддержкои-with-stream"><span>Компиляция nginx с поддержкой --with-stream</span></a></h2><p>Выполните компиляцию как на клиенте, так и на сервере.</p><p><code>curl -O -L http://nginx.org/download/nginx-1.22.1.tar.gz</code></p><p><code>tar -zxvf nginx-1.22.1.tar.gz</code></p><p><code>cd nginx-1.22.1</code></p><p><code>apt install gcc make</code> // Для компиляции требуются gcc и make</p><p><code>./configure --prefix=/usr/local/nginx --with-http_ssl_module --with-http_v2_module --with-stream --with-stream_ssl_module</code> // На этом шаге могут потребоваться дополнительные библиотеки, установите их в соответствии с сообщениями об ошибках.</p><p><code>make &amp;&amp; make install</code></p><p>После компиляции папка nginx будет находиться в <code>/usr/local/nginx</code>.</p><h2 id="настроика-nginx" tabindex="-1"><a class="header-anchor" href="#настроика-nginx"><span>Настройка nginx</span></a></h2><p>Отредактируйте конфигурационный файл nginx.conf.</p><p><code>vim /usr/local/nginx/conf/nginx.conf</code></p><p>Добавьте следующую конфигурацию на стороне сервера.</p>',17),v=a(`<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>stream {
    server {
        listen 443 ssl;
        listen [::]:443 ssl;
        ssl_protocols TLSv1.3;
        ssl_certificate /path/to/cert/domain.crt; # Путь к файлу crt
        ssl_certificate_key /path/to/cert/domain.key; # Путь к файлу key
        proxy_pass unix:/dev/shm/vless.sock; # Использование доменного сокета
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">Внимание</p><p>Раздел stream находится на одном уровне с модулем http. Клиент может удалить раздел http, а сервер может удалить его или настроить веб-сайт для маскировки.</p></div><p>Добавьте следующую конфигурацию на стороне клиента.</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>stream {
    server {
        listen 6666;
        listen [::]:6666;
        proxy_ssl on;
        proxy_ssl_protocols TLSv1.3;
        proxy_ssl_server_name on;
        proxy_ssl_name yourdomain.domain; # Доменное имя сервера
        proxy_pass ip:443; # IP-адрес сервера, например, proxy_pass 6.6.6.6:443; или proxy_pass [2401:0:0::1]:443;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Создайте файл <code>nginx.service</code> в папке <code>/etc/systemd/system</code>.</p><p><code>vim /etc/systemd/system/nginx.service</code></p><p>Добавьте следующий текст:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[Unit]
Description=The NGINX HTTP and reverse proxy server
After=syslog.target network-online.target remote-fs.target nss-lookup.target
After=xray.service

[Service]
Type=forking
ExecStartPre=/usr/local/nginx/sbin/nginx -t
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Добавьте автоматический запуск при загрузке системы.</p><p><code>systemctl enable nginx</code></p><h2 id="настроика-xray" tabindex="-1"><a class="header-anchor" href="#настроика-xray"><span>Настройка Xray</span></a></h2><p>Конфигурация Xray на стороне сервера:</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;log&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;loglevel&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;inbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;listen&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/dev/shm/vless.sock,0666&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vless&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;clients&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;uuid&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;decryption&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;sniffing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;enabled&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">&quot;destOverride&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;http&quot;</span><span class="token punctuation">,</span>
          <span class="token string">&quot;tls&quot;</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;outbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;freedom&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Конфигурация Xray на стороне клиента (в данном примере используется прозрачное проксирование пограничного маршрутизатора):</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;log&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;loglevel&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;dns&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;servers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;1.1.1.1&quot;</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;119.29.29.29&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;geosite:cn&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;expectIP&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;geoip:cn&quot;</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;disableFallback&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">&quot;disableFallbackIfMatch&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;inbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tproxy-in&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">12345</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dokodemo-door&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp,udp&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;followRedirect&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;sniffing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;enabled&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">&quot;destOverride&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;http&quot;</span><span class="token punctuation">,</span>
          <span class="token string">&quot;tls&quot;</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;sockopt&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;tproxy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tproxy&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;mark&quot;</span><span class="token operator">:</span> <span class="token number">255</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;http&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">10808</span><span class="token punctuation">,</span>
      <span class="token property">&quot;listen&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;http&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;sniffing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;enabled&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">&quot;destOverride&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;http&quot;</span><span class="token punctuation">,</span>
          <span class="token string">&quot;tls&quot;</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;outbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;nginxtls&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vless&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;vnext&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">6666</span><span class="token punctuation">,</span>
            <span class="token property">&quot;users&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">{</span>
                <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;uuid&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;encryption&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;sockopt&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;mark&quot;</span><span class="token operator">:</span> <span class="token number">255</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;freedom&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;sockopt&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;mark&quot;</span><span class="token operator">:</span> <span class="token number">255</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;block&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;blackhole&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;response&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;http&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;routing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;domainMatcher&quot;</span><span class="token operator">:</span> <span class="token string">&quot;mph&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;domainStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;AsIs&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;domain&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;geosite:category-ads-all&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;block&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">123</span><span class="token punctuation">,</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;udp&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;ip&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;1.1.1.1&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;proxy&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;domain&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;geosite:cn&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;bittorrent&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;ip&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;geoip:private&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;tproxy-in&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;nginxtls&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>При использовании прозрачного проксирования необходимо добавить следующие правила в конфигурацию iptables или ip6tables:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code># Настройка маршрутизации по политике для IPv4
ip rule add fwmark 1 table 100
ip route add local 0.0.0.0/0 dev lo table 100

# Настройка маршрутизации по политике для IPv6
ip -6 rule add fwmark 1 table 106
ip -6 route add local ::/0 dev lo table 106

# Прямое подключение для IP-адреса VPS
iptables -t mangle -A XRAY_MASK -d VSP_IPv4/32 -j RETURN
ip6tables -t mangle -A XRAY6_MASK -d VPS_IPv6/128 -j RETURN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="запуск-сервисов-на-клиенте-и-сервере" tabindex="-1"><a class="header-anchor" href="#запуск-сервисов-на-клиенте-и-сервере"><span>Запуск сервисов на клиенте и сервере</span></a></h2><p><code>systemctl restart xray</code></p><p><code>systemctl restart nginx</code></p><h2 id="завершение" tabindex="-1"><a class="header-anchor" href="#завершение"><span>Завершение</span></a></h2><h1 id="создание-https-туннеля-с-помощью-haproxy-на-стороне-клиента-и-сервера-для-скрытия-отпечатков" tabindex="-1"><a class="header-anchor" href="#создание-https-туннеля-с-помощью-haproxy-на-стороне-клиента-и-сервера-для-скрытия-отпечатков"><span>Создание HTTPS-туннеля с помощью Haproxy на стороне клиента и сервера для скрытия отпечатков</span></a></h1><p>Установка Haproxy:</p><p><code>pacman -Su haproxy</code> или <code>apt install haproxy</code></p><p>Haproxy требует OpenSSL для обработки SSL. Проверьте версию OpenSSL и при необходимости установите или обновите ее.</p><h2 id="https-туннель" tabindex="-1"><a class="header-anchor" href="#https-туннель"><span>HTTPS-туннель</span></a></h2><p>Haproxy может легко реализовать HTTPS-туннель, как и описанный выше Nginx.</p><p>Сетевая структура:</p><p>xray_client ---tcp--- haproxy_client ---HTTPS--- haproxy_sever ---tcp--- xray_server</p><h3 id="конфигурация-haproxy-client-удалите-комментарии-перед-запуском" tabindex="-1"><a class="header-anchor" href="#конфигурация-haproxy-client-удалите-комментарии-перед-запуском"><span>Конфигурация haproxy_client (удалите комментарии перед запуском):</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>global
    log /dev/log local0 alert
    log /dev/log local1 alert
    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners
    stats timeout 30s
    user root
    group root
    daemon

    # Принудительное использование TLS 1.3 для туннеля
    ssl-default-server-options ssl-min-ver TLSv1.3

defaults
    log global
    mode tcp
    timeout connect 5s
    timeout client  300s
    timeout server  300s

frontend xray
    bind 127.0.0.1:6666 # Прослушивание порта 6666 на локальном хосте
    default_backend tunnel

backend tunnel
    server tunnel www.example.com:443 ssl verify none sni req.hdr(host) alpn h2,http/1.1
    # Можно использовать доменное имя или IP-адрес. При использовании доменного имени рекомендуется указать IP-адрес в файле hosts, чтобы сократить время разрешения имени.
    # alpn используется для согласования с сервером. Если на стороне сервера установлено alpn h2,http1.1, то клиент может указать h2 для подключения по HTTP/2 или http1.1 для подключения по HTTP.
    # Рекомендуется указывать h2 в обоих случаях.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="конфигурация-haproxy-server-удалите-комментарии-перед-запуском" tabindex="-1"><a class="header-anchor" href="#конфигурация-haproxy-server-удалите-комментарии-перед-запуском"><span>Конфигурация haproxy_server (удалите комментарии перед запуском):</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>global
    log /dev/log local0 alert
    log /dev/log local1 alert
    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners
    stats timeout 30s
    user root
    group root
    daemon

    # Указание наборов шифров и минимальной версии SSL 1.2 для повышения безопасности
    ssl-default-bind-ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256
    ssl-default-bind-ciphersuites TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256
    ssl-default-bind-options ssl-min-ver TLSv1.2

defaults
    log global
    mode tcp
    timeout connect 5s
    timeout client  300s
    timeout server  300s

frontend tls-in
    bind :::443 ssl crt /path/to/pem alpn h2,http/1.1 # Haproxy использует pem для расшифровки SSL. Файл pem можно получить с помощью команды cat www.example.com.crt www.example.com.key &gt; www.example.com.pem
    default_backend xray
    tcp-request inspect-delay 5s
    tcp-request content accept if HTTP
    use_backend web if HTTP

backend xray
    server xray /dev/shm/vless.sock # Поддерживаются абстрактные сокеты: &quot;abns@vless.sock&quot; и loopback: 127.0.0.1:6666

backend web
    server web /dev/shm/h1h2c.sock # Перенаправление на веб-сайт
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="настроика-xray-1" tabindex="-1"><a class="header-anchor" href="#настроика-xray-1"><span>Настройка Xray</span></a></h3><p>Аналогично разделу Nginx: простейшая конфигурация TCP, совместимая с любым протоколом. Рекомендуется использовать VLESS+TCP без дополнительного шифрования. Обратитесь к документации или другим примерам.</p><h2 id="websocket-over-http-2" tabindex="-1"><a class="header-anchor" href="#websocket-over-http-2"><span>WebSocket over HTTP/2</span></a></h2><p>Haproxy поддерживает h2c как для входящих, так и для исходящих подключений HTTP/2.</p><p>Однако в документации Xray по HTTP/2 говорится:</p><p>“В соответствии с рекомендациями по HTTP/2, клиент и сервер должны одновременно включать TLS для корректной работы этого метода передачи... В текущей версии HTTP/2 для входящих подключений (сервер) не требуется настройка TLS.”</p><p>То есть для входящих подключений можно использовать h2c, но для исходящих подключений h2c не поддерживается. Поэтому невозможно использовать схему xray_client ---h2c--- haproxy_client ---HTTP/2+TLS--- haproxy_sever ---h2c--- xray_server.</p><p>Однако можно обойти это ограничение, используя WebSocket. Haproxy поддерживает ws over HTTP/2.</p><p>Тогда сетевая структура будет выглядеть следующим образом: xray_client ---ws--- haproxy_client ---ws over HTTP/2 over HTTPS--- haproxy_sever ---ws--- xray_server.</p><h3 id="конфигурация-haproxy-client" tabindex="-1"><a class="header-anchor" href="#конфигурация-haproxy-client"><span>Конфигурация haproxy_client:</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>global
    log /dev/log local0 alert
    log /dev/log local1 alert
    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners
    stats timeout 30s
    user root
    group root
    daemon

    # Настройка производительности HTTP/2. Эти параметры можно изменять при возникновении проблем с производительностью HTTP/2.
    # Дополнительные настройки см. в разделе tune.h2 документации Haproxy: https://docs.haproxy.org/2.7/configuration.html
    tune.h2.initial-window-size 536870912 # Начальный размер окна, рекомендуется настроить, значение по умолчанию - 65536 байт.
    # При резком увеличении трафика может потребоваться время на загрузку, рекомендуется настраивать в зависимости от скорости интернета.
    tune.h2.max-concurrent-streams 512 # Количество одновременных потоков, можно настроить при необходимости, значение по умолчанию - 100.
    # Обычно не требуется изменять (не рекомендуется официальной документацией).

    ssl-default-server-options ssl-min-ver TLSv1.3

defaults
    log global
    mode http
    timeout connect 5s
    timeout client  300s
    timeout server  300s

frontend xray
    bind 127.0.0.1:6666
    default_backend tunnel

backend tunnel
    server tunnel www.example.com:443 ssl verify none sni req.hdr(host) ws h2 alpn h2
    # ws over HTTP/2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="конфигурация-haproxy-server" tabindex="-1"><a class="header-anchor" href="#конфигурация-haproxy-server"><span>Конфигурация haproxy_server:</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>global
    log /dev/log local0 alert
    log /dev/log local1 alert
    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners
    stats timeout 30s
    user root
    group root
    daemon

    # Настройка производительности HTTP/2 (необязательно, но рекомендуется).
    tune.h2.initial-window-size 536870912
    tune.h2.max-concurrent-streams 512

    ssl-default-bind-ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256
    ssl-default-bind-ciphersuites TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256
    ssl-default-bind-options ssl-min-ver TLSv1.2

defaults
    log global
    mode http
    timeout connect 5s
    timeout client  300s
    timeout server  300s

frontend tls-in
    bind :::443 ssl crt /path/to/pem alpn h2,http/1.1
    use_backend xray if { ssl_fc_alpn -i h2 } { path_beg /tunnel }
    use_backend server1 if { ssl_fc_alpn -i h2 } { path_beg /path1 }
    use_backend server2 if { ssl_fc_alpn -i h2 } { path_beg /path2 }
    use_backend server3 if { ssl_fc_alpn -i h2 } { path_beg /path3 }
    default_backend web
    # Haproxy в режиме http может разделять трафик на основе пути.

backend xray
    server xray abns@vless.sock ws h1

backend server1
    server server1 abns@server1.sock ws h1

backend server2
    server server2 abns@server2.sock ws h1

backend server3
    server server3 abns@server3.sock ws h1

backend web
    server web /dev/shm/h1h2c.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="настроика-xray-2" tabindex="-1"><a class="header-anchor" href="#настроика-xray-2"><span>Настройка Xray</span></a></h3><p>Простая конфигурация WebSocket, TLS не требуется. Пример конфигурации см. в документации Xray. Параметр &quot;path&quot; можно использовать для разделения трафика на стороне сервера Haproxy (клиент также может разделять трафик с помощью Haproxy, принцип аналогичен, см. конфигурацию разделения трафика на стороне сервера).</p><h2 id="grpc-over-http-2" tabindex="-1"><a class="header-anchor" href="#grpc-over-http-2"><span>gRPC over HTTP/2</span></a></h2><p>Хотя двусторонний h2c невозможен, gRPC не требует обязательного использования TLS.</p><p>Сетевая структура: xray_client ---gRPC h2c--- haproxy_client ---gRPC over HTTP/2 over HTTPS--- haproxy_sever ---gRPC h2c--- xray_server</p><h3 id="конфигурация-haproxy-client-1" tabindex="-1"><a class="header-anchor" href="#конфигурация-haproxy-client-1"><span>Конфигурация haproxy_client:</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>global
    log /dev/log local0 alert
    log /dev/log local1 alert
    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners
    stats timeout 30s
    user root
    group root
    daemon

    tune.h2.initial-window-size 536870912
    tune.h2.max-concurrent-streams 512

    ssl-default-server-options ssl-min-ver TLSv1.3

defaults
    log global
    mode http
    timeout connect 5s
    timeout client  300s
    timeout server  300s

frontend xray
    bind 127.0.0.1:6666 proto h2 # Укажите proto h2 для использования h2c
    default_backend tunnel

backend tunnel
    server tunnel www.example.com:443 ssl verify none sni req.hdr(host) alpn h2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="конфигурация-haproxy-server-1" tabindex="-1"><a class="header-anchor" href="#конфигурация-haproxy-server-1"><span>Конфигурация haproxy_server:</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>global
    log /dev/log local0 alert
    log /dev/log local1 alert
    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners
    stats timeout 30s
    user root
    group root
    daemon

    tune.h2.initial-window-size 536870912
    tune.h2.max-concurrent-streams 512

    ssl-default-bind-ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256
    ssl-default-bind-ciphersuites TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256
    ssl-default-bind-options ssl-min-ver TLSv1.2

defaults
    log global
    mode http
    timeout connect 5s
    timeout client  300s
    timeout server  300s

frontend tls-in
    bind :::443 ssl crt /path/to/pem alpn h2,http/1.1
    use_backend xray if { ssl_fc_alpn -i h2 } { path_beg /tunnel } # &quot;serviceName&quot;, настроенное в gRPC Xray, можно использовать для разделения трафика в Haproxy с помощью пути.
    # Для удобства использования &quot;multiMode&quot; используйте параметр path_beg для сопоставления пути.
    use_backend server1 if { ssl_fc_alpn -i h2 } { path_beg /path1 }
    use_backend server2 if { ssl_fc_alpn -i h2 } { path_beg /path2 }
    use_backend server3 if { ssl_fc_alpn -i h2 } { path_beg /path3 }
    default_backend web

backend xray
    server xray abns@vless.sock proto h2

backend server1
    server server1 abns@server1.sock proto h2

backend server2
    server server2 abns@server2.sock proto h2

backend server3
    server server3 abns@server3.sock proto h2

backend web
    server web /dev/shm/h1h2c.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="настроика-xray-3" tabindex="-1"><a class="header-anchor" href="#настроика-xray-3"><span>Настройка Xray</span></a></h3><p>Простая конфигурация gRPC, TLS не требуется. Конфигурация см. в документации. Параметр serviceName можно использовать для разделения трафика.</p><h1 id="двусторонняя-аутентификация-haproxy-с-использованием-самозаверяющего-сертификата-пример-grpc" tabindex="-1"><a class="header-anchor" href="#двусторонняя-аутентификация-haproxy-с-использованием-самозаверяющего-сертификата-пример-grpc"><span>Двусторонняя аутентификация Haproxy с использованием самозаверяющего сертификата (пример gRPC)</span></a></h1><p>Здесь используется двусторонняя аутентификация по самозаверяющему сертификату для повышения безопасности туннеля (это немного увеличивает задержку, но с gRPC это не так заметно). Сервер обрабатывает как доверенные, так и самозаверяющие сертификаты и разделяет трафик на поддельный веб-сайт и туннель.</p><p>www.example.com - доменное имя поддельного веб-сайта с доверенным сертификатом (например, сертификат, полученный в соответствии с документацией).</p><p>tunnel.example.com - доменное имя с самозаверяющим сертификатом. Самозаверяющий сертификат можно создать, например, с помощью инструкции https://learn.microsoft.com/ru-ru/azure/application-gateway/self-signed-certificates.</p><p>Корневой сертификат: ca.crt, сертификат сервера: server.crt, ключ сервера: server.key.</p><p>Необходимо создать как минимум файл server.pem, который клиент может использовать для двусторонней аутентификации. Также можно создать два сертификата - client и server - для двусторонней аутентификации.</p><p>Необходимо подготовить файл fullchain.crt для аутентификации (cat server.crt ca.crt &gt; fullchain.crt) и server.pem (cat server.crt server.key ca.crt &gt; server.pem) для расшифровки.</p><h3 id="конфигурация-haproxy-client-2" tabindex="-1"><a class="header-anchor" href="#конфигурация-haproxy-client-2"><span>Конфигурация haproxy_client:</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>global
    log /dev/log local0 alert
    log /dev/log local1 alert
    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners
    stats timeout 30s
    user root
    group root
    daemon

    tune.h2.initial-window-size 536870912
    tune.h2.max-concurrent-streams 512

    ssl-default-server-options ssl-min-ver TLSv1.3

defaults
    log global
    mode http
    timeout connect 5s
    timeout client 300s
    timeout server 300s

frontend xray
    bind 127.0.0.1:6666 proto h2
    default_backend tunnel

backend tunnel
    server tunnel tunnel.example.com:443 tfo allow-0rtt ssl crt /path/to/client.pem verify required ca-file /path/to/fullchain.crt sni str(tunnel.example.com) alpn h2
    # Доменное имя можно настроить произвольно, оно должно совпадать с самозаверяющим сертификатом.
    # Укажите IP-адрес в файле hosts.
    # Параметр str в sni устанавливает SNI, который используется сервером для идентификации.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="конфигурация-haproxy-server-2" tabindex="-1"><a class="header-anchor" href="#конфигурация-haproxy-server-2"><span>Конфигурация haproxy_server:</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>global
    log /dev/log local0 alert
    log /dev/log local1 alert
    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners
    stats timeout 30s
    user root
    group root
    daemon

    tune.h2.initial-window-size 536870912
    tune.h2.max-concurrent-streams 512

    ssl-default-bind-ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256
    ssl-default-bind-ciphersuites TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256
    ssl-default-bind-options ssl-min-ver TLSv1.2

defaults
    log global
    mode http
    timeout connect 5s
    timeout client  300s
    timeout server  300s

frontend tls-in
    bind :::443 tfo allow-0rtt ssl crt /path/to/server.pem verify optional ca-file /path/to/fullchain.crt crt /path/to/www.example.com.pem alpn h2,http/1.1
    use_backend xray if { ssl_fc_sni tunnel.example.com } { ssl_c_used } { ssl_fc_alpn -i h2 } { path_beg /tunnel }
    use_backend server1 if { ssl_fc_sni atunnel.example.com } { ssl_c_used }  { ssl_fc_alpn -i h2 } { path_beg /path2 }
    use_backend server2 if { ssl_fc_sni btunnel.example.com } { ssl_c_used }  { ssl_fc_alpn -i h2 } { path_beg /path3 }
    use_backend server3 if { ssl_fc_sni ctunnel.example.com } { ssl_c_used }  { ssl_fc_alpn -i h2 } { path_beg /path4 }
    default_backend web
    # Haproxy поддерживает несколько файлов pem для расшифровки.
    # Разделение трафика можно выполнять на основе SNI или пути, доступны различные способы.
    # Дополнительные сведения об ACL см. в документации Haproxy.

backend xray
    server xray abns@vless.sock proto h2

backend server1
    server server1 abns@server1.sock proto h2

backend server2
    server server2 abns@server2.sock proto h2

backend server3
    server server3 abns@server3.sock proto h2

backend web
    server web /dev/shm/h1h2c.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="настроика-xray-4" tabindex="-1"><a class="header-anchor" href="#настроика-xray-4"><span>Настройка Xray</span></a></h3><p>Простая конфигурация gRPC, TLS не требуется. Конфигурация см. в документации. Параметр serviceName можно использовать для разделения трафика.</p>`,70);function m(b,k){const i=s("I18nTip"),t=s("RouterLink");return o(),p("div",null,[e(i),u,r("p",null,[n("Получение сертификата для сервера не рассматривается в данном руководстве. Обратитесь к "),e(t,{to:"/ru/document/level-0/ch06-certificates.html"},{default:c(()=>[n("документации")]),_:1}),n(".")]),v])}const q=l(d,[["render",m],["__file","nginx_or_haproxy_tls_tunnel.html.vue"]]);export{q as default};
