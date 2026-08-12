<script lang="ts" setup>
import { Group, IconButton } from 'dotdev/ui-kit'

defineExpose({
  title: 'Icon button group',
  desc: `Use <code>Group</code> to combine <code>IconButton</code> with related controls for a compact toolbar.`,
})
</script>

<template>
  <Group>
    <IconButton icon="pencil-1" variant="soft" />
    <IconButton icon="copy" variant="soft" />
    <IconButton icon="trash" variant="soft" />
  </Group>
  <Group class="-space-x-px">
    <IconButton icon="minus" variant="outlined" />
    <IconButton icon="plus" variant="outlined" />
  </Group>
</template>
