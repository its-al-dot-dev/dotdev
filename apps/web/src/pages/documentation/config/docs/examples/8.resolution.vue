<script lang="ts" setup>
import { Button, UiKitProvider } from '@dotdev/ui-kit'

defineExample({
  title: 'Resolution order',
  desc: `Props resolve in this order: <code>1)</code> local prop, <code>2)</code> config default (from <code>createUiKit</code>), <code>3)</code> component default. <code>UiKitProvider</code> only overrides the namespace for its subtree.`,
})
</script>

<template>
  <UiKitProvider namespace="d">
    <Button label="1 · Local prop" color="warning" />
    <Button label="2 · Config default" />
    <Button label="3 · Component default" size="xs" color="neutral" variant="ghost" />
  </UiKitProvider>
</template>
