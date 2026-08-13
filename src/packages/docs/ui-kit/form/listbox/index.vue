<script lang="ts" setup>
import { DocPage } from 'dotdev/studio'

definePage({
  name: 'ListBox',
  meta: {
    icon: 'component-1',
    desc: 'An accessible list of selectable options rendered as a native listbox. Supports single and multiple selection, custom value/label keys, deselection, and per-option disabling via a controlled <code>v-model</code>.',
    examples: import.meta.glob('./docs/examples/*.vue', { eager: true, import: 'default' }),
    sources: import.meta.glob('./docs/examples/*.vue', { query: '?raw', eager: true, import: 'default' }),
  },
})
</script>

<template>
  <DocPage />
</template>
