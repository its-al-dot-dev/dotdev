<script lang="ts" setup>
import { Button } from 'dotdev/ui-kit'

defineExpose({
  title: 'Disabled state',
  desc: `Use the <code>disabled</code> prop to prevent interaction and display the button in a disabled state. This works across all variants.`,
})
</script>

<template>
  <Button label="Solid" disabled />
  <Button label="Outlined" variant="outlined" disabled />
  <Button label="Ghost" variant="ghost" disabled />
  <Button label="Subtle" variant="subtle" disabled />
  <Button label="Text" variant="text" disabled />
</template>