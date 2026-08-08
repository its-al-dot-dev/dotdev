<script lang="ts" setup>
import { Button } from 'dotdev/ui-kit'

defineExpose({
  title: 'Basic usage',
  desc: `Pass a <code>label</code> or use the default slot to set the button content.`,
})
</script>

<template>
  <Button label="Submit" />
  <Button>Get Started</Button>
</template>