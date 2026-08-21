<script lang="ts" setup>
import { ListBox } from '@dotdev/ui-kit'
import { ref } from 'vue'

const value = ref<string>('Berlin')
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']
</script>

<template>
  <ListBox v-model="value" :options="options" checkmark="right" class="w-40" size="sm" />
  <ListBox v-model="value" :options="options" checkmark="right" class="w-40" size="md" />
  <ListBox v-model="value" :options="options" checkmark="right" class="w-40" size="lg" />
</template>
