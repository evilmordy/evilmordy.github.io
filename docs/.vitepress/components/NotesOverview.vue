<template>
  <div ref="pageRef" class="notes-overview-page">
    <section class="notes-hero" data-reveal>
      <div>
        <span class="notes-kicker">Knowledge Archive</span>
        <h1>我的知识库</h1>
        <p>按主题收纳学习路线、项目记录和随手整理的技术笔记。更新可能会慢，但会一直补。</p>
      </div>
      <div class="notes-stats">
        <span><strong>{{ totalArticles }}</strong> 篇笔记</span>
        <span><strong>{{ categories.length }}</strong> 个分类</span>
      </div>
    </section>

    <section class="notes-grid" aria-label="知识库分类">
      <article
        v-for="(category, i) in categories"
        :key="category.name"
        class="notes-category"
        :style="{ animationDelay: `${Math.min(i * 0.08, 0.56)}s` }"
        data-reveal
      >
        <a :href="category.link" class="notes-category__main">
          <div class="notes-category__media">
            <img :src="category.img" :alt="category.title" />
          </div>
          <div class="notes-category__body">
            <span v-if="category.latestDate">{{ category.count }} 篇 · 最新 {{ category.latestDate }}</span>
            <span v-else>{{ category.count }} 篇 · {{ category.subCount || 1 }} 个专题</span>
            <h2>{{ category.title }}</h2>
            <p>{{ category.details }}</p>
          </div>
        </a>
        <div class="notes-category__articles">
          <a v-for="article in category.articles.slice(0, 4)" :key="article.path" :href="article.link">
            <time v-if="article.date" :datetime="article.date">{{ article.date }}</time>
            <span>{{ article.title }}</span>
          </a>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { getNoteCategories } from '../data/noteCategories'
import { useScrollReveal } from '../composables/useScrollReveal'

const pageRef = ref<HTMLElement | null>(null)
const categories = getNoteCategories()
const totalArticles = computed(() => categories.reduce((sum, category) => sum + category.count, 0))

useScrollReveal(pageRef, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' })
</script>

<style scoped>
.notes-overview-page {
  padding-bottom: 40px;
}

.notes-overview-page [data-reveal] {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}

.notes-overview-page [data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}

.notes-hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: end;
  min-height: 260px;
  margin-bottom: 32px;
  padding: 42px;
  overflow: hidden;
  border-radius: 28px;
  background:
    linear-gradient(110deg, rgba(10, 22, 40, 0.92), rgba(10, 22, 40, 0.5)),
    url('/uzquneen.jpg') center / cover no-repeat;
  color: #fff;
}

.notes-hero::before {
  content: '';
  position: absolute;
  width: 220px;
  height: 220px;
  right: -64px;
  top: -64px;
  border-radius: 50%;
  background: rgba(96, 165, 250, 0.26);
  animation: home-float 8s ease-in-out infinite;
}

.notes-hero > * {
  position: relative;
  z-index: 1;
}

.notes-kicker {
  display: inline-flex;
  margin-bottom: 14px;
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(96, 165, 250, 0.18);
  color: #bfdbfe;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.notes-hero h1 {
  margin: 0 0 12px;
  font-size: clamp(2rem, 6vw, 3.8rem);
  line-height: 1.08;
}

.notes-hero p {
  max-width: 620px;
  margin: 0;
  color: rgba(255, 255, 255, 0.74);
  line-height: 1.85;
}

.notes-stats {
  display: grid;
  gap: 10px;
  min-width: 150px;
}

.notes-stats span {
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(14px);
  color: rgba(255, 255, 255, 0.78);
}

.notes-stats strong {
  display: block;
  color: #fff;
  font-size: 1.35rem;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  gap: 22px;
}

.notes-category {
  border: 1px solid rgba(59, 130, 246, 0.12);
  border-radius: 20px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.notes-category:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 38px rgba(59, 130, 246, 0.15);
}

.notes-category__main {
  display: flex;
  height: 160px;
  color: inherit;
  text-decoration: none;
}

.notes-category__media {
  flex: 0 0 40%;
  overflow: hidden;
  clip-path: polygon(0 0, 88% 0, 72% 100%, 0 100%);
}

.notes-category__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s cubic-bezier(0.25, 0.8, 0.25, 1.2);
}

.notes-category:hover .notes-category__media img {
  transform: rotate(16deg) scale(1.08);
}

.notes-category__body {
  flex: 1;
  min-width: 0;
  padding: 20px 20px 20px 8px;
}

.notes-category__body span {
  color: var(--vp-c-brand-1);
  font-size: 0.76rem;
  font-weight: 800;
}

.notes-category__body h2 {
  margin: 8px 0 8px;
  overflow: hidden;
  border: 0;
  padding: 0;
  font-size: 1.12rem;
  line-height: 1.35;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.notes-category__body p {
  margin: 0;
  overflow: hidden;
  color: var(--vp-c-text-2);
  font-size: 0.86rem;
  line-height: 1.65;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.notes-category__articles {
  display: grid;
  gap: 8px;
  padding: 0 18px 18px;
}

.notes-category__articles a {
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  padding: 9px 11px;
  border-radius: 12px;
  background: rgba(59, 130, 246, 0.08);
  color: var(--vp-c-text-2);
  text-decoration: none;
  white-space: nowrap;
  font-size: 0.86rem;
}

.notes-category__articles time {
  flex: 0 0 auto;
  color: var(--vp-c-brand-1);
  font-size: 0.74rem;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.notes-category__articles span {
  overflow: hidden;
  text-overflow: ellipsis;
}

.notes-category__articles a:hover {
  color: var(--vp-c-brand-1);
  background: rgba(59, 130, 246, 0.14);
}

@media (max-width: 720px) {
  .notes-hero {
    grid-template-columns: 1fr;
    padding: 30px 24px;
  }
}

@media (max-width: 520px) {
  .notes-grid {
    grid-template-columns: 1fr;
  }

  .notes-category__main {
    height: 150px;
  }

  .notes-category__media {
    flex-basis: 36%;
  }
}
</style>
