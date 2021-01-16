---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: 使用文档
weight: 4
---

## 查看文档
---
1. 您可以使用左侧的菜单选择您要看的相关分类<br />
<!-- ![](../d1.png) -->

2. 选择某一项菜单之后, 可以在正文区顶部的导航栏快速切换此分类中的文章.<br />
<div align=left>  <img src="../d2.png" width = "50%" height = "50%" alt="hero"/> </div>

3. 在查看文章时, 可以通过右边的标题列表, 快速切换到其中一个标题.<br />
<div align=left> <img src="../d3.png"  alt="hero" /> </div>

## 改进文档
---

Project X 的文档托管在[github](https://github.com/XTLS/XTLS.github.io)上.

您可以通过以下步骤, 提交您对文档的改动:

1. 从[project X 文档仓库](https://github.com/XTLS/XTLS.github.io)打开仓库, 点击右上角的 fork, fork 一份文档仓库的镜像到您自己的 github 仓库.


2. 使用任何您喜欢的工具, 从您克隆的仓库获得文档的克隆, 如:
- 
  ```
  git clone https://github.com/yours/XTLS.github.io
  ```

3. 基于 main 分支创建新的分支, 如:
- 
  ```
  git checkout -b your-branch
  ```

4. 在新分支上做修改, 完成后提交修改

5. 推送创建的分支到您的仓库
- 
  ```
  git push -u origin your-branch
  ```

6. 打开 github, 点击 'Pull request' 向 [project X 文档仓库](https://github.com/XTLS/XTLS.github.io)发出PR.

7. 请在 PR 的标题和正文中，概述此次 PR 新增/修改的内容等；

8. 等待回应, 如果 PR 被 merge, 您做的修改将直接呈现在 [Project X 文档网站](https://xtls.github.io)。