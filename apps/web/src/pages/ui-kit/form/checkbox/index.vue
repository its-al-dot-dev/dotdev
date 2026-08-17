<script lang="ts" setup>
import { DocPage } from '@dotdev/studio'

definePage({
  name: 'Checkbox',
  meta: {
    icon: 'component-1',
    desc: 'A toggleable checkbox driven by a controlled <code>v-model</code>. Supports different sizes and variants as well as disabled and invalid states, with an accessible native input underneath.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>
