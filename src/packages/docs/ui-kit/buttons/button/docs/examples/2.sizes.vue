<script lang="ts" setup>
import { Button } from 'dotdev/ui-kit'

defineExpose({
  title: 'Sizes',
  desc: `Use the <code>size</code> prop to adjust the button dimensions. Available sizes are <code>sm</code>, <code>md</code>, and <code>lg</code>.`,
})
</script>

<template>
  <Button label="Small" size="sm" />
  <Button label="Medium" size="md" />
  <Button label="Large" size="lg" />
</template>