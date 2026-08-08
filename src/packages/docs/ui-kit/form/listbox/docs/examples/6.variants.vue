<script lang="ts" setup>
import { ListBox } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExpose({
  title: 'Variants',
  desc: `Use the <code>variant</code> prop to control the visual style of the list. The <code>subtle</code> variant adds a soft background, while <code>plain</code> removes the default container styling for custom layouts.`,
})

const value = ref<string>()
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']
</script>

<template>
  <ListBox v-model="value" :options="options" class="w-3xs" variant="subtle" />
  <ListBox v-model="value" :options="options" class="w-3xs" variant="plain" />
</template>
