---
date: "2020-12-23T00:00:00.000Z"
description: Project X 的文档.
title: 编译
weight: 1
---
## 前序工作
---

Xray 使用 [Golang](https://golang.org/) 作为主要编程语言。

* 下载 Golang: [Downloads](https://golang.org/dl/)
* 安装 Golang: [install](https://golang.org/doc/install)


{{% notice danger important %}}
请使用 Golang 1.15 以上版本。
{{% /notice %}}

<br />

## 编译
---
### 拉取 Xray 源代码和依赖
---
在安装了[git](https://git-scm.com/)的环境下, 只需要执行以下命令即可clone一份完整的Xray-core代码:

```bash
git clone https://github.com/XTLS/Xray-core.git
```
<br />

#### 注意事项
---
在无法正常访问 Google 的网络环境，依赖可能无法被正常拉取，可以通过各种手段代理解决.<br />

比如可以通过设置 `GOPROXY`：
```bash
go env -w GOPROXY=https://goproxy.io,direct
```



<br />

### 手工编译
---

{{% notice danger important %}}
本小节的命令需要在 Xray 项目根目录内运行。
{{% /notice %}}

在 Linux 环境下, 只需执行以下命令, 即可在当前目录下生成刚构建的 `xray` 可执行文件。
```bash
CGO_ENABLED=0 go build -o xray -trimpath -ldflags "-s -w -buildid=" ./main
```
<br />

#### 交叉编译
---
构建其他 CPU 架构、其他系统（Windows/macOS）的可执行文件需要设置 `GOOS` 和 `GOARCH` 两个环境变量为目标平台/架构.<br />
可以参考 Golang 相关文档 比如[Building Windows Go programs on Linux](https://github.com/golang/go/wiki/WindowsCrossCompiling)。

如下面代码即可以构建可运行在 Windows 64 位系统的 `xray.exe` 可执行文件：

```bash
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build -o xray.exe -trimpath -ldflags "-s -w -buildid=" ./main
```
{{% notice info %}}
**TIP**\
执行 `go tool dist list` 可以查看所有支持的系统与架构。
某些架构还需要控制其它环境变量，如 `arm` 的 `GOARM`，用于设置运行时 CPU 浮点协处理器的版本。
{{% /notice %}}
