<script lang="ts" setup>
import { DocPage } from '@dotdev/studio'

definePage({
  name: 'Tag',
  meta: {
    icon: 'component-1',
    desc: 'A compact label for categorizing and marking content. Supports six semantic colors, soft and solid variants, a rounded style, optional prefix and suffix icons, and custom content via slots.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>
