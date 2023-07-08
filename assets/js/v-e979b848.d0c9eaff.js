"use strict";(self.webpackChunkXray_docs_next=self.webpackChunkXray_docs_next||[]).push([[346],{27726:(e,n,o)=>{o.r(n),o.d(n,{data:()=>t});const t={key:"v-e979b848",path:"/en/config/outbounds/dns.html",title:"DNS",lang:"en-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"OutboundConfigurationObject",slug:"outboundconfigurationobject",children:[]},{level:2,title:"DNS Configuration Example",slug:"dns-configuration-example",children:[]}],filePathRelative:"en/config/outbounds/dns.md",git:{updatedTime:1688370632e3,contributors:[{name:"Winston2084",email:"126307318+Winston2084@users.noreply.github.com",commits:1},{name:"hmol233",email:"82594500+hmol233@users.noreply.github.com",commits:1},{name:"yuhan6665",email:"1588741+yuhan6665@users.noreply.github.com",commits:1}]}}},35569:(e,n,o)=>{o.r(n),o.d(n,{default:()=>b});var t=o(66252);const s=(0,t._)("h1",{id:"dns",tabindex:"-1"},[(0,t._)("a",{class:"header-anchor",href:"#dns","aria-hidden":"true"},"#"),(0,t.Uk)(" DNS")],-1),a=(0,t._)("p",null,"DNS is an outbound protocol used for intercepting and forwarding DNS queries.",-1),r=(0,t._)("p",null,"This outbound protocol can only handle DNS traffic, including queries based on UDP and TCP protocols. Other types of traffic will result in an error.",-1),i=(0,t.Uk)("When handling DNS queries, this outbound protocol will forward IP queries (A and AAAA) to the built-in "),u=(0,t.Uk)("DNS server"),p=(0,t.Uk)(". Other types of query traffic will be forwarded to their original destination addresses."),l=(0,t.uE)('<h2 id="outboundconfigurationobject" tabindex="-1"><a class="header-anchor" href="#outboundconfigurationobject" aria-hidden="true">#</a> OutboundConfigurationObject</h2><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.1.1.1&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">53</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;nonIPQuery&quot;</span><span class="token operator">:</span> <span class="token string">&quot;drop&quot;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><blockquote><p><code>network</code>: &quot;tcp&quot; | &quot;udp&quot;</p></blockquote><p>Modifies the transport layer protocol for DNS traffic. The possible values are <code>&quot;tcp&quot;</code> and <code>&quot;udp&quot;</code>. When not specified, the original transport method will be retained.</p><blockquote><p><code>address</code>: address</p></blockquote><p>Modifies the DNS server address. When not specified, the original address specified in the source will be retained.</p><blockquote><p><code>port</code>: number</p></blockquote><p>Modifies the DNS server port. When not specified, the original port specified in the source will be retained.</p><blockquote><p><code>nonIPQuery</code>: string</p></blockquote><p>Control non IP queries (neither A or AAAA), <code>&quot;drop&quot;</code> this request or <code>&quot;skip&quot;</code> processing in DNS module，the request will be forwarded to target. By default is <code>&quot;drop&quot;</code>.</p>',10),c={id:"dns-configuration-example",tabindex:"-1"},d=(0,t._)("a",{class:"header-anchor",href:"#dns-configuration-example","aria-hidden":"true"},"#",-1),h=(0,t.Uk)(" DNS Configuration Example "),b={render:function(e,n){const o=(0,t.up)("RouterLink"),b=(0,t.up)("Badge");return(0,t.wg)(),(0,t.iD)(t.HY,null,[s,a,r,(0,t._)("p",null,[i,(0,t.Wm)(o,{to:"/en/config/dns.html"},{default:(0,t.w5)((()=>[u])),_:1}),p]),l,(0,t._)("h2",c,[d,h,(0,t.Wm)(b,{text:"WIP",type:"warning"})])],64)}}}}]);