<template>
  <div ref="pageRef" class="personal-bio-page">
    <!-- 占位：fixed Hero 期间撑开文档流 -->
    <div
      v-if="heroSection && heroPhase !== 'ready'"
      class="bio-hero-spacer"
      :class="{ 'bio-hero-spacer--collapsing': heroPhase === 'collapse' }"
    />

    <!-- Hero 区：全屏隧道 → 收缩 → 紧凑条 -->
    <div
      v-if="heroSection"
      class="bio-hero-zone"
      :class="{
        'bio-hero-zone--tunnel': heroPhase === 'tunnel',
        'bio-hero-zone--collapsing': heroPhase === 'collapse',
        'bio-hero-zone--ready': heroPhase === 'ready',
      }"
    >
      <WarpTunnel
        v-if="heroPhase !== 'ready'"
        fullscreen
        :fading="heroPhase === 'collapse'"
        @intro-complete="onTunnelDone"
      />
      <div
        class="bio-hero-zone__content"
        :class="{ 'bio-hero-zone__content--visible': heroContentVisible }"
      >
        <div class="hero-block">
          <div class="hero-avatar-ring">
            <img
              class="hero-avatar-img"
              :src="heroSection.icon"
              :alt="heroSection.name"
            />
          </div>
          <h1 class="hero-name">{{ heroSection.name }}</h1>
          <p class="hero-bio">{{ heroSection.bio }}</p>
        </div>
      </div>

      <p
        v-if="heroPhase === 'ready' && showScrollHint"
        class="bio-scroll-hint"
        :class="{ 'bio-scroll-hint--fading': scrollHintFading }"
      >
        向下滚动探索更多 ↓
      </p>
    </div>

    <!-- 内容区：淡色星云 + 玻璃卡片 -->
    <div class="bio-content-zone" :class="{ 'bio-content-zone--visible': heroPhase === 'ready' }">
      <ul class="bio-nebula" aria-hidden="true">
        <li class="bio-nebula__blob bio-nebula__blob--a" />
        <li class="bio-nebula__blob bio-nebula__blob--b" />
        <li class="bio-nebula__blob bio-nebula__blob--c" />
      </ul>

      <div class="bio-content-inner">
        <section
          v-for="(section, i) in contentSections"
          :key="`${section.type}-${i}`"
          :class="['bio-glass-panel', `bio-glass-panel--${section.type}`]"
          data-reveal
        >
          <div v-if="section.type === 'text'" class="text-block">
            <h2 v-if="section.title" class="section-title">{{ section.title }}</h2>
            <div class="text-content" v-html="section.content" />
          </div>

          <div v-else-if="section.type === 'tags'" class="tags-block">
            <h2 v-if="section.title" class="section-title">{{ section.title }}</h2>
            <div class="tags-cloud">
              <span
                v-for="item in section.items"
                :key="typeof item === 'string' ? item : item.name"
                class="tag-pill"
                :class="`tag-pill--${getTagColor(item)}`"
              >
                {{ typeof item === 'string' ? item : item.name }}
              </span>
            </div>
          </div>

          <div v-else-if="section.type === 'cards'" class="cards-block">
            <h2 v-if="section.title" class="section-title">{{ section.title }}</h2>
            <div class="cards-grid">
              <div
                v-for="(item, i2) in section.items"
                :key="item.name"
                class="info-card"
                :class="`info-card--accent-${i2 % 4}`"
              >
                <div class="info-card-icon">{{ item.icon }}</div>
                <span class="info-card-name">{{ item.name }}</span>
                <span v-if="item.desc" class="info-card-desc">{{ item.desc }}</span>
              </div>
            </div>
          </div>

          <div v-else-if="section.type === 'timeline'" class="timeline-block">
            <h2 v-if="section.title" class="section-title">{{ section.title }}</h2>
            <div class="timeline">
              <div
                v-for="item in section.items"
                :key="item.year + item.title"
                class="timeline-item"
              >
                <div class="timeline-dot" />
                <div class="timeline-content">
                  <span class="timeline-year">{{ item.year }}</span>
                  <span class="timeline-title">{{ item.title }}</span>
                  <span v-if="item.desc" class="timeline-desc">{{ item.desc }}</span>
                  <span v-if="item.intro" class="timeline-intro">{{ item.intro }}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="section.type === 'stats'" class="stats-block">
            <h2 v-if="section.title" class="section-title">{{ section.title }}</h2>
            <div class="stats-grid">
              <div
                v-for="item in section.items"
                :key="item.label"
                class="stat-card"
              >
                <span class="stat-value">{{ item.value }}</span>
                <span class="stat-label">{{ item.label }}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { sections } from '../data/personalBio'
import type { PersonalBioTagItem } from '../data/types'
import WarpTunnel from './WarpTunnel.vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useIntroSkip } from '../composables/useIntroSkip'

type HeroPhase = 'tunnel' | 'collapse' | 'ready'

const COLLAPSE_MS = 800
const SCROLL_HINT_MS = 2500

const pageRef = ref<HTMLElement | null>(null)
const heroPhase = ref<HeroPhase>('tunnel')
const heroContentVisible = ref(false)
const showScrollHint = ref(false)
const scrollHintFading = ref(false)

let contentTimer = 0
let collapseTimer = 0
let hintFadeTimer = 0
let hintRemoveTimer = 0
let reducedMotion = false

useScrollReveal(pageRef)

const heroSection = computed(() => sections.find((s) => s.type === 'hero'))
const contentSections = computed(() => sections.filter((s) => s.type !== 'hero'))

const TAG_COLORS = ['blue', 'green', 'purple', 'orange', 'pink', 'teal', 'red', 'indigo']

function getTagColor(item: PersonalBioTagItem): string {
  if (typeof item === 'object' && item.color && TAG_COLORS.includes(item.color)) {
    return item.color
  }
  const name = typeof item === 'string' ? item : item.name
  return TAG_COLORS[name.length % TAG_COLORS.length]
}

function unlockScroll() {
  document.body.classList.remove('warp-tunnel-active')
  document.body.style.overflow = ''
}

function lockScroll() {
  document.body.classList.add('warp-tunnel-active')
  document.body.style.overflow = 'hidden'
}

function enterReadyPhase() {
  heroPhase.value = 'ready'
  unlockScroll()
  showScrollHint.value = true

  hintFadeTimer = window.setTimeout(() => {
    scrollHintFading.value = true
  }, SCROLL_HINT_MS)

  hintRemoveTimer = window.setTimeout(() => {
    showScrollHint.value = false
  }, SCROLL_HINT_MS + 600)
}

function onTunnelDone() {
  if (heroPhase.value === 'ready') return
  heroPhase.value = 'collapse'
  collapseTimer = window.setTimeout(enterReadyPhase, COLLAPSE_MS)
}

function accelerateIntro() {
  if (heroPhase.value === 'ready' || reducedMotion) return
  clearTimeout(collapseTimer)
  clearTimeout(contentTimer)
  heroContentVisible.value = true
  enterReadyPhase()
}

function skipToReady() {
  heroPhase.value = 'ready'
  heroContentVisible.value = true
  unlockScroll()
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reducedMotion) {
    skipToReady()
    return
  }

  lockScroll()
  contentTimer = window.setTimeout(() => {
    heroContentVisible.value = true
  }, 1200)
})

useIntroSkip(accelerateIntro, () => heroPhase.value !== 'ready' && !reducedMotion)

onUnmounted(() => {
  clearTimeout(contentTimer)
  clearTimeout(collapseTimer)
  clearTimeout(hintFadeTimer)
  clearTimeout(hintRemoveTimer)
  unlockScroll()
})
</script>

<style scoped>
.personal-bio-page {
  position: relative;
  min-height: 60vh;
}

/* ---- Hero 占位 ---- */
.bio-hero-spacer {
  height: 100dvh;
  transition: height 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.bio-hero-spacer--collapsing {
  height: 220px;
}

/* ---- Hero 区 ---- */
.bio-hero-zone {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(180deg, #1a1035 0%, #2d1b69 55%, #1e1145 100%);
}

.bio-hero-zone--tunnel,
.bio-hero-zone--collapsing {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 90;
  height: 100dvh;
  border-radius: 0;
}

.bio-hero-zone--collapsing {
  height: 220px;
  background: linear-gradient(180deg, #2d1b69 0%, #1e1145 70%, transparent 100%);
}

.bio-hero-zone--ready {
  min-height: 220px;
  border-radius: 0 0 28px 28px;
  background: linear-gradient(180deg, #2d1b69 0%, rgba(30, 17, 69, 0.6) 60%, transparent 100%);
}

.bio-hero-zone__content {
  position: relative;
  z-index: 2;
  padding: 48px 24px 40px;
  opacity: 0;
  transform: translateY(24px) scale(1);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease,
    padding 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.bio-hero-zone__content--visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.bio-hero-zone--collapsing .bio-hero-zone__content,
.bio-hero-zone--ready .bio-hero-zone__content {
  padding: 20px 24px 16px;
}

.bio-hero-zone--collapsing .hero-avatar-img,
.bio-hero-zone--ready .hero-avatar-img {
  width: 64px;
  height: 64px;
}

.bio-hero-zone--collapsing .hero-avatar-ring,
.bio-hero-zone--ready .hero-avatar-ring {
  margin-bottom: 10px;
}

.bio-hero-zone--collapsing .hero-name,
.bio-hero-zone--ready .hero-name {
  font-size: 1.5rem;
}

.bio-hero-zone--collapsing .hero-bio,
.bio-hero-zone--ready .hero-bio {
  font-size: 0.9rem;
}

.hero-block {
  text-align: center;
}

.hero-avatar-ring {
  display: inline-flex;
  position: relative;
  margin-bottom: 18px;
  animation: home-float 6s ease-in-out infinite;
  transition: margin 0.8s ease;
}

.hero-avatar-ring::before {
  content: '';
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  background: conic-gradient(
    var(--vp-c-brand-1),
    #f0abfc,
    #a5f3fc,
    #818cf8,
    var(--vp-c-brand-1)
  );
  animation: rotateRing 5s linear infinite;
}

.hero-avatar-img {
  position: relative;
  z-index: 1;
  width: 104px;
  height: 104px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  border: 4px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 24px rgba(147, 187, 253, 0.35);
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1), height 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-name {
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0 0 6px;
  background: linear-gradient(
    120deg,
    #ffffff 0%,
    #93bbfd 25%,
    #f0abfc 50%,
    #a5f3fc 75%,
    #ffffff 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: nameShimmer 6s linear infinite;
  transition: font-size 0.8s ease;
}

.hero-bio {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.82);
  margin: 0;
  letter-spacing: 0.02em;
  transition: font-size 0.8s ease;
}

.bio-scroll-hint {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
  opacity: 0.85;
  animation: hintBounce 2s ease-in-out infinite;
  transition: opacity 0.6s ease;
  z-index: 2;
}

.bio-scroll-hint--fading {
  opacity: 0;
  animation: none;
}

@keyframes rotateRing {
  to { transform: rotate(360deg); }
}

@keyframes nameShimmer {
  to { background-position: 200% center; }
}

@keyframes hintBounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(6px); }
}

/* ---- 内容区 ---- */
.bio-content-zone {
  position: relative;
  padding: 16px 24px 48px;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.bio-content-zone--visible {
  opacity: 1;
  transform: translateY(0);
}

.bio-nebula {
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
  pointer-events: none;
}

.bio-nebula__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  animation: nebulaDrift var(--duration, 14s) ease-in-out var(--delay, 0s) infinite;
}

.bio-nebula__blob--a {
  --duration: 16s;
  width: 420px;
  height: 420px;
  background: rgba(232, 213, 255, 0.35);
  top: -8%;
  left: -10%;
}

.bio-nebula__blob--b {
  --duration: 12s;
  --delay: 2s;
  width: 360px;
  height: 360px;
  background: rgba(189, 224, 254, 0.4);
  top: 30%;
  right: -8%;
}

.bio-nebula__blob--c {
  --duration: 18s;
  --delay: 4s;
  width: 300px;
  height: 300px;
  background: rgba(255, 200, 221, 0.3);
  bottom: 5%;
  left: 25%;
}

.dark .bio-nebula__blob--a { background: rgba(76, 29, 149, 0.2); }
.dark .bio-nebula__blob--b { background: rgba(30, 58, 95, 0.25); }
.dark .bio-nebula__blob--c { background: rgba(131, 24, 67, 0.15); }

@keyframes nebulaDrift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(20px, -16px) scale(1.05); }
  66% { transform: translate(-12px, 12px) scale(0.97); }
}

.bio-content-inner {
  position: relative;
  z-index: 1;
  max-width: 880px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

[data-reveal] {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}

[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}

.bio-glass-panel {
  position: relative;
  padding: 24px 26px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow:
    0 4px 24px rgba(59, 130, 246, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.bio-glass-panel::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 21px;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(147, 187, 253, 0.5),
    rgba(240, 171, 252, 0.35),
    rgba(165, 243, 252, 0.4),
    rgba(147, 187, 253, 0.3)
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0.7;
}

.bio-glass-panel:hover {
  transform: translateY(-3px);
  box-shadow:
    0 12px 36px rgba(59, 130, 246, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.dark .bio-glass-panel {
  background: rgba(15, 31, 58, 0.55);
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
}

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
  background: linear-gradient(90deg, var(--vp-c-brand-1), #f0abfc, transparent);
}

.text-content {
  font-size: 0.98rem;
  line-height: 1.85;
  color: var(--vp-c-text-2);
}

.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-pill {
  display: inline-block;
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 0.84rem;
  font-weight: 500;
  cursor: default;
  transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
}

.tag-pill:hover {
  transform: translateY(-2px) scale(1.06);
  filter: brightness(1.1);
}

.tag-pill--blue   { background: rgba(59,   130, 246, 0.15); color: #3b82f6; }
.tag-pill--green  { background: rgba(34,   197, 94,  0.15); color: #22c55e; }
.tag-pill--purple { background: rgba(147,  51,  234, 0.15); color: #9333ea; }
.tag-pill--orange { background: rgba(249,  115, 22,  0.15); color: #f97316; }
.tag-pill--pink   { background: rgba(236,  72,  153, 0.15); color: #ec4899; }
.tag-pill--teal   { background: rgba(20,   184, 166, 0.15); color: #14b8a6; }
.tag-pill--red    { background: rgba(239,  68,  68,  0.15); color: #ef4444; }
.tag-pill--indigo { background: rgba(99,   102, 241, 0.15); color: #6366f1; }

.tag-pill--blue:hover   { box-shadow: 0 4px 16px rgba(59,  130, 246, 0.25); }
.tag-pill--green:hover  { box-shadow: 0 4px 16px rgba(34,  197, 94,  0.25); }
.tag-pill--purple:hover { box-shadow: 0 4px 16px rgba(147, 51,  234, 0.25); }
.tag-pill--orange:hover { box-shadow: 0 4px 16px rgba(249, 115, 22,  0.25); }
.tag-pill--pink:hover   { box-shadow: 0 4px 16px rgba(236, 72,  153, 0.25); }
.tag-pill--teal:hover   { box-shadow: 0 4px 16px rgba(20,  184, 166, 0.25); }
.tag-pill--red:hover    { box-shadow: 0 4px 16px rgba(239, 68,  68,  0.25); }
.tag-pill--indigo:hover { box-shadow: 0 4px 16px rgba(99,  102, 241, 0.25); }

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
}

.info-card {
  padding: 18px 20px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.45);
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition: all 0.3s ease;
}

.dark .info-card {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.08);
}

.info-card:hover { transform: translateY(-4px); }

.info-card--accent-0:hover { border-color: rgba(59, 130, 246, 0.45); box-shadow: 0 6px 20px rgba(59, 130, 246, 0.15); }
.info-card--accent-1:hover { border-color: rgba(236, 72, 153, 0.45); box-shadow: 0 6px 20px rgba(236, 72, 153, 0.15); }
.info-card--accent-2:hover { border-color: rgba(20, 184, 166, 0.45); box-shadow: 0 6px 20px rgba(20, 184, 166, 0.15); }
.info-card--accent-3:hover { border-color: rgba(147, 51, 234, 0.45); box-shadow: 0 6px 20px rgba(147, 51, 234, 0.15); }

.info-card-icon { font-size: 2rem; line-height: 1; }
.info-card-name { font-weight: 700; font-size: 0.95rem; color: var(--vp-c-text-1); }
.info-card-desc { font-size: 0.8rem; color: var(--vp-c-text-3); opacity: 0.75; }

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
  background: linear-gradient(180deg, var(--vp-c-brand-1), #f0abfc, transparent);
}

.timeline-item {
  position: relative;
  padding: 0 0 20px 24px;
}

.timeline-item:last-child { padding-bottom: 0; }

.bio-glass-panel--timeline.is-visible .timeline-dot {
  animation: dotPulseOnce 0.8s ease forwards;
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

@keyframes dotPulseOnce {
  0% { box-shadow: 0 0 0 0 rgba(147, 187, 253, 0.6); transform: scale(1); }
  50% { box-shadow: 0 0 0 8px rgba(240, 171, 252, 0.3); transform: scale(1.15); }
  100% { box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2); transform: scale(1); }
}

.timeline-year {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
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

.timeline-intro {
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
  font-style: italic;
  opacity: 0.75;
}

.timeline-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
}

.stat-card {
  text-align: center;
  padding: 22px 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.45);
  transition: all 0.3s ease;
}

.dark .stat-card {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.08);
}

.stat-card:hover {
  transform: translateY(-3px);
  border-color: rgba(96, 165, 250, 0.35);
  box-shadow: 0 6px 24px rgba(59, 130, 246, 0.12);
}

.stat-card:hover .stat-value {
  animation: statPulse 0.6s ease;
}

@keyframes statPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.06); }
}

.stat-value {
  display: block;
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--vp-c-brand-1), #f0abfc, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: transform 0.3s ease;
}

.stat-label {
  display: block;
  font-size: 0.84rem;
  color: var(--vp-c-text-3);
  opacity: 0.75;
  margin-top: 2px;
}

@media (max-width: 640px) {
  .bio-hero-spacer--collapsing {
    height: 180px;
  }

  .bio-hero-zone--collapsing {
    height: 180px;
  }

  .bio-hero-zone--ready {
    min-height: 180px;
    border-radius: 0 0 20px 20px;
  }

  .bio-hero-zone__content {
    padding: 36px 16px 32px;
  }

  .bio-hero-zone--collapsing .bio-hero-zone__content,
  .bio-hero-zone--ready .bio-hero-zone__content {
    padding: 16px 16px 12px;
  }

  .bio-hero-zone--collapsing .hero-avatar-img,
  .bio-hero-zone--ready .hero-avatar-img {
    width: 56px;
    height: 56px;
  }

  .bio-hero-zone--collapsing .hero-name,
  .bio-hero-zone--ready .hero-name {
    font-size: 1.35rem;
  }

  .hero-name { font-size: 1.75rem; }

  .bio-content-zone {
    padding: 12px 16px 36px;
  }

  .bio-glass-panel {
    padding: 20px 18px;
  }

  .bio-nebula__blob--a { width: 260px; height: 260px; }
  .bio-nebula__blob--b { width: 220px; height: 220px; }
  .bio-nebula__blob--c { width: 180px; height: 180px; }

  .timeline { padding-left: 16px; }
  .timeline-item { padding-left: 18px; }
  .timeline-dot { left: -15px; width: 10px; height: 10px; }
  .cards-grid { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (prefers-reduced-motion: reduce) {
  .hero-avatar-ring,
  .hero-name,
  .bio-nebula__blob,
  .stat-card:hover .stat-value,
  .bio-scroll-hint {
    animation: none !important;
  }

  [data-reveal] {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .bio-content-zone {
    opacity: 1;
    transform: none;
  }

  .bio-hero-spacer {
    display: none;
  }
}
</style>
