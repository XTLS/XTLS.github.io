import{_ as p,r as c,o as d,c as l,a as t,b as e,d as o,w as n,e as a}from"./app-Bz5q2G4a.js";const r={},i=a(`<h1 id="freedom" tabindex="-1"><a class="header-anchor" href="#freedom"><span>Freedom</span></a></h1><p>Freedom 是一个出站协议，可以用来向任意网络发送（正常的） TCP 或 UDP 数据。</p><h2 id="outboundconfigurationobject" tabindex="-1"><a class="header-anchor" href="#outboundconfigurationobject"><span>OutboundConfigurationObject</span></a></h2><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;domainStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;AsIs&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;redirect&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1:3366&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;userLevel&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;fragment&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;packets&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tlshello&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;length&quot;</span><span class="token operator">:</span> <span class="token string">&quot;100-200&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;interval&quot;</span><span class="token operator">:</span> <span class="token string">&quot;10-20&quot;</span> <span class="token comment">// 单位ms</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string">&quot;noise&quot;</span>： <span class="token punctuation">{</span>
    <span class="token property">&quot;packet&quot;</span><span class="token operator">:</span><span class="token string">&quot;rand:100-200&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;delay&quot;</span><span class="token operator">:</span> <span class="token string">&quot;10-20&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;proxyProtocol&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>domainStrategy</code>: &quot;AsIs&quot;<br> &quot;UseIP&quot; | &quot;UseIPv6v4&quot; | &quot;UseIPv6&quot; | &quot;UseIPv4v6&quot; | &quot;UseIPv4&quot;<br> &quot;ForceIP&quot; | &quot;ForceIPv6v4&quot; | &quot;ForceIPv6&quot; | &quot;ForceIPv4v6&quot; | &quot;ForceIPv4&quot;</p></blockquote><p>默认值 <code>&quot;AsIs&quot;</code>。</p><p>当目标地址为域名时，配置相应的值，Freedom 的行为模式如下：</p>`,7),q=e("li",null,[o("当使用 "),e("code",null,'"AsIs"'),o(" 时，Xray将直接使用系统栈发起连接，优先级与选择IP取决于系统设置。出于一些原因，UDP连接如果使用域名会无视系统设置优先IPv4。")],-1),v=a("<li><code>&quot;IPv4&quot;</code> 代表尝试仅使用IPv4进行连接，<code>&quot;IPv4v6&quot;</code> 代表尝试使用IPv4或IPv6连接，但对于双栈域名，尽量使用IPv4。（v4v6调换后同理，不再赘述）</li><li>当在内置DNS设置了 <code>&quot;queryStrategy&quot;</code> 后，实际行为将会与这个选项取并，只有都被包含的IP类型才会被解析，如 <code>&quot;queryStrategy&quot;: &quot;UseIPv4&quot;</code> <code>&quot;domainStrategy&quot;: &quot;UseIP&quot;</code>，实际上等同于 <code>&quot;domainStrategy&quot;: &quot;UseIPv4&quot;</code>。</li><li>当使用 <code>&quot;Use&quot;</code> 开头的选项时，若解析结果不符合要求（如，域名只有IPv4解析结果但使用了UseIPv6），则会回落回AsIs。</li><li>当使用 <code>&quot;Force&quot;</code> 开头的选项时，若解析结果不符合要求，则该连接会无法建立。</li>",4),k={class:"custom-container tip"},m=e("p",{class:"custom-container-title"},"TIP 1",-1),b=e("code",null,'"UseIP"',-1),P=e("code",null,'"ForceIP"',-1),_=e("code",null,"sendThrough",-1),h=e("code",null,"sendThrough",-1),I=e("code",null,"sendThrough",-1),g=a("<blockquote><p><code>redirect</code>: address_port</p></blockquote><p>Freedom 会强制将所有数据发送到指定地址（而不是 inbound 指定的地址）。</p><p>其值为一个字符串，样例：<code>&quot;127.0.0.1:80&quot;</code>，<code>&quot;:1234&quot;</code>。</p><p>当地址不指定时，如 <code>&quot;:443&quot;</code>，Freedom 不会修改原先的目标地址。 当端口为 <code>0</code> 时，如 <code>&quot;xray.com: 0&quot;</code>，Freedom 不会修改原先的端口。</p><blockquote><p><code>userLevel</code>: number</p></blockquote>",5),y=e("code",null,"level",-1),f=a("<blockquote><p><code>fragment</code>: map</p></blockquote><p>一些键值对配置项，用于控制发出的 TCP 分片，在某些情况下可以欺骗审查系统，比如绕过 SNI 黑名单。</p><p><code>&quot;packets&quot;</code>：支持两种分片方式 &quot;1-3&quot; 是 TCP 的流切片，应用于客户端第 1 至第 3 次写数据。&quot;tlshello&quot; 是 TLS 握手包切片。</p><p><code>&quot;length&quot;</code>：分片包长 (byte)</p><p><code>&quot;interval&quot;</code>：分片间隔（ms）</p><p>当其为 0 且设置 <code>&quot;packets&quot;: &quot;tlshello&quot;</code> 时，被分片的 Client Hello 将会在一个TCP包中发送（如果其原始大小未超过MSS或MTU导致被系统自动分片）</p><blockquote><p><code>noise</code>: map</p></blockquote><p>UDP noise, 用于在发出UDP连接前发出一些随机数据作为“噪声”，出现该结构体则视为启用，可能可以欺骗嗅探器，也可能破坏正常连接。Use at your own risk.</p><p><code>&quot;packet&quot;</code>：str</p><p>噪声模式，格式为 <code>&quot;mode:value&quot;</code></p><p>现阶段支持两种模式 <code>rand</code> 与 <code>str</code></p><p>rand 模式，发送随机字节，冒号后接为随机字节长度，可以是固定值也可以是用 <code>-</code> 分割的随机范围，如 <code>&quot;rand:150&quot;</code>, 和 <code>&quot;rand:100-200&quot;</code></p><p>str 模式，发送固定的字符串，冒号后接为要发送的字符串，可以是任何字符串，不能包含冒号，如 &quot;str:To be, or not to be, that is the question&quot;</p><p><code>&quot;delay&quot;</code>：str</p><p>可选值 默认为0</p><p>发送噪声到发送真实数据的延迟，单位毫秒，可以是固定值也可以是用 <code>-</code> 分割的随机范围，如 <code>&quot;150&quot;</code> 或 <code>&quot;100-200&quot;</code> 。</p><blockquote><p><code>proxyProtocol</code>: number</p></blockquote><p>PROXY protocol 通常配合 <code>redirect</code> 重定向到开启了 PROXY protocol 协议的 Nginx 或其他后端服务中。如果后端服务不支持 PROXY protocol 协议，连接将会被断开。</p><p>proxyProtocol 的值为 PROXY protocol 版本号，可选 <code>1</code> 或 <code>2</code>，如不指定，默认为 <code>0</code> 不启用。</p>",19);function U(S,F){const u=c("I18nTip"),s=c("RouterLink");return d(),l("div",null,[t(u),i,e("ul",null,[q,e("li",null,[o("当填写其他值时，将使用 Xray-core "),t(s,{to:"/config/dns.html"},{default:n(()=>[o("内置 DNS 服务器")]),_:1}),o(" 服务器进行解析。若不存在DNSObject，则使用系统DNS。若有多个符合条件的IP地址时，核心会随机选择一个IP作为目标IP。")]),v]),e("div",k,[m,e("p",null,[o("当使用 "),b,o("、"),P,o(" 模式时，并且 "),t(s,{to:"/config/outbound.html#outboundobject"},{default:n(()=>[o("出站连接配置")]),_:1}),o(" 中指定了 "),_,o(" 时，Freedom 会根据 "),h,o(" 的值自动判断所需的 IP 类型，IPv4 或 IPv6。若手动指定了单种IP类型（如UseIPv4），但与 "),I,o(" 指定的本地地址不匹配，将会导致连接失败。")])]),g,e("p",null,[o("用户等级，连接会使用这个用户等级对应的 "),t(s,{to:"/config/policy.html#levelpolicyobject"},{default:n(()=>[o("本地策略")]),_:1}),o("。")]),e("p",null,[o("userLevel 的值, 对应 "),t(s,{to:"/config/policy.html#policyobject"},{default:n(()=>[o("policy")]),_:1}),o(" 中 "),y,o(" 的值。 如不指定, 默认为 0。")]),f])}const x=p(r,[["render",U],["__file","freedom.html.vue"]]);export{x as default};
