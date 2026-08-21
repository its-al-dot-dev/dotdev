<script lang="ts" setup>
import { Button, UiKitProvider } from '@dotdev/ui-kit'
</script>

<template>
  <UiKitProvider namespace="d">
    <Button label="1 · Local prop" color="warning" />
    <Button label="2 · Config default" />
    <Button label="3 · Component default" size="xs" color="neutral" variant="ghost" />
  </UiKitProvider>
</template>
