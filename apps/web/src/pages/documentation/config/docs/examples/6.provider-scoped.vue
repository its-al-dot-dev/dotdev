<script lang="ts" setup>
import { Button, UiKitProvider } from '@dotdev/ui-kit'

defineExample({
  title: 'Nested scopes',
  desc: `A nested <code>UiKitProvider</code> merges into the outer config — props it does not set are inherited from the parent scope. Set <code>:merge="false"</code> to replace the outer config and start over from the defaults.`,
})
</script>

<template>
  <UiKitProvider :config="{ components: { button: { color: 'primary', size: 'md' } } }">
    <Button label="Primary md" />

    <UiKitProvider :config="{ components: { button: { color: 'success' } } }">
      <Button label="Success, inherits size" />
    </UiKitProvider>

    <UiKitProvider :merge="false" :config="{ components: { button: { color: 'danger' } } }">
      <Button label="Danger, resets size" />
    </UiKitProvider>

    <Button label="Primary md again" />
  </UiKitProvider>
</template>
