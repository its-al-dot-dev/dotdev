<script lang="ts" setup>
import { Input } from '@dotdev/ui-kit'
import { ref } from 'vue'

const value = ref<string>('')
</script>

<template>
  <Input v-model="value" placeholder="Enter text..." />
</template>
