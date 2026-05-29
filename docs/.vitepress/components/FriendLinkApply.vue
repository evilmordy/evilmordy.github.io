<template>
  <section class="friend-apply">
    <header class="friend-apply__header">
      <h2 class="friend-apply__title">申请友链</h2>
      <p class="friend-apply__desc">
        填写站点信息，右侧会实时生成一段json字段。复制这个json字段将它发送至
        <a :href="`mailto:${config.email}`">{{ config.email }}</a>
        即可完成申请。
      </p>
      <ul class="friend-apply__requirements">
        <li v-for="(item, i) in config.requirements" :key="i">{{ item }}</li>
      </ul>
    </header>

    <div class="friend-apply__site-info">
      <span class="friend-apply__site-label">本站信息（互链参考）</span>
      <code class="friend-apply__site-code">{{ siteInfoText }}</code>
    </div>

    <div class="friend-apply__panels">
      <div class="friend-apply__panel friend-apply__panel--input">
        <h3 class="friend-apply__panel-title">填写信息</h3>
        <form class="friend-apply__form" @submit.prevent>
          <label
            v-for="field in config.fieldHints"
            :key="field.key"
            class="friend-apply__field"
          >
            <span class="friend-apply__label">{{ field.label }}</span>
            <span class="friend-apply__hint">{{ field.hint }}</span>
            <textarea
              v-if="field.multiline"
              v-model="form[field.key]"
              class="friend-apply__input friend-apply__input--textarea"
              :placeholder="field.placeholder"
              rows="3"
            />
            <input
              v-else
              v-model="form[field.key]"
              class="friend-apply__input"
              :placeholder="field.placeholder"
              :type="field.key === 'url' || field.key === 'img' ? 'url' : 'text'"
            />
          </label>
        </form>
      </div>

      <div class="friend-apply__panel friend-apply__panel--output">
        <h3 class="friend-apply__panel-title">生成代码</h3>
        <pre class="friend-apply__code"><code>{{ generatedCode }}</code></pre>
        <p v-if="!isComplete" class="friend-apply__tip">请填写全部字段后再复制或发送</p>
        <div class="friend-apply__actions">
          <button
            type="button"
            class="friend-apply__btn friend-apply__btn--secondary"
            :disabled="!isComplete"
            @click="copyCode"
          >
            {{ copied ? '已复制' : '复制代码' }}
          </button>
          <a
            class="friend-apply__btn friend-apply__btn--primary"
            :class="{ 'friend-apply__btn--disabled': !isComplete }"
            :href="isComplete ? mailtoLink : undefined"
            :aria-disabled="!isComplete"
            @click="onMailClick"
          >
            打开邮箱发送
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { FriendLink } from '../data/types'
import { friendLinkApplyConfig as config } from '../data/friendLinkApply'

const form = reactive<FriendLink>({
  name: '',
  url: '',
  img: '',
  summary: '',
})

const copied = ref(false)

function escapeTsString(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function buildEntry(link: FriendLink): string {
  return `{
  name: '${escapeTsString(link.name)}',
  url: '${escapeTsString(link.url)}',
  img: '${escapeTsString(link.img)}',
  summary: '${escapeTsString(link.summary)}',
},`
}

const isComplete = computed(() =>
  Object.values(form).every((value) => value.trim().length > 0),
)

const generatedCode = computed(() => {
  if (!isComplete.value) {
    return `{
  name: '...',
  url: 'https://...',
  img: 'https://...',
  summary: '...',
},`
  }
  return buildEntry(form)
})

const siteInfoText = computed(() => {
  const { name, url, img, summary } = config.siteInfo
  return `${name} | ${url} | ${img} | ${summary}`
})

const mailtoLink = computed(() => {
  const subject = encodeURIComponent(`友链申请 - ${form.name.trim()}`)
  const body = encodeURIComponent(
    `你好，我想申请友链，以下是我的站点信息：\n\n${generatedCode.value}\n\n请查收，谢谢！`,
  )
  return `mailto:${config.email}?subject=${subject}&body=${body}`
})

async function copyCode() {
  if (!isComplete.value) return
  try {
    await navigator.clipboard.writeText(generatedCode.value)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = generatedCode.value
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
  copied.value = true
  window.setTimeout(() => {
    copied.value = false
  }, 2000)
}

function onMailClick(event: MouseEvent) {
  if (!isComplete.value) event.preventDefault()
}
</script>

<style scoped>
.friend-apply {
  padding: 8px 0 32px;
  animation: fadeInUp 0.65s ease both;
}

.friend-apply__header {
  margin-bottom: 24px;
}

.friend-apply__title {
  margin: 0 0 12px;
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.friend-apply__desc {
  margin: 0 0 16px;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.friend-apply__desc code {
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 0.85em;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-brand-1);
}

.friend-apply__desc a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
}

.friend-apply__desc a:hover {
  text-decoration: underline;
}

.friend-apply__requirements {
  margin: 0;
  padding-left: 1.2em;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.friend-apply__site-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  padding: 14px 16px;
  border-radius: 12px;
  background: var(--vp-c-bg-alt);
  border: 1px solid rgba(59, 130, 246, 0.12);
}

.friend-apply__site-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.friend-apply__site-code {
  font-size: 0.8rem;
  line-height: 1.6;
  word-break: break-all;
  color: var(--vp-c-text-2);
}

.friend-apply__panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.friend-apply__panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid rgba(59, 130, 246, 0.12);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: border-color 0.35s ease, box-shadow 0.35s ease;
}

.friend-apply__panel:focus-within {
  border-color: rgba(96, 165, 250, 0.35);
  box-shadow: 0 8px 28px rgba(59, 130, 246, 0.12);
}

.friend-apply__panel-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.friend-apply__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.friend-apply__field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.friend-apply__label {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.friend-apply__hint {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.friend-apply__input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(59, 130, 246, 0.18);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  line-height: 1.5;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  box-sizing: border-box;
}

.friend-apply__input:focus {
  outline: none;
  border-color: rgba(96, 165, 250, 0.55);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
}

.friend-apply__input--textarea {
  resize: vertical;
  min-height: 72px;
  font-family: inherit;
}

.friend-apply__code {
  flex: 1;
  margin: 0;
  padding: 16px;
  border-radius: 12px;
  background: var(--vp-c-bg-alt);
  border: 1px solid rgba(59, 130, 246, 0.1);
  overflow-x: auto;
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
  font-size: 0.82rem;
  line-height: 1.65;
  color: var(--vp-c-text-1);
  white-space: pre;
}

.friend-apply__tip {
  margin: 0;
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
}

.friend-apply__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.friend-apply__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.friend-apply__btn--primary {
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: #fff;
}

.friend-apply__btn--primary:hover:not(.friend-apply__btn--disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.35);
}

.friend-apply__btn--secondary {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.friend-apply__btn--secondary:hover:not(:disabled) {
  border-color: rgba(96, 165, 250, 0.55);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
}

.friend-apply__btn:disabled,
.friend-apply__btn--disabled {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
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

@media (max-width: 768px) {
  .friend-apply__panels {
    grid-template-columns: 1fr;
  }
}
</style>
