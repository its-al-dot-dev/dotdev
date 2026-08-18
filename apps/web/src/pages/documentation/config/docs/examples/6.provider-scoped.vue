<script lang="ts" setup>
import { Button, UiKitProvider } from '@dotdev/ui-kit'

defineExample({
  title: 'Nested namespaces',
  desc: `A nested <code>UiKitProvider</code> can set a different <code>namespace</code> for its subtree. The outer namespace remains active outside the provider.`,
})
</script>

<template>
  <UiKitProvider namespace="d">
    <Button label="Default namespace" />

    <UiKitProvider namespace="app">
      <Button label="App namespace" />
    </UiKitProvider>

    <Button label="Back to default" />
  </UiKitProvider>
</template>
