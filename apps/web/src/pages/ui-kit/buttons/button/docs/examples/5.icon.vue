<script lang="ts" setup>
import { Button } from '@dotdev/ui-kit'

defineExample({
  title: 'Icons',
  desc: `Combine an <code>icon</code> with the button content. Use <code>iconPos</code> to place the icon before (<code>prefix</code>) or after (<code>suffix</code>) the label.`,
})
</script>

<template>
  <Button label="Download" icon="download" icon-pos="prefix" />
  <Button label="Continue" icon="arrow-right" icon-pos="suffix" />
  <Button icon="magnifying-glass" aria-label="Search" />
</template>