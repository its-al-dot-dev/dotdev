<script lang="ts" setup>
import { createDocConfig, DocPage } from 'dotdev/studio'
import { resolveDocs } from 'resolve-docs'

definePage({
  name: 'Tag',
  meta: {
    icon: 'component-1',
    desc: 'A compact label for categorizing and marking content. Supports multiple sizes, a rounded style, optional prefix and suffix icons, and custom content via slots.',
  },
})

const docs = resolveDocs('data/tag')
const config = createDocConfig(docs)
</script>

<template>
  <DocPage :config="config" />
</template>
