<template>
  <div class="friend-links">
    <a
      v-for="(link, i) in friendLinks"
      :key="link.url"
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
      class="friend-card"
      :style="{ animationDelay: `${i * 0.1}s` }"
    >
      <div class="friend-card__media">
        <img :src="link.img" :alt="link.name" class="friend-card__img" />
        <div class="friend-card__shine" aria-hidden="true" />
      </div>
      <div class="friend-card__body">
        <h3 class="friend-card__name">{{ link.name }}</h3>
        <p class="friend-card__summary">{{ link.summary }}</p>
      </div>
      <div class="friend-card__arrow" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M4 10h11M11 6l4 4-4 4"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { friendLinks } from '../data/friendLinks'
</script>

<style scoped>
.friend-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 8px 0 24px;
  perspective: 800px;
}

.friend-card {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid rgba(59, 130, 246, 0.12);
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  position: relative;
  transform-style: preserve-3d;
  animation: fadeInUp 0.65s ease both;
  opacity: 0;
  transition:
    transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.35s ease,
    border-color 0.35s ease;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.friend-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(96, 165, 250, 0.12) 50%,
    transparent 60%
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
  z-index: 1;
  pointer-events: none;
}

.friend-card:hover::before {
  transform: translateX(100%);
}

.friend-card:hover {
  transform: translateY(-6px) rotateY(2deg);
  border-color: rgba(96, 165, 250, 0.35);
  box-shadow:
    0 12px 40px rgba(59, 130, 246, 0.18),
    0 4px 12px rgba(59, 130, 246, 0.08);
}

.friend-card__media {
  position: relative;
  height: 140px;
  overflow: hidden;
  background: var(--vp-c-bg-alt);
}

.friend-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s cubic-bezier(0.25, 0.8, 0.25, 1.2);
}

.friend-card:hover .friend-card__img {
  transform: scale(1.08);
}

.friend-card__shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.35) 0%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.35s ease;
}

.friend-card:hover .friend-card__shine {
  opacity: 1;
}

.friend-card__body {
  flex: 1;
  padding: 18px 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.friend-card__name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.35;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.friend-card__summary {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.friend-card__arrow {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  color: var(--vp-c-text-3);
  opacity: 0.7;
  transition: all 0.3s ease;
  z-index: 2;
}

.friend-card:hover .friend-card__arrow {
  opacity: 1;
  color: var(--vp-c-brand-1);
  transform: translate(3px, -3px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}

@media (max-width: 480px) {
  .friend-links {
    grid-template-columns: 1fr;
  }
}
</style>
