"use strict";(self.webpackChunkXray_docs_next=self.webpackChunkXray_docs_next||[]).push([[8800],{82809:(n,e,o)=>{o.r(e),o.d(e,{data:()=>s});const s={key:"v-d76e893a",path:"/config/outbounds/freedom.html",title:"Freedom",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"OutboundConfigurationObject",slug:"outboundconfigurationobject",children:[]}],filePathRelative:"config/outbounds/freedom.md",git:{updatedTime:1688863509e3,contributors:[{name:"JimhHan",email:"50871214+JimhHan@users.noreply.github.com",commits:4},{name:"yuhan6665",email:"1588741+yuhan6665@users.noreply.github.com",commits:2},{name:"rootmelo92118",email:"32770959+rootmelo92118@users.noreply.github.com",commits:1}]}}},57120:(n,e,o)=>{o.r(e),o.d(e,{default:()=>E});var s=o(66252);const t=(0,s.uE)('<h1 id="freedom" tabindex="-1"><a class="header-anchor" href="#freedom" aria-hidden="true">#</a> Freedom</h1><p>Freedom 是一个出站协议，可以用来向任意网络发送（正常的） TCP 或 UDP 数据。</p><h2 id="outboundconfigurationobject" tabindex="-1"><a class="header-anchor" href="#outboundconfigurationobject" aria-hidden="true">#</a> OutboundConfigurationObject</h2><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;domainStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;AsIs&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;redirect&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1:3366&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;userLevel&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;fragment&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;packets&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tlshello&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;length&quot;</span><span class="token operator">:</span> <span class="token string">&quot;100-200&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;interval&quot;</span><span class="token operator">:</span> <span class="token string">&quot;10-20&quot;</span> <span class="token comment">// ms</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><blockquote><p><code>domainStrategy</code>: &quot;AsIs&quot; | &quot;UseIP&quot; | &quot;UseIPv4&quot; | &quot;UseIPv6&quot;</p></blockquote><p>在目标地址为域名时, 配置相应的值, Freedom 的行为模式如下:</p>',6),a=(0,s._)("li",null,[(0,s._)("code",null,'"AsIs"'),(0,s.Uk)(": Freedom 通过系统 DNS 服务器解析获取 IP, 向此域名发出连接.")],-1),l=(0,s._)("code",null,'"UseIP"',-1),u=(0,s.Uk)("、"),p=(0,s._)("code",null,'"UseIPv4"',-1),c=(0,s.Uk)(" 和 "),r=(0,s._)("code",null,'"UseIPv6"',-1),d=(0,s.Uk)(": Xray 使用 "),i=(0,s.Uk)("内置 DNS 服务器"),m=(0,s.Uk)(" 解析获取 IP, 向此域名发出连接. 默认值为 "),k=(0,s._)("code",null,'"AsIs"',-1),b=(0,s.Uk)("。"),q={class:"custom-container tip"},h=(0,s._)("p",{class:"custom-container-title"},"TIP 1",-1),g=(0,s.Uk)("当使用 "),_=(0,s._)("code",null,'"UseIP"',-1),U=(0,s.Uk)(" 模式，并且 "),f=(0,s.Uk)("出站连接配置"),v=(0,s.Uk)(" 中指定了 "),y=(0,s._)("code",null,"sendThrough",-1),I=(0,s.Uk)(" 时，Freedom 会根据 "),P=(0,s._)("code",null,"sendThrough",-1),j=(0,s.Uk)(" 的值自动判断所需的 IP 类型，IPv4 或 IPv6。"),F=(0,s.uE)('<div class="custom-container tip"><p class="custom-container-title">TIP 2</p><p>当使用 <code>&quot;UseIPv4&quot;</code> 或 <code>&quot;UseIPv6&quot;</code> 模式时，Freedom 会只使用对应的 IPv4 或 IPv6 地址。当 <code>sendThrough</code> 指定了不匹配的本地地址时，将导致连接失败。</p></div><blockquote><p><code>redirect</code>: address_port</p></blockquote><p>Freedom 会强制将所有数据发送到指定地址（而不是 inbound 指定的地址）。</p><p>其值为一个字符串，样例：<code>&quot;127.0.0.1:80&quot;</code>，<code>&quot;:1234&quot;</code>。</p><p>当地址不指定时，如 <code>&quot;:443&quot;</code>，Freedom 不会修改原先的目标地址。 当端口为 <code>0</code> 时，如 <code>&quot;xray.com: 0&quot;</code>，Freedom 不会修改原先的端口。</p><blockquote><p><code>userLevel</code>: number</p></blockquote>',6),T=(0,s.Uk)("用户等级，连接会使用这个用户等级对应的 "),C=(0,s.Uk)("本地策略"),w=(0,s.Uk)("。"),x=(0,s.Uk)("userLevel 的值, 对应 "),S=(0,s.Uk)("policy"),L=(0,s.Uk)(" 中 "),A=(0,s._)("code",null,"level",-1),D=(0,s.Uk)(" 的值。 如不指定, 默认为 0。"),N=(0,s._)("blockquote",null,[(0,s._)("p",null,[(0,s._)("code",null,"fragment"),(0,s.Uk)(": map")])],-1),O=(0,s._)("p",null,"一些键值对配置项，用于控制发出的 TCP 分片，在某些情况下可以欺骗审查系统，比如绕过 SNI 黑名单。",-1),W=(0,s._)("p",null,[(0,s._)("code",null,'"packets"'),(0,s.Uk)('：支持两种分片方式 "1-3" 是 TCP 的流切片，应用于客户端第 1 至第 3 次写数据。"tlshello" 是 TLS 握手包切片。')],-1),H=(0,s._)("p",null,[(0,s._)("code",null,'"length"'),(0,s.Uk)("：分片包长 (byte)")],-1),X=(0,s._)("p",null,[(0,s._)("code",null,'"interval"'),(0,s.Uk)("：分片间隔（ms）")],-1),E={render:function(n,e){const o=(0,s.up)("RouterLink");return(0,s.wg)(),(0,s.iD)(s.HY,null,[t,(0,s._)("ul",null,[a,(0,s._)("li",null,[l,u,p,c,r,d,(0,s.Wm)(o,{to:"/config/dns.html"},{default:(0,s.w5)((()=>[i])),_:1}),m,k,b])]),(0,s._)("div",q,[h,(0,s._)("p",null,[g,_,U,(0,s.Wm)(o,{to:"/config/outbound.html#outboundobject"},{default:(0,s.w5)((()=>[f])),_:1}),v,y,I,P,j])]),F,(0,s._)("p",null,[T,(0,s.Wm)(o,{to:"/config/policy.html#levelpolicyobject"},{default:(0,s.w5)((()=>[C])),_:1}),w]),(0,s._)("p",null,[x,(0,s.Wm)(o,{to:"/config/policy.html#policyobject"},{default:(0,s.w5)((()=>[S])),_:1}),L,A,D]),N,O,W,H,X],64)}}}}]);