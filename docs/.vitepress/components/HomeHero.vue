<template>
  <section class="hero">
    <div
      class="hero__bg"
      aria-hidden="true"
      :style="{
        filter: `brightness(${bgBrightness})`,
        opacity: bgOpacity,
      }"
    />
    <ul class="hero__shapes" aria-hidden="true" :style="{ opacity: shapesOpacity }">
      <li v-for="shape in shapes" :key="shape.class" :class="['hero__shape', shape.class]" />
    </ul>

    <div class="hero__body">
      <div
        class="hero__content"
        :class="{ 'hero__content--revealed': contentRevealed }"
        :style="{ opacity: contentOpacity }"
      >
        <div class="hero__avatar">
          <img src="/uzquneen.jpg" alt="avatar" width="112" height="112" />
        </div>

        <h1 class="hero__title">
          <span class="hero__title-text">时针同学</span>
        </h1>
        <p class="hero__subtitle">今后也请多多关照</p>
        <p class="hero__motto">战斗的意义不是憎恨！</p>

        <div class="hero__actions">
          <a href="/notes/" class="hero__btn hero__btn--brand">知识库</a>
          <a href="/column/personal" class="hero__btn hero__btn--outline">关于我</a>
        </div>

        <nav class="hero__socials" aria-label="社交链接">
          <a href="https://github.com/evilmordy" target="_blank" rel="noopener">GitHub</a>
          <a href="https://space.bilibili.com/3546701528828459" target="_blank" rel="noopener">Bilibili</a>
        </nav>
      </div>
    </div>

    <div class="hero__wave" aria-hidden="true">
      <svg class="hero__wave-layer hero__wave-layer--back" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,64 C360,120 720,0 1080,64 C1260,96 1350,88 1440,64 L1440,120 L0,120 Z" />
      </svg>
      <svg class="hero__wave-layer hero__wave-layer--front" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,72 C240,24 480,108 720,72 C960,36 1200,108 1440,72 L1440,120 L0,120 Z" />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { homeIntroActive, homeRevealProgress } from '../composables/useHomeIntro'

const shapes = [
  { class: 'hero__shape--1' },
  { class: 'hero__shape--2' },
  { class: 'hero__shape--3' },
  { class: 'hero__shape--4' },
]

const bgBrightness = computed(() => {
  if (!homeIntroActive.value) return 0.35
  const p = homeRevealProgress.value
  if (p < 0.48) return 0.35
  return 0.15 + p * 0.2
})

const bgOpacity = computed(() => {
  if (!homeIntroActive.value) return 1
  const p = homeRevealProgress.value
  if (p < 0.48) return 0
  if (p >= 0.68) return 1
  return (p - 0.48) / 0.2
})

const shapesOpacity = computed(() => {
  if (!homeIntroActive.value) return 1
  const p = homeRevealProgress.value
  if (p < 0.48) return 0
  return Math.min(1, (p - 0.48) * 2.5)
})

const contentOpacity = computed(() => {
  if (!homeIntroActive.value) return 1
  const p = homeRevealProgress.value
  if (p < 0.55) return 0
  if (p >= 0.85) return 1
  return (p - 0.55) / 0.3
})

const contentRevealed = computed(
  () => !homeIntroActive.value || homeRevealProgress.value >= 0.55,
)
</script>

<style scoped>
.hero {
  position: relative;
  overflow: clip;
}

.hero__bg {
  position: absolute;
  inset: 0;
  background: url('/uzquneen.jpg') center / cover no-repeat;
  transition: filter 0.6s ease, opacity 0.7s ease;
}

.hero__shapes {
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  pointer-events: none;
  transition: opacity 0.6s ease;
}

.hero__shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.12;
  animation: home-float var(--duration, 8s) ease-in-out var(--delay, 0s) infinite;
}

.hero__shape--1 {
  --duration: 8s;
  width: 300px;
  height: 300px;
  background: #ff6b6b;
  top: 10%;
  left: -5%;
}

.hero__shape--2 {
  --duration: 6s;
  --delay: 1s;
  width: 200px;
  height: 200px;
  background: #4ecdc4;
  top: 60%;
  right: -3%;
}

.hero__shape--3 {
  --duration: 10s;
  --delay: 2s;
  width: 150px;
  height: 150px;
  background: #ffe66d;
  bottom: 10%;
  left: 30%;
}

.hero__shape--4 {
  --duration: 7s;
  --delay: 0.5s;
  width: 100px;
  height: 100px;
  background: #a29bfe;
  top: 40%;
  right: 20%;
}

.hero__body {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: clamp(430px, 58vh, 560px);
  padding: calc(var(--vp-nav-height, 64px) + 38px) 24px 118px;
}

.hero__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: opacity 0.5s ease;
}

.hero__content:not(.hero__content--revealed) > * {
  animation: none !important;
  opacity: 0;
}

.hero__content--revealed > * {
  animation: fadeInUp 0.8s ease forwards;
  opacity: 0;
}

.hero__content > :nth-child(1) { animation-delay: 0.15s; }
.hero__content > :nth-child(2) { animation-delay: 0.3s; }
.hero__content > :nth-child(3) { animation-delay: 0.45s; }
.hero__content > :nth-child(4) { animation-delay: 0.6s; }
.hero__content > :nth-child(5) { animation-delay: 0.75s; }
.hero__content > :nth-child(6) { animation-delay: 0.9s; }

.hero__avatar {
  margin-bottom: 22px;
}

.hero__avatar img {
  display: block;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.28);
  box-shadow: 0 0 32px rgba(255, 107, 107, 0.35);
  animation: home-float 4s ease-in-out infinite;
}

.hero__title {
  margin: 0 0 12px;
  line-height: 1.2;
}

.hero__title-text {
  display: inline-block;
  padding-block: 0.12em;
  font-size: clamp(1.9rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: 0.12em;
  line-height: 1.35;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffe66d 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.hero__subtitle {
  margin: 0 0 8px;
  font-size: clamp(1rem, 2.5vw, 1.35rem);
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.82);
}

.hero__motto {
  margin: 0 0 28px;
  font-size: 0.92rem;
  line-height: 1.6;
  font-style: italic;
  color: rgba(255, 255, 255, 0.48);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  margin-bottom: 26px;
}

.hero__btn {
  padding: 10px 26px;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.hero__btn--brand {
  background: #3b82f6;
  color: #fff;
}

.hero__btn--brand:hover {
  background: #60a5fa;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.hero__btn--outline {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(10px);
}

.hero__btn--outline:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.hero__socials {
  display: flex;
  gap: 22px;
}

.hero__socials a {
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.85rem;
  text-decoration: none;
  transition: color 0.3s ease;
}

.hero__socials a:hover {
  color: #60a5fa;
}

.hero__wave {
  position: absolute;
  inset-inline: 0;
  bottom: -1px;
  z-index: 2;
  height: 120px;
  overflow: hidden;
  pointer-events: none;
}

.hero__wave-layer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100%;
  fill: var(--vp-c-bg);
}

.hero__wave-layer--back {
  opacity: 0.55;
  animation: home-wave-drift 14s linear infinite;
}

.hero__wave-layer--front {
  animation: home-wave-drift 9s linear infinite reverse;
}
</style>
