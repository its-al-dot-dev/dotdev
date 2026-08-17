<script lang="ts" setup>
import { DocPage } from '@dotdev/studio'

definePage({
  name: 'Switch',
  meta: {
    icon: 'component-1',
    desc: 'A toggle switch component driven by a controlled <code>v-model</code>. Supports <code>outlined</code> and <code>soft</code> variants as well as disabled and invalid states for accessible forms.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>
