<template>
  <div class="personal-bio">
    <!--
      ============================================
      🔧 模块渲染 — 根据 sections 数组中每个对象的 type 自动渲染
      想新增模块类型？在下面添加 v-else-if 分支即可
      ============================================
    -->
    <section
      v-for="(section, i) in sections"
      :key="i"
      :class="['bio-section', `bio-section--${section.type}`]"
      :style="{ animationDelay: `${i * 0.1}s` }"
    >
      <!-- ============================================
           hero — 顶部头像区
           ============================================ -->
      <div v-if="section.type === 'hero'" class="hero-block">
        <div class="hero-avatar-ring">
          <img class="hero-avatar-img" :src="section.icon" :alt="section.name" />
        </div>
        <h1 class="hero-name">{{ section.name }}</h1>
        <p class="hero-bio">{{ section.bio }}</p>
      </div>

      <!-- ============================================
           text — 段落文字
           ============================================ -->
      <div v-else-if="section.type === 'text'" class="text-block">
        <h2 class="section-title" v-if="section.title">{{ section.title }}</h2>
        <div class="text-content" v-html="section.content"></div>
      </div>

      <!-- ============================================
           tags — 技能标签云
           ============================================ -->
      <div v-else-if="section.type === 'tags'" class="tags-block">
        <h2 class="section-title" v-if="section.title">{{ section.title }}</h2>
        <div class="tags-cloud">
          <span
            v-for="item in section.items"
            :key="typeof item === 'string' ? item : item.name"
            class="tag-pill"
            :class="`tag-pill--${getTagColor(item, i2)}`"
            :style="{ animationDelay: `${i2 * 0.05}s` }"
          >
            {{ typeof item === 'string' ? item : item.name }}
          </span>
        </div>
      </div>

      <!-- ============================================
           cards — 卡片网格（适合展示书籍、项目、证书等）
           ============================================ -->
      <div v-else-if="section.type === 'cards'" class="cards-block">
        <h2 class="section-title" v-if="section.title">{{ section.title }}</h2>
        <div class="cards-grid">
          <div
            v-for="(item, i2) in section.items"
            :key="item.name"
            class="info-card"
            :style="{ animationDelay: `${i2 * 0.08}s` }"
          >
            <div class="info-card-icon">{{ item.icon }}</div>
            <span class="info-card-name">{{ item.name }}</span>
            <span class="info-card-desc" v-if="item.desc">{{ item.desc }}</span>
          </div>
        </div>
      </div>

      <!-- ============================================
           timeline — 时间线（适合展示教育经历、工作经历）
           ============================================ -->
      <div v-else-if="section.type === 'timeline'" class="timeline-block">
        <h2 class="section-title" v-if="section.title">{{ section.title }}</h2>
        <div class="timeline">
          <div
            v-for="(item, i2) in section.items"
            :key="item.year + item.title"
            class="timeline-item"
            :class="{ 'timeline-item--left': i2 % 2 === 0 }"
            :style="{ animationDelay: `${i2 * 0.1}s` }"
          >
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <span class="timeline-year">{{ item.year }}</span>
              <span class="timeline-title">{{ item.title }}</span>
              <span class="timeline-desc" v-if="item.desc">{{ item.desc }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ============================================
           stats — 统计数据
           ============================================ -->
      <div v-else-if="section.type === 'stats'" class="stats-block">
        <h2 class="section-title" v-if="section.title">{{ section.title }}</h2>
        <div class="stats-grid">
          <div
            v-for="(item, i2) in section.items"
            :key="item.label"
            class="stat-card"
            :style="{ animationDelay: `${i2 * 0.08}s` }"
          >
            <span class="stat-value">{{ item.value }}</span>
            <span class="stat-label">{{ item.label }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// ============================================
// 🎨 调色板 — 标签颜色池（标签云用，可自行扩展）
// ============================================
const TAG_COLORS = ['blue', 'green', 'purple', 'orange', 'pink', 'teal', 'red', 'indigo']
// 如果某项没写 color，就用名字长度取模自动分配颜色，保证同一项颜色不变
function getTagColor(item, index) {
  if (typeof item === 'object' && item.color && TAG_COLORS.includes(item.color)) {
    return item.color
  }
  const name = typeof item === 'string' ? item : item.name
  return TAG_COLORS[name.length % TAG_COLORS.length]
}

// ============================================
// 🔧 如何自定义各模块（按需修改即可，核心数据都在这个 sections 数组里）
// ============================================
//
// 【hero - 顶部头像区】
//   { type: 'hero', icon: '表情/图片URL', name: '你的名字', bio: '一句话介绍自己' }
//
// 【text - 段落文字】
//   { type: 'text', title: '模块标题(可选)', content: '文字内容，支持 <strong>加粗</strong>、<br/>换行 等HTML' }
//
// 【tags - 技能标签】
//   { type: 'tags', title: '模块标题(可选)',
//     items: [
//       "标签名",                           // 自动随机配色
//       { name: "标签名", color: "blue" },   // 指定颜色：blue|green|purple|orange|pink|teal|red|indigo
//     ]
//   }
//
// 【cards - 卡片列表】
//   { type: 'cards', title: '模块标题(可选)',
//     items: [
//       { icon: '📖', name: '卡名', desc: '描述(可选)' },
//     ]
//   }
//
// 【timeline - 时间线】
//   { type: 'timeline', title: '模块标题(可选)',
//     items: [
//       { year: '2024-至今', title: '标题', desc: '描述(可选)' },
//     ]
//   }
//
// 【stats - 统计数据】
//   { type: 'stats', title: '模块标题(可选)',
//     items: [
//       { label: '标签', value: '数值或文字' },
//     ]
//   }
//
// ════════════════════════════════════════
// 🔧 快捷操作：
//   添加模块 → 复制一个 { ... }, 对象到 sections 数组
//   删除模块 → 删掉对应的 { ... }, 对象
//   调整顺序 → 在数组里上下拖动对象
//   修改内容 → 改对应字段的值即可
// ════════════════════════════════════════
const sections = [
  // ===========================
  // ① 头像 & 姓名
  // ===========================
  {
    type: 'hero',
    icon: '/头像.png',
    name: '宋宇超(时针)',
    bio: '战斗的意义不是憎恨！今后也请多多关照。',
  },

  // ===========================
  // ② 个人简介
  // ===========================
  {
    type: 'text',
    title: '👋 关于我',
    content: '我是不会做题的做题蛆，专注于<strong>机器学习、计算机视觉与深度学习</strong>方向，业余时间捣鼓课外的东西，偶尔在 B 站分享技术内容,艺术内容以及BA二创。',
  },

  // ===========================
  // ③ 教育背景（时间线）
  // ===========================
  {
    type: 'timeline',
    title: '🎓 教育背景',
    items: [
      { year: '2024-至今', title: '南京航空航天大学', desc: '航空航天大类 · 本科 ' },
      { year: '2020-2024', title: '樟树中学', desc: '高中' },
    ],
  },

  // ===========================
  // ④ 技能标签
  // ===========================
  {
    type: 'tags',
    title: '🛠 技术栈',
    items: [
      { name: 'Python', color: 'blue' },
      { name: 'PyTorch', color: 'orange' },
      { name: 'TensorFlow', color: 'teal' },
      { name: 'OpenCV', color: 'green' },
      { name: 'Git', color: 'orange' },
      { name: 'Linux', color: 'purple' },
      { name: 'Scikit-learn', color: 'teal' },
      { name: 'Pandas', color: 'indigo' },
      { name: 'NumPy', color: 'blue' },
      { name: 'Vue.js', color: 'green' },
      { name: 'TypeScript', color: 'blue' },
      { name: 'Markdown', color: 'purple' },
      { name: 'LaTeX', color: 'red' },
    ],
  },

  // ===========================
  // ⑤ 喜欢的书（卡片）
  // ===========================
  {
    type: 'cards',
    title: '📚 推荐书单',
    items: [
      { icon: '📙', name: '《不能称受的生命之轻》', desc: '米兰昆德拉' },
      { icon: '📘', name: '《一百个中国孩子的梦》', desc: '董宏猷 - 儿童文学的巅峰' },
      { icon: '📗', name: '《腰门》', desc: '彭学军' },
      { icon: '📕', name: '《我还能看到多少次满月升起》', desc: '坂本龙一' },
    ],
  },

  // ===========================
  // ⑥ 统计数据
  // ===========================
  {
    type: 'stats',
    title: '📊 数据一览',
    items: [
      { label: '仓库', value: '10' },
      { label: 'B 站粉丝', value: '200+' },
    ],
  },
]
</script>

<style scoped>
/* ============================================
   全局：模块容器
   ============================================ */
.personal-bio {
  max-width: 880px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.bio-section {
  animation: fadeInUp 0.6s ease both;
  opacity: 0;
}

/* ============================================
   section-title — 模块标题（带渐变色下划线）
   ============================================ */
.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 16px;
  padding-bottom: 8px;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 60%;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--vp-c-brand-1), transparent);
}

/* ============================================
   hero — 头像区
   ============================================ */
.hero-block {
  text-align: center;
  padding: 16px 0 8px;
}

.hero-avatar-ring {
  display: inline-flex;
  position: relative;
  margin-bottom: 16px;
}

.hero-avatar-ring::before {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  background: conic-gradient(
    var(--vp-c-brand-1),
    var(--vp-c-brand-2),
    #818cf8,
    var(--vp-c-brand-1)
  );
  animation: rotateRing 4s linear infinite;
}

.hero-avatar-img {
  position: relative;
  z-index: 1;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  border: 4px solid var(--vp-c-bg);
}

.hero-name {
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 4px;
  background: linear-gradient(135deg, var(--vp-c-brand-1), #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-bio {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  opacity: 0.8;
  margin: 0;
}

@keyframes rotateRing {
  to { transform: rotate(360deg); }
}

/* ============================================
   text — 段落文字
   ============================================ */
.text-content {
  font-size: 0.98rem;
  line-height: 1.8;
  color: var(--vp-c-text-2);
}

/* ============================================
   tags — 技能标签云
   ============================================ */
.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-pill {
  display: inline-block;
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 0.84rem;
  font-weight: 500;
  cursor: default;
  transition: all 0.25s;
  animation: fadeInUp 0.4s ease both;
  opacity: 0;
}

.tag-pill:hover {
  transform: translateY(-2px) scale(1.06);
  filter: brightness(1.15);
}

/* ---------- 颜色变体 ---------- */
.tag-pill--blue   { background: rgba(59,   130, 246, 0.15); color: #60a5fa; }
.tag-pill--green  { background: rgba(34,   197, 94,  0.15); color: #4ade80; }
.tag-pill--purple { background: rgba(147,  51,  234, 0.15); color: #a78bfa; }
.tag-pill--orange { background: rgba(249,  115, 22,  0.15); color: #fb923c; }
.tag-pill--pink   { background: rgba(236,  72,  153, 0.15); color: #f472b6; }
.tag-pill--teal   { background: rgba(20,   184, 166, 0.15); color: #2dd4bf; }
.tag-pill--red    { background: rgba(239,  68,  68,  0.15); color: #f87171; }
.tag-pill--indigo { background: rgba(99,   102, 241, 0.15); color: #818cf8; }

/* ============================================
   cards — 卡片网格
   ============================================ */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
}

.info-card {
  padding: 18px 20px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition: all 0.3s;
  animation: fadeInUp 0.5s ease both;
  opacity: 0;
}

.info-card:hover {
  transform: translateY(-4px);
  border-color: rgba(96, 165, 250, 0.35);
  box-shadow: 0 6px 24px rgba(59, 130, 246, 0.15);
  background: rgba(255, 255, 255, 0.08);
}

.info-card-icon {
  font-size: 2rem;
  line-height: 1;
}

.info-card-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.info-card-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  opacity: 0.75;
}

/* ============================================
   timeline — 时间线
   ============================================ */
.timeline {
  position: relative;
  padding-left: 24px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 4px;
  bottom: 4px;
  width: 2px;
  background: linear-gradient(
    180deg,
    var(--vp-c-brand-1),
    transparent
  );
}

.timeline-item {
  position: relative;
  padding: 0 0 20px 24px;
  animation: fadeInUp 0.5s ease both;
  opacity: 0;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -20px;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

.timeline-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.timeline-year {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.timeline-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.timeline-desc {
  font-size: 0.84rem;
  color: var(--vp-c-text-3);
  opacity: 0.8;
}

/* ============================================
   stats — 统计数据
   ============================================ */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
}

.stat-card {
  text-align: center;
  padding: 22px 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
  animation: fadeInUp 0.5s ease both;
  opacity: 0;
}

.stat-card:hover {
  transform: translateY(-3px);
  border-color: rgba(96, 165, 250, 0.35);
  box-shadow: 0 6px 24px rgba(59, 130, 246, 0.15);
}

.stat-value {
  display: block;
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--vp-c-brand-1), #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  display: block;
  font-size: 0.84rem;
  color: var(--vp-c-text-3);
  opacity: 0.75;
  margin-top: 2px;
}

/* ============================================
   动画
   ============================================ */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ============================================
   响应式
   ============================================ */
@media (max-width: 640px) {
  .personal-bio {
    gap: 24px;
  }
  .hero-name {
    font-size: 1.5rem;
  }
  .hero-avatar-img {
    width: 72px;
    height: 72px;
  }
  .timeline {
    padding-left: 16px;
  }
  .timeline-item {
    padding-left: 18px;
  }
  .timeline-dot {
    left: -15px;
    width: 10px;
    height: 10px;
  }
  .cards-grid {
    grid-template-columns: 1fr;
  }
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
