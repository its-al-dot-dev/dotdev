<script lang="ts" setup>
import { ListBox } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Invalid state',
  desc: `Apply the <code>invalid</code> prop to visually indicate a validation error state.`,
})

const value = ref<string>()
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']
</script>

<template>
  <ListBox v-model="value" :invalid="!value" :options="options" class="w-3xs" deselectable />
</template>
