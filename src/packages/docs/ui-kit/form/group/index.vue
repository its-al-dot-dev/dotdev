<script lang="ts" setup>
import { DocPage } from 'dotdev/studio'

definePage({
  name: 'Group',
  meta: {
    icon: 'component-1',
    desc: 'A flexible container for grouping related form controls. Supports horizontal (x) and vertical (y) layouts with optional attached addons for prefixes, suffixes, or actions.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>