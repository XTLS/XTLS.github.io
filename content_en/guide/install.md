---
date: "2020-01-17T00:00:00.000Z"
description: Project X Documents
title: Download and install
weight: 1
---

## Platform support

---

Xray is available in the following platforms.

- Windows 7 and later (x86 / amd64 / arm32).
- macOS 10.10 Yosemite and later (amd64).
- Linux 2.6.23 and later (x86 / amd64 / arm / arm64 / mips64 / mips / ppc64 / s390x / riscv64).
  - Including but not limited to Debian 7 / 8, Ubuntu 12.04 / 14.04 and later, CentOS 7 / 8, Arch Linux, etc.
- FreeBSD (x86 / amd64).
- OpenBSD (x86 / amd64).
- Dragonfly BSD (amd64).

<br />

## Download xray

---

The pre-compiled binary ZIP archive can be found at [Github Releases](https://github.com/xtls/Xray-core/releases).

Download the zip file for your platform, unzip it and you are ready to use it.

<br />

## Verify the installation package

---

Xray provides two types of validation.

- ZIP archive with SHA1 / SHA256 digest: {{% badge warning %}}In progress{{% /badge %}}
- Reproducible build: {{% badge warning %}}In progress{{% /badge %}}

<br />

## Installation methods for Windows

- Download the ZIP archive for Windows from [Github Releases](https://github.com/xtls/Xray-core/releases), unzip it to get the executable `xray.exe`, and then [run it with parameters via the command line](../command).
- Install via [Scoop](https://scoop.sh) package manager: {{% badge warning %}}In progress{{% /badge %}}
- Install via [Chocolatey](https://chocolatey.org) package manager: {{% badge warning %}}In progress{{% /badge %}}

<br />

## Installation methods for macOS

- Download the ZIP archive for Windows from [Github Releases](https://github.com/xtls/Xray-core/releases), unzip it to get the executable `xray.exe`, and then [run it with parameters via the command line](../command).
- Install via [Homebrew](https://brew.sh) package manager: `brew install xray`

<br />

## Installation methods for Linux
---
### Installation scripts
---

- Linux Script
  - [Xray-install](https://github.com/XTLS/Xray-install)
  - [Xray-script](https://github.com/kirin10000/Xray-script)

- One Click
  - [ProxySU](https://github.com/proxysu/ProxySU)
  - [Xray-agent](https://github.com/mack-a/Xray-agent)

- Magisk
  - [Xray4Magisk](https://github.com/CerteKim/Xray4Magisk)
  - [Xray_For_Magisk](https://github.com/E7KMbb/Xray_For_Magisk)


### Package managers for Linux releases

---

Xray packages for Linux releases (can be installed via the release's corresponding package manager).

- Debian：{{% badge warning %}}In progress{{% /badge %}}
- Arch Linux：{{% badge warning %}}In progress{{% /badge %}}

### Brew package manager

---

{{% badge warning %}}In progress{{% /badge %}}

<br />

## Installation as Docker

---

- [teddysun/xray](https://hub.docker.com/r/teddysun/xray)
- Xray-docker
### File structure of the Docker image

---

- `/etc/xray/config.json`：Configuration files
- `/usr/bin/xray`：Xray host program
- `/usr/local/share/xray/geoip.dat`：IP data file
- `/usr/local/share/xray/geosite.dat`：Domain name data file

<br />

## More and more...

---

You can click on the [portal to the many big man's gathering area](../../links) for more resources.


## FAQ

{{% badge warning %}}In progress{{% /badge %}}
