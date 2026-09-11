import{at as e,it as t,t as n,vt as r}from"./chunks/framework.B8HA7oqK.js";var i=JSON.parse(`{"title":"配置文件","description":"","frontmatter":{},"headers":[],"relativePath":"config/index.md","filePath":"config/index.md","lastUpdated":1783774350000}`),a={name:`config/index.md`};function o(n,i,a,o,s,c){return r(),t(`div`,null,[...i[0]||=[e(`<div style="display:none;" hidden="true" aria-hidden="true" data-nosnippet>Are you an LLM? You can read better optimized documentation at /config.md for this page in Markdown format</div><h1 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-label="Permalink to “配置文件”">​</a></h1><blockquote><p><strong>这个章节将告诉您所有的 Xray 配置细节，掌握这些内容，在您手中 Xray 将发挥更大威力。</strong></p></blockquote><div class="warning custom-block"><p class="custom-block-title">版本说明</p><p>本文档与<a href="https://github.com/XTLS/Xray-core/releases" target="_blank" rel="noreferrer">最新 release</a>同步；而一键脚本大多安装 GitHub 标记为 <code>Latest</code> 的版本，它有时不是最新 release，因此部分字段可能无效或行为与文档描述不一致。</p></div><h2 id="概述" tabindex="-1">概述 <a class="header-anchor" href="#概述" aria-label="Permalink to “概述”">​</a></h2><p>Xray 的配置文件为 json 格式, 客户端和服务端的配置格式没有区别, 只是实际的配置内容不一样。 形式如下:</p><div class="language-json line-numbers-mode"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes dark-plus light-plus" style="--shiki-dark:#D4D4D4;--shiki-light:#000000;--shiki-dark-bg:#1E1E1E;--shiki-light-bg:#FFFFFF;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">{</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;env&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {},</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;log&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {},</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;api&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {},</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;dns&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {},</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;routing&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {},</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;policy&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {},</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;inbounds&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: [],</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;outbounds&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: [],</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;stats&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {},</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;fakedns&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {},</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;metrics&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {},</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;observatory&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {},</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;burstObservatory&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {},</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;geodata&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {},</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;version&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {}</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><div class="warning custom-block"><p class="custom-block-title custom-block-title-default">WARNING</p><p>如果你刚接触 Xray, 您可以先点击查看<a href="./../document/install.html">快速入门中的配置运行</a>, 学习最基本的配置方式, 然后查看本章节内容以掌握所有 Xray 的配置方式。</p></div><div class="tip custom-block"><p class="custom-block-title">让 AI 更可靠地协助你配置 Xray</p><details class="details custom-block"><summary>点击查看可复制的提示词</summary><p>无论你是想让 AI 直接生成配置，还是想咨询具体配置问题，<br> 都建议你<strong>在对话一开始就先把下面这段话发给 AI</strong>：</p><div class="language-markdown line-numbers-mode"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes dark-plus light-plus" style="--shiki-dark:#D4D4D4;--shiki-light:#000000;--shiki-dark-bg:#1E1E1E;--shiki-light-bg:#FFFFFF;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-dark:#569CD6;--shiki-dark-font-weight:bold;--shiki-light:#800000;--shiki-light-font-weight:bold;"># 角色</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">你是一个专门帮助用户编写和理解 Xray-core 配置的助手。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">你的任务是基于官方文档，帮助我解释配置项，或生成可使用的 Xray-core 配置文件。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#569CD6;--shiki-dark-font-weight:bold;--shiki-light:#800000;--shiki-light-font-weight:bold;"># 唯一依据</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">请使用以下 Xray-core 官方全量文档作为唯一依据：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">https://xtls.github.io/llms-full.txt</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">在回答任何配置相关问题前，请先打开并阅读该文档中的相关部分。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">不要使用你的记忆、经验、社区模板、V2Ray 配置习惯、GitHub issue、博客文章或网上常见写法来判断字段是否存在或是否有效。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#569CD6;--shiki-dark-font-weight:bold;--shiki-light:#800000;--shiki-light-font-weight:bold;"># 最重要的规则</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">不要编造配置字段。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">只能使用官方文档中明确提到的字段、取值、默认值、限制条件和配置结构。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">如果官方文档没有提到某个字段、取值、默认值、限制条件或组合方式，请直接回答：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">“文档未提及，不能确认。”</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">不要猜测，不要补全，不要为了让配置看起来完整而添加没有文档依据的字段。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#569CD6;--shiki-dark-font-weight:bold;--shiki-light:#800000;--shiki-light-font-weight:bold;"># 如果无法访问文档</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">如果你无法打开或读取官方文档链接，请直接说明：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">“我无法访问官方文档链接，因此不能保证不产生幻觉。请手动下载 https://xtls.github.io/llms-full.txt 并上传给我，我会只基于上传文档回答。”</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">在无法访问官方文档时，不要根据记忆生成 Xray-core 配置，也不要根据记忆解释配置细节。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#569CD6;--shiki-dark-font-weight:bold;--shiki-light:#800000;--shiki-light-font-weight:bold;"># 回答流程</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">回答任何配置相关问题时，请遵循以下流程：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#6796E6;--shiki-light:#0451A5;">1.</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;"> 先阅读官方文档中的相关部分。</span></span>
<span class="line"><span style="--shiki-dark:#6796E6;--shiki-light:#0451A5;">2.</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;"> 找出相关的配置对象、字段、取值和限制条件。</span></span>
<span class="line"><span style="--shiki-dark:#6796E6;--shiki-light:#0451A5;">3.</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;"> 只基于文档明确确认的内容回答。</span></span>
<span class="line"><span style="--shiki-dark:#6796E6;--shiki-light:#0451A5;">4.</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;"> 如果某部分文档没有确认，请标记为“文档未提及，不能确认”。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">生成配置时，请遵循以下流程：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#6796E6;--shiki-light:#0451A5;">1.</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;"> 先确认你准备使用哪些字段。</span></span>
<span class="line"><span style="--shiki-dark:#6796E6;--shiki-light:#0451A5;">2.</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;"> 只用官方文档确认过的字段生成配置。</span></span>
<span class="line"><span style="--shiki-dark:#6796E6;--shiki-light:#0451A5;">3.</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;"> 输出前检查最终配置，删除任何无法由文档确认的字段。</span></span>
<span class="line"><span style="--shiki-dark:#6796E6;--shiki-light:#0451A5;">4.</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;"> 如果我的需求中有文档无法确认的部分，请放到“未确认内容”。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#569CD6;--shiki-dark-font-weight:bold;--shiki-light:#800000;--shiki-light-font-weight:bold;"># 输出格式</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">默认输出 JSONC，也就是允许带 </span><span style="--shiki-dark:#CE9178;--shiki-light:#800000;">\`//\`</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;"> 中文注释的 JSON 风格配置。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">注释应该帮助普通用户理解：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#6796E6;--shiki-light:#0451A5;">-</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;"> 这个字段做什么；</span></span>
<span class="line"><span style="--shiki-dark:#6796E6;--shiki-light:#0451A5;">-</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;"> 用户是否需要修改；</span></span>
<span class="line"><span style="--shiki-dark:#6796E6;--shiki-light:#0451A5;">-</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;"> 修改时要注意什么。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">注释不能引入官方文档没有确认的功能。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">如果我明确要求“纯 JSON”，请输出不带注释的合法 JSON。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">不要使用 </span><span style="--shiki-dark:#CE9178;--shiki-light:#800000;">\`_comment\`</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;"> 字段写注释，除非官方文档明确说支持这个字段。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#569CD6;--shiki-dark-font-weight:bold;--shiki-light:#800000;--shiki-light-font-weight:bold;"># 生成配置时的回答格式</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">请使用以下格式：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#569CD6;--shiki-dark-font-weight:bold;--shiki-light:#800000;--shiki-light-font-weight:bold;">## 文档依据</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">简要列出本次使用到的官方文档中的配置对象和关键字段。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#569CD6;--shiki-dark-font-weight:bold;--shiki-light:#800000;--shiki-light-font-weight:bold;">## 配置文件</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">\`\`\`jsonc</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000FF;">{</span></span>
<span class="line"><span style="--shiki-dark:#6A9955;--shiki-light:#008000;">  // 在这里写配置</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000FF;">}</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#569CD6;--shiki-dark-font-weight:bold;--shiki-light:#800000;--shiki-light-font-weight:bold;">## 关键说明</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">解释我最需要修改或注意的字段。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#569CD6;--shiki-dark-font-weight:bold;--shiki-light:#800000;--shiki-light-font-weight:bold;">## 未确认内容</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">列出我的需求中官方文档没有确认的部分。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">如果没有未确认内容，请写：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">“无。”</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#569CD6;--shiki-dark-font-weight:bold;--shiki-light:#800000;--shiki-light-font-weight:bold;"># 解释配置项时的回答格式</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">请使用以下格式：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#569CD6;--shiki-dark-font-weight:bold;--shiki-light:#800000;--shiki-light-font-weight:bold;">## 结论</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">直接解释这个字段或配置对象的作用。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#569CD6;--shiki-dark-font-weight:bold;--shiki-light:#800000;--shiki-light-font-weight:bold;">## 文档依据</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">说明它属于哪个官方文档中的配置对象，以及文档明确确认了什么。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#569CD6;--shiki-dark-font-weight:bold;--shiki-light:#800000;--shiki-light-font-weight:bold;">## 注意事项</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">只写官方文档明确提到的限制、默认值、可选值或组合规则。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#569CD6;--shiki-dark-font-weight:bold;--shiki-light:#800000;--shiki-light-font-weight:bold;">## 文档未提及</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">列出我的问题中官方文档没有确认的部分。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br></div></div></details></div><h2 id="基础配置模块" tabindex="-1">基础配置模块 <a class="header-anchor" href="#基础配置模块" aria-label="Permalink to “基础配置模块”">​</a></h2><blockquote><p>env: <a href="./env.html">EnvObject</a></p></blockquote><p>环境变量，供修改 Xray 的一些底层配置。</p><blockquote><p>log: <a href="./log.html">LogObject</a></p></blockquote><p>日志配置，控制 Xray 输出日志的方式.</p><blockquote><p>api: <a href="./api.html">ApiObject</a></p></blockquote><p>提供了一些 API 接口供远程调用。</p><blockquote><p>dns: <a href="./dns.html">DnsObject</a></p></blockquote><p>内置的 DNS 服务器. 如果没有配置此项，则使用系统的 DNS 设置。</p><blockquote><p>routing: <a href="./routing.html">RoutingObject</a></p></blockquote><p>路由功能。可以设置规则分流数据从不同的 outbound 发出.</p><blockquote><p>policy: <a href="./policy.html">PolicyObject</a></p></blockquote><p>本地策略，可以设置不同的用户等级和对应的策略设置。</p><blockquote><p>inbounds: [ <a href="./inbound.html">InboundObject</a> ]</p></blockquote><p>一个数组，每个元素是一个入站连接配置。</p><blockquote><p>outbounds: [ <a href="./outbound.html">OutboundObject</a> ]</p></blockquote><p>一个数组，每个元素是一个出站连接配置。</p><blockquote><p>stats: <a href="./stats.html">StatsObject</a></p></blockquote><p>用于配置流量数据的统计。</p><blockquote><p>fakedns: <a href="./fakedns.html">FakeDnsObject</a></p></blockquote><p>FakeDNS 配置。可配合透明代理使用，以获取实际域名。</p><blockquote><p>metrics: <a href="./metrics.html">metricsObject</a></p></blockquote><p>metrics 配置。更直接（希望更好）的统计导出方式。</p><blockquote><p>observatory: <a href="./observatory.html#observatoryobject">ObservatoryObject</a></p></blockquote><p>后台连接观测。探测出站代理的连接状态。</p><blockquote><p>burstObservatory: <a href="./observatory.html#burstobservatoryobject">BurstObservatoryObject</a></p></blockquote><p>突发连接观测。探测出站代理的连接状态。</p><blockquote><p>geodata: <a href="./geodata.html">GeodataObject</a></p></blockquote><p>地理数据文件自动更新与热重载。</p><blockquote><p>version</p></blockquote><p>可选，控制该 config 可以运行的版本，当分享 config 时防止在不期望的客户端版本意外运行，运行时客户端将会检查当前版本是否匹配该要求。</p><div class="language-json line-numbers-mode"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes dark-plus light-plus" style="--shiki-dark:#D4D4D4;--shiki-light:#000000;--shiki-dark-bg:#1E1E1E;--shiki-light-bg:#FFFFFF;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">{</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">  &quot;version&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">    &quot;min&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;25.8.3&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">,</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5;">    &quot;max&quot;</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515;">&quot;&quot;</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">  }</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><code>min</code> 与 <code>max</code> 均为可选，不设置或留空代表不设限。不需要是实际存在的版本，只要符合 Xray 版本号 x.y.z 的语法即可。</p><p>25.8.3 是 Xray 添加该功能的版本，设置低于这个的版本没有任何意义 (旧版本不会检查)</p>`,43)]])}var s=n(a,[[`render`,o]]);export{i as __pageData,s as default};