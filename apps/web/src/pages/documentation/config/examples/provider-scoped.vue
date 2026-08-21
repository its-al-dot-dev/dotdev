<script lang="ts" setup>
import { Button, UiKitProvider } from '@dotdev/ui-kit'
</script>

<template>
  <UiKitProvider namespace="d">
    <Button label="Workbench namespace" />

    <UiKitProvider namespace="landing">
      <Button label="Landing namespace" />
    </UiKitProvider>

    <Button label="Back to workbench" />
  </UiKitProvider>
</template>
