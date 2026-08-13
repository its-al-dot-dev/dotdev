<script lang="ts" setup>
import { DocPage } from 'dotdev/studio'

definePage({
  name: 'UiKitProvider',
  meta: {
    icon: 'component-1',
    desc: 'A component that provides the global UI kit config for a subtree. Pass the <code>config</code> (or just the <code>namespace</code>) and every component inside resolves its missing props from it.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>
