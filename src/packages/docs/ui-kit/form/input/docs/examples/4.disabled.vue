<script lang="ts" setup>
import { Input } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExpose({
  title: 'Disabled state',
  desc: `Use the <code>disabled</code> prop to prevent user interaction and display the input in a disabled state.`,
})

const value = ref<string>('')
</script>

<template>
  <Input v-model="value" disabled placeholder="Enter text..." variant="outlined" />
  <Input v-model="value" disabled placeholder="Enter text..." variant="subtle" />
  <Input v-model="value" disabled placeholder="Enter text..." variant="underlined" />
  <Input v-model="value" disabled placeholder="Enter text..." variant="plain" />
</template>
