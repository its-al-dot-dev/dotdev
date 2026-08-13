<script lang="ts" setup>
import { Button, UiKitProvider } from 'dotdev/ui-kit'

defineExample({
  title: 'Nested overrides',
  desc: `A nested <code>UiKitProvider</code> replaces the config only for its subtree. Components outside the nested provider keep the outer config.`,
})
</script>

<template>
  <UiKitProvider :config="{ components: { button: { color: 'primary', size: 'md' } } }">
    <Button label="Primary default" />

    <UiKitProvider :config="{ components: { button: { color: 'success', size: 'lg' } } }">
      <Button label="Success default" />
    </UiKitProvider>

    <Button label="Primary default again" />
  </UiKitProvider>
</template>
