<script lang="ts" setup>
import { Switch } from '@dotdev/ui-kit'
import { ref } from 'vue'

const enabled = ref<boolean>(false)
</script>

<template>
  <Switch v-model="enabled" />
</template>
