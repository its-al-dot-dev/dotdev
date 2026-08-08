<script lang="ts" setup>
import { Button } from 'dotdev/ui-kit'

defineExpose({
  title: 'Variants',
  desc: `Use the <code>variant</code> prop to change the visual style. Available variants are <code>solid</code>, <code>outlined</code>, <code>ghost</code>, <code>subtle</code>, and <code>text</code>.`,
})
</script>

<template>
  <Button label="Solid" variant="solid" />
  <Button label="Outlined" variant="outlined" />
  <Button label="Subtle" variant="subtle" />
  <Button label="Ghost" variant="ghost" />
  <Button label="Text" variant="text" />
</template>
