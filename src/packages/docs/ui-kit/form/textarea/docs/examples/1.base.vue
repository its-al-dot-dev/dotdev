<script lang="ts" setup>
import { Textarea } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Basic usage',
  desc: `Use <code>v-model</code> to control the value. The <code>placeholder</code> prop can be used to provide a hint when the field is empty.`,
})

const value = ref<string>('')
</script>

<template>
  <Textarea v-model="value" placeholder="Enter text..." class="w-3xs" />
</template>
