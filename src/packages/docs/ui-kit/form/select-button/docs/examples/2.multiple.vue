<script lang="ts" setup>
import { SelectButton } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Multiple selection',
  desc: `Set the <code>multiple</code> prop to allow selecting several options at once. The <code>v-model</code> value should then be an array of selected options.`,
})

const value = ref<string[]>(['Berlin', 'Tokyo'])
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']
</script>

<template>
  <SelectButton v-model="value" :options="options" multiple />
</template>