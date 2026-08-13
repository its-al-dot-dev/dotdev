<script lang="ts" setup>
import { DocPage } from 'dotdev/studio'

definePage({
  name: 'createUiKit',
  meta: {
    icon: 'gear',
    desc: 'A Vue plugin that provides the global UI kit config through <code>app.provide()</code>. Install it once at the app root with <code>app.use()</code> to set a BEM namespace and per-component default props.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>
