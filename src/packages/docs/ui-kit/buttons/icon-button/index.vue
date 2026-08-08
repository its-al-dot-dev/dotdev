<script lang="ts" setup>
import { createDocConfig, DocPage } from 'dotdev/studio'
import { resolveDocs } from 'resolve-docs'

definePage({
  name: 'IconButton',
  meta: {
    icon: 'component-1',
    desc: 'A square button for a single <code>icon</code> action. Wraps <code>Button</code> with a fixed square layout, supporting all sizes, colors, and variants, plus loading, disabled, and link modes.',
  },
})

const docs = resolveDocs('ui-kit/buttons/icon-button')
const config = createDocConfig(docs)
</script>

<template>
  <DocPage :config="config" />
</template>