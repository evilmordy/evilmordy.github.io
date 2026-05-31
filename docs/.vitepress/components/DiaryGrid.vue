<template>
  <div class="diary-page">
  <!-- 工具栏：统计 + 搜索 + 筛选 -->
  <div class="diary-toolbar">
    <!-- 统计 -->
    <div class="diary-stats">
      共 <strong>{{ stats.count }}</strong> 篇
      <span v-if="stats.yearSpan > 0">· 跨越 <strong>{{ stats.yearSpan }}</strong> 个年份</span>
      <span v-if="filteredEntries.length !== sortedEntries.length" class="diary-stats__hint">
        （已筛选）
      </span>
    </div>

    <!-- 搜索 + 清除 -->
    <div class="diary-controls">
      <div class="diary-search">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="搜索标题、正文或标签..."
          aria-label="搜索日记"
        />
      </div>

      <button
        v-if="searchTerm || selectedYears.size || selectedTags.size"
        class="diary-btn diary-btn--ghost"
        @click="clearFilters"
      >
        清除筛选
      </button>

      <button class="diary-btn diary-btn--accent" @click="openRandom" :disabled="filteredEntries.length === 0">
        🎲 随机翻开
      </button>
    </div>

    <!-- 年份芯片 -->
    <div v-if="availableYears.length > 1" class="diary-filter-group">
      <span class="diary-filter-label">年份</span>
      <div class="diary-chips">
        <button
          v-for="year in availableYears"
          :key="year"
          class="diary-chip"
          :class="{ 'diary-chip--active': selectedYears.has(year) }"
          @click="toggleYear(year)"
        >
          {{ year }}
        </button>
        <button
          v-if="selectedYears.size"
          class="diary-chip diary-chip--jump"
          @click="scrollToYear(Array.from(selectedYears)[0])"
        >
          跳转
        </button>
      </div>
    </div>

    <!-- 标签芯片 -->
    <div v-if="availableTags.length" class="diary-filter-group">
      <span class="diary-filter-label">标签</span>
      <div class="diary-chips diary-chips--tags">
        <button
          v-for="tag in availableTags"
          :key="tag"
          class="diary-chip diary-chip--tag"
          :class="{ 'diary-chip--active': selectedTags.has(tag) }"
          @click="toggleTag(tag)"
        >
          #{{ tag }}
        </button>
      </div>
    </div>
  </div>

  <!-- 空状态 -->
  <div v-if="filteredEntries.length === 0" class="diary-empty">
    <p>没有找到匹配的日记…</p>
    <button class="diary-btn diary-btn--ghost" @click="clearFilters">清除所有筛选</button>
  </div>

  <!-- 时间线主体 -->
  <div ref="timelineRef" class="diary-timeline" :class="{ 'diary-timeline--filtered': filteredEntries.length !== sortedEntries.length }">
    <article
      v-for="(entry, i) in filteredEntries"
      :key="entry.date + (entry.title ?? '')"
      class="diary-item"
      :data-diary-date="entry.date"
      :style="{ animationDelay: `${Math.min(i * 0.09, 0.6)}s` }"
      data-reveal
    >
      <!-- 干净的时间轴圆点（绝不承载emoji，保持几何小尺寸） -->
      <span
        class="diary-item__dot"
        aria-hidden="true"
      />

      <div class="diary-item__main">
        <div class="diary-item__date-row">
          <time class="diary-item__date" :datetime="entry.date">
            {{ formatDate(entry.date) }}
          </time>

          <!-- 精致的心情指示器（日期旁极小emoji，参考Anzhiyu/Butterfly社区“干净时间轴”做法） -->
          <span
            v-if="entry.mood"
            class="diary-item__mood-indicator"
            :title="`心情：${entry.mood}`"
          >{{ entry.mood }}</span>

          <!-- 邮戳式小装饰 -->
          <span class="diary-item__stamp" aria-hidden="true">JOURNAL</span>
        </div>

        <!-- 图片区（保留原有 shine 特效） -->
        <div v-if="entry.img" class="diary-item__media" @click="openEntry(entry)">
          <div class="diary-item__img-box">
            <img
              :src="entry.img"
              :alt="entry.title ?? '日记配图'"
              class="diary-item__img"
            />
            <div class="diary-item__shine" aria-hidden="true" />
          </div>
        </div>

        <!-- 卡片主体（可点击打开详情） -->
        <div class="diary-item__card" @click="openEntry(entry)">
          <h3 v-if="entry.title" class="diary-item__title">{{ entry.title }}</h3>
          <p class="diary-item__content">{{ entry.content }}</p>

          <!-- 标签与阅读提示 -->
          <div class="diary-item__meta">
            <div v-if="entry.tags && entry.tags.length" class="diary-item__tags">
              <span
                v-for="tag in entry.tags"
                :key="tag"
                class="diary-item__tag"
                @click.stop="toggleTag(tag)"
              >
                #{{ tag }}
              </span>
            </div>
            <span class="diary-item__readmore">阅读全文 →</span>
          </div>
        </div>
      </div>
    </article>

    <!-- 时间轴结尾装饰 -->
    <div v-if="filteredEntries.length > 0" class="diary-end">
      <span>—— 记录仍在继续 ——</span>
    </div>
  </div>

  <!-- 详情弹窗 -->
  <EntryModal
    v-model:visible="showModal"
    :entry="selectedEntry"
    :entries="filteredEntries"
    @navigate="handleNavigate"
  />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { DiaryEntry } from '../data/types'
import { getDiaryEntries } from '../data/diary'
import EntryModal from './EntryModal.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

// 响应式筛选状态
const searchTerm = ref('')
const selectedYears = ref<Set<string>>(new Set())
const selectedTags = ref<Set<string>>(new Set())

// 模态框状态
const showModal = ref(false)
const selectedEntry = ref<DiaryEntry | null>(null)

// 从真实 Markdown 文件加载的数据（构建时解析）
const allEntries = ref<DiaryEntry[]>([])

// 原始排序（最新在前）
const sortedEntries = computed(() =>
  [...allEntries.value].sort((a, b) => b.date.localeCompare(a.date)),
)

// 过滤后的条目（搜索 + 年份 + 标签 AND）
const filteredEntries = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()
  const years = selectedYears.value
  const tags = selectedTags.value

  return sortedEntries.value.filter((entry) => {
    // 搜索匹配（标题、正文、标签）
    const matchesSearch =
      !term ||
      (entry.title && entry.title.toLowerCase().includes(term)) ||
      entry.content.toLowerCase().includes(term) ||
      (entry.tags && entry.tags.some((t) => t.toLowerCase().includes(term)))

    // 年份匹配
    const entryYear = entry.date.slice(0, 4)
    const matchesYear = years.size === 0 || years.has(entryYear)

    // 标签匹配（必须包含所有已选标签）
    const matchesTags =
      tags.size === 0 ||
      (entry.tags && Array.from(tags).every((tag) => entry.tags!.includes(tag)))

    return matchesSearch && matchesYear && matchesTags
  })
})

// 可用年份（按出现顺序去重）
const availableYears = computed(() => {
  const years = new Set<string>()
  sortedEntries.value.forEach((e) => years.add(e.date.slice(0, 4)))
  return Array.from(years)
})

// 可用标签（统计出现次数并排序）
const availableTags = computed(() => {
  const count = new Map<string, number>()
  sortedEntries.value.forEach((e) => {
    e.tags?.forEach((t) => {
      count.set(t, (count.get(t) || 0) + 1)
    })
  })
  return Array.from(count.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag)
})

// 统计信息
const stats = computed(() => {
  const years = new Set(filteredEntries.value.map((e) => e.date.slice(0, 4)))
  return {
    count: filteredEntries.value.length,
    yearSpan: years.size,
  }
})

// 切换年份芯片
function toggleYear(year: string) {
  const set = selectedYears.value
  if (set.has(year)) {
    set.delete(year)
  } else {
    set.add(year)
  }
  // 触发响应
  selectedYears.value = new Set(set)
}

// 切换标签
function toggleTag(tag: string) {
  const set = selectedTags.value
  if (set.has(tag)) {
    set.delete(tag)
  } else {
    set.add(tag)
  }
  selectedTags.value = new Set(set)
}

// 清除所有筛选
function clearFilters() {
  searchTerm.value = ''
  selectedYears.value = new Set()
  selectedTags.value = new Set()
}

// 随机翻开（从当前过滤结果中挑一条）
function openRandom() {
  if (filteredEntries.value.length === 0) return
  const randomIndex = Math.floor(Math.random() * filteredEntries.value.length)
  openEntry(filteredEntries.value[randomIndex])
}

// 打开指定条目详情
function openEntry(entry: DiaryEntry) {
  selectedEntry.value = entry
  showModal.value = true
}

// 年份快速跳转（滚动到该年份第一条可见记录）
function scrollToYear(year: string) {
  const firstOfYear = filteredEntries.value.find((e) => e.date.startsWith(year))
  if (!firstOfYear) return

  const el = document.querySelector(
    `[data-diary-date="${firstOfYear.date}"]`,
  ) as HTMLElement | null
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    // 轻微高亮提示
    el.classList.add('diary-item--highlight')
    setTimeout(() => el.classList.remove('diary-item--highlight'), 1400)
  }
}

// 关闭模态框
function closeModal() {
  showModal.value = false
}

// 模态框内上下篇导航
function handleNavigate(newEntry: DiaryEntry) {
  selectedEntry.value = newEntry
}

// 格式化日期
function formatDate(date: string): string {
  const [year, month, day] = date.split('-')
  return `${year} 年 ${Number(month)} 月 ${Number(day)} 日`
}

// 挂载滚动揭示
const timelineRef = ref<HTMLElement | null>(null)

onMounted(() => {
  // 从 Markdown 文件加载日记数据（构建时已解析）
  allEntries.value = getDiaryEntries()

  if (timelineRef.value) {
    // useScrollReveal 内部会查找 [data-reveal]
  }
})

useScrollReveal(timelineRef)
</script>

<style scoped>
/* ========== 工具栏 ========== */
.diary-toolbar {
  max-width: 760px;
  margin: 0 auto 20px;
  padding: 0 4px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.diary-stats {
  font-size: 0.92rem;
  color: var(--vp-c-text-2);
  padding-bottom: 4px;
}
.diary-stats strong {
  color: var(--vp-c-brand-1);
  font-weight: 700;
}
.diary-stats__hint {
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
}

.diary-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.diary-search {
  flex: 1;
  min-width: 180px;
}
.diary-search input {
  width: 100%;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid rgba(59, 130, 246, 0.22);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.diary-search input:focus {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
}

.diary-btn {
  padding: 7px 16px;
  border-radius: 999px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}
.diary-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}
.diary-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.diary-btn--ghost {
  background: transparent;
  border-color: transparent;
  color: var(--vp-c-text-2);
}
.diary-btn--accent {
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
  border-color: transparent;
}
.diary-btn--accent:hover:not(:disabled) {
  filter: brightness(1.08);
  color: white;
}

.diary-filter-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
.diary-filter-label {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  margin-right: 4px;
}
.diary-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.diary-chip {
  font-size: 0.78rem;
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.15s ease;
}
.diary-chip:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.diary-chip--active {
  background: rgba(59, 130, 246, 0.12);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.diary-chip--tag {
  font-size: 0.74rem;
  padding: 3px 10px;
}
.diary-chip--jump {
  font-size: 0.72rem;
  padding: 3px 9px;
  opacity: 0.85;
}

/* ========== 时间线核心（保留并增强） ========== */
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
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.08);
  transition: opacity 0.3s;
}

/* 关闭花里胡哨时简化线条 */
html.fancy-effects-off .diary-timeline::before {
  box-shadow: none;
  background: linear-gradient(180deg, var(--vp-c-brand-1), rgba(96, 165, 250, 0.35));
}

.diary-item {
  position: relative;
  padding: 0 0 40px 24px;
  animation: fadeInUp 0.65s ease both;
  opacity: 0;
}
.diary-item[data-reveal] {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}
.diary-item.is-visible {
  opacity: 1;
  transform: none;
}

.diary-item:last-child {
  padding-bottom: 0;
}

/* 时间轴圆点（干净几何小尺寸，绝不承载emoji） */
.diary-item__dot {
  position: absolute;
  left: -28px;
  top: 6px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  z-index: 1;
}

.diary-item__main {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.diary-item__date-row {
  display: flex;
  align-items: center;
  gap: 10px;
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

/* 邮戳装饰 */
.diary-item__stamp {
  font-size: 0.62rem;
  letter-spacing: 1.5px;
  padding: 1px 7px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-radius: 3px;
  color: rgba(59, 130, 246, 0.55);
  transform: rotate(-8deg);
  font-weight: 700;
  user-select: none;
}

/* 精致的心情指示器（日期旁极小emoji，参考Anzhiyu说说社区做法）
   - 极小尺寸 + 柔和不透明度，不抢时间线风头
   - 轻微旋转增加二次元可爱感
   - hover 微放大
*/
.diary-item__mood-indicator {
  font-size: 0.95rem;
  line-height: 1;
  opacity: 0.85;
  transform: rotate(-4deg);
  transition: transform 0.2s ease, opacity 0.2s ease;
  cursor: default;
  user-select: none;
}
.diary-item__mood-indicator:hover {
  opacity: 1;
  transform: rotate(0deg) scale(1.15);
}

/* fancy-effects-off 时更收敛 */
html.fancy-effects-off .diary-item__mood-indicator {
  opacity: 0.7;
  transform: none;
}

.diary-item__media {
  width: 100%;
  max-width: 520px;
  cursor: pointer;
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
  cursor: pointer;
}

.diary-item:hover .diary-item__card {
  border-color: rgba(96, 165, 250, 0.28);
  box-shadow: 0 8px 28px rgba(59, 130, 246, 0.1);
}

/* 卡片内纸张纹理（无图条目更明显） */
.diary-item__card:not(:has(.diary-item__media)) {
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 23px,
      rgba(59, 130, 246, 0.045) 23px,
      rgba(59, 130, 246, 0.045) 24px
    );
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

.diary-item__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
  gap: 8px;
}

.diary-item__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.diary-item__tag {
  font-size: 0.7rem;
  padding: 1px 8px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.1);
  color: var(--vp-c-brand-1);
  border: 1px solid rgba(59, 130, 246, 0.16);
  cursor: pointer;
  transition: all 0.15s ease;
}
.diary-item__tag:hover {
  background: rgba(59, 130, 246, 0.18);
  transform: translateY(-1px);
}

.diary-item__readmore {
  font-size: 0.74rem;
  color: var(--vp-c-brand-1);
  opacity: 0.75;
  white-space: nowrap;
}

.diary-item:hover .diary-item__readmore {
  opacity: 1;
}

/* 高亮动画（年份跳转用） */
.diary-item--highlight .diary-item__card {
  animation: highlightPulse 1.4s ease;
}

@keyframes highlightPulse {
  0%, 100% { box-shadow: 0 8px 28px rgba(59, 130, 246, 0.1); }
  40% { box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.18); }
}

/* 时间轴末尾 */
.diary-end {
  text-align: center;
  margin-top: 12px;
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  letter-spacing: 1px;
}

/* 空状态 */
.diary-empty {
  max-width: 760px;
  margin: 40px auto;
  text-align: center;
  color: var(--vp-c-text-2);
}
.diary-empty p {
  margin-bottom: 12px;
}

/* 筛选时线条稍淡 */
.diary-timeline--filtered::before {
  opacity: 0.7;
}

/* 关闭花里胡哨时降低装饰强度 */
html.fancy-effects-off .diary-item__stamp {
  opacity: 0.6;
}
html.fancy-effects-off .diary-item__card:not(:has(.diary-item__media)) {
  background-image: none;
}

/* 原有动画保留 */
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

/* 响应式 */
@media (max-width: 640px) {
  .diary-toolbar {
    padding: 0;
  }
  .diary-controls {
    flex-direction: column;
    align-items: stretch;
  }
  .diary-search {
    min-width: 100%;
  }

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

  .diary-item__meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
}
</style>
