<script lang="ts" setup>
import { DocPage } from '@dotdev/studio'

definePage({
  name: 'Breadcrumbs',
  meta: {
    icon: 'component-1',
    desc: 'A navigation trail that shows the current page location. Renders each item as a link or a plain segment, with a text or icon <code>separator</code>, per-item icons and scoped slots. Scales with the parent font size.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>
