<script lang="ts" setup>
import { createDocConfig, DocPage } from 'dotdev/studio'
import { resolveDocs } from 'resolve-docs'

definePage({
  name: 'Button',
  meta: {
    icon: 'component-1',
    desc: 'A versatile button component supporting multiple sizes, colors, and variants. Can render as a native <code>button</code> or an anchor link, with optional icons, loading and disabled states.',
  },
})

const docs = resolveDocs('ui-kit/buttons/button')
const config = createDocConfig(docs)
</script>

<template>
  <DocPage :config="config" />
</template>