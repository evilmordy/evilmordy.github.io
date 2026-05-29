<template>
  <div
    v-if="visible"
    class="home-intro-overlay"
    :style="{ opacity: overlayOpacity }"
  >
    <HomeBubbleStarfield
      @progress="onProgress"
      @intro-complete="onIntroComplete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import HomeBubbleStarfield from './HomeBubbleStarfield.vue'
import {
  startHomeIntro,
  setHomeRevealProgress,
  finishHomeIntro,
} from '../composables/useHomeIntro'

const visible = ref(true)

let removeTimer = 0

const overlayOpacity = computed(() => {
  const p = progress.value
  if (p <= 0.55) return 1
  return 1 - (p - 0.55) / 0.45
})

const progress = ref(0)

function onProgress(value: number) {
  progress.value = value
  setHomeRevealProgress(value)
}

function onIntroComplete() {
  finishHomeIntro()
  document.body.classList.remove('home-intro-active')

  removeTimer = window.setTimeout(() => {
    visible.value = false
  }, 400)
}

onMounted(() => {
  startHomeIntro()
  document.body.classList.add('home-intro-active')
})

onUnmounted(() => {
  clearTimeout(removeTimer)
  document.body.classList.remove('home-intro-active')
})
</script>

<style scoped>
.home-intro-overlay {
  position: fixed;
  inset: 0;
  z-index: 110;
  pointer-events: auto;
  cursor: pointer;
  transition: opacity 0.4s ease;
}
</style>
