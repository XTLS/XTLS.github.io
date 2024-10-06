import{_ as l,r as p,o as i,c as r,a,b as s,d as n,e as t}from"./app-C1ZSQDOJ.js";const c={},u=s("h1",{id:"руководство-по-настроике-прозрачного-проксирования-tproxy-ipv4-и-ipv6",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#руководство-по-настроике-прозрачного-проксирования-tproxy-ipv4-и-ipv6"},[s("span",null,"Руководство по настройке прозрачного проксирования TProxy (ipv4 и ipv6)")])],-1),d={href:"https://guide.v2fly.org/app/tproxy.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://xtls.github.io/document/level-2/tproxy.html#%E5%BC%80%E5%A7%8B%E4%B9%8B%E5%89%8D",target:"_blank",rel:"noopener noreferrer"},k={href:"https://xtls.github.io/document/level-2/iptables_gid.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/XTLS/Xray-examples",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/chika0801/Xray-examples",target:"_blank",rel:"noopener noreferrer"},q={href:"https://github.com/lxhao61/integrated-examples",target:"_blank",rel:"noopener noreferrer"},g=t('<div class="custom-container warning"><p class="custom-container-title">Внимание</p><p>При использовании других конфигураций обратите особое внимание на часть <code>outbound</code> с тегом <code>proxy</code> в конфигурации клиента. Остальные части остаются неизменными.</p><p>Конфигурация сервера также должна быть изменена соответственно.</p></div><p>Эта конфигурация предназначена для решения проблемы, когда такие сайты, как Netflix, которые по умолчанию используют IPv6, не могут быть проксированы через пограничный маршрутизатор, или когда требуется проксирование IPv6.</p><p>В данной статье используется сетевая структура с пограничным маршрутизатором с одним интерфейсом.</p><p>Все конфигурации, представленные в этой статье, были успешно протестированы в среде Arch Linux (Kernel: 6.0.10). В других средах настройка аналогична.</p><p>Убедитесь, что установлены необходимые программы: <code># sudo apt install iptables ip6tables</code> или <code># sudo apt install nftables</code>.</p>',5),y={href:"https://github.com/XTLS/Xray-core/releases/download/v1.7.0/Xray-linux-64.zip",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/XTLS/Xray-install/blob/main/install-release.sh",target:"_blank",rel:"noopener noreferrer"},f=s("code",null,"# chmod 700 install-release.sh",-1),x=s("code",null,"# ./install-release.sh --local Xray-linux-64.zip",-1),R=t(`<h2 id="настроика-xray" tabindex="-1"><a class="header-anchor" href="#настроика-xray"><span>Настройка Xray</span></a></h2><h3 id="конфигурация-клиента" tabindex="-1"><a class="header-anchor" href="#конфигурация-клиента"><span>Конфигурация клиента</span></a></h3><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;log&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;loglevel&quot;</span><span class="token operator">:</span> <span class="token string">&quot;warning&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;inbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;all-in&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">12345</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dokodemo-door&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp,udp&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;followRedirect&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;sniffing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;enabled&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">&quot;destOverride&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;http&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;tls&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;quic&quot;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;sockopt&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;tproxy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tproxy&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">10808</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;socks&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;sniffing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;enabled&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">&quot;destOverride&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;http&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;tls&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;quic&quot;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;auth&quot;</span><span class="token operator">:</span> <span class="token string">&quot;noauth&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;udp&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;outbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token comment">// Это исходящее подключение по умолчанию. Если модуль маршрутизации (routing) не найдет подходящего правила, трафик будет направлен через этот выходной узел proxy. </span>
      <span class="token comment">// Если вы хотите, чтобы трафик в Китай направлялся напрямую, переместите исходящее подключение direct на первое место в списке outbound. </span>
      <span class="token comment">// Если вы не понимаете, что это значит, просто пропустите этот комментарий.</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;proxy&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vless&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;vnext&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;yourdomain.domain&quot;</span><span class="token punctuation">,</span> <span class="token comment">// Замените на ваше доменное имя, также можно использовать IPv4- или IPv6-адрес.</span>
            <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">443</span><span class="token punctuation">,</span>
            <span class="token property">&quot;users&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">{</span>
                <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;uuid&quot;</span><span class="token punctuation">,</span> <span class="token comment">// Введите UUID, который можно сгенерировать, выполнив команду xray uuid в терминале. </span>
                <span class="token comment">// Также поддерживаются произвольные строки (https://xtls.github.io/config/inbounds/vless.html#clientobject).</span>
                <span class="token property">&quot;encryption&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;flow&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xtls-rprx-vision&quot;</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;sockopt&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;mark&quot;</span><span class="token operator">:</span> <span class="token number">255</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;security&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tls&quot;</span><span class="token punctuation">,</span> <span class="token comment">// При использовании управления потоком xtls-rprx-vision здесь должно быть указано tls.</span>
        <span class="token property">&quot;tlsSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token comment">// При использовании управления потоком xtls-rprx-vision здесь должно быть указано tlsSettings.</span>
          <span class="token property">&quot;allowInsecure&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
          <span class="token property">&quot;serverName&quot;</span><span class="token operator">:</span> <span class="token string">&quot;yourdomain.domain&quot;</span><span class="token punctuation">,</span> <span class="token comment">// Замените на ваше доменное имя.</span>
          <span class="token property">&quot;fingerprint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;chrome&quot;</span> <span class="token comment">// Рекомендуется сначала ознакомиться с разделом Release: https://github.com/XTLS/Xray-core/releases/tag/v1.7.3</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;freedom&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;domainStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UseIP&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
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
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dns-out&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dns&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;sockopt&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;mark&quot;</span><span class="token operator">:</span> <span class="token number">255</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;dns&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;hosts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;domain:googleapis.cn&quot;</span><span class="token operator">:</span> <span class="token string">&quot;googleapis.com&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;dns.google&quot;</span><span class="token operator">:</span> <span class="token string">&quot;8.8.8.8&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;yourdomain.domain&quot;</span><span class="token operator">:</span> <span class="token string">&quot;your VPS IP&quot;</span> <span class="token comment">// Если в разделе address исходящего подключения proxy указано доменное имя: </span>
      <span class="token comment">// для проксирования через IPv4 укажите IPv4-адрес VPS, для проксирования через IPv6 укажите IPv6-адрес VPS. </span>
      <span class="token comment">// Если в разделе address исходящего подключения proxy указан IP-адрес, эту строку можно удалить.</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;servers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;https://1.1.1.1/dns-query&quot;</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;119.29.29.29&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geosite:cn&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;expectIPs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geoip:cn&quot;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token string">&quot;https://dns.google/dns-query&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;223.5.5.5&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;localhost&quot;</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;routing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;domainMatcher&quot;</span><span class="token operator">:</span> <span class="token string">&quot;mph&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;domainStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;IPIfNonMatch&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;domain&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geosite:category-ads-all&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;block&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;all-in&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">123</span><span class="token punctuation">,</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;udp&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;all-in&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">53</span><span class="token punctuation">,</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;udp&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dns-out&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;ip&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;119.29.29.29&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;223.5.5.5&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;bittorrent&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;ip&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geoip:private&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;geoip:cn&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// Здесь можно добавить IP-адрес VPS, чтобы избежать проксирования трафика SSH.</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;domain&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geosite:cn&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;ip&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;1.1.1.1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;8.8.8.8&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;proxy&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;domain&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;geosite:geolocation-!cn&quot;</span><span class="token punctuation">,</span>
          <span class="token string">&quot;domain:googleapis.cn&quot;</span><span class="token punctuation">,</span>
          <span class="token string">&quot;dns.google&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;proxy&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="конфигурация-сервера" tabindex="-1"><a class="header-anchor" href="#конфигурация-сервера"><span>Конфигурация сервера</span></a></h3><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;log&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;loglevel&quot;</span><span class="token operator">:</span> <span class="token string">&quot;warning&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;routing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;domainStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;IPIfNonMatch&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token comment">// Блокировка китайских IP-адресов для повышения безопасности. </span>
        <span class="token comment">// Также можно направить китайский трафик через Warp, см. https://xtls.github.io/document/level-2/warp.html</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;ip&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;geoip:cn&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;block&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;inbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">443</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vless&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;clients&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;uuid&quot;</span><span class="token punctuation">,</span> <span class="token comment">// Должен совпадать с UUID клиента.</span>
            <span class="token property">&quot;flow&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xtls-rprx-vision&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;decryption&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;fallbacks&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;dest&quot;</span><span class="token operator">:</span> <span class="token number">8080</span> <span class="token comment">// Резервный порт. Требуется настройка веб-сервера, см. документацию. Можно не указывать.</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;security&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tls&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;tlsSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;certificates&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
              <span class="token property">&quot;certificateFile&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/etc/ssl/private/fullchain.crt&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;keyFile&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/etc/ssl/private/crt.key&quot;</span> <span class="token comment">// Укажите пути к файлам fullchain.crt и cert.key, сгенерированным в соответствии с руководством (https://xtls.github.io/document/level-0/ch06-certificates.html#_6-4-%E6%AD%A3%E5%BC%8F%E8%AF%81%E4%B9%A6%E7%94%B3%E8%AF%B7).</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;sniffing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;enabled&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">&quot;destOverride&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;http&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;tls&quot;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;outbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;freedom&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;direct&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;blackhole&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;block&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="настроика-netfilter" tabindex="-1"><a class="header-anchor" href="#настроика-netfilter"><span>Настройка Netfilter</span></a></h2><h3 id="настроика-маршрутизации-по-политике" tabindex="-1"><a class="header-anchor" href="#настроика-маршрутизации-по-политике"><span>Настройка маршрутизации по политике</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># Настройка маршрутизации по политике для IPv4</span>
<span class="token function">ip</span> rule <span class="token function">add</span> fwmark <span class="token number">1</span> table <span class="token number">100</span>
<span class="token function">ip</span> route <span class="token function">add</span> <span class="token builtin class-name">local</span> <span class="token number">0.0</span>.0.0/0 dev lo table <span class="token number">100</span>

<span class="token comment"># Настройка маршрутизации по политике для IPv6</span>
<span class="token function">ip</span> <span class="token parameter variable">-6</span> rule <span class="token function">add</span> fwmark <span class="token number">1</span> table <span class="token number">106</span>
<span class="token function">ip</span> <span class="token parameter variable">-6</span> route <span class="token function">add</span> <span class="token builtin class-name">local</span> ::/0 dev lo table <span class="token number">106</span>

<span class="token comment"># Прямое подключение через основной маршрутизатор</span>
<span class="token function">ip</span> route <span class="token function">add</span> default via <span class="token number">192.168</span>.31.1 <span class="token comment"># Укажите IPv4-адрес основного маршрутизатора. </span>
<span class="token comment"># Если используется метод 1 для настройки доступа к интернету на устройствах локальной сети, эту команду можно не выполнять.</span>
<span class="token function">ip</span> <span class="token parameter variable">-6</span> route <span class="token function">add</span> default via fd00:6868:6868::1 <span class="token comment"># Укажите IPv6-адрес основного маршрутизатора. </span>
<span class="token comment"># Если используется метод 1 для настройки доступа к интернету на устройствах локальной сети, эту команду можно не выполнять.</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">Использование</p><p>Скопируйте команды в терминал пограничного маршрутизатора и выполните их.</p></div><div class="custom-container tip"><p class="custom-container-title">О прямом подключении через основной маршрутизатор</p><p>Выполните команду <code>ip route show</code> на пограничном маршрутизаторе. Если используется метод 1, то после <code>default via</code> должен быть указан IP-адрес основного маршрутизатора, ничего менять не нужно.<br> Если используется метод 2, то после <code>default via</code> должен быть указан IP-адрес пограничного маршрутизатора. В этом случае DNS-запросы для сайтов, к которым должно быть установлено прямое подключение, будут зацикливаться, что приведет к невозможности доступа к этим сайтам. Поэтому необходимо указать IP-адрес основного маршрутизатора.</p></div><p>Если в настройках маршрутизатора указан пограничный маршрутизатор в качестве шлюза по умолчанию (то есть используется метод 2 для настройки доступа к интернету на устройствах локальной сети), то необходимо выполнить команду <code># Прямое подключение через основной маршрутизатор</code>.<br> Кроме настройки через командную строку iproute2, можно использовать dhcpcd или systemctl-network для настройки статического IP-адреса.<br> В качестве примера рассмотрим dhcpcd. Отредактируйте файл <code>/etc/dhcpcd.conf</code> и добавьте следующие строки в конец файла. Измените IP-адреса в соответствии с вашей конфигурацией.<br><code>interface</code> - это имя сетевого интерфейса или беспроводного устройства, которое можно узнать с помощью команды <code># ip link show</code>.</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>interface enp0s25
static ip_address=192.168.31.100/24
static ip6_address=fd00:6868:6868::8888/64
static routers=192.168.31.1
static domain_name_servers=192.168.31.1 fd00:6868:6868::1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>После настройки статического IP-адреса и шлюза вам не нужно будет выполнять команду <code># Прямое подключение через основной маршрутизатор</code> при каждой загрузке.</p><div class="custom-container warning"><p class="custom-container-title">Внимание</p><p>Выберите одну из следующих конфигураций: nftables или iptables. Не используйте обе одновременно.</p></div><h3 id="использование-iptables" tabindex="-1"><a class="header-anchor" href="#использование-iptables"><span>Использование iptables</span></a></h3><p>В этой конфигурации IPv4 и IPv6 объединены в одном файле.</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># Проксирование устройств локальной сети (IPv4)</span>
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-N</span> XRAY
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-d</span> <span class="token number">127.0</span>.0.1/32 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-d</span> <span class="token number">224.0</span>.0.0/4 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-d</span> <span class="token number">255.255</span>.255.255/32 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-d</span> <span class="token number">192.168</span>.0.0/16 <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-d</span> <span class="token number">192.168</span>.0.0/16 <span class="token parameter variable">-p</span> udp <span class="token operator">!</span> <span class="token parameter variable">--dport</span> <span class="token number">53</span> <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-j</span> RETURN <span class="token parameter variable">-m</span> mark <span class="token parameter variable">--mark</span> 0xff
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-p</span> udp <span class="token parameter variable">-j</span> TPROXY --on-ip <span class="token number">127.0</span>.0.1 --on-port <span class="token number">12345</span> --tproxy-mark <span class="token number">1</span>
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> TPROXY --on-ip <span class="token number">127.0</span>.0.1 --on-port <span class="token number">12345</span> --tproxy-mark <span class="token number">1</span>
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-j</span> XRAY

<span class="token comment"># Проксирование устройств локальной сети (IPv6)</span>
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-N</span> XRAY6
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6 <span class="token parameter variable">-d</span> ::1/128 <span class="token parameter variable">-j</span> RETURN
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6 <span class="token parameter variable">-d</span> fe80::/10 <span class="token parameter variable">-j</span> RETURN
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6 <span class="token parameter variable">-d</span> fd00::/8 <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> RETURN
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6 <span class="token parameter variable">-d</span> fd00::/8 <span class="token parameter variable">-p</span> udp <span class="token operator">!</span> <span class="token parameter variable">--dport</span> <span class="token number">53</span> <span class="token parameter variable">-j</span> RETURN
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6 <span class="token parameter variable">-j</span> RETURN <span class="token parameter variable">-m</span> mark <span class="token parameter variable">--mark</span> 0xff
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6 <span class="token parameter variable">-p</span> udp <span class="token parameter variable">-j</span> TPROXY --on-ip ::1 --on-port <span class="token number">12345</span> --tproxy-mark <span class="token number">1</span>
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6 <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> TPROXY --on-ip ::1 --on-port <span class="token number">12345</span> --tproxy-mark <span class="token number">1</span>
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-j</span> XRAY6

<span class="token comment"># Проксирование хоста шлюза (IPv4)</span>
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-N</span> XRAY_MASK
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_MASK <span class="token parameter variable">-d</span> <span class="token number">224.0</span>.0.0/4 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_MASK <span class="token parameter variable">-d</span> <span class="token number">255.255</span>.255.255/32 <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_MASK <span class="token parameter variable">-d</span> <span class="token number">192.168</span>.0.0/16 <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_MASK <span class="token parameter variable">-d</span> <span class="token number">192.168</span>.0.0/16 <span class="token parameter variable">-p</span> udp <span class="token operator">!</span> <span class="token parameter variable">--dport</span> <span class="token number">53</span> <span class="token parameter variable">-j</span> RETURN
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_MASK <span class="token parameter variable">-j</span> RETURN <span class="token parameter variable">-m</span> mark <span class="token parameter variable">--mark</span> 0xff
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_MASK <span class="token parameter variable">-p</span> udp <span class="token parameter variable">-j</span> MARK --set-mark <span class="token number">1</span>
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY_MASK <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> MARK --set-mark <span class="token number">1</span>
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> OUTPUT <span class="token parameter variable">-j</span> XRAY_MASK

<span class="token comment"># Проксирование хоста шлюза (IPv6)</span>
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-N</span> XRAY6_MASK
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6_MASK <span class="token parameter variable">-d</span> fe80::/10 <span class="token parameter variable">-j</span> RETURN
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6_MASK <span class="token parameter variable">-d</span> fd00::/8 <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> RETURN
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6_MASK <span class="token parameter variable">-d</span> fd00::/8 <span class="token parameter variable">-p</span> udp <span class="token operator">!</span> <span class="token parameter variable">--dport</span> <span class="token number">53</span> <span class="token parameter variable">-j</span> RETURN
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6_MASK <span class="token parameter variable">-j</span> RETURN <span class="token parameter variable">-m</span> mark <span class="token parameter variable">--mark</span> 0xff
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6_MASK <span class="token parameter variable">-p</span> udp <span class="token parameter variable">-j</span> MARK --set-mark <span class="token number">1</span>
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> XRAY6_MASK <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> MARK --set-mark <span class="token number">1</span>
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> OUTPUT <span class="token parameter variable">-j</span> XRAY6_MASK

<span class="token comment"># Создание правила DIVERT, чтобы избежать повторного прохождения пакетов с существующими подключениями через TPROXY, что теоретически повышает производительность (IPv4)</span>
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-N</span> DIVERT
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> DIVERT <span class="token parameter variable">-j</span> MARK --set-mark <span class="token number">1</span>
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> DIVERT <span class="token parameter variable">-j</span> ACCEPT
iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-I</span> PREROUTING <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-m</span> socket <span class="token parameter variable">-j</span> DIVERT

<span class="token comment"># Создание правила DIVERT, чтобы избежать повторного прохождения пакетов с существующими подключениями через TPROXY, что теоретически повышает производительность (IPv6)</span>
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-N</span> DIVERT
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> DIVERT <span class="token parameter variable">-j</span> MARK --set-mark <span class="token number">1</span>
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> DIVERT <span class="token parameter variable">-j</span> ACCEPT
ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-I</span> PREROUTING <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-m</span> socket <span class="token parameter variable">-j</span> DIVERT

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">Использование</p><p>Запишите приведенную выше конфигурацию в файл (например, <code>iptables.rules</code>), затем предоставьте файлу права на выполнение <code># chmod 700 ./iptables.rules</code>.</p><p>Наконец, выполните файл от имени пользователя root: <code># ./iptables.rules</code> или <code># source iptables.rules</code>.</p></div><h3 id="использование-nftables" tabindex="-1"><a class="header-anchor" href="#использование-nftables"><span>Использование nftables</span></a></h3><p>В этой конфигурации IPv4 и IPv6 объединены.</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#!/usr/sbin/nft -f

flush ruleset

table inet xray {
        chain prerouting {
                type filter hook prerouting priority filter; policy accept;
                ip daddr { 127.0.0.0/8, 224.0.0.0/4, 255.255.255.255 } return
                meta l4proto tcp ip daddr 192.168.0.0/16 return
                ip daddr 192.168.0.0/16 udp dport != 53 return
                ip6 daddr { ::1, fe80::/10 } return
                meta l4proto tcp ip6 daddr fd00::/8 return
                ip6 daddr fd00::/8 udp dport != 53 return
                meta mark 0x000000ff return
                meta l4proto { tcp, udp } meta mark set 0x00000001 tproxy ip to 127.0.0.1:12345 accept
                meta l4proto { tcp, udp } meta mark set 0x00000001 tproxy ip6 to [::1]:12345 accept
        }

        chain output {
                type route hook output priority filter; policy accept;
                ip daddr { 127.0.0.0/8, 224.0.0.0/4, 255.255.255.255 } return
                meta l4proto tcp ip daddr 192.168.0.0/16 return
                ip daddr 192.168.0.0/16 udp dport != 53 return
                ip6 daddr { ::1, fe80::/10 } return
                meta l4proto tcp ip6 daddr fd00::/8 return
                ip6 daddr fd00::/8 udp dport != 53 return
                meta mark 0x000000ff return
                meta l4proto { tcp, udp } meta mark set 0x00000001 accept
        }

        chain divert {
                type filter hook prerouting priority mangle; policy accept;
                meta l4proto tcp socket transparent 1 meta mark set 0x00000001 accept
        }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">Использование</p><p>Запишите приведенную выше конфигурацию в файл (например, <code>nftables.rules</code>), затем предоставьте файлу права на выполнение <code># chmod 700 ./nftables.rules</code>.</p><p>Наконец, выполните файл от имени пользователя root: <code># ./nftables.rules</code> или <code># source nftables.rules</code>.</p></div>`,22),A=s("code",null,"192.168.0.0/16",-1),_=s("code",null,"fd00::/8",-1),I=s("code",null,"ip address | grep -w inet | awk '{print $2}'",-1),P=s("code",null,"ip address | grep -w inet6 | awk '{print $2}'",-1),T={href:"https://xtls.github.io/document/level-2/iptables_gid.html#_4-%E8%AE%BE%E7%BD%AE-iptables-%E8%A7%84%E5%88%99",target:"_blank",rel:"noopener noreferrer"},E=t(`<p>Или посмотреть в настройках сети Windows.</p><p>Или посмотреть в настройках интернета на маршрутизаторе.</p><p>Если префиксы <code>192.168</code>, <code>fd00:</code> совпадают, их можно не менять.<br> Если они отличаются, например, <code>fc00:</code>, <code>fe00:</code> и т.д., замените их на соответствующие значения.<br> Синтаксис можно найти в Google, например, <code>fc00::/7</code>, <code>fe00::/9</code>.</p><h3 id="автоматическии-запуск-конфигурации-netfilter-при-загрузке" tabindex="-1"><a class="header-anchor" href="#автоматическии-запуск-конфигурации-netfilter-при-загрузке"><span>Автоматический запуск конфигурации Netfilter при загрузке</span></a></h3><p>Сначала убедитесь, что вы выполнили соответствующие команды Netfilter, описанные выше, и успешно протестировали настройку прозрачного проксирования, чтобы убедиться, что в дальнейшем будет сгенерирован правильный файл.</p><h4 id="при-использовании-конфигурации-iptables" tabindex="-1"><a class="header-anchor" href="#при-использовании-конфигурации-iptables"><span>При использовании конфигурации iptables</span></a></h4><ol><li><p>Сохраните конфигурацию iptables в файлы <code>iptables.rulesv4</code> и <code>iptables.rulesv6</code> с помощью команд <code># iptables-save &gt; /root/iptables.rulesv4</code> и <code># ip6tables-save &gt; /root/iptables.rulesv6</code>.</p></li><li><p>Создайте файл с именем <code>tproxyrules.service</code> в каталоге <code>/etc/systemd/system/</code> и добавьте следующее содержимое:</p></li></ol><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[Unit]
Description=Tproxy rules

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStartPre=/bin/sh -c &#39;until ping -c1 192.168.31.1; do sleep 1; done;&#39;
ExecStart=/sbin/ip rule add fwmark 1 table 100 ; \\
/sbin/ip -6 rule add fwmark 1 table 106 ; \\
/sbin/ip route add local 0.0.0.0/0 dev lo table 100 ; \\
/sbin/ip -6 route add local ::/0 dev lo table 106 ; \\
/sbin/ip route add default via 192.168.31.1 ; \\
/sbin/ip -6 route add default via fd00:6868:6868::1 ; \\
/sbin/iptables-restore /root/iptables.rulesv4 ; \\
/sbin/ip6tables-restore /root/iptables.rulesv6
ExecStop=/sbin/ip rule del fwmark 1 table 100 ; \\
/sbin/ip -6 rule del fwmark 1 table 106 ; \\
/sbin/ip route del local 0.0.0.0/0 dev lo table 100 ; \\
/sbin/ip -6 route del local ::/0 dev lo table 106 ; \\
/sbin/ip route del default via 192.168.31.1 ; \\
/sbin/ip -6 route del default via fd00:6868:6868::1 ; \\
/sbin/iptables -t mangle -F ; \\
/sbin/ip6tables -t mangle -F

[Install]
WantedBy=multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>Выполните команду <code>systemctl enable tproxyrules</code>.</li></ol><h4 id="при-использовании-конфигурации-nftables" tabindex="-1"><a class="header-anchor" href="#при-использовании-конфигурации-nftables"><span>При использовании конфигурации nftables</span></a></h4><ol><li><p>Сохраните конфигурацию nftables в файл <code>nftables.rulesv46</code> с помощью команды <code># nft list ruleset &gt; /root/nftables.rulesv46</code>.</p></li><li><p>Создайте файл с именем <code>tproxyrules.service</code> в каталоге <code>/etc/systemd/system/</code> и добавьте следующее содержимое:</p></li></ol><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[Unit]
Description=Tproxy rules

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStartPre=/bin/sh -c &#39;until ping -c1 192.168.31.1; do sleep 1; done;&#39;
ExecStart=/sbin/ip rule add fwmark 1 table 100 ; \\
/sbin/ip -6 rule add fwmark 1 table 106 ; \\
/sbin/ip route add local 0.0.0.0/0 dev lo table 100 ; \\
/sbin/ip -6 route add local ::/0 dev lo table 106 ; \\
/sbin/ip route add default via 192.168.31.1 ; \\
/sbin/ip -6 route add default via fd00:6868:6868::1 ; \\
/sbin/nft -f /root/nftables.rulesv46 ;
ExecStop=/sbin/ip rule del fwmark 1 table 100 ; \\
/sbin/ip -6 rule del fwmark 1 table 106 ; \\
/sbin/ip route del local 0.0.0.0/0 dev lo table 100 ; \\
/sbin/ip -6 route del local ::/0 dev lo table 106 ; \\
/sbin/ip route del default via 192.168.31.1 ; \\
/sbin/ip -6 route del default via fd00:6868:6868::1 ; \\
/sbin/nft flush ruleset

[Install]
WantedBy=multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>Выполните команду <code>systemctl enable tproxyrules</code>.</li></ol><div class="custom-container tip"><p class="custom-container-title">tproxyrules.service</p><p>Обратите внимание на IP-адрес основного маршрутизатора и измените его в соответствии с вашей конфигурацией.</p><p>Команда <code>ExecStartPre=/bin/sh -c &#39;until ping -c1 192.168.31.1; do sleep 1; done;&#39;</code> гарантирует, что команды будут выполнены только после получения IP-адреса, иначе могут возникнуть странные ошибки. IP-адрес - это адрес основного маршрутизатора, измените его в соответствии с вашей конфигурацией.</p></div><div class="custom-container warning"><p class="custom-container-title">Внимание</p><p>Если вы настроили статический IP-адрес и шлюз с помощью dhcpcd и т.д., удалите соответствующие строки <code>ip route add/del</code> из приведенных выше конфигураций.</p></div><h2 id="настроика-доступа-к-интернету-на-устроиствах-локальнои-сети" tabindex="-1"><a class="header-anchor" href="#настроика-доступа-к-интернету-на-устроиствах-локальнои-сети"><span>Настройка доступа к интернету на устройствах локальной сети</span></a></h2><p>Предположим, что IPv4- и IPv6-адреса пограничного маршрутизатора - <code>192.168.31.100</code> и <code>fd00:6868:6868::8866</code> соответственно. IP-адреса пограничного маршрутизатора можно узнать с помощью команды <code>ip add</code>.</p><h3 id="метод-1" tabindex="-1"><a class="header-anchor" href="#метод-1"><span>Метод 1</span></a></h3><p>Есть два способа настроить доступ к интернету на устройствах локальной сети.<br> Первый способ - настроить статический IP-адрес на каждом устройстве и указать IP-адрес пограничного маршрутизатора в качестве шлюза.<br> Обратите внимание, что большинство мобильных устройств поддерживают только ручную настройку IPv4-шлюза и не поддерживают ручную настройку IPv6-шлюза, если не получены root-права и не выполнены соответствующие настройки.</p><p>В качестве примера рассмотрим устройство Windows.<br> Можно сначала включить DHCP и записать автоматически назначенный IP-адрес для справки, а затем вручную настроить статический IP-адрес.</p><div class="custom-container tip"><p class="custom-container-title">Настройка DNS</p><p>В этой конфигурации перехватывается DNS-трафик, поэтому DNS можно указать произвольно.</p><p>Рекомендуется указать IP-адрес пограничного маршрутизатора, чтобы избежать утечки DNS.</p></div><p><img width="231" alt="image" src="https://user-images.githubusercontent.com/110686480/208310266-632e36b9-a23b-4b90-aa28-583b50e87c66.png"> <img width="238" alt="image" src="https://user-images.githubusercontent.com/110686480/208309659-e3172218-ef27-4a94-a017-225f8e05b611.png"></p><h3 id="метод-2" tabindex="-1"><a class="header-anchor" href="#метод-2"><span>Метод 2</span></a></h3><p>Второй способ настроить доступ к интернету на устройствах локальной сети - указать пограничный маршрутизатор в качестве шлюза в настройках маршрутизатора.<br> Этот метод не требует настройки на каждом устройстве, подключенном к маршрутизатору, но обратите внимание, что некоторые маршрутизаторы не поддерживают настройку IPv6-шлюза, поэтому устройствам, которым требуется IPv6, необходимо вручную настроить IPv6 в соответствии с методом 1.</p><img width="700" alt="image" src="https://user-images.githubusercontent.com/110686480/208310174-2245a890-eb6b-4341-899f-81c6ac8255ff.png"><h2 id="результаты" tabindex="-1"><a class="header-anchor" href="#результаты"><span>Результаты</span></a></h2><p>После настройки в соответствии с вышеуказанными инструкциями устройства смогут получать доступ к интернету по IPv4 и IPv6.<br> На тестовом сайте, например https://ipv6-test.com/, вы увидите следующие результаты (сайт должен быть проксирован, чтобы увидеть эти результаты):</p><img width="700" alt="image" src="https://user-images.githubusercontent.com/110686480/208743723-f8a2751b-43d0-4353-9383-5ae0e00e9449.png"><h2 id="заключение" tabindex="-1"><a class="header-anchor" href="#заключение"><span>Заключение</span></a></h2><p>В настоящее время IPv6 еще не получил широкого распространения, и 99% трафика, к которому мы обращаемся, по-прежнему приходится на IPv4.<br> Многие провайдеры VPS</p>`,30);function X(S,j){const o=p("I18nTip"),e=p("ExternalLinkIcon");return i(),r("div",null,[u,a(o),s("p",null,[n("Эта конфигурация основана на "),s("a",d,[n("Новом руководстве по V2Ray на русском языке - Прозрачное проксирование (TPROXY)"),a(e)]),n(", "),s("a",v,[n("Руководстве по настройке прозрачного проксирования (TProxy)"),a(e)]),n(" и "),s("a",k,[n("Прозрачное проксирование: Исключение трафика Xray с помощью GID"),a(e)]),n(". Она включает поддержку IPv6 для прозрачного проксирования и использует схему VLESS-TCP-XTLS-RPRX-Vision для обхода блокировок (рекомендуется использовать версии 1.7.2 и выше).")]),s("p",null,[n("Настройка Xray не является основной темой данной статьи. Пользователи могут изменять ее в соответствии со своими потребностями. Подробную информацию можно найти в "),s("a",m,[n("примерах официальной документации"),a(e)]),n(" или в других отличных примерах, таких как "),s("a",b,[n("@chika0801"),a(e)]),n(" и "),s("a",q,[n("@lxhao61"),a(e)]),n(".")]),g,s("p",null,[n("Если на пограничном маршрутизаторе не установлена программа Xray, можно вручную скачать соответствующую версию Xray, например "),s("a",y,[n("Xray-linux-64.zip"),a(e)]),n(", а затем скопировать файл "),s("a",h,[n("install-release.sh"),a(e)]),n(" на пограничный маршрутизатор. Предоставьте файлу права на выполнение "),f,n(" и запустите его с помощью команды "),x,n(". Следуйте инструкциям для локальной установки.")]),R,s("p",null,[n("Адреса шлюза "),A,n(", "),_,n(" и т.д. можно получить с помощью команд "),I,n(" и "),P,n(),s("a",T,[n("ссылка"),a(e)]),n(".")]),E])}const Y=l(c,[["render",X],["__file","tproxy_ipv4_and_ipv6.html.vue"]]);export{Y as default};
