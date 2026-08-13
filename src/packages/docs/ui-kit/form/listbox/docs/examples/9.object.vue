<script lang="ts" setup>
import { ListBox } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Object options',
  desc: `Use <code>label-key</code> to specify the property displayed to the user and <code>value-key</code> to define the unique value used for selection when working with object options.`,
})

interface City {
  id: number
  name: string
}

const value = ref<City>()
const options: City[] = [
  { id: 1, name: 'Berlin' },
  { id: 2, name: 'London' },
  { id: 3, name: 'Paris' },
  { id: 4, name: 'Tokyo' },
  { id: 5, name: 'New York' },
]
</script>

<template>
  <ListBox v-model="value" :options="options" class="w-3xs" label-key="name" value-key="id" />
</template>
