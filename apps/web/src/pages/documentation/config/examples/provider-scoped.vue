<script lang="ts" setup>
import { Button, UiKitProvider } from '@dotdev/ui-kit'
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
