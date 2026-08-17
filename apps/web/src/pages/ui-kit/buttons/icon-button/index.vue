<script lang="ts" setup>
import { DocPage } from '@dotdev/studio'

definePage({
  name: 'IconButton',
  meta: {
    icon: 'component-1',
    desc: 'A square button for a single <code>icon</code> action. Wraps <code>Button</code> with a fixed square layout, supporting all sizes, colors, and variants, plus loading, disabled, and link modes.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>