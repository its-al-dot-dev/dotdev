<script lang="ts" setup>
import { Input } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Basic usage',
  desc: `Use <code>v-model</code> to control the input value. The <code>placeholder</code> prop can be used to provide a hint when the field is empty.`,
})

const value = ref<string>('')
</script>

<template>
  <Input v-model="value" placeholder="Enter text..." />
</template>
