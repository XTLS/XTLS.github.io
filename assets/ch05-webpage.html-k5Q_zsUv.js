import{_ as n,o as a,c as s,e as t}from"./app-wQRuU64c.js";const e="/assets/ch05-img01-nginx-default-running-gZQeEn-L.png",p="/assets/ch05-img02-nginx-conf-full-v03jv5Nl.gif",l="/assets/ch05-img03-nginx-http-running-pMqjJEDb.png",c={},i=t(`<h1 id="【第-5-章】网站建设篇" tabindex="-1"><a class="header-anchor" href="#【第-5-章】网站建设篇"><span>【第 5 章】网站建设篇</span></a></h1><h2 id="_5-1-为什么要做一个网站" tabindex="-1"><a class="header-anchor" href="#_5-1-为什么要做一个网站"><span>5.1 为什么要做一个网站？</span></a></h2><p>新人也许会迷惑，为什么科学上网还要建一个网站？我不会编程啊，是不是特别麻烦？</p><p>先回答第一个问题，建网站的原因有：</p><ol><li>申请合法的 TLS 证书（非常重要）</li><li>提供合理的回落，防止主动探测攻击，提高安全性</li><li>建设一个伪装站（如博客、私人网盘、多媒体网站、游戏网站等），直接访问时有合理的前台，使流量使用看上去更合理。</li></ol><p>再回答第二个问题：</p><ol><li>本文作为演示，仅仅使用了一个最简单的【单文件 html 页面 + Nginx】来搭建，以此完成上面的目标，所以【非常简单】</li><li>这个网站完全可以不仅仅是伪装，而是真的做大做强，这个复杂性就完全取决于你了</li><li>对于“伪装”和“网站运营”这个目标，需要的就是各不相同、秀出真我，需要的同学可以自行搜索学习。这个内容已经完全偏离了科学上网，本文就不深入解析了。</li></ol><h2 id="_5-2-登录-vps、安装运行-nginx" tabindex="-1"><a class="header-anchor" href="#_5-2-登录-vps、安装运行-nginx"><span>5.2 登录 VPS、安装运行 Nginx</span></a></h2><ol><li><p>这里用到的，都是之前已经详解过的命令，所以就不重复讲解了。看不懂的同学可以看看前面的章节哦。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> update <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>完成后，Nginx 已经自动运行。此时打开 Windows 上的浏览器并输入 <code>http://100.200.300.400:80</code>，若看到下图的界面就说明 Nginx 已经正常在运行了。</p><p><img src="`+e+`" alt="Nginx默认界面"></p></li><li><p>如果无法看到上述Nginx默认页面，可能是需要配置Debian系统上默认的防火墙组件Uncomplicated Firewall (UFW)，以便启用 HTTP (80) 和 HTTPS (443) 端口流量。</p><p>a. 验证方法，输入：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> ufw status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>b. 如果输出如下，表明80和433端口未开启，需要执行c步骤</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>Status: active
To                         Action      From
--                         ------      ----
<span class="token number">22</span>/tcp                     ALLOW       Anywhere
<span class="token number">22</span>/tcp <span class="token punctuation">(</span>v6<span class="token punctuation">)</span>                ALLOW       Anywhere <span class="token punctuation">(</span>v6<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>c. 启用UFW的Nginx 80 和 443 端口命令</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> ufw allow <span class="token string">&#39;Nginx Full&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>d. 输入a中命令再次验证，如果输出如下，表示Nginx流量已经被防火墙放行，这样就应该可以看到前述第2点中的Nginx默认页面。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>Status: active
To                         Action      From
--                         ------      ----
<span class="token number">22</span>/tcp                     ALLOW       Anywhere
Nginx Full                 ALLOW       Anywhere
<span class="token number">22</span>/tcp <span class="token punctuation">(</span>v6<span class="token punctuation">)</span>                ALLOW       Anywhere <span class="token punctuation">(</span>v6<span class="token punctuation">)</span>
Nginx Full <span class="token punctuation">(</span>v6<span class="token punctuation">)</span>            ALLOW       Anywhere <span class="token punctuation">(</span>v6<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="_5-3-创建一个最简单的网页" tabindex="-1"><a class="header-anchor" href="#_5-3-创建一个最简单的网页"><span>5.3 创建一个最简单的网页</span></a></h2><ol><li><p>小小白白 Linux 基础命令：</p><table><thead><tr><th style="text-align:center;">编号</th><th style="text-align:center;">命令名称</th><th style="text-align:center;">命令说明</th></tr></thead><tbody><tr><td style="text-align:center;"><code>cmd-10</code></td><td style="text-align:center;"><code>mkdir</code></td><td style="text-align:center;">新建文件夹</td></tr><tr><td style="text-align:center;"><code>cmd-11</code></td><td style="text-align:center;"><code>systemctl reload</code></td><td style="text-align:center;">重新加载某个服务</td></tr></tbody></table></li><li><p>小小白白 Linux 基础配置文件：</p><table><thead><tr><th style="text-align:center;">编号</th><th style="text-align:center;">配置文件位置</th><th style="text-align:center;">文件说明</th></tr></thead><tbody><tr><td style="text-align:center;"><code>conf-02</code></td><td style="text-align:center;"><code>/etc/nginx/nginx.conf</code></td><td style="text-align:center;">Nginx 程序设置</td></tr></tbody></table></li><li><p>创建一个网站专用的文件夹<code>/home/vpsadmin/www/webpage/</code>并建立网页文件<code>index.html</code></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ~/www/webpage/ <span class="token operator">&amp;&amp;</span> <span class="token function">nano</span> ~/www/webpage/index.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><div class="custom-container warning"><p class="custom-container-title">注意</p><p>如果你用的不是 <code>vpsadmin</code> 这个用户名，请务必理解这条命令中 <code>“~”</code> 符号的意义（这关系到【第 5 步】你要写的内容）：</p><ul><li>如果是 【非 <code>root</code> 用户】，<code>“~”</code> 就等价于 <code>/home/用户名</code></li><li>如果是 【 <code>root</code> 用户】，<code>“~”</code> 就等价于 <code>/root</code></li></ul></div><ol start="4"><li><p>把下面的内容完整的复制进去，然后保存(<code>ctrl+o</code>)退出(<code>ctrl+x</code>)</p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token comment">&lt;!-- Text between angle brackets is an HTML tag and is not displayed.
        Most tags, such as the HTML and /HTML tags that surround the contents of
        a page, come in pairs; some tags, like HR, for a horizontal rule, stand
        alone. Comments, such as the text you&#39;re reading, are not displayed when
        the Web page is shown. The information between the HEAD and /HEAD tags is
        not displayed. The information between the BODY and /BODY tags is displayed.--&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Enter a title, displayed at the top of the window.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
  <span class="token comment">&lt;!-- The information between the BODY and /BODY tags is displayed.--&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>Enter the main heading, usually the same as the title.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Be <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>b</span><span class="token punctuation">&gt;</span></span>bold<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>b</span><span class="token punctuation">&gt;</span></span> in stating your key points. Put them in a list:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>The first item in your list<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>The second item; <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span><span class="token punctuation">&gt;</span></span>italicize<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">&gt;</span></span> key words<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Improve your image by including an image.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://i.imgur.com/SEBww.jpg<span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>A Great HTML Resource<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
      Add a link to your favorite
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://www.dummies.com/<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Web site<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>. Break up your page
      with a horizontal rule or two.
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>hr</span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
      Finally, link to <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>page2.html<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>another page<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span> in your own Web
      site.
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- And add a copyright notice.--&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span><span class="token entity" title="©">&amp;#169;</span> Wiley Publishing, 2011<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>赋予其他用户读取该文件的权限</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">chmod</span> <span class="token parameter variable">-R</span> a+r <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>修改 <code>nginx.conf</code> 并重启 <code>Nginx</code> 服务，将<code>80</code>端口的 http 访问定位到刚才建立的 <code>html</code> 页面上</p><ol><li><p>修改 <code>nginx.conf</code> 。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">nano</span> /etc/nginx/nginx.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>将下面一段，添加在 <code>http{}</code> 内，然后保存(<code>ctrl+o</code>)退出(<code>ctrl+x</code>)。（记得将域名替换为之前准备好的、包含二级域名的真实域名）</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>        server {
                listen 80;
                server_name 二级域名.你的域名.com;
                root /home/vpsadmin/www/webpage;
                index index.html;
        }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">特别注意！</p><p>如我在【第 3 步】中的提示所说，请务必确保 <code>/home/vpsadmin/www/webpage</code> 改成你的实际文件路径。</p></div></li><li><p>让 <code>nginx</code> 重新载入配置使其生效</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl reload nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>完整的设置流程如下：</p><p><img src="`+p+'" alt="网页设置演示"></p></li><li><p>此时如果你访问 <code>http://二级域名.你的域名.com</code>，你看到这样的页面则说明成功：</p><p><img src="'+l+'" alt="http网页成功"></p></li></ol></li></ol><h2 id="_5-4-常见错误的说明" tabindex="-1"><a class="header-anchor" href="#_5-4-常见错误的说明"><span>5.4 常见错误的说明</span></a></h2><p>首先，如果你一路按照文章的说明来操作，并且足够细心，那肯定不会出错。所以，我并不打算修改本文的写法。</p><p>那为什么依然有很多同学卡在了这一步，网页怎么也打不开呢？基本上就是两个字：<strong>粗心</strong>。因为这里配置可能出现的问题只有两种，原因也只有两个。</p><p>一、两种问题：</p><ul><li><code>nginx.conf</code> 里面的 <code>/home/vpsadmin/www/webpage</code> 这一条，与你的实际文件路径不符，<code>nginx</code> 找不到文件</li><li>路径正确，但 <code>nginx</code> 无权读取</li></ul><p>二、两个原因：</p><ul><li>使用了【非 <code>root</code> 用户】，但仍然直接拷贝文中的命令不加修改。（这基本就等于抄答案时把同学的名字一起抄过去了）</li><li>坚持使用【 <code>root</code> 用户】</li></ul><p>碰到错误的同学，就回过头仔细看一下【5.3】中【第 3 步】和【第 5-2 步】的说明吧。</p><div class="custom-container warning"><p class="custom-container-title">注意</p><p>本文前期已经用了大量篇幅说明了使用【非 <code>root</code> 用户】对安全的重要性，全文也是基于此而写。所以，因使用【 <code>root</code> 用户】而导致的问题并不在本文的设计范围里。</p><p>但我相信，坚持使用【 <code>root</code> 用户】的同学应该是有主见、动手能力强、或者有一定 Linux 基础的同学。问题的症结我已经全部说明了，我相信你一定可以自行解决。</p></div><h2 id="_5-5-你的进度" tabindex="-1"><a class="header-anchor" href="#_5-5-你的进度"><span>5.5 你的进度</span></a></h2><p>至此，Xray 的第一个基础设施【网页】已经就位，我们马上就进入第二个基础设施【证书】吧！</p><blockquote><p>⬛⬛⬛⬛⬛⬜⬜⬜ 62.5%</p></blockquote>',25),o=[i];function d(u,r){return a(),s("div",null,o)}const k=n(c,[["render",d],["__file","ch05-webpage.html.vue"]]);export{k as default};