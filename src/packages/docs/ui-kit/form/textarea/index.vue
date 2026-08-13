<script lang="ts" setup>
import { DocPage } from 'dotdev/studio'

definePage({
  name: 'Textarea',
  meta: {
    icon: 'component-1',
    desc: 'A multi-line text input component driven by a controlled <code>v-model</code>. Supports different sizes, variants, validation states, and native attributes such as <code>placeholder</code> and <code>rows</code>.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>
