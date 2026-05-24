<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import ClickParticles from '../components/ClickParticles.vue'
import HomeHero from '../components/HomeHero.vue'
import HomeFeatures from '../components/HomeFeatures.vue'

const { Layout } = DefaultTheme
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
      <ClickParticles />
    </template>
  </Layout>
</template>
