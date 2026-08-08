<script lang="ts" setup>
import { SelectButton } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExpose({
  title: 'Basic usage',
  desc: `Render a set of options with <code>options</code> and control the selection with <code>v-model</code>. By default only one option can be selected at a time.`,
})

const value = ref('Berlin')
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']
</script>

<template>
  <SelectButton v-model="value" :options="options" />
</template>