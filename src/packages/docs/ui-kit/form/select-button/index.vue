<script lang="ts" setup>
import { DocPage } from 'dotdev/studio'

definePage({
  name: 'SelectButton',
  meta: {
    icon: 'component-1',
    desc: 'A segmented set of mutually exclusive toggle buttons driven by a controlled <code>v-model</code>. Supports single and multiple selection, object options via custom value/label keys, deselection, and per-option disabling.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>
