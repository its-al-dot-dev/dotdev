<script lang="ts" setup>
import { ListBox } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Basic usage',
  desc: `Use <code>v-model</code> to control the selected value and provide available options through the <code>options</code> prop.`,
})

const value = ref<string>()
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']
</script>

<template>
  <ListBox v-model="value" :options="options" class="w-3xs" />
</template>
