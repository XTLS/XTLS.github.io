import{_ as s,r as d,o as l,c as u,a as t,b as n,d as o,e as i}from"./app-hnbUM0bL.js";const v={},a=i('<h1 id="客户端服务端构建-nginx-隧道隐藏指纹" tabindex="-1"><a class="header-anchor" href="#客户端服务端构建-nginx-隧道隐藏指纹"><span>客户端服务端构建 Nginx 隧道隐藏指纹</span></a></h1><p>网路结构：</p><p>xray_client ---tcp--- nginx_client ---tcp_TLS--- nginx_sever ---tcp--- xray_server</p><h2 id="编译-nginx-with-stream" tabindex="-1"><a class="header-anchor" href="#编译-nginx-with-stream"><span>编译 nginx --with-stream</span></a></h2><p>在客户端及服务端均编译</p><p><code>curl -O -L http://nginx.org/download/nginx-1.22.1.tar.gz</code></p><p><code>tar -zxvf nginx-1.22.1.tar.gz</code></p><p><code>cd nginx-1.22.1</code></p><p><code>apt install gcc make</code> //编译依赖 gcc 以及 make</p><p><code>./configure --prefix=/usr/local/nginx --with-http_ssl_module --with-http_v2_module --with-stream --with-stream_ssl_module</code> //此步需要依赖一些库，根据报错安装相应 lib</p><p><code>make &amp;&amp; make install</code></p><p>编译之后 nginx 文件夹位于 <code>/usr/local/nginx</code></p><h2 id="配置-nginx" tabindex="-1"><a class="header-anchor" href="#配置-nginx"><span>配置 nginx</span></a></h2><p>编辑 nginx 配置文件 nginx.conf</p><p><code>vim /usr/local/nginx/conf/nginx.conf</code></p><p>服务端加入如下配置</p>',16),r={href:"https://xtls.github.io/document/level-0/ch06-certificates.html",target:"_blank",rel:"noopener noreferrer"},c=i(`<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>stream {
    server {
        listen 443 ssl;
        listen [::]:443 ssl;
        ssl_protocols TLSv1.3;
        ssl_certificate /path/to/cert/domain.crt; #crt文件位置
        ssl_certificate_key /path/to/cert/domain.key; #key文件位置
        proxy_pass unix:/dev/shm/vless.sock; #使用 domain socket
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">注意</p><p>stream 部分与 http 模块并列，客户端可删除 http 部分，服务端可删除或搭建网页伪装回落</p></div><p>客户端加入如下配置</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>stream {
    server {
        listen 6666;
        listen [::]:6666;
        proxy_ssl on;
        proxy_ssl_protocols TLSv1.3;
        proxy_ssl_server_name on;
        proxy_ssl_name yourdomain.domain; #服务器域名
        proxy_pass ip:443; #服务器 ip 形如 proxy_pass 6.6.6.6:443; 或 proxy_pass [2401:0:0::1]:443;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code>/etc/systemd/system</code> 文件夹中创建 <code>nginx.service</code> 文件</p><p><code>vim /etc/systemd/system/nginx.service</code></p><p>写入如下</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[Unit]
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加入开机自启</p><p><code>systemctl enable nginx</code></p><h2 id="xray-配置" tabindex="-1"><a class="header-anchor" href="#xray-配置"><span>xray 配置</span></a></h2><p>服务端 xray 配置</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
	&quot;log&quot;: {
		&quot;loglevel&quot;: &quot;none&quot;
	},
	&quot;inbounds&quot;: [
		{
			&quot;listen&quot;: &quot;/dev/shm/vless.sock,0666&quot;,
			&quot;protocol&quot;: &quot;vless&quot;,
			&quot;settings&quot;: {
				&quot;clients&quot;: [
					{
						&quot;id&quot;: &quot;uuid&quot;
					}
				],
				&quot;decryption&quot;: &quot;none&quot;
			},
			&quot;streamSettings&quot;: {
				&quot;network&quot;: &quot;tcp&quot;
			},
			&quot;sniffing&quot;: {
				&quot;enabled&quot;: true,
				&quot;destOverride&quot;: [
					&quot;http&quot;,
					&quot;tls&quot;
				]
			}
		}
	],
	&quot;outbounds&quot;: [
		{
			&quot;protocol&quot;: &quot;freedom&quot;
		}
	]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>客户端 xray 配置，此处以旁路由透明代理为例</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
	&quot;log&quot;: {
		&quot;loglevel&quot;: &quot;none&quot;
	},
	&quot;inbounds&quot;: [
		{
			&quot;tag&quot;: &quot;tproxy-in&quot;,
			&quot;port&quot;: 12345,
			&quot;protocol&quot;: &quot;dokodemo-door&quot;,
			&quot;settings&quot;: {
				&quot;network&quot;: &quot;tcp,udp&quot;,
				&quot;followRedirect&quot;: true
			},
			&quot;sniffing&quot;: {
				&quot;enabled&quot;: true,
				&quot;destOverride&quot;: [
					&quot;http&quot;,
					&quot;tls&quot;
				],
				&quot;routeOnly&quot;: true
			},
			&quot;streamSettings&quot;: {
				&quot;sockopt&quot;: {
					&quot;tproxy&quot;: &quot;tproxy&quot;,
					&quot;mark&quot;: 255
				}
			}
		},
		{
			&quot;tag&quot;: &quot;http&quot;,
			&quot;port&quot;: 10808,
			&quot;listen&quot;: &quot;127.0.0.1&quot;,
			&quot;protocol&quot;: &quot;http&quot;,
			&quot;sniffing&quot;: {
				&quot;enabled&quot;: true,
				&quot;destOverride&quot;: [
					&quot;http&quot;,
					&quot;tls&quot;
				]
			}
		}
	],
	&quot;outbounds&quot;: [
		{
			&quot;tag&quot;: &quot;nginxtls&quot;,
			&quot;protocol&quot;: &quot;vless&quot;,
			&quot;settings&quot;: {
				&quot;vnext&quot;: [
					{
						&quot;address&quot;: &quot;127.0.0.1&quot;,
						&quot;port&quot;: 6666,
						&quot;users&quot;: [
							{
								&quot;id&quot;: &quot;uuid&quot;,
								&quot;encryption&quot;: &quot;none&quot;
							}
						]
					}
				]
			},
			&quot;streamSettings&quot;: {
				&quot;sockopt&quot;: {
					&quot;mark&quot;: 255
				},
				&quot;network&quot;: &quot;tcp&quot;
			}
		},
		{
			&quot;tag&quot;: &quot;direct&quot;,
			&quot;protocol&quot;: &quot;freedom&quot;,
			&quot;streamSettings&quot;: {
				&quot;sockopt&quot;: {
					&quot;mark&quot;: 255
				}
			}
		},
		{
			&quot;tag&quot;: &quot;block&quot;,
			&quot;protocol&quot;: &quot;blackhole&quot;,
			&quot;settings&quot;: {
				&quot;response&quot;: {
					&quot;type&quot;: &quot;http&quot;
				}
			}
		}
	],
	&quot;routing&quot;: {
		&quot;domainMatcher&quot;: &quot;mph&quot;,
		&quot;domainStrategy&quot;: &quot;AsIs&quot;,
		&quot;rules&quot;: [
			{
				&quot;type&quot;: &quot;field&quot;,
				&quot;domain&quot;: [
					&quot;geosite:category-ads-all&quot;
				],
				&quot;outboundTag&quot;: &quot;block&quot;
			},
			{
				&quot;type&quot;: &quot;field&quot;,
				&quot;port&quot;: 123,
				&quot;network&quot;: &quot;udp&quot;,
				&quot;outboundTag&quot;: &quot;direct&quot;
			},
			{
				&quot;type&quot;: &quot;field&quot;,
				&quot;domain&quot;: [
					&quot;geosite:cn&quot;
				],
				&quot;outboundTag&quot;: &quot;direct&quot;
			},
			{
				&quot;type&quot;: &quot;field&quot;,
				&quot;protocol&quot;: [
					&quot;bittorrent&quot;
				],
				&quot;outboundTag&quot;: &quot;direct&quot;
			},
			{
				&quot;type&quot;: &quot;field&quot;,
				&quot;ip&quot;: [
					&quot;geoip:private&quot;
				],
				&quot;outboundTag&quot;: &quot;direct&quot;
			},
			{
				&quot;type&quot;: &quot;field&quot;,
				&quot;inboundTag&quot;: [
					&quot;tproxy-in&quot;
				],
				&quot;outboundTag&quot;: &quot;nginxtls&quot;
			}
		]
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果使用透明代理需要在 iptables 或 ip6tables 配置中加入</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>iptables -t mangle -A XRAY_MASK -d VSP_IPv4/32 -j RETURN
ip6tables -t mangle -A XRAY6_MASK -d VPS_IPv6/128 -j RETURN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="客户端及服务端启动服务" tabindex="-1"><a class="header-anchor" href="#客户端及服务端启动服务"><span>客户端及服务端启动服务</span></a></h2><p><code>systemctl restart xray</code></p><p><code>systemctl restart nginx</code></p><h2 id="后记" tabindex="-1"><a class="header-anchor" href="#后记"><span>后记</span></a></h2><p>客户端应该也是可以通过 domain socket 连接提高性能，但由于 xray outbound 不支持 ds 出站，想了半天没什么好的实现方法。如果 vnext 里支持 ds 就好了 (没有别的意思)。</p><p>从客户端 nginx 开始应该可以选择 http2 grpc ws 等传输方式。</p>`,23);function m(q,b){const e=d("ExternalLinkIcon");return l(),u("div",null,[a,t("p",null,[n("服务器申请证书不再赘述，参考"),t("a",r,[n("白话文"),o(e)])]),c])}const g=s(v,[["render",m],["__file","nginx_tls_tunnel.html.vue"]]);export{g as default};
