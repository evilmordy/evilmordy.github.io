<template>
  <ClientOnly>
    <button
      type="button"
      class="fancy-toggle"
      :class="{ 'fancy-toggle--on': fancyEnabled }"
      :aria-pressed="fancyEnabled"
      :title="fancyEnabled ? '关闭流光边框等装饰效果' : '开启流光边框等装饰效果'"
      @click="toggleFancy"
    >
      <span class="fancy-toggle__icon" aria-hidden="true">✦</span>
      <span class="fancy-toggle__label fancy-toggle__label--full">
        {{ fancyEnabled ? '花里胡哨开' : '花里胡哨关' }}
      </span>
      <span class="fancy-toggle__label fancy-toggle__label--short">
        {{ fancyEnabled ? '花哨开' : '花哨关' }}
      </span>
    </button>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useFancyEffects } from '../composables/useFancyEffects'

const { fancyEnabled, toggleFancy } = useFancyEffects()
</script>

<style scoped>
.fancy-toggle {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.76rem;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    box-shadow 0.25s ease;
}

.fancy-toggle__icon {
  font-size: 0.72rem;
  line-height: 1;
  opacity: 0.85;
}

.fancy-toggle__label--short {
  display: none;
}

.fancy-toggle:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-2);
  background: var(--vp-c-brand-soft);
}

.fancy-toggle--on {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.fancy-toggle--on .fancy-toggle__icon {
  opacity: 1;
}

:global(.VPNavBar.home) .fancy-toggle {
  border-color: rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.88);
}

:global(.VPNavBar.home) .fancy-toggle:hover,
:global(.VPNavBar.home) .fancy-toggle--on {
  border-color: rgba(147, 187, 253, 0.75);
  background: rgba(59, 130, 246, 0.22);
  color: #fff;
}

@media (max-width: 960px) {
  .fancy-toggle {
    padding: 4px 8px;
    font-size: 0.72rem;
  }

  .fancy-toggle__label--full {
    display: none;
  }

  .fancy-toggle__label--short {
    display: inline;
  }
}
</style>
