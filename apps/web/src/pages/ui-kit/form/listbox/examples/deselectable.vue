<script lang="ts" setup>
import { ListBox } from '@dotdev/ui-kit'
import { ref } from 'vue'

const valueList = ref<string[]>([])
const value = ref<string>()
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']
</script>

<template>
  <ListBox v-model="value" :options="options" class="w-3xs" deselectable />
  <ListBox v-model="valueList" :options="options" class="w-3xs" deselectable multiple />
</template>
