<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import grid from './examples/grid.vue'
import list from './examples/list.vue'

defineDocPage({
  title: 'useKeyboardNavigation',
  icon: 'code',
  description: `A composable that adds arrow-key navigation to a list or a grid of items. It tracks the current index, skips unavailable items, supports reactive columns and exposes boundary callbacks to wrap or clamp the focus at the edges.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'List navigation',
      description: `Navigate a single-column list with <code>ArrowUp</code> / <code>ArrowDown</code>. Use <code>isSkipped</code> to mark items as unfocusable, e.g. disabled ones.`,
      preview: list,
    },
    {
      title: 'Grid navigation',
      description: `Navigate a multi-column grid in all four directions with <code>columns</code>. Use <code>edgeX</code> / <code>edgeY: "auto"</code> to wrap around the edges, <code>isSkipped</code> to disable individual cells and boundary callbacks to observe edge crossings.`,
      preview: grid,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
