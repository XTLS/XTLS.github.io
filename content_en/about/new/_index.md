---
alwaysopen: false
date: "2020-01-25T00:00:00.000Z"
description: Project X Documentation
# head: <hr/>
hide:
# - toc
post: "&nbsp;"
title: X History
weight: 1
---
## 2021.01.25
- Have you practiced the best and most detailed documentation in the Internet? Mr.🍉 started writting the [level 1 secret script](../../documents/level-1/)...
- The [English version of the documentation website](/en) is gradually being added, thanks to the hard work of all of you!

<br>

## 2021.01.22

### [v1.2.3](https://github.com/XTLS/Xray-core/releases/tag/v1.2.3)
---
- Support for the SS protocol has been enhanced **again**. It supports the use of multiple users on a single port now!
- Support for the trojan protocol has been enhanced **again**, and we have a new way in trojan fallbacks to separate traffic using SNI~!
- _(VLESS: Nyaaaaaa~~)_
- The weird UDP bug has been solved, one word "stable"!
- Sniffing can exclude domains you don't want to sniff, and you will get some new approaches in this area.
- Salution to the big shot who finds the problem -> opens an issue -> tests it himself -> analyzes it himself -> finds the problem himself -> solves it himself -> then submits a PR to upstream and downstream <img src="https://avatars2.githubusercontent.com/u/8384161?s=32" width="32px" height="32px" alt="a"/>[@Bohan Yang](https://github.com/bohanyang)!
- There are also other delicious little cherries, just update to taste them as usual.

## 2021.01.19
- Some numbers
    - 10 released tags
    - 100 solved issues
    - 300 forks
    - 2,000 stars
    - 3,000 people in chat group

<br>

## 2021.01.17
- The hard translation work has begun, thanks to <img src="https://avatars2.githubusercontent.com/u/60207794?s=32" width="32px" height="32px" alt="a"/>[@玖柒Max](https://github.com/jiuqi9997) and all the big shots who translate.
- [English version](https://xtls.github.io/en/)

<br />

## 2021.01.15
###  [v1.2.2](https://github.com/XTLS/Xray-core/releases/tag/v1.2.2)
---
- A strange new pose has been unlocked for fallback triage! You can now divide your data based on SNI in your fallbacks~!
- The previously previewed UUID modifications are now live. ([scroll down to see](#2021.01.12))
- The logs now look a little smoother than they did last time.
- The remote DOH has learned to walk by triage just like the rest of the DNS schema.
- And of course all the other little sweets. (Just update the tasting)
- Ah, and by the way, the first man in the world to run xray on M1 was Anthony TSE
## 2021.01.12
---
- The UUID to come will be modified to support mapping between custom strings and UUIDs. This means you will be able to write ids to correspond to users in the configuration file like this.
  - Configuration of the client: `"id": "I will always love Mr.🍉"`
  - Configuration of the server: `"id": "9017f6ef-7fa9-5afb-a6b4-76648028f1a4"` (this UUID is the UUID map of `I will always love Mr.🍉`)
- Mr.🍉's [level 0 documentation](../../documents/level-0/) is finally over, clap clap!

<br />

## 2021.01.10
---
- The [level 0 documentation](../../documents/level-0/) are now online. They are the result of teacher🍉's hard work, teaching you how to go from nothing to xray proficiency! 
- (Probably the most detailed and patient tutorial on the entire internet that teaches you how to configure from scratch)
- Many articles have also been added to the [transparent proxy](../../documents/level-2/) series.
- There are still a lot of details to change, and the documentation will become more and more standardised! 
- Thanks to [@ricuhkaen](https://github.com/ricuhkaen) , [@BioniCosmos](https://github.com/BioniCosmos), [@kirin](https://github.com/kirin10000).

###  [v1.2.1](https://github.com/XTLS/Xray-core/releases/tag/v1.2.1)
---
- Lots of UDP-related fixes, and you can even play Rainbow Six on Ubisoft's potato servers! 
- Google Voice should also work properly with v2rayNG dialing.
- Logs now look much better.

<br />

## 2021.01.07
---
- Courtesy and respect should have been one of the guidelines that the community did not need to explicitly state.

<br />


## 2021.01.05
---
- The documentation site is quietly undergoing some mysterious changes.🙊🙊🙊

<br />

## 2021.01.03
---
- The first PR of the document repository.🎉<br>
[Transparent proxy (TProxy) configuration tutorial](../../documents/level-2/tproxy) ，thanks to <img src="https://avatars2.githubusercontent.com/u/41363844?s=32" width="32px" height="32px" alt="a"/> [@BioniCosmos](https://github.com/BioniCosmos)
- The number of people in the tg group exceeds 2,500.

<br />

## 2021.01.01
---

[Happy new year to everyone, 新年快乐！]🎆🎇🎆

###  [v1.2.0](https://github.com/XTLS/Xray-core/releases/tag/v1.2.0)
---

In the final minutes of New Year's Day, v1.2.0 it came, as is customary with Friday updates, and with the efforts of all the contributors and the dark eye circles of @rprxx, it's here to live up to people's expectation!
- New Year's presents after Christmas presents [v1.1.5](#20201225), big benefits for gamers, full FullCone.
- (UDP functionality will continue to be enhanced!)
- If you've already opened your Christmas presents, this time there's something even better than Christmas presents, with wrapping and little sweets. (Again, don't ask, just update and taste)
- (No, it's not an ad below, it's a milestone.)
- Xray is the first ever unrestricted multi-protocol platform: just xray solves the problem, no need to borrow from other implementations.
  - One person carries it all! Support for all major protocols!
  - Unbeatable performance!
  - Increasingly sophisticated functionality!
  - Fearless vitality and community affinity!
- Xray will keep on going! So [xray needs more heroes](https://github.com/XTLS/Xray-core/discussions/56)!
- PS: Please savor, please savor every sentence of [release notes](https://github.com/XTLS/Xray-core/releases/tag/v1.2.0). There seems to be a little surprise. ~~(Ah, there's a knock on the door... I'll talk to you guys later)~~

<br />

## 2020.12.29
Hello transparent proxy gamers! Xray-core tproxy inbound, socks outbound and UDP FullCone beta are being tested in the [telegram group](https://t.me/projectXray)

<br />

## 2020.12.25
---
Merry Christmas!

###  [v1.1.5](https://github.com/XTLS/Xray-core/releases/tag/v1.1.5)
---
- A Christmas present for gamers! You can now play games with xray! Because now there is SS/trojan UDP fullcone 
- You can now write configuration files in your preferred format, like yaml, like toml...
- (UDP fullcone and more enhancements for VLESS coming soon!
- Don't worry about certificate validation domains being banned, OCSP stapling is now live!
- kirin has brought many script updates. [Scripts here](https://github.com/XTLS/Xray-install)
- And more delicious little cherries! (Don't ask, just update to taste)

<br />

## 2020.12.24
For some indescribable reason, xray's documentation site has been sneaked online ahead of the release date.<br>
The url is: [yes that's what you're looking at](https://xtls.github.io)

You can check out the various contents and feel free to correct/suggest (you can post to the issue section of the documentation github repository)

The documentation site needs constant refinement and addition of content, as well as refinement of the design. <br>
So all are more than welcome to contribute to the documentation. <br>
[Repository of documents](https://github.com/XTLS/XTLS.github.io)

There is a short tutorial in the repository readme on how to help xray improve the documentation site. <br
Feel free to check it out, correct errors, make changes and add ideas.

<br />

## 2020.12.23
Xray-core Shadowsocks UDP FullCone beta, is being tested in the [telegram group](https://t.me/projectXray).

<br />

## 2020.12.21
---
- More than 2,000 members in Project X group.
- Group messages (including the game group) average over 10,000 per day.
<br />

## 2020.12.18
---
###  [v1.1.4](https://github.com/XTLS/Xray-core/releases/tag/v1.1.4)
---
- Lower in-boot footprint and memory usage optimisation
- Arbitrarily configurable TLS to improve your SSL rating
- Splice with XTLS inbound support and XTLS with trojan support
- And advice on the best usage patterns for splice on your router

<br />

## 2020.12.17
---

In view a growing group size and demand for games, the [telegram games group](https://t.me/joinchat/UO4NixbB_XDQJOUjS6mHEQ) has been opened.

<br />

## 2020.12.15
---

The [dev branch](https://github.com/XTLS/Xray-install/tree/dev) of the installation script is open, and is being continuously updated.

<br />

## 2020.12.11
---
### [v1.1.3](https://github.com/XTLS/Xray-core/releases/tag/v1.1.3)
---
- Full version of redirect transparent proxy mode.
- Suggested optimisation of the soft route splice flow control mode.

<br />

## 2020.12.06
---
### [v1.1.2](https://github.com/XTLS/Xray-core/releases/tag/v1.1.2)
---
- Splice mode added to flow control, available only on Linux, for unparalleled performance.
- Enhanced API compatibility.

<br />

## 2020.12.04
---
Add splice mode.

<br />

## 2020.11.27
---
- Project X's GitHub master repository Xray-core has received 500+ stars
- Featured on GitHub Trending
- Project X has over 1,000 group members and 500+ channel subscribers

<br />

## 2020.11.25
---
### [v1.0.0](https://github.com/XTLS/Xray-core/releases/tag/v1.0.0)
---
The first version of xray.
- Based on v2ray-core, with significant changes.
- Fully enhanced, excellent performance, fully compatible.

<br />

## 2020.11.23
---
Project X started.
