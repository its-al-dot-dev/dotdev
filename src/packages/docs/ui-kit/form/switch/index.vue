<script lang="ts" setup>
import { createDocConfig, DocPage } from 'dotdev/studio'
import { resolveDocs } from 'resolve-docs'

definePage({
  name: 'Switch',
  meta: {
    icon: 'component-1',
    desc: 'A toggle switch component driven by a controlled <code>v-model</code>. Supports <code>outlined</code> and <code>soft</code> variants as well as disabled and invalid states for accessible forms.',
  },
})

const docs = resolveDocs('ui-kit/form/switch')
const config = createDocConfig(docs)
</script>

<template>
  <DocPage :config="config" />
</template>
