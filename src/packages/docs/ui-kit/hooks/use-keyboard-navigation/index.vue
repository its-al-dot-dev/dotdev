<script lang="ts" setup>
import { DocPage } from 'dotdev/studio'

definePage({
  name: 'useKeyboardNavigation',
  meta: {
    icon: 'code',
    desc: 'A composable that adds arrow-key navigation to a list or a grid of items. It tracks the current index, skips unavailable items, supports reactive columns and exposes boundary callbacks to wrap or clamp the focus at the edges.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>
