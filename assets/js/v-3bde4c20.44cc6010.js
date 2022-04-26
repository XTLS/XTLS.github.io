"use strict";(self.webpackChunkXray_docs_next=self.webpackChunkXray_docs_next||[]).push([[7140],{6106:(o,l,e)=>{e.r(l),e.d(l,{data:()=>t});const t={key:"v-3bde4c20",path:"/config/outbounds/",title:"出站协议",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"协议列表",slug:"协议列表",children:[]}],filePathRelative:"config/outbounds/README.md",git:{updatedTime:1631879584e3,contributors:[{name:"JimhHan",email:"50871214+JimhHan@users.noreply.github.com",commits:3},{name:"xqzr",email:"34030394+xqzr@users.noreply.github.com",commits:1}]}}},7880:(o,l,e)=>{e.r(l),e.d(l,{default:()=>O});var t=e(6252);const n=(0,t._)("h1",{id:"出站协议",tabindex:"-1"},[(0,t._)("a",{class:"header-anchor",href:"#出站协议","aria-hidden":"true"},"#"),(0,t.Uk)(" 出站协议")],-1),u=(0,t._)("blockquote",null,[(0,t._)("p",null,[(0,t._)("strong",null,"这个章节包含了目前所有可用于 Outbounds 的协议及具体配置细节.")])],-1),r=(0,t._)("h2",{id:"协议列表",tabindex:"-1"},[(0,t._)("a",{class:"header-anchor",href:"#协议列表","aria-hidden":"true"},"#"),(0,t.Uk)(" 协议列表")],-1),a=(0,t.Uk)("Blackhole"),s=(0,t.Uk)("Blackhole（黑洞）是一个出站数据协议，它会阻碍所有数据的出站，配合 "),c=(0,t.Uk)("路由（Routing）"),k=(0,t.Uk)(" 一起使用，可以达到禁止访问某些网站的效果。"),d=(0,t.Uk)("DNS"),_=(0,t._)("p",null,"DNS 是一个出站协议，主要用于拦截和转发 DNS 查询。此出站协议只能接收 DNS 流量（包含基于 UDP 和 TCP 协议的查询），其它类型的流量会导致错误。",-1),i=(0,t.Uk)("Freedom"),h=(0,t._)("p",null,"Freedom 是一个出站协议，可以用来向任意网络发送（正常的） TCP 或 UDP 数据。",-1),p=(0,t.Uk)("HTTP"),m=(0,t._)("p",null,"HTTP 协议",-1),f=(0,t.Uk)("Socks"),b=(0,t.Uk)("标准 Socks 协议实现，兼容 "),g={href:"http://ftp.icm.edu.pl/packages/socks/socks4/SOCKS4.protocol",target:"_blank",rel:"noopener noreferrer"},U=(0,t.Uk)("Socks 4"),w=(0,t.Uk)("、Socks 4a 和 "),S={href:"http://ftp.icm.edu.pl/packages/socks/socks4/SOCKS4.protocol",target:"_blank",rel:"noopener noreferrer"},W=(0,t.Uk)("Socks 5"),q=(0,t.Uk)("。"),T=(0,t.Uk)("VLESS"),v=(0,t._)("p",null,"VLESS 是一个无状态的轻量传输协议，可以作为 Xray 客户端和服务器之间的桥梁。",-1),D=(0,t.Uk)("VMess"),x=(0,t.Uk)("VMess"),y=(0,t.Uk)(" 是一个加密传输协议，可以作为 Xray 客户端和服务器之间的桥梁。"),C=(0,t.Uk)("Trojan"),P={href:"https://trojan-gfw.github.io/trojan/protocol",target:"_blank",rel:"noopener noreferrer"},j=(0,t.Uk)("Trojan"),H=(0,t.Uk)(" 协议。"),N=(0,t.Uk)("Shadowsocks"),z={href:"https://zh.wikipedia.org/wiki/Shadowsocks",target:"_blank",rel:"noopener noreferrer"},E=(0,t.Uk)("Shadowsocks"),L=(0,t.Uk)(" 协议。"),O={render:function(o,l){const e=(0,t.up)("RouterLink"),O=(0,t.up)("OutboundLink");return(0,t.wg)(),(0,t.iD)(t.HY,null,[n,u,r,(0,t._)("blockquote",null,[(0,t._)("p",null,[(0,t.Wm)(e,{to:"/config/outbounds/blackhole.html"},{default:(0,t.w5)((()=>[a])),_:1})])]),(0,t._)("p",null,[s,(0,t.Wm)(e,{to:"/config/routing.html"},{default:(0,t.w5)((()=>[c])),_:1}),k]),(0,t._)("blockquote",null,[(0,t._)("p",null,[(0,t.Wm)(e,{to:"/config/outbounds/dns.html"},{default:(0,t.w5)((()=>[d])),_:1})])]),_,(0,t._)("blockquote",null,[(0,t._)("p",null,[(0,t.Wm)(e,{to:"/config/outbounds/freedom.html"},{default:(0,t.w5)((()=>[i])),_:1})])]),h,(0,t._)("blockquote",null,[(0,t._)("p",null,[(0,t.Wm)(e,{to:"/config/outbounds/http.html"},{default:(0,t.w5)((()=>[p])),_:1})])]),m,(0,t._)("blockquote",null,[(0,t._)("p",null,[(0,t.Wm)(e,{to:"/config/outbounds/socks.html"},{default:(0,t.w5)((()=>[f])),_:1})])]),(0,t._)("p",null,[b,(0,t._)("a",g,[U,(0,t.Wm)(O)]),w,(0,t._)("a",S,[W,(0,t.Wm)(O)]),q]),(0,t._)("blockquote",null,[(0,t._)("p",null,[(0,t.Wm)(e,{to:"/config/outbounds/vless.html"},{default:(0,t.w5)((()=>[T])),_:1})])]),v,(0,t._)("blockquote",null,[(0,t._)("p",null,[(0,t.Wm)(e,{to:"/config/outbounds/vmess.html"},{default:(0,t.w5)((()=>[D])),_:1})])]),(0,t._)("p",null,[(0,t.Wm)(e,{to:"/config/development/protocols/vmess.html"},{default:(0,t.w5)((()=>[x])),_:1}),y]),(0,t._)("blockquote",null,[(0,t._)("p",null,[(0,t.Wm)(e,{to:"/config/outbounds/trojan.html"},{default:(0,t.w5)((()=>[C])),_:1})])]),(0,t._)("p",null,[(0,t._)("a",P,[j,(0,t.Wm)(O)]),H]),(0,t._)("blockquote",null,[(0,t._)("p",null,[(0,t.Wm)(e,{to:"/config/outbounds/shadowsocks.html"},{default:(0,t.w5)((()=>[N])),_:1})])]),(0,t._)("p",null,[(0,t._)("a",z,[E,(0,t.Wm)(O)]),L])],64)}}}}]);