<script lang="ts" setup>
import { SelectButton } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Object options',
  desc: `Use <code>label-key</code> to pick the property shown to the user and <code>value-key</code> to define the unique field used for selection when working with object options.`,
})

interface City {
  id: number
  name: string
}

const value = ref<City>({ id: 1, name: 'Berlin' })
const options: City[] = [
  { id: 1, name: 'Berlin' },
  { id: 2, name: 'London' },
  { id: 3, name: 'Paris' },
]
</script>

<template>
  <SelectButton v-model="value" :options="options" label-key="name" value-key="id" />
</template>