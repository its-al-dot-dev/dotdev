<script lang="ts" setup>
import { Input } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExpose({
  title: 'Variants',
  desc: `Use the <code>variant</code> prop to control the visual style of the input. Available variants are <code>outlined</code>, <code>subtle</code>, <code>underlined</code>, and <code>plain</code>.`,
})

const value = ref<string>('')
</script>

<template>
  <Input v-model="value" placeholder="Enter text..." variant="outlined" />
  <Input v-model="value" placeholder="Enter text..." variant="subtle" />
  <Input v-model="value" placeholder="Enter text..." variant="underlined" />
  <Input v-model="value" placeholder="Enter text..." variant="plain" />
</template>
