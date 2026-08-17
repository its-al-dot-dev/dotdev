<script lang="ts" setup>
import { DocPage } from '@dotdev/studio'

definePage({
  name: 'Message',
  meta: {
    icon: 'info-circled',
    desc: 'A lightweight banner that combines an icon, a title, and a body message. Comes in soft and plain variants across six colors, with an optional border.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>
