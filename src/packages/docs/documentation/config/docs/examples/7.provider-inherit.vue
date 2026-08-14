<script lang="ts" setup>
import { Icon, UiKitProvider } from 'dotdev/ui-kit'

defineExample({
  title: 'Keeps the outer config',
  desc: `The provider merges into the outer config, so app-level defaults keep working inside its subtree. Here icons from <code>createUiKit()</code> in <code>main.ts</code> still resolve under the provider.`,
})
</script>

<template>
  <UiKitProvider :config="{ components: { button: { size: 'lg' } } }">
    <div class="flex items-center gap-4">
      <Icon name="bell" />
      <Icon name="gear" />
      <Icon name="home" />
    </div>
  </UiKitProvider>
</template>
