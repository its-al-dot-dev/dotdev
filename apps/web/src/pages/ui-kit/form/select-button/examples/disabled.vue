<script lang="ts" setup>
import { SelectButton } from '@dotdev/ui-kit'
import { ref } from 'vue'

const value = ref('Berlin')
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']
</script>

<template>
  <SelectButton v-model="value" :options="options" disabled />
  <SelectButton v-model="value" :options="options" :option-disabled="(option: string) => option === 'Paris'" />
</template>
