<!-- 首页卡片网格 — 数据见 ../data/homeCards.ts -->
<template>
  <div
    class="features-section"
    :class="{ 'features-section--revealed': featuresRevealed }"
    :style="featuresStyle"
  >
    <div class="features-inner">
      <div class="features-grid">
        <a
          v-for="(card, i) in homeCards"
          :key="card.title"
          :href="card.link"
          class="feature-card"
          :style="{ transitionDelay: featuresRevealed ? `${i * 0.06}s` : '0s' }"
        >
          <div class="card-img-box">
            <img :src="card.img" :alt="card.title" class="card-img" />
          </div>
          <div class="card-body">
            <h3 class="card-title">{{ card.title }}</h3>
            <p class="card-desc">{{ card.details }}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { homeCards } from '../data/homeCards'
import { homeIntroActive, homeRevealProgress } from '../composables/useHomeIntro'

const featuresRevealed = computed(
  () => !homeIntroActive.value || homeRevealProgress.value >= 0.65,
)

const featuresStyle = computed(() => {
  if (!homeIntroActive.value) {
    return { opacity: '1', transform: 'translateY(0)' }
  }
  const p = homeRevealProgress.value
  if (p < 0.65) {
    return { opacity: '0', transform: 'translateY(20px)' }
  }
  if (p >= 0.9) {
    return { opacity: '1', transform: 'translateY(0)' }
  }
  const t = (p - 0.65) / 0.25
  return {
    opacity: String(t),
    transform: `translateY(${20 * (1 - t)}px)`,
  }
})
</script>

<style scoped>
.features-section {
  background: var(--vp-c-bg);
  padding: 0 0 80px;
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.features-section--revealed .feature-card {
  opacity: 1;
  transform: translateY(0);
}

.features-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.feature-card {
  display: flex;
  height: 160px;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.35s ease, box-shadow 0.35s ease, opacity 0.6s ease;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  opacity: 0;
  transform: translateY(16px);
}

.features-section:not(.features-section--revealed) .feature-card {
  opacity: 0;
  transform: translateY(16px);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(0,0,0,0.12);
}

.card-img-box {
  flex: 0 0 42%;
  overflow: hidden;
  clip-path: polygon(0 0, 88% 0, 72% 100%, 0 100%);
}
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s cubic-bezier(0.25,0.8,0.25,1.2);
}
.feature-card:hover .card-img {
  transform: rotate(20deg) scale(1.1);
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 18px 20px 12px;
}
.card-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 6px;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.card-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.55;
}
</style>
