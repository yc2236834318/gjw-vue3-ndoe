System.register(["./index-legacy-2707c0c2.js"],(function(e,n){"use strict";var t,o,l,i,a,r,s,d,u,c,g,p,v,m,f,b,x,y,h,k,w;return{setters:[e=>{t=e.r,o=e.am,l=e.bX,i=e.ax,a=e.q,r=e.bY,s=e.aJ,d=e.w,u=e.a8,c=e.d,g=e.aj,p=e.ak,v=e.b4,m=e.aA,f=e.J,b=e.ah,x=e.bZ,y=e.b1,h=e.aC,k=e.aZ,w=e.b_}],execute:function(){var n=document.createElement("style");function C(e){let n;const m=t(!1),f=o({...e,originalPosition:"",originalOverflow:"",visible:!1});function b(){var e,n;null==(n=null==(e=k.$el)?void 0:e.parentNode)||n.removeChild(k.$el)}function x(){if(!m.value)return;const e=f.parent;m.value=!1,e.vLoadingAddClassList=void 0,function(){const e=f.parent,n=k.ns;if(!e.vLoadingAddClassList){let t=e.getAttribute("loading-number");t=Number.parseInt(t)-1,t?e.setAttribute("loading-number",t.toString()):(v(e,n.bm("parent","relative")),e.removeAttribute("loading-number")),v(e,n.bm("parent","hidden"))}b(),h.unmount()}()}const y=a({name:"ElLoading",setup(e,{expose:n}){const{ns:t,zIndex:o}=r("loading");return n({ns:t,zIndex:o}),()=>{const e=f.spinner||f.svg,n=s("svg",{class:"circular",viewBox:f.svgViewBox?f.svgViewBox:"0 0 50 50",...e?{innerHTML:e}:{}},[s("circle",{class:"path",cx:"25",cy:"25",r:"20",fill:"none"})]),o=f.text?s("p",{class:t.b("text")},[f.text]):void 0;return s(p,{name:t.b("fade"),onAfterLeave:x},{default:d((()=>[u(c("div",{style:{backgroundColor:f.background||""},class:[t.b("mask"),f.customClass,f.fullscreen?"is-fullscreen":""]},[s("div",{class:t.b("spinner")},[n,o])]),[[g,f.visible]])]))})}}}),h=l(y),k=h.mount(document.createElement("div"));return{...i(f),setText:function(e){f.text=e},removeElLoadingChild:b,close:function(){var t;e.beforeClose&&!e.beforeClose()||(m.value=!0,clearTimeout(n),n=window.setTimeout(x,400),f.visible=!1,null==(t=e.closed)||t.call(e))},handleAfterLeave:x,vm:k,get $el(){return k.$el}}}let z;n.textContent=":root{--el-loading-spinner-size: 42px;--el-loading-fullscreen-spinner-size: 50px}.el-loading-parent--relative{position:relative!important}.el-loading-parent--hidden{overflow:hidden!important}.el-loading-mask{position:absolute;z-index:2000;background-color:var(--el-mask-color);margin:0;top:0;right:0;bottom:0;left:0;transition:opacity var(--el-transition-duration)}.el-loading-mask.is-fullscreen{position:fixed}.el-loading-mask.is-fullscreen .el-loading-spinner{margin-top:calc((0px - var(--el-loading-fullscreen-spinner-size)) / 2)}.el-loading-mask.is-fullscreen .el-loading-spinner .circular{height:var(--el-loading-fullscreen-spinner-size);width:var(--el-loading-fullscreen-spinner-size)}.el-loading-spinner{top:50%;margin-top:calc((0px - var(--el-loading-spinner-size)) / 2);width:100%;text-align:center;position:absolute}.el-loading-spinner .el-loading-text{color:var(--el-color-primary);margin:3px 0;font-size:14px}.el-loading-spinner .circular{display:inline;height:var(--el-loading-spinner-size);width:var(--el-loading-spinner-size);animation:loading-rotate 2s linear infinite}.el-loading-spinner .path{animation:loading-dash 1.5s ease-in-out infinite;stroke-dasharray:90,150;stroke-dashoffset:0;stroke-width:2;stroke:var(--el-color-primary);stroke-linecap:round}.el-loading-spinner i{color:var(--el-color-primary)}.el-loading-fade-enter-from,.el-loading-fade-leave-to{opacity:0}@keyframes loading-rotate{to{transform:rotate(360deg)}}@keyframes loading-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-40px}to{stroke-dasharray:90,150;stroke-dashoffset:-120px}}\n",document.head.appendChild(n);const L=function(e={}){if(!m)return;const n=A(e);if(n.fullscreen&&z)return z;const t=C({...n,closed:()=>{var e;null==(e=n.closed)||e.call(n),n.fullscreen&&(z=void 0)}});$(n,n.parent,t),B(n,n.parent,t),n.parent.vLoadingAddClassList=()=>B(n,n.parent,t);let o=n.parent.getAttribute("loading-number");return o=o?`${Number.parseInt(o)+1}`:"1",n.parent.setAttribute("loading-number",o),n.parent.appendChild(t.$el),f((()=>t.visible.value=n.visible)),n.fullscreen&&(z=t),t},A=e=>{var n,t,o,l;let i;return i=b(e.target)?null!=(n=document.querySelector(e.target))?n:document.body:e.target||document.body,{parent:i===document.body||e.body?document.body:i,background:e.background||"",svg:e.svg||"",svgViewBox:e.svgViewBox||"",spinner:e.spinner||!1,text:e.text||"",fullscreen:i===document.body&&(null==(t=e.fullscreen)||t),lock:null!=(o=e.lock)&&o,customClass:e.customClass||"",visible:null==(l=e.visible)||l,target:i}},$=async(e,n,t)=>{const{nextZIndex:o}=t.vm.zIndex||t.vm._.exposed.zIndex,l={};if(e.fullscreen)t.originalPosition.value=x(document.body,"position"),t.originalOverflow.value=x(document.body,"overflow"),l.zIndex=o();else if(e.parent===document.body){t.originalPosition.value=x(document.body,"position"),await f();for(const n of["top","left"]){const t="top"===n?"scrollTop":"scrollLeft";l[n]=e.target.getBoundingClientRect()[n]+document.body[t]+document.documentElement[t]-Number.parseInt(x(document.body,`margin-${n}`),10)+"px"}for(const n of["height","width"])l[n]=`${e.target.getBoundingClientRect()[n]}px`}else t.originalPosition.value=x(n,"position");for(const[i,a]of Object.entries(l))t.$el.style[i]=a},B=(e,n,t)=>{const o=t.vm.ns||t.vm._.exposed.ns;["absolute","fixed","sticky"].includes(t.originalPosition.value)?v(n,o.bm("parent","relative")):y(n,o.bm("parent","relative")),e.fullscreen&&e.lock?y(n,o.bm("parent","hidden")):v(n,o.bm("parent","hidden"))},I=Symbol("ElLoading"),V=(e,n)=>{var o,l,i,a;const r=n.instance,s=e=>h(n.value)?n.value[e]:void 0,d=n=>(e=>{const n=b(e)&&(null==r?void 0:r[e])||e;return n?t(n):n})(s(n)||e.getAttribute(`element-loading-${w(n)}`)),u=null!=(o=s("fullscreen"))?o:n.modifiers.fullscreen,c={text:d("text"),svg:d("svg"),svgViewBox:d("svgViewBox"),spinner:d("spinner"),background:d("background"),customClass:d("customClass"),fullscreen:u,target:null!=(l=s("target"))?l:u?void 0:e,body:null!=(i=s("body"))?i:n.modifiers.body,lock:null!=(a=s("lock"))?a:n.modifiers.lock};e[I]={options:c,instance:L(c)}};e("v",{mounted(e,n){n.value&&V(e,n)},updated(e,n){const t=e[I];n.oldValue!==n.value&&(n.value&&!n.oldValue?V(e,n):n.value&&n.oldValue?h(n.value)&&((e,n)=>{for(const t of Object.keys(n))k(n[t])&&(n[t].value=e[t])})(n.value,t.options):null==t||t.instance.close())},unmounted(e){var n;null==(n=e[I])||n.instance.close()}})}}}));
