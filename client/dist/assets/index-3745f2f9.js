import{A as w,aF as T,q as v,L as N,C as M,o as t,c as V,b as l,s as m,Q as o,e as a,g as c,w as r,d as g,bg as k,U as C,E as b,R as y,W as h,ak as $,n as F,X as I}from"./index-ee9a4261.js";import{a as P}from"./use-form-item-d271546b.js";const q=w({type:{type:String,values:["success","info","warning","danger",""],default:""},closable:Boolean,disableTransitions:Boolean,hit:Boolean,color:{type:String,default:""},size:{type:String,values:T,default:""},effect:{type:String,values:["dark","light","plain"],default:"light"},round:Boolean}),A={close:n=>n instanceof MouseEvent,click:n=>n instanceof MouseEvent},K=v({name:"ElTag"}),L=v({...K,props:q,emits:A,setup(n,{emit:i}){const E=n,S=P(),s=N("tag"),u=M(()=>{const{type:e,hit:f,effect:_,closable:B,round:z}=E;return[s.b(),s.is("closable",B),s.m(e),s.m(S.value),s.m(_),s.is("hit",f),s.is("round",z)]}),p=e=>{i("close",e)},d=e=>{i("click",e)};return(e,f)=>e.disableTransitions?(t(),V("span",{key:0,class:o(a(u)),style:h({backgroundColor:e.color}),onClick:d},[l("span",{class:o(a(s).e("content"))},[m(e.$slots,"default")],2),e.closable?(t(),c(a(b),{key:0,class:o(a(s).e("close")),onClick:C(p,["stop"])},{default:r(()=>[g(a(k))]),_:1},8,["class","onClick"])):y("v-if",!0)],6)):(t(),c($,{key:1,name:"".concat(a(s).namespace.value,"-zoom-in-center"),appear:""},{default:r(()=>[l("span",{class:o(a(u)),style:h({backgroundColor:e.color}),onClick:d},[l("span",{class:o(a(s).e("content"))},[m(e.$slots,"default")],2),e.closable?(t(),c(a(b),{key:0,class:o(a(s).e("close")),onClick:C(p,["stop"])},{default:r(()=>[g(a(k))]),_:1},8,["class","onClick"])):y("v-if",!0)],6)]),_:3},8,["name"]))}});var Q=F(L,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tag/src/tag.vue"]]);const W=I(Q);export{W as E,q as t};