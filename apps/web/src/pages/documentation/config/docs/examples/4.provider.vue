<script lang="ts" setup>
import { Button, UiKitProvider } from '@dotdev/ui-kit'

defineExample({
  title: 'Override namespace for a subtree',
  desc: `Wrap any part of the tree with <code>UiKitProvider</code> and pass <code>namespace</code> to use a different BEM prefix for that subtree.`,
})
</script>

<template>
  <UiKitProvider namespace="app">
    <Button label="Namespaced button" />
  </UiKitProvider>
</template>
