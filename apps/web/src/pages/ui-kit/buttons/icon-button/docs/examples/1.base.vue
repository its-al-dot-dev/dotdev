<script lang="ts" setup>
import { IconButton } from '@dotdev/ui-kit'

defineExample({
  title: 'Basic usage',
  desc: `An <code>IconButton</code> renders a single <code>icon</code> inside a square. It defaults to the <code>ghost</code> variant and <code>neutral</code> color.`,
})
</script>

<template>
  <IconButton icon="download" />
  <IconButton icon="magnifying-glass" />
  <IconButton icon="dots-horizontal" />
  <IconButton icon="trash" />
</template>