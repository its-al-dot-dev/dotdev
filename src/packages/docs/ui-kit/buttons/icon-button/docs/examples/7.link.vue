<script lang="ts" setup>
import { IconButton } from 'dotdev/ui-kit'

defineExample({
  title: 'Link mode',
  desc: `Pass an <code>href</code> to render the icon button as an anchor link. Use <code>target</code> to control where the link opens.`,
})
</script>

<template>
  <IconButton icon="external-link" variant="outlined" href="https://example.com" target="_blank" />
  <IconButton icon="github-logo" variant="ghost" href="https://github.com" target="_blank" />
</template>