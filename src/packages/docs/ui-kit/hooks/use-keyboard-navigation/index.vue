<script lang="ts" setup>
import { createDocConfig, DocPage } from 'dotdev/studio'
import { resolveDocs } from 'resolve-docs'

definePage({
  name: 'useKeyboardNavigation',
  meta: {
    icon: 'keyboard',
    desc: 'A composable that adds arrow-key navigation to a list or a grid of items. It tracks the current index, skips unavailable items, supports reactive columns and exposes boundary callbacks to wrap or clamp the focus at the edges.',
  },
})

const docs = resolveDocs('ui-kit/hooks/use-keyboard-navigation')
const config = createDocConfig(docs)
</script>

<template>
  <DocPage :config="config" />
</template>
