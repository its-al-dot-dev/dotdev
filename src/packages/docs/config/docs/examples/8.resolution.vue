<script lang="ts" setup>
import { Button, UiKitProvider } from 'dotdev/ui-kit'

defineExample({
  title: 'Resolution order',
  desc: `Props resolve in this order: <code>1)</code> local prop, <code>2)</code> config default (from <code>UiKitProvider</code> or <code>createUiKit</code>), <code>3)</code> component default.`,
})
</script>

<template>
  <UiKitProvider :merge="false" :config="{ components: { button: { color: 'danger', size: 'lg' } } }">
    <Button label="1 · Local prop" color="warning" />
    <Button label="2 · Config default" />
  </UiKitProvider>

  <UiKitProvider :merge="false">
    <Button label="3 · Component default" />
  </UiKitProvider>
</template>
