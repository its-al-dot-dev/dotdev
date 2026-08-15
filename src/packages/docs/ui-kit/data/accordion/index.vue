<script lang="ts" setup>
import { DocPage } from 'dotdev/studio'

definePage({
  name: 'Accordion',
  meta: {
    icon: 'stack',
    desc: 'A vertically stacked list of interactive headers that reveal or hide associated content panels. Supports single or multiple open panels, four visual variants, and scoped slots for custom headers and content.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>