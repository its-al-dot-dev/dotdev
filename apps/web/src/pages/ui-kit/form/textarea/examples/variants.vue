<script lang="ts" setup>
import { Textarea } from '@dotdev/ui-kit'
import { ref } from 'vue'

const value = ref<string>('')
</script>

<template>
  <Textarea v-model="value" placeholder="Enter text..." variant="outlined" />
  <Textarea v-model="value" placeholder="Enter text..." variant="soft" />
  <Textarea v-model="value" placeholder="Enter text..." variant="underlined" />
  <Textarea v-model="value" placeholder="Enter text..." variant="plain" />
</template>
