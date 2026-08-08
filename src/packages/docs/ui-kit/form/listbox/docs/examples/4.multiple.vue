<script lang="ts" setup>
import { ListBox } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExpose({
  title: 'Multiple selection',
  desc: `Use the <code>multiple</code> prop to allow selecting multiple options. The <code>v-model</code> value should be an array containing all selected options.`,
})

const value = ref<string[]>([])
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']
</script>

<template>
  <ListBox v-model="value" :options="options" class="w-3xs" multiple />
</template>
