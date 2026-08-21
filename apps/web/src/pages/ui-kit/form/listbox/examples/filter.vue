<script lang="ts" setup>
import { Group, Input, ListBox, useListBoxFilter } from '@dotdev/ui-kit'
import { ref } from 'vue'

const value = ref<string>()
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']

function filter(option: string, query: string) {
  return option.toLowerCase().includes(query.toLowerCase())
}

// TODO empty state, refactor useListBoxFilter

const { query, inputBindings, listboxBindings } = useListBoxFilter(options, filter)
</script>

<template>
  <Group axis="y">
    <Input v-model="query" placeholder="Search city..." v-bind="inputBindings" />
    <ListBox v-model="value" class="-mt-px" v-bind="listboxBindings" />
  </Group>
</template>
