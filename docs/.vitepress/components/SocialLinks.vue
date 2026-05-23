<template>
  <div class="social-links">
    <div
      v-for="(item, i) in links"
      :key="item.name"
      class="social-card"
      :style="{ animationDelay: `${i * 0.12}s` }"
    >
      <a :href="item.url" target="_blank" rel="noopener noreferrer">
        <div class="card-icon">{{ item.icon }}</div>
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
// 1. 在下方 links 数组中复制一行 { ... },
// 2. icon:      用 emoji 作为图标 (按 Win+. 打开表情面板挑选)
// 3. name:      平台名称 (如 GitHub / Bilibili / 邮箱 / Twitter)
// 4. url:       完整链接 (必须以 https:// 开头)
// 5. displayUrl:可选，显示简化的链接文本 (如 github.com/xxx)
//               不填则直接显示 url
// 6. desc:      简短描述 (不超过 15 个字，用于卡片副标题)
// 7. 想删除某个链接？直接删掉对应的 { ... }, 行即可
// 8. 想调整排序？在数组里上下拖动对应的 { ... }, 行
// ============================================
const links = [
  {
    icon: '🌐',
    name: 'GitHub',
    url: 'https://github.com/evilmordy',
    displayUrl: 'github.com/evilmordy',
    desc: '代码仓库与开源项目',
  },
  {
    icon: '📺',
    name: 'Bilibili',
    url: 'https://space.bilibili.com/3546701528828459',
    displayUrl: 'bilibili.com/@时针同学',
    desc: '视频与技术分享',
  },
  {
    icon: '📧',
    name: '邮箱',
    url: 'mailto:evilmordy@example.com',
    displayUrl: 'evilmordy@example.com',
    desc: '欢迎随时联系我',
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

/* ========== 图标 ========== */
.card-icon {
  font-size: 2.4rem;
  line-height: 1;
  flex-shrink: 0;
  width: 56px;
  height: 56px;
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
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========== 响应式 ========== */
@media (max-width: 480px) {
  .social-links {
    grid-template-columns: 1fr;
  }
  .social-card a {
    padding: 16px 18px;
    gap: 12px;
  }
  .card-icon {
    font-size: 2rem;
    width: 46px;
    height: 46px;
    border-radius: 12px;
  }
  .card-name {
    font-size: 0.98rem;
  }
}
</style>
