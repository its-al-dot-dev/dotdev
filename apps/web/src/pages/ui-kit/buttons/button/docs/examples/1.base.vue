<script lang="ts" setup>
import { Button, UiKitProvider } from '@dotdev/ui-kit'

defineExample({
  title: 'Basic usage',
  desc: `Pass a <code>label</code> or use the default slot to set the button content.`,
})
</script>

<template>
  <Button label="Submit" />

  <UiKitProvider namespace="landing">
    <Button icon="chevron-down">Get Started</Button>
  </UiKitProvider>
</template>
