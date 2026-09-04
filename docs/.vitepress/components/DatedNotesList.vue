<template>
  <div ref="pageRef" class="dated-notes-page">
    <section class="dated-notes-hero" data-reveal>
      <span class="dated-notes-kicker">Latest first</span>
      <h1>{{ category?.title || props.category }}</h1>
      <p>{{ category?.details }}</p>
      <div class="dated-notes-stats">
        <span>共 <strong>{{ articles.length }}</strong> 篇</span>
        <span v-if="category?.latestDate">
          最新 <time :datetime="category.latestDate">{{ formatNoteDate(category.latestDate) }}</time>
        </span>
      </div>
    </section>

    <div v-if="articles.length === 0" class="dated-notes-empty">还没有记录。</div>

    <div v-else class="dated-notes-timeline">
      <a
        v-for="(article, i) in articles"
        :key="article.path"
        :href="article.link"
        class="dated-notes-item"
        :style="{ animationDelay: `${Math.min(i * 0.08, 0.56)}s` }"
        data-reveal
      >
        <span class="dated-notes-item__dot" aria-hidden="true" />
        <time v-if="article.date" class="dated-notes-item__date" :datetime="article.date">
          {{ formatNoteDate(article.date) }}
        </time>
        <h2>{{ article.title }}</h2>
        <span class="dated-notes-item__more">阅读全文 →</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { getNoteCategories } from '../data/noteCategories'
import { formatNoteDate } from '../data/noteDate'
import { useScrollReveal } from '../composables/useScrollReveal'

const props = defineProps<{
  category: string
}>()

const pageRef = ref<HTMLElement | null>(null)
const category = computed(() => getNoteCategories().find((item) => item.name === props.category))
const articles = computed(() => category.value?.articles ?? [])

useScrollReveal(pageRef, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' })
</script>

<style scoped>
.dated-notes-page {
  padding-bottom: 40px;
}

.dated-notes-page [data-reveal] {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.dated-notes-page [data-reveal].is-visible {
  opacity: 1;
  transform: none;
}

.dated-notes-hero {
  max-width: 760px;
  margin: 0 auto 28px;
}

.dated-notes-kicker {
  display: inline-flex;
  margin-bottom: 12px;
  padding: 5px 10px;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.dated-notes-hero h1 {
  margin: 0 0 10px;
  border: 0;
  padding: 0;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  line-height: 1.15;
}

.dated-notes-hero p {
  margin: 0 0 16px;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

.dated-notes-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.dated-notes-stats strong,
.dated-notes-stats time {
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.dated-notes-empty {
  max-width: 760px;
  margin: 24px auto;
  color: var(--vp-c-text-2);
}

.dated-notes-timeline {
  position: relative;
  max-width: 760px;
  margin: 0 auto;
  padding: 8px 0 12px 28px;
}

.dated-notes-timeline::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  border-radius: 2px;
  background: linear-gradient(
    180deg,
    var(--vp-c-brand-1) 0%,
    rgba(147, 51, 234, 0.45) 55%,
    rgba(96, 165, 250, 0.2) 100%
  );
}

.dated-notes-item {
  position: relative;
  display: grid;
  gap: 8px;
  margin-bottom: 18px;
  padding: 18px 20px 18px 22px;
  border: 1px solid rgba(59, 130, 246, 0.12);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  color: inherit;
  text-decoration: none;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.dated-notes-item:last-child {
  margin-bottom: 0;
}

.dated-notes-item:hover {
  border-color: rgba(96, 165, 250, 0.32);
  box-shadow: 0 8px 28px rgba(59, 130, 246, 0.1);
  transform: translateY(-2px);
}

.dated-notes-item__dot {
  position: absolute;
  left: -28px;
  top: 26px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.dated-notes-item__date {
  display: inline-flex;
  width: fit-content;
  padding: 4px 12px;
  border: 1px solid rgba(59, 130, 246, 0.18);
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.1);
  color: var(--vp-c-brand-1);
  font-size: 0.8rem;
  font-weight: 700;
}

.dated-notes-item h2 {
  margin: 0;
  border: 0;
  padding: 0;
  font-size: 1.08rem;
  line-height: 1.45;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dated-notes-item__more {
  color: var(--vp-c-brand-1);
  font-size: 0.78rem;
  opacity: 0.75;
}

.dated-notes-item:hover .dated-notes-item__more {
  opacity: 1;
}

@media (max-width: 640px) {
  .dated-notes-timeline {
    padding-left: 22px;
  }

  .dated-notes-item {
    padding: 16px 16px 16px 18px;
  }

  .dated-notes-item__dot {
    left: -24px;
    width: 10px;
    height: 10px;
  }
}
</style>
