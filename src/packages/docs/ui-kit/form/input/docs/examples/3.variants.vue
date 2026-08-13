<script lang="ts" setup>
import { Input } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Variants',
  desc: `Use the <code>variant</code> prop to control the visual style of the input. Available variants are <code>outlined</code>, <code>soft</code>, <code>underlined</code>, and <code>plain</code>.`,
})

const value = ref<string>('')
</script>

<template>
  <Input v-model="value" placeholder="Enter text..." variant="outlined" />
  <Input v-model="value" placeholder="Enter text..." variant="soft" />
  <Input v-model="value" placeholder="Enter text..." variant="underlined" />
  <Input v-model="value" placeholder="Enter text..." variant="plain" />
</template>
