<script lang="ts" setup>
import { IconButton } from 'dotdev/ui-kit'

defineExample({
  title: 'Loading state',
  desc: `Set the <code>loading</code> prop to display a spinner and prevent further interaction. The button is rendered as disabled while loading.`,
})
</script>

<template>
  <IconButton icon="download" loading />
  <IconButton icon="download" variant="solid" color="primary" loading />
</template>