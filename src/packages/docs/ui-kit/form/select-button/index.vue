<script lang="ts" setup>
import { createDocConfig, DocPage } from 'dotdev/studio'
import { resolveDocs } from 'resolve-docs'

definePage({
  name: 'SelectButton',
  meta: {
    icon: 'component-1',
    desc: 'A segmented set of mutually exclusive toggle buttons driven by a controlled <code>v-model</code>. Supports single and multiple selection, object options via custom value/label keys, deselection, and per-option disabling.',
  },
})

const docs = resolveDocs('ui-kit/form/select-button')
const config = createDocConfig(docs)
</script>

<template>
  <DocPage :config="config" />
</template>
