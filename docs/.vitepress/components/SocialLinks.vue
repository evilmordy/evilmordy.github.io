<template>
  <div class="social-links">
    <div
      v-for="(item, i) in links"
      :key="item.name"
      class="social-card"
      :style="{ animationDelay: `${i * 0.12}s` }"
    >
      <a :href="item.url" target="_blank" rel="noopener noreferrer">
        <div class="card-icon">
          <img :src="item.icon" :alt="item.name" />
        </div>
        <div class="card-body">
          <span class="card-name">{{ item.name }}</span>
          <span class="card-url">{{ item.displayUrl || item.url }}</span>
          <span class="card-desc">{{ item.desc }}</span>
        </div>
        <div class="card-arrow">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
// ============================================
// 🔧 如何修改社交链接
// ============================================
// 1. 把 SVG 图标放到 docs/public/ 目录下
//    （SVG 可从 https://simpleicons.org 下载，或 iconfont.cn 搜索）
// 2. 在下方 links 数组中复制一行 { ... },
// 3. icon:      图标路径，相对于 public/，如 '/github.svg'
// 4. name:      显示的平台名称
// 5. url:       完整链接 (https:// 或 mailto: 开头)
// 6. displayUrl:可选，显示简化的链接文本
//               不填则直接显示 url
// 7. desc:      简短描述 (不超过 15 字)
// 8. 想删除 → 删掉对应 { ... }, 即可
// 9. 想调整排序 → 在数组里上下拖动对象
// ============================================
const links = [
  {
    icon: '/github.svg',
    name: 'GitHub',
    url: 'https://github.com/evilmordy',
    displayUrl: 'github.com/evilmordy',
    desc: '代码仓库与开源项目',
  },
  {
    icon: '/bilibili.svg',
    name: 'Bilibili',
    url: 'https://space.bilibili.com/3546701528828459',
    displayUrl: 'loveryou-',
    desc: '视频与分享',
  },
  {
    icon: '/推特.svg',
    name: 'Twitter/X',
    url: 'https://x.com/pysimpom',
    displayUrl: 'x.com/pysimpom',
    desc: '来关注我的推特',
  },
  {
    icon: '/threads.svg',
    name: 'Threads',
    url: 'https://www.threads.net/@pysimpom',
    displayUrl: 'threads.net/@pysimpom',
    desc: '文字 & 生活',
  },
  {
    icon: '/邮箱.svg',
    name: 'QQ邮箱',
    url: 'mailto:1119864217@qq.com',
    displayUrl: '1119864217@qq.com',
    desc: '欢迎随时联系我',
  },
  {
    icon: '/工作邮箱.svg',
    name: '工作邮箱',
    url: 'mailto:3999485702@qq.com',
    displayUrl: '3999485702@qq.com',
    desc: '聊正事的',
  },
]
</script>

<style scoped>
.social-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
  padding: 8px 0;
}

.social-card {
  animation: fadeInUp 0.6s ease both;
  opacity: 0;
}

/* ========== 卡片主体 ========== */
.social-card a {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

/* 悬浮光效 */
.social-card a::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.15),
    rgba(147, 51, 234, 0.1)
  );
  opacity: 0;
  transition: opacity 0.3s;
}

.social-card a:hover::before {
  opacity: 1;
}

.social-card a:hover {
  transform: translateY(-4px);
  border-color: rgba(96, 165, 250, 0.4);
  box-shadow:
    0 8px 32px rgba(59, 130, 246, 0.2),
    0 2px 8px rgba(59, 130, 246, 0.1);
}

/* ========== 图标容器 ========== */
.card-icon {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.15),
    rgba(147, 51, 234, 0.1)
  );
  transition: transform 0.3s;
  padding: 12px;
  box-sizing: border-box;
}

.card-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.social-card a:hover .card-icon {
  transform: scale(1.12);
}

/* ========== 文字内容 ========== */
.card-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.card-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.card-url {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.8;
}

.card-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  opacity: 0.7;
  margin-top: 2px;
}

/* ========== 箭头 ========== */
.card-arrow {
  color: var(--vp-c-text-3);
  opacity: 0.4;
  transition: all 0.3s;
  flex-shrink: 0;
}

.social-card a:hover .card-arrow {
  opacity: 1;
  color: var(--vp-c-brand-1);
  transform: translateX(4px);
}

/* ========== 动画 ========== */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ========== 响应式 ========== */
@media (max-width: 480px) {
  .social-links { grid-template-columns: 1fr; }
  .social-card a { padding: 16px 18px; gap: 12px; }
  .card-icon { width: 46px; height: 46px; border-radius: 12px; padding: 10px; }
  .card-name { font-size: 0.98rem; }
}
</style>
