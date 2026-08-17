<script lang="ts" setup>
import { IconButton } from '@dotdev/ui-kit'

defineExample({
  title: 'Sizes',
  desc: `Use the <code>size</code> prop to adjust the icon button dimensions. Available sizes are <code>sm</code>, <code>md</code>, and <code>lg</code>.`,
})
</script>

<template>
  <IconButton icon="download" size="sm" />
  <IconButton icon="download" size="md" />
  <IconButton icon="download" size="lg" />
</template>