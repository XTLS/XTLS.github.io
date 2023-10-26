"use strict";(self.webpackChunkXray_docs_next=self.webpackChunkXray_docs_next||[]).push([[6284],{66284:(e,t,s)=>{s.r(t),s.d(t,{diagram:()=>k});var a=s(52244),o=s(45625),i=s(71152),r=s(53087),n=s(90360);s(27484),s(17967),s(27856),s(33771),s(69368);const d="rect",c="rectWithTitle",l="statediagram",p="----parent",g="fill:none",b="fill: #333",h="text",u="normal";let y={},f=0;function m(e="",t=0,s="",a="----"){return`state-${e}${null!==s&&s.length>0?`${a}${s}`:""}-${t}`}const w=(e,t,s,o,i,n)=>{const l=s.id,w=null==(S=o[l])?"":S.classes?S.classes.join(" "):"";var S;if("root"!==l){let t=d;!0===s.start&&(t="start"),!1===s.start&&(t="end"),s.type!==a.D&&(t=s.type),y[l]||(y[l]={id:l,shape:t,description:r.e.sanitizeText(l,(0,r.c)()),classes:`${w} statediagram-state`});const o=y[l];s.description&&(Array.isArray(o.description)?(o.shape=c,o.description.push(s.description)):o.description.length>0?(o.shape=c,o.description===l?o.description=[s.description]:o.description=[o.description,s.description]):(o.shape=d,o.description=s.description),o.description=r.e.sanitizeTextOrArray(o.description,(0,r.c)())),1===o.description.length&&o.shape===c&&(o.shape=d),!o.type&&s.doc&&(r.l.info("Setting cluster for ",l,T(s)),o.type="group",o.dir=T(s),o.shape=s.type===a.a?"divider":"roundedWithTitle",o.classes=o.classes+" statediagram-cluster "+(n?"statediagram-cluster-alt":""));const i={labelStyle:"",shape:o.shape,labelText:o.description,classes:o.classes,style:"",id:l,dir:o.dir,domId:m(l,f),type:o.type,padding:15,centerLabel:!0};if(s.note){const t={labelStyle:"",shape:"note",labelText:s.note.text,classes:"statediagram-note",style:"",id:l+"----note-"+f,domId:m(l,f,"note"),type:o.type,padding:15},a={labelStyle:"",shape:"noteGroup",labelText:s.note.text,classes:o.classes,style:"",id:l+p,domId:m(l,f,"parent"),type:"group",padding:0};f++;const r=l+p;e.setNode(r,a),e.setNode(t.id,t),e.setNode(l,i),e.setParent(l,r),e.setParent(t.id,r);let n=l,d=t.id;"left of"===s.note.position&&(n=t.id,d=l),e.setEdge(n,d,{arrowhead:"none",arrowType:"",style:g,labelStyle:"",classes:"transition note-edge",arrowheadStyle:b,labelpos:"c",labelType:h,thickness:u})}else e.setNode(l,i)}t&&"root"!==t.id&&(r.l.trace("Setting node ",l," to be child of its parent ",t.id),e.setParent(l,t.id)),s.doc&&(r.l.trace("Adding nodes children "),x(e,s,s.doc,o,i,!n))},x=(e,t,s,o,i,n)=>{r.l.trace("items",s),s.forEach((s=>{switch(s.stmt){case a.b:case a.D:w(e,t,s,o,i,n);break;case a.S:{w(e,t,s.state1,o,i,n),w(e,t,s.state2,o,i,n);const a={id:"edge"+f,arrowhead:"normal",arrowTypeEnd:"arrow_barb",style:g,labelStyle:"",label:r.e.sanitizeText(s.description,(0,r.c)()),arrowheadStyle:b,labelpos:"c",labelType:h,thickness:u,classes:"transition"};e.setEdge(s.state1.id,s.state2.id,a,f),f++}}}))},T=(e,t=a.c)=>{let s=t;if(e.doc)for(let t=0;t<e.doc.length;t++){const a=e.doc[t];"dir"===a.stmt&&(s=a.value)}return s},S={setConf:function(e){const t=Object.keys(e);for(const s of t)e[s]},getClasses:function(e,t){return t.db.extract(t.db.getRootDocV2()),t.db.getClasses()},draw:async function(e,t,s,a){r.l.info("Drawing state diagram (v2)",t),y={},a.db.getDirection();const{securityLevel:c,state:p}=(0,r.c)(),g=p.nodeSpacing||50,b=p.rankSpacing||50;r.l.info(a.db.getRootDocV2()),a.db.extract(a.db.getRootDocV2()),r.l.info(a.db.getRootDocV2());const h=a.db.getStates(),u=new o.k({multigraph:!0,compound:!0}).setGraph({rankdir:T(a.db.getRootDocV2()),nodesep:g,ranksep:b,marginx:8,marginy:8}).setDefaultEdgeLabel((function(){return{}}));let f;w(u,void 0,a.db.getRootDocV2(),h,a.db,!0),"sandbox"===c&&(f=(0,i.Ys)("#i"+t));const m="sandbox"===c?(0,i.Ys)(f.nodes()[0].contentDocument.body):(0,i.Ys)("body"),x=m.select(`[id="${t}"]`),S=m.select("#"+t+" g");await(0,n.r)(S,u,["barb"],l,t),r.u.insertTitle(x,"statediagramTitleText",p.titleTopMargin,a.db.getDiagramTitle());const k=x.node().getBBox(),D=k.width+16,$=k.height+16;x.attr("class",l);const A=x.node().getBBox();(0,r.i)(x,$,D,p.useMaxWidth);const v=`${A.x-8} ${A.y-8} ${D} ${$}`;r.l.debug(`viewBox ${v}`),x.attr("viewBox",v);const B=document.querySelectorAll('[id="'+t+'"] .edgeLabel .label');for(const e of B){const t=e.getBBox(),s=document.createElementNS("http://www.w3.org/2000/svg",d);s.setAttribute("rx",0),s.setAttribute("ry",0),s.setAttribute("width",t.width),s.setAttribute("height",t.height),e.insertBefore(s,e.firstChild)}}},k={parser:a.p,db:a.d,renderer:S,styles:a.s,init:e=>{e.state||(e.state={}),e.state.arrowMarkerAbsolute=e.arrowMarkerAbsolute,a.d.clear()}}}}]);