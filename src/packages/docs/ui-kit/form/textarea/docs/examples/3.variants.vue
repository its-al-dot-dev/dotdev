<script lang="ts" setup>
import { Textarea } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExpose({
  title: 'Variants',
  desc: `Use the <code>variant</code> prop to control the visual style. Available variants are <code>outlined</code>, <code>soft</code>, <code>underlined</code>, and <code>plain</code>.`,
})

const value = ref<string>('')
</script>

<template>
  <Textarea v-model="value" placeholder="Enter text..." variant="outlined" />
  <Textarea v-model="value" placeholder="Enter text..." variant="soft" />
  <Textarea v-model="value" placeholder="Enter text..." variant="underlined" />
  <Textarea v-model="value" placeholder="Enter text..." variant="plain" />
</template>
