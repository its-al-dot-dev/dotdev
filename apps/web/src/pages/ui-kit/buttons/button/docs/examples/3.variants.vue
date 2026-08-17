<script lang="ts" setup>
import { Button } from '@dotdev/ui-kit'

defineExample({
  title: 'Variants',
  desc: `Use the <code>variant</code> prop to change the visual style. Available variants are <code>solid</code>, <code>outlined</code>, <code>ghost</code>, <code>soft</code>, and <code>text</code>.`,
})
</script>

<template>
  <Button label="Solid" variant="solid" />
  <Button label="Outlined" variant="outlined" />
  <Button label="Soft" variant="soft" />
  <Button label="Ghost" variant="ghost" />
  <Button label="Text" variant="text" />
</template>
