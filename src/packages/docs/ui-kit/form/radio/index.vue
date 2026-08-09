<script lang="ts" setup>
import { createDocConfig, DocPage } from 'dotdev/studio'
import { resolveDocs } from 'resolve-docs'

definePage({
  name: 'Radio',
  meta: {
    icon: 'component-1',
    desc: 'A radio button driven by a controlled <code>v-model</code>. Supports different sizes and variants as well as disabled and invalid states, with an accessible native input underneath.',
  },
})

const docs = resolveDocs('ui-kit/form/radio')
const config = createDocConfig(docs)
</script>

<template>
  <DocPage :config="config" />
</template>
