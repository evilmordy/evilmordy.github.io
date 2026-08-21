<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, useId, watch } from 'vue'
import { useData } from 'vitepress'
import type mermaidApi from 'mermaid'

const props = defineProps<{
  code: string
}>()

type View = 'diagram' | 'source'

const { isDark } = useData()
const uid = useId()
const view = ref<View>('diagram')
const svg = ref('')
const error = ref('')
const loading = ref(true)
const copied = ref(false)
const container = ref<HTMLElement | null>(null)

const source = computed(() => {
  try {
    return decodeURIComponent(props.code)
  } catch {
    return props.code
  }
})

let renderSeq = 0
let mermaid: typeof mermaidApi | null = null
let copyTimer: ReturnType<typeof setTimeout> | undefined

async function loadMermaid() {
  if (!mermaid) {
    const mod = await import('mermaid')
    mermaid = mod.default
  }
  return mermaid
}

async function renderDiagram() {
  if (typeof window === 'undefined') return

  const seq = ++renderSeq
  error.value = ''
  loading.value = true

  try {
    const api = await loadMermaid()
    if (seq !== renderSeq) return

    api.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      suppressErrorRendering: true,
      theme: isDark.value ? 'dark' : 'default',
      fontFamily:
        'ui-sans-serif, system-ui, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
      flowchart: {
        htmlLabels: true,
        curve: 'basis',
      },
    })

    const id = `mermaid-${seq}-${Math.random().toString(36).slice(2, 9)}`
    const { svg: rendered, bindFunctions } = await api.render(id, source.value)
    if (seq !== renderSeq) return

    svg.value = rendered
    loading.value = false
    await nextTick()
    if (seq !== renderSeq) return
    if (container.value && bindFunctions) bindFunctions(container.value)
  } catch (e) {
    if (seq !== renderSeq) return
    loading.value = false
    svg.value = ''
    error.value = e instanceof Error ? e.message : String(e)
  }
}

function setView(next: View) {
  view.value = next
}

function onTabKey(event: KeyboardEvent) {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
  event.preventDefault()
  setView(view.value === 'diagram' ? 'source' : 'diagram')
  void nextTick(() => {
    const tabId =
      view.value === 'diagram' ? `${uid}-tab-diagram` : `${uid}-tab-source`
    document.getElementById(tabId)?.focus()
  })
}

async function copySource() {
  try {
    await navigator.clipboard.writeText(source.value)
  } catch {
    const area = document.createElement('textarea')
    area.value = source.value
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.left = '-9999px'
    document.body.appendChild(area)
    area.select()
    document.execCommand('copy')
    document.body.removeChild(area)
  }
  copied.value = true
  if (copyTimer) clearTimeout(copyTimer)
  copyTimer = setTimeout(() => {
    copied.value = false
  }, 1600)
}

onMounted(() => {
  void renderDiagram()
  watch([source, isDark], () => {
    void renderDiagram()
  })
})

onUnmounted(() => {
  renderSeq += 1
  if (copyTimer) clearTimeout(copyTimer)
})
</script>

<template>
  <div
    class="mermaid-block"
    :class="{
      'is-source': view === 'source',
      'is-diagram': view === 'diagram',
      'is-dark': isDark,
      'is-error': Boolean(error),
      'is-loading': loading && !error && view === 'diagram',
    }"
  >
    <div class="mermaid-block__inner">
      <div class="mermaid-block__toolbar">
        <div
          class="mermaid-block__tabs"
          role="tablist"
          aria-label="Mermaid 视图切换"
        >
          <button
            :id="`${uid}-tab-diagram`"
            type="button"
            role="tab"
            class="mermaid-block__tab"
            :class="{ 'is-active': view === 'diagram' }"
            :aria-selected="view === 'diagram'"
            :aria-controls="`${uid}-diagram`"
            :tabindex="view === 'diagram' ? 0 : -1"
            @click="setView('diagram')"
            @keydown="onTabKey"
          >
            <svg class="mermaid-block__icon" viewBox="0 0 16 16" aria-hidden="true">
              <rect x="1.5" y="1.5" width="5.5" height="4.5" rx="1" />
              <rect x="9" y="10" width="5.5" height="4.5" rx="1" />
              <path d="M4.25 6v2.25h7.5V10" />
            </svg>
            mermaid图
          </button>
          <button
            :id="`${uid}-tab-source`"
            type="button"
            role="tab"
            class="mermaid-block__tab"
            :class="{ 'is-active': view === 'source' }"
            :aria-selected="view === 'source'"
            :aria-controls="`${uid}-source`"
            :tabindex="view === 'source' ? 0 : -1"
            @click="setView('source')"
            @keydown="onTabKey"
          >
            <svg class="mermaid-block__icon" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M6 3.5 2.5 8 6 12.5M10 3.5 13.5 8 10 12.5" />
            </svg>
            mermaid源码
          </button>
        </div>
        <button
          type="button"
          class="mermaid-block__copy"
          :class="{ 'is-copied': copied }"
          :title="copied ? '已复制' : '复制 mermaid 源码'"
          :aria-label="copied ? '已复制' : '复制 mermaid 源码'"
          @click="copySource"
        >
          <svg v-if="!copied" class="mermaid-block__icon" viewBox="0 0 16 16" aria-hidden="true">
            <rect x="5.5" y="5.5" width="8" height="9" rx="1.4" />
            <path d="M10.5 5.5V4.2A1.7 1.7 0 0 0 8.8 2.5H3.7A1.7 1.7 0 0 0 2 4.2v7.1A1.7 1.7 0 0 0 3.7 13h1.8" />
          </svg>
          <svg v-else class="mermaid-block__icon" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3.5 8.3 6.4 11.2 12.5 4.8" />
          </svg>
        </button>
      </div>

      <div
        :id="`${uid}-diagram`"
        class="mermaid-block__panel mermaid-block__panel--diagram"
        role="tabpanel"
        :hidden="view !== 'diagram'"
        :aria-labelledby="`${uid}-tab-diagram`"
      >
        <div v-if="error" class="mermaid-diagram__error">
          <p>Mermaid 渲染失败：{{ error }}</p>
          <pre><code>{{ source }}</code></pre>
        </div>
        <div
          v-else
          ref="container"
          class="mermaid-diagram__svg"
          v-html="svg"
        />
      </div>

      <div
        :id="`${uid}-source`"
        class="mermaid-block__panel mermaid-block__panel--source"
        role="tabpanel"
        :hidden="view !== 'source'"
        :aria-labelledby="`${uid}-tab-source`"
      >
        <slot>
          <pre class="mermaid-block__fallback"><code>{{ source }}</code></pre>
        </slot>
      </div>
    </div>
  </div>
</template>
