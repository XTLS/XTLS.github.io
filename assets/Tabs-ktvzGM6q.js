import{f as i,h as r,_ as d,o as a,c as n,b as s,F as l,i as c,g as u,t as _}from"./app-JjHYM4Ww.js";const p=i({props:{title:{type:String}},data(){return{children:[]}},beforeMount(){this.children=[]},mounted(){this.$nextTick(async function(){const t=await r(()=>import("./bootstrap.esm-DrZxKEFm.js"),__vite__mapDeps([]));let o=document.getElementById(this.children[0].id+"-label");new t.Tab(o).show()})},computed:{tag:function(){return"tabs-"+this.title},contentTag:function(){return"tabs-"+this.title+"-content"}}}),b={class:"container"},h=["id"],f=["id","aria-controls","data-bs-target"],g=["id"];function v(t,o,m,T,$,y){return a(),n("div",b,[s("nav",null,[s("div",{id:t.tag,class:"nav nav-pills",role:"tablist"},[(a(!0),n(l,null,c(t.children,e=>(a(),n("button",{id:e.id+"-label","aria-controls":e.id,"data-bs-target":"#"+e.id,"aria-selected":"false",class:"nav-link","data-bs-toggle":"tab",role:"tab",type:"button"},_(e.title),9,f))),256))],8,h)]),s("div",{id:t.contentTag,class:"tab-content"},[u(t.$slots,"default",{},void 0,!0)],8,g)])}const k=d(p,[["render",v],["__scopeId","data-v-b533ae34"],["__file","Tabs.vue"]]);export{k as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
