import{n as g,g as p,P as m,x as O,I as i,k as tn,W as M,e as $,ag as h,b as On,f as _,_ as x,a1 as he,u as fe,Y as ve,af as Vn,c as w,d,Z as c,t as hn,a2 as Mn,N as C,ac as en,ad as kn,D as X,G as rn,ae as Bn,H as _e,o as ge,F as B,O as U,Q as ln,A as Pn,l as b,U as Jn,S as Q,E as Zn,a4 as gn,v as sn,s as wn,a9 as be,y as mn,B as ye,w as Qn,a8 as ne,q as Sn,M as $e,a5 as ee,K as te,X as xe,ai as ke,z as Pe,aj as we,a6 as Se,j as Yn}from"./framework.YqoK2ckR.js";const Le=g({__name:"VPBadge",props:{text:{},type:{default:"tip"}},setup(n){return(e,t)=>(i(),p("span",{class:O(["VPBadge",n.type])},[m(e.$slots,"default",{},()=>[tn(M(n.text),1)])],2))}}),Ce={key:0,class:"VPBackdrop"},Ae=g({__name:"VPBackdrop",props:{show:{type:Boolean}},setup(n){return(e,t)=>(i(),$(On,{name:"fade"},{default:h(()=>[n.show?(i(),p("div",Ce)):_("",!0)]),_:1}))}}),Me=x(Ae,[["__scopeId","data-v-c79a1216"]]),A=he;function Te(n,e){let t,o=!1;return()=>{t&&clearTimeout(t),o?t=setTimeout(n,e):(n(),(o=!0)&&setTimeout(()=>o=!1,e))}}function Tn(n){return n.startsWith("/")?n:`/${n}`}function Fn(n){const{pathname:e,search:t,hash:o,protocol:a}=new URL(n,"http://a.com");if(fe(n)||n.startsWith("#")||!a.startsWith("http")||!ve(e))return n;const{site:l}=A(),r=e.endsWith("/")||e.endsWith(".html")?n:n.replace(/(?:(^\.+)\/)?.*$/,`$1${e.replace(/(\.md)?$/,l.value.cleanUrls?"":".html")}${t}${o}`);return Vn(r)}function bn({correspondingLink:n=!1}={}){const{site:e,localeIndex:t,page:o,theme:a,hash:l}=A(),r=w(()=>{var u,v;return{label:(u=e.value.locales[t.value])==null?void 0:u.label,link:((v=e.value.locales[t.value])==null?void 0:v.link)||(t.value==="root"?"/":`/${t.value}/`)}});return{localeLinks:w(()=>Object.entries(e.value.locales).flatMap(([u,v])=>r.value.label===v.label?[]:{text:v.label,link:Ie(v.link||(u==="root"?"/":`/${u}/`),a.value.i18nRouting!==!1&&n,o.value.relativePath.slice(r.value.link.length-1),!e.value.cleanUrls)+l.value})),currentLang:r}}function Ie(n,e,t,o){return e?n.replace(/\/$/,"")+Tn(t.replace(/(^|\/)index\.md$/,"$1").replace(/\.md$/,o?".html":"")):n}const Ne={class:"NotFound"},Oe={class:"code"},Ve={class:"title"},Be={class:"quote"},Fe={class:"action"},Ee=["href","aria-label"],Re=g({__name:"NotFound",setup(n){const{theme:e}=A(),{currentLang:t}=bn();return(o,a)=>{var l,r,s,u,v;return i(),p("div",Ne,[d("p",Oe,M(((l=c(e).notFound)==null?void 0:l.code)??"404"),1),d("h1",Ve,M(((r=c(e).notFound)==null?void 0:r.title)??"PAGE NOT FOUND"),1),a[0]||(a[0]=d("div",{class:"divider"},null,-1)),d("blockquote",Be,M(((s=c(e).notFound)==null?void 0:s.quote)??"But if you don't change your direction, and if you keep looking, you may end up where you are heading."),1),d("div",Fe,[d("a",{class:"link",href:c(Vn)(c(t).link),"aria-label":((u=c(e).notFound)==null?void 0:u.linkLabel)??"go to home"},M(((v=c(e).notFound)==null?void 0:v.linkText)??"Take me home"),9,Ee)])])}}}),ze=x(Re,[["__scopeId","data-v-d6be1790"]]);function ae(n,e){if(Array.isArray(n))return $n(n);if(n==null)return[];e=Tn(e);const t=Object.keys(n).sort((a,l)=>l.split("/").length-a.split("/").length).find(a=>e.startsWith(Tn(a))),o=t?n[t]:[];return Array.isArray(o)?$n(o):$n(o.items,o.base)}function He(n){const e=[];let t=0;for(const o in n){const a=n[o];if(a.items){t=e.push(a);continue}e[t]||e.push({items:[]}),e[t].items.push(a)}return e}function je(n){const e=[];function t(o){for(const a of o)a.text&&a.link&&e.push({text:a.text,link:a.link,docFooterText:a.docFooterText}),a.items&&t(a.items)}return t(n),e}function In(n,e){return Array.isArray(e)?e.some(t=>In(n,t)):hn(n,e.link)?!0:e.items?In(n,e.items):!1}function $n(n,e){return[...n].map(t=>{const o={...t},a=o.base||e;return a&&o.link&&(o.link=a+o.link),o.items&&(o.items=$n(o.items,a)),o})}function an(){const{frontmatter:n,page:e,theme:t}=A(),o=Mn("(min-width: 960px)"),a=C(!1),l=w(()=>{const T=t.value.sidebar,R=e.value.relativePath;return T?ae(T,R):[]}),r=C(l.value);en(l,(T,R)=>{JSON.stringify(T)!==JSON.stringify(R)&&(r.value=l.value)});const s=w(()=>n.value.sidebar!==!1&&r.value.length>0&&n.value.layout!=="home"),u=w(()=>v?n.value.aside==null?t.value.aside==="left":n.value.aside==="left":!1),v=w(()=>n.value.layout==="home"?!1:n.value.aside!=null?!!n.value.aside:t.value.aside!==!1),L=w(()=>s.value&&o.value),f=w(()=>s.value?He(r.value):[]);function S(){a.value=!0}function N(){a.value=!1}function F(){a.value?N():S()}return{isOpen:a,sidebar:r,sidebarGroups:f,hasSidebar:s,hasAside:v,leftAside:u,isSidebarEnabled:L,open:S,close:N,toggle:F}}function Ue(n,e){let t;kn(()=>{t=n.value?document.activeElement:void 0}),X(()=>{window.addEventListener("keyup",o)}),rn(()=>{window.removeEventListener("keyup",o)});function o(a){a.key==="Escape"&&n.value&&(e(),t==null||t.focus())}}function Ge(n){const{page:e,hash:t}=A(),o=C(!1),a=w(()=>n.value.collapsed!=null),l=w(()=>!!n.value.link),r=C(!1),s=()=>{r.value=hn(e.value.relativePath,n.value.link)};en([e,n,t],s),X(s);const u=w(()=>r.value?!0:n.value.items?In(e.value.relativePath,n.value.items):!1),v=w(()=>!!(n.value.items&&n.value.items.length));kn(()=>{o.value=!!(a.value&&n.value.collapsed)}),Bn(()=>{(r.value||u.value)&&(o.value=!1)});function L(){a.value&&(o.value=!o.value)}return{collapsed:o,collapsible:a,isLink:l,isActiveLink:r,hasActiveLink:u,hasChildren:v,toggle:L}}function De(){const{hasSidebar:n}=an(),e=Mn("(min-width: 960px)"),t=Mn("(min-width: 1280px)");return{isAsideEnabled:w(()=>!t.value&&!e.value?!1:n.value?t.value:e.value)}}const Ye=/\b(?:VPBadge|header-anchor|footnote-ref|ignore-header)\b/,Nn=[];function oe(n){return typeof n.outline=="object"&&!Array.isArray(n.outline)&&n.outline.label||n.outlineTitle||"On this page"}function En(n){const e=[...document.querySelectorAll(".VPDoc :where(h1,h2,h3,h4,h5,h6)")].filter(t=>t.id&&t.hasChildNodes()).map(t=>{const o=Number(t.tagName[1]);return{element:t,title:qe(t),link:"#"+t.id,level:o}});return Xe(e,n)}function qe(n){let e="";for(const t of n.childNodes)if(t.nodeType===1){if(Ye.test(t.className))continue;e+=t.textContent}else t.nodeType===3&&(e+=t.textContent);return e.trim()}function Xe(n,e){if(e===!1)return[];const t=(typeof e=="object"&&!Array.isArray(e)?e.level:e)||2,[o,a]=typeof t=="number"?[t,t]:t==="deep"?[2,6]:t;return Je(n,o,a)}function Ke(n,e){const{isAsideEnabled:t}=De(),o=Te(l,100);let a=null;X(()=>{requestAnimationFrame(l),window.addEventListener("scroll",o)}),_e(()=>{r(location.hash)}),rn(()=>{window.removeEventListener("scroll",o)});function l(){if(!t.value)return;const s=window.scrollY,u=window.innerHeight,v=document.body.offsetHeight,L=Math.abs(s+u-v)<1,f=Nn.map(({element:N,link:F})=>({link:F,top:We(N)})).filter(({top:N})=>!Number.isNaN(N)).sort((N,F)=>N.top-F.top);if(!f.length){r(null);return}if(s<1){r(null);return}if(L){r(f[f.length-1].link);return}let S=null;for(const{link:N,top:F}of f){if(F>s+ge()+4)break;S=N}r(S)}function r(s){a&&a.classList.remove("active"),s==null?a=null:a=n.value.querySelector(`a[href="${decodeURIComponent(s)}"]`);const u=a;u?(u.classList.add("active"),e.value.style.top=u.offsetTop+39+"px",e.value.style.opacity="1"):(e.value.style.top="33px",e.value.style.opacity="0")}}function We(n){let e=0;for(;n!==document.body;){if(n===null)return NaN;e+=n.offsetTop,n=n.offsetParent}return e}function Je(n,e,t){Nn.length=0;const o=[],a=[];return n.forEach(l=>{const r={...l,children:[]};let s=a[a.length-1];for(;s&&s.level>=r.level;)a.pop(),s=a[a.length-1];if(r.element.classList.contains("ignore-header")||s&&"shouldIgnore"in s){a.push({level:r.level,shouldIgnore:!0});return}r.level>t||r.level<e||(Nn.push({element:r.element,link:r.link}),s?s.children.push(r):o.push(r),a.push(r))}),o}const Ze=["href","title"],Qe=g({__name:"VPDocOutlineItem",props:{headers:{},root:{type:Boolean}},setup(n){function e({target:t}){const o=t.href.split("#")[1],a=document.getElementById(decodeURIComponent(o));a==null||a.focus({preventScroll:!0})}return(t,o)=>{const a=ln("VPDocOutlineItem",!0);return i(),p("ul",{class:O(["VPDocOutlineItem",n.root?"root":"nested"])},[(i(!0),p(B,null,U(n.headers,({children:l,link:r,title:s})=>(i(),p("li",null,[d("a",{class:"outline-link",href:r,onClick:e,title:s},M(s),9,Ze),l!=null&&l.length?(i(),$(a,{key:0,headers:l},null,8,["headers"])):_("",!0)]))),256))],2)}}}),se=x(Qe,[["__scopeId","data-v-b933a997"]]),nt={class:"content"},et={"aria-level":"2",class:"outline-title",id:"doc-outline-aria-label",role:"heading"},tt=g({__name:"VPDocAsideOutline",setup(n){const{frontmatter:e,theme:t}=A(),o=Jn([]);Pn(()=>{o.value=En(e.value.outline??t.value.outline)});const a=C(),l=C();return Ke(a,l),(r,s)=>(i(),p("nav",{"aria-labelledby":"doc-outline-aria-label",class:O(["VPDocAsideOutline",{"has-outline":o.value.length>0}]),ref_key:"container",ref:a},[d("div",nt,[d("div",{class:"outline-marker",ref_key:"marker",ref:l},null,512),d("div",et,M(c(oe)(c(t))),1),b(se,{headers:o.value,root:!0},null,8,["headers"])])],2))}}),at=x(tt,[["__scopeId","data-v-a5bbad30"]]),ot={class:"VPDocAsideCarbonAds"},st=g({__name:"VPDocAsideCarbonAds",props:{carbonAds:{}},setup(n){const e=()=>null;return(t,o)=>(i(),p("div",ot,[b(c(e),{"carbon-ads":n.carbonAds},null,8,["carbon-ads"])]))}}),it={class:"VPDocAside"},rt=g({__name:"VPDocAside",setup(n){const{theme:e}=A();return(t,o)=>(i(),p("div",it,[m(t.$slots,"aside-top",{},void 0,!0),m(t.$slots,"aside-outline-before",{},void 0,!0),b(at),m(t.$slots,"aside-outline-after",{},void 0,!0),o[0]||(o[0]=d("div",{class:"spacer"},null,-1)),m(t.$slots,"aside-ads-before",{},void 0,!0),c(e).carbonAds?(i(),$(st,{key:0,"carbon-ads":c(e).carbonAds},null,8,["carbon-ads"])):_("",!0),m(t.$slots,"aside-ads-after",{},void 0,!0),m(t.$slots,"aside-bottom",{},void 0,!0)]))}}),lt=x(rt,[["__scopeId","data-v-3f215769"]]);function ct(){const{theme:n,page:e}=A();return w(()=>{const{text:t="Edit this page",pattern:o=""}=n.value.editLink||{};let a;return typeof o=="function"?a=o(e.value):a=o.replace(/:path/g,e.value.filePath),{url:a,text:t}})}function dt(){const{page:n,theme:e,frontmatter:t}=A();return w(()=>{var v,L,f,S,N,F,T,R;const o=ae(e.value.sidebar,n.value.relativePath),a=je(o),l=ut(a,G=>G.link.replace(/[?#].*$/,"")),r=l.findIndex(G=>hn(n.value.relativePath,G.link)),s=((v=e.value.docFooter)==null?void 0:v.prev)===!1&&!t.value.prev||t.value.prev===!1,u=((L=e.value.docFooter)==null?void 0:L.next)===!1&&!t.value.next||t.value.next===!1;return{prev:s?void 0:{text:(typeof t.value.prev=="string"?t.value.prev:typeof t.value.prev=="object"?t.value.prev.text:void 0)??((f=l[r-1])==null?void 0:f.docFooterText)??((S=l[r-1])==null?void 0:S.text),link:(typeof t.value.prev=="object"?t.value.prev.link:void 0)??((N=l[r-1])==null?void 0:N.link)},next:u?void 0:{text:(typeof t.value.next=="string"?t.value.next:typeof t.value.next=="object"?t.value.next.text:void 0)??((F=l[r+1])==null?void 0:F.docFooterText)??((T=l[r+1])==null?void 0:T.text),link:(typeof t.value.next=="object"?t.value.next.link:void 0)??((R=l[r+1])==null?void 0:R.link)}}})}function ut(n,e){const t=new Set;return n.filter(o=>{const a=e(o);return t.has(a)?!1:t.add(a)})}const nn=g({__name:"VPLink",props:{tag:{},href:{},noIcon:{type:Boolean},target:{},rel:{}},setup(n){const e=n,t=w(()=>e.tag??(e.href?"a":"span")),o=w(()=>e.href&&Zn.test(e.href)||e.target==="_blank");return(a,l)=>(i(),$(Q(t.value),{class:O(["VPLink",{link:n.href,"vp-external-link-icon":o.value,"no-icon":n.noIcon}]),href:n.href?c(Fn)(n.href):void 0,target:n.target??(o.value?"_blank":void 0),rel:n.rel??(o.value?"noreferrer":void 0)},{default:h(()=>[m(a.$slots,"default")]),_:3},8,["class","href","target","rel"]))}}),pt={class:"VPLastUpdated"},mt=["datetime"],ht=g({__name:"VPDocFooterLastUpdated",setup(n){const{theme:e,page:t,lang:o}=A(),a=w(()=>new Date(t.value.lastUpdated)),l=w(()=>a.value.toISOString()),r=C("");return X(()=>{kn(()=>{var s,u,v;r.value=new Intl.DateTimeFormat((u=(s=e.value.lastUpdated)==null?void 0:s.formatOptions)!=null&&u.forceLocale?o.value:void 0,((v=e.value.lastUpdated)==null?void 0:v.formatOptions)??{dateStyle:"short",timeStyle:"short"}).format(a.value)})}),(s,u)=>{var v;return i(),p("p",pt,[tn(M(((v=c(e).lastUpdated)==null?void 0:v.text)||c(e).lastUpdatedText||"Last updated")+": ",1),d("time",{datetime:l.value},M(r.value),9,mt)])}}}),ft=x(ht,[["__scopeId","data-v-e98dd255"]]),vt={key:0,class:"VPDocFooter"},_t={key:0,class:"edit-info"},gt={key:0,class:"edit-link"},bt={key:1,class:"last-updated"},yt={key:1,class:"prev-next","aria-labelledby":"doc-footer-aria-label"},$t={class:"pager"},xt=["innerHTML"],kt=["innerHTML"],Pt={class:"pager"},wt=["innerHTML"],St=["innerHTML"],Lt=g({__name:"VPDocFooter",setup(n){const{theme:e,page:t,frontmatter:o}=A(),a=ct(),l=dt(),r=w(()=>e.value.editLink&&o.value.editLink!==!1),s=w(()=>t.value.lastUpdated),u=w(()=>r.value||s.value||l.value.prev||l.value.next);return(v,L)=>{var f,S,N,F;return u.value?(i(),p("footer",vt,[m(v.$slots,"doc-footer-before",{},void 0,!0),r.value||s.value?(i(),p("div",_t,[r.value?(i(),p("div",gt,[b(nn,{class:"edit-link-button",href:c(a).url,"no-icon":!0},{default:h(()=>[L[0]||(L[0]=d("span",{class:"vpi-square-pen edit-link-icon"},null,-1)),tn(" "+M(c(a).text),1)]),_:1},8,["href"])])):_("",!0),s.value?(i(),p("div",bt,[b(ft)])):_("",!0)])):_("",!0),(f=c(l).prev)!=null&&f.link||(S=c(l).next)!=null&&S.link?(i(),p("nav",yt,[L[1]||(L[1]=d("span",{class:"visually-hidden",id:"doc-footer-aria-label"},"Pager",-1)),d("div",$t,[(N=c(l).prev)!=null&&N.link?(i(),$(nn,{key:0,class:"pager-link prev",href:c(l).prev.link},{default:h(()=>{var T;return[d("span",{class:"desc",innerHTML:((T=c(e).docFooter)==null?void 0:T.prev)||"Previous page"},null,8,xt),d("span",{class:"title",innerHTML:c(l).prev.text},null,8,kt)]}),_:1},8,["href"])):_("",!0)]),d("div",Pt,[(F=c(l).next)!=null&&F.link?(i(),$(nn,{key:0,class:"pager-link next",href:c(l).next.link},{default:h(()=>{var T;return[d("span",{class:"desc",innerHTML:((T=c(e).docFooter)==null?void 0:T.next)||"Next page"},null,8,wt),d("span",{class:"title",innerHTML:c(l).next.text},null,8,St)]}),_:1},8,["href"])):_("",!0)])])):_("",!0)])):_("",!0)}}}),Ct=x(Lt,[["__scopeId","data-v-e257564d"]]),At={class:"container"},Mt={class:"aside-container"},Tt={class:"aside-content"},It={class:"content"},Nt={class:"content-container"},Ot={class:"main"},Vt=g({__name:"VPDoc",setup(n){const{theme:e}=A(),t=gn(),{hasSidebar:o,hasAside:a,leftAside:l}=an(),r=w(()=>t.path.replace(/[./]+/g,"_").replace(/_html$/,""));return(s,u)=>{const v=ln("Content");return i(),p("div",{class:O(["VPDoc",{"has-sidebar":c(o),"has-aside":c(a)}])},[m(s.$slots,"doc-top",{},void 0,!0),d("div",At,[c(a)?(i(),p("div",{key:0,class:O(["aside",{"left-aside":c(l)}])},[u[0]||(u[0]=d("div",{class:"aside-curtain"},null,-1)),d("div",Mt,[d("div",Tt,[b(lt,null,{"aside-top":h(()=>[m(s.$slots,"aside-top",{},void 0,!0)]),"aside-bottom":h(()=>[m(s.$slots,"aside-bottom",{},void 0,!0)]),"aside-outline-before":h(()=>[m(s.$slots,"aside-outline-before",{},void 0,!0)]),"aside-outline-after":h(()=>[m(s.$slots,"aside-outline-after",{},void 0,!0)]),"aside-ads-before":h(()=>[m(s.$slots,"aside-ads-before",{},void 0,!0)]),"aside-ads-after":h(()=>[m(s.$slots,"aside-ads-after",{},void 0,!0)]),_:3})])])],2)):_("",!0),d("div",It,[d("div",Nt,[m(s.$slots,"doc-before",{},void 0,!0),d("main",Ot,[b(v,{class:O(["vp-doc",[r.value,c(e).externalLinkIcon&&"external-link-icon-enabled"]])},null,8,["class"])]),b(Ct,null,{"doc-footer-before":h(()=>[m(s.$slots,"doc-footer-before",{},void 0,!0)]),_:3}),m(s.$slots,"doc-after",{},void 0,!0)])])]),m(s.$slots,"doc-bottom",{},void 0,!0)],2)}}}),Bt=x(Vt,[["__scopeId","data-v-39a288b8"]]),Ft=g({__name:"VPButton",props:{tag:{},size:{default:"medium"},theme:{default:"brand"},text:{},href:{},target:{},rel:{}},setup(n){const e=n,t=w(()=>e.href&&Zn.test(e.href)),o=w(()=>e.tag||(e.href?"a":"button"));return(a,l)=>(i(),$(Q(o.value),{class:O(["VPButton",[n.size,n.theme]]),href:n.href?c(Fn)(n.href):void 0,target:e.target??(t.value?"_blank":void 0),rel:e.rel??(t.value?"noreferrer":void 0)},{default:h(()=>[tn(M(n.text),1)]),_:1},8,["class","href","target","rel"]))}}),Et=x(Ft,[["__scopeId","data-v-fa7799d5"]]),Rt=["src","alt"],zt=g({inheritAttrs:!1,__name:"VPImage",props:{image:{},alt:{}},setup(n){return(e,t)=>{const o=ln("VPImage",!0);return n.image?(i(),p(B,{key:0},[typeof n.image=="string"||"src"in n.image?(i(),p("img",sn({key:0,class:"VPImage"},typeof n.image=="string"?e.$attrs:{...n.image,...e.$attrs},{src:c(Vn)(typeof n.image=="string"?n.image:n.image.src),alt:n.alt??(typeof n.image=="string"?"":n.image.alt||"")}),null,16,Rt)):(i(),p(B,{key:1},[b(o,sn({class:"dark",image:n.image.dark,alt:n.image.alt},e.$attrs),null,16,["image","alt"]),b(o,sn({class:"light",image:n.image.light,alt:n.image.alt},e.$attrs),null,16,["image","alt"])],64))],64)):_("",!0)}}}),xn=x(zt,[["__scopeId","data-v-8426fc1a"]]),Ht={class:"container"},jt={class:"main"},Ut={class:"heading"},Gt=["innerHTML"],Dt=["innerHTML"],Yt=["innerHTML"],qt={key:0,class:"actions"},Xt={key:0,class:"image"},Kt={class:"image-container"},Wt=g({__name:"VPHero",props:{name:{},text:{},tagline:{},image:{},actions:{}},setup(n){const e=wn("hero-image-slot-exists");return(t,o)=>(i(),p("div",{class:O(["VPHero",{"has-image":n.image||c(e)}])},[d("div",Ht,[d("div",jt,[m(t.$slots,"home-hero-info-before",{},void 0,!0),m(t.$slots,"home-hero-info",{},()=>[d("h1",Ut,[n.name?(i(),p("span",{key:0,innerHTML:n.name,class:"name clip"},null,8,Gt)):_("",!0),n.text?(i(),p("span",{key:1,innerHTML:n.text,class:"text"},null,8,Dt)):_("",!0)]),n.tagline?(i(),p("p",{key:0,innerHTML:n.tagline,class:"tagline"},null,8,Yt)):_("",!0)],!0),m(t.$slots,"home-hero-info-after",{},void 0,!0),n.actions?(i(),p("div",qt,[(i(!0),p(B,null,U(n.actions,a=>(i(),p("div",{key:a.link,class:"action"},[b(Et,{tag:"a",size:"medium",theme:a.theme,text:a.text,href:a.link,target:a.target,rel:a.rel},null,8,["theme","text","href","target","rel"])]))),128))])):_("",!0),m(t.$slots,"home-hero-actions-after",{},void 0,!0)]),n.image||c(e)?(i(),p("div",Xt,[d("div",Kt,[o[0]||(o[0]=d("div",{class:"image-bg"},null,-1)),m(t.$slots,"home-hero-image",{},()=>[n.image?(i(),$(xn,{key:0,class:"image-src",image:n.image},null,8,["image"])):_("",!0)],!0)])])):_("",!0)])],2))}}),Jt=x(Wt,[["__scopeId","data-v-4f9c455b"]]),Zt=g({__name:"VPHomeHero",setup(n){const{frontmatter:e}=A();return(t,o)=>c(e).hero?(i(),$(Jt,{key:0,class:"VPHomeHero",name:c(e).hero.name,text:c(e).hero.text,tagline:c(e).hero.tagline,image:c(e).hero.image,actions:c(e).hero.actions},{"home-hero-info-before":h(()=>[m(t.$slots,"home-hero-info-before")]),"home-hero-info":h(()=>[m(t.$slots,"home-hero-info")]),"home-hero-info-after":h(()=>[m(t.$slots,"home-hero-info-after")]),"home-hero-actions-after":h(()=>[m(t.$slots,"home-hero-actions-after")]),"home-hero-image":h(()=>[m(t.$slots,"home-hero-image")]),_:3},8,["name","text","tagline","image","actions"])):_("",!0)}}),Qt={class:"box"},na={key:0,class:"icon"},ea=["innerHTML"],ta=["innerHTML"],aa=["innerHTML"],oa={key:4,class:"link-text"},sa={class:"link-text-value"},ia=g({__name:"VPFeature",props:{icon:{},title:{},details:{},link:{},linkText:{},rel:{},target:{}},setup(n){return(e,t)=>(i(),$(nn,{class:"VPFeature",href:n.link,rel:n.rel,target:n.target,"no-icon":!0,tag:n.link?"a":"div"},{default:h(()=>[d("article",Qt,[typeof n.icon=="object"&&n.icon.wrap?(i(),p("div",na,[b(xn,{image:n.icon,alt:n.icon.alt,height:n.icon.height||48,width:n.icon.width||48},null,8,["image","alt","height","width"])])):typeof n.icon=="object"?(i(),$(xn,{key:1,image:n.icon,alt:n.icon.alt,height:n.icon.height||48,width:n.icon.width||48},null,8,["image","alt","height","width"])):n.icon?(i(),p("div",{key:2,class:"icon",innerHTML:n.icon},null,8,ea)):_("",!0),d("h2",{class:"title",innerHTML:n.title},null,8,ta),n.details?(i(),p("p",{key:3,class:"details",innerHTML:n.details},null,8,aa)):_("",!0),n.linkText?(i(),p("div",oa,[d("p",sa,[tn(M(n.linkText)+" ",1),t[0]||(t[0]=d("span",{class:"vpi-arrow-right link-text-icon"},null,-1))])])):_("",!0)])]),_:1},8,["href","rel","target","tag"]))}}),ra=x(ia,[["__scopeId","data-v-a3976bdc"]]),la={key:0,class:"VPFeatures"},ca={class:"container"},da={class:"items"},ua=g({__name:"VPFeatures",props:{features:{}},setup(n){const e=n,t=w(()=>{const o=e.features.length;if(o){if(o===2)return"grid-2";if(o===3)return"grid-3";if(o%3===0)return"grid-6";if(o>3)return"grid-4"}else return});return(o,a)=>n.features?(i(),p("div",la,[d("div",ca,[d("div",da,[(i(!0),p(B,null,U(n.features,l=>(i(),p("div",{key:l.title,class:O(["item",[t.value]])},[b(ra,{icon:l.icon,title:l.title,details:l.details,link:l.link,"link-text":l.linkText,rel:l.rel,target:l.target},null,8,["icon","title","details","link","link-text","rel","target"])],2))),128))])])])):_("",!0)}}),pa=x(ua,[["__scopeId","data-v-a6181336"]]),ma=g({__name:"VPHomeFeatures",setup(n){const{frontmatter:e}=A();return(t,o)=>c(e).features?(i(),$(pa,{key:0,class:"VPHomeFeatures",features:c(e).features},null,8,["features"])):_("",!0)}}),ha=g({__name:"VPHomeContent",setup(n){const{width:e}=be({initialWidth:0,includeScrollbar:!1});return(t,o)=>(i(),p("div",{class:"vp-doc container",style:mn(c(e)?{"--vp-offset":`calc(50% - ${c(e)/2}px)`}:{})},[m(t.$slots,"default",{},void 0,!0)],4))}}),fa=x(ha,[["__scopeId","data-v-8e2d4988"]]),va=g({__name:"VPHome",setup(n){const{frontmatter:e,theme:t}=A();return(o,a)=>{const l=ln("Content");return i(),p("div",{class:O(["VPHome",{"external-link-icon-enabled":c(t).externalLinkIcon}])},[m(o.$slots,"home-hero-before",{},void 0,!0),b(Zt,null,{"home-hero-info-before":h(()=>[m(o.$slots,"home-hero-info-before",{},void 0,!0)]),"home-hero-info":h(()=>[m(o.$slots,"home-hero-info",{},void 0,!0)]),"home-hero-info-after":h(()=>[m(o.$slots,"home-hero-info-after",{},void 0,!0)]),"home-hero-actions-after":h(()=>[m(o.$slots,"home-hero-actions-after",{},void 0,!0)]),"home-hero-image":h(()=>[m(o.$slots,"home-hero-image",{},void 0,!0)]),_:3}),m(o.$slots,"home-hero-after",{},void 0,!0),m(o.$slots,"home-features-before",{},void 0,!0),b(ma),m(o.$slots,"home-features-after",{},void 0,!0),c(e).markdownStyles!==!1?(i(),$(fa,{key:0},{default:h(()=>[b(l)]),_:1})):(i(),$(l,{key:1}))],2)}}}),_a=x(va,[["__scopeId","data-v-8b561e3d"]]),ga={},ba={class:"VPPage"};function ya(n,e){const t=ln("Content");return i(),p("div",ba,[m(n.$slots,"page-top"),b(t),m(n.$slots,"page-bottom")])}const $a=x(ga,[["render",ya]]),xa=g({__name:"VPContent",setup(n){const{page:e,frontmatter:t}=A(),{hasSidebar:o}=an();return(a,l)=>(i(),p("div",{class:O(["VPContent",{"has-sidebar":c(o),"is-home":c(t).layout==="home"}]),id:"VPContent"},[c(e).isNotFound?m(a.$slots,"not-found",{key:0},()=>[b(ze)],!0):c(t).layout==="page"?(i(),$($a,{key:1},{"page-top":h(()=>[m(a.$slots,"page-top",{},void 0,!0)]),"page-bottom":h(()=>[m(a.$slots,"page-bottom",{},void 0,!0)]),_:3})):c(t).layout==="home"?(i(),$(_a,{key:2},{"home-hero-before":h(()=>[m(a.$slots,"home-hero-before",{},void 0,!0)]),"home-hero-info-before":h(()=>[m(a.$slots,"home-hero-info-before",{},void 0,!0)]),"home-hero-info":h(()=>[m(a.$slots,"home-hero-info",{},void 0,!0)]),"home-hero-info-after":h(()=>[m(a.$slots,"home-hero-info-after",{},void 0,!0)]),"home-hero-actions-after":h(()=>[m(a.$slots,"home-hero-actions-after",{},void 0,!0)]),"home-hero-image":h(()=>[m(a.$slots,"home-hero-image",{},void 0,!0)]),"home-hero-after":h(()=>[m(a.$slots,"home-hero-after",{},void 0,!0)]),"home-features-before":h(()=>[m(a.$slots,"home-features-before",{},void 0,!0)]),"home-features-after":h(()=>[m(a.$slots,"home-features-after",{},void 0,!0)]),_:3})):c(t).layout&&c(t).layout!=="doc"?(i(),$(Q(c(t).layout),{key:3})):(i(),$(Bt,{key:4},{"doc-top":h(()=>[m(a.$slots,"doc-top",{},void 0,!0)]),"doc-bottom":h(()=>[m(a.$slots,"doc-bottom",{},void 0,!0)]),"doc-footer-before":h(()=>[m(a.$slots,"doc-footer-before",{},void 0,!0)]),"doc-before":h(()=>[m(a.$slots,"doc-before",{},void 0,!0)]),"doc-after":h(()=>[m(a.$slots,"doc-after",{},void 0,!0)]),"aside-top":h(()=>[m(a.$slots,"aside-top",{},void 0,!0)]),"aside-outline-before":h(()=>[m(a.$slots,"aside-outline-before",{},void 0,!0)]),"aside-outline-after":h(()=>[m(a.$slots,"aside-outline-after",{},void 0,!0)]),"aside-ads-before":h(()=>[m(a.$slots,"aside-ads-before",{},void 0,!0)]),"aside-ads-after":h(()=>[m(a.$slots,"aside-ads-after",{},void 0,!0)]),"aside-bottom":h(()=>[m(a.$slots,"aside-bottom",{},void 0,!0)]),_:3}))],2))}}),ka=x(xa,[["__scopeId","data-v-1428d186"]]),Pa={class:"container"},wa=["innerHTML"],Sa=["innerHTML"],La=g({__name:"VPFooter",setup(n){const{theme:e,frontmatter:t}=A(),{hasSidebar:o}=an();return(a,l)=>c(e).footer&&c(t).footer!==!1?(i(),p("footer",{key:0,class:O(["VPFooter",{"has-sidebar":c(o)}])},[d("div",Pa,[c(e).footer.message?(i(),p("p",{key:0,class:"message",innerHTML:c(e).footer.message},null,8,wa)):_("",!0),c(e).footer.copyright?(i(),p("p",{key:1,class:"copyright",innerHTML:c(e).footer.copyright},null,8,Sa)):_("",!0)])],2)):_("",!0)}}),Ca=x(La,[["__scopeId","data-v-e315a0ad"]]);function Aa(){const{theme:n,frontmatter:e}=A(),t=Jn([]),o=w(()=>t.value.length>0);return Pn(()=>{t.value=En(e.value.outline??n.value.outline)}),{headers:t,hasLocalNav:o}}const Ma={class:"menu-text"},Ta={class:"header"},Ia={class:"outline"},Na=g({__name:"VPLocalNavOutlineDropdown",props:{headers:{},navHeight:{}},setup(n){const e=n,{theme:t}=A(),o=C(!1),a=C(0),l=C(),r=C();function s(f){var S;(S=l.value)!=null&&S.contains(f.target)||(o.value=!1)}en(o,f=>{if(f){document.addEventListener("click",s);return}document.removeEventListener("click",s)}),ye("Escape",()=>{o.value=!1}),Pn(()=>{o.value=!1});function u(){o.value=!o.value,a.value=window.innerHeight+Math.min(window.scrollY-e.navHeight,0)}function v(f){f.target.classList.contains("outline-link")&&(r.value&&(r.value.style.transition="none"),Qn(()=>{o.value=!1}))}function L(){o.value=!1,window.scrollTo({top:0,left:0,behavior:"smooth"})}return(f,S)=>(i(),p("div",{class:"VPLocalNavOutlineDropdown",style:mn({"--vp-vh":a.value+"px"}),ref_key:"main",ref:l},[n.headers.length>0?(i(),p("button",{key:0,onClick:u,class:O({open:o.value})},[d("span",Ma,M(c(oe)(c(t))),1),S[0]||(S[0]=d("span",{class:"vpi-chevron-right icon"},null,-1))],2)):(i(),p("button",{key:1,onClick:L},M(c(t).returnToTopLabel||"Return to top"),1)),b(On,{name:"flyout"},{default:h(()=>[o.value?(i(),p("div",{key:0,ref_key:"items",ref:r,class:"items",onClick:v},[d("div",Ta,[d("a",{class:"top-link",href:"#",onClick:L},M(c(t).returnToTopLabel||"Return to top"),1)]),d("div",Ia,[b(se,{headers:n.headers},null,8,["headers"])])],512)):_("",!0)]),_:1})],4))}}),Oa=x(Na,[["__scopeId","data-v-8a42e2b4"]]),Va={class:"container"},Ba=["aria-expanded"],Fa={class:"menu-text"},Ea=g({__name:"VPLocalNav",props:{open:{type:Boolean}},emits:["open-menu"],setup(n){const{theme:e,frontmatter:t}=A(),{hasSidebar:o}=an(),{headers:a}=Aa(),{y:l}=ne(),r=C(0);X(()=>{r.value=parseInt(getComputedStyle(document.documentElement).getPropertyValue("--vp-nav-height"))}),Pn(()=>{a.value=En(t.value.outline??e.value.outline)});const s=w(()=>a.value.length===0),u=w(()=>s.value&&!o.value),v=w(()=>({VPLocalNav:!0,"has-sidebar":o.value,empty:s.value,fixed:u.value}));return(L,f)=>c(t).layout!=="home"&&(!u.value||c(l)>=r.value)?(i(),p("div",{key:0,class:O(v.value)},[d("div",Va,[c(o)?(i(),p("button",{key:0,class:"menu","aria-expanded":n.open,"aria-controls":"VPSidebarNav",onClick:f[0]||(f[0]=S=>L.$emit("open-menu"))},[f[1]||(f[1]=d("span",{class:"vpi-align-left menu-icon"},null,-1)),d("span",Fa,M(c(e).sidebarMenuLabel||"Menu"),1)],8,Ba)):_("",!0),b(Oa,{headers:c(a),navHeight:r.value},null,8,["headers","navHeight"])])],2)):_("",!0)}}),Ra=x(Ea,[["__scopeId","data-v-a6f0e41e"]]);function za(){const n=C(!1);function e(){n.value=!0,window.addEventListener("resize",a)}function t(){n.value=!1,window.removeEventListener("resize",a)}function o(){n.value?t():e()}function a(){window.outerWidth>=768&&t()}const l=gn();return en(()=>l.path,t),{isScreenOpen:n,openScreen:e,closeScreen:t,toggleScreen:o}}const Ha={},ja={class:"VPSwitch",type:"button",role:"switch"},Ua={class:"check"},Ga={key:0,class:"icon"};function Da(n,e){return i(),p("button",ja,[d("span",Ua,[n.$slots.default?(i(),p("span",Ga,[m(n.$slots,"default",{},void 0,!0)])):_("",!0)])])}const Ya=x(Ha,[["render",Da],["__scopeId","data-v-1d5665e3"]]),qa=g({__name:"VPSwitchAppearance",setup(n){const{isDark:e,theme:t}=A(),o=wn("toggle-appearance",()=>{e.value=!e.value}),a=C("");return Bn(()=>{a.value=e.value?t.value.lightModeSwitchTitle||"Switch to light theme":t.value.darkModeSwitchTitle||"Switch to dark theme"}),(l,r)=>(i(),$(Ya,{title:a.value,class:"VPSwitchAppearance","aria-checked":c(e),onClick:c(o)},{default:h(()=>[...r[0]||(r[0]=[d("span",{class:"vpi-sun sun"},null,-1),d("span",{class:"vpi-moon moon"},null,-1)])]),_:1},8,["title","aria-checked","onClick"]))}}),Rn=x(qa,[["__scopeId","data-v-5337faa4"]]),Xa={key:0,class:"VPNavBarAppearance"},Ka=g({__name:"VPNavBarAppearance",setup(n){const{site:e}=A();return(t,o)=>c(e).appearance&&c(e).appearance!=="force-dark"&&c(e).appearance!=="force-auto"?(i(),p("div",Xa,[b(Rn)])):_("",!0)}}),Wa=x(Ka,[["__scopeId","data-v-6c893767"]]),zn=C();let ie=!1,Cn=0;function Ja(n){const e=C(!1);if(Sn){!ie&&Za(),Cn++;const t=en(zn,o=>{var a,l,r;o===n.el.value||(a=n.el.value)!=null&&a.contains(o)?(e.value=!0,(l=n.onFocus)==null||l.call(n)):(e.value=!1,(r=n.onBlur)==null||r.call(n))});rn(()=>{t(),Cn--,Cn||Qa()})}return $e(e)}function Za(){document.addEventListener("focusin",re),ie=!0,zn.value=document.activeElement}function Qa(){document.removeEventListener("focusin",re)}function re(){zn.value=document.activeElement}const no={class:"VPMenuLink"},eo=["innerHTML"],to=g({__name:"VPMenuLink",props:{item:{}},setup(n){const{page:e}=A();return(t,o)=>(i(),p("div",no,[b(nn,{class:O({active:c(hn)(c(e).relativePath,n.item.activeMatch||n.item.link,!!n.item.activeMatch)}),href:n.item.link,target:n.item.target,rel:n.item.rel,"no-icon":n.item.noIcon},{default:h(()=>[d("span",{innerHTML:n.item.text},null,8,eo)]),_:1},8,["class","href","target","rel","no-icon"])]))}}),Ln=x(to,[["__scopeId","data-v-35975db6"]]),ao={class:"VPMenuGroup"},oo={key:0,class:"title"},so=g({__name:"VPMenuGroup",props:{text:{},items:{}},setup(n){return(e,t)=>(i(),p("div",ao,[n.text?(i(),p("p",oo,M(n.text),1)):_("",!0),(i(!0),p(B,null,U(n.items,o=>(i(),p(B,null,["link"in o?(i(),$(Ln,{key:0,item:o},null,8,["item"])):_("",!0)],64))),256))]))}}),io=x(so,[["__scopeId","data-v-69e747b5"]]),ro={class:"VPMenu"},lo={key:0,class:"items"},co=g({__name:"VPMenu",props:{items:{}},setup(n){return(e,t)=>(i(),p("div",ro,[n.items?(i(),p("div",lo,[(i(!0),p(B,null,U(n.items,o=>(i(),p(B,{key:JSON.stringify(o)},["link"in o?(i(),$(Ln,{key:0,item:o},null,8,["item"])):"component"in o?(i(),$(Q(o.component),sn({key:1,ref_for:!0},o.props),null,16)):(i(),$(io,{key:2,text:o.text,items:o.items},null,8,["text","items"]))],64))),128))])):_("",!0),m(e.$slots,"default",{},void 0,!0)]))}}),uo=x(co,[["__scopeId","data-v-b98bc113"]]),po=["aria-expanded","aria-label"],mo={key:0,class:"text"},ho=["innerHTML"],fo={key:1,class:"vpi-more-horizontal icon"},vo={class:"menu"},_o=g({__name:"VPFlyout",props:{icon:{},button:{},label:{},items:{}},setup(n){const e=C(!1),t=C();Ja({el:t,onBlur:o});function o(){e.value=!1}return(a,l)=>(i(),p("div",{class:"VPFlyout",ref_key:"el",ref:t,onMouseenter:l[1]||(l[1]=r=>e.value=!0),onMouseleave:l[2]||(l[2]=r=>e.value=!1)},[d("button",{type:"button",class:"button","aria-haspopup":"true","aria-expanded":e.value,"aria-label":n.label,onClick:l[0]||(l[0]=r=>e.value=!e.value)},[n.button||n.icon?(i(),p("span",mo,[n.icon?(i(),p("span",{key:0,class:O([n.icon,"option-icon"])},null,2)):_("",!0),n.button?(i(),p("span",{key:1,innerHTML:n.button},null,8,ho)):_("",!0),l[3]||(l[3]=d("span",{class:"vpi-chevron-down text-icon"},null,-1))])):(i(),p("span",fo))],8,po),d("div",vo,[b(uo,{items:n.items},{default:h(()=>[m(a.$slots,"default",{},void 0,!0)]),_:3},8,["items"])])],544))}}),Hn=x(_o,[["__scopeId","data-v-cf11d7a2"]]),go=["href","aria-label","innerHTML"],bo=g({__name:"VPSocialLink",props:{icon:{},link:{},ariaLabel:{}},setup(n){const e=n,t=C();X(async()=>{var l;await Qn();const a=(l=t.value)==null?void 0:l.children[0];a instanceof HTMLElement&&a.className.startsWith("vpi-social-")&&(getComputedStyle(a).maskImage||getComputedStyle(a).webkitMaskImage)==="none"&&a.style.setProperty("--icon",`url('https://api.iconify.design/simple-icons/${e.icon}.svg')`)});const o=w(()=>typeof e.icon=="object"?e.icon.svg:`<span class="vpi-social-${e.icon}"></span>`);return(a,l)=>(i(),p("a",{ref_key:"el",ref:t,class:"VPSocialLink no-icon",href:n.link,"aria-label":n.ariaLabel??(typeof n.icon=="string"?n.icon:""),target:"_blank",rel:"noopener",innerHTML:o.value},null,8,go))}}),yo=x(bo,[["__scopeId","data-v-bd121fe5"]]),$o={class:"VPSocialLinks"},xo=g({__name:"VPSocialLinks",props:{links:{}},setup(n){return(e,t)=>(i(),p("div",$o,[(i(!0),p(B,null,U(n.links,({link:o,icon:a,ariaLabel:l})=>(i(),$(yo,{key:o,icon:a,link:o,ariaLabel:l},null,8,["icon","link","ariaLabel"]))),128))]))}}),jn=x(xo,[["__scopeId","data-v-7bc22406"]]),ko={key:0,class:"group translations"},Po={class:"trans-title"},wo={key:1,class:"group"},So={class:"item appearance"},Lo={class:"label"},Co={class:"appearance-action"},Ao={key:2,class:"group"},Mo={class:"item social-links"},To=g({__name:"VPNavBarExtra",setup(n){const{site:e,theme:t}=A(),{localeLinks:o,currentLang:a}=bn({correspondingLink:!0}),l=w(()=>o.value.length&&a.value.label||e.value.appearance||t.value.socialLinks);return(r,s)=>l.value?(i(),$(Hn,{key:0,class:"VPNavBarExtra",label:"extra navigation"},{default:h(()=>[c(o).length&&c(a).label?(i(),p("div",ko,[d("p",Po,M(c(a).label),1),(i(!0),p(B,null,U(c(o),u=>(i(),$(Ln,{key:u.link,item:u},null,8,["item"]))),128))])):_("",!0),c(e).appearance&&c(e).appearance!=="force-dark"&&c(e).appearance!=="force-auto"?(i(),p("div",wo,[d("div",So,[d("p",Lo,M(c(t).darkModeSwitchLabel||"Appearance"),1),d("div",Co,[b(Rn)])])])):_("",!0),c(t).socialLinks?(i(),p("div",Ao,[d("div",Mo,[b(jn,{class:"social-links-list",links:c(t).socialLinks},null,8,["links"])])])):_("",!0)]),_:1})):_("",!0)}}),Io=x(To,[["__scopeId","data-v-bb2aa2f0"]]),No=["aria-expanded"],Oo=g({__name:"VPNavBarHamburger",props:{active:{type:Boolean}},emits:["click"],setup(n){return(e,t)=>(i(),p("button",{type:"button",class:O(["VPNavBarHamburger",{active:n.active}]),"aria-label":"mobile navigation","aria-expanded":n.active,"aria-controls":"VPNavScreen",onClick:t[0]||(t[0]=o=>e.$emit("click"))},[...t[1]||(t[1]=[d("span",{class:"container"},[d("span",{class:"top"}),d("span",{class:"middle"}),d("span",{class:"bottom"})],-1)])],10,No))}}),Vo=x(Oo,[["__scopeId","data-v-e5dd9c1c"]]),Bo=["innerHTML"],Fo=g({__name:"VPNavBarMenuLink",props:{item:{}},setup(n){const{page:e}=A();return(t,o)=>(i(),$(nn,{class:O({VPNavBarMenuLink:!0,active:c(hn)(c(e).relativePath,n.item.activeMatch||n.item.link,!!n.item.activeMatch)}),href:n.item.link,target:n.item.target,rel:n.item.rel,"no-icon":n.item.noIcon,tabindex:"0"},{default:h(()=>[d("span",{innerHTML:n.item.text},null,8,Bo)]),_:1},8,["class","href","target","rel","no-icon"]))}}),Eo=x(Fo,[["__scopeId","data-v-e56f3d57"]]),Ro=g({__name:"VPNavBarMenuGroup",props:{item:{}},setup(n){const e=n,{page:t}=A(),o=l=>"component"in l?!1:"link"in l?hn(t.value.relativePath,l.link,!!e.item.activeMatch):l.items.some(o),a=w(()=>o(e.item));return(l,r)=>(i(),$(Hn,{class:O({VPNavBarMenuGroup:!0,active:c(hn)(c(t).relativePath,n.item.activeMatch,!!n.item.activeMatch)||a.value}),button:n.item.text,items:n.item.items},null,8,["class","button","items"]))}}),zo={key:0,"aria-labelledby":"main-nav-aria-label",class:"VPNavBarMenu"},Ho=g({__name:"VPNavBarMenu",setup(n){const{theme:e}=A();return(t,o)=>c(e).nav?(i(),p("nav",zo,[o[0]||(o[0]=d("span",{id:"main-nav-aria-label",class:"visually-hidden"}," Main Navigation ",-1)),(i(!0),p(B,null,U(c(e).nav,a=>(i(),p(B,{key:JSON.stringify(a)},["link"in a?(i(),$(Eo,{key:0,item:a},null,8,["item"])):"component"in a?(i(),$(Q(a.component),sn({key:1,ref_for:!0},a.props),null,16)):(i(),$(Ro,{key:2,item:a},null,8,["item"]))],64))),128))])):_("",!0)}}),jo=x(Ho,[["__scopeId","data-v-dc692963"]]);function Uo(n){const{localeIndex:e,theme:t}=A();function o(a){var F,T,R;const l=a.split("."),r=(F=t.value.search)==null?void 0:F.options,s=r&&typeof r=="object",u=s&&((R=(T=r.locales)==null?void 0:T[e.value])==null?void 0:R.translations)||null,v=s&&r.translations||null;let L=u,f=v,S=n;const N=l.pop();for(const G of l){let W=null;const Z=S==null?void 0:S[G];Z&&(W=S=Z);const cn=f==null?void 0:f[G];cn&&(W=f=cn);const dn=L==null?void 0:L[G];dn&&(W=L=dn),Z||(S=W),cn||(f=W),dn||(L=W)}return(L==null?void 0:L[N])??(f==null?void 0:f[N])??(S==null?void 0:S[N])??""}return o}const Go=["aria-label"],Do={class:"DocSearch-Button-Container"},Yo={class:"DocSearch-Button-Placeholder"},qn=g({__name:"VPNavBarSearchButton",setup(n){const t=Uo({button:{buttonText:"Search",buttonAriaLabel:"Search"}});return(o,a)=>(i(),p("button",{type:"button",class:"DocSearch DocSearch-Button","aria-label":c(t)("button.buttonAriaLabel")},[d("span",Do,[a[0]||(a[0]=d("span",{class:"vp-icon DocSearch-Search-Icon"},null,-1)),d("span",Yo,M(c(t)("button.buttonText")),1)]),a[1]||(a[1]=d("span",{class:"DocSearch-Button-Keys"},[d("kbd",{class:"DocSearch-Button-Key"}),d("kbd",{class:"DocSearch-Button-Key"},"K")],-1))],8,Go))}}),qo={class:"VPNavBarSearch"},Xo={id:"local-search"},Ko={key:1,id:"docsearch"},Wo=g({__name:"VPNavBarSearch",setup(n){const e=()=>null,t=()=>null,{theme:o}=A(),a=C(!1),l=C(!1);X(()=>{});function r(){a.value||(a.value=!0,setTimeout(s,16))}function s(){const L=new Event("keydown");L.key="k",L.metaKey=!0,window.dispatchEvent(L),setTimeout(()=>{document.querySelector(".DocSearch-Modal")||s()},16)}const u=C(!1),v="";return(L,f)=>{var S;return i(),p("div",qo,[c(v)==="local"?(i(),p(B,{key:0},[u.value?(i(),$(c(e),{key:0,onClose:f[0]||(f[0]=N=>u.value=!1)})):_("",!0),d("div",Xo,[b(qn,{onClick:f[1]||(f[1]=N=>u.value=!0)})])],64)):c(v)==="algolia"?(i(),p(B,{key:1},[a.value?(i(),$(c(t),{key:0,algolia:((S=c(o).search)==null?void 0:S.options)??c(o).algolia,onVnodeBeforeMount:f[2]||(f[2]=N=>l.value=!0)},null,8,["algolia"])):_("",!0),l.value?_("",!0):(i(),p("div",Ko,[b(qn,{onClick:r})]))],64)):_("",!0)])}}}),Jo=g({__name:"VPNavBarSocialLinks",setup(n){const{theme:e}=A();return(t,o)=>c(e).socialLinks?(i(),$(jn,{key:0,class:"VPNavBarSocialLinks",links:c(e).socialLinks},null,8,["links"])):_("",!0)}}),Zo=x(Jo,[["__scopeId","data-v-0394ad82"]]),Qo=["href","rel","target"],ns=["innerHTML"],es={key:2},ts=g({__name:"VPNavBarTitle",setup(n){const{site:e,theme:t}=A(),{hasSidebar:o}=an(),{currentLang:a}=bn(),l=w(()=>{var u;return typeof t.value.logoLink=="string"?t.value.logoLink:(u=t.value.logoLink)==null?void 0:u.link}),r=w(()=>{var u;return typeof t.value.logoLink=="string"||(u=t.value.logoLink)==null?void 0:u.rel}),s=w(()=>{var u;return typeof t.value.logoLink=="string"||(u=t.value.logoLink)==null?void 0:u.target});return(u,v)=>(i(),p("div",{class:O(["VPNavBarTitle",{"has-sidebar":c(o)}])},[d("a",{class:"title",href:l.value??c(Fn)(c(a).link),rel:r.value,target:s.value},[m(u.$slots,"nav-bar-title-before",{},void 0,!0),c(t).logo?(i(),$(xn,{key:0,class:"logo",image:c(t).logo},null,8,["image"])):_("",!0),c(t).siteTitle?(i(),p("span",{key:1,innerHTML:c(t).siteTitle},null,8,ns)):c(t).siteTitle===void 0?(i(),p("span",es,M(c(e).title),1)):_("",!0),m(u.$slots,"nav-bar-title-after",{},void 0,!0)],8,Qo)],2))}}),as=x(ts,[["__scopeId","data-v-1168a8e4"]]),os={class:"items"},ss={class:"title"},is=g({__name:"VPNavBarTranslations",setup(n){const{theme:e}=A(),{localeLinks:t,currentLang:o}=bn({correspondingLink:!0});return(a,l)=>c(t).length&&c(o).label?(i(),$(Hn,{key:0,class:"VPNavBarTranslations",icon:"vpi-languages",label:c(e).langMenuLabel||"Change language"},{default:h(()=>[d("div",os,[d("p",ss,M(c(o).label),1),(i(!0),p(B,null,U(c(t),r=>(i(),$(Ln,{key:r.link,item:r},null,8,["item"]))),128))])]),_:1},8,["label"])):_("",!0)}}),rs=x(is,[["__scopeId","data-v-88af2de4"]]),ls={class:"wrapper"},cs={class:"container"},ds={class:"title"},us={class:"content"},ps={class:"content-body"},ms=g({__name:"VPNavBar",props:{isScreenOpen:{type:Boolean}},emits:["toggle-screen"],setup(n){const e=n,{y:t}=ne(),{hasSidebar:o}=an(),{frontmatter:a}=A(),l=C({});return Bn(()=>{l.value={"has-sidebar":o.value,home:a.value.layout==="home",top:t.value===0,"screen-open":e.isScreenOpen}}),(r,s)=>(i(),p("div",{class:O(["VPNavBar",l.value])},[d("div",ls,[d("div",cs,[d("div",ds,[b(as,null,{"nav-bar-title-before":h(()=>[m(r.$slots,"nav-bar-title-before",{},void 0,!0)]),"nav-bar-title-after":h(()=>[m(r.$slots,"nav-bar-title-after",{},void 0,!0)]),_:3})]),d("div",us,[d("div",ps,[m(r.$slots,"nav-bar-content-before",{},void 0,!0),b(Wo,{class:"search"}),b(jo,{class:"menu"}),b(rs,{class:"translations"}),b(Wa,{class:"appearance"}),b(Zo,{class:"social-links"}),b(Io,{class:"extra"}),m(r.$slots,"nav-bar-content-after",{},void 0,!0),b(Vo,{class:"hamburger",active:n.isScreenOpen,onClick:s[0]||(s[0]=u=>r.$emit("toggle-screen"))},null,8,["active"])])])])]),s[1]||(s[1]=d("div",{class:"divider"},[d("div",{class:"divider-line"})],-1))],2))}}),hs=x(ms,[["__scopeId","data-v-6aa21345"]]),fs={key:0,class:"VPNavScreenAppearance"},vs={class:"text"},_s=g({__name:"VPNavScreenAppearance",setup(n){const{site:e,theme:t}=A();return(o,a)=>c(e).appearance&&c(e).appearance!=="force-dark"&&c(e).appearance!=="force-auto"?(i(),p("div",fs,[d("p",vs,M(c(t).darkModeSwitchLabel||"Appearance"),1),b(Rn)])):_("",!0)}}),gs=x(_s,[["__scopeId","data-v-b44890b2"]]),bs=["innerHTML"],ys=g({__name:"VPNavScreenMenuLink",props:{item:{}},setup(n){const e=wn("close-screen");return(t,o)=>(i(),$(nn,{class:"VPNavScreenMenuLink",href:n.item.link,target:n.item.target,rel:n.item.rel,"no-icon":n.item.noIcon,onClick:c(e)},{default:h(()=>[d("span",{innerHTML:n.item.text},null,8,bs)]),_:1},8,["href","target","rel","no-icon","onClick"]))}}),$s=x(ys,[["__scopeId","data-v-df37e6dd"]]),xs=["innerHTML"],ks=g({__name:"VPNavScreenMenuGroupLink",props:{item:{}},setup(n){const e=wn("close-screen");return(t,o)=>(i(),$(nn,{class:"VPNavScreenMenuGroupLink",href:n.item.link,target:n.item.target,rel:n.item.rel,"no-icon":n.item.noIcon,onClick:c(e)},{default:h(()=>[d("span",{innerHTML:n.item.text},null,8,xs)]),_:1},8,["href","target","rel","no-icon","onClick"]))}}),le=x(ks,[["__scopeId","data-v-3e9c20e4"]]),Ps={class:"VPNavScreenMenuGroupSection"},ws={key:0,class:"title"},Ss=g({__name:"VPNavScreenMenuGroupSection",props:{text:{},items:{}},setup(n){return(e,t)=>(i(),p("div",Ps,[n.text?(i(),p("p",ws,M(n.text),1)):_("",!0),(i(!0),p(B,null,U(n.items,o=>(i(),$(le,{key:o.text,item:o},null,8,["item"]))),128))]))}}),Ls=x(Ss,[["__scopeId","data-v-8133b170"]]),Cs=["aria-controls","aria-expanded"],As=["innerHTML"],Ms=["id"],Ts={key:0,class:"item"},Is={key:1,class:"item"},Ns={key:2,class:"group"},Os=g({__name:"VPNavScreenMenuGroup",props:{text:{},items:{}},setup(n){const e=n,t=C(!1),o=w(()=>`NavScreenGroup-${e.text.replace(" ","-").toLowerCase()}`);function a(){t.value=!t.value}return(l,r)=>(i(),p("div",{class:O(["VPNavScreenMenuGroup",{open:t.value}])},[d("button",{class:"button","aria-controls":o.value,"aria-expanded":t.value,onClick:a},[d("span",{class:"button-text",innerHTML:n.text},null,8,As),r[0]||(r[0]=d("span",{class:"vpi-plus button-icon"},null,-1))],8,Cs),d("div",{id:o.value,class:"items"},[(i(!0),p(B,null,U(n.items,s=>(i(),p(B,{key:JSON.stringify(s)},["link"in s?(i(),p("div",Ts,[b(le,{item:s},null,8,["item"])])):"component"in s?(i(),p("div",Is,[(i(),$(Q(s.component),sn({ref_for:!0},s.props,{"screen-menu":""}),null,16))])):(i(),p("div",Ns,[b(Ls,{text:s.text,items:s.items},null,8,["text","items"])]))],64))),128))],8,Ms)],2))}}),Vs=x(Os,[["__scopeId","data-v-b9ab8c58"]]),Bs={key:0,class:"VPNavScreenMenu"},Fs=g({__name:"VPNavScreenMenu",setup(n){const{theme:e}=A();return(t,o)=>c(e).nav?(i(),p("nav",Bs,[(i(!0),p(B,null,U(c(e).nav,a=>(i(),p(B,{key:JSON.stringify(a)},["link"in a?(i(),$($s,{key:0,item:a},null,8,["item"])):"component"in a?(i(),$(Q(a.component),sn({key:1,ref_for:!0},a.props,{"screen-menu":""}),null,16)):(i(),$(Vs,{key:2,text:a.text||"",items:a.items},null,8,["text","items"]))],64))),128))])):_("",!0)}}),Es=g({__name:"VPNavScreenSocialLinks",setup(n){const{theme:e}=A();return(t,o)=>c(e).socialLinks?(i(),$(jn,{key:0,class:"VPNavScreenSocialLinks",links:c(e).socialLinks},null,8,["links"])):_("",!0)}}),Rs={class:"list"},zs=g({__name:"VPNavScreenTranslations",setup(n){const{localeLinks:e,currentLang:t}=bn({correspondingLink:!0}),o=C(!1);function a(){o.value=!o.value}return(l,r)=>c(e).length&&c(t).label?(i(),p("div",{key:0,class:O(["VPNavScreenTranslations",{open:o.value}])},[d("button",{class:"title",onClick:a},[r[0]||(r[0]=d("span",{class:"vpi-languages icon lang"},null,-1)),tn(" "+M(c(t).label)+" ",1),r[1]||(r[1]=d("span",{class:"vpi-chevron-down icon chevron"},null,-1))]),d("ul",Rs,[(i(!0),p(B,null,U(c(e),s=>(i(),p("li",{key:s.link,class:"item"},[b(nn,{class:"link",href:s.link},{default:h(()=>[tn(M(s.text),1)]),_:2},1032,["href"])]))),128))])],2)):_("",!0)}}),Hs=x(zs,[["__scopeId","data-v-858fe1a4"]]),js={class:"container"},Us=g({__name:"VPNavScreen",props:{open:{type:Boolean}},setup(n){const e=C(null),t=ee(Sn?document.body:null);return(o,a)=>(i(),$(On,{name:"fade",onEnter:a[0]||(a[0]=l=>t.value=!0),onAfterLeave:a[1]||(a[1]=l=>t.value=!1)},{default:h(()=>[n.open?(i(),p("div",{key:0,class:"VPNavScreen",ref_key:"screen",ref:e,id:"VPNavScreen"},[d("div",js,[m(o.$slots,"nav-screen-content-before",{},void 0,!0),b(Fs,{class:"menu"}),b(Hs,{class:"translations"}),b(gs,{class:"appearance"}),b(Es,{class:"social-links"}),m(o.$slots,"nav-screen-content-after",{},void 0,!0)])],512)):_("",!0)]),_:3}))}}),Gs=x(Us,[["__scopeId","data-v-f2779853"]]),Ds={key:0,class:"VPNav"},Ys=g({__name:"VPNav",setup(n){const{isScreenOpen:e,closeScreen:t,toggleScreen:o}=za(),{frontmatter:a}=A(),l=w(()=>a.value.navbar!==!1);return te("close-screen",t),kn(()=>{Sn&&document.documentElement.classList.toggle("hide-nav",!l.value)}),(r,s)=>l.value?(i(),p("header",Ds,[b(hs,{"is-screen-open":c(e),onToggleScreen:c(o)},{"nav-bar-title-before":h(()=>[m(r.$slots,"nav-bar-title-before",{},void 0,!0)]),"nav-bar-title-after":h(()=>[m(r.$slots,"nav-bar-title-after",{},void 0,!0)]),"nav-bar-content-before":h(()=>[m(r.$slots,"nav-bar-content-before",{},void 0,!0)]),"nav-bar-content-after":h(()=>[m(r.$slots,"nav-bar-content-after",{},void 0,!0)]),_:3},8,["is-screen-open","onToggleScreen"]),b(Gs,{open:c(e)},{"nav-screen-content-before":h(()=>[m(r.$slots,"nav-screen-content-before",{},void 0,!0)]),"nav-screen-content-after":h(()=>[m(r.$slots,"nav-screen-content-after",{},void 0,!0)]),_:3},8,["open"])])):_("",!0)}}),qs=x(Ys,[["__scopeId","data-v-ae24b3ad"]]),Xs=["role","tabindex"],Ks={key:1,class:"items"},Ws=g({__name:"VPSidebarItem",props:{item:{},depth:{}},setup(n){const e=n,{collapsed:t,collapsible:o,isLink:a,isActiveLink:l,hasActiveLink:r,hasChildren:s,toggle:u}=Ge(w(()=>e.item)),v=w(()=>s.value?"section":"div"),L=w(()=>a.value?"a":"div"),f=w(()=>s.value?e.depth+2===7?"p":`h${e.depth+2}`:"p"),S=w(()=>a.value?void 0:"button"),N=w(()=>[[`level-${e.depth}`],{collapsible:o.value},{collapsed:t.value},{"is-link":a.value},{"is-active":l.value},{"has-active":r.value}]);function F(R){"key"in R&&R.key!=="Enter"||!e.item.link&&u()}function T(){e.item.link&&u()}return(R,G)=>{const W=ln("VPSidebarItem",!0);return i(),$(Q(v.value),{class:O(["VPSidebarItem",N.value])},{default:h(()=>[n.item.text?(i(),p("div",sn({key:0,class:"item",role:S.value},xe(n.item.items?{click:F,keydown:F}:{},!0),{tabindex:n.item.items&&0}),[G[1]||(G[1]=d("div",{class:"indicator"},null,-1)),n.item.link?(i(),$(nn,{key:0,tag:L.value,class:"link",href:n.item.link,rel:n.item.rel,target:n.item.target},{default:h(()=>[(i(),$(Q(f.value),{class:"text",innerHTML:n.item.text},null,8,["innerHTML"]))]),_:1},8,["tag","href","rel","target"])):(i(),$(Q(f.value),{key:1,class:"text",innerHTML:n.item.text},null,8,["innerHTML"])),n.item.collapsed!=null&&n.item.items&&n.item.items.length?(i(),p("div",{key:2,class:"caret",role:"button","aria-label":"toggle section",onClick:T,onKeydown:ke(T,["enter"]),tabindex:"0"},[...G[0]||(G[0]=[d("span",{class:"vpi-chevron-right caret-icon"},null,-1)])],32)):_("",!0)],16,Xs)):_("",!0),n.item.items&&n.item.items.length?(i(),p("div",Ks,[n.depth<5?(i(!0),p(B,{key:0},U(n.item.items,Z=>(i(),$(W,{key:Z.text,item:Z,depth:n.depth+1},null,8,["item","depth"]))),128)):_("",!0)])):_("",!0)]),_:1},8,["class"])}}}),Js=x(Ws,[["__scopeId","data-v-b3fd67f8"]]),Zs=g({__name:"VPSidebarGroup",props:{items:{}},setup(n){const e=C(!0);let t=null;return X(()=>{t=setTimeout(()=>{t=null,e.value=!1},300)}),Pe(()=>{t!=null&&(clearTimeout(t),t=null)}),(o,a)=>(i(!0),p(B,null,U(n.items,l=>(i(),p("div",{key:l.text,class:O(["group",{"no-transition":e.value}])},[b(Js,{item:l,depth:0},null,8,["item"])],2))),128))}}),Qs=x(Zs,[["__scopeId","data-v-c40bc020"]]),ni={class:"nav",id:"VPSidebarNav","aria-labelledby":"sidebar-aria-label",tabindex:"-1"},ei=g({__name:"VPSidebar",props:{open:{type:Boolean}},setup(n){const{sidebarGroups:e,hasSidebar:t}=an(),o=n,a=C(null),l=ee(Sn?document.body:null);en([o,a],()=>{var s;o.open?(l.value=!0,(s=a.value)==null||s.focus()):l.value=!1},{immediate:!0,flush:"post"});const r=C(0);return en(e,()=>{r.value+=1},{deep:!0}),(s,u)=>c(t)?(i(),p("aside",{key:0,class:O(["VPSidebar",{open:n.open}]),ref_key:"navEl",ref:a,onClick:u[0]||(u[0]=we(()=>{},["stop"]))},[u[2]||(u[2]=d("div",{class:"curtain"},null,-1)),d("nav",ni,[u[1]||(u[1]=d("span",{class:"visually-hidden",id:"sidebar-aria-label"}," Sidebar Navigation ",-1)),m(s.$slots,"sidebar-nav-before",{},void 0,!0),(i(),$(Qs,{items:c(e),key:r.value},null,8,["items"])),m(s.$slots,"sidebar-nav-after",{},void 0,!0)])],2)):_("",!0)}}),ti=x(ei,[["__scopeId","data-v-319d5ca6"]]),ai=g({__name:"VPSkipLink",setup(n){const{theme:e}=A(),t=gn(),o=C();en(()=>t.path,()=>o.value.focus());function a({target:l}){const r=document.getElementById(decodeURIComponent(l.hash).slice(1));if(r){const s=()=>{r.removeAttribute("tabindex"),r.removeEventListener("blur",s)};r.setAttribute("tabindex","-1"),r.addEventListener("blur",s),r.focus(),window.scrollTo(0,0)}}return(l,r)=>(i(),p(B,null,[d("span",{ref_key:"backToTop",ref:o,tabindex:"-1"},null,512),d("a",{href:"#VPContent",class:"VPSkipLink visually-hidden",onClick:a},M(c(e).skipToContentLabel||"Skip to content"),1)],64))}}),oi=x(ai,[["__scopeId","data-v-0b0ada53"]]),si=g({__name:"Layout",setup(n){const{isOpen:e,open:t,close:o}=an(),a=gn();en(()=>a.path,o),Ue(e,o);const{frontmatter:l}=A(),r=Se(),s=w(()=>!!r["home-hero-image"]);return te("hero-image-slot-exists",s),(u,v)=>{const L=ln("Content");return c(l).layout!==!1?(i(),p("div",{key:0,class:O(["Layout",c(l).pageClass])},[m(u.$slots,"layout-top",{},void 0,!0),b(oi),b(Me,{class:"backdrop",show:c(e),onClick:c(o)},null,8,["show","onClick"]),b(qs,null,{"nav-bar-title-before":h(()=>[m(u.$slots,"nav-bar-title-before",{},void 0,!0)]),"nav-bar-title-after":h(()=>[m(u.$slots,"nav-bar-title-after",{},void 0,!0)]),"nav-bar-content-before":h(()=>[m(u.$slots,"nav-bar-content-before",{},void 0,!0)]),"nav-bar-content-after":h(()=>[m(u.$slots,"nav-bar-content-after",{},void 0,!0)]),"nav-screen-content-before":h(()=>[m(u.$slots,"nav-screen-content-before",{},void 0,!0)]),"nav-screen-content-after":h(()=>[m(u.$slots,"nav-screen-content-after",{},void 0,!0)]),_:3}),b(Ra,{open:c(e),onOpenMenu:c(t)},null,8,["open","onOpenMenu"]),b(ti,{open:c(e)},{"sidebar-nav-before":h(()=>[m(u.$slots,"sidebar-nav-before",{},void 0,!0)]),"sidebar-nav-after":h(()=>[m(u.$slots,"sidebar-nav-after",{},void 0,!0)]),_:3},8,["open"]),b(ka,null,{"page-top":h(()=>[m(u.$slots,"page-top",{},void 0,!0)]),"page-bottom":h(()=>[m(u.$slots,"page-bottom",{},void 0,!0)]),"not-found":h(()=>[m(u.$slots,"not-found",{},void 0,!0)]),"home-hero-before":h(()=>[m(u.$slots,"home-hero-before",{},void 0,!0)]),"home-hero-info-before":h(()=>[m(u.$slots,"home-hero-info-before",{},void 0,!0)]),"home-hero-info":h(()=>[m(u.$slots,"home-hero-info",{},void 0,!0)]),"home-hero-info-after":h(()=>[m(u.$slots,"home-hero-info-after",{},void 0,!0)]),"home-hero-actions-after":h(()=>[m(u.$slots,"home-hero-actions-after",{},void 0,!0)]),"home-hero-image":h(()=>[m(u.$slots,"home-hero-image",{},void 0,!0)]),"home-hero-after":h(()=>[m(u.$slots,"home-hero-after",{},void 0,!0)]),"home-features-before":h(()=>[m(u.$slots,"home-features-before",{},void 0,!0)]),"home-features-after":h(()=>[m(u.$slots,"home-features-after",{},void 0,!0)]),"doc-footer-before":h(()=>[m(u.$slots,"doc-footer-before",{},void 0,!0)]),"doc-before":h(()=>[m(u.$slots,"doc-before",{},void 0,!0)]),"doc-after":h(()=>[m(u.$slots,"doc-after",{},void 0,!0)]),"doc-top":h(()=>[m(u.$slots,"doc-top",{},void 0,!0)]),"doc-bottom":h(()=>[m(u.$slots,"doc-bottom",{},void 0,!0)]),"aside-top":h(()=>[m(u.$slots,"aside-top",{},void 0,!0)]),"aside-bottom":h(()=>[m(u.$slots,"aside-bottom",{},void 0,!0)]),"aside-outline-before":h(()=>[m(u.$slots,"aside-outline-before",{},void 0,!0)]),"aside-outline-after":h(()=>[m(u.$slots,"aside-outline-after",{},void 0,!0)]),"aside-ads-before":h(()=>[m(u.$slots,"aside-ads-before",{},void 0,!0)]),"aside-ads-after":h(()=>[m(u.$slots,"aside-ads-after",{},void 0,!0)]),_:3}),b(Ca),m(u.$slots,"layout-bottom",{},void 0,!0)],2)):(i(),$(L,{key:1}))}}}),ii=x(si,[["__scopeId","data-v-5d98c3a5"]]),ce={Layout:ii,enhanceApp:({app:n})=>{n.component("Badge",Le)}},ri=80,li=10,ci=g({__name:"ClickParticles",setup(n){const e=C(),t={maxLength:48,maxWidth:6,minWidth:1.2,decay:.03,spacing:2,glowBlur:10},o=["#2563eb","#3b82f6","#60a5fa","#38bdf8","#0ea5e9"];let a=null,l=0,r=!1;const s=[],u=[],v=[];let L=0,f=0,S=!1;function N(k){return 1-(1-k)**3}function F(){return o[Math.floor(Math.random()*o.length)]}function T(){e.value&&(e.value.width=window.innerWidth,e.value.height=window.innerHeight)}function R(k){if(r)return;if(!S){L=k.clientX,f=k.clientY,S=!0,s.push({x:k.clientX,y:k.clientY,alpha:1});return}const z=k.clientX-L,E=k.clientY-f,I=Math.hypot(z,E);if(I<t.spacing)return;const H=Math.max(1,Math.ceil(I/t.spacing));for(let Y=1;Y<=H;Y++){const D=Y/H;s.push({x:L+z*D,y:f+E*D,alpha:1})}for(;s.length>t.maxLength;)s.shift();L=k.clientX,f=k.clientY}function G(k){if(r)return;const z=performance.now(),E=[{maxRadius:42,duration:520,hue:210,waveFreq:6},{maxRadius:60,duration:580,hue:220,waveFreq:8}];for(const H of E)u.length>=li&&u.shift(),u.push({x:k.clientX,y:k.clientY,birthTime:z,duration:H.duration,maxRadius:H.maxRadius,hue:H.hue,waveFreq:H.waveFreq,phase:Math.random()*Math.PI*2});const I=14;for(let H=0;H<I;H++)v.length>=ri&&v.shift(),v.push({x:k.clientX,y:k.clientY,angle:Math.PI*2*H/I+(Math.random()-.5)*.4,birthTime:z,duration:650+Math.random()*200,size:2.4+Math.random()*4.8,speed:1.5+Math.random()*2.1,color:F(),spin:(Math.random()-.5)*.2})}function W(){for(let k=s.length-1;k>=0;k--)s[k].alpha-=t.decay,s[k].alpha<=.01&&s.splice(k,1)}function Z(){if(!a||s.length<2)return;a.lineCap="round",a.lineJoin="round";const k=s.length;for(let z=1;z<k;z++){const E=s[z-1],I=s[z],H=z/(k-1),Y=I.alpha*H;if(Y<=.01)continue;const D=t.minWidth+(t.maxWidth-t.minWidth)*H*I.alpha,J=a.createLinearGradient(E.x,E.y,I.x,I.y);if(J.addColorStop(0,`rgba(59, 130, 246, ${Y*.4})`),J.addColorStop(.5,`rgba(96, 165, 250, ${Y*.85})`),J.addColorStop(1,`rgba(191, 219, 254, ${Y})`),a.beginPath(),a.moveTo(E.x,E.y),z<k-1){const V=s[z+1],y=(I.x+V.x)*.5,P=(I.y+V.y)*.5;a.quadraticCurveTo(I.x,I.y,y,P)}else a.lineTo(I.x,I.y);a.strokeStyle=J,a.lineWidth=D,z===k-1?(a.shadowColor="rgba(96, 165, 250, 0.95)",a.shadowBlur=t.glowBlur):a.shadowBlur=0,a.stroke()}a.shadowBlur=0,a.globalAlpha=1}function cn(k,z){if(!a)return;const E=(z-k.birthTime)/k.duration;if(E>=1)return;const I=k.maxRadius*N(E),H=(1-E)*.6,Y=64;a.beginPath();for(let D=0;D<=Y;D++){const J=D/Y*Math.PI*2,V=Math.sin(J*k.waveFreq+k.phase+E*6)*(1.8+E*2.4),y=I+V,P=k.x+Math.cos(J)*y,j=k.y+Math.sin(J)*y;D===0?a.moveTo(P,j):a.lineTo(P,j)}a.closePath(),a.strokeStyle=`hsla(${k.hue}, 88%, 62%, ${H})`,a.lineWidth=1.5*(1-E*.5),a.stroke()}function dn(k,z){if(!a)return;const E=(z-k.birthTime)/k.duration;if(E>=1)return;const H=N(E)*k.speed*24,Y=1-E,D=k.size*(1-E*.7),J=k.angle+k.spin*E*10,V=k.x+Math.cos(k.angle)*H,y=k.y+Math.sin(k.angle)*H;a.save(),a.translate(V,y),a.rotate(J),a.globalAlpha=Y,a.fillStyle=k.color,a.beginPath(),a.moveTo(0,-D),a.lineTo(D*.866,D*.5),a.lineTo(-D*.866,D*.5),a.closePath(),a.fill(),a.restore(),a.globalAlpha=1}function fn(k){if(!a||!e.value)return;const z=e.value.width,E=e.value.height;if(a.clearRect(0,0,z,E),!r){W(),Z();for(let I=u.length-1;I>=0;I--){if((k-u[I].birthTime)/u[I].duration>=1){u.splice(I,1);continue}cn(u[I],k)}for(let I=v.length-1;I>=0;I--){if((k-v[I].birthTime)/v[I].duration>=1){v.splice(I,1);continue}dn(v[I],k)}}l=requestAnimationFrame(fn)}return X(()=>{e.value&&(r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,a=e.value.getContext("2d"),T(),window.addEventListener("resize",T),r||(window.addEventListener("mousemove",R),window.addEventListener("click",G)),l=requestAnimationFrame(fn))}),rn(()=>{cancelAnimationFrame(l),window.removeEventListener("resize",T),window.removeEventListener("mousemove",R),window.removeEventListener("click",G),s.length=0,u.length=0,v.length=0,S=!1}),(k,z)=>(i(),p("canvas",{ref_key:"canvasRef",ref:e,class:"click-canvas"},null,512))}}),di=x(ci,[["__scopeId","data-v-55f26bec"]]),ui="/uzquneen.jpg",pn=C(!1),on=C(0);function pi(){pn.value=!0,on.value=0}function mi(n){on.value=Math.min(1,Math.max(0,n))}function hi(){pn.value=!1,on.value=1}const fi={class:"hero"},vi={class:"hero__body"},_i=g({__name:"HomeHero",setup(n){const e=[{class:"hero__shape--1"},{class:"hero__shape--2"},{class:"hero__shape--3"},{class:"hero__shape--4"}],t=w(()=>{if(!pn.value)return .35;const s=on.value;return s<.48?.35:.15+s*.2}),o=w(()=>{if(!pn.value)return 1;const s=on.value;return s<.48?0:s>=.68?1:(s-.48)/.2}),a=w(()=>{if(!pn.value)return 1;const s=on.value;return s<.48?0:Math.min(1,(s-.48)*2.5)}),l=w(()=>{if(!pn.value)return 1;const s=on.value;return s<.55?0:s>=.85?1:(s-.55)/.3}),r=w(()=>!pn.value||on.value>=.55);return(s,u)=>(i(),p("section",fi,[d("div",{class:"hero__bg","aria-hidden":"true",style:mn({filter:`brightness(${t.value})`,opacity:o.value})},null,4),d("ul",{class:"hero__shapes","aria-hidden":"true",style:mn({opacity:a.value})},[(i(),p(B,null,U(e,v=>d("li",{key:v.class,class:O(["hero__shape",v.class])},null,2)),64))],4),d("div",vi,[d("div",{class:O(["hero__content",{"hero__content--revealed":r.value}]),style:mn({opacity:l.value})},[...u[0]||(u[0]=[Yn('<div class="hero__avatar" data-v-66fc3bd9><img src="'+ui+'" alt="avatar" width="112" height="112" data-v-66fc3bd9></div><h1 class="hero__title" data-v-66fc3bd9><span class="hero__title-text" data-v-66fc3bd9>时针同学</span></h1><p class="hero__subtitle" data-v-66fc3bd9>今后也请多多关照</p><p class="hero__motto" data-v-66fc3bd9>战斗的意义不是憎恨！</p><div class="hero__actions" data-v-66fc3bd9><a href="/notes/" class="hero__btn hero__btn--brand" data-v-66fc3bd9>知识库</a><a href="/column/personal" class="hero__btn hero__btn--outline" data-v-66fc3bd9>关于我</a></div><nav class="hero__socials" aria-label="社交链接" data-v-66fc3bd9><a href="https://github.com/evilmordy" target="_blank" rel="noopener" data-v-66fc3bd9>GitHub</a><a href="https://space.bilibili.com/3546701528828459" target="_blank" rel="noopener" data-v-66fc3bd9>Bilibili</a></nav>',6)])],6)]),u[1]||(u[1]=Yn('<div class="hero__wave" aria-hidden="true" data-v-66fc3bd9><svg class="hero__wave-layer hero__wave-layer--back" viewBox="0 0 1440 120" preserveAspectRatio="none" data-v-66fc3bd9><path d="M0,64 C360,120 720,0 1080,64 C1260,96 1350,88 1440,64 L1440,120 L0,120 Z" data-v-66fc3bd9></path></svg><svg class="hero__wave-layer hero__wave-layer--front" viewBox="0 0 1440 120" preserveAspectRatio="none" data-v-66fc3bd9><path d="M0,72 C240,24 480,108 720,72 C960,36 1200,108 1440,72 L1440,120 L0,120 Z" data-v-66fc3bd9></path></svg></div>',1))]))}}),gi=x(_i,[["__scopeId","data-v-66fc3bd9"]]),bi="/%E5%A4%B4%E5%83%8F.png",yi=`# MCP协议

MCP(Model Context Protocol,模型上下文协议)协议是AI大模型与软件等外部工程交互信息的**传输协议**，在AI时代它就像HTTP，HTTPS一样成为必备的传输协议。

## 可以干什么

MCP现在已经被广泛接入各种软件里。比如，Matlab，blender等带有GUI，需要开发者和3D艺术家手动操作的软件，可以实现自动化——Matlab接入了AI，就可以自动化地完成你的科研任务。blender接入了AI，可以实现物体和场景的建模甚至动画设置。

所有东西都是终端命令和脚本！让我们开始吧。

## 配置MCP

MCP的配置，最好的方式是**去看官方文档**，比如搞科研的小伙伴就去看Claude和Matlab的文档

这里以blender的MCP配置为例——在cursor和opencode上配置MCP

### 安装blender插件：
前往[Github仓库](https://github.com/ahujasid/blender-mcp),找到\`addon.py\`,只需要下载它就可以了。然后打开Blender，依次点击
 \`\`\`bash
编辑 > 偏好设置 > 插件 > 从磁盘安装(向下的箭头)
\`\`\`
选择插件中的addon.py文件

###  cursor配置blender MCP：
\`\`\`bash
设置(齿轮图标) > Tools & MCPs > New MCP Server  
\`\`\`
将建立一个\`mcp.json\`,MCP的配置都在这里

\`\`\`json
{
  "mcpServers": {
    "blender": {
      "command": "uvx blender-mcp",
      "env": {},
      "args": []
    }
  }
}
\`\`\`

### opencode MCP:

所有 MCP 服务器配置写在\`~/.config/opencode/opencode.json\` 的 mcp 字段下，可以用vim或其它文本编辑器找到。每个服务器需要一个唯一的名称作为键名，该名称也可以在提示词中用来指定调用哪个 MCP：

\`\`\`json
{
  "mcpServers": {
    "blender": {
      "command": "uvx",
      "args": ["blender-mcp"]
    }
  }
}
\`\`\`
然后在聊天框里输入/mcp,选择mcp激活

### 在blender里建立链接

打开blender,英文输入法下按\`n\`,可以发现多了一个叫做BlenderMCP的选项，点击\`Connect to MCP Server\`，则MCP运行在9876端口

这个时候就可以用AI做blender了！配置SKILLS规范AI能让AI的行为更好哦～

点击\`Disconnect from MCP Server\`，即可断开链接。

## Context7

Context7是基于MCP的“文档拉取”服务。注入从源头获取的、与你所用库版本完全对应的官方文档和代码示例，从而避免：

- 过时的示例、基于老旧训练数据的答案
- 大模型幻觉（hallucination）出不存在的 API
- 能跑但是版本不符合的code

### 下载
[官网](https://context7.com/install)
按照官网的提示，也就是：
\`\`\`bash
npx ctx7 setup
\`\`\`
然后会让你选择选项，选择MCP Server回车

就会看到让你选择要安装的地方，比如Claude Code,cursor,opencode,codex,Antigravity

选择你使用的安装即可，要登陆授权的步骤也很简单，授权就可以了

### 使用

在prompt末尾加上 use context7，例如：

\`\`\`txt
Create a Next.js middleware that checks for a valid JWT in cookies and redirects unauthenticated users to \`/login\`. use context7
\`\`\`

### 计费

[官网计费介绍页面](https://context7.com/plans)

有Free Plan 但是有限制，限制频率和次数（好像是每月1000次）`,$i=`# vibecoding

这玩意怎么说呢，不好评价

## 分清几个概念

AI的很多概念其实都挺简单：

### Prompt(提示词)

就是你给AI发的文字，可以去看吴恩达的prompt课程

### 大模型

大模型就是直接和你对话，读取prompt，从prompt生成回答的东西，比如ChatGPT

高质量编程建议使用\`opus4.6\`,\`gpt5.5\`

简单任务(比如不涉及特别重要的业务)：\`Kimi2.5\`,\`Composer2.5\`,\`Deepseek-v4-flash\`,\`Deepseek-v4-pro\`,\`GLM5.1\`等，反正你刷多了，推特首页全你妈是老登的测评和资本家的吹嘘。

我做blender和正经任务肯定是opus,网页小游戏，纯前端用的是Composer2.5和Deepseek

老马要推出Grok了，高低得尝尝咸淡～

### Agent

AI一开始只能和我们对话，根据AI输出的答案操作电脑的就是Agent工具，比如读文件，写入文件，在终端输入命令并执行

一般的工具都有Agent模式和Plan模式，Plan就是先和AI商量好要干什么，确定计划后再执行，防止改烂了或AI没有理解我们的需求，在opencode里，对应\`Build\`和\`Plan\`模式

### SKILLS

以前我们只有通过prompt来规范AI的行为，为了规范，prompt往往很长，且有大量重复

何不放一个.md文件来规范它？让AI自己读取规范需求？

SKILL就这样诞生了——当然这只是简单的理解

SKILL是按需求加载的，它要求\`SKILL.md\`开头有\`name\`,\`description\`,一个告诉AI这个SKILL叫做什么名字，一个描述这个SKILL，比如：

\`\`\`markdown
---
name: pdf-processing
description: 从 PDF 中提取文本和表格，填写表单，并合并文档
---

# PDF 处理

## 使用场景
当需要对 PDF 文件进行操作时使用，例如：

- 提取 PDF 文本或表格数据
- 填写 PDF 表单
- 合并多个 PDF 文件

## 提取文本
- 使用 \`pdfplumber\` 提取文本型 PDF 内容  
- 扫描版 PDF 需配合 OCR 工具  

## 填写表单
- 读取 PDF 表单字段  
- 按输入数据填充并生成新文件  
\`\`\`

当你在做网站前端的vibecoding时，AI不会阅读你的pdf-processing，因为你的description告诉AI这个是做pdf处理的，与现在任务无关，这就节省了token和开发者的时间

## 常用的工具

- Claude Code(最常用)
- Codex
- cursor
- opencode

我用的是cursor,因为支持银联和支付宝，也用opencode，但是通常处理小任务

Codex十分强大，我在等它出Linux版本，其它操作系统的用户可以去体验一下

## MCP
一种通信协议，详细请看：[MCP协议](/notes/AI生产力工具/MCP协议)

## 配置API Key 使用AI模型
### 从官网开放平台获取API Key
例如[deepseek开放平台](https://platform.deepseek.com/usage),然后就充值，复制API Key.
注意API Key只能复制一次！
### 其它AI平台获取API Key
常见的平台有OpenRouter,Ofox；ofox是没有地区限制的，用国外模型开个梯子就能连上
都是只能复制一次！请妥善保管您的API Key!只能在本地上，不能暴露给任何AI任何人！

备份好API Key，然后就按照各个平台的官方文档去配置，填写到相应的位置即可。


## 注意

没有基础不建议vibecoding,别变成拿着localhost在社交平台上发疯的沙毕。

基础教程：[链接](https://datawhalechina.github.io/easy-vibe/zh-cn/appendix/1-computer-fundamentals/vibe-coding-fullstack.html)

最最起码的：知道每个文件分别负责什么，如果这个都判断不出就别做了。`,xi=`# ROS2 安装教程

一条命令在 Ubuntu 上装好 ROS2（国内镜像，自动匹配版本）。点击链接下载脚本：[download.sh](/download.sh){target="_self" download}

| Ubuntu 版本 | 自动安装的 ROS2 |
|-------------|----------------|
| 22.04       | Humble         |
| 24.04       | Jazzy          |

---

## 安装

我没有尝试不挂梯子运行命令，我当时是开着梯子安装的，不过既然你都搞ROS了，就默认你已经拥有了稳定高速的梯子

我们先在根目录新建专门的文件夹，再把脚本复制进去，再cd到那个目录执行脚本：
\`\`\`bash
mkdir -p ~/ros2_install
cp download.sh ~/ros2_install/    # 把脚本拷到这个目录
cd ~/ros2_install
chmod +x download.sh

bash download.sh                  # 正式运行安装脚本，不要用 sudo 运行脚本本身
\`\`\`

安装过程中会要求输入 sudo 密码，属正常现象。

**运行完上面5个命令，网络链接好的话，不出意外的话已经安装成功了**



**可选参数**

\`\`\`bash
bash download.sh --type base      # 最小安装，不含 RViz（体积更小）
bash download.sh --dry-run        # 只预览，不实际安装
bash download.sh --help           # 查看全部选项
\`\`\`

---

## 安装后必做：加载环境

脚本会把 ROS2 写入 \`~/.bashrc\`，但**当前终端不会自动生效**。

任选其一：

\`\`\`bash
source ~/.bashrc          # 让当前终端立刻可用
\`\`\`

或**重新打开一个终端**。

未执行上述步骤时，会出现 \`ros2：未找到命令\`。

验证是否成功：

\`\`\`bash
ros2 doctor                 # 检查环境（不要用 ros2 --version，该命令不存在）
echo $ROS_DISTRO            # 应显示 humble 或 jazzy
\`\`\`

---

## 验证是否成功

**Talker / Listener**（开两个终端，都要先 \`source ~/.bashrc\`）

\`\`\`bash
# 终端 A
ros2 run demo_nodes_cpp talker

# 终端 B
ros2 run demo_nodes_py listener
\`\`\`

看到不断打印 \`Hello World\` 即成功。

**小海龟**（desktop 版自带）

\`\`\`bash
# 终端 A
ros2 run turtlesim turtlesim_node

# 终端 B（用方向键控制）
ros2 run turtlesim turtle_teleop_key
\`\`\`

---

## 磁盘空间

| 用途           | 建议剩余空间 |
|----------------|--------------|
| 仅安装 + 试用  | 20 GB        |
| 日常开发编译   | 50 GB 以上   |

\`colcon build\` 产生的 \`build/\` 目录很大，是爆盘主因，不是 \`/opt/ros\` 本身！

---

## 常见问题

### \`ros2：未找到命令\`

先执行 \`source ~/.bashrc\`，或新开终端。每次新开终端一般会自动加载。

### ParaView 与 RViz 冲突

报错含 \`python3-paraview : Conflicts: python3-vtk9\` 时，Ubuntu 24.04 的 ParaView 5.x 与 ROS2 desktop 不能共存。

**做法**：卸载 ParaView 后再装 ROS2；等官方 ParaView 6.0（预计 Ubuntu 26.04+）再装回，届时可与 RViz 共存。

\`\`\`bash
sudo apt remove paraview python3-paraview paraview-doc
bash download.sh
\`\`\`

若必须保留 ParaView：\`bash download.sh --type base\`

### locale 报错

\`\`\`bash
sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
\`\`\`

### rosdep / apt 失败

查看日志：\`cat ~/ros2_install/install.log\`  
脚本已配置清华 TUNA 镜像；重复运行脚本是安全的（已装部分会自动跳过）。

---

`,ki=`# 在小海龟示例上运行命令行

## Linux命令行

linux命令默认大家都会



ROS2的命令行工具都以 \`ros2\` 开头，后跟命令、动词和参数

## 运行小海龟节点(node)仿真器

格式：\`ros2 run <package_name> <executable_name>\`

\`\`\`bash
ros2 run turtlesim turtlesim_node
\`\`\`

回车，则打开了一个有小海龟的图形化界面

新建另一个终端，运行：

\`\`\`bash
ros2 run turtlesim turtle_teleop_key
\`\`\`

这样就能通过键盘控制小海龟运动，但注意鼠标光标一定要在该终端里闪烁

\`\`\`bash
ros2 node list #查看正在运行哪些节点
ros2 node info /turtlesim #查看某个特定节点信息
\`\`\`

## 话题(topic)

再新建一个终端运行：

\`\`\`bash
ros2 topic list #查看当前有哪些话题
\`\`\`

可以看到输出：

\`\`\`bash
/parameter_events
/rosout
/turtle1/cmd_vel
/turtle1/color_sensor
/turtle1/pose
\`\`\`

查看某个话题：

\`\`\`bash
ros2 topic echo /turtle1/pose
\`\`\`

可以看到终端不断输出海龟的pose信息

也可以通过pub命令发布话题去控制海龟行为

\`\`\`bash
ros2 topic pub --rate 1 /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 2.0, y: 0.0, z: 0.0}, angular:{x: 0.0, y: 0.0, z: 1.8}}"
\`\`\`

注意：冒号后面一定要跟空格，少了一个空格都不行

\`--rate 1\` 表示一秒发布一次指令

可以看到海龟做圆周运动

## 服务(Service)

同样有\`list\` 

我们调用这样一个服务：

\`\`\`bash
ros2 seice call /spawn turtlesim/srv/Spawn "{x: 2,y: 2, theta: 0.2, name: 'abc'}"
\`\`\`

可以看到产生了一个新海龟，我们规定了位置和角度，以及名字(abc)

再次运行

\`\`\`bash
ros2 topic list
\`\`\`

可以看到输出变为：

\`\`\`bash
/abc/cmd_vel
/abc/color_sensor
/abc/pose
/parameter_events
/rosout
/turtle1/cmd_vel
/turtle1/color_sensor
/turtle1/pose
\`\`\`

也就是说我们成功添加了新的接口

我们把之前圆周运动的话题命令复制过来，把\`turtle1\` 改成 \`abc\`

\`\`\`bash
ros2 topic pub --rate 1 /abc/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 2.0, y: 0.0, z: 0.0}, angular:{x: 0.0, y: 0.0, z: 1.8}}"
\`\`\`

可以看到现在是新的海龟做圆周运动了

## bag

使用这个功能能记录运行的数据：

第三个终端运行：

\`\`\`bash
ros2 bag record /turtle1/cmd_vel
\`\`\`

然后在第二个终端键盘用键盘控制海龟走一段路程

当你想要停止的时候，就按下Ctri+C停止第三个终端

可以发现目录下多了一个文件夹

运行：

\`\`\`bash
ros2 bag play rosbag2_2026_06_08-14_38_08/ #play 后面直接按下tab自动补全，这里是我电脑上的文件夹名称！
\`\`\`

可以看到海龟在重复我们之前录制的运动`,Pi=`# 工作空间和功能包

## 什么是工作空间(workspace)

你不能直接打开你linux的根目录终端运行ros2，你的系统盘会爆的

**工作空间：** 其实就是新建文件夹，终端也在这里打开，所有文件都应该放在这里

### 典型的ROS2文件结构

- src:存放代码
- install:安装空间，编译出的可执行文件等有效产物会放在这里
- build: 编译空间，存放编译产生的中间文件，这个体积最大
- log：放日志的

### 创建一个工作空间

手动创建你的总文件夹，我这里就叫它\`studyProject\`,然后进入它，手动创建\`src\` 文件夹

在\`src\` 文件夹里打开终端，由于Ubuntu会阻止你用pip全局安装包，所以我们为了下载国内开发者专用的\`rosdepc\` 需要先创建虚拟环境：

\`\`\`bash
python3 -m venv .venv
source .venv/bin/activate
pip install rosdepc
\`\`\`

等待rosdepc下载完成

然后运行(不需要sudo!)

\`\`\`bash
rosdepc init
rosdepc update
\`\`\`

我们再回到项目根目录：

\`\`\`bash
cd ..
\`\`\`

此后只要在项目根目录下运行这个命令：

\`\`\`bash
rosdepc install -i --from-path src --rosdistro humble -y
\`\`\`

就会自动安装所有依赖。你可以类比：这个rosdepc就好比npm install从package.json里自动读取要安装的依赖然后自动给你装好

然后是colcon,之后编译都用它：

\`\`\`bash
sudo apt install python3-colcon-ros
\`\`\`

以后编译就用

\`\`\`bash
colcon build
\`\`\`

就会给你编译了，编译完成就会自动给你生成剩下三个文件夹

## 功能包

功能包，就是ROS2世界里组织代码的**最小单元**和**“集装箱”**。你可以把它理解成一个专门用来存放某个具体功能（比如控制底盘、处理摄像头图像、做导航规划）所有相关文件的**专属文件夹**。

### 为什么需要功能包

想象一下，如果不区分功能包，把所有代码都堆在一起，当你想要分享其中一个很棒的功能（比如一个激光雷达驱动）时，就得在一大坨代码里费力地剥离出来。别人拿到你的代码，也得面对一锅乱炖。

ROS2社区的数万个功能包都遵循同样的结构，这让你能快速上手别人的代码，也让工具可以自动化地处理它们。

### 功能包的一般配置

一个文件夹是不是ROS2功能包，看它有没有**两个“身份证”** ：

- **\`package.xml\`**：**“自我介绍”**。包含这个包的名称、版本、作者、描述，最重要的是它**依赖哪些别的功能包**。
- **\`CMakeLists.txt\`** （C++包） 或 **\`setup.py\`** （Python包）：**“编译说明书”**。告诉编译系统（colcon）这个包该如何处理，生成什么可执行文件。

除了这两个核心文件，一个典型的功能包还常常包含以下文件夹：

- **\`src/\`**：存放C++源代码（\`.cpp\`文件）。
- **\`<package_name>/\`**：存放Python源代码（\`.py\`文件），与包名同名。
- **\`msg/\`** 和 **\`srv/\`** ：存放自定义的通信接口（消息和服务）。
- **\`launch/\`**：存放启动文件，可以一键启动这个包需要的多个节点。
- **\`config/\`**：存放参数配置文件（\`.yaml\`文件）。

你可以用命令 \`ros2 pkg list\` 列出系统里所有功能包，用 \`ros2 pkg executables <package_name>\` 查看某个包里有哪些可执行文件



### 功能包创建，构建，运行

创建功能包要先cd到src目录

格式为\`ros2 pkg create --build-type <build-type> <package_name>\`

其中\`build-type\` 是功能包类型，有C++和Python两种，对应\`ament_cmake\` \`ament_python\`

\`\`\`bash
# 创建一个C++包
ros2 pkg create --build-type ament_cmake my_cpp_pkg

# 创建一个Python包
ros2 pkg create --build-type ament_python my_python_pkg
\`\`\`

**构建**先返回项目根目录

\`\`\`bash
cd ..
colcon build # 编译工作空间里所有的包
colcon build --packages-select my_python_pkg # 只编译指定的包
\`\`\`

C++会先编译再构建，python则不需要先编译。

**运行**：编译成功后，先“激活”工作空间，然后就可以运行包里的程序了：

\`\`\`bash
# 激活工作空间
source install/setup.bash

# 运行包里的可执行文件
ros2 run my_python_pkg my_node
\`\`\`

`,wi=`---
title: 我的知识库
outline: false
---

<script setup>
import NotesOverview from '../.vitepress/components/NotesOverview.vue'
<\/script>

<NotesOverview />
`,Si=`# IMU

IMU(Inertial measurement unit)，惯性测量单元

是一种**机电传感器**，能反馈自身的运动状态和位姿。广泛用于无人机和机器人的导航和控制，甚至可以说IMU的好坏决定了产品的性能。

## 核心概述

IMU是一种基于**惯性原理**，通过集成**加速度计**和角加速度计(也就是我们常说的**陀螺仪**)，实时测量载体再三维空间内的线加速度、角速度，并进一步解算出**姿态角**(俯仰角、横滚角、偏航角)的传感器组合装置

由于完全依靠物理仪器和惯性原理进行测量和数学求解，不需要GPS、雷达等外部支持，因此在有干扰的环境下也能正常工作。正是因为陀螺仪和加速度计一般都依靠经典力学里的惯性(牛二)求解，故叫做“惯性测量单元”

- **6轴IMU：**由三个单轴的加速度计和三个单轴的陀螺仪组成，加速度计检测物体在载体坐标系统独立三轴的加速度信号，而陀螺仪检测载体相对于导航坐标系的角速度信号，这样就测量出来六个自由度的运动信息
- **9轴IMU：** 除了6轴IMU的六个自由度上的信息以外，在加速度计和陀螺仪的基础上加入磁力计，就形成了"9轴IMU"。

## 工作原理

1. 首先知晓自身的初始位置，即三维世界坐标系下的位置$(X_s,Y_s,Z_s)$,和初始姿态也就是自身坐标系下的yaw,pitch,roll$(\\alpha,beta,\\gamma)$
1. 连续测量自己在世界坐标系下的加速度$(\\alpha_x,\\alpha_y,\\alpha_z)$,对时间二次积分得到航迹和当前位置$(X_c,Y_c,Z_c)$ 
1. 连续测量自身坐标系下姿态角的变化，或连续测量角速度并对时间积分，得到当前的姿态。

## 加速度计

常规的加速度计就是用初中学的牛顿第二定律设计的：

加速度计的检测装置检测的是引起加速度的惯性力，随后可利用牛顿第二定律获得加速度值。测量原理可以用一个简单的质量块、弹簧和指示计来表示



![](加速度计1.jpeg)

当载具运动并产生加速度时，为了保证$F=ma$,弹簧会发生伸长和缩短，这样指针的位置就发生改变，可变电阻的阻值也随之改变——这样就把加速度信号转化为电信号，至于具体的转化关系只是一道中学物理的题目罢了。



还有其它形式的加速度计，但它们的原理都一样：加速度导致压力的变化 -> 力导致某个电路元件的变化 。由此完成加速度变化转化为电信号：

- 压电式：压力变化导致电压变化

- 压阻式：压力变化导致半导体的电阻发生变化

- 电容式：压力导致电容变化(高中学过公式C= εS/4πkd嘛，电容和两块极板间的距离有关)

- 伺服式：与一般加速度计相同，但质量m上还接着一个电磁线圈，当基座上有加速度输入时，质量块偏离平衡位置，该位移大小由位移传感器检测出来，经伺服放大器放大后转换为电流输出，该电流流过电磁线圈，在永久磁铁的磁场中产生电磁恢复力，试图使质量块保持在仪表壳体中原来的平衡位置上，所以伺服加速度传感器在闭环状态下工作。由于有反馈作用，增强了抗干扰的能力，提高测量精度，扩大了测量范围

  **简单来说就是用电磁线圈，加了一个负反馈的力，提升了抗干扰能力，扩大测量范围**

  电路图很像初中学电磁线圈设计各种自动化电路的大题：

  ![](加速度计2.png)

## 陀螺仪

从中学就反复强调：运动分析时要选择参考系

当选择的参考系不是惯性参考系而是**旋转参考系**时，就会产生\`科氏加速度\`和\`科氏力\`(理论力学里有讲)

科氏力的公式为：
$$
F_科=-2m \\cdot (\\omega \\times v)
$$

- m 是质量块质量（固定）

- vv 是质量块在X轴上的驱动振动速度（已知，且被精确控制为恒定幅度）

- ω 就是我们要测量的**输入角速度**

两块物体处于不断的运动中，令它们运动的相位相差-180度，即两个质量块运动速度方向相反，而大小相同->它们产生的科氏力相反->压迫两块对应的电容板移动，产生电容差分变化。电容的变化正比于旋转角速度。由电容即可得到旋转角度变化。

这样又实现了角加速度信号转化为电信号

以上是MEMS陀螺仪的原理，它最棘手但最便宜

其实还有很多测量方法：机械陀螺用的是角动量守恒，光纤陀螺用的是光的干涉，这里不一一赘述了。

IMU测量精度主要取决于陀螺仪的好坏——由陀螺仪传感器的类型进行分类

- 挠性陀螺
- 静电陀螺
- 激光陀螺
- 光纤陀螺
- 微机械陀螺（MEMS陀螺）



## 磁力计

- 利用地磁场来定北极的一种器件。

- 能提供装置在XYZ各轴所承受磁场的数据，接着相关数据会汇入微控制器的运算器，以提供磁北极相关的航向角，利用这些信息可侦测地理方位。

- 采用三个互相垂直的磁阻传感器，每个轴向上的传感器检测在该方向上的地磁场强度。



## IMU误差模型

### 一般的误差
有些系统误差是比较容易想到的：

- 安装误差：比如三个轴不可能完美正交

- 刻度误差

还有环境(比如温度)导致的误差：

通过影响$C= εS/4πkd$ 里的ε(介电常数)影响电容，进而造成误差

陀螺仪静置时，温度变化会让它“以为”自己在转，测得的值会漂。这个漂移量与温度大致成线性关系，我们用**全温零偏误差**（也叫零偏的温度敏感系数，单位 \`deg/s/℃\`）来描述它。高端器件会逐个做温补，这个指标指的就是补偿后的残差；低端MEMS芯片没法逐个标定，只给你这个系数。

------

### 零偏：

你测到的零偏，其实是它们的总和

IMU输出里那个固定的偏置量，学名叫**零偏**。它其实是一个“大杂烩”，由下面这几位共同组成：

1. **常值零偏**
   - **是什么**：芯片出厂就刻在骨子里的固定偏置，比如结构装配不准。
   - **怎么处理**：低端MEMS芯片（如手机里几块钱的）可能高达几千度/小时，但我们只需在**静止启动时求几秒平均值，就能扣掉大部分**。
2. **零偏重复性**
   - **是什么**：每次上电，零偏值都不太一样，这个不重复的范围就是它。
   - **怎么处理**：高端器件把大误差都补干净了，这个才突显出来。对我们来说无所谓，反正每次上电都静态测几秒算个新零偏，**就把它和常值零偏一起抵消了**。
3. **零偏不稳定性**
   - **是什么**：温度恒定时，零偏自己随时间“随机漫步”，主要源于电子器件的闪变噪声。
   - **两种统计口径**：
     - **国军标法**：采集几小时静态数据，每10/100秒取平均，再算这些均值的标准差。**对实际应用有直接指导意义**。
     - **Allan方差法**：采集10小时以上数据，画Allan方差曲线，取曲线谷底值。这反映的是**器件的理论极限性能**，数值通常比前者小几倍。
   - 我们实际使用中，主要关注**它和温敏系数**。
4. **零偏的加速度敏感性**
   - **是什么**：陀螺本应对加速度“无感”，但由于加工误差，强加速下会产生“错觉”，输出错误的角速度。
   - **生活比喻**：手里拿着一个高速旋转的陀螺，你猛地向上加速，转轴底部会因超重受到额外摩擦力，导致测得的转速瞬间偏小。
   - **何时关注**：只在**强动态载体**（如导弹、无人机特技）上才显著，常见的机器人、车辆基本可以忽略。

------

### 噪声：让角度“随机漫步”的元凶

- **噪声来源**：内部测量精度（如模数转换精度）和外部机械振动。减震海绵能减轻一些。
- **为什么叫“角度随机游走”？**
  - 我们计算姿态，需要对角速度做积分。
  - 角速度的噪声是**白噪声**（每一次测量相互独立，随大随小）。
  - 积分相当于累加，**每一步的误差都会影响下一步的基准**。结果就是，一段时间后的角度误差，你完全无法预测它会偏多还是偏少，像个醉汉一样漫无目的地游走，这就是**角度随机游走**。
- **关键点**：这是统计学指标，是随机变量，**无法通过出厂校准消除**。

-----

- **确定性误差**靠标定干掉。
- **随机误差**（噪声和零偏的不稳定部分）只能分析，无法消除，决定IMU性能上限的核心。



## IMU内参标定

这个比较复杂，涉及的数学部分太多，可以去看https://zhuanlan.zhihu.com/p/702477833



## 参考

https://blog.csdn.net/QLeelq/article/details/112985306

https://www.cnblogs.com/autodriver/p/18099109

https://zhuanlan.zhihu.com/p/702477833
`,Li=`# VO 和 VIO

## VO

视觉里程计（Visual Odometry，简称VO）是利用**连续图像序列** 估计 相机自身运动（位姿变化）的一种技术。

它的作用是拿到相机的相对位姿变化(平移和旋转)

与IMU和激光雷达相比，成本更低，但受限于光照和场景特征等因素。

### 基本原理

1. **特征匹配：**就是找出图片中的同一个物体。从连续帧中提取图像特征点，并在相邻帧之间进行匹配。然后跟踪这个特征点。

2. **几何约束与位姿解算：**利用特征点在不同时间(帧)下在画面里的位置，通过几何约束（如本质矩阵、基础矩阵或相机模型）解算摄像头的相对位姿变化。

举个例子：如果你的相机搭载在一台无人机上，而无人机在只有雪白的墙壁的室内飞，那么摄像机拍到的画面都是白花花一片，或者墙壁的纹理是整齐的，重复的，相机拍到的不同画面长得几乎一模一样——这个时候根本没有特征点，无法解算，我们称之为**低纹理环境**。但如果墙上有标记，比如一颗钉子，那么就能以钉子为特征点，用数学解算相机的位姿变化。

### 模块和步骤

- 图像采集和预处理模块
- 特征提取描述模块
- 特征匹配跟踪模块
- 运动解算模块
- 优化与滤波

1. 使用相机获得连续的图像序列
2. 预处理，滤波去噪，转为灰度图等操作
3. 特征点检测如Harris角点、FAST、SIFT、SURF等方法，在图像中检测高辨识度的特征点，当然也有论文研究特征线——PL VIO
4. 为每个特征点生成描述子(SIFT、SURF、ORB等)
5. 特征匹配，跟踪(Brute-Force,FLANN，Lucas-Kanade等)
6. 运动解算
7. 优化(最小二乘，Bundle Adjustment)和滤波(卡尔曼滤波EKF等)

### 限制和不足

- 相机的输出频率有限，一般不超过100Hz；

- 在基于单目的VO系统中，不能精准估计尺度信息
- 不适合低纹理（如白墙）
- 不适合高速运动或者高动态的场景（出现曝光过度或者不足）

## VIO

视觉惯性里程计(Visual-Inertial Odometry，VIO)，是一个使用一个或者多个相机、一个或者多个IMU进行传感器状态测量的技术(也就是解算位姿)

相机和IMU相比于其他传感器比较廉价，也比较轻便，因此在现代无人机上普遍配备了VIO

前面已经讲解了VO和IMU，而VIO设计理念就在于，将相机和IMU两种的传感器进行数据融合，达到“优势互补”。

- IMU弥补输VO出频率不高和过渡依赖光照和速度限制的不足
- VO弥补IMU存在漂移误差的不足

具体的原理涉及李代数和滤波的数学知识，这个我看以后有没有时间更吧...



### 数据融合的方式

#### 松耦合

IMU和相机分别解算完自身的运动估计，然后对结果进行数据融合，鲁棒性不如紧耦合

#### 紧耦合

先把IMU的状态和相机的状态合并在一起，共同构建运动方程和观测方程，然后进行位姿状态的解算。分为基于滤波(Filter)和基于优化(optimization)两个研究方向



### 常见算法

#### 基于滤波器

- MSCKF：为了解决EKF-SLAM需要一个初始深度和协方差，选择不正确后面就不会收敛的问题。原始的MSCKF算法提出了一个度量模型，该模型表达了观察特定图像特征的所有相机姿态之间的几何约束，而不需要在状态向量中维护3D路标点位置的估计。Alex Zihao Zhu等人实现了一个基于事件相机（Event-based Camera）输入的使用MSCKF后端的里程计，后面该实现被改造成可接收普通相机特征跟踪信息的版本
  仓库： https://github.com/daniilidis-group/msckf_mono
  论文：https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=8100099
- ROVIO：计算量小，但是没有闭环会残留误差。
  仓库：https://github.com/ethz-asl/rovio
  论文：https://www.doc.ic.ac.uk/~sleutene/publications/ijrr2014_revision_1.pdf

#### 基于优化

- OKVIS：前端：多目+IMU 后端：ceres solver优化库，基于关键帧的滑动窗口

  仓库：https://github.com/ethz-asl/okvis 
  论文：https://www.doc.ic.ac.uk/~sleutene/publications/ijrr2014_revision_1.pdf

- VINS-Mono: 设备只要求单目，鲁棒性强，前端基于KLT跟踪算法， 后端基于滑动窗口的优化(采用ceres库)， DBoW的回环检测
  仓库：https://github.com/HKUST-Aerial-Robotics/VINS-Mono
  论文：https://ieeexplore.ieee.org/document/8421746

## 参考

https://zhuanlan.zhihu.com/p/148412316

https://blog.csdn.net/Night___Raid/article/details/108223615

https://www.cnblogs.com/hitcm/p/6327442.html





`,Ci=`# 雅可比矩阵

## 数学基础

### 理解它是描述变化率的量

我们先从我们熟悉的导数开始：

- 导数：在一元微积分中，函数 \`y = f(x)\` 的导数 \`df/dx\` 描述了当输入 \`x\` 发生微小变化 \`dx\` 时，输出 \`y\` 会如何变化：\`dy = (df/dx) dx\`。导数就是一个数，代表了该点的变化率

- 梯度：现在，考虑一个多元函数，比如 \`f(x, y, z)\`。它的输入是向量\`[x,y,z]\`，输出是一个标量。我们想知道输入在每个方向上变化时，输出会怎样。这时，导数就扩展为**梯度**——一个偏导数组成的向量：
  $$
  \\nabla f = \\begin{bmatrix} \\frac{\\partial f}{\\partial x} & \\frac{\\partial f}{\\partial y} & \\frac{\\partial f}{\\partial z} \\end{bmatrix} 
  $$

- 雅可比矩阵：

更近一步，雅可比矩阵就是“多变量函数的导数”，它将导数的概念，推广到输入和输出都是向量的情况。

雅可比矩阵描述**当输入向量发生微小变化时，输出向量在每个维度的变化**

### 定义

设有一个函数 \`F\`，它将 \`n\` 维输入向量 \`x = (x₁, x₂, …, xₙ)\` 映射为 \`m\` 维输出向量 \`y = (y₁, y₂, …, yₘ)\`，即 \`F: ℝⁿ → ℝᵐ\`。那么 \`F\` 的雅可比矩阵 \`J\` 是一个 \`m × n\` 的矩阵，定义为：
$$
F(x)=\\begin{bmatrix}f_1(x_1,x_2\\cdots x_n)\\\\ f_2(x_1,x_2\\cdots x_n) \\\\ \\vdots \\\\f_m(x_1,x_2\\cdots x_n) \\end{bmatrix}\\\\\\\\
J = \\begin{bmatrix}
\\frac{\\partial f_1}{\\partial x_1} & \\frac{\\partial f_1}{\\partial x_2} & \\cdots & \\frac{\\partial f_1}{\\partial x_n} \\\\
\\frac{\\partial f_2}{\\partial x_1} & \\frac{\\partial f_2}{\\partial x_2} & \\cdots & \\frac{\\partial f_2}{\\partial x_n} \\\\
\\vdots & \\vdots & \\ddots & \\vdots \\\\
\\frac{\\partial f_m}{\\partial x_1} & \\frac{\\partial f_m}{\\partial x_2} & \\cdots & \\frac{\\partial f_m}{\\partial x_n}
\\end{bmatrix}
$$
聪明的同学可能已经发现，高等数学里二重积分从直角坐标形式和极坐标形式的相互转换就是 $ℝ^2 → ℝ^2$ 的映射：
$$
x = r \\cos φ, \\quad y = r \\sin φ
$$

$$
J(r, φ) = \\begin{bmatrix}
\\frac{\\partial x}{\\partial r} & \\frac{\\partial x}{\\partial φ} \\\\[2ex]
\\frac{\\partial y}{\\partial r} & \\frac{\\partial y}{\\partial φ}
\\end{bmatrix}
= \\begin{bmatrix}
\\cos φ & -r \\sin φ \\\\
\\sin φ & r \\cos φ
\\end{bmatrix}
$$

## 应用

### 机器人

在机器人学中，雅可比矩阵是连接**关节空间**（电机角度、速度）和**操作空间**（机械臂末端的位姿、速度、力）的核心桥梁

由于篇幅有限，这里只举简单的例子：

**平面二连杆机械臂运动**

考虑一个在二维平面上运动的二连杆机械臂，其末端位置 \`(x, y)\` 由关节角 \`(θ₁, θ₂)\` 及连杆长度 \`L₁, L₂\` 决定。
$$
x = L₁\\cosθ₁ + L₂\\cos(θ₁+θ₂) \\\\
y = L₁\\sinθ₁ + L₂\\sin(θ₁+θ₂)
$$
这个图就不放了，根据文字和公式自己都能画出来

这个关系 \`(x, y) = f(θ₁, θ₂)\` 也是一个从 \`ℝ²\` 到 \`ℝ²\` 的映射。

给定关节速度 \`(θ̇₁, θ̇₂)\`，则末端速度 \`(v_x, v_y)\` 为：
$$
\\begin{bmatrix} v_x \\\\ v_y \\end{bmatrix} = J(θ₁, θ₂) \\cdot \\begin{bmatrix} \\dot{θ_1} \\\\ \\dot{θ_2} \\end{bmatrix}
$$


其中，雅可比矩阵 \`J(θ₁, θ₂)\` 为：
$$
J(θ₁, θ₂) = \\begin{bmatrix}
\\frac{\\partial x}{\\partial θ_1} & \\frac{\\partial x}{\\partial θ_2} \\\\[2ex]
\\frac{\\partial y}{\\partial θ_1} & \\frac{\\partial y}{\\partial θ_2}
\\end{bmatrix}
= \\begin{bmatrix}
-L_1\\sinθ_1 - L_2\\sin(θ_1+θ_2) & -L_2\\sin(θ_1+θ_2) \\\\
L_1\\cosθ_1 + L_2\\cos(θ_1+θ_2) & L_2\\cos(θ_1+θ_2)
\\end{bmatrix}
$$
假设关节速度为 \`θ̇₁ = 0.2 rad/s\`，\`θ̇₂ = 0.1 rad/s\`。
末端速度为：
$$
v = J \\cdot \\dot{q} = \\begin{bmatrix} -1.5 & -1.0 \\\\ 0.8660 & 0.0 \\end{bmatrix}
\\begin{bmatrix} 0.2 \\\\ 0.1 \\end{bmatrix}
= \\begin{bmatrix} (-1.5×0.2) + (-1.0×0.1) \\\\ (0.8660×0.2) + (0.0×0.1) \\end{bmatrix}
= \\begin{bmatrix} -0.3 - 0.1 \\\\ 0.1732 \\end{bmatrix}
= \\begin{bmatrix} -0.4 \\\\ 0.1732 \\end{bmatrix}
$$


因此，末端执行器的线速度为 \`v_x = -0.4 m/s\`（向左），\`v_y ≈ 0.1732 m/s\`（向上）。

### SLAM

**SLAM中的BA优化**：BA优化的目标是最小化重投影误差，这是一个非线性最小二乘问题。高斯-牛顿等优化算法需要计算误差函数关于相机位姿和地图点的雅可比矩阵，以指导迭代方向。

**深度学习反向传播**：反向传播算法的核心就是计算损失函数关于网络各层参数的梯度（雅可比矩阵），并利用链式法则将这些梯度反向传播。

**数值优化（牛顿法）**：牛顿法同时利用了一阶导（雅可比矩阵）和二阶导（海森矩阵）的信息。对向量值函数 \`F(x) = 0\` 求根，其牛顿迭代公式为：
$$
x_{k+1} = x_k - J_F(x_k)^{-1} F(x_k)
$$
`,Ai=`# 安装

终端输入：

\`\`\`bash
pip install ultralytics
\`\`\`

事实上所有的基本用法都可以在官网上阅读：<https://docs.ultralytics.com/zh/>

从官网上下载预训练模型到本地：在 GitHub 的 README.md 里有各种不同型号的预训练模型。

# YOLO 执行预测

\`\`\`python
from ultralytics import YOLO

# 加载预训练模型
model = YOLO('yolo11n.pt')  # 注意文件的位置，如果不在同一文件夹里就写你的路径
# 运行结果
results = model(source='gi.mp4', show=True, conf=0.4, save=True)
\`\`\`

\`source\` 表示你要检测的对象，可以是图片，可以是视频，可以是 \`uint8\` 的 NumPy 数组。如果你要检测多个文件，就使用列表，比如：

\`\`\`python
results = model(['image1.png', 'image2.png'])
\`\`\`

- \`source=0\` 表示启用默认摄像头
- \`show=True\` 表示运行这段代码后显示结果
- \`conf=0.4\` 表示置信度大于 0.4 才被显示出来
- \`save=True\` 表示保存。终端会有这么一行：

\`\`\`text
Results saved to runs\\detect\\predict10
\`\`\`

表示你的预测结果保存到了 \`runs\` 文件夹里，只要找到就可以了。

\`results\` 这个变量将保存结果的信息。

# YOLO 执行分割

只需要把模型换成 seg 模型即可，官网有内置的 AI 聊天模型，可以很方便地把你导航到你想去的地方。

此处以 \`yolov8n-seg.pt\` 为例。

\`\`\`python
from ultralytics import YOLO
import cv2 as cv

# Load a pretrained YOLO model
model = YOLO("yolov8n-seg.pt")

cap = cv.VideoCapture(0)
while cap.isOpened():
    ret, frame = cap.read()
    if ret:
        results = model(frame)
        annotated_frame = results[0].plot()
        cv.imshow('seg', annotated_frame)
        if cv.waitKey(1) & 0xFF == ord('q'):
            break
    else:
        break
cap.release()
cv.destroyAllWindows()
\`\`\`

# YOLO 训练自己的模型

YOLO 需要两个文件夹：存放图片的文件夹和存放标注的文件夹，它们的子文件夹把数据划分为训练集、验证集和测试集（可选）：

\`\`\`text
dataset/
├── images/
│   ├── train/
│   └── val/
└── labels/
    ├── train/
    └── val/
\`\`\`

配置文件里就写：

\`\`\`yaml
train: yolo/dataset/images/train  # 训练图片相对路径
val: yolo/dataset/images/val      # 验证图片相对路径
nc: 1                             # 类别数量
names: ['an']                     # 类别名称
\`\`\`

训练的 \`.py\` 文件就写：

\`\`\`python
from ultralytics import YOLO

model = YOLO('yolo11.pt')
results = model.train(
    data='train.yaml',
    device='cpu',
    epochs=500,
    patience=50,
    imgsz=640,
    iou=0.55,
)
\`\`\`

其中 \`device\` 表示使用什么设备，你只有 CPU 就写 \`cpu\`，你有 GPU 就写对应的数字。\`epochs\` 表示下降多少次，\`patience\` 表示早停，就是说下降 50 次后没什么进步就不下降了，\`imgsz\` 一般 640，\`iou\` 就是交并比的阈值。

其实还有很多参数，比如数据增强——可以查看官方的文档。

\`labels\` 是与图片文件同名的 \`.txt\` 文件，格式为：

\`\`\`text
class_id cx cy w h
\`\`\`

每行一个目标，坐标均为相对宽高的归一化值（0~1）。\`class_id\` 就是 \`.yaml\` 文件里 \`names\` 列表的索引，比如：

\`\`\`yaml
names: ['egg', 'apple', 'pig']
\`\`\`

\`class_id = 2\` 就表示 \`pig\`。

标注工具：最常用的就是 labelImg。这个工具有一个老 bug，好像是要输入整数，但是你画矩形时第一个点传过去就是浮点数，也没有报错把错误写给你，但是有修复方法，可以去查。我用的是我自己写的 <https://github.com/evilmordy/yolotxt_maker>。

# 注意力机制

注意力机制常用的有 SE、CBAM，21 年出的 GAM 号称除了速度都更优。这些东西就经常用来水论文。

注意力机制（Attention Mechanism）旨在模仿人类视觉和认知系统，它允许神经网络在处理数据时集中注意力于相关的部分，也就是动态地分配权重使得模型能提取到更重要和更小的特征。通过引入注意力机制，神经网络能够自动地学习并选择性地关注输入中的重要信息，提高模型对小目标的特征提取能力和泛化能力。它的出现引起了全世界的震撼，甚至论文标题大胆地豪言："Attention is all you need"。

起初的注意力机制将注意力汇聚的输出计算成为值的加权和。举一个机器翻译的例子，给定一个 Query（比如待翻译的字符"矩阵"），计算 Query 与 Key 的相关性，然后再通过 softmax 函数得到注意力分数，使用 softmax 函数是为了使得所有的注意力分数在 [0, 1] 之间，并且和为 1。Query、Key 的相关性公式一般表示如下：

$$
\\text{score}(q, k_i) = \\text{softmax}(\\alpha(q, k_i)) = \\frac{\\exp(\\alpha(q, k_i))}{\\sum_{j} \\exp(\\alpha(q, k_j))}
$$

其中 $\\alpha(q, k_i)$ 常见形式如下：

| 注意力类型 | $\\alpha(q, k_i)$ |
|------------|-------------------|
| 加性注意力 | $w_v^T \\tanh(W_q q + W_k k)$ |
| 缩放点积注意力 | $\\dfrac{QK^T}{\\sqrt{d}}$ |

然后根据注意力分数进行加权求和，求出带注意力分数的 Value。上一步得到了 Query、Key 的相关性，如果相关性越大，注意力分数就越高，反之越低；然后将注意力分数乘以对应的 Value，再进行加权求和；就比如："矩阵"和 "matrix" 的相关性较大，注意力分数就会越高；这样可以让下游任务理解 "矩阵" 和 "matrix" 是匹配程度高。

如果直接将不带注意力分数的 V 进行输入到下游任务，下游会认为所有单词的重要性程度都是一样的，随机将单词与 Query 匹配。

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/fda4a640-59f0-41bf-a51e-97b01d23af28/4d3888f9a8f8ac6481f990e17cadf08ad31fc58187a4a1e260cfa6096bcc6c27.jpg)

## 其他注意力机制

除了上述的注意力机制，还有自注意力机制（Self-Attention Mechanism）、多头注意力机制（Multi-head Self-Attention Mechanism）和通道注意力机制。本文使用的 SE 注意力机制，就是一种最经典的通道注意力机制。

# 在 YOLO 里插入注意力机制

前往你环境里的 ultralytics 安装包，一般位于 \`.venv/Lib/site-packages/ultralytics\`（Windows）或 \`.venv/lib/python3.x/site-packages/ultralytics\`（Linux/macOS）。

在 GitHub 或者博客里找到对应注意力机制的 PyTorch 代码复制下来，这里为大家准备一个文件，包含四个主流模块：

\`\`\`python
import torch
import torch.nn as nn
import math
import torch.nn.functional as F
from torch.nn.parameter import Parameter


# GAM
class GAM(nn.Module):
    def __init__(self, in_channels, rate=4):
        super().__init__()
        out_channels = in_channels
        in_channels = int(in_channels)
        out_channels = int(out_channels)
        inchannel_rate = int(in_channels / rate)

        self.linear1 = nn.Linear(in_channels, inchannel_rate)
        self.relu = nn.ReLU(inplace=True)
        self.linear2 = nn.Linear(inchannel_rate, in_channels)

        self.conv1 = nn.Conv2d(in_channels, inchannel_rate, kernel_size=7, padding=3, padding_mode='replicate')
        self.conv2 = nn.Conv2d(inchannel_rate, out_channels, kernel_size=7, padding=3, padding_mode='replicate')

        self.norm1 = nn.BatchNorm2d(inchannel_rate)
        self.norm2 = nn.BatchNorm2d(out_channels)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        b, c, h, w = x.shape
        # B,C,H,W ==> B,H*W,C
        x_permute = x.permute(0, 2, 3, 1).view(b, -1, c)
        # B,H*W,C ==> B,H,W,C
        x_att_permute = self.linear2(self.relu(self.linear1(x_permute))).view(b, h, w, c)
        # B,H,W,C ==> B,C,H,W
        x_channel_att = x_att_permute.permute(0, 3, 1, 2)

        x = x * x_channel_att

        x_spatial_att = self.relu(self.norm1(self.conv1(x)))
        x_spatial_att = self.sigmoid(self.norm2(self.conv2(x_spatial_att)))

        out = x * x_spatial_att

        return out


if __name__ == '__main__':
    img = torch.rand(1, 64, 32, 48)
    b, c, h, w = img.shape
    net = GAM(in_channels=c)
    output = net(img)
    print(output.shape)


# CBAM
class ChannelAttention(nn.Module):
    """Channel-attention module https://github.com/open-mmlab/mmdetection/tree/v3.0.0rc1/configs/rtmdet."""

    def __init__(self, channels: int) -> None:
        """Initializes the class and sets the basic configurations and instance variables required."""
        super().__init__()
        self.pool = nn.AdaptiveAvgPool2d(1)
        self.fc = nn.Conv2d(channels, channels, 1, 1, 0, bias=True)
        self.act = nn.Sigmoid()

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        """Applies forward pass using activation on convolutions of the input, optionally using batch normalization."""
        return x * self.act(self.fc(self.pool(x)))


class SpatialAttention(nn.Module):
    """Spatial-attention module."""

    def __init__(self, kernel_size=7):
        """Initialize Spatial-attention module with kernel size argument."""
        super().__init__()
        assert kernel_size in (3, 7), "kernel size must be 3 or 7"
        padding = 3 if kernel_size == 7 else 1
        self.cv1 = nn.Conv2d(2, 1, kernel_size, padding=padding, bias=False)
        self.act = nn.Sigmoid()

    def forward(self, x):
        """Apply channel and spatial attention on input for feature recalibration."""
        return x * self.act(
            self.cv1(torch.cat([torch.mean(x, 1, keepdim=True), torch.max(x, 1, keepdim=True)[0]], 1))
        )


class CBAM(nn.Module):
    """Convolutional Block Attention Module."""

    def __init__(self, c1, kernel_size=7):
        """Initialize CBAM with given input channel (c1) and kernel size."""
        super().__init__()
        self.channel_attention = ChannelAttention(c1)
        self.spatial_attention = SpatialAttention(kernel_size)

    def forward(self, x):
        """Applies the forward pass through C1 module."""
        return self.spatial_attention(self.channel_attention(x))


# CA
class h_sigmoid(nn.Module):
    def __init__(self, inplace=True):
        super(h_sigmoid, self).__init__()
        self.relu = nn.ReLU6(inplace=inplace)

    def forward(self, x):
        return self.relu(x + 3) / 6


class h_swish(nn.Module):
    def __init__(self, inplace=True):
        super(h_swish, self).__init__()
        self.sigmoid = h_sigmoid(inplace=inplace)

    def forward(self, x):
        return x * self.sigmoid(x)


class CoordAtt(nn.Module):
    def __init__(self, inp, reduction=32):
        super(CoordAtt, self).__init__()
        oup = inp
        self.pool_h = nn.AdaptiveAvgPool2d((None, 1))
        self.pool_w = nn.AdaptiveAvgPool2d((1, None))

        mip = max(8, inp // reduction)
        self.conv1 = nn.Conv2d(inp, mip, kernel_size=1, stride=1, padding=0)
        self.bn1 = nn.BatchNorm2d(mip)
        self.act = h_swish()

        self.conv_h = nn.Conv2d(mip, oup, kernel_size=1, stride=1, padding=0)
        self.conv_w = nn.Conv2d(mip, oup, kernel_size=1, stride=1, padding=0)

    def forward(self, x):
        identity = x

        n, c, h, w = x.size()
        x_h = self.pool_h(x)
        x_w = self.pool_w(x).permute(0, 1, 3, 2)

        y = torch.cat([x_h, x_w], dim=2)
        y = self.conv1(y)
        y = self.bn1(y)
        y = self.act(y)

        x_h, x_w = torch.split(y, [h, w], dim=2)
        x_w = x_w.permute(0, 1, 3, 2)

        a_h = self.conv_h(x_h).sigmoid()
        a_w = self.conv_w(x_w).sigmoid()

        out = identity * a_w * a_h

        return out


# ECA
class ECA(nn.Module):
    """Constructs an ECA module.

    Args:
        channel: Number of channels of the input feature map
        k_size: Adaptive selection of kernel size
    """

    def __init__(self, channel, k_size=3):
        super(ECA, self).__init__()
        self.avg_pool = nn.AdaptiveAvgPool2d(1)
        self.conv = nn.Conv1d(1, 1, kernel_size=k_size, padding=(k_size - 1) // 2, bias=False)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        # feature descriptor on the global spatial information
        y = self.avg_pool(x)

        # Two different branches of ECA module
        y = self.conv(y.squeeze(-1).transpose(-1, -2)).transpose(-1, -2).unsqueeze(-1)

        # Multi-scale information fusion
        y = self.sigmoid(y)

        return x * y.expand_as(x)
\`\`\`

在 \`nn\` 下面新建文件夹 \`Attention_m\`，再新建一个 \`__init__.py\` 和一个 \`Attention.py\`。

\`Attention.py\` 里放置你复制的代码，这些代码都是一个 class（类），然后在 \`__init__.py\` 里写：

\`\`\`python
from .Attention import *
\`\`\`

然后在 \`nn/tasks.py\` 里加上：

\`\`\`python
from .Attention_m import *
\`\`\`

然后在 \`tasks.py\` 里找到这个函数，好像在 1575 行左右：

\`\`\`python
def parse_model(d, ch, verbose=True):
\`\`\`

再找到这行：

\`\`\`python
elif m is AIFI:
\`\`\`

这里就是很多个条件判断了，在前面添加一个同缩进的条件判断：

\`\`\`python
elif m in {GAM, CBAM, CoordAtt, ECA}:
    c2 = ch[f]
    args = [c2, *args]
\`\`\`

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/fda4a640-59f0-41bf-a51e-97b01d23af28/7551a78ea1b8742b275becdd9932549b9f33ac352be970fc80763ba8541fe21a.jpg)

如果你想要插入模块，就去找这个模块的 PyTorch 实现，然后把那个类加到 \`Attention.py\` 里（你完全可以换个名字，比如文件包叫 \`Add\`，下面有 \`Attention.py\` 和其它文件，只是别忘了在 \`__init__.py\` 里面全导入），最后在 \`tasks.py\` 里修改就行。

然后就是 \`.yaml\` 文件，比如你要插入 CBAM 在某个位置：

\`\`\`yaml
# Ultralytics YOLO 📂, AGPL-3.0 license
# YOLO11 object detection model with P3-P5 outputs. For Usage examples see https://docs.ultralytics.com/tasks/detect

# Parameters
nc: 80  # number of classes
scales:  # model compound scaling constants, i.e. 'model=yolo11n.yaml' will call yolo11.yaml with scale 'n'
  # [depth, width, max_channels]
  n: [0.50, 0.25, 1024]  # summary: 319 layers, 2624080 parameters, 2624064 gradients, 6.6 GFLOPs
  s: [0.50, 0.50, 1024]  # summary: 319 layers, 9458752 parameters, 9458736 gradients, 21.7 GFLOPs
  m: [0.50, 1.00, 512]   # summary: 409 layers, 20114688 parameters, 20114672 gradients, 68.5 GFLOPs
  l: [1.00, 1.00, 512]   # summary: 631 layers, 25372160 parameters, 25372144 gradients, 87.6 GFLOPs
  x: [1.00, 1.50, 512]   # summary: 631 layers, 56966176 parameters, 56966160 gradients, 196.0 GFLOPs

# YOLO11n backbone
backbone:
  # [from, repeats, module, args]
  - [-1, 1, Conv, [64, 3, 2]]       # 0-P1/2
  - [-1, 1, Conv, [128, 3, 2]]      # 1-P2/4
  - [-1, 2, C3k2, [256, False, 0.25]]
  - [-1, 1, Conv, [256, 3, 2]]      # 3-P3/8
  - [-1, 2, C3k2, [512, False, 0.25]]
  - [-1, 1, Conv, [512, 3, 2]]      # 5-P4/16
  - [-1, 2, C3k2, [512, True]]
  - [-1, 1, Conv, [1024, 3, 2]]     # 7-P5/32
  - [-1, 2, C3k2, [1024, True]]
  - [-1, 1, SPPF, [1024, 5]]        # 9
  - [-1, 2, C2PSA, [1024]]          # 10

# YOLO11n head
head:
  - [-1, 1, nn.Upsample, [None, 2, "nearest"]]
  - [[-1, 6], 1, Concat, [1]]       # cat backbone P4
  - [-1, 2, C3k2, [512, False]]     # 13
  - [-1, 1, nn.Upsample, [None, 2, "nearest"]]
  - [[-1, 4], 1, Concat, [1]]       # cat backbone P3
  - [-1, 2, C3k2, [256, False]]     # 16 (P3/8-small)
  - [-1, 1, Conv, [256, 3, 2]]
  - [[-1, 13], 1, Concat, [1]]      # cat head P4
  - [-1, 2, C3k2, [512, False]]     # 19 (P4/16-medium)
  - [-1, 1, Conv, [512, 3, 2]]
  - [[-1, 10], 1, Concat, [1]]      # cat head P5
  - [-1, 2, C3k2, [1024, True]]     # 22 (P5/32-large)
  - [-1, 1, CBAM, []]               # 23 这里是在大目标检测层输出位置添加一个注意力机制
  # - [-1, 1, ECA, []]              # 23
  # - [-1, 1, GAM, []]              # 23
  # - [-1, 1, CoordAtt, []]         # 23
  - [[16, 19, 23], 1, Detect, [nc]] # Detect(P3, P4, P5)
\`\`\`

这个作为 \`cfg\` 参数可以直接传给 model：

\`\`\`python
model = YOLO("cfg/models/yolo_CBAM.yaml")
\`\`\`

准备好你自己的 \`data.yaml\`，此处是一个已经设置了数据增强的代码：

\`\`\`python
from ultralytics import YOLO
import warnings

warnings.filterwarnings('ignore')
from pathlib import Path

if __name__ == '__main__':
    # 加载模型
    model = YOLO("cfg/models/yolo_SE.yaml")  # 你要选择的模型 yaml 文件地址
    # Use the model
    results = model.train(
        data=r"F:\\pycharm\\machine_learning\\train.yaml",
        device='0',  # 没有 GPU 写 'cpu'
        epochs=500,
        patience=50,
        imgsz=640,
        iou=0.5,
        lr0=0.005,
        lrf=0.009,
        degrees=30,
        hsv_s=0.75,
        hsv_h=0.020,
    )  # 训练模型
\`\`\`

在你运行前真心建议你把其它能结束的任务全结束了，尤其是 Edge 什么的。

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/fda4a640-59f0-41bf-a51e-97b01d23af28/8b42e12d9df0190b7e0a407989d4efc04b09bc26b0491bb4c48a2f4a724d15a7.jpg)

结果将保存到 \`runs\\detect\\train\`，其实名字是可以指定的，有个 \`name\` 参数。

# 查看运行结果

进入 \`runs\\detect\\train\`：

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/fda4a640-59f0-41bf-a51e-97b01d23af28/78900d0a2acfd362be5dde9c04e6ef1f6d1e7531f746bcda808131b924f37c42.jpg)

\`weights\` 里有两个模型：

- \`best.pt\` —— 表现最好的
- \`last.pt\` —— 最后一轮的

\`args.yaml\` 保存了这次的训练配置信息。然后就是评估指标（mAP、P、R 等），还有 \`results.csv\` 保存了每一轮的结果。\`results.png\` 就是随着训练轮数的增加，各个参数的变化线。后面的就是验证集上的结果。
`,Mi=`# YOLO 原理和结构概述

给一张图片，给定目标物体，要求从照片中检测出目标物体——计算机视觉中检测和分割是长久而热门的问题。

# 伟大的 RCNN

RCNN 是将 CNN 方法引入目标检测任务的伟大算法，深度学习时代第一个重要的目标检测算法。

## R-CNN (Regions with CNN features)

### 工作流程

1. 使用 Selective Search 生成约 2000 个候选区域
2. 将每个区域缩放到固定尺寸
3. 使用 CNN 提取特征
4. 使用 SVM 分类
5. 使用回归器精修边界框

### ⚠️ 存在的问题

- 训练过程分为多个阶段
- 特征提取重复计算
- 速度慢（测试时间约 47s/张）
- 需要大量磁盘空间存储特征

## Fast R-CNN

Fast R-CNN 对 R-CNN 进行了重要改进。

### 主要创新

1. 共享卷积计算
2. ROI Pooling 层
3. 多任务损失函数（分类 + 回归）

### ✅ 改进效果

- 训练和测试速度提升
- 精度提升
- 单阶段训练
- 不需要磁盘存储

### ⚠️ 仍存在的问题

- 仍依赖 Selective Search
- 候选区域生成是瓶颈（~2s/张）

## Faster R-CNN

Faster R-CNN 通过引入 RPN 网络，实现了端到端的目标检测。

### 核心创新

1. 区域建议网络（RPN）
2. Anchor 机制
3. 特征共享

### ✅ 优势

- 检测速度显著提升（~0.2s/张）
- 可端到端训练
- 精度进一步提升

### ⚠️ 局限性

- 仍是两阶段方法
- 实时性有限
- 网络结构复杂

# YOLO 的原理

YOLO 就是 **You Only Look Once**。

## Bounding Box

如果让你去用矩形框框出目标，那么这个矩形框的信息怎么储存呢？我们使用 bounding box，bbox 有很多种，YOLO 里的 bbox 以如下参数定位矩形框：

- \`cx, cy\`：中心点的横纵坐标
- \`w, h\`：矩形框的宽和高，但是注意这里用的是归一化的策略，也就是占比——如果矩形框高 300，整幅图片高 600，那么 h 就是 0.5
- \`c\`：置信度

## YOLO 的创新点

之前的目标检测都难以摆脱遍历图像和其它计算量大的算法。YOLO 团队就想：你分类器输出的是向量，那我直接换成 $(x, y, w, h, c)$，把问题转化为回归问题，直接回归出 bbox 的位置不就好了？

于是 YOLO 就把图片分割成 $S \\times S$ 个 grid，每个 grid 大小相等。传统的思路就是每个框只能识别一个物体，而且物体必须在 grid 内，YOLO 放低了这个要求，只要求物体的中心在 grid 内。第一次预测的效果可能是这样的：

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/b38f3ff1-b828-42df-8da1-fabb5047eec0/40d932b4397458722ec8094d70df73cbc09c36c24847ce432dcbf259ade4402e.jpg)

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/b38f3ff1-b828-42df-8da1-fabb5047eec0/ea992957d1dda0fec54d9a2251af1aaaf3840ff38880a44b75b9cfe1618eb0f7.jpg)

那么问题来了，每个 grid 都有自己的框，这样才能扫描整个图像，但框太多了完全没有重点和效果。这个时候就要用到 IOU（交并比）了：

两个框分别为 $B_1, B_2$，它们的交并比为：

$$
IOU = \\frac{B_1 \\cap B_2}{B_1 \\cup B_2}
$$

置信度 $\\text{confidence} = Pr(obj) \\times IOU_{truth}^{pred}$，其中 $Pr(obj)$ 表示一个 grid 有物体的概率，用来预测有多大把握这个物体在某个 grid 里。

如果使用聚类，检测左边瓶子的 grid 里选择 confidence 最大的，其它都不保留。这确实是删去多余框的办法，但问题是如果目标很小，一个框里有多个目标，两个目标物体本身也很近，容易被识别成一个物体。

这就要使用**非极大值抑制（NMS）**了。如果两个框重合度很高，大概率是一个目标，那就选择 confidence 较大的框，一旦两个框的 IOU 大于了我们设置的阈值，就保留置信度大的。

对于小目标检测，YOLO 给出的方法很直白：每个 grid 生成两个框，一个负责大目标，一个负责小目标。

这是它的损失函数：

$$
\\lambda_{\\mathrm{coord}} \\sum_{i=0}^{S^2} \\sum_{j=0}^{B} \\mathbb{1}_{ij}^{\\mathrm{obj}} \\left[(x_i - \\hat{x}_i)^2 + (y_i - \\hat{y}_i)^2\\right]
$$

$$
+ \\lambda_{\\mathrm{coord}} \\sum_{i=0}^{S^2} \\sum_{j=0}^{B} \\mathbb{1}_{ij}^{\\mathrm{obj}} \\left[\\left(\\sqrt{w_i} - \\sqrt{\\hat{w}_i}\\right)^2 + \\left(\\sqrt{h_i} - \\sqrt{\\hat{h}_i}\\right)^2\\right]
$$

$$
+ \\sum_{i=0}^{S^2} \\sum_{j=0}^{B} \\mathbb{1}_{ij}^{\\mathrm{obj}} (C_i - \\hat{C}_i)^2
$$

置信度误差（边框内有对象）

$$
+ \\lambda_{\\mathrm{noobj}} \\sum_{i=0}^{S^2} \\sum_{j=0}^{B} \\mathbb{1}_{ij}^{\\mathrm{noobj}} (C_i - \\hat{C}_i)^2
$$

置信度误差（边框内无对象）

$$
+ \\sum_{i=0}^{S^2} \\mathbb{1}_i^{\\mathrm{obj}} \\sum_{c \\in \\text{classes}} (p_i(c) - \\hat{p}_i(c))^2
$$

然后 YOLOv1 被刊物拒稿了……

# 现代 YOLO 的结构

- YOLOv8
- MMYOLO

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/b38f3ff1-b828-42df-8da1-fabb5047eec0/0901517be4d5d539bc155f2fc7bee3e67cb9e5bffb6428d3b5313023685ac069.jpg)

## Backbone

YOLO 负责特征提取的部分，YOLOv8 后 C2f 模块替代了 C3 模块，人们可以手动替换这些模块，只需要在源文件里定义模块，然后在 \`.yaml\` 文件中写好 backbone 即可：

\`\`\`yaml
backbone:
  # [from, repeats, module, args]
  - [-1, 1, Conv, [64, 3, 2]]       # 0-P1/2 第0层，-1代表将上层的输入作为本层的输入。第0层的输入是640*640*3的图像。Conv代表卷积层，相应的参数：64代表输出通道数，3代表卷积核大小k，2代表stride步长。
  - [-1, 1, Conv, [128, 3, 2]]      # 1-P2/4 第1层，本层和上一层是一样的操作（128代表输出通道数，3代表卷积核大小k，2代表stride步长）
  - [-1, 3, C2f, [128, True]]       # 第2层，本层是C2f模块，3代表本层重复3次。128代表输出通道数，True表示Bottleneck有shortcut。
  - [-1, 1, Conv, [256, 3, 2]]      # 3-P3/8 第3层，进行卷积操作（256代表输出通道数，3代表卷积核大小k，2代表stride步长），输出特征图尺寸为80*80*256（卷积的参数都没变，所以都是长宽变成原来的1/2，和之前一样），特征图的长宽已经变成输入图像的1/8。
  - [-1, 6, C2f, [256, True]]       # 第4层，本层是C2f模块，6代表本层重复6次。256代表输出通道数，True表示Bottleneck有shortcut。经过这层之后，特征图尺寸依旧是80*80*256。
  - [-1, 1, Conv, [512, 3, 2]]      # 5-P4/16 第5层，进行卷积操作（512代表输出通道数，3代表卷积核大小k，2代表stride步长），输出特征图尺寸为40*40*512（卷积的参数都没变，所以都是长宽变成原来的1/2，和之前一样），特征图的长宽已经变成输入图像的1/16。
  - [-1, 6, C2f, [512, True]]       # 第6层，本层是C2f模块，6代表本层重复6次。512代表输出通道数，True表示Bottleneck有shortcut。经过这层之后，特征图尺寸依旧是40*40*512。
  - [-1, 1, Conv, [1024, 3, 2]]     # 7-P5/32 第7层，进行卷积操作（1024代表输出通道数，3代表卷积核大小k，2代表stride步长），输出特征图尺寸为20*20*1024（卷积的参数都没变，所以都是长宽变成原来的1/2，和之前一样），特征图的长宽已经变成输入图像的1/32。
  - [-1, 3, C2f, [1024, True]]       # 第8层，本层是C2f模块，3代表本层重复3次。1024代表输出通道数，True表示Bottleneck有shortcut。经过这层之后，特征图尺寸依旧是20*20*1024。
  - [-1, 1, SPPF, [1024, 5]]         # 9 第9层，本层是快速空间金字塔池化层（SPPF）。1024代表输出通道数，5代表池化核大小k。结合模块结构图和代码可以看出，最后concat得到的特征图尺寸是20*20*（512*4），经过一次Conv得到20*20*1024。
\`\`\`

比如说可以在其中插入注意力模块（SE、CBAM）等。

## Neck

负责多尺度特征融合。PAN-FPN 结构。

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/b38f3ff1-b828-42df-8da1-fabb5047eec0/139e812137fd985fe1197c4fa817fb60756ed929fede8d353fad7670fee6d5c8.jpg)

\`\`\`yaml
head:
  - [-1, 1, nn.Upsample, [None, 2, 'nearest']]   # 第10层，本层是上采样层。-1代表将上层的输出作为本层的输入。None代表上采样的size（输出尺寸）不指定。2代表scale_factor=2，表示输出的尺寸是输入尺寸的2倍。nearest代表使用的上采样算法为最近邻插值算法。经过这层之后，特征图的长和宽变成原来的两倍，通道数不变，所以最终尺寸为40*40*1024。
  - [[-1, 6], 1, Concat, [1]]                    # cat backbone P4 第11层，本层是concat层，[-1,6]代表将上层和第6层的输出作为本层的输入。[1]代表concat拼接的维度是1。从上面的分析可知，上层的输出尺寸是40*40*1024，第6层的输出是40*40*512，最终本层的输出尺寸为40*40*1536。
  - [-1, 3, C2f, [512]]                          # 12 第12层，本层是C2f模块，3代表本层重复3次。512代表输出通道数。与Backbone中C2f不同的是，此处的C2f的bottleneck模块的shortcut=False。
  - [-1, 1, nn.Upsample, [None, 2, 'nearest']]   # 第13层，本层也是上采样层（参考第10层）。经过这层之后，特征图的长和宽变成原来的两倍，通道数不变，所以最终尺寸为80*80*512。
  - [[-1, 4], 1, Concat, [1]]                    # cat backbone P3 第14层，本层是concat层，[-1,4]代表将上层和第4层的输出作为本层的输入。[1]代表concat拼接的维度是1。从上面的分析可知，上层的输出尺寸是80*80*512，第4层的输出是80*80*256，最终本层的输出尺寸为80*80*768。
  - [-1, 3, C2f, [256]]                          # 15 (P3/8-small) 第15层，本层是C2f模块，3代表本层重复3次。256代表输出通道数。经过这层之后，特征图尺寸变为80*80*256，特征图的长宽已经变成输入图像的1/8。
  - [-1, 1, Conv, [256, 3, 2]]                   # 第16层，进行卷积操作（256代表输出通道数，3代表卷积核大小k，2代表stride步长），输出特征图尺寸为40*40*256（卷积的参数都没变，所以都是长宽变成原来的1/2，和之前一样）。
  - [[-1, 12], 1, Concat, [1]]                   # cat head P4 第17层，本层是concat层，[-1, 12]代表将上层和第12层的输出作为本层的输入。[1]代表concat拼接的维度是1。从上面的分析可知，上层的输出尺寸是40*40*256，第12层的输出是40*40*512，最终本层的输出尺寸为40*40*768。
  - [-1, 3, C2f, [512]]                          # 18 (P4/16-medium) 第18层，本层是C2f模块，3代表本层重复3次。512代表输出通道数。经过这层之后，特征图尺寸变为40*40*512，特征图的长宽已经变成输入图像的1/16。
  - [-1, 1, Conv, [512, 3, 2]]                   # 第19层，进行卷积操作（512代表输出通道数，3代表卷积核大小k，2代表stride步长），输出特征图尺寸为20*20*512（卷积的参数都没变，所以都是长宽变成原来的1/2，和之前一样）。
  - [[-1, 9], 1, Concat, [1]]                     # cat head P5 第20层，本层是concat层，[-1, 9]代表将上层和第9层的输出作为本层的输入。[1]代表concat拼接的维度是1。从上面的分析可知，上层的输出尺寸是20*20*512，第9层的输出是20*20*1024，最终本层的输出尺寸为20*20*1536。
  - [-1, 3, C2f, [1024]]                         # 21 (P5/32-large) 第21层，本层是C2f模块，3代表本层重复3次。1024代表输出通道数。经过这层之后，特征图尺寸变为20*20*1024，特征图的长宽已经变成输入图像的1/32。
  # 以上是Neck部分，YOLO里Neck和head都在head里。
  - [[15, 18, 21], 1, Detect, [nc]]              # Detect(P3, P4, P5) 第22层，本层是Detect层，[15, 18, 21]代表将第15、18、21层的输出（分别是80*80*256、40*40*512、20*20*1024）作为本层的输入。nc是数据集的类别数。
\`\`\`

## Head

执行最终检测任务，包含一个检测头和一个分类头。\`.yaml\` 文件中的 Detect 层部分：

\`\`\`yaml
- [[15, 18, 21], 1, Detect, [nc]]  # Detect(P3, P4, P5) 本层是Detect层，[15, 18, 21]代表将第15、18、21层的输出（分别是80*80*256、40*40*512、20*20*1024）作为本层的输入。nc是数据集的类别数。
\`\`\`
`,Ti=`# 常见颜色空间

## 1. BGR（OpenCV 默认）

- Blue, Green, Red 通道
- 每个通道 0–255
- 适合计算机处理

## 2. RGB（更常见）

- Red, Green, Blue 通道
- 需要从 BGR 转换

\`\`\`python
rgb_img = cv.cvtColor(bgr_img, cv.COLOR_BGR2RGB)
\`\`\`

## 3. 灰度图（单通道）

- 0–255 灰度值
- 用于许多图像处理算法

\`\`\`python
gray_img = cv.cvtColor(bgr_img, cv.COLOR_BGR2GRAY)
\`\`\`

## 4. HSV（色调、饱和度、明度）

- 更符合人眼感知
- 适合颜色分割

\`\`\`python
hsv_img = cv.cvtColor(bgr_img, cv.COLOR_BGR2HSV)
\`\`\`

# 创建、显示、保存图像和简单操作

之前我们了解到，二维的 Numpy 数组可以表示二维图像，三维的可以表示彩色图像。OpenCV 也正是利用这一点，其中 Numpy 数组里元素的类型为 \`uint8\`，只需指定数组的 \`dtype\` 为 \`np.uint8\` 即可。

\`\`\`python
import cv2 as cv
import numpy as np

# 创建一个纯黑色的画布
canvas = np.zeros((300, 300, 3), dtype=np.uint8)  # (0, 0, 0) 对应黑色
cv.imshow('black', canvas)
cv.waitKey(0)
cv.destroyAllWindows()
\`\`\`

## 函数解释

1. \`imshow(winname, img)\`，其中第一个参数是窗口的名字，第二个参数是图像的变量名。
2. \`waitKey()\`：\`imshow\` 执行完后后面没有代码会立马结束运行，\`waitKey\` 顾名思义就是等待用户按下按键的意思，在按键按下之前会一直停在这一行代码，用户按下键盘按键后才会开始执行后面的代码。
3. \`destroyAllWindows()\`：顾名思义，摧毁所有 OpenCV 开启的窗口。

\`\`\`python
img = cv.imread('image/cute.png', 1)
img = cv.resize(img, (0, 0), fx=0.8, fy=0.8)
img = cv.rotate(img, cv.ROTATE_90_CLOCKWISE)
print(img.shape)
cv.imwrite('new_cute.png', img)
cv.imshow('cute', img)
cv.waitKey(0)
cv.destroyAllWindows()
\`\`\`

1. \`img = cv.imread('image/cute.png', 1)\`：使用 \`cv.imread\` 函数从指定路径读取名为 \`cute.png\` 的图像文件。第二个参数 \`1\` 表示以彩色模式（BGR）加载图像。如果指定 \`0\`，则图像将以灰度模式加载。
2. \`img = cv.resize(img, (0, 0), fx=0.8, fy=0.8)\`：使用 \`cv.resize\` 函数调整图像的大小。\`(0, 0)\` 表示不指定具体的宽度和高度，而是使用 \`fx\` 和 \`fy\` 参数来指定缩放比例。这里的 \`fx=0.8\` 和 \`fy=0.8\` 表示图像的宽度和高度将各自缩小到原来的 80%。
3. \`img = cv.rotate(img, cv.ROTATE_90_CLOCKWISE)\`：使用 \`cv.rotate\` 函数将图像顺时针旋转 90 度。\`cv.ROTATE_90_CLOCKWISE\` 是一个常量，表示旋转方向为顺时针 90 度。
4. \`print(img.shape)\`：打印图像的形状，即图像的高度、宽度和通道数。对于彩色图像，通道数通常是 3（BGR）。这行代码用于检查图像经过上述变换后的尺寸。
5. \`cv.imwrite('new_cute.png', img)\`：使用 \`cv.imwrite\` 函数将处理后的图像保存到指定路径。这里将图像保存为 \`new_cute.png\`。
6. \`cv.imshow('cute', img)\`：使用 \`cv.imshow\` 函数在窗口中显示处理后的图像。窗口名称为 \`cute\`，将要显示的图像为 \`img\`。
7. \`cv.waitKey(0)\`：使用 \`cv.waitKey\` 函数等待用户按键事件。参数 \`0\` 表示无限期等待，直到用户按下任意键为止。
8. \`cv.destroyAllWindows()\`：使用 \`cv.destroyAllWindows\` 函数关闭所有 OpenCV 打开的窗口。通常在 \`cv.waitKey\` 之后调用，以确保在用户按下任意键后关闭显示图像的窗口。

# 基础图像处理

## 1. 访问和修改像素

其实就是 Numpy 数组的索引和切片。

\`\`\`python
# 获取某个像素点的值，就是索引就好了
px = img[100, 100]  # 返回 BGR 值
# 或者
b, g, r = img[100, 100]  # 分别获取通道值
# 修改像素值
img[100, 100] = [255, 0, 0]  # 设置为蓝色
\`\`\`

## 2. ROI（感兴趣区域）操作

\`\`\`python
# 截取区域，其实就是切片
roi = img[100:200, 200:300]  # [y1:y2, x1:x2]
# 复制区域
face = roi.copy()  # 创建副本而不是视图
\`\`\`

## 3. 通道操作

\`\`\`python
# 分离通道
b, g, r = cv.split(img)

# 合并通道
merged = cv.merge([b, g, r])

# 仅保留某个通道
blue_only = img.copy()
blue_only[:, :, 1:] = 0  # 将绿色和红色通道置 0
\`\`\`

现在试试阅读代码，推测输出结果，并运行代码验证你的结果：

\`\`\`python
img = cv.imread('image/cute.png', 1)
img = cv.resize(img, (0, 0), fx=0.8, fy=0.8)
img = cv.rotate(img, cv.ROTATE_90_CLOCKWISE)

for i in range(100):
    for j in range(img.shape[1]):
        img[i][j] = [255, 255, 255]

tag = img[0:100, 200:300]
img[100:200, 100:200] = tag

cv.imshow('cute_guy', img)
cv.waitKey(0)
cv.destroyAllWindows()
\`\`\`

# 图像几何变换

## 1. 缩放

\`\`\`python
# 指定大小缩放
resized = cv.resize(img, (width, height))
# 按比例缩放
scaled = cv.resize(img, None, fx=0.5, fy=0.5)  # 缩小一半
\`\`\`

## 2. 旋转

\`\`\`python
# 获取图像中心点
height, width = img.shape[:2]
center = (width // 2, height // 2)

# 创建旋转矩阵
rotation_matrix = cv.getRotationMatrix2D(center, angle=45, scale=1.0)
# 很显然这个函数需要旋转点的坐标（元组），angle, scale 来创建相应的旋转矩阵

# 执行旋转
rotated = cv.warpAffine(img, rotation_matrix, (width, height))
\`\`\`

## 3. 平移

\`\`\`python
# 创建平移矩阵
matrix = np.float32([[1, 0, 100], [0, 1, 50]])  # 向右 100，向下 50
# 执行平移
shifted = cv.warpAffine(img, matrix, (width, height))
\`\`\`

# 图像增强与滤波

## 1. 高斯模糊

\`\`\`python
# kernel_size 必须是奇数
blurred = cv.GaussianBlur(img, (5, 5), 0)
cv.imshow('Original Image', img)
cv.imshow('Blurred Image', blurred)
cv.waitKey(0)
cv.destroyAllWindows()
\`\`\`

高斯模糊（Gaussian Blur）：这是一种常用的图像平滑技术，通过使用高斯函数权重来模糊图像，从而减少噪声和细节。

**参数解释：**

- \`src\`：输入的图像。可以是彩色图像（BGR）或灰度图像。类型：\`numpy.ndarray\`。
- \`ksize\`：高斯核的大小，格式为 \`(width, height)\`。必须是正数且至少为 3，同时宽度和高度必须是奇数。如果设置为 \`(0, 0)\`，OpenCV 会根据标准差 σ 自动计算核的大小。
- \`sigmaX\`：高斯核在 X 方向的标准差。如果设置为 0，OpenCV 会根据核的大小自动计算。
- \`sigmaY\`：高斯核在 Y 方向的标准差。如果设置为 0，它将取与 \`sigmaX\` 相同的值。

## 2. 边缘检测

Canny 边缘检测：这是一种多阶段的边缘检测算法，能够检测图像中的边缘。步骤：

1. 先转为灰度图减少计算成本
2. 高斯滤波：平滑图像，减少噪声
3. 使用 Sobel 算子计算像素水平和垂直上的梯度 $G_x, G_y$
4. 非极大值抑制：通过比较像素点和邻域像素点的梯度幅度，保留局部梯度幅度的最大值，可以细化边缘，使得边缘更清晰（瘦身）
5. 双阈值检测：超过最大阈值就认定为强边缘，低于最小阈值认定为非边缘，中间的认定为弱边缘。如果弱边缘与强边缘接触则保留，否则不保留

**参数解释：**

- \`img\`：输入的图像
- \`100\`：Canny 边缘检测算法的最小阈值
- \`200\`：Canny 边缘检测算法的最大阈值。这两个阈值用于确定哪些边缘是强边缘、弱边缘以及非边缘

\`\`\`python
# Canny 边缘检测
edges = cv.Canny(img, 100, 200)  # 参数：最小阈值，最大阈值
cv.imshow('Original Image', img)
cv.imshow('Edges', edges)
cv.waitKey(0)
cv.destroyAllWindows()
\`\`\`

你也可以提前处理图像：

\`\`\`python
# 将图像转换为灰度图像
gray_img = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

# 应用高斯模糊以减少噪声
blurred_img = cv.GaussianBlur(gray_img, (5, 5), 0)

# 使用 Canny 边缘检测算法
edges = cv.Canny(blurred_img, 100, 200)

# 显示原始图像和边缘检测后的图像
cv.imshow('Original Image', img)
cv.imshow('Edges', edges)
cv.waitKey(0)
cv.destroyAllWindows()
\`\`\`

## 3. 阈值处理

### 原理

阈值处理是一种将图像中的像素值根据某个阈值进行二值化处理的技术。通过阈值处理，图像被转换为只有两种灰度级别的图像（通常是 0 和 255），从而简化图像的后续处理。阈值处理的基本原理是将图像中的每个像素值与其阈值进行比较，并根据比较结果将其设置为某种特定的值。

### 阈值处理的类型

1. **简单阈值（Global Thresholding）**：对整个图像应用一个全局阈值。像素值大于阈值的被设置为最大阈值（通常是 255），小于阈值的被设置为最小阈值（通常是 0）。
2. **自适应阈值（Adaptive Thresholding）**：根据图像的局部区域应用不同的阈值。这种方法适用于光照不均匀的图像，能够更好地提取边缘和细节。

\`\`\`python
# 将图像转换为灰度图像
gray_img = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

# 应用简单阈值处理
ret, thresh = cv.threshold(gray_img, 127, 255, cv.THRESH_BINARY)

# 应用自适应阈值处理
adaptive = cv.adaptiveThreshold(
    gray_img, 255,
    cv.ADAPTIVE_THRESH_GAUSSIAN_C,
    cv.THRESH_BINARY, 11, 2,
)

# 显示原始图像、简单阈值处理后的图像和自适应阈值处理后的图像
cv.imshow('Original Image', img)
cv.imshow('Simple Thresholding', thresh)
cv.imshow('Adaptive Thresholding', adaptive)
cv.waitKey(0)
cv.destroyAllWindows()
\`\`\`

### 简单阈值处理参数

- \`gray_img\`：输入的灰度图像
- \`127\`：阈值。像素值大于 127 的将被设置为 255，否则被设置为 0
- \`255\`：最大阈值。当像素值大于阈值时，将被设置为这个值
- \`cv2.THRESH_BINARY\`：阈值类型，表示使用二值化处理。其他常见的阈值类型还包括：
  - \`cv2.THRESH_BINARY_INV\`：反二值化
  - \`cv2.THRESH_TRUNC\`：截断
  - \`cv2.THRESH_TOZERO\`：零阈值
  - \`cv2.THRESH_TOZERO_INV\`：反零阈值

### 自适应阈值处理参数

- \`gray_img\`：输入的灰度图像
- \`255\`：最大阈值
- \`cv2.ADAPTIVE_THRESH_GAUSSIAN_C\`：自适应阈值方法，表示使用高斯加权求和的自适应阈值
- \`cv2.ADAPTIVE_THRESH_MEAN_C\`：使用邻域平均值减去常数 C 作为阈值
- \`cv2.THRESH_BINARY\`：阈值类型
- \`11\`：邻域大小，必须是奇数
- \`2\`：常数 C，从高斯加权求和中减去的常数值

# 在图像上绘图

\`\`\`python
image = cv.imread('image/cute.png', 1)
height = image.shape[0]
end1 = image.shape[1]
end2 = image.shape[0]

line = cv.line(image, (0, 0), (end1, end2), (255, 0, 0), 10)
# image: 以这个图像所在图层为画布，绘制线条
# (0, 0): 线条的起始点坐标
# (end1, end2): 线条的结束点坐标，此处为右下角
# (255, 0, 0): 线条的颜色，这里表示蓝色（在 BGR 颜色空间中）
# 10: 线条的宽度，单位为像素

# 使用 OpenCV 在图像上绘制一个黑色的矩形
rect1 = cv.rectangle(image, (100, 100), (200, 200), (0, 0, 0), 5)
# image: 在这个图像上绘制矩形
# (100, 100): 矩形的左上角坐标
# (200, 200): 矩形的右下角坐标
# (0, 0, 0): 矩形的颜色，这里表示黑色（在 BGR 颜色空间中）
# 5: 矩形边框的宽度，单位为像素

# 使用 OpenCV 在图像上绘制一个绿色的实心圆
circle = cv.circle(image, (300, 300), 60, (120, 255, 0), -1)
# image: 在这个图像上绘制圆
# (300, 300): 圆心的坐标
# 60: 圆的半径，单位为像素
# (120, 255, 0): 圆的颜色，这里表示绿色（在 BGR 颜色空间中）
# -1: 表示填充圆，即绘制一个实心圆

# 定义使用的字体样式为 FONT_HERSHEY_SIMPLEX
font = cv.FONT_HERSHEY_SIMPLEX

# 使用 OpenCV 在图像上绘制文本
text = cv.putText(
    image, 'Nuaa is the best', (200, height - 10), font, 1, (200, 40, 0), 1, cv.LINE_AA,
)
# image: 在这个图像上绘制文本
# 'Nuaa is the best': 要绘制的文本内容
# (200, height-10): 文本左下角的位置坐标（org 为文本左下角坐标）
# font: 字体样式，这里使用的是 FONT_HERSHEY_SIMPLEX
# 1: 字体大小
# (200, 40, 0): 文本的颜色，这里表示紫色（在 BGR 颜色空间中）
# 1: 文本边框的宽度，单位为像素
# cv.LINE_AA: 表示使用抗锯齿线，使文本更平滑

cv.imshow('draw', image)
cv.waitKey(0)
cv.destroyAllWindows()
\`\`\`

# 霍夫变换与简单图形特征提取

此处只介绍霍夫直线变换的标准算法。

笛卡尔坐标系里，对于一条直线，可以由 $(x_1, y_1), (x_2, y_2)$ 或者 $y = kx + b$ 表示一根直线。如果直线确定了，那么显然 $k$ 和 $b$ 的值也就确定了，我们新建一个坐标系，横轴为 $k$，纵轴为 $b$——就这样我们把原坐标系的一条直线，映射成了另一个坐标系上的点，显然这个映射是可逆的。像空间的一个点确定了，它的坐标 $(k, b)$ 也就确定了，这两个值确定了原空间的直线也就确定了。变换后的空间称为霍夫空间。

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/76eca3b8861ef30f3605d4522404f0067326fcd422febc0b540f59e099e39bba.jpg)

那么霍夫空间里一条直线对应什么呢？由 $y = kx + b$，可得方程组：

| 原空间点 | 方程 |
|----------|------|
| $(x_1, y_1)$ | $y_1 = kx_1 + b$ |
| $(x_2, y_2)$ | $y_2 = kx_2 + b$ |

化为以 $(k, b)$ 为变量的形式：

| 原空间点 | 霍夫空间直线 |
|----------|--------------|
| $(x_1, y_1)$ | $b = -kx_1 + y_1$ |
| $(x_2, y_2)$ | $b = -kx_2 + y_2$ |

也就是 $(x_1, y_1), (x_2, y_2)$ 对应霍夫空间中两条直线，这两条直线的交点就是直线的对应点。

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/aa61e58d7ce6415315302fd0a46c201d7253ceea73529dcdb858dfb5f6e2e0f0.jpg)

显然："原空间 n 个点共线"等价于"霍夫空间中对应的 n 条线交于同一个点"。那么如果原空间就不止一条直线呢？霍夫变换会选择由尽可能多的直线汇成的点。例如：其实 (3, 2) 与 (4, 1) 也可以组成直线，只不过它有两个点确定，而图中 A、B 两点是由三条直线汇成。

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/67e98cad607e7f73af17a04b217beca18e72f0cbcc0bb3a2851106200c03cc7e.jpg)

$$
y = kx + q \\quad \\Longrightarrow \\quad q = -xk + y
$$

| 原空间点 $(x, y)$ | 霍夫空间直线 $q = -xk + y$ |
|-------------------|---------------------------|
| $(1, 0)$ | $q = -k$ |
| $(1, 1)$ | $q = -k + 1$ |
| $(2, 1)$ | $q = -2k + 1$ |
| $(4, 1)$ | $q = -4k + 1$ |
| $(3, 2)$ | $q = -3k + 2$ |

但是对于 $k = 0$、$q$ 为无穷大的直线（平行 y 轴），我们就采取极坐标的方式修正。原空间的点在霍夫变换里本来对应直线，采用极坐标后就会对应三角函数。

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/e0db2f5d9424309dc835c3cf10881fd5dff55c1af789f625d14d4ce657a5dc1f.jpg)

**笛卡尔坐标系**

$$
y = kx + q \\quad \\Longrightarrow \\quad q = -xk + y
$$

| 原空间点 $(x, y)$ | 霍夫空间直线 |
|-------------------|--------------|
| $(1, 0)$ | $q = -k$ |
| $(2, 1)$ | $q = -2k + 1$ |
| $(3, 2)$ | $q = -3k + 2$ |

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/02eeab3000a297ef17ae82960c677b54dd206922e062db04f17b19ee1fc3af50.jpg)

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/2091ecbf764254e7e9b2c058ccebb046cd963ca45cb770b46e7d89be26f1df5d.jpg)

**霍夫空间**

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/30b92ba868e7614b02c3c5f6ca60e2bd68c64b1cc0f8dab7e3213bfaf62a2f4e.jpg)

**极坐标系**

$$
x \\cos \\theta + y \\sin \\theta = \\rho \\implies \\rho = \\cos \\theta \\cdot x + \\sin \\theta \\cdot y
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/77a4d311e823f8ce2e4f0f8ae87c14e35eb1edd6d1031b11e9f22780440709d4.jpg)

| 原空间点 $(x, y)$ | 极坐标直线 $\\rho = x\\cos\\theta + y\\sin\\theta$ |
|-------------------|---------------------------------------------|
| $(1, 0)$ | $\\rho = \\cos\\theta$ |
| $(2, 1)$ | $\\rho = 2\\cos\\theta + \\sin\\theta$ |
| $(3, 2)$ | $\\rho = 3\\cos\\theta + 2\\sin\\theta$ |

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/7fbc1c669ec8926fd0c0a610264a6f42aa32afc523d0d20c11ed329a8850fdfa.jpg)

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/a86239338c8e6fe26b93960e8a785c4ff4dc34979808ba3fb607c135a9bc19fe.jpg)

**霍夫空间**

如图，极坐标中直线的表达式为 $\\rho = x\\cos\\theta + y\\sin\\theta$（$\\rho$ 为原点到直线的距离）。一条直线上每个点的 $\\rho$ 在固定 $\\theta$ 下是一样的。在计算机中，我们可以用小步长遍历 $\\theta$ 的值，统计每个 $(\\rho, \\theta)$ 组合出现的次数（投票），哪个 $\\rho$ 在所有 $\\theta$ 中出现的次数最多，就证明这是哪条直线。实际中 $\\theta$ 的取值不会跨度这么大，一般是 1 度。

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/3a201bee3d781f8c95d503330ea8780d25b15a22061b1f2712da91c371cfc5e9.jpg)

$$
y = kx + b
$$

$$
\\rho = x \\cos \\theta + y \\sin \\theta
$$

| 原空间点 $(x, y)$ | 极坐标直线 |
|-------------------|------------|
| $(1, 8)$ | $\\rho = \\cos\\theta + 8\\sin\\theta$ |
| $(3, 6)$ | $\\rho = 3\\cos\\theta + 6\\sin\\theta$ |
| $(5, 4)$ | $\\rho = 5\\cos\\theta + 4\\sin\\theta$ |
| $(7, 2)$ | $\\rho = 7\\cos\\theta + 2\\sin\\theta$ |
| $(8, 1)$ | $\\rho = 8\\cos\\theta + \\sin\\theta$ |

在 OpenCV 中，有两种算法：

### 1. 标准霍夫变换

适用于检测图像中的直线，通过投票机制在参数空间中找到直线的可能性。这种方法会返回所有可能的直线，包括重叠的和不连续的线段。

\`\`\`python
import cv2 as cv
import numpy as np

# 读取图像
image = cv.imread('image/TV_IR_0001.bmp', 1)
gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)

# 边缘检测
edges = cv.Canny(gray, 50, 150, apertureSize=3)

# 执行标准霍夫变换
lines = cv.HoughLines(edges, 1, np.pi / 180, 200)
# image: 输入的二值图像（通常是边缘检测后的图像）
# rho: 距离分辨率，单位是像素。通常是 1
# theta: 角度分辨率，单位是弧度。通常是 π/180
# threshold: 累加平面的阈值参数，只有累加数大于该阈值的点才被认为是直线

# 绘制检测到的直线
if lines is not None:
    for line in lines:
        rho, theta = line[0]
        a = np.cos(theta)
        b = np.sin(theta)
        x0 = a * rho
        y0 = b * rho
        x1 = int(x0 + 1000 * (-b))
        y1 = int(y0 + 1000 * a)
        x2 = int(x0 - 1000 * (-b))
        y2 = int(y0 - 1000 * a)
        cv.line(image, (x1, y1), (x2, y2), (0, 0, 255), 2)

# 显示结果
cv.imshow('Hough Lines', image)
cv.waitKey(0)
cv.destroyAllWindows()
\`\`\`

### 2. 概率霍夫变换

相对于标准霍夫变换，概率霍夫变换更加高效，它假设直线是由随机选择的点组成的，因此在参数空间中只返回最长的、最可能的直线段。这种方法可以减少冗余的检测结果，提高速度。

\`\`\`python
import cv2 as cv
import numpy as np

# 读取图像
image = cv.imread('image.jpg')
gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)

# 边缘检测
edges = cv.Canny(gray, 50, 150, apertureSize=3)

# 执行概率霍夫变换
lines = cv.HoughLinesP(
    edges, 1, np.pi / 180, threshold=100,
    minLineLength=100, maxLineGap=10,
)
# image: 输入的二值图像（通常是边缘检测后的图像）
# rho: 距离分辨率，单位是像素
# theta: 角度分辨率，单位是弧度
# threshold: 累加平面的阈值参数
# lines: 输出的直线数组，每条直线由一个四个元素的数组表示，分别是 (x1, y1, x2, y2)
# minLineLength: 可选参数，最小线段长度。小于该长度的线段会被丢弃
# maxLineGap: 可选参数，允许的最大间隔。如果两个线段之间的间隔小于该值，它们会被合并为一条线段

# 绘制检测到的直线
if lines is not None:
    for line in lines:
        x1, y1, x2, y2 = line[0]
        cv.line(image, (x1, y1), (x2, y2), (0, 0, 255), 2)

# 显示结果
cv.imshow('Hough Lines P', image)
cv.waitKey(0)
cv.destroyAllWindows()
\`\`\`

# 视频流

## 从摄像头读取

\`\`\`python
cap = cv.VideoCapture(0)
while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv.imshow('video', frame)
    if cv.waitKey(1) == ord('q'):
        break
cap.release()
cv.destroyAllWindows()
\`\`\`

首先 \`cap\` 会储存摄像头 0 的信息，如果你有一个摄像头就是 0，如果有多个就有不同的设备名称。

然后 \`cap.read()\` 会返回两个值，一个是布尔值，告诉你是否读取成功，另一个才是我们需要的每帧的图像信息，把它放在 while 循环里就可以实时看到摄像头里的图像了。

最后规定按下 \`q\`，退出循环。

## 从视频文件读取

\`\`\`python
cap = cv.VideoCapture('video.mp4')
while True:
    ret, frame = cap.read()
    if not ret:
        print('can not read or end')
        break
    cv.imshow('video', frame)
    if cv.waitKey(1) == ord('q'):
        break
cap.release()
cv.destroyAllWindows()
\`\`\`

显然 \`.read()\` 会读取指针指向的帧，\`cap\` 内部的指针会自己移动到下一帧。

阅读代码，推测输出效果并验证：

\`\`\`python
img = cv.imread('image/cute.png', 1)
cap = cv.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    width = int(cap.get(3))
    height = int(cap.get(4))
    image = np.zeros(frame.shape, dtype=np.uint8)
    smaller_frame = cv.resize(frame, (0, 0), fx=0.5, fy=0.5)
    image[:height // 2, :width // 2] = cv.rotate(smaller_frame, cv.ROTATE_180)
    image[height // 2:, :width // 2] = cv.rotate(smaller_frame, cv.ROTATE_180)
    image[:height // 2, width // 2:] = smaller_frame
    image[height // 2:, width // 2:] = cv.resize(img, (width // 2, height // 2))

    cv.line(image, (0, 0), (width, height), (255, 0, 0), 10)
    cv.line(image, (0, height), (width, 0), (0, 0, 255), 5)
    cv.rectangle(image, (100, 100), (200, 200), (0, 0, 0), 5)
    cv.circle(image, (300, 300), 60, (120, 255, 0), -1)
    font = cv.FONT_HERSHEY_SIMPLEX
    cv.putText(image, 'Nuaa is the best', (200, height - 10), font, 1, (200, 40, 0), 1, cv.LINE_AA)

    cv.imshow('frame', image)

    if cv.waitKey(1) == ord('q'):
        break

cap.release()
cv.destroyAllWindows()
\`\`\`

`,Ii=`# 群

## 二元运算
二元运算就是一种规则：$x \\times y$
它**是针对集合的概念**，脱离集合不能谈二元运算
基本要求是两个属于该集合的元素经过二元运算后，得数仍然属于该集合：
也就是：$S$为集合，函数$f:S \\times S \\rightarrow S$
我们称这种性质为**封闭性**

比如除法在自然数集上不是二元运算，因为它不满足封闭性，但它在去除0的实数集上封闭，是二元运算。

还有一个思想：对于一个二元运算，结合律和交换律都不一定成立，但**结合律是比交换律更普遍的规律**
## 幺半群

注意，\`*\`先在开始不一定是乘法，而代表两个数之间的二元运算
先介绍两个概念
- 结合律：$x*(y*z)=(x*y)*z$
- 单位元：e是单位元，$e \\in S,\\forall x \\in S ,x*e=e*x=x$,也就是左乘和右乘单位元，结果不变

那么我们就可以定义幺半群：
$$
\\begin{aligned}
&\\text{我们说}(S,*)\\text{是一个幺半群，当该二元运算满足结合律，且有单位元} \\\\
&\\forall x,y,z \\in S,\\; x*(y*z) = (x*y)*z \\\\
&\\exists e,\\;\\forall x\\in S,\\; e*x=x*e=x
\\end{aligned}
$$
以后类似群这种概念，我们使用形如$(S,*)$ 这种形式表达，S代表一个集合，\\*代表二元运算
因为幺半群，半群，群的结构都是由集合和二元运算就确定的。

比如$(M,*)$，其中M是所有3阶矩阵构成的集合，\\*是矩阵乘法，这就是一个不满足交换律的幺半群，且单位元是$[\\begin{matrix}1&0&0\\\\0&1&0\\\\0&0&1 \\\\\\end{matrix}]$

### 单位元的唯一性
对于一个幺半群，单位元是唯一的。证明：
$$
\\begin{aligned}
&\\text{若存在多个单位元，假设 }e,e'\\text{ 都是单位元} \\\\
&\\because e \\text{ 是单位元},\\; e*e'=e' \\\\
&\\because e' \\text{ 是单位元},\\; e*e'=e \\\\
&\\therefore e=e'
\\end{aligned}
$$`,Ni=`# 什么是数据结构

## 数据结构
问题引入：假如你是一位图书管理员，给你一堆书架和书本，现在让你分类和管理它们。

于是你就要考虑四个问题：新书怎么插入，旧书怎么删除，书架怎么替换，书本怎么查找

也就是我们常说的增删改查。

我们先来看几个方案：

1.**随便放**
新书插入很简单，直接放上去就可以了，但是查找起来很困难。

2.**按字母顺序放**
查找时可以用二分查找法。但是插入新书就比较麻烦了。

3.**按分类放(实际操作)**
每块指定要放什么类别的书本，每个类别里再按照字母顺序放。
- 插入：先定类别，二分查找确定位置，移出空位。
- 查找：先定类别，再二分查找。

数据结构就是这样，它是用来组织、存储和处理数据的一种方法。

## 算法

先来看一个简单的例子：写一个函数printN,使得传入一个正整数n，打印1到n的整数。
方法一，循环：
\`\`\`c
void printN(int n){
    int i  = 1;
    for (i = 1; i <= n; i++) {
        printf("%d \\n", i);
    }
}
\`\`\`
方法二，递归：
\`\`\`c
void printN(int n){
    if (n == 0) {
        return;
    }
    printf("%d \\n", n);
    printN(n-1);
}
\`\`\`
发现循环能跑到10万，递归跑不到。
因为递归需要保存调用栈，而栈的大小受限于系统的内存，所以递归很容易导致栈溢出。
于是定义空间复杂度，来衡量算法需要的内存空间。

再来看一个例子：
写程序计算给定多项式在给定点x处的值。
$$
f(x) = a_n x^n + a_{n-1} x^{n-1} + ... + a_1 x + a_0
$$
方法一，直接用pow函数计算：
\`\`\`c
double calculate(int n , double a[],double x){
    int i;
    double p = a[0];
    for(i=1,i<=n,i++){
        p+=a[i]*pow(x,i);
    }
    return p;
}
\`\`\`
看起来很不错，对吧？几乎所有编程语言都会给我们pow函数，但是如果你这么写，会招来老登的批评以及南梁的嘲笑——时间复杂度太高了。

方法二，秦九韶算法(秦九韶太超模了)：
其实就是提公因式，把次方运算变成一次加法和一次乘法，你可以自己看看这个式子，和上面的式子是等价的。
$$
f(x) = a_0 + x(a_1 +x(...(a_{n-1}+x(a_n))))
$$
\`\`\`c
double calculate(int n , double a[],double x){
    int i;
    double p = a[n]; //这个时候就要倒过来循环，因为计算步骤是从后往前的
    for(i = n;i>0;i--){
        p = a[i-1]+x*p;
    }
    return p;
}
\`\`\`
你可以让AI帮你打clock,会发现运算速度差了一个数量级。

于是为了衡量算法的效率，我们定义时间复杂度。计算机乘除一般比加减开销大，所以我们用乘除次数比较上面两个算法的时间复杂度。

方法一：
从左往右，一次计算0,1,2,3 ... n+1次乘法，加起来$0+1+2+...+n+1=n(n+1)/2=\\frac{n^2+n}{2}$次乘法。当n很大时，可以把二次项后面的数量级忽略，再忽略系数，所以时间复杂度为$O(n^2)$。

方法二：
显然每次循环都只是一次乘法一次加法，算法的时间复杂度必然是线性的，也就是$O(n)$。

所以，秦九韶算法的效率要比pow函数高很多。

## 数据结构与算法的任务

**数据结构：** 就是数据对象在计算机中的存储和组织方式。
- 逻辑结构
- 物理存储结构

**抽象数据类型(ADT):** 就是对数据结构的一种抽象，它定义了数据结构的操作和功能。
- 数据对象集
- 数据集合相关联的操作集

例如：
- 类型名称：矩阵(Matrix)
- 数据对象集：一个M行N列的矩阵$A_{m\\times n}=((a_{ij})_{1\\leq i\\leq m,1\\leq j\\leq n})$. 由$M\\times N$个元素组成。其中a是矩阵元素的值，ij是矩阵元素所在的行号和列号。
- 操作集：矩阵的加法、减法、乘法、求逆、求秩、求行列式、求特征值、求解线性方程组.....等函数

复杂度分为最坏情况复杂度、平均情况复杂度

**最大子列问题**这个自己听课吧，总之面对$O(n^2)$的算法时，想一想有没有$O(nlogn)$的算法。
`,Oi=`# 链表
`,Vi=`# 堆栈

问题引入：计算机如何进行表达式求值？

例如：\`5+6/2-3*4\` 
首先，这个表达式有两类对象构成：
- 运算数：5、6、2、3、4
- 运算符号：+、/、-、*

不同运算符号的优先级不同，比如6不是拿来做加法运算的，而是先乘以2，然后再做加法运算。

- **中缀表达式：** 运算符号放在操作数的中间，如5+6/2-3*4
- **后缀表达式：** 运算符号放在操作数的后面，如562/34*-
后缀表达式看起来比较反直觉，但是它更方便进行计算——正常的中缀表达式还要还要等看完后面的运算符号，但是后缀表达式遇到符号就直接取出操作数进行计算，不要自己观察并“加括号“。

比如：\`62/3-42*+\`
先遇到了6,再遇到2,然后遇到了/，这时候就直接算6/2=3,存好3后遇到3,然后遇到-，这时直接算3-3=0,存下0,后面遇到4,然后是2,再然后是*，这时直接算2*4=8,存下8,然后遇到+，这时直接算8+0=8,存下8,最后得到结果8。

于是我们需要一种存储方法——能顺序存储运算数；并在需要时倒序输出。

于是就有了堆栈

## 什么是堆栈

**堆栈（stack）** 是一种具有一定操作约束的线性表，只能在一端进行插入和删除操作，另一端则是顶端。堆栈的插入操作被称为压栈（push），删除操作被称为弹栈（pop）。

定义太抽象了，用上面的例子来说明一下：

![堆栈示意图](2-1.png)

如图，系统不断把新元素放入堆栈，当遇到运算符号时，倒序取出上面两个元素做运算，运算结果再堆上去。

- 插入数据：压栈
- 删除数据：弹栈
- 后入先出：栈顶元素最先被删除(LIFO)

## 堆栈的抽象数据类型描述

-类型名称：Stack
-数据对象集：一个有0个或多个元素的有穷线性表
-操作集： 长度为MaxSize的堆栈$S\\in Stack$,堆栈元素$item\\in ElementType$

1. Stack CreateStack(int MaxSize):生成空堆栈，最大容量为MaxSize。
2. int IsFull(Stack S,int MaxSize):判断堆栈是否已满。
3. void Push(Stack S,ElementType item):压栈操作，将item压入堆栈S。
4. ElementType Pop(Stack S):弹栈操作，删除并返回堆栈S的栈顶元素。
5. int IsEmpty(Stack S): 判断堆栈是否为空。

## 栈的顺序存储实现

\`\`\`c
#define MAXSIZE 100

typedef struct SNode* Stack;
struct SNode{
    ElementType data[MAXSIZE];
    int top;
}
\`\`\`
1.Push
\`\`\`c
void Push(Stack PtrS,ElementType item){
    if(PtrS->top==MAXSIZE-1){
        fprintf(stderr,"Stack is full\\n");
        return;
    }
    PtrS->data[++(PtrS->top)]=item;
    return;
}
\`\`\`

2.Pop
\`\`\`c
ElementType Pop(Stack PtrlS){
    if(PtrS->top==-1){
        fprintf(stderr,"Stack is empty");
        return ERROR //ERROR是ElementType的特殊值，标志错误
    }
    return (PtrS->data[(PtrS->top)--]);
}
\`\`\`

这里不知道大家有没有一个疑惑：没有代码显式地执行了从data数组里删除top指向的元素及其内存的操作，是不是应该在Pop函数里加上这部分代码？
答案是否定的——在栈的实现中，我们通过移动 \`top\` 来“逻辑删除”元素，而不需要物理清除数据。反正Push是直接覆盖，Pop出的数据留在原内存不会影响栈本身的结构。
\`\`\`c
// 初始状态
top = -1  // 空栈

// Push 1: top=0, data[0]=1
// Push 2: top=1, data[1]=2  
// Push 3: top=2, data[2]=3

// Pop: 执行 top--, top变成1
// 此时 data[2] 仍然等于3，但 top=1 表示栈顶在 data[1]
// data[2] 的值虽然还在，但对栈操作不可见
\`\`\`
自己动手多画示意图，这个很有必要！

## 一个数组实现两个堆栈
一个数组可以实现两个堆栈，但必须往中间堆元素，如果同向就会造成一个堆满了另一个还有空位，造成空间的浪费——如图：

![2-2](2-2.png)


就如下面的方式所呈现的，两个栈分别从数组的两头开始往中间Push，当两个栈的栈顶指针相遇时，表示两个栈都满了。
\`\`\`c
#define MaxSize 100 //此处100只是示例，根据需要存储数据元素的最大个数
struct DStack{
    ElementType data[MaxSize];
    int top_left;
    int top_right;
}S
S.top_left = -1;
S.top_right = MaxSize;
\`\`\`

\`\`\`c
void Push(sturct DStack *PtrS,ElementType item,int Tag){
    //Tag作为区分两个栈的标记，0表示左边的栈，1表示右边的栈
    if (PtrS->top_right - PtrS->top_left==1){
        fprintf(stderr,"Stack is full\\n");
        return;
    }
    if (Tag){
        PtrS->data[--(PtrS->top_right)]=item;
    }
    else{
        PtrS->data[++(PtrS->top_left)]=item;
    }
}

ElementType Pop(struct DStack *PtrS,int Tag){
    if (Tag){
        if(PtrS->top_right==MaxSize){
            fprintf(stderr,"Stack is empty\\n");
            return ERROR;
        }
        return (PtrS->data[(PtrS->top_right)++])
    }
    if(PtrS->top_left==-1){
        fprintf(stderr,"Stack is empty\\n");
        return ERROR;
    }
    return (PtrS->data[(PtrS->top_left)--]);
}
\`\`\`

## 栈的链式存储实现(链表实现堆栈)

栈的链式存储结构实际上就是一个单链表，叫做**链栈**，插入和删除操作只能在链栈的栈顶进行。
显然top不能在链表尾部，因为单向链表只有next来指向下一个节点，你没法靠一个指针返回上一个节点(这句话看不懂的自己去写链表的所有操作集，代码我也写了)。所以top指针必然在链表头部

\`\`\`c
typedef struct SNode* Stack;
struct SNode{
    ElementType data;
    Stack next;
}
\`\`\`
初始化一个空栈：
\`\`\`c
Stack CreateStack(){
    Stack S;
    S = (Stack)malloc(sizeof(struct SNode));
    S->next = NULL;
    return S;
}
\`\`\`
判断堆栈是否为空：
\`\`\`c
bool IsEmpty(Stack S){
    return (S->next == NULL);
}
\`\`\`

压栈操作：
\`\`\`c
void Push(ElementType item,Stack S){
    Stack temp;
    temp = (Stack)malloc(sizeof(struct SNode));
    temp->data = item;
    temp->next = S->next;
    S->next = temp;
}
\`\`\`

弹栈操作：
\`\`\`c
ElementType Pop(Stack S){
    if(IsEmpty(S)){
        fprintf(stderr,"Stack is empty\\n");
        return ERROR;
    }
    Stack first_cell = S->next;
    S->next = first_cell->next;
    ElementType top_item = first_cell->data;
    free(first_cell);
    return top_item;
}
\`\`\`
## 栈的应用:表达式求值

从左到右读取后缀表达式的各项：
1. 运算数直接入栈
2. 运算符：从栈顶弹出两个操作数，进行运算，结果入栈
3. 最后栈顶元素为表达式的结果

其实最大的难点是如何把用户输入的中缀表达式转换为后缀表达式。

比如：\`5+6/2-3*4\`

第一个数5先输出，然后遇到+号，这个运算符的优先级低所以先记下来，后面输出6,遇到除号了但是不能做计算，因为乘除之上还有指数，阶乘这些上位者，然后输出2,2后面是-，运算优先级低于/，故除号可以输出了。
也就是562/34*-

然后就可以按照上面的算法进行计算了。

有括号的情况看一下视频里的PPT动画，总结起来就是：
准备一个堆栈用来存储运算符号
1. 运算数直接输出
2. 遇到左括号，就入栈
3. 遇到右括号，就弹栈，弹出的元素直接输出，直到遇到左括号为止
4. 运算符：
    - 若优先级大于栈顶运算符，就入栈
    - 若优先级小于或等于栈顶运算符，就弹栈，弹出的元素直接输出，直到栈顶运算符优先级大于或等于当前运算符优先级为止，然后再入栈当前运算符
5. 若各对象处理完毕，则把堆栈中存留的运算符一并输出。

时间复杂度是线性的。

## 栈的其他应用

- 函数调用及递归实现
- 深度优先搜索
- 回溯算法`,Bi=`
"它统一了分裂的社区库，自此 Python 才体现出它的优势。"

# NumPy 教案

## 一、数组的结构及创建

### ndarray 对象组成

\`ndarray\` 由一个指向数据的内存指针、数据类型（\`dtype\`）和表示矩阵形状（\`shape\`）的元组构成。

其中数据类型支持 \`int8\`、\`int16\`、\`int32\`、\`int64\`、\`uint8\`、\`uint32\`、\`uint64\`、\`float16\`、\`float32\`、\`float64\`。这里尤其要注意 \`uint8\`，它是图像处理的重要格式。

可以直接通过 \`print\` 查看 \`dtype\` 和 \`shape\`，创建数组的函数一般都能指定 \`dtype\`。

### 数组的创建

#### 手动创建

\`\`\`python
import numpy as np

# 创建一维数组
a1 = np.array([1, 2, 3, 4, 5], dtype=int)
# 查看数组形状，注意，数组的形状很重要，如果对不上就会报错
print(a1.shape)
# 输出数组
print(a1)
\`\`\`

我们会发现一维数组的形状为 \`(5,)\`，而不是 \`(1, 5)\` 或 \`(5, 1)\`。那么我们再做一个实验：

\`\`\`python
a2 = np.array([[1, 2, 3, 4, 5]])
print(a2.shape)
\`\`\`

我们发现输出为 \`(1, 5)\`。也就是说，一维数组默认是 1 行多列；二维数组则是外层中括号包含多个内层中括号，每个内层中括号代表一行。

显然，如果我们让 0 代表纯黑色、1 代表纯白色，那么二维数组就可以用来显示灰度图像，比如一张 600×600 的图像，它的形状就是 \`(600, 600)\`。如果我们把这个二维数组里每一个数字都替换为 \`[a, b, c]\`，\`a\`、\`b\`、\`c\` 分别代表红、绿、蓝，那么这个三维数组就可以存储一个彩色图像，其形状为 \`(600, 600, 3)\`。

#### 常用的创建函数

| 函数 | 说明与示例 |
|------|------------|
| \`np.zeros()\` | 快速创建全为 0 的数组，例如：\`np.zeros(3)\` 创建全为 0 的一维数组；\`np.zeros((3, 4))\` 创建三行四列的 0 数组 |
| \`np.zeros_like()\` | 括号里传入数组 \`a\`，则 0 数组的形状与 \`a\` 一致 |
| \`np.ones()\` | 创建全为 1 的数组，括号里传入的参数与 \`zeros\` 同理 |
| \`np.eye()\` | 创建单位数组，即对角线上全为 1，其它都是 0；传入整数 \`s\`，数组形状为 \`(s, s)\` |
| \`np.arange(start, stop, step, dtype)\` | 生成区间 \`[start, stop)\` 上步长间隔（公差）为 \`step\` 的等差数组 |
| \`np.linspace(start, stop, num=50, endpoint=True)\` | 生成区间 \`[start, stop]\` 上间隔相等的 \`num\` 个数据的等差数组，\`num\` 默认值为 50 |
| \`np.logspace(start, stop, num=50, endpoint=True, base=10.0)\` | 默认生成区间 $[base^{start}, base^{stop}]$ 上的 \`num\` 个数据的等比数组 |

运行下面的代码：

\`\`\`python
a = np.ones(4, dtype=int)
b = np.ones((4, 1))
c = np.zeros(4)
d = np.zeros_like(a)
e = np.eye(3)
print(f'{a}\\n{b}\\n{c}\\n{d}\\n{e}')
\`\`\`

思考输出结果，并运行验证你的答案。

\`\`\`python
a = np.arange(1, 5)
b = np.linspace(1, 4, 4)
c = np.logspace(1, 3, 3, base=2)
print(f'{a}\\n{b}\\n{c}')
\`\`\`

思考输出结果，并验证。

---

## 二、数组形状的修改

数组的形状可以通过 \`reshape()\`、\`ravel()\`、\`flatten()\`、\`resize()\` 等方法修改，但元素总数必须一致。换句话说，修改前后的 \`size\`（元素总数）应相同，否则会报错。

### reshape()

\`\`\`python
import numpy as np

a = np.arange(12)
print(a.shape)  # (12,)
b = a.reshape(3, 4)
print(b)
print(b.shape)  # (3, 4)
\`\`\`

\`reshape()\` 只是返回新视图（view），不会改变原数组 \`a\` 的形状。

\`\`\`python
print(a.shape)  # 仍然是 (12,)
\`\`\`

如果希望直接改变原数组的形状，可以使用 \`a.shape = (3, 4)\`。

注意：若 \`reshape()\` 无法整除元素个数，会报错。例如：

\`\`\`python
np.arange(10).reshape(3, 4)
# 报错：cannot reshape array of size 10 into shape (3,4)
\`\`\`

### ravel() 与 flatten()

这两个方法都能将多维数组"拉平"为一维。不同在于：

- \`ravel()\` 返回的是视图（修改会影响原数组）
- \`flatten()\` 返回的是拷贝（修改不会影响原数组）

\`\`\`python
a = np.arange(6).reshape(2, 3)
b = a.ravel()
c = a.flatten()
b[0] = 99
print(a)  # 原数组被改动
c[0] = 100
print(a)  # 原数组未改动
\`\`\`

### resize()

\`resize()\` 会直接改变原数组本身的形状：

\`\`\`python
a = np.arange(6)
a.resize(2, 3)
print(a)
\`\`\`

若新形状元素数量更大，它会自动重复填充原元素。但是由于 \`a = a.reshape(2, 3)\` 也能修改数组本身，所以这个用得少。

---

## 三、数组的索引与切片

数组索引是 NumPy 的核心能力之一。灵活的索引能帮助我们快速访问和修改数据。

### 基本索引

\`\`\`python
a = np.arange(1, 10, 1).reshape(3, 3)
print(a[0, 0])  # 第一行第一列元素
print(a[2, 1])  # 第三行第二列元素
\`\`\`

索引从 0 开始，因此 \`a[2, 1]\` 代表第三行第二列。

### 切片操作

切片语法为 \`a[start:end:step]\`，与 Python 列表类似。但在多维数组中可以分别对每个维度切片：

\`\`\`python
print(a[0:2, 1:3])  # 取前两行、后两列
\`\`\`

### 步长与省略号

\`\`\`python
print(a[::2, ::2])  # 每隔一行一列取一个元素
print(a[..., 1])    # 取所有行的第 2 列
print(a[:, 1])      # 同上
\`\`\`

\`...\` 表示自动补齐剩余维度，适合高维数据（如图像）。

### 布尔索引

布尔索引可通过条件筛选数据，非常常用于机器学习中数据过滤：

\`\`\`python
x = np.array([10, 20, 30, 40, 50])
mask = x > 25
print(mask)      # [False False  True  True  True]
print(x[mask])   # [30 40 50]
\`\`\`

### 花式索引

花式索引是用整数数组指定要取的元素：

\`\`\`python
x = np.array([10, 20, 30, 40, 50])
idx = [0, 2, 4]
print(x[idx])  # [10 30 50]
\`\`\`

多维情况下也能用：

\`\`\`python
a = np.arange(12).reshape(3, 4)
rows = [0, 2]
cols = [1, 3]
print(a[rows, cols])  # 取 (0,1) 和 (2,3) 位置的元素
\`\`\`

⚠️ **注意**：花式索引返回的是拷贝，而不是视图。基础的切片和索引返回的是视图而非拷贝，也就是说你是可以用这个去直接改变原数组的值的；如果需要保留原数组就应该使用 \`.copy()\` 先创建一个一模一样的数组（Python 没有指针，你赋值后它们用的同一个地址）。

\`\`\`python
import numpy as np

a = np.arange(1, 10, 1).reshape(3, 3)
print(a)
b = a
b[::2, ::2] = 1  # 每隔一行一列取一个元素
print(a)
\`\`\`

结果 \`a\` 被修改了。

\`\`\`python
import numpy as np

a = np.arange(1, 10, 1).reshape(3, 3)
print(a)
b = a.copy()
b[::2, ::2] = 1
print(a)
\`\`\`

\`a\` 没被修改。

---

## 四、数组的合并与分割

在机器学习或图像处理中，我们常常需要把多个数组拼接成一个整体，或将大数组切分成若干子数组。NumPy 提供了一整套便捷的合并与分割函数。

### 数组的合并（拼接）

#### 1. 使用 \`np.concatenate()\`

\`concatenate()\` 是最底层、最通用的拼接函数。语法为：

\`\`\`python
np.concatenate((a1, a2, ...), axis=0)
\`\`\`

\`\`\`python
a = np.ones((2, 3))
b = np.zeros((2, 3))
print(np.concatenate((a, b), axis=0))  # 按行拼接
print(np.concatenate((a, b), axis=1))  # 按列拼接
\`\`\`

⚠️ **注意**：被拼接的数组在除拼接轴外的维度上必须形状一致。

#### 2. 使用 \`np.vstack()\` 与 \`np.hstack()\`

这是最常用的两个拼接函数，分别按"垂直方向"和"水平方向"合并。

\`\`\`python
a = np.array([[1, 2, 3], [4, 5, 6]])
b = np.array([[7, 8, 9]])
print(np.vstack((a, b)))  # 垂直拼接（行叠加）
print(np.hstack((a, a)))  # 水平拼接（列叠加）
\`\`\`

在图像处理中，\`vstack\` 可用于"上下拼图"，\`hstack\` 用于"左右拼图"。

#### 3. \`np.stack()\`：添加新维度后再拼接

当你希望合并时保留独立维度（而不是直接叠加），可以使用 \`stack()\`：

\`\`\`python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
c = np.stack((a, b), axis=0)  # 新维度在最前面
print(c.shape)  # (2, 3)
d = np.stack((a, b), axis=1)  # 新维度在中间
print(d.shape)  # (3, 2)
\`\`\`

### 数组的分割

分割是合并的逆操作，常用于把训练数据拆分为训练集、验证集。

#### 1. 使用 \`np.split()\`

语法：

\`\`\`python
np.split(array, indices, axis=0)
\`\`\`

示例：

\`\`\`python
a = np.arange(12).reshape(3, 4)
print(a)
a1, a2 = np.split(a, [1], axis=0)  # 在第 1 行后切分
print(a1)
print(a2)
\`\`\`

#### 2. 快捷函数：\`vsplit()\` 与 \`hsplit()\`

\`\`\`python
a = np.arange(16).reshape(4, 4)
top, bottom = np.vsplit(a, [2])
left, right = np.hsplit(a, [2])
\`\`\`

**练习**：

1. 创建两个形状为 \`(3, 4)\` 的随机数组 A、B，按行拼接、按列拼接。
2. 用 \`stack()\` 将三张 28×28 灰度图像叠加成一个 \`(3, 28, 28)\` 的三维数组。
3. 将一个数组沿行方向平均分为三份。
4. 使用 \`array_split()\` 将长度为 10 的一维数组分为 3 份，并验证每份的长度。

---

## 五、广播机制（Broadcasting）

广播是 NumPy 的一大特性，它允许不同形状的数组在算术运算中自动对齐。

在机器学习中，广播被频繁用于：

- 向量与矩阵的加减
- 批量标准化
- 激活函数计算
- 权值矩阵的偏置项加法

### 广播的基本原则

广播规则可以概括为：

从尾部维度开始比较，如果两个维度相等，或其中一个为 1，则可以广播；否则抛出错误。

示例：

\`\`\`python
a = np.ones((3, 4))
b = np.array([1, 2, 3, 4])
print(a + b)
\`\`\`

\`b\` 的形状是 \`(4,)\`，自动广播成 \`(3, 4)\`。

### 手动调整维度以实现广播

有时我们需要用 \`np.newaxis\` 或 \`None\` 来手动增加维度。

\`\`\`python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(a[:, None] + b[None, :])
\`\`\`

输出为一个 3×3 的矩阵，相当于外积运算。

### 广播失败示例

如果两个数组形状不兼容，就会报错：

\`\`\`python
a = np.ones((3, 4))
b = np.ones((2, 1))
a + b
# ValueError: operands could not be broadcast together with shapes (3,4) (2,1)
\`\`\`

解决方法：调整形状使其符合广播规则（如 \`b.reshape(3, 1)\`）。

### 典型应用场景

#### 1. 批量归一化（Batch Normalization）

\`\`\`python
X = np.random.randn(5, 3)
mu = X.mean(axis=0)
sigma = X.std(axis=0)
X_norm = (X - mu) / sigma  # mu 和 sigma 自动广播
\`\`\`

#### 2. 激活函数中的偏置项

\`\`\`python
z = np.random.randn(64, 128)
b = np.random.randn(128)
out = z + b  # 自动沿 axis=0 扩展
\`\`\`

#### 3. softmax 函数稳定实现

\`\`\`python
def stable_softmax(z):
    z = z - np.max(z, axis=1, keepdims=True)
    exp = np.exp(z)
    return exp / exp.sum(axis=1, keepdims=True)
\`\`\`

这里 \`keepdims=True\` 让 \`max\` 和 \`sum\` 保留二维形状，便于广播。

### 练习与思考

1. 创建一个 3×4 的矩阵 A，和一个长度为 4 的向量 b，验证广播加法效果。
2. 使用 \`np.newaxis\` 计算两个长度为 3 的向量的外积。
3. 创建一个 5×4 的矩阵，计算每列的 z-score 标准化结果。
4. 改写 softmax 函数，使输入可以是一维向量。

---

## 六、数组的运算与线性代数

NumPy 之所以成为机器学习与科学计算的基础工具，关键就在于它的矢量化运算与线性代数接口。掌握这些内容，你就能手写线性回归、PCA、神经网络的核心数学过程。

### 算术运算（Arithmetic Operations）

NumPy 的数组运算是"逐元素"的，即形状兼容（或可广播）时，对应位置元素执行运算。

\`\`\`python
import numpy as np

a = np.array([[1, 2, 3],
              [4, 5, 6]])
b = np.array([[10, 20, 30],
              [40, 50, 60]])
\`\`\`

#### 1. 基本运算

\`\`\`python
print(a + b)   # 加
print(a - b)   # 减
print(a * b)   # 乘（逐元素）
print(a / b)   # 除
print(a ** 2)  # 平方
\`\`\`

输出：

\`\`\`text
[[11 22 33]
 [44 55 66]]
[[ -9 -18 -27]
 [-36 -45 -54]]
[[10 40 90]
 [160 250 360]]
[[0.1 0.1 0.1]
 [0.1 0.1 0.1]]
[[ 1  4  9]
 [16 25 36]]
\`\`\`

### 矩阵乘法（Matrix Multiplication）

矩阵乘法在机器学习中极为常见，例如：

- 线性回归：$y = X\\theta$
- 神经网络：$Z = W \\times X + b$

NumPy 支持三种写法：

#### 1. 使用 \`@\`（推荐）

\`\`\`python
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
print(A @ B)
\`\`\`

输出：

\`\`\`text
[[19 22]
 [43 50]]
\`\`\`

#### 2. 使用 \`np.dot(A, B)\`

等价于 \`A @ B\`，常用于兼容旧版本。

#### 3. 使用 \`np.matmul(A, B)\`

与 \`@\` 相同，但支持批量（多维）矩阵乘法。

### 逐元素函数（Universal Functions）

| 函数 | 说明 |
|------|------|
| \`np.exp(x)\` | 计算 $e^x$ |
| \`np.log(x)\` | 自然对数 |
| \`np.sqrt(x)\` | 平方根 |
| \`np.sin(x)\` / \`np.cos(x)\` | 三角函数 |
| \`np.maximum(a, b)\` | 逐元素取最大值 |
| \`np.clip(x, a, b)\` | 限定范围到 $[a, b]$ |

示例：

\`\`\`python
x = np.linspace(-2, 2, 5)
print(np.exp(x))
print(np.clip(x, -1, 1))
\`\`\`

### 聚合与统计函数

| 函数 | 说明 |
|------|------|
| \`np.sum()\` | 求和 |
| \`np.mean()\` | 均值 |
| \`np.std()\` | 标准差 |
| \`np.var()\` | 方差 |
| \`np.min()\` / \`np.max()\` | 最小/最大值 |
| \`np.argmin()\` / \`np.argmax()\` | 最小/最大索引 |
| \`np.median()\` | 中位数 |

示例：

\`\`\`python
X = np.arange(6).reshape(2, 3)
print(X.sum(axis=0))   # 每列求和
print(X.mean(axis=1))  # 每行平均
\`\`\`

### 线性代数（Linear Algebra）

NumPy 的 \`linalg\` 模块提供了常用的矩阵运算工具，是机器学习算法的基础。

#### 1. 矩阵转置与单位矩阵

\`\`\`python
A = np.array([[1, 2, 3], [4, 5, 6]])
print(A.T)       # 转置
print(np.eye(3)) # 单位矩阵
\`\`\`

#### 2. 逆矩阵与解线性方程

\`\`\`python
A = np.array([[3, 1], [1, 2]])
b = np.array([9, 8])
x = np.linalg.solve(A, b)  # 解方程组
print(x)
\`\`\`

结果：

\`\`\`text
[2. 3.]
\`\`\`

⚠️ **对比**：\`np.linalg.inv(A) @ b\` 结果相同，但精度略差、性能更低。因此推荐使用 \`solve()\`。

#### 3. 行列式（determinant）

\`\`\`python
A = np.array([[1, 2], [3, 4]])
print(np.linalg.det(A))
\`\`\`

输出：\`-2.0000000000000004\`

#### 4. 特征值与特征向量

\`\`\`python
A = np.array([[4, -2], [1, 1]])
vals, vecs = np.linalg.eig(A)
print(vals)
print(vecs)
\`\`\`

输出（略）：

\`\`\`text
[3. 2.]
[[ 0.89442719 -0.70710678]
 [ 0.4472136   0.70710678]]
\`\`\`

说明：

- \`vals\` 是特征值 $\\lambda$
- \`vecs\` 的每一列是对应的特征向量

#### 5. 奇异值分解（SVD）

SVD 在 PCA（主成分分析）和推荐系统中非常重要：

\`\`\`python
X = np.random.randn(4, 3)
U, S, Vt = np.linalg.svd(X, full_matrices=False)
print(U.shape, S.shape, Vt.shape)
\`\`\`

输出：

\`\`\`text
(4, 3) (3,) (3, 3)
\`\`\`

SVD 的意义：

$$
X = U \\Sigma V^T
$$

其中 $U$ 和 $V^T$ 是正交矩阵，$\\Sigma$ 包含奇异值。

### 6. 矩阵的范数（Norm）

范数是衡量矩阵或向量"长度"的标准，在正则化和优化中经常出现。

\`\`\`python
x = np.array([3, 4])
print(np.linalg.norm(x))        # 二范数（默认）
print(np.linalg.norm(x, ord=1)) # 一范数
\`\`\`

## 六、einsum：优雅的张量运算（可选进阶）

\`np.einsum()\` 用爱因斯坦求和约定表达复杂的矩阵乘法。例如：

\`\`\`python
A = np.random.randn(3, 2)
B = np.random.randn(2, 4)
C = np.einsum('ik,kj->ij', A, B)
\`\`\`

等价于 \`A @ B\`，但能自由控制维度对应关系。在实现神经网络反向传播或张量压缩时非常高效。
`,Fi=`"它和熊猫没有任何关系，不要对境外势力抱有幻想"

# 第一章：Pandas 入门基础

## 1.1 认识 Pandas

**Pandas 是什么？**

- Python 中最常用的数据分析工具
- 提供了类似 Excel 的数据处理功能
- 在数据科学和机器学习中必不可少

## 1.2 基本环境配置

\`\`\`python
import pandas as pd
import numpy as np
\`\`\`

# 第二章：文件读写操作（重点）

## 2.1 读取文件

\`\`\`python
# 1. 读取 CSV 文件（最常用）
df = pd.read_csv('data.csv')  # 最基本的读取方式

# 带参数的读取（常用参数解释）
df = pd.read_csv(
    'data.csv',
    encoding='utf-8',       # 编码方式，中文文件常用
    index_col=0,            # 将第 1 列作为索引
    header=0,               # 将第 1 行作为列名
    na_values=['NA', '?'],  # 将 'NA' 和 '?' 视为缺失值
)

# 2. 读取 Excel 文件
df = pd.read_excel(
    'data.xlsx',
    sheet_name='Sheet1',  # 指定要读取的表单
    header=0,             # 第 1 行作为列名
)

# 3. 读取文本文件
df = pd.read_table(
    'data.txt',
    sep='\\t',           # 分隔符，制表符分隔的文件
    encoding='utf-8',   # 编码方式
)

# 查看读取的数据基本信息
print("数据的基本信息：")
print(df.info())  # 显示数据类型和缺失值信息
print("\\n前 5 行数据：")
print(df.head())  # 查看前 5 行
\`\`\`

## 2.2 保存文件

\`\`\`python
# 1. 保存为 CSV 文件（最常用）
df.to_csv(
    'output.csv',
    index=False,    # 不保存索引
    encoding='utf-8',  # 使用 utf-8 编码（支持中文）
)

# 2. 保存为 Excel 文件
df.to_excel(
    'output.xlsx',
    sheet_name='Sheet1',  # 指定表单名
    index=False,          # 不保存索引
)
\`\`\`

# 第三章：数据查看与选择（核心基础）

## 3.1 基本查看操作

\`\`\`python
# 创建示例数据
data = {
    '姓名': ['张三', '李四', '王五', '赵六', '钱七'],
    '年龄': [25, 30, 22, 28, 35],
    '成绩': [85, 92, 78, 95, 88],
    '城市': ['北京', '上海', '广州', '深圳', '杭州']
}
df = pd.DataFrame(data)

# 1. 查看数据基本信息
print("数据形状（行数，列数）：", df.shape)
print("\\n列名列表：", df.columns.tolist())
print("\\n数据类型：\\n", df.dtypes)

# 2. 查看数据内容
print("\\n前 3 行数据：")
print(df.head(3))    # 查看前 3 行
print("\\n后 2 行数据：")
print(df.tail(2))    # 查看后 2 行

# 3. 查看统计信息
print("\\n数值列统计信息：")
print(df.describe())    # 只会统计数值列
\`\`\`

## 3.2 数据选择

DataFrame 的每一行都是 Series。

\`\`\`python
# 1. 选择单列
print("选择年龄这一列：")
print(df['年龄'])  # 返回 Series

# 2. 选择多列
print("\\n选择多列：")
print(df[['姓名', '年龄', '成绩']])

# 3. loc 方法
# 使用标签（列名和索引）进行选择
print("\\n使用 loc 选择数据：")
print("选择第 0 行：")
print(df.loc[0])    # 选择第 0 行，如果规定了 index 的标签也可以用 index 的标签
print("\\n选择第 0 行的 '姓名' 和 '年龄'：")
print(df.loc[0, ['姓名', '年龄']])    # 选择第 0 行的指定列
print("\\n选择第 0 行到第 2 行的 '姓名' 和 '年龄'：")
print(df.loc[0:2, ['姓名', '年龄']])    # 选择多行多列

# 4. iloc 方法（重点）
# 使用整数位置进行选择
print("\\n使用 iloc 选择数据：")
print("选择第 0 行：")
print(df.iloc[0])    # 选择第 0 行
print("\\n选择第 0 行的第 0、1 列：")
print(df.iloc[0, [0, 1]])    # 选择第 0 行的第 0、1 列
print("\\n选择第 0-2 行的第 0、1 列：")
print(df.iloc[0:3, 0:2])    # 选择多行多列

# 5. 条件选择（筛选满足某一条件的行）
print("\\n条件选择：")
print("年龄大于 25 的：")
print(df[df['年龄'] > 25])

# 多条件选择
print("\\n年龄大于 25 且成绩大于 90 的：")
print(df[(df['年龄'] > 25) & (df['成绩'] > 90)])

# 6. isin 方法（锁定满足具体值的行）
print("\\n城市在北京或上海的：")
print(df[df['城市'].isin(['北京', '上海'])])
\`\`\`

## 3.3 数据修改和插入（重点）

上面数据筛选的方法返回的都是视图而不是拷贝，所以可以直接用来修改 DataFrame 的值。

\`\`\`python
# 1. 修改单个值
df.loc[0, '成绩'] = 87
print("修改后的数据：")
print(df)

# 2. 修改整列
df['年龄'] = df['年龄'] + 1  # 所有人年龄加 1
print("\\n年龄加 1 后的数据：")
print(df)

# 3. 插入新列（重点）
# insert 方法
df.insert(
    loc=2,              # 插入位置（列索引）
    column='性别',       # 列名
    value=['男', '女', '男', '女', '男'],  # 数据，可以不是列表，单输入一个 1 会把那一列全部插入 1
)
print("\\n插入性别列后的数据：")
print(df)

# 直接赋值添加新列
df['是否及格'] = df['成绩'] >= 60
print("\\n添加是否及格列后的数据：")
print(df)

# 4. 删除列
# drop 方法
df_new = df.drop('是否及格', axis=1)  # axis=1 表示删除列
print("\\n删除是否及格列后的数据：")
print(df_new)

# 5. 重命名列
df = df.rename(columns={'成绩': '期末成绩'})
print("\\n重命名后的数据：")
print(df)
\`\`\`

# 第四章：数据清洗基础

## 4.1 处理缺失值

\`\`\`python
# 创建包含缺失值的数据
df_missing = pd.DataFrame({
    '姓名': ['张三', '李四', '王五', None, '钱七'],
    '年龄': [25, None, 22, 28, 35],
    '成绩': [85, 92, None, 95, 88]
})

# 1. 检查缺失值
print("检查缺失值：")
print(df_missing.isnull().sum())  # 每列缺失值数量
print("\\n具体缺失值位置：")
print(df_missing.isnull())  # 显示具体哪些位置是缺失值

# 2. 处理缺失值
# 删除法
df_drop = df_missing.dropna()  # 删除含有缺失值的行
print("\\n删除缺失值后：")
print(df_drop)

# 填充法（多种方式）
# 用固定值填充
df_fill1 = df_missing.fillna(0)
print("\\n用 0 填充缺失值：")
print(df_fill1)

# 用平均值填充（数值列）
df_fill2 = df_missing.copy()
df_fill2['年龄'] = df_fill2['年龄'].fillna(df_fill2['年龄'].mean())
df_fill2['成绩'] = df_fill2['成绩'].fillna(df_fill2['成绩'].mean())
print("\\n用平均值填充数值列：")
print(df_fill2)
\`\`\`

## 4.2 处理重复值

\`\`\`python
# 创建包含重复行的数据
df_dup = pd.DataFrame({
    '姓名': ['张三', '李四', '张三', '王五', '李四'],
    '年龄': [25, 30, 25, 22, 30],
    '成绩': [85, 92, 85, 78, 92]
})

# 1. 检查重复值
print("重复行数量：", df_dup.duplicated().sum())
print("\\n显示重复行：")
print(df_dup[df_dup.duplicated()])

# 2. 删除重复值
df_unique = df_dup.drop_duplicates()
print("\\n删除重复行后：")
print(df_unique)

# 3. 基于特定列删除重复值
df_unique_name = df_dup.drop_duplicates(subset=['姓名'])
print("\\n基于姓名列删除重复行：")
print(df_unique_name)
\`\`\`

# 第五章：基础统计分析

## 5.1 描述性统计

\`\`\`python
# 创建示例数据
df = pd.DataFrame({
    '年龄': [25, 30, 22, 28, 35, 27, 29, 32, 26, 31],
    '工资': [8000, 12000, 7000, 10000, 15000, 9000, 11000, 13000, 8500, 12500],
    '工龄': [1, 5, 0.5, 3, 8, 2, 4, 6, 2, 5]
})

# 1. 基本统计量
print("基本统计信息：")
print(df.describe())

# 2. 单列统计
print("\\n年龄的基本统计：")
print("平均值：", df['年龄'].mean())
print("中位数：", df['年龄'].median())
print("标准差：", df['年龄'].std())
print("最小值：", df['年龄'].min())
print("最大值：", df['年龄'].max())
\`\`\`

## 5.2 分组统计（初步）

\`\`\`python
df['年龄段'] = pd.cut(
    df['年龄'],
    bins=[20, 25, 30, 35, 40],
    labels=['20-25岁', '26-30岁', '31-35岁', '36-40岁'],
)
print("\\n按年龄段统计平均工资：")
print(df.groupby('年龄段')['工资'].mean())
\`\`\`

# 第六章：数据合并（基础操作）

## 6.1 简单数据合并

\`\`\`python
# 创建两个数据框
df1 = pd.DataFrame({
    '学号': ['001', '002', '003', '004'],
    '姓名': ['张三', '李四', '王五', '赵六'],
    '成绩': [85, 92, 78, 95]
})
df2 = pd.DataFrame({
    '学号': ['001', '002', '003', '004'],
    '城市': ['北京', '上海', '广州', '深圳'],
    '专业': ['计算机', '数学', '物理', '化学']
})

# 1. 简单合并（基于相同的列）
result = pd.merge(df1, df2, on='学号')
print("基于学号合并两个表：")
print(result)

# 2. 连接操作（添加行）
df3 = pd.DataFrame({
    '学号': ['005', '006'],
    '姓名': ['钱七', '孙八'],
    '成绩': [88, 91]
})
# 竖向合并（添加行）
result_concat = pd.concat([df1, df3])
print("\\n竖向合并结果：")
print(result_concat)
\`\`\`
`,Ei=`"一图胜千言，可视化让数据栩栩如生。"

## 关键函数一览

| 类别 | 函数 | 用途 | 重要性 |
|------|------|------|--------|
| 基础设置 | \`plt.figure()\` | 创建画布 | 核心 |
| | \`plt.title()\` | 设置标题 | 核心 |
| | \`plt.xlabel()\`, \`plt.ylabel()\` | 设置轴标签 | 核心 |
| 基础绘图 | \`plt.plot()\` | 绘制线图 | 核心 |
| | \`plt.scatter()\` | 绘制散点图 | 重要 |
| | \`plt.bar()\` | 绘制柱状图 | 重要 |
| 图例和标签 | \`plt.legend()\` | 添加图例 | 核心 |
| | \`plt.text()\` | 添加文本标注 | 常用 |
| 子图 | \`plt.subplot()\` | 创建子图 | 重要 |
| 显示和保存 | \`plt.show()\` | 显示图表 | 核心 |
| | \`plt.savefig()\` | 保存图表 | 重要 |

# 基础配置

## 环境设置

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np  # 配合 numpy 使用

# [重要] 中文显示设置
plt.rcParams['font.sans-serif'] = ['SimHei']  # 设置中文字体
plt.rcParams['axes.unicode_minus'] = False  # 正确显示负号
\`\`\`

# 基础绘图（核心部分）

## 一、折线图

调用格式：

\`\`\`text
plot(x, y, linestyle, linewidth, color, marker, markersize, markeredgecolor, markerfacecolor, markeredgewidth, label, alpha)
\`\`\`

### 1. x, y（必需）

含义：数据点的横坐标和纵坐标值。通常是列表、元组或数组。

示例：\`x = [1, 2, 3, 4]\`，\`y = [1, 4, 2, 3]\`

### 2. linestyle 或 ls（可选）

含义：线条的样式。

常用值：

- \`'-'\` 或 \`'solid'\`：实线（默认）
- \`'--'\` 或 \`'dashed'\`：虚线
- \`'-.'\` 或 \`'dashdot'\`：点划线
- \`':'\` 或 \`'dotted'\`：点线
- \`'None'\` 或 \`' '\`：不画线（只显示标记点）

### 3. linewidth 或 lw（可选）

含义：线条的宽度，以点为单位。

常用值：一个浮点数，如 \`1.5\`、\`2.0\`、\`3\`

### 4. color 或 c（可选）

含义：控制线条和标记点的整体颜色（如果未单独指定标记颜色）。

常用值：

- 颜色名称字符串：如 \`'red'\`、\`'blue'\`、\`'green'\`、\`'black'\`
- 简写颜色字符：如 \`'r'\`（红）、\`'g'\`（绿）、\`'b'\`（蓝）、\`'k'\`（黑）、\`'c'\`（青）、\`'m'\`（品红）、\`'y'\`（黄）
- RGB 或 RGBA 元组：如 \`(0.8, 0.2, 0.5)\`，\`(1, 0.5, 0, 0.8)\`
- 十六进制字符串：如 \`'#FF00FF'\`

### 5. marker（可选）

含义：数据点的标记形状。

常用值：

- \`'.'\`：点
- \`','\`：像素点（极小）
- \`'o'\`：圆圈
- \`'v'\`：倒三角形
- \`'^'\`：正三角形
- \`'<'\`：左三角形
- \`'>'\`：右三角形
- \`'s'\`：正方形
- \`'*'\`：星形
- \`'+'\`：加号
- \`'x'\`：叉号
- \`'D'\`：菱形
- \`'None'\` 或 \`' '\`：不显示标记

### 6. markersize 或 ms（可选）

含义：标记的大小。

常用值：一个浮点数，如 \`5\`、\`8\`、\`10\`

### 7. markeredgecolor 或 mec（可选）

含义：标记的边缘颜色。

常用值：与 color 参数相同。如果未指定，通常默认为 color 的值。

### 8. markerfacecolor 或 mfc（可选）

含义：标记的填充颜色。

常用值：与 color 参数相同。如果未指定，通常默认为 color 的值。可以设置为 \`'none'\` 来表示空心标记。

### 9. markeredgewidth 或 mew（可选）

含义：标记边缘的宽度。

常用值：一个浮点数，如 \`1.0\`、\`1.5\`

### 10. label（可选）

含义：用于图例的标签文本。设置后，需要在之后调用 \`plt.legend()\` 来显示图例。

示例：\`label='销售数据'\`

### 11. alpha（可选）

含义：透明度，范围从 0.0（完全透明）到 1.0（完全不透明）。

常用值：\`0.3\`、\`0.5\`、\`0.8\`

\`\`\`python
# 基本线图示例
x = [1, 2, 3, 4, 5]    # 简单的数据点
y = [2, 4, 6, 8, 10]   # 线性关系数据

plt.figure(figsize=(8, 6))    # 设置图表大小
plt.plot(x, y, color='r', linestyle='-', label='示例直线')    # 'r-' 表示红色实线

# [重要] 图表元素添加
plt.title('基础线形图')    # 标题
plt.xlabel('电流/A')    # x 轴标签
plt.ylabel('电压/V')    # y 轴标签
plt.legend()    # 显示 label

plt.show()    # 显示图表

# [技巧] 在同一个图表中画多条线
plt.figure(figsize=(8, 6))
plt.plot(x, y, color='r', linestyle='-', label='直线')
plt.plot(x, [1, 3, 5, 7, 9], 'b--', label='虚线')    # 'b--' 表示蓝色虚线
plt.legend()
plt.title('多线图示例')
plt.show()
\`\`\`

## 二、散点图（用于数据分布展示）

\`\`\`python
# 创建简单的数据点
x = [1, 2, 3, 4, 5]
y = [2, 5, 3, 8, 6]

# [基础] 绘制散点图
plt.figure(figsize=(8, 6))
plt.scatter(
    x, y,
    s=100,       # 点的大小
    c='blue',    # 点的颜色
    alpha=0.6,   # 透明度
    label='数据点',  # 图例标签
)

# [重要] 添加标题和标签
plt.title('散点图示例')
plt.xlabel('X 轴')
plt.ylabel('Y 轴')
plt.legend()
plt.grid(True)  # 添加网格线
plt.show()
\`\`\`

## 三、柱状图（数据对比）

\`\`\`python
# 简单示例：展示学科成绩
subjects = ['语文', '数学', '英语', '物理', '化学']
scores = [85, 92, 78, 88, 95]

# 创建柱状图
plt.figure(figsize=(10, 6))
plt.bar(
    subjects, scores,
    width=0.6,       # 柱子宽度
    color='skyblue', # 颜色
    alpha=0.8,       # 透明度
)

# 重点：添加数值标签
for i, score in enumerate(scores):
    plt.text(i, score + 1, str(score), ha='center')  # 水平居中对齐

plt.title('各科成绩对比')
plt.ylabel('分数')
plt.ylim(0, 100)  # 设置 y 轴范围
plt.show()
\`\`\`

## 四、子图

\`\`\`python
fig, axes = plt.subplots(2, 2, figsize=(12, 8))  # 创建 2 行 2 列的子图
x = [1, 2, 3, 4]
y = [1, 4, 9, 16]

# 第一个子图：线图
axes[0, 0].plot(x, y, 'r-')
axes[0, 0].set_title('线图')

# 第二个子图：散点图
axes[0, 1].scatter(x, y)
axes[0, 1].set_title('散点图')

# 第三个子图：柱状图
axes[1, 0].bar(x, y)
axes[1, 0].set_title('柱状图')

# 第四个子图：填充图
axes[1, 1].fill_between(x, y, alpha=0.3)
axes[1, 1].set_title('填充图')

plt.tight_layout()  # 自动调整子图布局
plt.show()
\`\`\`

# 样式设置（基础美化）

## 常用线条样式表

| 符号 | 含义 | 示例 |
|------|------|------|
| \`'r-'\` | 红色实线 | \`plt.plot(x, y, 'r-')\` |
| \`'b--'\` | 蓝色虚线 | \`plt.plot(x, y, 'b--')\` |
| \`'g:'\` | 绿色点线 | \`plt.plot(x, y, 'g:')\` |
| \`'k.'\` | 黑色点图 | \`plt.plot(x, y, 'k.')\` |

\`\`\`python
# 线条样式示例
x = [1, 2, 3, 4, 5]
plt.figure(figsize=(10, 6))

plt.plot(x, [i**2 for i in x], 'r-', label='红色实线')
plt.plot(x, [i*2 for i in x], 'b--', label='蓝色虚线')
plt.plot(x, [i+2 for i in x], 'g:', label='绿色点线')

plt.legend()
plt.title('不同线条样式示例')
plt.show()
\`\`\`

# 一、图表保存

\`\`\`python
# 保存图表为图片
plt.savefig(
    '图表.png',
    dpi=300,              # 分辨率
    bbox_inches='tight',  # 自动调整边界
)
\`\`\`

但是注意，保存图片的代码必须放在 \`plt.show()\` 前面，因为 \`plt.show()\` 执行完后会清除画布。

# 二、常用设置

\`\`\`python
# 坐标轴范围
plt.xlim([0, 10])    # 设置 x 轴范围
plt.ylim([0, 100])   # 设置 y 轴范围

# 坐标轴刻度
plt.xticks([0, 2, 4, 6, 8, 10])
plt.yticks([0, 25, 50, 75, 100])

# 图例位置
plt.legend(loc='best')  # 自动选择最佳位置
\`\`\`

# 初学者常见问题

1. **中文显示乱码**
   - ✅ 解决：设置中文字体

\`\`\`python
plt.rcParams['font.sans-serif'] = ['SimHei']
\`\`\`

2. **图表不显示**
   - ✅ 解决：确保调用了 \`plt.show()\`

3. **子图重叠**
   - ✅ 解决：使用 \`plt.tight_layout()\`
`,Ri=`# 线性回归

> **课程与数据集**
>
> 本文对应 Andrew Ng（吴恩达）《Machine Learning》**单变量 / 多变量线性回归**部分。代码使用的 \`ex1data1.txt\`（城市人口 vs 连锁店利润）为课程官方编程练习数据。
>
> 数据与参考代码可在黄海广教授整理的中文笔记仓库下载：[fengdu78/Coursera-ML-AndrewNg-Notes](https://github.com/fengdu78/Coursera-ML-AndrewNg-Notes)（见 \`code/ex1/\` 目录）。课程主页：[Coursera Machine Learning](https://www.coursera.org/course/ml)。

---

# 一、数学原理

## 1.1 模型表达

我们统计了某个连锁店在不同人口城市的年利润值，例如在 6.1101 万人的城市，年利润可以达到 17.5920 万人民币。现在我要在一个新的城市开这么一家连锁店，人口可以查到，希望预估一下我的年利润值。

> 这里直接使用吴恩达课程的数据表。你问 Fitten 它也是差不多的例子，你也可以直接去看 GitHub 上其他人的笔记。只不过我这里几乎不再使用 Numpy 中的 \`matrix\` 类型，而是依赖于 \`array\` 来实现线性代数的工作。下载 Watt Toolkit 打开 GitHub 加速是最直接的加速 GitHub 的方法。

我们先来回忆高中数学，好像确实学过这个东西，只不过今天我们要利用高等数学工具。

模型自然是一元线性方程 $y = wx + b$，我们要做的就是调节 $w$ 和 $b$，让它适合我们的数据点。

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/6e96c060-ff23-4c7c-ab87-1efdb4ec1251/b49326fb1f743c7bf1c28543f72687b53fff2b789b706f43128e983b8704743d.jpg)

## 1.2 让线适合数据点

我们在高中天天用那个公式算（现在看来高中简直是我们最快乐的时光），现在我们要利用高等数学的知识找到我们的 $w$ 和 $b$。

首先我们来评估方程的误差，很显然用高中的方差就可以评估拟合的效果。

此处我们讨论更一般的情形：

$$
f(\\boldsymbol{x}) = \\theta_0 + \\theta_1 x_1 + \\theta_2 x_2 + \\cdots + \\theta_n x_n
$$

表示有 $n$ 个变量决定函数最终的值，$\\theta_0$ 为截距，$\\boldsymbol{x}$ 是一个 $n$ 维向量，里面是各个自变量。每一个数据对应的误差为 $f(x) - y$。

如果我们已经收集到了 $m$ 组数据，用上角标来标记它们，那么第 $i$ 组数据的误差为 $f(\\boldsymbol{x}^{(i)}) - y^{(i)}$。现在我们要反过来以向量

$$
\\boldsymbol{\\theta} = (\\theta_0 \\quad \\theta_1 \\quad \\theta_2 \\quad \\cdots \\quad \\theta_n)^T
$$

为自变量，讨论什么时候误差最小。我们定义**代价函数**：

$$
J(\\theta) = \\frac{1}{2m} \\sum_{i=1}^{m} (f(x^{(i)}) - y^{(i)})^2
$$

这似乎就是方差除以了 2。虽然除以 2 并不影响误差的评估效果，但为什么不直接使用方差呢？这其实是因为我们要求导，平方项会有一个 2 放下来。

## 1.3 梯度下降

这是我们要利用的新知识。但让我们先看看梯度下降的原理：在纸面上画一个二次函数，任取一个点 $(x_0, y_0)$，计算它在这一个点的导数值，并作出其切线，取一个微小的步长 $\\alpha > 0$，让这个点按照

$$
x_0' = x_0 - \\alpha f'(x_0)
$$

移动。当它慢慢移动，一旦移动到最低点，导数值为 0，就会停止移动，这样就让误差停留在了最小值。

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/6e96c060-ff23-4c7c-ab87-1efdb4ec1251/50eff108ce8a5dc7a807265eaf47d79b3ae99c2c856f81de0c0174c6a11ddafe.jpg)

你会发现它总会朝着最低点方向移动，这就是梯度下降的原理。前提是步长 $\\alpha$ 不能太大，一旦太大，就不是趋近于最小值了。我们把步长 $\\alpha$ 称为**学习率**。

敏锐的同学肯定注意到，我们可以以任何一个点为起点进行梯度下降，但是我们取到的永远是局部最小值，也就是极小值。只不过对于那些能够很好拟合成直线的数据，其三维图都是碗状的，就像二维里面的二次函数，会趋于同一个最小值。

我们将式子 $x_0' = x_0 - \\alpha f'(x_0)$ 推广到一般形式，这里就直接用计算机赋值的表达方式。每一次操作称为一次**迭代**：

$$
\\theta_j := \\theta_j - \\alpha \\frac{\\partial J(\\theta)}{\\partial \\theta_j}
$$

其中：

$$
\\frac{\\partial J(\\theta)}{\\partial \\theta_j} = \\frac{1}{m} \\sum_{i=1}^{m} (f(x^{(i)}) - y^{(i)}) x_j^{(i)}
$$

这个线性函数求偏导当然不在话下。但这里有一个代码编写中需要注意的点：这个公式毫无疑问要用到原来的 $\\theta$ 向量，所有的 $\\theta_j$ 用的都是同一个 $\\theta$，但是当你改变了 $\\theta_0$ 后，原来的 $\\theta$ 向量已经发生了改变，这就导致了**计算不同步**。所以在循环体内部要定义一个 \`temp\` 来储存原向量，用 \`temp\` 去进行运算。这个在代码编写过程中，会很容易 get 到。

---

# 二、代码编写

## 2.1 导入库与读取数据

首先我们按照惯例导入要用的库：

\`\`\`python
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from sympy.abc import theta
\`\`\`

在 GitHub、Gitee 或者课程上下载第一周的文件，请注意要将 \`ex1data1.txt\` 移动到代码文件的同一个文件夹里。

\`\`\`python
# 用 pandas 读取数据并保存在变量 data 中
path = 'ex1data1.txt'
# 文件并没有给列命名，所以 header=None，我们将数据命名为 Population, Profit
data = pd.read_csv(path, header=None, names=['Population', 'Profit'])
# 先来看一下散点图 (scatter)
data.plot(kind='scatter', x='Population', y='Profit', figsize=(12, 8))
\`\`\`

## 2.2 代价函数

接下来就是编写代价函数了。在这个函数里，我们需要传入自变量数组 \`X\`、真实值数组 \`Y\`，以及我们要计算的 $\\theta$ 数组。我们后续把 \`theta\` 定义为一维的行数组，所以矩阵乘法前要用到转置（\`.T\` 方法）。

\`\`\`python
def cost_function(X, Y, theta):
    inner = np.power((X @ theta.T) - Y, 2)  # 对应元素相乘，此处 inner 也是数组
    return np.sum(inner) / (2 * len(X))
\`\`\`

## 2.3 准备训练数据

接下来我们把 txt 文件中的数据拆分，使之成为我们需要的几个数组。

\`\`\`python
# 现在最左端添加一列 1，这样就无需进行显式的加法操作表达截距
data.insert(0, 'ones', 1)
col = data.shape[1]  # 计算有多少列，shape[] 中 0 和 1 分别表示统计行数和统计列数
X = data.iloc[:, 0:col - 1]  # 用 iloc 方法取所有行，舍弃最后一列
Y = data.iloc[:, col - 1:col]  # 取最后一列
theta_begin = np.array([0, 0]).reshape(1, 2)  # 此段代码已经放弃 matrix，所以注意用 reshape 匹配原矩阵形状

# 检查数组形状
print(X.shape)
print(theta_begin.shape)
print(Y.shape)
\`\`\`

## 2.4 梯度下降

下面我们来实现梯度下降函数。我们不可能让偏导数为 0 的时候才停下来，计算机很难算出标准的 0，这里我们指定一个迭代次数 \`iters\`。显然迭代 \`iters\` 次有一个循环，我们要改变 $\\theta$ 数组里所有的 $n+1$ 个元素又需要一个循环。

\`\`\`python
def gradientDescent(x, y, theta, alpha, iters):
    temp = np.zeros(theta.shape)  # 我们不能在第二个循环里直接改变 theta 的值，创建一个 temp 储存迭代后的数据
    parameters = theta.ravel().shape[0]  # .ravel 平摊数组统计 theta 参数个数，这就是第二个循环的循环次数
    # 我们需要第一个循环，来进行 iters 次迭代
    for i in range(iters):
        error = (x @ theta.T) - y  # 每一次的误差都是不一样的，误差写在第二个循环前
        for j in range(parameters):
            term = np.multiply(error, x[:, j].reshape(-1, 1))  # 第二个循环每一次都在改变角标为 j 的 theta 的值
            temp[0, j] = theta[0, j] - (alpha / len(x)) * np.sum(term)  # 这里 temp 就发挥了存储作用
        theta = temp.copy()  # 跳出第二个循环后将 theta 值统一改变
    return theta  # 返回 theta 数组

alpha = 0.01
iters = 1000
g = gradientDescent(X, Y, theta_begin, alpha, iters)
print(g)
\`\`\`

## 2.5 可视化拟合结果

现在我们来可视化数据：

\`\`\`python
x = np.linspace(data.Population.min(), data.Population.max(), 100)  # 横坐标
f = g[0, 0] + (g[0, 1] * x)  # 拟合的直线

fig, ax = plt.subplots(figsize=(12, 8))  # 创建图形对象 fig，轴对象 ax
ax.plot(x, f, 'r', label='Prediction')  # 直线
ax.scatter(data.Population, data.Profit, label='Training Data')  # 散点
ax.legend(loc=2)  # 添加图例，loc=2 左上方
ax.set_xlabel('Population')  # 横轴标签
ax.set_ylabel('Profit')  # 纵轴标签
ax.set_title('Predicted Profit vs. Population Size')  # 标题
plt.show()  # 显示
\`\`\`

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/6e96c060-ff23-4c7c-ab87-1efdb4ec1251/fec982785125f99cc192e43eb8a92f490379d44f5a8d7e4dbbc5f44f94c59d11.jpg)

## 2.6 记录并可视化代价函数变化

我们想看看代价函数的变化怎么弄呢？

\`\`\`python
# 在全局定义一个 cost 变量，用以记录代价函数的值，注意放在 iters = 1000 的后面
cost = np.zeros(iters)
\`\`\`

将梯度下降函数修改为：

\`\`\`python
def gradientDescent(X, y, theta, alpha, iters):
    temp = np.zeros(theta.shape)
    parameters = theta.ravel().shape[0]
    global cost

    for i in range(iters):
        error = (X @ theta.T) - y

        for j in range(parameters):
            term = np.multiply(error, X[:, j].reshape(-1, 1))
            temp[0, j] = theta[0, j] - ((alpha / len(X)) * np.sum(term))

        theta = temp.copy()
        cost[i] = cost_function(X, Y, theta)

    return theta
\`\`\`

接下来我们可视化代价函数图像：

\`\`\`python
fig2, ax2 = plt.subplots(figsize=(12, 8))
ax2.plot(np.arange(iters), cost, 'r')
ax2.set_xlabel('Iterations')
ax2.set_ylabel('Cost')
ax2.set_title('costchange')
plt.show()
\`\`\`

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/6e96c060-ff23-4c7c-ab87-1efdb4ec1251/ece3c1a8172999de18f8b281deac0b3d0561fca7ae740f3aaebdf3f98349a653.jpg)

---

**下一篇**：多变量情形下的特征缩放见《特征缩放》笔记（数据集 \`ex1data2.txt\`，同样来自上述仓库）。
`,zi=`# 特征缩放

> **课程与数据集**
>
> 本文对应 Andrew Ng（吴恩达）《Machine Learning》**梯度下降法实践 1——特征缩放**部分。代码使用的 \`ex1data2.txt\`（房屋面积、卧室数、价格）为课程官方编程练习数据，与线性回归同属第二周内容。
>
> 数据与参考代码可在黄海广教授整理的中文笔记仓库下载：[fengdu78/Coursera-ML-AndrewNg-Notes](https://github.com/fengdu78/Coursera-ML-AndrewNg-Notes)（见 \`code/ex1/\` 目录）。课程主页：[Coursera Machine Learning](https://www.coursera.org/course/ml)。

---

# 一、为什么进行特征缩放

一个由两个变量评估的数据：

$$
y = \\theta_0 + \\theta_1 x_1 + \\theta_2 x_2
$$

如果仅仅只是按照我们之前的代码，直接从 $(0, 0, 0)$ 开始梯度下降，难免会让我们产生疑问："这个初始点是否合适？有没有更高效的方式？" 比如此处如果 $x_1$ 范围为 300–500，$x_2$ 范围为 0–5，并且这两个变量对 $y$ 的影响都是很可观的。那么你就会想 "$x_1$ 的范围那么大，可见它乘上系数 $\\theta_1$ 后要产生一个很大的变化才能达到与 $x_2$ 变化 1 甚至 0.1 相同的结果。" 这就让我们想到 $|\\theta_1|$ 需要是一个很小的值，来削弱 $x_1$ 值的变化。

这个在吴恩达机器学习里有一个很好的例子（不要犹豫，肯定是和房价有关的东西）：

$$
price = w_1 x_1 + w_2 x_2 + b
$$

| 场景 | $x_1$ | $x_2$ | $price$ | $w_1$ | $w_2$ | $b$ | 结果 |
|------|-------|-------|---------|-------|-------|-----|------|
| 已知数据 | 2000 | 5 | 500k | — | — | — | — |
| 拟合 A | 2000 | 5 | — | 50 | 0.1 | 50 | $price = 100{,}050k$（效果不好） |
| 拟合 B | 2000 | 5 | — | 0.1 | 50 | 50 | $price = 500k$（效果很好） |

我们自然而然地想到：如果钱的单位是元，我们就把它变成千元；如果人数的单位是个，就把它变成千个、万个，将所有的数据通过这种简单的单位调配使其达到差不多的值。

但是别忘了我们通常输入的都是零向量，也就是说如果可以把所有数据通过简单的线性或加减变换使其都在 0 的某一个领域内，那就再好不过了。

---

# 二、特征缩放的数学原理

## 2.1 方法一（最大最小值归一化）

假设 $x_1$ 已经收集到了 $m$ 组数据，那么可以这样进行特征缩放：

$$
\\text{取平均值: } u_1 = \\frac{1}{m} \\sum_{i=1}^{m} x_1^{(i)}
$$

$$
\\text{取最大值和最小值: } \\max\\{x_1\\} \\quad \\min\\{x_1\\}
$$

$$
\\text{令: } x_1 := \\frac{x_1 - u_1}{\\max\\{x_1\\} - \\min\\{x_1\\}}
$$

## 2.2 方法二（Z-score 标准化）

$$
\\text{取平均值、标准差: } u_1 \\quad \\sigma_1
$$

$$
\\text{令: } x_1 := \\frac{x_1 - u_1}{\\sigma_1}
$$

> 特征缩放之前，舍弃明显不对劲的数据尤为重要，这个在中学生物实验就已经提到过了。

---

# 三、将 $\\theta$ 数组变换回来

我们无非就是运行了以下的式子：

$$
\\frac{y - u_y}{\\sigma_y} = \\theta_0' + \\theta_1' \\frac{x_1 - u_1}{\\sigma_1} + \\theta_2' \\frac{x_2 - u_2}{\\sigma_2} + \\cdots + \\theta_n' \\frac{x_n - u_n}{\\sigma_n}
$$

这里 $\\theta_i'$ 就是我们运行出来的、经过了特征缩放后算出的数据，而原式为：

$$
y = \\theta_0 + \\theta_1 x_1 + \\theta_2 x_2 + \\cdots + \\theta_n x_n
$$

联立可以得出：

$$
\\theta_0 = \\left(\\theta_0' - \\sum_{i=1}^{n} \\frac{\\theta_i' \\times u_i}{\\sigma_i}\\right) \\times \\sigma_y + u_y
$$

$$
\\theta_i = \\frac{\\theta_i'}{\\sigma_i} \\sigma_y \\quad (i = 1, 2, 3 \\ldots n)
$$

---

# 四、代码实现

## 4.1 导入库与读取数据

首先导入要用的库和数据：

\`\`\`python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

path = 'ex1data2.txt'
data = pd.read_csv(path, header=None, names=['Size', 'Bedrooms', 'Price'])
data.head()  # 查看数据有多少列，方便定义 theta_begin
\`\`\`

## 4.2 特征缩放

对数据进行特征缩放：

\`\`\`python
# 处理数据
means = np.array(data.mean().values).reshape(1, 3)  # 把平均值保存下来并且化为 array 类型
std = np.array(data.std().values).reshape(1, 3)  # 保存 mean std

temp = data.copy()  # 保存源数据
data = (data - data.mean(axis=0)) / data.std(axis=0)  # data.mean(axis=0) 表示每列替换为平均值
print(data.head())

data.insert(0, 'ones', 1)

cols = data.shape[1]

X = data.iloc[:, 0:cols - 1]  # X 是所有行去掉最后一列
Y = data.iloc[:, cols - 1:cols]

X = np.array(X.values)
Y = np.array(Y.values)

theta_begin = np.array([0, 0, 0]).reshape(1, 3)  # 调整为 (1,3) 形状以匹配原矩阵形状
\`\`\`

## 4.3 代价函数与梯度下降

代价函数和梯度下降函数还是老样子，因为我们之前写的函数对于任意列数都有用：

\`\`\`python
iters = 1000
cost = np.zeros(iters)

def cost_function(X, Y, theta):
    inner = np.power((X @ theta.T) - Y, 2)
    return np.sum(inner) / (2 * len(X))

def gradient_descent(X, y, theta, alpha, iters):
    temp = np.zeros(theta.shape)
    parameters = theta.ravel().shape[0]
    global cost
    for i in range(iters):
        error = (X @ theta.T) - y
        for j in range(parameters):
            term = np.multiply(error, X[:, j].reshape(-1, 1))
            temp[0, j] = theta[0, j] - ((alpha / len(X)) * np.sum(term))
        theta = temp.copy()
        cost[i] = cost_function(X, Y, theta)
    return theta
\`\`\`

## 4.4 训练与可视化

我们查看特征缩放得出来的 $\\theta$ 数组。由于特征缩放不影响 cost 的评估，我们再可视化一下 cost：

\`\`\`python
g = gradient_descent(X, Y, theta_begin, 0.01, iters)
print(g)
print(cost_function(X, Y, g))

# 迭代 cost 可视化
fig, ax = plt.subplots(figsize=(12, 8))
ax.plot(np.arange(iters), cost, 'r')
ax.set_xlabel('iters')
ax.set_ylabel('cost')
ax.set_title('change of cost')
plt.show()
\`\`\`

## 4.5 参数反变换

我们接下来将参数转换回去，即从 $\\theta'$ 到 $\\theta$：

\`\`\`python
def theta_back(theta, means, std):
    thetaback = theta.copy()

    thetaback[0, 0] = (theta[0, 0] - (np.sum((means[0, :-1] * theta[0, 1:]) / std[0, :-1]))) * std[0, -1] + means[0, -1]  # 目标变量也被标准化

    thetaback[0, 1:] = (theta[0, 1:] / std[0, :-1]) * std[0, -1]
    return thetaback
\`\`\`

我们看看最终结果：

\`\`\`python
gf = theta_back(g, means, std)
print(gf)
\`\`\`

**示例输出**：

\`\`\`text
[[88307.21151185 138.22534685 -7709.05876589]]
\`\`\`

---

**前置知识**：《线性回归》笔记（\`ex1data1.txt\`）。**后续**：《逻辑回归》《正则化》笔记（\`ex2data1.txt\` / \`ex2data2.txt\`）。
`,Hi=`# 逻辑回归

> **课程与数据集**
>
> 本文对应 Andrew Ng（吴恩达）《Machine Learning》**逻辑回归**部分。代码使用的 \`ex2data1.txt\` 为课程官方编程练习数据：两名考试分数与是否被录取（0/1）。
>
> 数据与参考代码可在黄海广教授整理的中文笔记仓库下载：[fengdu78/Coursera-ML-AndrewNg-Notes](https://github.com/fengdu78/Coursera-ML-AndrewNg-Notes)（见 \`code/ex2/\` 目录）。课程主页：[Coursera Machine Learning](https://www.coursera.org/course/ml)。

---

# 一、什么是逻辑回归？

逻辑回归是监督学习的一种。与线性回归的目的是拟合直线或曲线不同，逻辑回归的目的是**分类**。

拿最经典简单的逻辑回归为例：给你许多苹果的数据，告诉你它们的大小，以及它们分别是普通苹果还是红富士苹果，然后让你判断一个新苹果是哪一种。

- 普通苹果，记为 **0**
- 红富士苹果，记为 **1**

逻辑回归和线性回归的区别就显而易见了：逻辑回归的真值往往就是有限个简单的数字。上面的例子只要求分为两类，我们自然而然 label 为 0 和 1（这样标记在后面会看到其实大有用处）。当自变量有两个的时候，我们也不必建立 z 轴显示 0 和 1，而是用颜色表示。现在的任务就是利用已有的数据去预测新的苹果是普通苹果，还是红富士苹果。

> **说明**：苹果例子用于理解"二分类"思想；本笔记代码实际使用的是吴恩达课程中的 **\`ex2data1.txt\`**（两门考试分数 → 是否录取），见下文数据可视化部分。

我们不妨先把数据可视化为散点图，好直观地理解为什么线性回归不能用了，以及数据是否是可分类的。

\`\`\`python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

path = 'ex2data1.txt'
data = pd.read_csv(path, header=None, names=['exam1', 'exam2', 'admitted'])
print(data.head())

# 接下来我们取最后一列（只有 0 和 1 的那一列），将 0 和 1 的行分别记为 negative, positive
positive = data.loc[data['admitted'].isin([1]), :]
negative = data.loc[data['admitted'].isin([0]), :]  # 用 isin() 方法筛选出真值为 0 和 1 的行，将赋值 bool 值
print(positive.head())
print(negative.head())
\`\`\`

这里的 \`isin\` 方法经常和 \`loc\`、\`iloc\` 配合。在列表里输入 1 时，它会给值为 1 的元素赋为 True，不符合条件的记为 False。当把 \`data['admitted'].isin([1])\` print 出来，将会得到：

\`\`\`text
0    False
1    False
2    False
3     True
4     True
Name: admitted, dtype: bool
\`\`\`

\`loc\` 会将显示为 True 的行或者列留下。

现在我们绘制散点图：

\`\`\`python
fig, ax = plt.subplots(figsize=(12, 8))
ax.scatter(positive['exam1'], positive['exam2'], s=50, c='b', marker='o', label='Admitted')
ax.scatter(negative['exam1'], negative['exam2'], s=50, c='r', marker='x', label='Not Admitted')
ax.legend()
ax.set_xlabel('Exam1 Score')
ax.set_ylabel('Exam2 Score')
plt.show()
\`\`\`

---

# 二、逻辑回归的数学原理

## 2.1 数学模型——sigmoid 函数

对于这种分类算法，依靠线性回归的数学模型显然不能满足我们的需求。下面我们将讨论 sigmoid 函数。学过概统的，现在应该已经知道为什么我们会选择它。下面让我们看看 sigmoid 函数的性质，理解为什么它适合逻辑回归。

**sigmoid 函数**：

$$
g(z) = \\frac{1}{1 + e^{-z}}
$$

这个函数高中生在脑子里就可以绘制出来了。我们也可以用 matplotlib 绘制一下：

\`\`\`python
def sigmoid(z):
    return 1 / (1 + np.exp(-z))

nums = np.arange(-10, 10, step=0.5)
fig, ax = plt.subplots(figsize=(12, 8))
ax.plot(nums, sigmoid(nums), 'r')
plt.show()
\`\`\`

显然在红富士苹果的例子中，苹果越大，越有可能是红富士苹果。我们只需要很简单的 sigmoid 函数，尺寸越大，值越接近 1，尺寸越小，值越接近 0。这样子看来它给出的值确实非常适合评估某个苹果是否是红富士苹果，我们可以把它的函数值当成数学期望，好像确实是很好的评估工具。

但是很显然，\`ex2data1.txt\` 里面的数据可不是给个大小让你去看它是红富士苹果的期望大不大。它给出了两个数据，而且并不是越大越可能是 1。这个时候，我们就得对式子里的 $z$ 做文章了。

怎样强化 sigmoid 函数才能使得我们可以去调控多个变量的系数，并且可以用梯度下降使得它可以朝我们需要的方向发展呢？这听起来是线性回归干的活。于是我们做如下处理：

**数学模型**：假设有 $n$ 个变量构成 $\\vec{x}$，则定义：

$$
f(\\vec{x}) = g(h(\\vec{x}))
$$

其中：$g(z) = \\dfrac{1}{1 + e^{-z}}$，$h(x) = \\vec{\\theta} \\cdot \\vec{x}$

即：

$$
f(\\vec{x}) = \\frac{1}{1 + e^{-\\vec{\\theta} \\cdot \\vec{x}}}
$$

这样就可以利用线性回归拟合的功能，调整系数使之符合我们的方向。

## 2.2 代价函数

对于一组数据的代价函数我们定义为：

| 条件 | 损失 $L(f(\\vec{x^{(i)}}), y^{(i)})$ |
|------|--------------------------------------|
| $y^{(i)} = 1$ | $-\\log(f(\\vec{x^{(i)}}))$ |
| $y^{(i)} = 0$ | $-\\log(1 - f(\\vec{x^{(i)}}))$ |

此处 log 没有底数表示任何底数都能用于误差的评估，后面求导的时候默认底数为自然对数 $e$。可以直接取 $e$ 为底，我们一旦做出图像就会发现，当 $f(\\vec{x^{(i)}})$ 真值为 1 时，越接近 1，代价函数越小，越接近 0，代价函数越大，这符合我们的要求。这个时候，已经有人在写 if-else 语句了，而我们有更好的选择：

$$
L(f(\\vec{x^{(i)}}), y^{(i)}) = -y^{(i)} \\log(f(\\vec{x^{(i)}})) - (1 - y^{(i)}) \\log(1 - f(\\vec{x^{(i)}}))
$$

把 $y^{(i)}$ 和 $1 - y^{(i)}$ 代入可以发现二者等价。倘若有 $m$ 组数据：

$$
L(\\vec{\\theta}) = \\frac{1}{m} \\sum_{i=1}^{m} \\left[ -y^{(i)} \\log(f(\\vec{x^{(i)}})) - (1 - y^{(i)}) \\log(1 - f(\\vec{x^{(i)}})) \\right]
$$

## 2.3 代价函数求导

为了实现梯度下降，我们还要知道代价函数对 $\\theta_j$ 求偏导后的形式（此处为了简便，偏导默认为对第 $j$ 个系数进行）：

$$
f(\\vec{x}) = \\frac{1}{1 + e^{-\\vec{\\theta} \\cdot \\vec{x}}} \\rightarrow f'(\\vec{x}) = \\frac{x_j e^{-\\vec{\\theta} \\cdot \\vec{x}}}{(1 + e^{-\\vec{\\theta} \\cdot \\vec{x}})^2}
$$

注意到：

$$
\\frac{f'(\\vec{x})}{f(\\vec{x})} = x_j (1 - f(\\vec{x}))
$$

$$
\\frac{-f'(\\vec{x})}{1 - f(\\vec{x})} = -x_j f(\\vec{x})
$$

使用链式法则对代价函数求偏导：

$$
\\frac{\\partial L}{\\partial \\theta_j} = -y^{(i)} \\frac{f'(\\vec{x})}{f(\\vec{x})} - (1 - y^{(i)}) \\frac{-f'(\\vec{x})}{1 - f(\\vec{x})}
$$

代入我们经典的 $f(\\vec{x})$，注意到 $y^{(i)}$ 和 $1 - y^{(i)}$：

$$
\\frac{\\partial L}{\\partial \\theta_j} = -y^{(i)} x_j (1 - f(\\vec{x})) - (1 - y^{(i)}) (-x_j f(\\vec{x}))
$$

最终代价函数的和式表达式为：

$$
\\frac{\\partial L}{\\partial \\theta_j} = \\frac{1}{m} \\sum_{i=1}^{m} (f(\\vec{x^{(i)}}) - y^{(i)}) x_j^{(i)}
$$

很显然对于常数项：

$$
\\frac{\\partial L}{\\partial \\theta_0} = \\frac{1}{m} \\sum_{i=1}^{m} (f(\\vec{x^{(i)}}) - y^{(i)})
$$

有了函数模型和代价函数及其偏导数，就可以开始写代码了。

---

# 三、代码编写

## 3.1 导入库

首先我们导入必要的库：

\`\`\`python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import scipy.optimize as opt
\`\`\`

你会发现我们导入了一个新的库，这个库的 \`opt\` 功能我们之后会讲解要注意的事项。

## 3.2 可视化数据

可视化数据，这个开头做过了：

\`\`\`python
path = 'ex2data1.txt'
data = pd.read_csv(path, header=None, names=['exam1', 'exam2', 'admitted'])
print(data.head())
# 接下来我们取最后一列（只有 0 和 1 的那一列），将 0 和 1 的行分别记为 negative, positive
positive = data.loc[data['admitted'].isin([1]), :]
negative = data.loc[data['admitted'].isin([0]), :]  # 用 isin() 方法筛选出真值为 0 和 1 的行，将赋值 bool 值
print(positive.head())
print(negative.head())

fig, ax = plt.subplots(figsize=(12, 8))
ax.scatter(positive['exam1'], positive['exam2'], s=50, c='b', marker='o', label='Admitted')
ax.scatter(negative['exam1'], negative['exam2'], s=50, c='r', marker='x', label='Not Admitted')
ax.legend()
ax.set_xlabel('Exam1 Score')
ax.set_ylabel('Exam2 Score')
# plt.show()
\`\`\`

## 3.3 数据预处理

数据处理和之前的一样，这里要注意 Y 数组要严格一维数组，否则广播的时候会出错：

\`\`\`python
data.insert(0, 'Ones', 1)
cols = data.shape[1]
X = data.iloc[:, 0:cols - 1]  # X 是所有行去掉最后一列
Y = data.iloc[:, cols - 1:cols]
X = np.array(X.values)
Y = np.array(Y.values).reshape(-1, 1)
theta_begin = np.zeros(3)
\`\`\`

## 3.4 代价函数

代价函数：参数的位置不能乱放，\`cost_function\` 和 \`gradient\` 的第一个参数为 \`theta\`，这是 \`opt.fmin_tnc()\` 的要求。

这里的 theta 需要先做一步 \`reshape(1, -1)\` 看起来没什么变化，但是 scipy 的 opt 只能接受一维数组，全局的 \`theta_begin\` 必须是 \`(3,)\`，在函数里要变成 \`(1, 3)\` 防止广播问题。

\`\`\`python
# sigmoid 函数
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

# 代价函数
def cost_function(theta, x, y):
    theta = theta.reshape(1, -1)
    f = sigmoid(x @ theta.T)
    term1 = y * np.log(f)
    term2 = (1 - y) * np.log(1 - f)
    cost = -np.mean(term1 + term2)
    return cost

p = cost_function(theta_begin, X, Y)
print(p)
\`\`\`

**运行结果**：\`0.6931471805599453\`

## 3.5 梯度函数

现在我们只写一个可以计算梯度下降第一步步长的函数，之后的工作交给 scipy。这里建议不要用循环去写，直接 \`x.T @ error\` 即可得到我们想要的 sum 数组，然后除以数量即可。（我用循环写出来的数据不一样，问题还没有搞清楚）

\`\`\`python
def gradient(theta, x, y):
    theta = theta.reshape(-1, 1)  # (3, 1)
    h = sigmoid(x @ theta)  # (m, 1)
    error = h - y.reshape(-1, 1)  # (m, 1)
    grad = (x.T @ error) / len(y)  # (3, 1)
    return grad.ravel()  # (3,)

grad1 = gradient(theta_begin, X, Y)
print(grad1)
\`\`\`

**运行结果**：\`[-0.1 -12.00921659 -11.26284221]\`

## 3.6 使用 scipy 优化

使用 \`opt.fmin_tnc()\` 进行优化：

\`\`\`python
# 使用优化算法求解最优参数
result = opt.fmin_tnc(func=cost_function, x0=theta_begin, fprime=gradient, args=(X, Y))
optimal_theta = result[0]
print(f'Optimal theta: {optimal_theta}')
# 计算最优参数下的代价
final_cost = cost_function(optimal_theta, X, Y)
print(f'Final cost: {final_cost}')
\`\`\`

**运行结果**：

\`\`\`text
Optimal theta: [-25.16131846  0.20623159  0.20147148]
Final cost: 0.20349770158947528
\`\`\`

## 3.7 预测与准确率

我们接下来看看我们的模型到底准不准，我们把所有的数据重新按得出的预测模型预测一遍，将结果与真值比较：

\`\`\`python
# 预测函数的值
def predict(theta, x):
    probabilities = sigmoid(x @ theta.T)
    return (probabilities >= 0.5).astype(int)
\`\`\`

显然函数 \`predict\` 第一个参数是 \`result[0]\`，第二个参数就是数据 X：

\`\`\`python
# 查看最终结果预测效果
theta_min = np.array(result[0])
predictions = predict(theta_min, X)
accuracy = np.mean(predictions == Y.flatten()) * 100
print(f'accuracy = {accuracy}%')
\`\`\`

**结果的准确率高达**：

\`\`\`text
accuracy = 89.0%
\`\`\`

---

**下一篇**：当线性/logistic 边界不够用时，见《正则化》笔记（数据集 \`ex2data2.txt\`，同样来自上述仓库）。
`,ji=`# 正则化

> **课程与数据集**
>
> 本文对应 Andrew Ng（吴恩达）《Machine Learning》**正则化**部分，是《逻辑回归》的延伸。代码使用的 \`ex2data2.txt\`（两次测试分数与芯片是否合格）为课程官方编程练习数据。
>
> 数据与参考代码可在黄海广教授整理的中文笔记仓库下载：[fengdu78/Coursera-ML-AndrewNg-Notes](https://github.com/fengdu78/Coursera-ML-AndrewNg-Notes)（见 \`code/ex2/\` 目录）。课程主页：[Coursera Machine Learning](https://www.coursera.org/course/ml)。

---

# 一、为什么要进行正则化

## 1.1 过拟合

所谓过拟合，就是模型对数据拟合得很好，但是根本无法反映数据的变化规律。例如拉格朗日插值法（我强烈建议大家去 b 站看乐正垂心的那一期视频），它可以给出完美经过所有已知点的曲线，但这条曲线显然无法反映数据的变化趋势。一条可以经过所有数据点但是弯弯绕绕、次数和项过于复杂的曲线根本无法预测新的数据——也就是对原有数据拟合得好，但是没有任何预测价值。

## 1.2 欠拟合

欠拟合，顾名思义，就是曲线的复杂性根本满足不了拟合的需要。比如，一些明显呈现出对数变化规律的点，我们只会拿直线去拟合，这就达不到拟合源数据的需要了。

## 1.3 从线性到多项式

当我们将数据可视化之后，发现数据根本不能用最简单的线性回归或最简单的逻辑回归来拟合时，我们就要考虑将那个经典式子 $\\vec{\\theta}$ 从一次的线性式子，变成高次的多项式，例如将

$$
\\theta_1 x_1 + \\theta_2 x_2 + \\theta_3 x_3
$$

转变为

$$
\\theta_{11} x_1^2 + \\theta_{22} x_2^2 + \\theta_{33} x_3^2 + \\theta_{12} x_1 x_2 + \\theta_{13} x_1 x_3 + \\theta_{23} x_2 x_3
$$

这个拟合效果不就强了吗？但是我们又要考虑过拟合的问题，不是所有的项都有利，那么如何避免过拟合呢？方法就是**正则化**。

---

# 二、如何进行正则化

既然正则化是为了防止过拟合而存在的，那么就可以把所有项的系数都平方（防止正负抵消）都加入到代价函数里面：

$$
J(\\theta) = \\frac{1}{m} \\sum_{i=1}^{m} \\left[ -y^{(i)} \\log(h_\\theta(x^{(i)})) - (1 - y^{(i)}) \\log(1 - h_\\theta(x^{(i)})) \\right] + \\frac{\\lambda}{2m} \\sum_{j=1}^{n} \\theta_j^2
$$

仔细观察这个式子，会发现如果系数过大，那么 cost 也会变大，这就是正则化的惩罚机制。它避免了各个项系数过大导致曲线过于弯曲的问题，让虽然不能适配每一个点，但是更有规律的那条曲线胜出。

---

# 三、代码

## 3.1 导入库与可视化

导入库和数据可视化不用多说：

\`\`\`python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import scipy.optimize as opt
from sklearn import linear_model

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

path = 'ex2data2.txt'
data2 = pd.read_csv(path, header=None, names=['Text1', 'Text2', 'Accepted'])

# 可视化数据
positive = data2.loc[data2['Accepted'].isin([1]), :]
negative = data2.loc[data2['Accepted'].isin([0]), :]

fig, ax = plt.subplots(figsize=(12, 8))
ax.scatter(positive['Text1'], positive['Text2'], s=50, c='b', marker='o', label='Accepted')
ax.scatter(negative['Text1'], negative['Text2'], s=50, c='r', marker='x', label='Rejected')
ax.legend()
ax.set_xlabel('Test 1 Score')
ax.set_ylabel('Test 2 Score')
plt.show()
\`\`\`

## 3.2 构建多项式特征

我们来看看怎么构建多项式，此处选择最高次数为 5 次：

\`\`\`python
# 数据多项式拟合之前先做一步多项式处理
degree_max = 5
data2.insert(3, 'Ones', 1)
x1 = data2['Text1']
x2 = data2['Text2']

for i in range(1, degree_max):
    for j in range(0, i):
        data2['F' + str(i) + str(j)] = np.power(x1, i - j) * np.power(x2, j)  # 添加多项式的列
data2.drop('Text1', axis=1, inplace=True)  # 丢弃原来的一次列
data2.drop('Text2', axis=1, inplace=True)
print(data2.head())

# 运行完后，原来的数据表将会长这样
\`\`\`

\`\`\`text
   Accepted  Ones       F10       F20       F21       F30       F31       F32       F40       F41       F42       F43
0         1     1  0.051267  0.002628  0.035864  0.000135  0.001839  0.025089  0.000007  0.000094  0.001286  0.017551
1         1     1 -0.092742  0.008601 -0.063523 -0.000798  0.005891 -0.043509  0.000074 -0.000546  0.004035 -0.029801
2         1     1 -0.213710  0.045672 -0.147941 -0.009761  0.031616 -0.102412  0.002086 -0.006757  0.021886 -0.070895
3         1     1 -0.375000  0.140625 -0.188321 -0.052734  0.070620 -0.094573  0.019775 -0.026483  0.035465 -0.047494
4         1     1 -0.513250  0.263426 -0.238990 -0.135203  0.122661 -0.111283  0.069393 -0.062956  0.057116 -0.051818
\`\`\`

## 3.3 正则化代价函数

代价函数真心建议直接用 \`np.mean()\`，你拿 \`-np.sum(first + second) / len(x)\` 会算出 80 多：

\`\`\`python
def cost_reg(theta, x, y, learning_rate):
    first = y * np.log(sigmoid(x @ theta.T))
    second = (1 - y) * np.log(1 - sigmoid(x @ theta.T))
    reg = learning_rate / (2 * len(x)) * np.sum(np.power(theta[1:], 2))
    return -np.mean(first + second) + reg
\`\`\`

\`\`\`python
# 数据准备
cols = data2.shape[1]
X = data2.iloc[:, 1:cols]
y = data2.iloc[:, 0:1]

X = np.array(X.values)
y = np.array(y.values)
theta_begin = np.zeros(11)

learning_rate = 1
cost1 = cost_reg(theta_begin, X, y, learning_rate)
print(cost1)
\`\`\`

**结果是**：

\`\`\`text
0.6931471805599453
\`\`\`

## 3.4 正则化梯度

你可以像上节课那样，计算第一个步长 grad1，只需要在函数里加上正则化项即可：

\`\`\`python
def gradient_reg(theta, x, y, learningRate):
    theta = theta.reshape(-1, 1)
    m = len(x)  # 样本数量
    error = sigmoid(x @ theta) - y  # 向量化计算误差
    # 计算梯度（向量化）
    grad = (x.T @ error) / m  # 基本梯度项
    # 添加 L2 正则化项（注意：不对 theta[0] 正则化）
    reg_term = (learningRate / m) * theta
    reg_term[0] = 0  # 跳过偏置项的正则化
    return (grad + reg_term).ravel()

grad1 = gradient_reg(theta_begin, X, y, learning_rate)
print(grad1)
\`\`\`

**结果**：

\`\`\`text
[[0.00847458]
 [0.01878809]
 [0.05034464]
 [0.01150133]
 [0.01835599]
 [0.00732393]
 [0.00819244]
 [0.03934862]
 [0.00223924]
 [0.01286005]
 [0.00309594]]
\`\`\`

## 3.5 优化求解

然后用：

\`\`\`python
result2 = opt.fmin_tnc(func=cost_reg, x0=theta_begin, fprime=gradient_reg, args=(X, y, learning_rate))
print(result2)
\`\`\`

**结果为**：

\`\`\`text
(array([1.96323274e-03, 1.15183244e-03, -5.98648828e-03, -2.30810686e-03,
        4.69068291e-04, -9.02656339e-04, -1.64522767e-03, -4.53041378e-03,
        1.03585595e-05, -3.19517068e-03, -2.69567220e-04]), 92, 1)
\`\`\`

## 3.6 预测准确率

再看看效果：

\`\`\`python
def predict(theta, x):
    probabilities = sigmoid(x @ theta.T)
    return (probabilities >= 0.5).astype(int)

theta_min = np.array(result2[0])
predictions = predict(theta_min, X)
accuracy = np.mean(predictions == y.flatten()) * 100
print(f'accuracy = {accuracy}%')
\`\`\`

结果在 60% 左右就可以了。

## 3.7 可选：sklearn 实现

也可以用：

\`\`\`python
model = linear_model.LogisticRegression(penalty='l2', C=1.0)
r = model.fit(X, y.ravel())  # 一定要将 y 展平为一维
print(r)
print(model.score(X, y))
\`\`\`

---

**前置知识**：《逻辑回归》笔记（\`ex2data1.txt\`）。数据集均来自 [Coursera-ML-AndrewNg-Notes](https://github.com/fengdu78/Coursera-ML-AndrewNg-Notes)。
`,Ui=`# 神经网络概述和模型训练的一般步骤

"激活函数，博大精深"

## 层

神经网络按最简单的分类，就是输入层、隐藏层和输出层，举一个最简单的例子：你现在有一张灰度图像，假设为 1000×1000 的格式，现在要用神经网络检测它是否是猫的图像。首先这张图像的 (1000, 1000) 数组被输入层处理后，被提取为不同的特征进入隐藏层，或许在第一层隐藏层中，神经网络的各个神经元都在处理不同的、很小的图像像素，这一层提取到的特征将通过激活函数传递给下一层，下一层也许会处理比较大块的图像像素，然后将提取的特征又通过激活函数传递给下一层……如果我们的需求是：图像里的是猫就输出 1，不是猫就输出 0，那么最后一层完全可以就是一个逻辑回归，只有一个神经元输出 0 或 1。

## 激活函数

激活函数的设置，就是为了引入非线性。激活函数当然可以是线性函数，但是如果所有层都使用线性激活函数，那么线性函数套线性函数还是线性函数，这个神经网络只做了个线性回归。

经常使用的激活函数除了逻辑回归的 sigmoid 函数，还有 Tanh、ReLU（最常用，几乎是 CNN 和 MLP 隐藏层首选）、GELU（Transformer 最常用）、Softmax（多分类）。

"激活函数，博大精深"，ReLU 的魅力所在可以去各大平台听讲解，这里不再赘述。

同一层的神经元共用一个激活函数，只不过每个神经元有自己的处理参数。（这一块可以去 b 站找吴恩达的教程）

## 我如何开始我的项目

1. 确定任务内容、创新点。
2. 收集数据集。
3. 把数据集划分为训练集（train set）、验证集（validation set）和测试集（test set），这么做是为了验证模型的泛化能力，避免过拟合。比如在训练集上表现很好的模型，如果它过拟合了，那么它在验证集上会表现得很差，在简单的任务或者小工程中，查看模型在验证集上的表现一般就能知道模型的泛化能力了。
4. 选择模型进行构建。

## 怎么判断模型好不好

### 1. 混淆矩阵

假设我们要查看类别 A 的预测情况。假设混淆矩阵横向为真实值记为 P（Positive）和 N（Negative），表示真实结果是否是类别 A；纵向为预测值，同样记为 P（Positive）和 N（Negative），表示预测的结果是否为 A。如果预测的结果与真实值相同，就在前面加上 T（True），预测错误则在前面加上 F（False），第二个字母则是预测值（P 或 N），这样就把预测结果和真实结果的关系对应起来了。

假设我们正在处理一个"疾病诊断"问题：

- 正例：患病
- 负例：健康

| 实际\\预测 | 预测为正例 | 预测为负例 |
|-----------|------------|------------|
| 实际为正例 | True Positive (TP) 真正例：病人被正确诊断 | False Negative (FN) 假负例：病人被误诊为健康 |
| 实际为负例 | False Positive (FP) 假正例：健康人被误诊为病人 | True Negative (TN) 真负例：健康人被正确诊断 |

### 2. 精确率、召回率与 F1 分数

| 指标 | 含义 | 公式 |
|------|------|------|
| 精确率（Precision） | 在所有预测为正的结果中，真正为正的比例；反映模型的防错检能力 | $Precision = \\dfrac{TP}{TP + FP}$ |
| 召回率（Recall） | 在所有实际为正的样本中，被预测正确的比例；反映模型的防漏检能力 | $Recall = \\dfrac{TP}{TP + FN}$ |
| F1 分数（F1 Score） | 精确率与召回率的调和平均，用于平衡二者（一般二者相斥） | $F1 = \\dfrac{2 \\times Precision \\times Recall}{Precision + Recall}$ |

一般来说，训练完模型后查看它在验证集上的表现时，我们先查看 F1 分数的大小来判断模型是否合格。

### 3. mAP（mean Average Precision）

这是模型评价的核心指标，它综合了不同置信度和 IOU 的检测表现。首先要计算 AP（Average Precision）——Precision-Recall 曲线下的面积（AUC），而 mAP 就是对所有类别的 AP 取平均（mean），例如 mAP@[IOU=0.5] 就是在 IOU=0.5 的阈值下，对所有类别的 AP 取平均。YOLO 官方也就是将 mAP 对比图作为 YOLO 模型质量的标准。
`,Gi="# 深度学习的概念.md",Xn=Object.assign({"../../notes/AI生产力工具/MCP协议.md":yi,"../../notes/AI生产力工具/vibecoding.md":$i,"../../notes/ROS2/01-安装.md":xi,"../../notes/ROS2/02-在小海龟示例上运行命令行.md":ki,"../../notes/ROS2/03-工作空间和功能包.md":Pi,"../../notes/index.md":wi,"../../notes/大创-无人机与自主导航/01-IMU.md":Si,"../../notes/大创-无人机与自主导航/02-VO和VIO.md":Li,"../../notes/大创-无人机与自主导航/03-雅可比矩阵.md":Ci,"../../notes/大创-计算机视觉/YOLO入门.md":Ai,"../../notes/大创-计算机视觉/YOLO原理概述.md":Mi,"../../notes/大创-计算机视觉/opencv.md":Ti,"../../notes/数学/抽象代数/群.md":Ii,"../../notes/数据结构/0-数据结构概述.md":Ni,"../../notes/数据结构/1-链表.md":Oi,"../../notes/数据结构/2-堆栈.md":Vi,"../../notes/机器学习/0-基本库/01-numpy手册.md":Bi,"../../notes/机器学习/0-基本库/02-pandas手册.md":Fi,"../../notes/机器学习/0-基本库/03-matplotlib手册.md":Ei,"../../notes/机器学习/1-线性回归/01-线性回归.md":Ri,"../../notes/机器学习/1-线性回归/02-特征缩放.md":zi,"../../notes/机器学习/2-逻辑回归/01-逻辑回归.md":Hi,"../../notes/机器学习/2-逻辑回归/02-正则化.md":ji,"../../notes/机器学习/3-神经网络概述与模型指标/神经网络概述和训练模型.md":Ui,"../../notes/深度学习/深度学习的概念.md":Gi}),Kn=["/gongzi.png","/aris.jpg","/you.jpg","/qinxiang.png","/mary.jpg","/uzquneen.jpg"],An={机器学习:{details:"从基础库、线性回归到神经网络，把模型训练拆成可复习的路线。",img:"/gongzi.png",order:10},深度学习:{details:"记录深度学习核心概念、模型理解和持续补全的学习笔记。",img:"/aris.jpg",order:20},"大创-计算机视觉":{details:"围绕 OpenCV、YOLO 和视觉项目实践展开的工程记录。",img:"/you.jpg",order:30},"大创-无人机与自主导航":{details:"IMU、VO/VIO、雅可比矩阵等自主导航方向的专题整理。",img:"/qinxiang.png",order:40},数学:{details:"把抽象代数等数学内容沉淀成可以反复翻看的推导。",img:"/mary.jpg",order:50},AI生产力工具:{title:"AI 生产力工具",details:"Vibe coding、MCP 等 AI 工具链和实践体验记录。",img:"/miku.webp",order:60},数据结构:{details:"链表、堆栈等基础数据结构的复习与总结。",img:"/white.webp",order:70},ROS2:{details:"从安装、小海龟命令行到工作空间和功能包的 ROS2 入门路线。",img:"/mika.png",order:80}};function Di(n){return n.replace(/^---\s*[\s\S]*?\s*---\s*/,"")}function Yi(n,e){var a;const o=Di(n).match(/^#\s+(.+)$/m);return((a=o==null?void 0:o[1])==null?void 0:a.trim())||e.replace(/\.md$/,"")}function qi(n){return n.endsWith("/index.md")?`/notes/${n.replace(/\/index\.md$/,"")}/`:`/notes/${n.replace(/\.md$/,"")}`}function Xi(n){return!n.endsWith("/README.md")&&!n.endsWith("/index.md")}function Ki(){const n=new Map,e=new Map;for(const t in Xn){const o=t.replace(/^\.\.\/\.\.\/notes\//,""),a=o.split("/"),l=a[0];if(!l||!Xi(o))continue;const r=a[a.length-1],s={title:Yi(Xn[t],r),link:qi(o),category:l,path:o},u=n.get(l)||[];if(u.push(s),n.set(l,u),a.length>2){const v=e.get(l)||new Set;v.add(a[1]),e.set(l,v)}}return Array.from(n.entries()).map(([t,o],a)=>{var s,u;const l=An[t],r=o.sort((v,L)=>v.path.localeCompare(L.path,"zh-Hans-CN"));return{name:t,title:(l==null?void 0:l.title)||t,details:(l==null?void 0:l.details)||"持续整理中的学习笔记与实践记录。",img:(l==null?void 0:l.img)||Kn[a%Kn.length],link:((s=r[0])==null?void 0:s.link)||`/notes/${t}/`,count:r.length,subCount:((u=e.get(t))==null?void 0:u.size)||0,articles:r}}).sort((t,o)=>{var r,s;const a=((r=An[t.name])==null?void 0:r.order)??999,l=((s=An[o.name])==null?void 0:s.order)??999;return a-l||t.name.localeCompare(o.name,"zh-Hans-CN")})}const Wi=[{icon:"/github.svg",name:"GitHub",url:"https://github.com/evilmordy",displayUrl:"github.com/evilmordy",desc:"代码仓库与开源项目"},{icon:"/bilibili.svg",name:"Bilibili",url:"https://space.bilibili.com/3546701528828459",displayUrl:"loveryou-",desc:"视频与分享"},{icon:"/推特.svg",name:"Twitter/X",url:"https://x.com/pysimpom",displayUrl:"x.com/pysimpom",desc:"来关注我的推特"},{icon:"/threads.svg",name:"Threads",url:"https://www.threads.net/@pysimpom",displayUrl:"threads.net/@pysimpom",desc:"文字 & 生活"},{icon:"/邮箱.svg",name:"QQ邮箱",url:"mailto:1119864217@qq.com",displayUrl:"1119864217@qq.com",desc:"欢迎随时联系我"},{icon:"/工作邮箱.svg",name:"工作邮箱",url:"mailto:3999485702@qq.com",displayUrl:"3999485702@qq.com",desc:"聊正事的"}],Ji=[{name:"VitePress",url:"https://vitepress.dev",img:"https://vitepress.dev/vitepress-logo-mini.svg",summary:"由 Vite 驱动的静态站点生成器，本站基于此构建"},{name:"余弦の博客",url:"https://blog.cosine.ren/",img:"https://blog.cosine.ren/img/avatar.webp",summary:"伟大的余弦大人"}];function Zi(n,e={}){const{threshold:t=.15,rootMargin:o="0px 0px -40px 0px"}=e;let a=null;X(()=>{const l=n.value;if(!l)return;const r=l.querySelectorAll("[data-reveal]");if(r.length!==0){a=new IntersectionObserver(s=>{for(const u of s)u.isIntersecting&&(u.target.classList.add("is-visible"),a==null||a.unobserve(u.target))},{threshold:t,rootMargin:o});for(const s of r)a.observe(s)}}),rn(()=>{a==null||a.disconnect(),a=null})}const Qi={class:"home-shell"},nr={class:"home-aside","data-reveal":""},er={class:"profile-card"},tr={class:"profile-card__stats"},ar={class:"aside-links","aria-label":"站点其它内容"},or=["href"],sr={class:"aside-link__icon"},ir={id:"knowledge",class:"knowledge-section"},rr={class:"knowledge-list"},lr=["href"],cr={class:"knowledge-card__media"},dr=["src","alt"],ur={class:"knowledge-card__body"},pr={class:"knowledge-card__meta"},mr={key:0},hr=g({__name:"HomeKnowledgeLanding",setup(n){const e=C(null),t=Ki(),o=w(()=>t.reduce((l,r)=>l+r.count,0)),a=[{icon:"✦",title:"个人简介",desc:"关于我",link:"/column/personal"},{icon:"✎",title:"日记和随笔",desc:"生活记录",link:"/column/diary/"},{icon:"↗",title:"社交账号和邮箱",desc:`${Wi.length} 个入口`,link:"/column/media/"},{icon:"∞",title:"友情链接",desc:`${Ji.length} 个站点`,link:"/column/friends/"}];return Zi(e,{threshold:.08,rootMargin:"0px 0px -30px 0px"}),(l,r)=>(i(),p("main",{ref_key:"pageRef",ref:e,class:"blog-home"},[d("div",Qi,[d("aside",nr,[d("div",er,[r[2]||(r[2]=d("img",{src:bi,alt:"时针头像",class:"profile-card__avatar"},null,-1)),r[3]||(r[3]=d("span",{class:"profile-card__name"},"时针",-1)),r[4]||(r[4]=d("p",null,"机器学习 / 计算机视觉 / 深度学习方向，偶尔写日记和二创。",-1)),d("div",tr,[d("span",null,[d("strong",null,M(o.value),1),r[0]||(r[0]=tn(" 笔记",-1))]),d("span",null,[d("strong",null,M(c(t).length),1),r[1]||(r[1]=tn(" 分类",-1))])])]),d("nav",ar,[(i(),p(B,null,U(a,s=>d("a",{key:s.title,href:s.link,class:"aside-link"},[d("span",sr,M(s.icon),1),d("span",null,[d("strong",null,M(s.title),1),d("em",null,M(s.desc),1)])],8,or)),64))])]),d("section",ir,[r[6]||(r[6]=d("div",{class:"section-head","data-reveal":""},[d("span",{class:"section-kicker"},"Knowledge Base"),d("h2",null,"知识库"),d("p",null,"每个大文件夹对应一个学习方向。这里是首页主内容，按主题竖直展开。")],-1)),d("div",rr,[(i(!0),p(B,null,U(c(t),(s,u)=>(i(),p("a",{key:s.name,href:s.link,class:O(["knowledge-card",{"knowledge-card--reverse":u%2===1}]),style:mn({transitionDelay:`${Math.min(u*.05,.45)}s`}),"data-reveal":""},[d("div",cr,[d("img",{src:s.img,alt:s.title},null,8,dr)]),d("div",ur,[d("div",pr,[d("span",null,M(s.count)+" 篇笔记",1),s.subCount?(i(),p("span",mr,M(s.subCount)+" 个专题",1)):_("",!0)]),d("h3",null,M(s.title),1),d("p",null,M(s.details),1)]),r[5]||(r[5]=d("span",{class:"knowledge-card__arrow","aria-hidden":"true"},"→",-1))],14,lr))),128))])])])],512))}}),fr=x(hr,[["__scopeId","data-v-8c830384"]]);function vr(n,e=()=>!0){let t=!1;function o(){t||!e()||(t=!0,n())}function a(){o()}function l(s){(Math.abs(s.deltaY)>0||Math.abs(s.deltaX)>0)&&o()}function r(){o()}return X(()=>{window.addEventListener("click",a,!0),window.addEventListener("wheel",l,{passive:!0,capture:!0}),window.addEventListener("touchmove",r,{passive:!0,capture:!0})}),rn(()=>{window.removeEventListener("click",a,!0),window.removeEventListener("wheel",l,!0),window.removeEventListener("touchmove",r,!0)}),{trySkip:o}}const _r=g({__name:"HomeBubbleStarfield",props:{duration:{default:5e3}},emits:["progress","introComplete"],setup(n,{emit:e}){const t=n,o=e,a=["#ff6b6b","#4ecdc4","#ffe66d","#a29bfe","#60a5fa","#f472b6"],l=["#ffffff","#93bbfd","#fde68a","#a5f3fc","#f0abfc","#c4b5fd"],r=C();let s=null,u=0,v=!1,L=0,f=0,S=0,N=[],F=[],T=null,R=!1;function G(){return a[Math.floor(Math.random()*a.length)]}function W(){return l[Math.floor(Math.random()*l.length)]}function Z(){N=[];const V=f<=640?5:7;for(let y=0;y<V;y++){const P=70+Math.random()*130;N.push({x:Math.random()*f,y:Math.random()*S,radius:P,color:G(),alpha:.1+Math.random()*.12,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.18,phase:Math.random()*Math.PI*2})}}function cn(){F=[];const V=f<=640?130:200;for(let y=0;y<V;y++){const P=.5+Math.random()*2.2;F.push({x:Math.random()*f,y:Math.random()*S,radius:P,color:W(),twinkle:Math.random()*Math.PI*2,twinkleSpeed:.015+Math.random()*.028,vx:(Math.random()-.5)*.08,vy:(Math.random()-.5)*.06,glow:P>1.4&&Math.random()>.55})}}function dn(){T=new Image,T.src="/uzquneen.jpg"}function fn(){r.value&&(f=r.value.offsetWidth||window.innerWidth,S=r.value.offsetHeight||window.innerHeight,r.value.width=f,r.value.height=S,Z(),cn())}function k(V){return Math.min(1,(V-L)/t.duration)}function z(){if(!s)return;s.fillStyle="#060810",s.fillRect(0,0,f,S);const V=s.createRadialGradient(f*.35,S*.3,0,f*.5,S*.5,Math.max(f,S)*.55);V.addColorStop(0,"rgba(45, 27, 105, 0.35)"),V.addColorStop(.5,"rgba(26, 16, 53, 0.2)"),V.addColorStop(1,"rgba(6, 8, 16, 0)"),s.fillStyle=V,s.fillRect(0,0,f,S)}function E(V,y){if(!s||!(T!=null&&T.complete)||T.naturalWidth===0)return;const P=V*.001,j=f/2,K=S*.46,vn=Math.min(f,S)*(f<=640?.26:.22),pe=1+Math.sin(P*.8)*.035,q=vn*pe*(.85+y*.15),me=.92+Math.sin(P*1.2)*.04;s.save(),s.beginPath(),s.arc(j,K,q+14,0,Math.PI*2);const yn=s.createRadialGradient(j,K,q*.6,j,K,q+14);yn.addColorStop(0,"rgba(147, 187, 253, 0.15)"),yn.addColorStop(.6,"rgba(240, 171, 252, 0.08)"),yn.addColorStop(1,"rgba(147, 187, 253, 0)"),s.fillStyle=yn,s.fill(),s.beginPath(),s.arc(j,K,q,0,Math.PI*2),s.clip();const Un=Math.max(q*2/T.width,q*2/T.height)*1.15,Gn=T.width*Un,Dn=T.height*Un;s.globalAlpha=me,s.filter="brightness(0.55) saturate(1.1)",s.drawImage(T,j-Gn/2,K-Dn/2,Gn,Dn),s.filter="none",s.globalAlpha=1,s.restore(),s.save(),s.beginPath(),s.arc(j,K,q,0,Math.PI*2);const _n=s.createLinearGradient(j-q,K-q,j+q,K+q);_n.addColorStop(0,"rgba(255, 255, 255, 0.45)"),_n.addColorStop(.35,"rgba(147, 187, 253, 0.25)"),_n.addColorStop(.65,"rgba(240, 171, 252, 0.2)"),_n.addColorStop(1,"rgba(255, 255, 255, 0.35)"),s.strokeStyle=_n,s.lineWidth=2.5,s.stroke(),s.beginPath(),s.arc(j-q*.28,K-q*.32,q*.18,0,Math.PI*2),s.fillStyle="rgba(255, 255, 255, 0.12)",s.fill(),s.restore()}function I(V){if(s){for(const y of F){y.twinkle+=y.twinkleSpeed,y.x+=y.vx,y.y+=y.vy,y.x<-4&&(y.x=f+4),y.x>f+4&&(y.x=-4),y.y<-4&&(y.y=S+4),y.y>S+4&&(y.y=-4);const P=.38+Math.sin(y.twinkle)*.48;if(s.globalAlpha=P,s.fillStyle=y.color,s.beginPath(),s.arc(y.x,y.y,y.radius,0,Math.PI*2),s.fill(),y.glow&&(s.shadowColor=y.color,s.shadowBlur=y.radius*4,s.fill(),s.shadowBlur=0),y.radius>1.6&&P>.55){const j=y.radius*2.8;s.strokeStyle=`${y.color}${Math.floor(P*160).toString(16).padStart(2,"0")}`,s.lineWidth=.6,s.beginPath(),s.moveTo(y.x-j,y.y),s.lineTo(y.x+j,y.y),s.moveTo(y.x,y.y-j),s.lineTo(y.x,y.y+j),s.stroke()}}s.globalAlpha=1}}function H(V){if(!s)return;const y=V*.001;for(const P of N){P.x+=P.vx,P.y+=P.vy,P.phase+=.005,P.x<-P.radius&&(P.x=f+P.radius),P.x>f+P.radius&&(P.x=-P.radius),P.y<-P.radius&&(P.y=S+P.radius),P.y>S+P.radius&&(P.y=-P.radius);const j=P.alpha+Math.sin(P.phase+y)*.04,K=P.radius*(1+Math.sin(P.phase*.7)*.08),vn=s.createRadialGradient(P.x,P.y,0,P.x,P.y,K);vn.addColorStop(0,`${P.color}${Math.floor(j*255).toString(16).padStart(2,"0")}`),vn.addColorStop(.45,`${P.color}${Math.floor(j*.45*255).toString(16).padStart(2,"0")}`),vn.addColorStop(1,`${P.color}00`),s.fillStyle=vn,s.beginPath(),s.arc(P.x,P.y,K,0,Math.PI*2),s.fill(),s.strokeStyle=`rgba(255, 255, 255, ${j*.35})`,s.lineWidth=1.2,s.beginPath(),s.arc(P.x,P.y,K*.92,0,Math.PI*2),s.stroke()}}function Y(V){if(!s||!r.value)return;L===0&&(L=V);const y=k(V);o("progress",y),z(),I(),H(V),E(V,y),y>=1&&!R&&(R=!0,o("introComplete")),(y<1||!R)&&(u=requestAnimationFrame(Y))}function D(){R||v||(R=!0,o("progress",1),o("introComplete"))}function J(){o("progress",1),setTimeout(()=>o("introComplete"),300)}return vr(D,()=>!R&&!v),X(()=>{if(r.value){if(v=window.matchMedia("(prefers-reduced-motion: reduce)").matches,v){J();return}s=r.value.getContext("2d"),dn(),fn(),window.addEventListener("resize",fn),u=requestAnimationFrame(Y)}}),rn(()=>{cancelAnimationFrame(u),window.removeEventListener("resize",fn),N=[],F=[],T=null}),(V,y)=>(i(),p("canvas",{ref_key:"canvasRef",ref:r,class:"home-bubble-starfield","aria-hidden":"true"},null,512))}}),gr=x(_r,[["__scopeId","data-v-41583f21"]]),br=g({__name:"HomeIntroOverlay",setup(n){const e=C(!0);let t=0;const o=w(()=>{const s=a.value;return s<=.55?1:1-(s-.55)/.45}),a=C(0);function l(s){a.value=s,mi(s)}function r(){hi(),document.body.classList.remove("home-intro-active"),t=window.setTimeout(()=>{e.value=!1},400)}return X(()=>{pi(),document.body.classList.add("home-intro-active")}),rn(()=>{clearTimeout(t),document.body.classList.remove("home-intro-active")}),(s,u)=>e.value?(i(),p("div",{key:0,class:"home-intro-overlay",style:mn({opacity:o.value})},[b(gr,{onProgress:l,onIntroComplete:r})],4)):_("",!0)}}),yr=x(br,[["__scopeId","data-v-f80cff9c"]]),de="vp-fancy-effects",un=C(!0);function Wn(n){typeof document>"u"||document.documentElement.classList.toggle("fancy-effects-off",!n)}function $r(){if(typeof localStorage>"u")return!0;const n=localStorage.getItem(de);return n!=="0"}function xr(){X(()=>{un.value=$r(),Wn(un.value)});function n(){un.value=!un.value,Wn(un.value),typeof localStorage<"u"&&localStorage.setItem(de,un.value?"1":"0")}return{fancyEnabled:un,toggleFancy:n}}const kr=["aria-pressed","title"],Pr={class:"fancy-toggle__label fancy-toggle__label--full"},wr={class:"fancy-toggle__label fancy-toggle__label--short"},Sr=g({__name:"FancyEffectsToggle",setup(n){const{fancyEnabled:e,toggleFancy:t}=xr();return(o,a)=>{const l=ln("ClientOnly");return i(),$(l,null,{default:h(()=>[d("button",{type:"button",class:O(["fancy-toggle",{"fancy-toggle--on":c(e)}]),"aria-pressed":c(e),title:c(e)?"关闭流光边框等装饰效果":"开启流光边框等装饰效果",onClick:a[0]||(a[0]=(...r)=>c(t)&&c(t)(...r))},[a[1]||(a[1]=d("span",{class:"fancy-toggle__icon","aria-hidden":"true"},"✦",-1)),d("span",Pr,M(c(e)?"花里胡哨开":"花里胡哨关"),1),d("span",wr,M(c(e)?"花哨开":"花哨关"),1)],10,kr)]),_:1})}}}),Lr=x(Sr,[["__scopeId","data-v-2e757ba2"]]);let ue=!1;function Cr(){return typeof window>"u"||ue?!1:!window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Ar(){ue=!0}const Mr={class:"nav-fancy-slot"},Tr=g({__name:"Layout",setup(n){const{Layout:e}=ce,t=gn(),o=C(0),a=C(!1),l=w(()=>t.path==="/"||t.path==="/index.html");return en(l,r=>{if(!r){a.value=!1;return}typeof window>"u"||Cr()&&(Ar(),o.value++,a.value=!0)},{immediate:!0}),(r,s)=>(i(),$(c(e),null,{"home-hero-before":h(()=>[b(gi)]),"home-features-after":h(()=>[b(fr)]),"nav-bar-content-after":h(()=>[d("div",Mr,[b(Lr)])]),"layout-bottom":h(()=>[a.value?(i(),$(yr,{key:o.value})):_("",!0),b(di)]),_:1}))}}),Nr={extends:ce,Layout:Tr};export{Nr as R,Zi as a,Ji as f,Ki as g,Wi as s,vr as u};
