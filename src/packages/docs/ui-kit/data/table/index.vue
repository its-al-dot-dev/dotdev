<script lang="ts" setup>
import { DocPage } from 'dotdev/studio'

definePage({
  name: 'Table',
  meta: {
    icon: 'table',
    desc: 'A data table built from row, header, and cell primitives. Renders native <code>&lt;table&gt;</code> semantics with hairline separators, a row hover state, selected rows, and an optional sticky header for scrollable regions.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>
