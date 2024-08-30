import{_ as p,r as t,o as i,c as l,a,b as n,d as s,e as c}from"./app-CkESsstx.js";const r={},u=n("h1",{id:"enhancing-proxy-security-with-cloudflare-warp",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#enhancing-proxy-security-with-cloudflare-warp"},[n("span",null,"Enhancing Proxy Security with Cloudflare Warp")])],-1),d=n("p",null,"Xray (1.6.5+) has added outbound WireGuard support. Although the added code and dependencies will increase the core size, we believe that this is a necessary new feature for three reasons:",-1),v={href:"https://github.com/net4people/bbs/issues/129#issuecomment-1308102504",target:"_blank",rel:"noopener noreferrer"},k=n("li",null,"As we all know, most airports will log the domain names visited by users, and some airports will even audit and block some user traffic. One way to protect user privacy is to use chain proxies on the client side. The WireGuard lightweight VPN protocol used by Warp adds an extra layer of encryption within the proxy layer. For airports, the target of all user traffic is Warp, thereby maximizing privacy protection.",-1),m=n("li",null,"It is easy to use, and only one core is needed to complete the split, Wireguard Tun, and chain proxy settings.",-1),b=n("h2",{id:"applying-for-a-warp-account",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#applying-for-a-warp-account"},[n("span",null,"Applying for a Warp Account")])],-1),q=n("li",null,"Thank you Cloudflare for promoting a free internet. Now you can use the Warp service for free, and the nearest server will be automatically selected based on the exit.",-1),h={href:"https://github.com/ViRb3/wgcf/releases",target:"_blank",rel:"noopener noreferrer"},g=n("li",null,[s("Run "),n("code",null,"wgcf register"),s(" to generate "),n("code",null,"wgcf-account.toml"),s(".")],-1),y=n("li",null,[s("Run "),n("code",null,"wgcf generate"),s(" to generate "),n("code",null,"wgcf-profile.conf"),s(". Copy the following content:")],-1),f=c(`<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[Interface]
PrivateKey = my private key
Address = 172.16.0.2/32
Address = 2606:4700:110:8949:fed8:2642:a640:c8e1/128
DNS = 1.1.1.1
MTU = 1280
[Peer]
PublicKey = Warp public key
AllowedIPs = 0.0.0.0/0
AllowedIPs = ::/0
Endpoint = engage.cloudflareclient.com:2408
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="diverting-inbound-traffic-to-warp-on-the-server-side" tabindex="-1"><a class="header-anchor" href="#diverting-inbound-traffic-to-warp-on-the-server-side"><span>Diverting inbound traffic to warp on the server side</span></a></h2><p>Add a new WireGuard outbound in the existing ones.</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wireguard&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;secretKey&quot;</span><span class="token operator">:</span> <span class="token string">&quot;My private key&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;172.16.0.2/32&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2606:4700:110:8949:fed8:2642:a640:c8e1/128&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;peers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;publicKey&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Warp public key&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;endpoint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;engage.cloudflareclient.com:2408&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wireguard-1&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Recommended routing strategy is <code>IPIfNonMatch</code>.</p><p>Add the following to the existing router:</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code>            <span class="token punctuation">{</span>
                <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;domain&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token string">&quot;geosite:cn&quot;</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wireguard-1&quot;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;ip&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token string">&quot;geoip:cn&quot;</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wireguard-1&quot;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="using-warp-chain-proxy-on-the-client-side" tabindex="-1"><a class="header-anchor" href="#using-warp-chain-proxy-on-the-client-side"><span>Using Warp Chain Proxy on the Client Side</span></a></h2><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
   <span class="token property">&quot;outbounds&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
         <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span><span class="token string">&quot;wireguard&quot;</span><span class="token punctuation">,</span>
         <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;secretKey&quot;</span><span class="token operator">:</span><span class="token string">&quot;My private key&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;peers&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
               <span class="token punctuation">{</span>
                  <span class="token property">&quot;publicKey&quot;</span><span class="token operator">:</span><span class="token string">&quot;Warp public key&quot;</span><span class="token punctuation">,</span>
                  <span class="token property">&quot;endpoint&quot;</span><span class="token operator">:</span><span class="token string">&quot;engage.cloudflareclient.com:2408&quot;</span>
               <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
         <span class="token punctuation">}</span><span class="token punctuation">,</span>
         <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;sockopt&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
               <span class="token property">&quot;dialerProxy&quot;</span><span class="token operator">:</span><span class="token string">&quot;proxy&quot;</span>
            <span class="token punctuation">}</span>
         <span class="token punctuation">}</span><span class="token punctuation">,</span>
         <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span><span class="token string">&quot;wireguard-1&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
         <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span><span class="token string">&quot;proxy&quot;</span><span class="token punctuation">,</span>
         <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span><span class="token string">&quot;vmess&quot;</span><span class="token punctuation">,</span>
         <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;vnext&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
               <span class="token punctuation">{</span>
                  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span><span class="token string">&quot;My IP&quot;</span><span class="token punctuation">,</span>
                  <span class="token property">&quot;port&quot;</span><span class="token operator">:</span>My port<span class="token punctuation">,</span>
                  <span class="token property">&quot;users&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
                     <span class="token punctuation">{</span>
                        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token string">&quot;My UUID&quot;</span><span class="token punctuation">,</span>
                        <span class="token property">&quot;security&quot;</span><span class="token operator">:</span><span class="token string">&quot;auto&quot;</span>
                     <span class="token punctuation">}</span>
                  <span class="token punctuation">]</span>
               <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
         <span class="token punctuation">}</span><span class="token punctuation">,</span>
         <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;network&quot;</span><span class="token operator">:</span><span class="token string">&quot;tcp&quot;</span>
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9);function w(x,_){const o=t("I18nTip"),e=t("ExternalLinkIcon");return i(),l("div",null,[u,a(o),d,n("ol",null,[n("li",null,[s("Through recent discussions and "),n("a",v,[s("experiments"),a(e)]),s(", we know that proxying the traffic back to China is not safe. One way to deal with this is to route the back-to-China traffic to a black hole, but the downside is that due to the delay in geosite and geoip updates or the lack of knowledge on how to properly split the traffic on the client side, the traffic ends up going to the black hole, affecting the user experience. In this case, we only need to import the back-to-China traffic into Cloudflare Warp, which can achieve the same level of security without affecting the user experience.")]),k,m]),b,n("ol",null,[q,n("li",null,[s("Use a VPS and download "),n("a",h,[s("wgcf"),a(e)]),s(".")]),g,y]),f])}const I=p(r,[["render",w],["__file","warp.html.vue"]]);export{I as default};
