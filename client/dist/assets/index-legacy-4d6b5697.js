System.register(["./index-legacy-2707c0c2.js"],(function(e,t){"use strict";var n,r,o,i,a,u,s,l,c,d,v,f,p,m;return{setters:[e=>{n=e.G,r=e.bO,o=e.c3,i=e.aA,a=e.c4,u=e.c5,s=e.r,l=e.c6,c=e.c7,d=e.C,v=e.S,f=e.c8,p=e.c9,m=e.aE}],execute:function(){function t(e){var t;const n=o(e);return null!=(t=null==n?void 0:n.$el)?t:n}e({a:function(e,o,i={}){const a=i,{window:u=y}=a,c=N(a,["window"]);let d;const v=function(e,t=!1){const n=s(),r=()=>n.value=Boolean(e());return r(),l(r,t),n}((()=>u&&"ResizeObserver"in u)),f=()=>{d&&(d.disconnect(),d=void 0)},p=n((()=>t(e)),(e=>{f(),v.value&&u&&e&&(d=new ResizeObserver(o),d.observe(e,c))}),{immediate:!0,flush:"post"}),m=()=>{f(),p()};return r(m),{isSupported:v,stop:m}},b:function(e,t,r,o={}){var i,a,u;const{clone:l=!1,passive:c=!1,eventName:m,deep:y=!1,defaultValue:O}=o,b=v(),w=r||(null==b?void 0:b.emit)||(null==(i=null==b?void 0:b.$emit)?void 0:i.bind(b))||(null==(u=null==(a=null==b?void 0:b.proxy)?void 0:a.$emit)?void 0:u.bind(null==b?void 0:b.proxy));let g=m;t||(t="modelValue"),g=m||g||`update:${t.toString()}`;const I=e=>{return l?f(l)?l(e):(t=e,JSON.parse(JSON.stringify(t))):e;var t},E=()=>p(e[t])?I(e[t]):O;if(c){const r=E(),o=s(r);return n((()=>e[t]),(e=>o.value=I(e))),n(o,(n=>{(n!==e[t]||y)&&w(g,n)}),{deep:y}),o}return d({get:()=>E(),set(e){w(g,e)}})},c:function(e,r,{window:i=y,initialValue:a=""}={}){const u=s(a),l=d((()=>{var e;return t(r)||(null==(e=null==i?void 0:i.document)?void 0:e.documentElement)}));return n([l,()=>o(e)],(([e,t])=>{var n;if(e&&i){const r=null==(n=i.getComputedStyle(e).getPropertyValue(t))?void 0:n.trim();u.value=r||a}}),{immediate:!0}),n(u,(t=>{var n;(null==(n=l.value)?void 0:n.style)&&l.value.style.setProperty(o(e),t)})),u},d:t,e:function({document:e=O}={}){if(!e)return s("visible");const t=s(e.visibilityState);return b(e,"visibilitychange",(()=>{t.value=e.visibilityState})),t},f:function({window:e=y}={}){if(!e)return s(!1);const t=s(e.document.hasFocus());return b(e,"blur",(()=>{t.value=!1})),b(e,"focus",(()=>{t.value=!0})),t},o:function(e,n,r={}){const{window:o=y,ignore:i=[],capture:a=!0,detectIframe:s=!1}=r;if(!o)return;m&&!w&&(w=!0,Array.from(o.document.body.children).forEach((e=>e.addEventListener("click",u))));let l=!0;const c=e=>i.some((n=>{if("string"==typeof n)return Array.from(o.document.querySelectorAll(n)).some((t=>t===e.target||e.composedPath().includes(t)));{const r=t(n);return r&&(e.target===r||e.composedPath().includes(r))}})),d=[b(o,"click",(r=>{const o=t(e);o&&o!==r.target&&!r.composedPath().includes(o)&&(0===r.detail&&(l=!c(r)),l?n(r):l=!0)}),{passive:!0,capture:a}),b(o,"pointerdown",(n=>{const r=t(e);r&&(l=!n.composedPath().includes(r)&&!c(n))}),{passive:!0}),s&&b(o,"blur",(r=>{var i;const a=t(e);"IFRAME"!==(null==(i=o.document.activeElement)?void 0:i.tagName)||(null==a?void 0:a.contains(o.document.activeElement))||n(r)}))].filter(Boolean);return()=>d.forEach((e=>e()))},u:b});const y=i?window:void 0,O=i?window.document:void 0;function b(...e){let i,s,l,c;if(a(e[0])||Array.isArray(e[0])?([s,l,c]=e,i=y):[i,s,l,c]=e,!i)return u;Array.isArray(s)||(s=[s]),Array.isArray(l)||(l=[l]);const d=[],v=()=>{d.forEach((e=>e())),d.length=0},f=n((()=>[t(i),o(c)]),(([e,t])=>{v(),e&&d.push(...s.flatMap((n=>l.map((r=>((e,t,n,r)=>(e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)))(e,n,r,t))))))}),{immediate:!0,flush:"post"}),p=()=>{f(),v()};return r(p),p}let w=!1;const g="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},I="__vueuse_ssr_handlers__";g[I]=g[I]||{};var E,h,S=Object.getOwnPropertySymbols,P=Object.prototype.hasOwnProperty,A=Object.prototype.propertyIsEnumerable,N=(e,t)=>{var n={};for(var r in e)P.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&S)for(var r of S(e))t.indexOf(r)<0&&A.call(e,r)&&(n[r]=e[r]);return n};(h=E||(E={})).UP="UP",h.RIGHT="RIGHT",h.DOWN="DOWN",h.LEFT="LEFT",h.NONE="NONE";var x=Object.defineProperty,Q=Object.getOwnPropertySymbols,j=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable,T=(e,t,n)=>t in e?x(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;((e,t)=>{for(var n in t||(t={}))j.call(t,n)&&T(e,n,t[n]);if(Q)for(var n of Q(t))C.call(t,n)&&T(e,n,t[n])})({linear:c},{easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]})}}}));