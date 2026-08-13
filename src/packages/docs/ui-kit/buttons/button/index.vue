<script lang="ts" setup>
import { DocPage } from 'dotdev/studio'

definePage({
  name: 'Button',
  meta: {
    icon: 'component-1',
    desc: 'A versatile button component supporting multiple sizes, colors, and variants. Can render as a native <code>button</code> or an anchor link, with optional icons, loading and disabled states.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>
