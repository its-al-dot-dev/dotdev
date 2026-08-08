<script lang="ts" setup>
import { createDocConfig, DocPage } from 'dotdev/studio'
import { resolveDocs } from 'resolve-docs'

definePage({
  name: 'Input',
  meta: {
    icon: 'component-1',
    desc: 'A flexible text input component with support for different sizes, variants, validation states, and controlled values via <code>v-model</code>. Designed for building accessible forms with consistent styling and customization options.',
  },
})

const docs = resolveDocs('ui-kit/form/input')
const config = createDocConfig(docs)
</script>

<template>
  <DocPage :config="config" />
</template>
