<script lang="ts" setup>
import { IconButton } from 'dotdev/ui-kit'

defineExample({
  title: 'Disabled state',
  desc: `Use the <code>disabled</code> prop to prevent interaction and display the button in a disabled state.`,
})
</script>

<template>
  <IconButton icon="download" disabled />
  <IconButton icon="download" variant="solid" color="primary" disabled />
  <IconButton icon="trash" variant="outlined" color="danger" disabled />
</template>