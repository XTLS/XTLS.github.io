import{_ as c,r as p,o as i,c as r,d as a,w as e,e as l,a as n,b as s}from"./app-IuAvQN-B.js";const u={},k=l('<h1 id="基于-fwmark-或-sendthrough-的流量重定向" tabindex="-1"><a class="header-anchor" href="#基于-fwmark-或-sendthrough-的流量重定向"><span>基于 fwmark 或 sendThrough 的流量重定向</span></a></h1><p>通过 Xray 将特定的流量指向特定出口，实现全局路由“分流”</p><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><p>之前在网络上看到许多代理或者 VPN 会接管全局路由，如果与 Xray 同时安装，会导致 Xray 失效。参考了网络上许多教程，及时分流，也是通过维护一张或者多张 CIDR 路由表来实现的。这种情况下并不优雅，如果我想可以任意替换，实现按需分流，那有没有更好的办法呢？有！</p><p>通过 fwmark 或 Xray 的 sendThrough，再简单配合路由表功能即可实现：</p><ol><li>Xray 可设置指定的 Tag、域名等走指定接口。如果您的接口是双栈的，可以指定 IPV4 或者 IPV6</li><li>其余用户则走原 IPV4 或者 IPV6</li></ol><p>具体设置如下（以 Debian10 为例）：</p><h2 id="_1、安装代理或者-vpn-软件-例如-wireguard、ipsec-等" tabindex="-1"><a class="header-anchor" href="#_1、安装代理或者-vpn-软件-例如-wireguard、ipsec-等"><span>1、安装代理或者 VPN 软件（例如 Wireguard、IPsec 等）</span></a></h2><p>根据不同系统和不同软件，请参考官方安装方法</p><h2 id="_2、编辑-vpn-配置文件-以-wireguard-为例" tabindex="-1"><a class="header-anchor" href="#_2、编辑-vpn-配置文件-以-wireguard-为例"><span>2、编辑 VPN 配置文件（以 WireGuard 为例）</span></a></h2><p>原始文件：</p>',11),d=n("div",{class:"language-ini line-numbers-mode","data-ext":"ini","data-title":"ini"},[n("pre",{class:"language-ini"},[n("code",null,[n("span",{class:"token section"},[n("span",{class:"token punctuation"},"["),n("span",{class:"token section-name selector"},"Interface"),n("span",{class:"token punctuation"},"]")]),s(`
`),n("span",{class:"token key attr-name"},"PrivateKey"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"xxxxxxxxxxxxxxxxxxxx"),s(`
`),n("span",{class:"token key attr-name"},"Address"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},[s('"'),n("span",{class:"token inner-value"},"your wg0 v4 address"),s('"')]),s(`
`),n("span",{class:"token key attr-name"},"Address"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},[s('"'),n("span",{class:"token inner-value"},"your wg0 v6 address"),s('"')]),s(`
`),n("span",{class:"token key attr-name"},"DNS"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"8.8.8.8"),s(`
`),n("span",{class:"token key attr-name"},"MTU"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"1280"),s(`
`),n("span",{class:"token section"},[n("span",{class:"token punctuation"},"["),n("span",{class:"token section-name selector"},"Peer"),n("span",{class:"token punctuation"},"]")]),s(`
`),n("span",{class:"token key attr-name"},"PublicKey"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"xxxxxxxxxxxxxxxxxxxxx"),s(`
`),n("span",{class:"token key attr-name"},"AllowedIPs"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"::/0"),s(`
`),n("span",{class:"token key attr-name"},"AllowedIPs"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"0.0.0.0/0"),s(`
`),n("span",{class:"token key attr-name"},"Endpoint"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},[s('"'),n("span",{class:"token inner-value"},"ip:port"),s('"')]),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),v=n("p",null,[s("在 "),n("code",null,"[Interface]"),s(" 下添加如下命令：")],-1),m=n("div",{class:"language-ini line-numbers-mode","data-ext":"ini","data-title":"ini"},[n("pre",{class:"language-ini"},[n("code",null,[n("span",{class:"token key attr-name"},"Table"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"off"),s(`
`),n("span",{class:"token key attr-name"},"PostUP"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"ip -4 rule add fwmark <mark> lookup <table>"),s(`
`),n("span",{class:"token key attr-name"},"PostUP"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"ip -4 route add default dev <接口名称> table <table>"),s(`
`),n("span",{class:"token key attr-name"},"PostUP"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"ip -4 rule add table main suppress_prefixlength 0"),s(`
`),n("span",{class:"token key attr-name"},"PostUP"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"ip -6 rule add fwmark <mark> lookup <table>"),s(`
`),n("span",{class:"token key attr-name"},"PostUP"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"ip -6 rule add not fwmark <table> table <table>"),s(`
`),n("span",{class:"token key attr-name"},"PostUP"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"ip -6 route add ::/0 dev <接口名称> table <table>"),s(`
`),n("span",{class:"token key attr-name"},"PostUP"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"ip -6 rule add table main suppress_prefixlength 0"),s(`
`),n("span",{class:"token key attr-name"},"PostDown"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"ip -4 rule delete fwmark <mark> lookup <table>"),s(`
`),n("span",{class:"token key attr-name"},"PostDown"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"ip -4 rule delete table main suppress_prefixlength 0"),s(`
`),n("span",{class:"token key attr-name"},"PostDown"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"ip -6 rule delete fwmark <mark> lookup <table>"),s(`
`),n("span",{class:"token key attr-name"},"PostDown"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"ip -6 rule delete not fwmark <table> table <table>"),s(`
`),n("span",{class:"token key attr-name"},"PostDown"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"ip -6 rule delete table main suppress_prefixlength 0"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),b=n("div",{class:"custom-container tip"},[n("p",{class:"custom-container-title"},"Tip"),n("ul",null,[n("li",null,[s("此命令表示 IPv4 中 fwmark 为 "),n("code",null,"<mark>"),s("，IPv6 中 fwmark 为"),n("code",null,"<mark>"),s("，::/0 全局 v6 走 WireGuard")]),n("li",null,"可根据自己需求增删命令，mark 值要与 Xray-core 中设置为相同，table 值自定"),n("li",null,"如果不支持配置文件，可以在系统中修改路由表")])],-1),g=n("div",{class:"language-ini line-numbers-mode","data-ext":"ini","data-title":"ini"},[n("pre",{class:"language-ini"},[n("code",null,[n("span",{class:"token section"},[n("span",{class:"token punctuation"},"["),n("span",{class:"token section-name selector"},"Interface"),n("span",{class:"token punctuation"},"]")]),s(`
`),n("span",{class:"token key attr-name"},"PrivateKey"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"xxxxxxxxxxxxxxxxxxxx"),s(`
`),n("span",{class:"token key attr-name"},"Address"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},[s('"'),n("span",{class:"token inner-value"},"your wg0 v4 address"),s('"')]),s(`
`),n("span",{class:"token key attr-name"},"Address"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},[s('"'),n("span",{class:"token inner-value"},"your wg0 v6 address"),s('"')]),s(`
`),n("span",{class:"token key attr-name"},"DNS"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"8.8.8.8"),s(`
`),n("span",{class:"token key attr-name"},"MTU"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"1280"),s(`
`),n("span",{class:"token section"},[n("span",{class:"token punctuation"},"["),n("span",{class:"token section-name selector"},"Peer"),n("span",{class:"token punctuation"},"]")]),s(`
`),n("span",{class:"token key attr-name"},"PublicKey"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"xxxxxxxxxxxxxxxxxxxxx"),s(`
`),n("span",{class:"token key attr-name"},"AllowedIPs"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"::/0"),s(`
`),n("span",{class:"token key attr-name"},"AllowedIPs"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"0.0.0.0/0"),s(`
`),n("span",{class:"token key attr-name"},"Endpoint"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},[s('"'),n("span",{class:"token inner-value"},"ip:port"),s('"')]),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),y=n("p",null,[s("在 "),n("code",null,"[Interface]"),s(" 下添加如下命令：")],-1),h=n("div",{class:"language-ini line-numbers-mode","data-ext":"ini","data-title":"ini"},[n("pre",{class:"language-ini"},[n("code",null,[n("span",{class:"token key attr-name"},"Table"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"off"),s(`
`),n("span",{class:"token key attr-name"},"PostUP"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},'ip -4 rule add from "your wg0 v4 address" lookup <table>'),s(`
`),n("span",{class:"token key attr-name"},"PostUP"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"ip -4 route add default dev wg0 table <table>"),s(`
`),n("span",{class:"token key attr-name"},"PostUP"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"ip -4 rule add table main suppress_prefixlength 0"),s(`
`),n("span",{class:"token key attr-name"},"PostUP"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"ip -6 rule add not fwmark <table> table <table>"),s(`
`),n("span",{class:"token key attr-name"},"PostUP"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"ip -6 route add ::/0 dev wg0 table <table>"),s(`
`),n("span",{class:"token key attr-name"},"PostUP"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"ip -6 rule add table main suppress_prefixlength 0"),s(`
`),n("span",{class:"token key attr-name"},"PostDown"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},'ip -4 rule delete from "your wg0 v4 address" lookup <table>'),s(`
`),n("span",{class:"token key attr-name"},"PostDown"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"ip -4 rule delete table main suppress_prefixlength 0"),s(`
`),n("span",{class:"token key attr-name"},"PostDown"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"ip -6 rule delete not fwmark <table> table <table>"),s(`
`),n("span",{class:"token key attr-name"},"PostDown"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token value attr-value"},"ip -6 rule delete table main suppress_prefixlength 0"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),x=n("div",{class:"custom-container tip"},[n("p",{class:"custom-container-title"},"Tip"),n("ul",null,[n("li",null,[s("此命令表示 IPV4 中来自 "),n("code",null,"your wg0 v4 address"),s(" 地址的走 WireGuard，IPv6 中::/0 全局 v6 走 WireGuard）")]),n("li",null,"可根据自己需求增删命令，实现 v6 分流，也可以与 fwmark 融合"),n("li",null,"如果不支持配置文件，可以在系统中修改路由表")])],-1),f=l(`<p>保存</p><p>可顺手安装</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">apt</span> <span class="token function">install</span> openresolv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3、启用-wireguard-网络接口" tabindex="-1"><a class="header-anchor" href="#_3、启用-wireguard-网络接口"><span>3、启用 WireGuard 网络接口</span></a></h2><p>加载内核模块</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>modprobe wireguard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>检查 WG 模块加载是否正常</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>lsmod <span class="token operator">|</span> <span class="token function">grep</span> wireguard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4、xray-core-配置文件修改" tabindex="-1"><a class="header-anchor" href="#_4、xray-core-配置文件修改"><span>4、Xray-core 配置文件修改</span></a></h2>`,9),P=n("div",{class:"language-json line-numbers-mode","data-ext":"json","data-title":"json"},[n("pre",{class:"language-json"},[n("code",null,[n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token property"},'"api"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token property"},'"services"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
      `),n("span",{class:"token string"},'"HandlerService"'),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token string"},'"LoggerService"'),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token string"},'"StatsService"'),s(`
    `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token property"},'"tag"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"api"'),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token property"},'"inbounds"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
    `),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token property"},'"listen"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"127.0.0.1"'),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token property"},'"port"'),n("span",{class:"token operator"},":"),s(" <port>"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token property"},'"protocol"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"dokodemo-door"'),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token property"},'"settings"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token property"},'"address"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"127.0.0.1"'),s(`
      `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token property"},'"tag"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"api"'),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token property"},'"outbounds"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
    `),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token property"},'"protocol"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"freedom"'),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token property"},'"settings"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token property"},'"domainStrategy"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"UseIPv6"'),s(`
        `),n("span",{class:"token comment"},"//设置默认用户走指定方式”UseIPv6”或者”UseIPv4”"),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token property"},'"protocol"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"freedom"'),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token property"},'"tag"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"wg0"'),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token property"},'"streamSettings"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token property"},'"sockopt"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token property"},'"mark"'),n("span",{class:"token operator"},":"),s(` <mark>
        `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token property"},'"settings"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token property"},'"domainStrategy"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"UseIPv6"'),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token comment"},"//设置fwmark为<mark>的用户走指定方式”UseIPv6””UseIPv4”"),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token property"},'"protocol"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"blackhole"'),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token property"},'"settings"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token property"},'"tag"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"blocked"'),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token property"},'"policy"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token property"},'"system"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token property"},'"statsInboundDownlink"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token boolean"},"true"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token property"},'"statsInboundUplink"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token boolean"},"true"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token property"},'"routing"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token property"},'"rules"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
      `),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token property"},'"inboundTag"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
          `),n("span",{class:"token string"},'"api"'),s(`
        `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token property"},'"outboundTag"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"api"'),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token property"},'"type"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"field"'),s(`
      `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token property"},'"type"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"field"'),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token property"},'"outboundTag"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"wg0"'),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token property"},'"inboundTag"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
          `),n("span",{class:"token string"},'"<inboundTag>"'),s(`
          `),n("span",{class:"token comment"},"//需要之前在inbound中指定好Tag，我这里是api生成的,还可以添加域名等等"),s(`
        `),n("span",{class:"token punctuation"},"]"),s(`
      `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token property"},'"outboundTag"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"blocked"'),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token property"},'"protocol"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
          `),n("span",{class:"token string"},'"bittorrent"'),s(`
        `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token property"},'"type"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"field"'),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"]"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token property"},'"stats"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),_=n("div",{class:"language-json line-numbers-mode","data-ext":"json","data-title":"json"},[n("pre",{class:"language-json"},[n("code",null,[n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token property"},'"api"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token property"},'"services"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
      `),n("span",{class:"token string"},'"HandlerService"'),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token string"},'"LoggerService"'),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token string"},'"StatsService"'),s(`
    `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token property"},'"tag"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"api"'),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token property"},'"inbounds"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
    `),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token property"},'"listen"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"127.0.0.1"'),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token property"},'"port"'),n("span",{class:"token operator"},":"),s(" <port>"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token property"},'"protocol"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"dokodemo-door"'),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token property"},'"settings"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token property"},'"address"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"127.0.0.1"'),s(`
      `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token property"},'"tag"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"api"'),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token property"},'"outbounds"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
    `),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token property"},'"protocol"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"freedom"'),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token property"},'"settings"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token property"},'"domainStrategy"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"UseIPv4"'),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token comment"},"//修改此处，可v4或者v6"),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token property"},'"tag"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"wg0"'),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token property"},'"protocol"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"freedom"'),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token property"},'"sendThrough"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"your wg0 v4 address"'),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token comment"},"//修改此处，可v4或者v6"),s(`
      `),n("span",{class:"token property"},'"settings"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token property"},'"domainStrategy"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"UseIPv4"'),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token comment"},"//修改此处，可v4或者v6"),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token property"},'"protocol"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"blackhole"'),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token property"},'"settings"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token property"},'"tag"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"blocked"'),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token property"},'"policy"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token property"},'"system"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token property"},'"statsInboundDownlink"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token boolean"},"true"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token property"},'"statsInboundUplink"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token boolean"},"true"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token property"},'"routing"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token property"},'"rules"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
      `),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token property"},'"inboundTag"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
          `),n("span",{class:"token string"},'"api"'),s(`
        `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token property"},'"outboundTag"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"api"'),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token property"},'"type"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"field"'),s(`
      `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token property"},'"type"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"field"'),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token property"},'"outboundTag"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"wg0"'),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token property"},'"inboundTag"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
          `),n("span",{class:"token string"},'"<inboundTag>"'),s(`
          `),n("span",{class:"token comment"},"//需要之前在 inbound 中指定好 Tag，我这里是 api 生成的,还可以添加域名等等"),s(`
        `),n("span",{class:"token punctuation"},"]"),s(`
      `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token property"},'"outboundTag"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"blocked"'),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token property"},'"protocol"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
          `),n("span",{class:"token string"},'"bittorrent"'),s(`
        `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token property"},'"type"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"field"'),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"]"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token property"},'"stats"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),w=l(`<div class="custom-container tip"><p class="custom-container-title">Tip</p><p>可以通过修改 &quot;domainStrategy&quot;: &quot;UseIPv6&quot;来控制对应用户的访问方式 实测优先级要高于系统本身的 gai.config</p></div><h2 id="_5、系统设置配置" tabindex="-1"><a class="header-anchor" href="#_5、系统设置配置"><span>5、系统设置配置</span></a></h2><div class="custom-container tip"><p class="custom-container-title">Tip</p><p>需要打开系统的 ip_forward</p></div><h2 id="_6、完成-wireguard-相关设置" tabindex="-1"><a class="header-anchor" href="#_6、完成-wireguard-相关设置"><span>6、完成 WireGuard 相关设置</span></a></h2><p>开启隧道</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>wg-quick up wg0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>开机自启</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> wg-quick@wg0
systemctl start wg-quick@wg0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>验证 IPv4/IPv6</p><blockquote><p>自行验证 Google 搜索 myip</p></blockquote><h2 id="后记" tabindex="-1"><a class="header-anchor" href="#后记"><span>后记</span></a></h2><p>本文本意是可以避免的多余的流量浪费，将路由和分流的功能交给 Xray 处理。避免了维护路由表的繁琐工作。顺便技术提升 UP。</p><h2 id="感谢" tabindex="-1"><a class="header-anchor" href="#感谢"><span>感谢</span></a></h2><p>@Xray-core @V2ray-core @WireGuard @p3terx @w @Hiram @Luminous @Ln @JackChou</p>`,14);function I(T,U){const t=p("Tab"),o=p("Tabs");return i(),r("div",null,[k,a(o,{title:"if-config"},{default:e(()=>[a(t,{title:"fwmark1"},{default:e(()=>[d,v,m,b]),_:1}),a(t,{title:"sendThrough1"},{default:e(()=>[g,y,h,x]),_:1})]),_:1}),f,a(o,{title:"xray-config"},{default:e(()=>[a(t,{title:"fwmark2"},{default:e(()=>[P]),_:1}),a(t,{title:"sendThrough2"},{default:e(()=>[_]),_:1})]),_:1}),w])}const D=c(u,[["render",I],["__file","redirect.html.vue"]]);export{D as default};
