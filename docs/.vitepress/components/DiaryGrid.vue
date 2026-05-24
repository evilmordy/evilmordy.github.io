<template>
  <div class="diary-grid">
    <article
      v-for="(entry, i) in sortedEntries"
      :key="entry.date + (entry.title ?? '')"
      class="diary-card"
      :style="{ animationDelay: `${i * 0.1}s` }"
    >
      <div class="diary-card__media">
        <img :src="entry.img" :alt="entry.title ?? '日记配图'" class="diary-card__img" />
        <time class="diary-card__date" :datetime="entry.date">{{ formatDate(entry.date) }}</time>
      </div>
      <div class="diary-card__body">
        <h3 v-if="entry.title" class="diary-card__title">{{ entry.title }}</h3>
        <p class="diary-card__content">{{ entry.content }}</p>
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
.diary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  padding: 8px 0 24px;
}

.diary-card {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  animation: fadeInUp 0.65s ease both;
  opacity: 0;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.diary-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 14px 40px rgba(59, 130, 246, 0.14);
}

.diary-card__media {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.diary-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s cubic-bezier(0.25, 0.8, 0.25, 1.2);
}

.diary-card:hover .diary-card__img {
  transform: scale(1.06);
}

.diary-card__date {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #fff;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.35);
}

.diary-card__body {
  flex: 1;
  padding: 20px 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.diary-card__title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.4;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.diary-card__content {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
  white-space: pre-line;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}

@media (max-width: 480px) {
  .diary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
