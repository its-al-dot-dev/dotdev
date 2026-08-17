<script lang="ts" setup>
import { DocPage } from '@dotdev/studio'

definePage({
  name: 'Icon',
  meta: {
    icon: 'component-1',
    desc: 'A flexible icon component that renders SVG icons from the global icon registry (provided via <code>createUiKit</code>). Supports custom components via <code>is</code> prop and any SVG component via <code>name</code>.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>