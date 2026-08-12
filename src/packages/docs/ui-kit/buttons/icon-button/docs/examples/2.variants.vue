<script lang="ts" setup>
import { IconButton } from 'dotdev/ui-kit'

defineExpose({
  title: 'Variants',
  desc: `Use the <code>variant</code> prop to change the visual style. Available variants are <code>solid</code>, <code>outlined</code>, <code>ghost</code>, <code>soft</code>, and <code>text</code>.`,
})
</script>

<template>
  <IconButton icon="download" variant="solid" />
  <IconButton icon="download" variant="outlined" />
  <IconButton icon="download" variant="ghost" />
  <IconButton icon="download" variant="soft" />
  <IconButton icon="download" variant="text" />
</template>