<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ClickParticles from '../components/ClickParticles.vue'
import HomeHero from '../components/HomeHero.vue'
import HomeFeatures from '../components/HomeFeatures.vue'
import HomeIntroOverlay from '../components/HomeIntroOverlay.vue'
import { shouldPlayIntro, markIntroPlayed } from '../composables/useFirstVisitIntro'

const { Layout } = DefaultTheme
const route = useRoute()

const introKey = ref(0)
const playHomeIntro = ref(false)

const isHome = computed(() => route.path === '/' || route.path === '/index.html')

watch(
  isHome,
  (home) => {
    if (!home) {
      playHomeIntro.value = false
      return
    }
    if (typeof window === 'undefined') return
    if (!shouldPlayIntro()) return
    markIntroPlayed()
    introKey.value++
    playHomeIntro.value = true
  },
  { immediate: true },
)
</script>

<template>
  <Layout>
    <template #home-hero-before>
      <HomeHero />
    </template>
    <template #home-features-after>
      <HomeFeatures />
    </template>
    <template #layout-bottom>
      <HomeIntroOverlay v-if="playHomeIntro" :key="introKey" />
      <ClickParticles />
    </template>
  </Layout>
</template>
