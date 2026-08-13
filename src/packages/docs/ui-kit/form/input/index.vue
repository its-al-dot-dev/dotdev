<script lang="ts" setup>
import { DocPage } from 'dotdev/studio'

definePage({
  name: 'Input',
  meta: {
    icon: 'component-1',
    desc: 'A flexible text input component with support for different sizes, variants, validation states, and controlled values via <code>v-model</code>. Designed for building accessible forms with consistent styling and customization options.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>
