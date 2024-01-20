import{_ as n,r as s,o as d,c as r,a as e,b as a,d as t,w as l,e as c}from"./app-eE4giq9J.js";const o={},u=c(`<h1 id="command-parameters" tabindex="-1"><a class="header-anchor" href="#command-parameters" aria-hidden="true">#</a> Command Parameters</h1><div class="custom-container tip"><p class="custom-container-title">Tip</p><p>Xray uses Go-style commands and parameters</p></div><h2 id="get-basic-commands" tabindex="-1"><a class="header-anchor" href="#get-basic-commands" aria-hidden="true">#</a> Get Basic Commands</h2><p>You can run <code>xray help</code>to get the most basic usage of all xray, as well as available commands and instructions.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Xray is a platform for building proxies.

Usage:

        xray &lt;command&gt; [arguments]

The commands are:

        run          Run Xray with config, the default command
        version      Show current version of Xray
        api          Call an API in an Xray process
        tls          TLS tools
        uuid         Generate UUIDv4 or UUIDv5
        x25519       Generate key pair for x25519 key exchange
        wg           Generate key pair for wireguard key exchange

Use &quot;xray help &lt;command&gt;&quot; for more information about a command.

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="xray-run" tabindex="-1"><a class="header-anchor" href="#xray-run" aria-hidden="true">#</a> xray run</h3><p>Specify one or more configuration files and run.</p><p>Usage:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> xray run [-c config.json] [-confdir dir]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Run Xray with config, the default command.

The -config=file, -c=file flags set the config files for
Xray. Multiple assign is accepted.

The -confdir=dir flag sets a dir with multiple json config

The -format=json flag sets the format of config files.
Default &quot;json&quot;.

The -test flag tells Xray to test config files only,
without launching the server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="xray-version" tabindex="-1"><a class="header-anchor" href="#xray-version" aria-hidden="true">#</a> xray version</h3><p>Output Xray version, Golang version and other information.</p><p>Usage:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> xray version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="xray-api" tabindex="-1"><a class="header-anchor" href="#xray-api" aria-hidden="true">#</a> xray api</h3><p>To call Xray&#39;s gRPC API, it needs to be enabled in the configuration file.</p><p>Usage:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>xray api &lt;command&gt; [arguments]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>        restartlogger Restart the logger
        stats         Get statistics
        statsquery    Query statistics
        statssys      Get system statistics
        adi           Add inbounds
        ado           Add outbounds
        rmi           Remove inbounds
        rmo           Remove outbounds
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="xray-tls" tabindex="-1"><a class="header-anchor" href="#xray-tls" aria-hidden="true">#</a> xray tls</h3><p>Some tools related to TLS.</p><p>Usage:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>xray tls &lt;command&gt; [arguments]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>        cert         Generate TLS certificates
        ping         Ping the domain with TLS handshake
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="xray-uuid" tabindex="-1"><a class="header-anchor" href="#xray-uuid" aria-hidden="true">#</a> xray uuid</h3><p>Generate UUID.</p><p>Usage:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>xray uuid
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="xray-x25519" tabindex="-1"><a class="header-anchor" href="#xray-x25519" aria-hidden="true">#</a> xray x25519</h3><p>Generate x25519 key pair。</p><p>Usage:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>xray x25519 [-i &quot;(base64.RawURLEncoding)&quot; --std-encoding]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="xray-wg" tabindex="-1"><a class="header-anchor" href="#xray-wg" aria-hidden="true">#</a> xray wg</h3><p>Generate wireguard curve25519 key pair。</p><p>Usage:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>xray wg [-i &quot;(base64.StdEncoding)&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,36),v={class:"custom-container tip"},m=e("p",{class:"custom-container-title"},"Tip",-1),h=e("p",null,[a("When "),e("code",null,"-config"),a(" is not specified, Xray will try to load "),e("code",null,"config.json"),a(" from the following paths:")],-1),g=e("li",null,"Working Directory",-1),x=e("code",null,"Xray.location.asset",-1);function b(p,f){const i=s("RouterLink");return d(),r("div",null,[u,e("div",v,[m,h,e("ul",null,[g,e("li",null,[a("The path specified by "),x,a(" in the "),t(i,{to:"/en/config/features/env.html"},{default:l(()=>[a("environment variable")]),_:1}),a(".")])])])])}const _=n(o,[["render",b],["__file","command.html.vue"]]);export{_ as default};
