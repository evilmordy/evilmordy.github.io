<template>
  <p v-if="date" class="doc-note-date">
    <time :datetime="date">{{ formatNoteDate(date) }}</time>
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { formatNoteDate, normalizeFrontmatterDate } from '../data/noteDate'

const { frontmatter } = useData()
const date = computed(() => normalizeFrontmatterDate(frontmatter.value.date))
</script>

<style scoped>
.doc-note-date {
  margin: 0 0 14px;
}

.doc-note-date time {
  display: inline-flex;
  padding: 5px 14px;
  border: 1px solid rgba(59, 130, 246, 0.18);
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.1);
  color: var(--vp-c-brand-1);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.03em;
}
</style>
