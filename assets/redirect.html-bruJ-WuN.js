import{_ as o,r as e,o as l,c as i,a,b as s,d as n,e as c}from"./app-p0cIJR_X.js";const u={},r=s("h1",{id:"基于-fwmark-或-sendthrough-的流量重定向",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#基于-fwmark-或-sendthrough-的流量重定向"},[s("span",null,"基于 fwmark 或 sendThrough 的流量重定向")])],-1),d=c(`<p>通过 Xray 将特定的流量指向特定出口，实现全局路由“分流”</p><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><p>之前在网络上看到许多代理或者 VPN 会接管全局路由，如果与 Xray 同时安装，会导致 Xray 失效。参考了网络上许多教程，及时分流，也是通过维护一张或者多张 CIDR 路由表来实现的。这种情况下并不优雅，如果我想可以任意替换，实现按需分流，那有没有更好的办法呢？有！</p><p>通过 fwmark 或 Xray 的 sendThrough/sockopt.interface，再简单配合路由表功能即可实现：</p><ol><li>Xray 可设置指定的 Tag、域名等走指定接口。如果您的接口是双栈的，可以指定 IPV4 或者 IPV6</li><li>其余用户则走原 IPV4 或者 IPV6</li></ol><p>具体设置如下（以 Debian10 为例）：</p><h2 id="_1、安装代理或者-vpn-软件-例如-wireguard、ipsec-等" tabindex="-1"><a class="header-anchor" href="#_1、安装代理或者-vpn-软件-例如-wireguard、ipsec-等"><span>1、安装代理或者 VPN 软件（例如 Wireguard、IPsec 等）</span></a></h2><p>根据不同系统和不同软件，请参考官方安装方法</p><h2 id="_2、编辑-vpn-配置文件-以-wireguard-为例" tabindex="-1"><a class="header-anchor" href="#_2、编辑-vpn-配置文件-以-wireguard-为例"><span>2、编辑 VPN 配置文件（以 WireGuard 为例）</span></a></h2><p>原始文件：</p><div class="language-ini line-numbers-mode" data-ext="ini" data-title="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Interface</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">PrivateKey</span> <span class="token punctuation">=</span> <span class="token value attr-value">&lt;PriKey&gt;</span>
<span class="token key attr-name">Address</span> <span class="token punctuation">=</span> <span class="token value attr-value">&lt;IPv4&gt;</span>
<span class="token key attr-name">Address</span> <span class="token punctuation">=</span> <span class="token value attr-value">&lt;IPv6&gt;</span>
<span class="token key attr-name">DNS</span> <span class="token punctuation">=</span> <span class="token value attr-value">8.8.8.8</span>
<span class="token key attr-name">MTU</span> <span class="token punctuation">=</span> <span class="token value attr-value">1280</span>
<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Peer</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">PublicKey</span> <span class="token punctuation">=</span> <span class="token value attr-value">&lt;Pubkey&gt;</span>
<span class="token key attr-name">AllowedIPs</span> <span class="token punctuation">=</span> <span class="token value attr-value">::/0</span>
<span class="token key attr-name">AllowedIPs</span> <span class="token punctuation">=</span> <span class="token value attr-value">0.0.0.0/0</span>
<span class="token key attr-name">Endpoint</span> <span class="token punctuation">=</span> <span class="token value attr-value">&lt;EndpointIP&gt;:&lt;Port&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code>[Interface]</code> 下添加如下命令：</p><div class="language-ini line-numbers-mode" data-ext="ini" data-title="ini"><pre class="language-ini"><code><span class="token key attr-name">Table</span> <span class="token punctuation">=</span> <span class="token value attr-value">&lt;table&gt;</span>
<span class="token comment">### fwmark</span>
<span class="token key attr-name">PostUP</span> <span class="token punctuation">=</span> <span class="token value attr-value">ip rule add fwmark &lt;mark&gt; lookup &lt;table&gt;</span>
<span class="token key attr-name">PostDown</span> <span class="token punctuation">=</span> <span class="token value attr-value">ip rule del fwmark &lt;mark&gt; lookup &lt;table&gt;</span>
<span class="token key attr-name">PostUP</span> <span class="token punctuation">=</span> <span class="token value attr-value">ip -6 rule add fwmark &lt;mark&gt; lookup &lt;table&gt;</span>
<span class="token key attr-name">PostDown</span> <span class="token punctuation">=</span> <span class="token value attr-value">ip -6 rule del fwmark &lt;mark&gt; lookup &lt;table&gt;</span>
<span class="token comment">## sendThrough</span>
<span class="token key attr-name">PreUp</span> <span class="token punctuation">=</span> <span class="token value attr-value">ip rule add from &lt;IPv4&gt; lookup &lt;table&gt;</span>
<span class="token key attr-name">PostDown</span> <span class="token punctuation">=</span> <span class="token value attr-value">ip rule del from &lt;IPv4&gt; lookup &lt;table&gt;</span>
<span class="token key attr-name">PreUp</span> <span class="token punctuation">=</span> <span class="token value attr-value">ip -6 rule add from &lt;IPv6&gt; lookup &lt;table&gt;</span>
<span class="token key attr-name">PostDown</span> <span class="token punctuation">=</span> <span class="token value attr-value">ip -6 rule del from &lt;IPv6&gt; lookup &lt;table&gt;</span>
<span class="token comment">## sockopt.interface</span>
<span class="token key attr-name">PreUp</span> <span class="token punctuation">=</span> <span class="token value attr-value">ip rule add oif %i lookup &lt;table&gt;</span>
<span class="token key attr-name">PostDown</span> <span class="token punctuation">=</span> <span class="token value attr-value">ip rule del oif %i lookup &lt;table&gt;</span>
<span class="token key attr-name">PreUp</span> <span class="token punctuation">=</span> <span class="token value attr-value">ip -6 rule add oif %i lookup &lt;table&gt;</span>
<span class="token key attr-name">PostDown</span> <span class="token punctuation">=</span> <span class="token value attr-value">ip -6 rule del oif %i lookup &lt;table&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p><ul><li>此配置文件融合了 <code>fwmark</code> / <code>sendThrough</code> / <code>sockopt.interface</code>，表示</li><li>送入此设备 <code>%i</code> 的连接 / 送入此 <code>&lt;IPv4/6&gt;</code> 的连接 / <code>fwmark</code> 被标记为 <code>&lt;mark&gt;</code> 的连接</li><li>将会使用 wireguard 进行转发</li><li><code>%i</code> 是 wireguard 配置文件中的占位符，表示在启动时替换为这个设备的名称</li></ul></div><p>保存</p><p>可顺手安装</p><div class="custom-container warning"><p class="custom-container-title">注意</p><p>如果使用了 <code>[Interface]</code> 中的 <code>DNS</code> 字段，这个程序将会是必须的</p></div><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">apt</span> <span class="token function">install</span> openresolv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3、启用-wireguard-网络接口" tabindex="-1"><a class="header-anchor" href="#_3、启用-wireguard-网络接口"><span>3、启用 WireGuard 网络接口</span></a></h2><p>加载内核模块</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>modprobe wireguard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>检查 WG 模块加载是否正常</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>lsmod <span class="token operator">|</span> <span class="token function">grep</span> wireguard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4、xray-core-配置文件修改" tabindex="-1"><a class="header-anchor" href="#_4、xray-core-配置文件修改"><span>4、Xray-core 配置文件修改</span></a></h2><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;api&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;services&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;HandlerService&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;LoggerService&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;StatsService&quot;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;api&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;inbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;listen&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> &lt;port&gt;<span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dokodemo-door&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;api&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;outbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;freedom&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;domainStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UseIPv4&quot;</span>
      <span class="token punctuation">}</span>
      <span class="token comment">//修改此处，可v4或者v6</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">//            &lt;--请在不同的方案中选择--&gt;   方案1：fwmark</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;freedom&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wg0&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;sockopt&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;mark&quot;</span><span class="token operator">:</span> <span class="token comment">// &lt;mark&gt;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;domainStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UseIPv6&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>  <span class="token comment">//设置fwmark为&lt;mark&gt;的用户走指定方式”UseIPv6””UseIPv4”</span>
    <span class="token comment">//            &lt;--请在不同的方案中选择--&gt;   方案2：sendThrough</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wg0&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;freedom&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;sendThrough&quot;</span><span class="token operator">:</span> <span class="token string">&quot;your wg0 v4 address&quot;</span><span class="token punctuation">,</span>
      <span class="token comment">//修改此处，可v4或者v6</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;domainStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UseIPv4&quot;</span>
      <span class="token punctuation">}</span>
      <span class="token comment">//修改此处，可v4或者v6</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">//            &lt;--请在不同的方案中选择--&gt;   方案3：sockopt.interface</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wg0&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;freedom&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;domainStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UseIPv4&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;sockopt&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;interface&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wg0&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">//            &lt;--请在不同的方案中选择--&gt;   结束</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;blackhole&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;blocked&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;policy&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;system&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;statsInboundDownlink&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token property">&quot;statsInboundUplink&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;routing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;api&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;api&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wg0&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;inboundTag&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;&lt;inboundTag&gt;&quot;</span>
          <span class="token comment">//需要之前在 inbound 中指定好 Tag，这里是 api 生成的,还可以添加域名等等</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;outboundTag&quot;</span><span class="token operator">:</span> <span class="token string">&quot;blocked&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;bittorrent&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;field&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;stats&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p><p>可以通过修改 &quot;domainStrategy&quot;: &quot;UseIPv6&quot;来控制对应用户的访问方式 实测优先级要高于系统本身的 gai.config</p></div><h2 id="_5、系统设置配置" tabindex="-1"><a class="header-anchor" href="#_5、系统设置配置"><span>5、系统设置配置</span></a></h2><div class="custom-container tip"><p class="custom-container-title">提示</p><p>需要打开系统的 ip_forward <code>sysctl -w net.ipv4.ip_forward=1</code><code>sysctl -w net.ipv6.conf.all.forwarding=1</code></p></div><h2 id="_6、完成-wireguard-相关设置" tabindex="-1"><a class="header-anchor" href="#_6、完成-wireguard-相关设置"><span>6、完成 WireGuard 相关设置</span></a></h2><p>开启隧道</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>wg-quick up wg0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>开机自启</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> wg-quick@wg0
systemctl start wg-quick@wg0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>验证 IPv4/IPv6</p><blockquote><p>在代理上 运行 <code>curl ip-api.com -4/-6</code> / 浏览器访问ip-api.com</p></blockquote><h2 id="后记" tabindex="-1"><a class="header-anchor" href="#后记"><span>后记</span></a></h2><p>本文本意是可以避免的多余的流量浪费，将路由和分流的功能交给 Xray 处理。避免了维护路由表的繁琐工作。顺便技术提升 UP。</p><h2 id="感谢" tabindex="-1"><a class="header-anchor" href="#感谢"><span>感谢</span></a></h2>`,38),k={href:"https://github.com/XTLS/Xray-core",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/v2fly/v2ray-core",target:"_blank",rel:"noopener noreferrer"},m={href:"https://www.wireguard.com/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://p3terx.com/",target:"_blank",rel:"noopener noreferrer"};function q(g,h){const p=e("I18nTip"),t=e("ExternalLinkIcon");return l(),i("div",null,[r,a(p),d,s("p",null,[s("a",k,[n("XTLS/Xray-core"),a(t)]),n("; "),s("a",v,[n("v2fly/v2ray-core"),a(t)]),n("; "),s("a",m,[n("WireGuard"),a(t)]),n("; "),s("a",b,[n("@p3terx"),a(t)]),n("; @w; @Hiram; @Luminous; @Ln; @JackChou;")])])}const f=o(u,[["render",q],["__file","redirect.html.vue"]]);export{f as default};
