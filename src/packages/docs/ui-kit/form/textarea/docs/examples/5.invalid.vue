<script lang="ts" setup>
import { Textarea } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExpose({
  title: 'Invalid state',
  desc: `Use the <code>invalid</code> prop to visually indicate a validation error state. This works with all textarea variants.`,
})

const value = ref<string>('')
</script>

<template>
  <Textarea v-model="value" invalid placeholder="Enter text..." variant="outlined" />
  <Textarea v-model="value" invalid placeholder="Enter text..." variant="subtle" />
  <Textarea v-model="value" invalid placeholder="Enter text..." variant="underlined" />
  <Textarea v-model="value" invalid placeholder="Enter text..." variant="plain" />
</template>
