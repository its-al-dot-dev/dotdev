<script lang="ts" setup>
import { Group, IconButton } from '@dotdev/ui-kit'
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
