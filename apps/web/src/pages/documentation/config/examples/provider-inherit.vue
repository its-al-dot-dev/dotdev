<script lang="ts" setup>
import { Icon, UiKitProvider } from '@dotdev/ui-kit'
</script>

<template>
  <UiKitProvider namespace="app">
    <div class="flex items-center gap-4">
      <Icon name="bell" />
      <Icon name="gear" />
      <Icon name="home" />
    </div>
  </UiKitProvider>
</template>
