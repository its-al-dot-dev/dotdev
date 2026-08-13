<script lang="ts" setup>
import { DocPage } from 'dotdev/studio'

definePage({
  name: 'Select',
  meta: {
    icon: 'component-1',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>
