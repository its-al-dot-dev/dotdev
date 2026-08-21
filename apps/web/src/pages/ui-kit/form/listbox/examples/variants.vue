<script lang="ts" setup>
import { ListBox } from '@dotdev/ui-kit'
import { ref } from 'vue'

const value = ref<string>()
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']
</script>

<template>
  <ListBox v-model="value" :options="options" class="w-3xs" variant="soft" />
  <ListBox v-model="value" :options="options" class="w-3xs" variant="plain" />
</template>
