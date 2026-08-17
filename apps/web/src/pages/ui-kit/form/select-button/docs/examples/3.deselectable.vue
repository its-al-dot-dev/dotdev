<script lang="ts" setup>
import { SelectButton } from '@dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Deselectable',
  desc: `Add the <code>deselectable</code> prop to clear the selection when clicking the already-selected option. Works in both single and multiple mode.`,
})

const value = ref('Berlin')
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']
</script>

<template>
  <SelectButton v-model="value" :options="options" deselectable />
</template>