<script lang="ts" setup>
import { Switch } from '@dotdev/ui-kit'
import { ref } from 'vue'

const enabled = ref<boolean>(true)
</script>

<template>
  <Switch v-model="enabled" disabled />
</template>
