<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="visible && entry"
        class="entry-modal"
        @keydown.esc="close"
        tabindex="-1"
      >
        <!-- 遮罩 -->
        <div class="entry-modal__backdrop" @click="close" />

        <!-- 面板 -->
        <div class="entry-modal__panel" @click.stop>
          <!-- 头部 -->
          <div class="entry-modal__header">
            <div class="entry-modal__meta">
              <span class="entry-modal__date">{{ formatDate(entry.date) }}</span>
              <span v-if="entry.mood" class="entry-modal__mood" aria-hidden="true">{{ entry.mood }}</span>
            </div>
            <button
              class="entry-modal__close"
              @click="close"
              aria-label="关闭详情"
            >
              ✕
            </button>
          </div>

          <!-- 大图 -->
          <div v-if="entry.img" class="entry-modal__media">
            <div class="entry-modal__img-box">
              <img :src="entry.img" :alt="entry.title || '日记配图'" />
              <div class="entry-modal__shine" aria-hidden="true" />
            </div>
          </div>

          <!-- 标题 -->
          <h2 v-if="entry.title" class="entry-modal__title">{{ entry.title }}</h2>

          <!-- 正文 -->
          <div class="entry-modal__content" v-html="formattedContent" />

          <!-- 标签 -->
          <div v-if="entry.tags && entry.tags.length" class="entry-modal__tags">
            <span
              v-for="tag in entry.tags"
              :key="tag"
              class="entry-modal__tag"
            >
              #{{ tag }}
            </span>
          </div>

          <!-- 底部操作区 -->
          <div class="entry-modal__footer">
            <button class="entry-modal__btn" @click="copyContent">
              📋 复制全文
            </button>

            <div class="entry-modal__nav">
              <button
                class="entry-modal__btn entry-modal__btn--nav"
                :disabled="!hasPrev"
                @click="goPrev"
              >
                ← 上一篇
              </button>
              <button
                class="entry-modal__btn entry-modal__btn--nav"
                :disabled="!hasNext"
                @click="goNext"
              >
                下一篇 →
              </button>
            </div>

            <button class="entry-modal__btn entry-modal__btn--ghost" @click="close">
              关闭
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue'
import type { DiaryEntry } from '../data/types'

const props = defineProps<{
  visible: boolean
  entry: DiaryEntry | null
  entries: DiaryEntry[] // 当前筛选后的完整列表（已排序）
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'navigate', entry: DiaryEntry): void
}>()

// 格式化日期（与 DiaryGrid 保持一致）
function formatDate(date: string): string {
  const [year, month, day] = date.split('-')
  return `${year} 年 ${Number(month)} 月 ${Number(day)} 日`
}

// 处理正文换行 + 安全渲染
const formattedContent = computed(() => {
  if (!props.entry) return ''
  return props.entry.content
    .split('\n')
    .map(line => line.trim() ? `<p>${escapeHtml(line)}</p>` : '<br>')
    .join('')
})

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// 当前条目在列表中的索引（用于上下篇）
const currentIndex = computed(() => {
  if (!props.entry || !props.entries.length) return -1
  return props.entries.findIndex(e => e.date === props.entry!.date && e.content === props.entry!.content)
})

const hasPrev = computed(() => currentIndex.value > 0)
const hasNext = computed(() => currentIndex.value >= 0 && currentIndex.value < props.entries.length - 1)

// 关闭
function close() {
  emit('update:visible', false)
}

// 复制全文
async function copyContent() {
  if (!props.entry) return
  const text = `${formatDate(props.entry.date)}\n${props.entry.title ? props.entry.title + '\n' : ''}${props.entry.content}`
  try {
    await navigator.clipboard.writeText(text)
    // 简单提示（可用更优雅的 toast，后续可扩展）
    const btns = document.querySelectorAll('.entry-modal__btn')
    const originalTexts = new Map<Element, string>()
    btns.forEach(btn => {
      if (btn.textContent?.includes('复制')) {
        originalTexts.set(btn, btn.textContent)
        btn.textContent = '✓ 已复制'
        setTimeout(() => {
          if (btn && originalTexts.has(btn)) {
            btn.textContent = originalTexts.get(btn) || '📋 复制全文'
          }
        }, 1400)
      }
    })
  } catch (e) {
    // 兜底：提示用户手动复制
    alert('复制失败，请手动选择文本复制')
  }
}

// 上一篇
function goPrev() {
  const idx = currentIndex.value
  if (idx > 0) {
    emit('navigate', props.entries[idx - 1])
  }
}

// 下一篇
function goNext() {
  const idx = currentIndex.value
  if (idx >= 0 && idx < props.entries.length - 1) {
    emit('navigate', props.entries[idx + 1])
  }
}

// ESC 监听 + 打开时锁定滚动
let escHandler: ((e: KeyboardEvent) => void) | null = null

function lockScroll() {
  document.body.style.overflow = 'hidden'
  document.body.classList.add('entry-modal-open')
}

function unlockScroll() {
  document.body.style.overflow = ''
  document.body.classList.remove('entry-modal-open')
}

watch(() => props.visible, (val) => {
  if (val) {
    lockScroll()
    // 下一帧聚焦面板，便于键盘操作
    setTimeout(() => {
      const panel = document.querySelector<HTMLElement>('.entry-modal__panel')
      panel?.focus()
    }, 50)
  } else {
    unlockScroll()
  }
})

// 全局 ESC（仅当弹窗打开时有效）
onMounted(() => {
  escHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.visible) {
      close()
    }
  }
  window.addEventListener('keydown', escHandler)
})

onUnmounted(() => {
  if (escHandler) window.removeEventListener('keydown', escHandler)
  unlockScroll()
})
</script>

<style scoped>
.entry-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.entry-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(10, 22, 40, 0.65);
  backdrop-filter: blur(6px);
}

.entry-modal__panel {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 720px;
  max-height: calc(100vh - 48px);
  background: var(--vp-c-bg);
  border-radius: 20px;
  border: 1px solid rgba(59, 130, 246, 0.18);
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.25);
  overflow: auto;
  padding: 28px 32px 24px;
  outline: none;
}

.entry-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.entry-modal__meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.entry-modal__date {
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.entry-modal__mood {
  font-size: 1.35rem;
  line-height: 1;
}

.entry-modal__close {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.entry-modal__close:hover {
  background: rgba(59, 130, 246, 0.15);
  color: var(--vp-c-brand-1);
}

.entry-modal__media {
  margin: 12px 0 20px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(59, 130, 246, 0.12);
}

.entry-modal__img-box {
  position: relative;
  height: 320px;
}

.entry-modal__img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.entry-modal__shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.18) 0%,
    transparent 55%
  );
  opacity: 0.6;
  pointer-events: none;
}

.entry-modal__title {
  margin: 0 0 14px;
  font-size: 1.45rem;
  font-weight: 700;
  line-height: 1.35;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.entry-modal__content {
  font-size: 0.96rem;
  line-height: 1.85;
  color: var(--vp-c-text-1);
  margin-bottom: 18px;
}

.entry-modal__content p {
  margin: 0.65em 0;
}

.entry-modal__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.entry-modal__tag {
  font-size: 0.78rem;
  padding: 3px 11px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.1);
  color: var(--vp-c-brand-1);
  border: 1px solid rgba(59, 130, 246, 0.18);
}

.entry-modal__footer {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
}

.entry-modal__btn {
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.entry-modal__btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}

.entry-modal__btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.entry-modal__btn--ghost {
  background: transparent;
  border-color: transparent;
}

.entry-modal__nav {
  display: flex;
  gap: 8px;
}

/* 过渡动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .entry-modal__panel,
.modal-leave-active .entry-modal__panel {
  transition: transform 0.28s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .entry-modal__panel,
.modal-leave-to .entry-modal__panel {
  transform: translateY(24px) scale(0.985);
  opacity: 0;
}

/* 移动端适配 */
@media (max-width: 640px) {
  .entry-modal {
    padding: 12px;
  }
  .entry-modal__panel {
    padding: 20px 18px 16px;
    max-height: calc(100vh - 24px);
    border-radius: 16px;
  }
  .entry-modal__img-box {
    height: 220px;
  }
  .entry-modal__title {
    font-size: 1.25rem;
  }
  .entry-modal__footer {
    flex-direction: column;
    align-items: stretch;
  }
  .entry-modal__nav {
    order: -1;
    justify-content: space-between;
  }
}
</style>