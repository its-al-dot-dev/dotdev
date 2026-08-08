<script lang="ts" setup>
import { createDocConfig, DocPage } from 'dotdev/studio'
import { resolveDocs } from 'resolve-docs'

definePage({
  name: 'ListBox',
  meta: {
    icon: 'component-1',
    desc: 'An accessible list of selectable options rendered as a native listbox. Supports single and multiple selection, custom value/label keys, deselection, and per-option disabling via a controlled <code>v-model</code>.',
  },
})
const docs = resolveDocs('ui-kit/form/listbox')
const config = createDocConfig(docs)
</script>

<template>
  <DocPage :config="config" />
</template>
