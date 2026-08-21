<script lang="ts" setup>
import { ListBox } from '@dotdev/ui-kit'
import { ref } from 'vue'

const value = ref<string[]>([])
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']

function isOptionDisabled(option: string) {
  return option === 'London' || option === 'Tokyo'
}
</script>

<template>
  <ListBox v-model="value" :option-disabled="isOptionDisabled" :options="options" class="w-3xs" />
  <ListBox v-model="value" :options="options" class="w-3xs" disabled />
</template>
