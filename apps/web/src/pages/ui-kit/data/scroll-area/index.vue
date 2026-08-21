<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import customScrollbar from './examples/custom-scrollbar.vue'
import horizontal from './examples/horizontal.vue'
import minThumbSize from './examples/min-thumb-size.vue'
import vertical from './examples/vertical.vue'

defineDocPage({
  title: 'ScrollArea',
  icon: 'frame',
  description: `A scrollable region with a custom scrollbar that appears on hover. Renders native scrolling with a custom thumb on the vertical or horizontal axis, supports thumb dragging, and exposes scoped slots for fully custom scrollbars.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Vertical scrolling',
      description: `A <code>ScrollArea</code> wraps scrollable content in a sized container. The custom thumb appears on the <code>vertical</code> axis when hovering the area and can be dragged; a native scrollbar is hidden in favor of the custom one.`,
      preview: vertical,
    },
    {
      title: 'Horizontal scrolling',
      description: `The custom thumb also supports the <code>horizontal</code> axis when content overflows horizontally.`,
      preview: horizontal,
    },
    {
      title: 'Custom scrollbar slot',
      description: `The <code>#scrollbar-y</code> and <code>#scrollbar-x</code> slots receive the computed thumb <code>size</code> and <code>offset</code>, so you can render a fully custom scrollbar.`,
      preview: customScrollbar,
    },
    {
      title: 'minThumbSize',
      description: `The <code>minThumbSize</code> prop (default <code>20</code>) prevents the thumb from disappearing on long content — compare a <code>20px</code> and a <code>60px</code> minimum.`,
      preview: minThumbSize,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
