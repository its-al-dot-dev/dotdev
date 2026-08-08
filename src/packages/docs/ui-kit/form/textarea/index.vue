<script lang="ts" setup>
import { createDocConfig, DocPage } from 'dotdev/studio'
import { resolveDocs } from 'resolve-docs'

definePage({
  name: 'Textarea',
  meta: {
    icon: 'component-1',
    desc: 'A multi-line text input component driven by a controlled <code>v-model</code>. Supports different sizes, variants, validation states, and native attributes such as <code>placeholder</code> and <code>rows</code>.',
  },
})

const docs = resolveDocs('ui-kit/form/textarea')
const config = createDocConfig(docs)
</script>

<template>
  <DocPage :config="config" />
</template>
