import{_ as t,r as e,o as r,c as v,a as n,b as i,d as s,e as l}from"./app-C7nrd4xQ.js";const u={},c=l('<p>Nginx 或 Haproxy 实现的 HTTPS 隧道、HTTP/2 over HTTPS 隧道、WebSocket over HTTP/2 over HTTPS 隧道、gRPC over HTTP/2 over HTTPS 隧道以及自签证书双端认证的 gRPC over HTTP/2 over HTTPS 隧道</p><h1 id="客户端服务端-nginx-构建-https-隧道隐藏指纹" tabindex="-1"><a class="header-anchor" href="#客户端服务端-nginx-构建-https-隧道隐藏指纹"><span>客户端服务端 Nginx 构建 HTTPS 隧道隐藏指纹</span></a></h1><p>网路结构：</p><p>xray_client ---tcp--- nginx_client ---HTTPS--- nginx_sever ---tcp--- xray_server</p><h2 id="编译-nginx-with-stream" tabindex="-1"><a class="header-anchor" href="#编译-nginx-with-stream"><span>编译 nginx --with-stream</span></a></h2><p>在客户端及服务端均编译</p><p><code>curl -O -L http://nginx.org/download/nginx-1.22.1.tar.gz</code></p><p><code>tar -zxvf nginx-1.22.1.tar.gz</code></p><p><code>cd nginx-1.22.1</code></p><p><code>apt install gcc make</code> //编译依赖 gcc 以及 make</p><p><code>./configure --prefix=/usr/local/nginx --with-http_ssl_module --with-http_v2_module --with-stream --with-stream_ssl_module</code> //此步需要依赖一些库，根据报错安装相应 lib</p><p><code>make &amp;&amp; make install</code></p><p>编译之后 nginx 文件夹位于 <code>/usr/local/nginx</code></p><h2 id="配置-nginx" tabindex="-1"><a class="header-anchor" href="#配置-nginx"><span>配置 nginx</span></a></h2><p>编辑 nginx 配置文件 nginx.conf</p><p><code>vim /usr/local/nginx/conf/nginx.conf</code></p><p>服务端加入如下配置</p>',17),o={href:"https://xtls.github.io/document/level-0/ch06-certificates.html",target:"_blank",rel:"noopener noreferrer"},m=l(`<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>stream {
    server {
        listen 443 ssl;
        listen [::]:443 ssl;
        ssl_protocols TLSv1.3;
        ssl_certificate /path/to/cert/domain.crt; # crt 文件位置
        ssl_certificate_key /path/to/cert/domain.key; # key 文件位置
        proxy_pass unix:/dev/shm/vless.sock; # 使用 domain socket
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">注意</p><p>stream 部分与 http 模块并列，客户端可删除 http 部分，服务端可删除或搭建网页伪装回落</p></div><p>客户端加入如下配置</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>stream {
    server {
        listen 6666;
        listen [::]:6666;
        proxy_ssl on;
        proxy_ssl_protocols TLSv1.3;
        proxy_ssl_server_name on;
        proxy_ssl_name yourdomain.domain; # 服务器域名
        proxy_pass ip:443; # 服务器 ip 形如 proxy_pass 6.6.6.6:443; 或 proxy_pass [2401:0:0::1]:443;
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
    &quot;dns&quot;: {
        &quot;servers&quot;: [
            &quot;1.1.1.1&quot;,
            {
                &quot;address&quot;: &quot;119.29.29.29&quot;,
                &quot;domains&quot;: [
                    &quot;geosite:cn&quot;
                ],
                &quot;expectIP&quot;: [
                    &quot;geoip:cn&quot;
                ]
            }
        ],
        &quot;disableFallback&quot;: true,
        &quot;disableFallbackIfMatch&quot;: true
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
                ]
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
                &quot;ip&quot;: [
                    &quot;1.1.1.1&quot;
                ],
                &quot;outboundTag&quot;: &quot;proxy&quot;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果使用透明代理需要在 iptables 或 ip6tables 配置中加入</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code># 设置策略路由 v4
ip rule add fwmark 1 table 100
ip route add local 0.0.0.0/0 dev lo table 100

# 设置策略路由 v6
ip -6 rule add fwmark 1 table 106
ip -6 route add local ::/0 dev lo table 106

# VPS IP 直连
iptables -t mangle -A XRAY_MASK -d VSP_IPv4/32 -j RETURN
ip6tables -t mangle -A XRAY6_MASK -d VPS_IPv6/128 -j RETURN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="客户端及服务端启动服务" tabindex="-1"><a class="header-anchor" href="#客户端及服务端启动服务"><span>客户端及服务端启动服务</span></a></h2><p><code>systemctl restart xray</code></p><p><code>systemctl restart nginx</code></p><h2 id="结束" tabindex="-1"><a class="header-anchor" href="#结束"><span>结束</span></a></h2><h1 id="双端-haproxy-构建-https-隧道隐藏指纹" tabindex="-1"><a class="header-anchor" href="#双端-haproxy-构建-https-隧道隐藏指纹"><span>双端 Haproxy 构建 HTTPS 隧道隐藏指纹</span></a></h1><p>安装 Haproxy</p><p><code>pacman -Su haproxy</code> 或 <code>apt install haproxy</code></p><p>Haproxy 处理 ssl 需要 openssl 支持，检查 openssl 版本，必要时安装或更新</p><h2 id="https-隧道" tabindex="-1"><a class="header-anchor" href="#https-隧道"><span>HTTPS 隧道</span></a></h2><p>前述 Nginx HTTPS 隧道 Hproxy 同样可以简单做到</p><p>网路结构：</p><p>xray_client ---tcp--- haproxy_client ---HTTPS--- haproxy_sever ---tcp--- xray_server</p><h3 id="haproxy-client-配置-运行前去掉注释" tabindex="-1"><a class="header-anchor" href="#haproxy-client-配置-运行前去掉注释"><span>haproxy_client 配置 (运行前去掉注释)</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>global
    log /dev/log local0 alert
    log /dev/log local1 alert
    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners
    stats timeout 30s
    user root
    group root
    daemon

    # 隧道强制使用 TLS 1.3
    ssl-default-server-options ssl-min-ver TLSv1.3

defaults
    log global
    mode tcp
    timeout connect 5s
    timeout client  300s
    timeout server  300s

frontend xray
    bind 127.0.0.1:6666 # 监听本机 6666 端口
    default_backend tunnel

backend tunnel
    server tunnel www.example.com:443 ssl verify none sni req.hdr(host) alpn h2,http/1.1
    # 域名或 IP 均可以，若填域名建议在 hosts 中指定 IP 降低解析时间；alpn 与服务器协商，服务器端为 alpn h2,http1.1 时，客户端指定为 h2 则隧道为 HTTP2 方式连接，指定为 http1.1 为 HTTP 方式，双端均写优先 h2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="haproxy-server-配置-运行前去掉注释" tabindex="-1"><a class="header-anchor" href="#haproxy-server-配置-运行前去掉注释"><span>haproxy_server 配置 (运行前去掉注释)</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>global
    log /dev/log local0 alert
    log /dev/log local1 alert
    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners
    stats timeout 30s
    user root
    group root
    daemon

    # 指定安全套件并指定 ssl 版本最低 1.2 增加真实性
    ssl-default-bind-ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256
    ssl-default-bind-ciphersuites TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256
    ssl-default-bind-options ssl-min-ver TLSv1.2

defaults
    log global
    mode tcp
    timeout connect 5s
    timeout client  300s
    timeout server  300s

frontend tls-in
    bind :::443 ssl crt /path/to/pem alpn h2,http/1.1 # haproxy 使用 pem 进行 ssl 解密，pem 由 cat www.example.com.crt www.example.com.key &gt; www.example.com.pem 获得
    default_backend xray
    tcp-request inspect-delay 5s
    tcp-request content accept if HTTP
    use_backend web if HTTP

backend xray
    server xray /dev/shm/vless.sock # 支持 abstract 格式： &quot;abns@vless.sock&quot; ；loopback 方式：127.0.0.1:6666

backend web
    server web /dev/shm/h1h2c.sock # 回落到网页
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="xray-配置-1" tabindex="-1"><a class="header-anchor" href="#xray-配置-1"><span>xray 配置</span></a></h3><p>同上 nginx 部分：最简单的 TCP 配置，可搭配任意协议，建议使用 VLESS+TCP 无需多余加密，参考文档或其他示例</p><h2 id="websocket-over-http-2" tabindex="-1"><a class="header-anchor" href="#websocket-over-http-2"><span>WebSocket over HTTP/2</span></a></h2><p>Haproxy 支持 HTTP/2 的 h2c 进站及出站</p><p>然而援引 xray 文档 HTTP/2 的说明</p><p>“由 HTTP/2 的建议，客户端和服务器必须同时开启 TLS 才可以正常使用这个传输方式。...... 当前版本的 HTTP/2 的传输方式并不强制要求入站（服务端）有 TLS 配置。”</p><p>即入站可以使用 h2c，出站并不支持 h2c。因此无法使用 xray_client ---h2c--- haproxy_client ---HTTP/2+TLS--- haproxy_sever ---h2c--- xray_server</p><p>但是可以通过 ws 偷个鸡，Haproxy 支持 ws over HTTP/2</p><p>则网络结构：xray_client ---ws--- haproxy_client ---ws over HTTP/2 over HTTPS--- haproxy_sever ---ws--- xray_server</p><h3 id="haproxy-client-配置" tabindex="-1"><a class="header-anchor" href="#haproxy-client-配置"><span>haproxy_client 配置</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>global
    log /dev/log local0 alert
    log /dev/log local1 alert
    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners
    stats timeout 30s
    user root
    group root
    daemon

    # 调整 HTTP/2 的性能，当遇到 HTTP/2 性能问题时都可以设置相关项，更多设置见 Haproxy 文档 tune.h2 部分 https://docs.haproxy.org/2.7/configuration.html
    tune.h2.initial-window-size 536870912 # 初始窗口大小，建议设置，默认值 65536 单位 byte，此值在突发大流量情况下需要一定加载时间，建议根据网速调整
    tune.h2.max-concurrent-streams 512 # 复用线路数，可根据情况设置，默认值 100，一般不用设置(官方不建议改动)

    ssl-default-server-options ssl-min-ver TLSv1.3

defaults
    log global
    mode http
    timeout connect 5s
    timeout client  300s
    timeout server  300s

frontend xray
    bind 127.0.0.1:6666
    default_backend tunnel

backend tunnel
    server tunnel www.example.com:443 ssl verify none sni req.hdr(host) ws h2 alpn h2
    # ws over HTTP/2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="haproxy-server-配置" tabindex="-1"><a class="header-anchor" href="#haproxy-server-配置"><span>haproxy_server 配置</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>global
    log /dev/log local0 alert
    log /dev/log local1 alert
    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners
    stats timeout 30s
    user root
    group root
    daemon

    # 客户端配置即可，服务端配置也无妨
    tune.h2.initial-window-size 536870912
    tune.h2.max-concurrent-streams 512

    ssl-default-bind-ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256
    ssl-default-bind-ciphersuites TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256
    ssl-default-bind-options ssl-min-ver TLSv1.2

defaults
    log global
    mode http
    timeout connect 5s
    timeout client  300s
    timeout server  300s

frontend tls-in
    bind :::443 ssl crt /path/to/pem alpn h2,http/1.1
    use_backend xray if { ssl_fc_alpn -i h2 } { path_beg /tunnel }
    use_backend server1 if { ssl_fc_alpn -i h2 } { path_beg /path1 }
    use_backend server2 if { ssl_fc_alpn -i h2 } { path_beg /path2 }
    use_backend server3 if { ssl_fc_alpn -i h2 } { path_beg /path3 }
    default_backend web
    # haproxy 使用 http 模式可以根据 path 分流

backend xray
    server xray abns@vless.sock ws h1

backend server1
    server server1 abns@server1.sock ws h1

backend server2
    server server2 abns@server2.sock ws h1

backend server3
    server server3 abns@server3.sock ws h1

backend web
    server web /dev/shm/h1h2c.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="xray-配置-2" tabindex="-1"><a class="header-anchor" href="#xray-配置-2"><span>xray 配置</span></a></h3><p>简单的 websocket 配置即可，无需 TLS， 配置见 xray 文档示例，配置 &quot;path&quot; 可以用于服务端 haproxy 分流（客户端有分流需求同样可以通过客户端 haproxy 进行，原理类似，参考服务端的 path 分流配置）</p><h2 id="grpc-over-http-2" tabindex="-1"><a class="header-anchor" href="#grpc-over-http-2"><span>gRPC over HTTP/2</span></a></h2><p>虽然双端的 h2c 不行，但是 gRPC 不要求必须 TLS，直接冲</p><p>网络结构：xray_client ---gRPC h2c--- haproxy_client ---gRPC over HTTP/2 over HTTPS--- haproxy_sever ---gRPC h2c--- xray_server</p><h3 id="haproxy-client-配置-1" tabindex="-1"><a class="header-anchor" href="#haproxy-client-配置-1"><span>haproxy_client 配置</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>global
    log /dev/log local0 alert
    log /dev/log local1 alert
    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners
    stats timeout 30s
    user root
    group root
    daemon

    tune.h2.initial-window-size 536870912
    tune.h2.max-concurrent-streams 512

    ssl-default-server-options ssl-min-ver TLSv1.3

defaults
    log global
    mode http
    timeout connect 5s
    timeout client  300s
    timeout server  300s

frontend xray
    bind 127.0.0.1:6666 proto h2 # 指定 proto h2 使用 h2c
    default_backend tunnel

backend tunnel
    server tunnel www.example.com:443 ssl verify none sni req.hdr(host) alpn h2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="haproxy-server-配置-1" tabindex="-1"><a class="header-anchor" href="#haproxy-server-配置-1"><span>haproxy_server 配置</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>global
    log /dev/log local0 alert
    log /dev/log local1 alert
    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners
    stats timeout 30s
    user root
    group root
    daemon

    tune.h2.initial-window-size 536870912
    tune.h2.max-concurrent-streams 512

    ssl-default-bind-ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256
    ssl-default-bind-ciphersuites TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256
    ssl-default-bind-options ssl-min-ver TLSv1.2

defaults
    log global
    mode http
    timeout connect 5s
    timeout client  300s
    timeout server  300s

frontend tls-in
    bind :::443 ssl crt /path/to/pem alpn h2,http/1.1
    use_backend xray if { ssl_fc_alpn -i h2 } { path_beg /tunnel } # xray gRPC 中配置的 &quot;serviceName&quot; 在 harpoxy 中可以使用 path 进行分流，为方便使用 &quot;multiMode&quot;，使用 path_beg 参数匹配路径
    use_backend server1 if { ssl_fc_alpn -i h2 } { path_beg /path1 }
    use_backend server2 if { ssl_fc_alpn -i h2 } { path_beg /path2 }
    use_backend server3 if { ssl_fc_alpn -i h2 } { path_beg /path3 }
    default_backend web

backend xray
    server xray abns@vless.sock proto h2

backend server1
    server server1 abns@server1.sock proto h2

backend server2
    server server2 abns@server2.sock proto h2

backend server3
    server server3 abns@server3.sock proto h2

backend web
    server web /dev/shm/h1h2c.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="xray-配置-3" tabindex="-1"><a class="header-anchor" href="#xray-配置-3"><span>xray 配置</span></a></h3><p>简单的 gRPC 配置，无需 TLS，配置见文档，配置的 serviceName 可用于分流。</p><h1 id="haproxy-使用自签证书进行双端认证-grpc-示例" tabindex="-1"><a class="header-anchor" href="#haproxy-使用自签证书进行双端认证-grpc-示例"><span>Haproxy 使用自签证书进行双端认证（gRPC 示例）</span></a></h1><p>这里使用自签证书双端认证加强隧道安全性（但会牺牲一点延迟，不过使用 gRPC 后感知不强），而服务端同时处理信任的证书和自签名证书，并据此分流伪装网站和隧道流量</p><p>其中 www.example.com 为伪装站信任证书（如白话文中申请的证书）</p><p>tunnel.example.com 为自签证书网址，自签证书可以参考 https://learn.microsoft.com/zh-cn/azure/application-gateway/self-signed-certificates</p><p>根证书 ca.crt 服务器证书 server.crt 服务器密钥 server.key</p><p>至少需要生成一个 server.pem，客户端可以同样使用此证书用于双端认证；或者生成两个证书，一个 client，一个 server，用于双端认证</p><p>需准备 fullchain.crt 用于认证（ cat server.crt ca.crt &gt; fullchain.crt ），server.pem （ cat server.crt server.key ca.crt &gt; server.pem ）用于解密</p><h3 id="haproxy-client-配置-2" tabindex="-1"><a class="header-anchor" href="#haproxy-client-配置-2"><span>haproxy_client 配置</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>global
    log /dev/log local0 alert
    log /dev/log local1 alert
    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners
    stats timeout 30s
    user root
    group root
    daemon

    tune.h2.initial-window-size 536870912
    tune.h2.max-concurrent-streams 512

    ssl-default-server-options ssl-min-ver TLSv1.3

defaults
    log global
    mode http
    timeout connect 5s
    timeout client 300s
    timeout server 300s

frontend xray
    bind 127.0.0.1:6666 proto h2
    default_backend tunnel

backend tunnel
    server tunnel tunnel.example.com:443 tfo allow-0rtt ssl crt /path/to/client.pem verify required ca-file /path/to/fullchain.crt sni str(tunnel.example.com) alpn h2
    # 网址自定义，和自签证书一致即可，hosts 中配置 IP 解析，sni 的 str 设定 sni，用于服务端识别
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="haproxy-server-配置-2" tabindex="-1"><a class="header-anchor" href="#haproxy-server-配置-2"><span>haproxy_server 配置</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>global
    log /dev/log local0 alert
    log /dev/log local1 alert
    stats socket /dev/shm/admin.sock mode 660 level admin expose-fd listeners
    stats timeout 30s
    user root
    group root
    daemon

    tune.h2.initial-window-size 536870912
    tune.h2.max-concurrent-streams 512

    ssl-default-bind-ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256
    ssl-default-bind-ciphersuites TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256
    ssl-default-bind-options ssl-min-ver TLSv1.2

defaults
    log global
    mode http
    timeout connect 5s
    timeout client  300s
    timeout server  300s

frontend tls-in
    bind :::443 tfo allow-0rtt ssl crt /path/to/server.pem verify optional ca-file /path/to/fullchain.crt crt /path/to/www.example.com.pem alpn h2,http/1.1
    use_backend xray if { ssl_fc_sni tunnel.example.com } { ssl_c_used } { ssl_fc_alpn -i h2 } { path_beg /tunnel }
    use_backend server1 if { ssl_fc_sni atunnel.example.com } { ssl_c_used }  { ssl_fc_alpn -i h2 } { path_beg /path2 }
    use_backend server2 if { ssl_fc_sni btunnel.example.com } { ssl_c_used }  { ssl_fc_alpn -i h2 } { path_beg /path3 }
    use_backend server3 if { ssl_fc_sni ctunnel.example.com } { ssl_c_used }  { ssl_fc_alpn -i h2 } { path_beg /path4 }
    default_backend web
    # Haproxy 支持多个 pem 解密
    # 可根据多个客户端的不同 sni 分流，也可以 path 分流，方式多样，更多 acl 见 Haproxy 文档

backend xray
    server xray abns@vless.sock proto h2

backend server1
    server server1 abns@server1.sock proto h2

backend server2
    server server2 abns@server2.sock proto h2

backend server3
    server server3 abns@server3.sock proto h2

backend web
    server web /dev/shm/h1h2c.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="xray-配置-4" tabindex="-1"><a class="header-anchor" href="#xray-配置-4"><span>xray 配置</span></a></h3><p>简单的 gRPC 配置，无需 TLS，配置见文档，配置的 serviceName 可用于分流。</p>`,70);function b(p,h){const d=e("I18nTip"),a=e("ExternalLinkIcon");return r(),v("div",null,[n(d),c,i("p",null,[s("服务器申请证书不再赘述，参考"),i("a",o,[s("白话文"),n(a)])]),m])}const x=t(u,[["render",b],["__file","nginx_or_haproxy_tls_tunnel.html.vue"]]);export{x as default};
