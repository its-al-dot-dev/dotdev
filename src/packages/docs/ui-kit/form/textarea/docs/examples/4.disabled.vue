<script lang="ts" setup>
import { Textarea } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExpose({
  title: 'Disabled state',
  desc: `Use the <code>disabled</code> prop to prevent user interaction and display the textarea in a disabled state.`,
})

const value = ref<string>('')
</script>

<template>
  <Textarea v-model="value" disabled placeholder="Enter text..." variant="outlined" />
  <Textarea v-model="value" disabled placeholder="Enter text..." variant="subtle" />
  <Textarea v-model="value" disabled placeholder="Enter text..." variant="underlined" />
  <Textarea v-model="value" disabled placeholder="Enter text..." variant="plain" />
</template>
