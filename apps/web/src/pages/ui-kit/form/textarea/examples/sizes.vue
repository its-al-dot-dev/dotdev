<script lang="ts" setup>
import { Textarea } from '@dotdev/ui-kit'
import { ref } from 'vue'

const value = ref<string>('')
</script>

<template>
  <Textarea v-model="value" placeholder="Enter text..." size="sm" />
  <Textarea v-model="value" placeholder="Enter text..." size="md" />
  <Textarea v-model="value" placeholder="Enter text..." size="lg" />
</template>
