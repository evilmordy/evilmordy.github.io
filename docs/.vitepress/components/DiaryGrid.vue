<template>
  <div class="diary-timeline">
    <article
      v-for="(entry, i) in sortedEntries"
      :key="entry.date + (entry.title ?? '')"
      class="diary-item"
      :style="{ animationDelay: `${i * 0.12}s` }"
    >
      <span class="diary-item__dot" aria-hidden="true" />

      <div class="diary-item__main">
        <time class="diary-item__date" :datetime="entry.date">
          {{ formatDate(entry.date) }}
        </time>

        <div v-if="entry.img" class="diary-item__media">
          <div class="diary-item__img-box">
            <img
              :src="entry.img"
              :alt="entry.title ?? '日记配图'"
              class="diary-item__img"
            />
            <div class="diary-item__shine" aria-hidden="true" />
          </div>
        </div>

        <div class="diary-item__card">
          <h3 v-if="entry.title" class="diary-item__title">{{ entry.title }}</h3>
          <p class="diary-item__content">{{ entry.content }}</p>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { diaryEntries } from '../data/diaryEntries'

const sortedEntries = computed(() =>
  [...diaryEntries].sort((a, b) => b.date.localeCompare(a.date)),
)

function formatDate(date: string): string {
  const [year, month, day] = date.split('-')
  return `${year} 年 ${Number(month)} 月 ${Number(day)} 日`
}
</script>

<style scoped>
.diary-timeline {
  position: relative;
  max-width: 760px;
  margin: 0 auto;
  padding: 8px 0 32px 28px;
}

.diary-timeline::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  background: linear-gradient(
    180deg,
    var(--vp-c-brand-1) 0%,
    rgba(147, 51, 234, 0.45) 55%,
    rgba(96, 165, 250, 0.2) 100%
  );
  border-radius: 2px;
}

.diary-item {
  position: relative;
  padding: 0 0 40px 24px;
  animation: fadeInUp 0.65s ease both;
  opacity: 0;
}

.diary-item:last-child {
  padding-bottom: 0;
}

.diary-item__dot {
  position: absolute;
  left: -28px;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.18);
  z-index: 1;
}

.diary-item__main {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.diary-item__date {
  display: inline-flex;
  align-self: flex-start;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: var(--vp-c-brand-1);
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.18);
}

.diary-item__media {
  width: 100%;
  max-width: 520px;
}

.diary-item__img-box {
  position: relative;
  height: 220px;
  overflow: hidden;
  border-radius: 16px;
  background: var(--vp-c-bg-alt);
  border: 1px solid rgba(59, 130, 246, 0.12);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.35s ease,
    border-color 0.35s ease;
}

.diary-item__media:hover .diary-item__img-box {
  transform: translateY(-5px);
  border-color: rgba(96, 165, 250, 0.35);
  box-shadow:
    0 14px 40px rgba(59, 130, 246, 0.16),
    0 4px 12px rgba(59, 130, 246, 0.08);
}

.diary-item__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.diary-item__media:hover .diary-item__img {
  transform: scale(1.05);
}

.diary-item__shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.22) 0%,
    transparent 55%
  );
  opacity: 0;
  transition: opacity 0.35s ease;
  pointer-events: none;
}

.diary-item__media:hover .diary-item__shine {
  opacity: 1;
}

.diary-item__card {
  padding: 22px 24px;
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid rgba(59, 130, 246, 0.1);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.diary-item:hover .diary-item__card {
  border-color: rgba(96, 165, 250, 0.28);
  box-shadow: 0 8px 28px rgba(59, 130, 246, 0.1);
}

.diary-item__title {
  margin: 0 0 10px;
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.4;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.diary-item__content {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.75;
  color: var(--vp-c-text-2);
  white-space: pre-line;
}

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

@media (max-width: 640px) {
  .diary-timeline {
    padding-left: 22px;
  }

  .diary-item {
    padding-left: 18px;
  }

  .diary-item__dot {
    left: -24px;
    width: 10px;
    height: 10px;
  }

  .diary-item__img-box {
    height: 180px;
  }

  .diary-item__card {
    padding: 18px 16px;
  }
}
</style>
