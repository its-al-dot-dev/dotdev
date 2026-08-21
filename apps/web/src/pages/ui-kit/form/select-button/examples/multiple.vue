<script lang="ts" setup>
import { SelectButton } from '@dotdev/ui-kit'
import { ref } from 'vue'

const value = ref<string[]>(['Berlin', 'Tokyo'])
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']
</script>

<template>
  <SelectButton v-model="value" :options="options" multiple />
</template>
