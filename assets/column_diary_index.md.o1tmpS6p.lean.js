import{n as F,ac as G,D as R,G as U,I as i,e as J,l as B,b as K,ag as X,g as o,ai as Q,d as n,aj as V,W as p,f as _,F as N,O as L,T as Z,c as M,_ as W,k as j,ah as tt,ab as et,x as z,y as nt,N as T}from"./chunks/framework.YqoK2ckR.js";import{a as st}from"./chunks/theme.DJv1XkiU.js";const at=`---
date: 2026-04-28
mood: 🤯
tags:
  - 论文
  - 吐槽
img: /mary.jpg
---

一个普通的周末，读了几篇关于计算机视觉的论文。

草泥马，怎么还有这么多东西要学。`,it=`---
date: 2026-05-24
title: 网站改版记
mood: ✨
tags:
  - 网站
img: /aru.png
---

今天给个人网站做了一次首页重构，把 Hero 区块、动效，布局全部换了一版。

希望接下来能在这里记录更多学习与生活。`,ot=`---
date: 2026-05-30
mood: 💳
tags:
  - 生活
---

昨天去招商银行办理了万事达借记卡，结果发现还是订阅不了国外的AI服务

openrouter也限制了地区，也不知道在哪里改http/1.0,只能用继续用cursor调opus和gpt了。

但我开了个X Premium`,lt=`---
date: 2026-06-16
title: 网站改版记
mood: 🤯
tags:
  - vibecoding
---

不是，这GPT5.5到底是谁在用啊，怎么这么贵

改前端样式还得用便宜模型，不然真的......`,rt=`# 日记和随笔 · 内容维护指南

本目录是「日记和随笔」页面的**唯一数据源**。

所有日记都以独立的 Markdown 文件形式存在，与知识库（\`docs/notes/\`）的维护方式完全一致。

## 支持子文件夹组织（强烈推荐）

你**可以自由创建子文件夹**来管理日记，例如：

- \`entries/2026/06/\` （按年月）
- \`entries/life/\` / \`entries/tech/\` （按主题）
- \`entries/2026/travel/\` （混合使用）

**系统会递归自动发现所有子文件夹中的 \`.md\` 文件**，无需任何额外配置。

所有日记最终仍然会**按 \`date\` 字段全局倒序排列**（与文件夹结构无关），展示效果和原来完全一致。

## 如何添加一篇新日记

1. 在本目录（或任意子文件夹）下新建文件，推荐命名：\`YYYY-MM-DD.md\` 或 \`YYYY-MM-DD-简短描述.md\`（例如 \`2026-06-15.md\`）
2. 复制以下模板并填写：

\`\`\`md
---
date: 2026-06-15          # 必填，格式 YYYY-MM-DD
title: 今天做了什么       # 推荐填写
mood: ✨                   # 可选心情 emoji
tags:                      # 可选标签（用于筛选）
  - 生活
  - 思考
img: /cover.jpg            # 可选封面图（放在 docs/public/）
---

在这里写正文内容。

支持完整的 Markdown 语法，包括：
- 标题、列表、表格、代码块
- 图片、链接
- 甚至数学公式（如果站点开启了 math 支持）
\`\`\`

3. 保存即可。系统会递归扫描 \`entries/\` 下所有子文件夹中的 Markdown 文件，并按 \`date\` 全局倒序展示。

## Frontmatter 字段说明

| 字段    | 必填 | 说明                                      | 示例                  |
|---------|------|-------------------------------------------|-----------------------|
| date    | 是   | 日期（排序和筛选依据）                    | \`2026-06-15\`          |
| title   | 否   | 标题                                      | \`网站改版记\`          |
| mood    | 否   | 心情 emoji（会显示在日期旁边）            | \`✨\` / \`🤯\` / \`💳\`    |
| tags    | 否   | 标签数组，用于页面筛选                    | \`['生活', '吐槽']\`    |
| img     | 否   | 封面图路径（相对于 \`docs/public\`）        | \`/aru.png\`            |

## 最佳实践 & 注意事项

- **子文件夹**：强烈建议使用子文件夹按月份、主题、标签等方式组织。系统会自动递归发现所有文件。
- **文件命名**：即使放在子文件夹中，也推荐保持 \`YYYY-MM-DD.md\` 或 \`YYYY-MM-DD-slug.md\` 的命名，便于查看和 git 历史追溯。
- **图片**：统一放在 \`docs/public/\` 目录，然后用 \`/文件名\` 引用。
- **日期**：请保持准确，这是排序和年份筛选的核心字段（不受所在文件夹影响）。
- **内容长度**：支持短笔记，也支持较长的随笔（可使用二级标题分段）。
- **版本控制**：直接 git 提交 \`.md\` 文件即可，历史清晰。
- **删除/修改**：直接操作对应文件即可，页面会自动更新。

---

这个设计让「日记和随笔」系统具备了与知识库同等的可维护性和专业性，也方便其他人 fork 这个模板后愉快地使用。
`,P=Object.assign({"../../column/diary/entries/2026-04-28.md":at,"../../column/diary/entries/2026-05-24.md":it,"../../column/diary/entries/2026-05-30.md":ot,"../../column/diary/entries/2026-6-16.md":lt,"../../column/diary/entries/README.md":rt});function dt(r){const y=r.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);if(!y)return{frontmatter:{},content:r.trim()};const[,a,d]=y,f={},$=a.split(`
`);for(let w=0;w<$.length;w++){let m=$[w].trim();if(!m||m.startsWith("#"))continue;const c=m.indexOf(":");if(c===-1)continue;const Y=m.slice(0,c).trim();let v=m.slice(c+1).trim();if(v.startsWith("[")&&v.endsWith("]")){const b=v.slice(1,-1).split(",").map(k=>k.trim().replace(/^['"]|['"]$/g,"")).filter(Boolean);f[Y]=b;continue}if(v===""||v==="[]"){const b=[];let k=w+1;for(;k<$.length;){const S=$[k].trim();if(S.startsWith("- ")){const C=S.slice(2).trim().replace(/^['"]|['"]$/g,"");C&&b.push(C),k++}else if(S==="")k++;else break}if(b.length>0){f[Y]=b,w=k-1;continue}}f[Y]=v.replace(/^['"]|['"]$/g,"")}return{frontmatter:f,content:d.trim()}}function ct(){const r=[];for(const y in P){const a=P[y],{frontmatter:d,content:f}=dt(a);d.date&&r.push({date:d.date,title:d.title,img:d.img,content:f,tags:Array.isArray(d.tags)?d.tags:void 0,mood:d.mood})}return r.sort((y,a)=>a.date.localeCompare(y.date))}const ut={class:"entry-modal__header"},mt={class:"entry-modal__meta"},_t={class:"entry-modal__date"},yt={key:0,class:"entry-modal__mood","aria-hidden":"true"},vt={key:0,class:"entry-modal__media"},ht={class:"entry-modal__img-box"},gt=["src","alt"],ft={key:1,class:"entry-modal__title"},pt=["innerHTML"],bt={key:2,class:"entry-modal__tags"},kt={class:"entry-modal__footer"},$t={class:"entry-modal__nav"},wt=["disabled"],Ct=["disabled"],xt=F({__name:"EntryModal",props:{visible:{type:Boolean},entry:{},entries:{}},emits:["update:visible","navigate"],setup(r,{emit:y}){const a=r,d=y;function f(l){const[h,x,g]=l.split("-");return`${h} 年 ${Number(x)} 月 ${Number(g)} 日`}const $=M(()=>a.entry?a.entry.content.split(`
`).map(l=>l.trim()?`<p>${w(l)}</p>`:"<br>").join(""):"");function w(l){return l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const m=M(()=>!a.entry||!a.entries.length?-1:a.entries.findIndex(l=>l.date===a.entry.date&&l.content===a.entry.content)),c=M(()=>m.value>0),Y=M(()=>m.value>=0&&m.value<a.entries.length-1);function v(){d("update:visible",!1)}async function b(){if(!a.entry)return;const l=`${f(a.entry.date)}
${a.entry.title?a.entry.title+`
`:""}${a.entry.content}`;try{await navigator.clipboard.writeText(l);const h=document.querySelectorAll(".entry-modal__btn"),x=new Map;h.forEach(g=>{var s;(s=g.textContent)!=null&&s.includes("复制")&&(x.set(g,g.textContent),g.textContent="✓ 已复制",setTimeout(()=>{g&&x.has(g)&&(g.textContent=x.get(g)||"📋 复制全文")},1400))})}catch{alert("复制失败，请手动选择文本复制")}}function k(){const l=m.value;l>0&&d("navigate",a.entries[l-1])}function S(){const l=m.value;l>=0&&l<a.entries.length-1&&d("navigate",a.entries[l+1])}let C=null;function A(){document.body.style.overflow="hidden",document.body.classList.add("entry-modal-open")}function E(){document.body.style.overflow="",document.body.classList.remove("entry-modal-open")}return G(()=>a.visible,l=>{l?(A(),setTimeout(()=>{const h=document.querySelector(".entry-modal__panel");h==null||h.focus()},50)):E()}),R(()=>{C=l=>{l.key==="Escape"&&a.visible&&v()},window.addEventListener("keydown",C)}),U(()=>{C&&window.removeEventListener("keydown",C),E()}),(l,h)=>(i(),J(Z,{to:"body"},[B(K,{name:"modal"},{default:X(()=>[r.visible&&r.entry?(i(),o("div",{key:0,class:"entry-modal",onKeydown:Q(v,["esc"]),tabindex:"-1"},[n("div",{class:"entry-modal__backdrop",onClick:v}),n("div",{class:"entry-modal__panel",onClick:h[0]||(h[0]=V(()=>{},["stop"]))},[n("div",ut,[n("div",mt,[n("span",_t,p(f(r.entry.date)),1),r.entry.mood?(i(),o("span",yt,p(r.entry.mood),1)):_("",!0)]),n("button",{class:"entry-modal__close",onClick:v,"aria-label":"关闭详情"}," ✕ ")]),r.entry.img?(i(),o("div",vt,[n("div",ht,[n("img",{src:r.entry.img,alt:r.entry.title||"日记配图"},null,8,gt),h[1]||(h[1]=n("div",{class:"entry-modal__shine","aria-hidden":"true"},null,-1))])])):_("",!0),r.entry.title?(i(),o("h2",ft,p(r.entry.title),1)):_("",!0),n("div",{class:"entry-modal__content",innerHTML:$.value},null,8,pt),r.entry.tags&&r.entry.tags.length?(i(),o("div",bt,[(i(!0),o(N,null,L(r.entry.tags,x=>(i(),o("span",{key:x,class:"entry-modal__tag"}," #"+p(x),1))),128))])):_("",!0),n("div",kt,[n("button",{class:"entry-modal__btn",onClick:b}," 📋 复制全文 "),n("div",$t,[n("button",{class:"entry-modal__btn entry-modal__btn--nav",disabled:!c.value,onClick:k}," ← 上一篇 ",8,wt),n("button",{class:"entry-modal__btn entry-modal__btn--nav",disabled:!Y.value,onClick:S}," 下一篇 → ",8,Ct)]),n("button",{class:"entry-modal__btn entry-modal__btn--ghost",onClick:v}," 关闭 ")])])],32)):_("",!0)]),_:1})]))}}),Mt=W(xt,[["__scopeId","data-v-ac9f4eda"]]),Yt={class:"diary-page"},St={class:"diary-toolbar"},Dt={class:"diary-stats"},Tt={key:0},Et={key:1,class:"diary-stats__hint"},Nt={class:"diary-controls"},Lt={class:"diary-search"},jt=["disabled"],At={key:0,class:"diary-filter-group"},It={class:"diary-chips"},zt=["onClick"],Bt={key:1,class:"diary-filter-group"},Ot={class:"diary-chips diary-chips--tags"},Pt=["onClick"],Ft={key:0,class:"diary-empty"},Rt=["data-diary-date"],Vt={class:"diary-item__main"},Wt={class:"diary-item__date-row"},Ht=["datetime"],qt=["title"],Gt=["onClick"],Ut={class:"diary-item__img-box"},Jt=["src","alt"],Kt=["onClick"],Xt={key:0,class:"diary-item__title"},Qt={class:"diary-item__content"},Zt={class:"diary-item__meta"},te={key:0,class:"diary-item__tags"},ee=["onClick"],ne={key:0,class:"diary-end"},se=F({__name:"DiaryGrid",setup(r){const y=T(""),a=T(new Set),d=T(new Set),f=T(!1),$=T(null),w=T([]),m=M(()=>[...w.value].sort((s,t)=>t.date.localeCompare(s.date))),c=M(()=>{const s=y.value.trim().toLowerCase(),t=a.value,e=d.value;return m.value.filter(u=>{const D=!s||u.title&&u.title.toLowerCase().includes(s)||u.content.toLowerCase().includes(s)||u.tags&&u.tags.some(I=>I.toLowerCase().includes(s)),O=u.date.slice(0,4),H=t.size===0||t.has(O),q=e.size===0||u.tags&&Array.from(e).every(I=>u.tags.includes(I));return D&&H&&q})}),Y=M(()=>{const s=new Set;return m.value.forEach(t=>s.add(t.date.slice(0,4))),Array.from(s)}),v=M(()=>{const s=new Map;return m.value.forEach(t=>{var e;(e=t.tags)==null||e.forEach(u=>{s.set(u,(s.get(u)||0)+1)})}),Array.from(s.entries()).sort((t,e)=>e[1]-t[1]).map(([t])=>t)}),b=M(()=>{const s=new Set(c.value.map(t=>t.date.slice(0,4)));return{count:c.value.length,yearSpan:s.size}});function k(s){const t=a.value;t.has(s)?t.delete(s):t.add(s),a.value=new Set(t)}function S(s){const t=d.value;t.has(s)?t.delete(s):t.add(s),d.value=new Set(t)}function C(){y.value="",a.value=new Set,d.value=new Set}function A(){if(c.value.length===0)return;const s=Math.floor(Math.random()*c.value.length);E(c.value[s])}function E(s){$.value=s,f.value=!0}function l(s){const t=c.value.find(u=>u.date.startsWith(s));if(!t)return;const e=document.querySelector(`[data-diary-date="${t.date}"]`);e&&(e.scrollIntoView({behavior:"smooth",block:"center"}),e.classList.add("diary-item--highlight"),setTimeout(()=>e.classList.remove("diary-item--highlight"),1400))}function h(s){$.value=s}function x(s){const[t,e,u]=s.split("-");return`${t} 年 ${Number(e)} 月 ${Number(u)} 日`}const g=T(null);return R(()=>{w.value=ct(),g.value}),st(g),(s,t)=>(i(),o("div",Yt,[n("div",St,[n("div",Dt,[t[5]||(t[5]=j(" 共 ",-1)),n("strong",null,p(b.value.count),1),t[6]||(t[6]=j(" 篇 ",-1)),b.value.yearSpan>0?(i(),o("span",Tt,[t[3]||(t[3]=j("· 跨越 ",-1)),n("strong",null,p(b.value.yearSpan),1),t[4]||(t[4]=j(" 个年份",-1))])):_("",!0),c.value.length!==m.value.length?(i(),o("span",Et," （已筛选） ")):_("",!0)]),n("div",Nt,[n("div",Lt,[tt(n("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>y.value=e),type:"text",placeholder:"搜索标题、正文或标签...","aria-label":"搜索日记"},null,512),[[et,y.value]])]),y.value||a.value.size||d.value.size?(i(),o("button",{key:0,class:"diary-btn diary-btn--ghost",onClick:C}," 清除筛选 ")):_("",!0),n("button",{class:"diary-btn diary-btn--accent",onClick:A,disabled:c.value.length===0}," 🎲 随机翻开 ",8,jt)]),Y.value.length>1?(i(),o("div",At,[t[7]||(t[7]=n("span",{class:"diary-filter-label"},"年份",-1)),n("div",It,[(i(!0),o(N,null,L(Y.value,e=>(i(),o("button",{key:e,class:z(["diary-chip",{"diary-chip--active":a.value.has(e)}]),onClick:u=>k(e)},p(e),11,zt))),128)),a.value.size?(i(),o("button",{key:0,class:"diary-chip diary-chip--jump",onClick:t[1]||(t[1]=e=>l(Array.from(a.value)[0]))}," 跳转 ")):_("",!0)])])):_("",!0),v.value.length?(i(),o("div",Bt,[t[8]||(t[8]=n("span",{class:"diary-filter-label"},"标签",-1)),n("div",Ot,[(i(!0),o(N,null,L(v.value,e=>(i(),o("button",{key:e,class:z(["diary-chip diary-chip--tag",{"diary-chip--active":d.value.has(e)}]),onClick:u=>S(e)}," #"+p(e),11,Pt))),128))])])):_("",!0)]),c.value.length===0?(i(),o("div",Ft,[t[9]||(t[9]=n("p",null,"没有找到匹配的日记…",-1)),n("button",{class:"diary-btn diary-btn--ghost",onClick:C},"清除所有筛选")])):_("",!0),n("div",{ref_key:"timelineRef",ref:g,class:z(["diary-timeline",{"diary-timeline--filtered":c.value.length!==m.value.length}])},[(i(!0),o(N,null,L(c.value,(e,u)=>(i(),o("article",{key:e.date+(e.title??""),class:"diary-item","data-diary-date":e.date,style:nt({animationDelay:`${Math.min(u*.09,.6)}s`}),"data-reveal":""},[t[13]||(t[13]=n("span",{class:"diary-item__dot","aria-hidden":"true"},null,-1)),n("div",Vt,[n("div",Wt,[n("time",{class:"diary-item__date",datetime:e.date},p(x(e.date)),9,Ht),e.mood?(i(),o("span",{key:0,class:"diary-item__mood-indicator",title:`心情：${e.mood}`},p(e.mood),9,qt)):_("",!0),t[10]||(t[10]=n("span",{class:"diary-item__stamp","aria-hidden":"true"},"JOURNAL",-1))]),e.img?(i(),o("div",{key:0,class:"diary-item__media",onClick:D=>E(e)},[n("div",Ut,[n("img",{src:e.img,alt:e.title??"日记配图",class:"diary-item__img"},null,8,Jt),t[11]||(t[11]=n("div",{class:"diary-item__shine","aria-hidden":"true"},null,-1))])],8,Gt)):_("",!0),n("div",{class:"diary-item__card",onClick:D=>E(e)},[e.title?(i(),o("h3",Xt,p(e.title),1)):_("",!0),n("p",Qt,p(e.content),1),n("div",Zt,[e.tags&&e.tags.length?(i(),o("div",te,[(i(!0),o(N,null,L(e.tags,D=>(i(),o("span",{key:D,class:"diary-item__tag",onClick:V(O=>S(D),["stop"])}," #"+p(D),9,ee))),128))])):_("",!0),t[12]||(t[12]=n("span",{class:"diary-item__readmore"},"阅读全文 →",-1))])],8,Kt)])],12,Rt))),128)),c.value.length>0?(i(),o("div",ne,[...t[14]||(t[14]=[n("span",null,"—— 记录仍在继续 ——",-1)])])):_("",!0)],2),B(Mt,{visible:f.value,"onUpdate:visible":t[2]||(t[2]=e=>f.value=e),entry:$.value,entries:c.value,onNavigate:h},null,8,["visible","entry","entries"])]))}}),ae=W(se,[["__scopeId","data-v-2ded268b"]]),re=JSON.parse('{"title":"日记和随笔","description":"","frontmatter":{"title":"日记和随笔","outline":false},"headers":[],"relativePath":"column/diary/index.md","filePath":"column/diary/index.md"}'),ie={name:"column/diary/index.md"},de=Object.assign(ie,{setup(r){return(y,a)=>(i(),o("div",null,[B(ae)]))}});export{re as __pageData,de as default};
