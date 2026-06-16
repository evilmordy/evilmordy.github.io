<template>
  <main ref="pageRef" class="blog-home">
    <div class="home-shell">
      <aside class="home-aside" data-reveal>
        <div class="profile-card">
          <img src="/头像.png" alt="时针头像" class="profile-card__avatar" />
          <span class="profile-card__name">时针</span>
          <p>机器学习 / 计算机视觉 / 深度学习方向，偶尔写日记和二创。</p>

          <div class="profile-card__stats">
            <span><strong>{{ totalArticles }}</strong> 笔记</span>
            <span><strong>{{ categories.length }}</strong> 分类</span>
          </div>
        </div>

        <nav class="aside-links" aria-label="站点其它内容">
          <a v-for="item in exploreItems" :key="item.title" :href="item.link" class="aside-link">
            <span class="aside-link__icon">{{ item.icon }}</span>
            <span>
              <strong>{{ item.title }}</strong>
              <em>{{ item.desc }}</em>
            </span>
          </a>
        </nav>
      </aside>

      <section id="knowledge" class="knowledge-section">
        <div class="section-head" data-reveal>
          <span class="section-kicker">Knowledge Base</span>
          <h2>知识库</h2>
          <p>每个大文件夹对应一个学习方向。这里是首页主内容，按主题竖直展开。</p>
        </div>

        <div class="knowledge-list">
          <a
            v-for="(category, i) in categories"
            :key="category.name"
            :href="category.link"
            class="knowledge-card"
            :class="{ 'knowledge-card--reverse': i % 2 === 1 }"
            :style="{ transitionDelay: `${Math.min(i * 0.05, 0.45)}s` }"
            data-reveal
          >
            <div class="knowledge-card__media">
              <img :src="category.img" :alt="category.title" />
            </div>
            <div class="knowledge-card__body">
              <div class="knowledge-card__meta">
                <span>{{ category.count }} 篇笔记</span>
                <span v-if="category.subCount">{{ category.subCount }} 个专题</span>
              </div>
              <h3>{{ category.title }}</h3>
              <p>{{ category.details }}</p>
            </div>
            <span class="knowledge-card__arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { getNoteCategories } from '../data/noteCategories'
import { socialLinks } from '../data/socialLinks'
import { friendLinks } from '../data/friendLinks'
import { useScrollReveal } from '../composables/useScrollReveal'

const pageRef = ref<HTMLElement | null>(null)
const categories = getNoteCategories()
const totalArticles = computed(() => categories.reduce((sum, category) => sum + category.count, 0))

const exploreItems = [
  {
    icon: '✦',
    title: '个人简介',
    desc: '关于我',
    link: '/column/personal',
  },
  {
    icon: '✎',
    title: '日记和随笔',
    desc: '生活记录',
    link: '/column/diary/',
  },
  {
    icon: '↗',
    title: '社交账号和邮箱',
    desc: `${socialLinks.length} 个入口`,
    link: '/column/media/',
  },
  {
    icon: '∞',
    title: '友情链接',
    desc: `${friendLinks.length} 个站点`,
    link: '/column/friends/',
  },
]

useScrollReveal(pageRef, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' })
</script>

<style scoped>
.blog-home {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.blog-home [data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.65s ease, transform 0.65s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.blog-home [data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}

.home-shell {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 42px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 48px 24px 100px;
  align-items: start;
}

.home-aside {
  position: sticky;
  top: calc(var(--vp-nav-height, 64px) + 28px);
  display: grid;
  gap: 20px;
}

.profile-card,
.aside-links,
.knowledge-card {
  border: 1px solid rgba(59, 130, 246, 0.12);
  background: var(--vp-c-bg-soft);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.06);
}

.profile-card {
  position: relative;
  overflow: hidden;
  padding: 24px;
  border-radius: 24px;
  text-align: center;
}

.profile-card::before {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  height: 92px;
  background:
    linear-gradient(90deg, rgba(10, 22, 40, 0.35), rgba(10, 22, 40, 0.05)),
    url('/uzquneen.jpg') center 36% / cover no-repeat;
}

.profile-card > * {
  position: relative;
  z-index: 1;
}

.profile-card__avatar {
  display: block;
  width: 86px;
  height: 86px;
  margin: 42px auto 14px;
  border: 3px solid rgba(255, 255, 255, 0.65);
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 26px rgba(59, 130, 246, 0.32);
  animation: home-float 5s ease-in-out infinite;
}

.profile-card__name {
  display: block;
  margin-bottom: 8px;
  font-size: 1.1rem;
  font-weight: 800;
}

.profile-card p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.86rem;
  line-height: 1.7;
}

.profile-card__stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 18px;
}

.profile-card__stats span {
  padding: 10px;
  border-radius: 14px;
  background: rgba(59, 130, 246, 0.09);
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
}

.profile-card__stats strong {
  display: block;
  color: var(--vp-c-brand-1);
  font-size: 1.25rem;
}

.aside-links {
  display: grid;
  gap: 6px;
  padding: 14px;
  border-radius: 22px;
}

.aside-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 16px;
  color: inherit;
  text-decoration: none;
}

.aside-link:hover {
  background: rgba(59, 130, 246, 0.1);
  transform: translateX(4px);
}

.aside-link__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  border-radius: 13px;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: #fff;
  font-weight: 800;
}

.aside-link strong,
.aside-link em {
  display: block;
  font-style: normal;
}

.aside-link strong {
  font-size: 0.92rem;
}

.aside-link em {
  margin-top: 2px;
  color: var(--vp-c-text-3);
  font-size: 0.76rem;
}

.knowledge-section {
  min-width: 0;
}

.section-head {
  margin-bottom: 32px;
}

.section-kicker {
  display: inline-flex;
  width: fit-content;
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

.section-head h2 {
  margin: 0 0 8px;
  font-size: clamp(1.7rem, 3vw, 2.35rem);
  line-height: 1.18;
}

.section-head p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

.knowledge-list {
  display: grid;
  gap: 24px;
}

.knowledge-card {
  position: relative;
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr) auto;
  gap: 22px;
  align-items: center;
  height: 164px;
  padding: 0 22px 0 0;
  overflow: hidden;
  border-radius: 20px;
  color: inherit;
  text-decoration: none;
}

.knowledge-card:hover {
  transform: translateY(-4px);
  border-color: rgba(59, 130, 246, 0.32);
  box-shadow: 0 14px 38px rgba(59, 130, 246, 0.16);
}

.knowledge-card__media {
  height: 100%;
  overflow: hidden;
  clip-path: polygon(0 0, 92% 0, 78% 100%, 0 100%);
}

.knowledge-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s cubic-bezier(0.25, 0.8, 0.25, 1.2);
}

.knowledge-card:hover .knowledge-card__media img {
  transform: rotate(10deg) scale(1.08);
}

.knowledge-card__body {
  min-width: 0;
  max-height: 100%;
  overflow: hidden;
  padding: 22px 0;
}

.knowledge-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
  max-height: 24px;
  overflow: hidden;
}

.knowledge-card__meta span {
  padding: 3px 9px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.11);
  color: var(--vp-c-brand-1);
  font-size: 0.74rem;
  font-weight: 800;
}

.knowledge-card h3 {
  display: -webkit-box;
  margin: 0 0 8px;
  overflow: hidden;
  font-size: 1.22rem;
  line-height: 1.35;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  -webkit-text-fill-color: transparent;
}

.knowledge-card p {
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
  line-height: 1.7;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.knowledge-card__arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.1);
  color: var(--vp-c-brand-1);
  font-weight: 900;
  transition: transform 0.3s ease, background 0.3s ease;
}

.knowledge-card:hover .knowledge-card__arrow {
  background: var(--vp-c-brand-1);
  color: #fff;
  transform: translateX(4px);
}

.knowledge-card--reverse {
  grid-template-columns: auto minmax(0, 1fr) 220px;
  padding: 0 0 0 22px;
}

.knowledge-card--reverse .knowledge-card__media {
  order: 3;
  clip-path: polygon(14% 0, 100% 0, 100% 100%, 0% 100%);
}

.knowledge-card--reverse .knowledge-card__body {
  order: 2;
  padding-left: 0;
}

.knowledge-card--reverse .knowledge-card__arrow {
  order: 1;
}

.knowledge-card--reverse:hover .knowledge-card__arrow {
  transform: translateX(-4px);
}

@media (max-width: 900px) {
  .home-shell {
    grid-template-columns: 1fr;
  }

  .home-aside {
    position: static;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  }
}

@media (max-width: 700px) {
  .home-shell {
    padding-inline: 18px;
  }

  .home-aside {
    grid-template-columns: 1fr;
  }

  .knowledge-card,
  .knowledge-card--reverse {
    grid-template-columns: 120px minmax(0, 1fr);
    gap: 14px;
    height: 148px;
    padding: 0 14px 0 0;
  }

  .knowledge-card--reverse .knowledge-card__media {
    order: 0;
    clip-path: polygon(0 0, 92% 0, 78% 100%, 0 100%);
  }

  .knowledge-card--reverse .knowledge-card__body {
    order: 0;
  }

  .knowledge-card--reverse .knowledge-card__arrow,
  .knowledge-card__arrow {
    display: none;
  }
}
</style>
