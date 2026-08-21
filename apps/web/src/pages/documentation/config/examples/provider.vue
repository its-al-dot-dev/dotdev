<script lang="ts" setup>
import { Button, UiKitProvider } from '@dotdev/ui-kit'
</script>

<template>
  <UiKitProvider namespace="app">
    <Button label="Namespaced button" />
  </UiKitProvider>
</template>
