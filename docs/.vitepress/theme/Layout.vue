<!--
  ============================================
  Layout.vue — 自定义布局壳
  把 ClickParticles 注入到所有页面，
  同时在 home-hero-before 注入背景装饰
  ============================================
-->
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import ClickParticles from '../components/ClickParticles.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <!-- 全局：鼠标点击粒子动效 -->
    <template #layout-bottom>
      <ClickParticles />
    </template>
  </Layout>
</template>
