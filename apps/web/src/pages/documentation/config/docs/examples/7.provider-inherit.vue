<script lang="ts" setup>
import { Icon, UiKitProvider } from '@dotdev/ui-kit'

defineExample({
  title: 'Provider only changes namespace',
  desc: `The provider only overrides the BEM namespace — all other config from <code>createUiKit()</code> in <code>main.ts</code> (icons, defaults) still applies inside its subtree.`,
})
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
