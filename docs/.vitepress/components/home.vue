<!--
  ============================================
  home.vue — 完全自定义的主页组件
  你可以自由修改模板、样式、脚本，VitePress 不会干预布局
  ============================================
-->

<template>
  <div class="custom-home">
    <!-- ======== 1. 背景层 ======== -->
    <div class="bg-layer"></div>

    <!-- ======== 2. 装饰动效元素 ======== -->
    <div class="floating-shapes">
      <span class="shape shape-1"></span>
      <span class="shape shape-2"></span>
      <span class="shape shape-3"></span>
      <span class="shape shape-4"></span>
    </div>

    <!-- ======== 3. 主内容区 ======== -->
    <main class="content">
      <!-- 头像区 -->
      <div class="avatar-wrapper">
        <img
          class="avatar"
          src="/uzquneen.jpg"
          alt="avatar"
        />
      </div>

      <!-- 标题 -->
      <h1 class="title">时针同学</h1>
      <p class="subtitle">今后也请多多关照</p>
      <p class="tagline">战斗的意义不是憎恨！</p>

      <!-- 链接按钮组 -->
      <div class="actions">
        <a href="/notes/" class="btn primary">知识库</a>
        <a href="/column/personal" class="btn alt">关于我</a>
      </div>

      <!-- 社交图标 -->
      <div class="social-links">
        <a href="https://github.com/evilmordy" target="_blank" class="social-link">GitHub</a>
        <a href="https://space.bilibili.com/3546701528828459" target="_blank" class="social-link">Bilibili</a>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// 这里可以写 Vue 逻辑，比如鼠标跟随、滚动监听
// import { ref, onMounted } from 'vue'
</script>

<style scoped>
/* ============================================
 *  全部首页样式都写在这里（scoped 保证不泄漏到其他页面）
 *  要改什么就直接改下面
 * ============================================ */

/* ---- 根容器 ---- */
.custom-home {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
}

/* ---- 背景层：替换 url() 里的图片路径即可换背景 ---- */
.bg-layer {
  position: fixed;
  inset: 0;
  /* ▼ 改背景：换 url() 里的路径，或者改成渐变 linear-gradient(...) */
  background: url('/uzquneen.jpg') center / cover no-repeat;
  /* ▼ 调明暗：越大越暗，越小越亮 */
  filter: brightness(0.35);
  z-index: -1;
}

/* ---- 浮动装饰形状 ---- */
.floating-shapes {
  position: fixed;
  inset: 0;
  pointer-events: none;   /* 不阻挡点击 */
  z-index: 0;
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.12;
}

/* ▼ 每个形状改颜色、大小、动画时长 */
.shape-1 {
  width: 300px; height: 300px;
  background: #ff6b6b;
  top: 10%; left: -5%;
  animation: float 8s ease-in-out infinite;
}
.shape-2 {
  width: 200px; height: 200px;
  background: #4ecdc4;
  top: 60%; right: -3%;
  animation: float 6s ease-in-out 1s infinite;
}
.shape-3 {
  width: 150px; height: 150px;
  background: #ffe66d;
  bottom: 10%; left: 30%;
  animation: float 10s ease-in-out 2s infinite;
}
.shape-4 {
  width: 100px; height: 100px;
  background: #a29bfe;
  top: 40%; right: 20%;
  animation: float 7s ease-in-out 0.5s infinite;
}

/* ---- 主内容区 ---- */
.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 20px;
  text-align: center;
}

/* 淡入上移入场动画 */
.content > * {
  animation: fadeInUp 0.8s ease forwards;
  opacity: 0;
}
/* 逐个延迟出现 */
.content > *:nth-child(1) { animation-delay: 0.2s; }
.content > *:nth-child(2) { animation-delay: 0.4s; }
.content > *:nth-child(3) { animation-delay: 0.6s; }
.content > *:nth-child(4) { animation-delay: 0.8s; }
.content > *:nth-child(5) { animation-delay: 1.0s; }
.content > *:nth-child(6) { animation-delay: 1.2s; }

/* ---- 头像 ---- */
.avatar-wrapper {
  margin-bottom: 24px;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255,255,255,0.3);
  /* ▼ 头像加发光 */
  box-shadow: 0 0 30px rgba(255,107,107,0.4);
  /* ▼ 头像加浮动动画 */
  animation: float 4s ease-in-out infinite;
}

/* ---- 文字 ---- */
.title {
  font-size: clamp(2rem, 6vw, 3.5rem);  /* 响应式字号 */
  font-weight: 800;
  letter-spacing: 4px;                  /* ▼ 字间距 */
  margin-bottom: 12px;
  /* ▼ 渐变文字 */
  background: linear-gradient(135deg, #ff6b6b, #ffe66d);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: rgba(255,255,255,0.8);
  margin-bottom: 8px;
}

.tagline {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.5);
  font-style: italic;
  margin-bottom: 40px;
}

/* ---- 按钮 ---- */
.actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 40px;
}

.btn {
  padding: 12px 28px;
  border-radius: 50px;    /* ▼ 圆角大小 */
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn.primary {
  background: var(--color-primary);
  color: #fff;
}
.btn.primary:hover {
  background: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255,107,107,0.4);
}

.btn.alt {
  background: rgba(255,255,255,0.1);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.2);
  /* ▼ backdrop-filter=毛玻璃效果 */
  backdrop-filter: blur(10px);
}
.btn.alt:hover {
  background: rgba(255,255,255,0.2);
  transform: translateY(-2px);
}

/* ---- 社交链接 ---- */
.social-links {
  display: flex;
  gap: 24px;
}

.social-link {
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;
}
.social-link:hover {
  color: var(--color-primary);
}
</style>
