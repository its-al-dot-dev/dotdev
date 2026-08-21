<script lang="ts" setup>
import { Button, UiKitProvider } from '@dotdev/ui-kit'
</script>

<template>
  <Button label="Submit" />

  <UiKitProvider namespace="landing">
    <Button icon="chevron-down">Get Started</Button>
  </UiKitProvider>
</template>
