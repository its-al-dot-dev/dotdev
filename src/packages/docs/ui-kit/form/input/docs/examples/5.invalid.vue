<script lang="ts" setup>
import { Input } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Invalid state',
  desc: `Use the <code>invalid</code> prop to visually indicate a validation error state. This works with all input variants.`,
})

const value = ref<string>('')
</script>

<template>
  <Input v-model="value" invalid placeholder="Enter text..." variant="outlined" />
  <Input v-model="value" invalid placeholder="Enter text..." variant="soft" />
  <Input v-model="value" invalid placeholder="Enter text..." variant="underlined" />
  <Input v-model="value" invalid placeholder="Enter text..." variant="plain" />
</template>
