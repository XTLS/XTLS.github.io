"use strict";(self.webpackChunkXray_docs_next=self.webpackChunkXray_docs_next||[]).push([[735],{59995:(e,a,n)=>{n.r(a),n.d(a,{data:()=>o});const o={key:"v-41f9c00e",path:"/en/document/level-0/ch02-preparation.html",title:"[Chapter 2] Preparation of Raw Materials",lang:"en-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"2.1 Acquiring a VPS",slug:"_2-1-acquiring-a-vps",children:[]},{level:2,title:"2.2 Obtaining a Desired Domain Name",slug:"_2-2-obtaining-a-desired-domain-name",children:[]},{level:2,title:"2.3 Software you need to install on your local computer",slug:"_2-3-software-you-need-to-install-on-your-local-computer",children:[]},{level:2,title:"2.4 Your Progress",slug:"_2-4-your-progress",children:[]}],filePathRelative:"en/document/level-0/ch02-preparation.md",git:{updatedTime:1684508811e3,contributors:[{name:"Kevin Amiri",email:"amiri990.us@gmail.com",commits:1},{name:"hmol233",email:"82594500+hmol233@users.noreply.github.com",commits:1},{name:"yuhan6665",email:"1588741+yuhan6665@users.noreply.github.com",commits:1}]}}},26973:(e,a,n)=>{n.r(a),n.d(a,{default:()=>X});var o=n(66252),t=n(71970);const i=(0,o._)("h1",{id:"chapter-2-preparation-of-raw-materials",tabindex:"-1"},[(0,o._)("a",{class:"header-anchor",href:"#chapter-2-preparation-of-raw-materials","aria-hidden":"true"},"#"),(0,o.Uk)(" [Chapter 2] Preparation of Raw Materials")],-1),r=(0,o._)("p",null,"This chapter is rather special because it involves monetary transactions. This article takes a neutral stance on the project and does not make specific recommendations. What I can do is to tell you what you need to prepare.",-1),l=(0,o._)("h2",{id:"_2-1-acquiring-a-vps",tabindex:"-1"},[(0,o._)("a",{class:"header-anchor",href:"#_2-1-acquiring-a-vps","aria-hidden":"true"},"#"),(0,o.Uk)(" 2.1 Acquiring a VPS")],-1),s=(0,o._)("p",null,"You need to obtain a healthy VPS with an unblocked IP, and perform the following basic preparations in the management console:",-1),u=(0,o._)("ol",null,[(0,o._)("li",null,"Install Debian 10 64-bit system in the backend of VPS."),(0,o._)("li",null,[(0,o.Uk)("Write down the IP address of VPS in a notebook (this article will use "),(0,o._)("code",null,'"100.200.300.400"'),(0,o.Uk)(" as an example, which is an intentionally incorrect and illegal IP address. Please replace it with your real IP address).")]),(0,o._)("li",null,"Write down the SSH remote login port of VPS in a notebook."),(0,o._)("li",null,"Write down the username and password for SSH remote login in a notebook.")],-1),d=(0,o._)("p",null,"Buying a VPS is a relatively complex matter. It is recommended to first learn the relevant knowledge and choose one that suits your own economic ability and line requirements. In addition, you can choose to take advantage of some benefits offered by international giants (such as permanent free or limited-time free packages offered by Oracle and Google). In any case, you must act within your means.",-1),c=(0,o._)("div",{class:"custom-container tip"},[(0,o._)("p",{class:"custom-container-title"},"Explanation"),(0,o._)("p",null,[(0,o.Uk)("Regarding the choice of Debian 10 as the operating system, let me elaborate a bit: No matter what you have heard online, no matter which guru has told you that XXX version of Linux is better or XXX version of Linux is more powerful, these sectarian disputes have "),(0,o._)("strong",null,"nothing to do with you right now"),(0,o.Uk)("! Using Debian 10 is enough to optimize your VPS server for security, stability, and performance (such as using cloud-optimized kernel, timely support of BBR, etc.). After you become familiar with Linux, you can try other Linux distributions.")])],-1),h=(0,o._)("h2",{id:"_2-2-obtaining-a-desired-domain-name",tabindex:"-1"},[(0,o._)("a",{class:"header-anchor",href:"#_2-2-obtaining-a-desired-domain-name","aria-hidden":"true"},"#"),(0,o.Uk)(" 2.2 Obtaining a Desired Domain Name")],-1),m=(0,o._)("p",null,"You need to obtain a domain name and add an A record in the DNS settings, pointing to the IP address of your VPS.",-1),p=(0,o._)("ol",null,[(0,o._)("li",null,[(0,o.Uk)("Please choose a reliable international domain name service provider. Choose some common domain name suffixes, and make sure not to use the "),(0,o._)("code",null,".cn"),(0,o.Uk)(" suffix.")]),(0,o._)("li",null,[(0,o.Uk)("In the DNS settings, add an A record pointing to the IP address of your VPS (the name of the A record can be anything, and in this article, it will be represented by "),(0,o._)("code",null,'"a-name"'),(0,o.Uk)("). The complete domain name will be represented by "),(0,o._)("code",null,'"subdomain.yourdomain.com"'),(0,o.Uk)(" or "),(0,o._)("code",null,'"a-name.yourdomain.com"'),(0,o.Uk)(". The effect is as shown in the picture below:")])],-1),_=(0,o._)("p",null,[(0,o._)("img",{src:t,alt:"Add A Record"})],-1),g=(0,o._)("div",{class:"custom-container tip"},[(0,o._)("p",{class:"custom-container-title"},"Tip"),(0,o._)("p",null,[(0,o.Uk)("This is "),(0,o._)("strong",null,"not"),(0,o.Uk)(" a real usable website. Please replace it with your real website URL.")])],-1),f=(0,o._)("h2",{id:"_2-3-software-you-need-to-install-on-your-local-computer",tabindex:"-1"},[(0,o._)("a",{class:"header-anchor",href:"#_2-3-software-you-need-to-install-on-your-local-computer","aria-hidden":"true"},"#"),(0,o.Uk)(" 2.3 Software you need to install on your local computer")],-1),y=(0,o._)("ol",null,[(0,o._)("li",null,"SSH remote login tool")],-1),b=(0,o.Uk)("Windows: "),k={href:"https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html",target:"_blank",rel:"noopener noreferrer"},w=(0,o.Uk)("PuTTY"),v=(0,o._)("ul",null,[(0,o._)("li",null,"macOS/Linux: Terminal")],-1),S=(0,o._)("ol",{start:"2"},[(0,o._)("li",null,"Remote file copying tool")],-1),U=(0,o.Uk)("Windows: "),P={href:"https://winscp.net/eng/index.php",target:"_blank",rel:"noopener noreferrer"},x=(0,o.Uk)("WinSCP"),I=(0,o._)("ul",null,[(0,o._)("li",null,"macOS/Linux: Terminal")],-1),T={start:"3"},V=(0,o.Uk)("Reliable text editor "),W=(0,o.Uk)("Windows/macOS/Linux: "),D={href:"https://code.visualstudio.com",target:"_blank",rel:"noopener noreferrer"},L=(0,o.Uk)("VSCode"),A=(0,o._)("h2",{id:"_2-4-your-progress",tabindex:"-1"},[(0,o._)("a",{class:"header-anchor",href:"#_2-4-your-progress","aria-hidden":"true"},"#"),(0,o.Uk)(" 2.4 Your Progress")],-1),R=(0,o._)("p",null,"If you have all the raw materials ready as mentioned above, you have already obtained the key to unlocking the door to a new world. So, what are you waiting for? Let's quickly move on to the next chapter and step through this door!",-1),q=(0,o._)("blockquote",null,[(0,o._)("p",null,"⬛⬛⬜⬜⬜⬜⬜⬜ 25%")],-1),X={render:function(e,a){const n=(0,o.up)("OutboundLink");return(0,o.wg)(),(0,o.iD)(o.HY,null,[i,r,l,s,u,d,c,h,m,p,_,g,f,y,(0,o._)("ul",null,[(0,o._)("li",null,[b,(0,o._)("a",k,[w,(0,o.Wm)(n)]),v])]),S,(0,o._)("ul",null,[(0,o._)("li",null,[U,(0,o._)("a",P,[x,(0,o.Wm)(n)]),I])]),(0,o._)("ol",T,[(0,o._)("li",null,[V,(0,o._)("ul",null,[(0,o._)("li",null,[W,(0,o._)("a",D,[L,(0,o.Wm)(n)])])])])]),A,R,q],64)}}},71970:(e,a,n)=>{e.exports=n.p+"assets/img/ch02-img01-a-name.2f5ad94c.png"}}]);