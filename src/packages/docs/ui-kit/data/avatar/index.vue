<script lang="ts" setup>
import { createDocConfig, DocPage } from 'dotdev/studio'
import { resolveDocs } from 'resolve-docs'

definePage({
  name: 'Avatar',
  meta: {
    icon: 'component-1',
    desc: 'A circular avatar that renders an image, a text label, or an icon. Supports multiple sizes, an optional border, and custom content via the default slot.',
  },
})

const docs = resolveDocs('data/avatar')
const config = createDocConfig(docs)
</script>

<template>
  <DocPage :config="config" />
</template>
