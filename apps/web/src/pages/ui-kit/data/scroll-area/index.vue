<script lang="ts" setup>
import { DocPage } from '@dotdev/studio'

definePage({
  name: 'ScrollArea',
  meta: {
    icon: 'frame',
    desc: 'A scrollable region with a custom scrollbar that appears on hover. Renders native scrolling with a custom thumb on the vertical or horizontal axis, supports thumb dragging, and exposes scoped slots for fully custom scrollbars.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>
