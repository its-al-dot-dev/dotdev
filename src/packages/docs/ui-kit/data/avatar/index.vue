<script lang="ts" setup>
import { DocPage } from 'dotdev/studio'

definePage({
  name: 'Avatar',
  meta: {
    icon: 'component-1',
    desc: 'A circular or square avatar that renders an image, a text label, or an icon. Supports six semantic colors, soft and solid variants, multiple sizes, an optional border, and custom content via the default slot.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>
