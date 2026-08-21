<script lang="ts" setup>
import { SelectButton } from '@dotdev/ui-kit'
import { ref } from 'vue'

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
