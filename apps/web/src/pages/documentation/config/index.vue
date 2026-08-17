<script lang="ts" setup>
import { DocPage } from '@dotdev/studio'
import examplesMeta from './examples.json'

definePage({
  name: 'Config',
  meta: {
    icon: 'gear',
    desc: 'Global UI kit configuration. Install app-wide defaults once with <code>createUiKit()</code> and override them for a subtree with <code>UiKitProvider</code> — nested providers merge into the outer config by default.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
    examplesMeta,
  },
})
</script>

<template>
  <DocPage />
</template>
