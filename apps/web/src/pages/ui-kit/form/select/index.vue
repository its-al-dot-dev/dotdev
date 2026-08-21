<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'

defineDocPage({
  title: 'Select',
  icon: 'component-1',
  description: '',
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [],
})
</script>

<template>
  <DocPage />
</template>
