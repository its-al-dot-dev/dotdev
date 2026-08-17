<script lang="ts" setup>
import { DocPage } from '@dotdev/studio'

definePage({
  name: 'Divider',
  meta: {
    icon: 'border-dashed',
    desc: 'A separator that splits content horizontally or vertically. Renders as a single line or with a centered label, in solid, dashed, or dotted styles across six colors.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>
