<script lang="ts" setup>
import { Input } from '@dotdev/ui-kit'
import { ref } from 'vue'

const value = ref<string>('')
</script>

<template>
  <Input v-model="value" invalid placeholder="Enter text..." variant="outlined" />
  <Input v-model="value" invalid placeholder="Enter text..." variant="soft" />
  <Input v-model="value" invalid placeholder="Enter text..." variant="underlined" />
  <Input v-model="value" invalid placeholder="Enter text..." variant="plain" />
</template>
