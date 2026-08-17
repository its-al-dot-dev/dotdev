<script lang="ts" setup>
import { SelectButton } from '@dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Variants',
  desc: `Use the <code>variant</code> prop to change the container style. Available variants are <code>soft</code>, <code>outlined</code>, and <code>plain</code>.`,
})

const value = ref('Berlin')
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']
</script>

<template>
  <SelectButton v-model="value" :options="options" variant="soft" />
  <SelectButton v-model="value" :options="options" variant="outlined" />
  <SelectButton v-model="value" :options="options" variant="plain" />
</template>