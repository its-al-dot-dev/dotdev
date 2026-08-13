<script lang="ts" setup>
import { ListBox } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Deselectable selection',
  desc: `Use the <code>deselectable</code> prop to allow removing the current selection. This works with both single and multiple selection modes.`,
})

const valueList = ref<string[]>([])
const value = ref<string>()
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']
</script>

<template>
  <ListBox v-model="value" :options="options" class="w-3xs" deselectable />
  <ListBox v-model="valueList" :options="options" class="w-3xs" deselectable multiple />
</template>
