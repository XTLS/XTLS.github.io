# project X 的文档网站

## 关于网站

网站使用 [Hugo](https://gohugo.io/) 构建, 并且使用了 [DocPort](https://docport.netlify.app/docport-theme/) 主题.

### 网站内容

网站包含了 [project X 文档网站](https://xtls.github.io/) 所呈现的所有内容.  


### 文档的组织结构
网站的文章内容在 content 目录下, 具体的组织结构如下:

```
	content
	└── section-one/			
	    ├── _index.md
	    └── section-one-two/ 	
	        ├── _index.md 		
	        ├── section-one-two-three-A/	
	        │   ├── _index.md
	        └── section-one-two-three-B/ 	
	            ├── _index.md 	<-- section's page 
	            ├── pageA.md  <-- "subpages"
	            └── pageB.md  <-- "subpages"
```
每个内容页面按组织结构, 自动组合构成网站和导航结构
- 每个章节及其子章节均创建一个文件夹(构成菜单)
- 文件夹中的_index.md 作为此章节的主页面
- 其余的 page*.md 作为此章节的子页面
- 每个页面文件可以编辑元数据设置页面的具体细节

可以在 [Hugo](https://gohugo.io/) 和 [DocPort](https://docport.netlify.app/docport-theme/) 的网站上获得更多如何编辑页面的咨询.  

### 目录与主菜单对应关系
目录名称|菜单名称
--|--
about|关于Project X
guide|快速入门
config|配置文档
documents|使用心得
develop|开发指南
QA|常见问答
caseslip|大案牍术
links|常用链接

部分菜单还存在二级菜单, 直接查看其下内容即可.  


## 帮助我们改进网站

### 改进网站内容

- 您可以通过修改本仓库的文档, 帮助我们改进 [project X 文档网站](https://xtls.github.io/) 所呈现的内容.

- 您可以直接点击 [如何帮助我们改进网站](https://xtls.github.io/guide/document/#%E6%94%B9%E8%BF%9B%E6%96%87%E6%A1%A3) 查看帮助我们改进网站内容的步骤.

- 您可以按 目录与主菜单对应关系 找到已经存在的文档进行修改, 或把您新增的文档放置到相关的目录中.

- 当您新增或修改完成后, 提交您的修改, 并且向本仓库发出PR.

### 自动构建

当成功向仓库提交了修改或 PR 被 merge 后, 会自动重新构建 [project X 文档网站](https://xtls.github.io/)  

只需稍等片刻,就可以在网站上看到修改的最新呈现.

## 致谢
- [Hugo](https://gohugo.io/)
- [DocPort](https://docport.netlify.app/docport-theme/)
- 每一位帮助我们改进文档的朋友!

