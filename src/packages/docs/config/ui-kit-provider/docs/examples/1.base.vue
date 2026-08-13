<script lang="ts" setup>
import { Button, UiKitProvider } from 'dotdev/ui-kit'

defineExample({
  title: 'Provide config for a subtree',
  desc: `Wrap any part of the tree — the whole app or a single form — with <code>UiKitProvider</code> and pass the <code>config</code>.`,
})
</script>

<template>
  <UiKitProvider :config="{ components: { button: { size: 'lg', variant: 'soft' } } }">
    <Button label="Large soft" />
    <Button label="Overridden locally" color="danger" size="sm" />
  </UiKitProvider>
</template>
