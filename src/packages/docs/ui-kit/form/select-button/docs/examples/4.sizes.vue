<script lang="ts" setup>
import { SelectButton } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Sizes',
  desc: `Use the <code>size</code> prop to adjust the dimensions. Available sizes are <code>sm</code>, <code>md</code>, and <code>lg</code>.`,
})

const value = ref('Berlin')
const options = ['Berlin', 'London', 'Paris', 'Tokyo']
</script>

<template>
  <SelectButton v-model="value" :options="options" size="sm" />
  <SelectButton v-model="value" :options="options" size="md" />
  <SelectButton v-model="value" :options="options" size="lg" />
</template>