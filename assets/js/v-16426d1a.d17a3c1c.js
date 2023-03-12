"use strict";(self.webpackChunkXray_docs_next=self.webpackChunkXray_docs_next||[]).push([[3446],{23002:(t,e,i)=>{i.r(e),i.d(e,{data:()=>a});const a={key:"v-16426d1a",path:"/en/config/stats.html",title:"Traffic Statistics",lang:"en-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"StatsObject",slug:"statsobject",children:[]},{level:2,title:"Retrieving Traffic Statistics",slug:"retrieving-traffic-statistics",children:[]}],filePathRelative:"en/config/stats.md",git:{updatedTime:1678585494e3,contributors:[{name:"Winston2084",email:"126307318+Winston2084@users.noreply.github.com",commits:1},{name:"hmol233",email:"82594500+hmol233@users.noreply.github.com",commits:1}]}}},96538:(t,e,i)=>{i.r(e),i.d(e,{default:()=>l});var a=i(66252);const s=(0,a.uE)('<h1 id="traffic-statistics" tabindex="-1"><a class="header-anchor" href="#traffic-statistics" aria-hidden="true">#</a> Traffic Statistics</h1><p>Used to configure traffic statistics for Xray.</p><h2 id="statsobject" tabindex="-1"><a class="header-anchor" href="#statsobject" aria-hidden="true">#</a> StatsObject</h2><p>The <code>StatsObject</code> corresponds to the <code>stats</code> item in the configuration file.</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;stats&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Currently, no parameters are required for traffic statistics, and internal statistics will be enabled as long as the <code>StatsObject</code> item exists.</p>',6),n=(0,a.Uk)("After statistics are enabled, you only need to enable the corresponding items in the "),c=(0,a.Uk)("Policy"),o=(0,a.Uk)(" to collect the corresponding data."),r=(0,a.uE)('<h2 id="retrieving-traffic-statistics" tabindex="-1"><a class="header-anchor" href="#retrieving-traffic-statistics" aria-hidden="true">#</a> Retrieving Traffic Statistics</h2><p>You can use the <code>xray api</code> command to retrieve traffic statistics.</p><p>The current traffic statistics are as follows:</p><ul><li><p>User Data</p><ul><li><p><code>user&gt;&gt;&gt;[email]&gt;&gt;&gt;traffic&gt;&gt;&gt;uplink</code></p><p>The uplink traffic of a specific user, in bytes.</p></li><li><p><code>user&gt;&gt;&gt;[email]&gt;&gt;&gt;traffic&gt;&gt;&gt;downlink</code></p><p>The downlink traffic of a specific user, in bytes.</p></li></ul></li></ul><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>If the corresponding user does not have an email specified, statistics will not be enabled.</p></div><ul><li><p>Global Data</p><ul><li><p><code>inbound&gt;&gt;&gt;[tag]&gt;&gt;&gt;traffic&gt;&gt;&gt;uplink</code></p><p>The uplink traffic of a specific inbound, in bytes.</p></li><li><p><code>inbound&gt;&gt;&gt;[tag]&gt;&gt;&gt;traffic&gt;&gt;&gt;downlink</code></p><p>The downlink traffic of a specific inbound, in bytes.</p></li><li><p><code>outbound&gt;&gt;&gt;[tag]&gt;&gt;&gt;traffic&gt;&gt;&gt;uplink</code></p><p>The uplink traffic of a specific outbound, in bytes.</p></li><li><p><code>outbound&gt;&gt;&gt;[tag]&gt;&gt;&gt;traffic&gt;&gt;&gt;downlink</code></p><p>The downlink traffic of a specific outbound, in bytes.</p></li></ul></li></ul>',6),l={render:function(t,e){const i=(0,a.up)("RouterLink");return(0,a.wg)(),(0,a.iD)(a.HY,null,[s,(0,a._)("p",null,[n,(0,a.Wm)(i,{to:"/en/config/policy.html"},{default:(0,a.w5)((()=>[c])),_:1}),o]),r],64)}}}}]);