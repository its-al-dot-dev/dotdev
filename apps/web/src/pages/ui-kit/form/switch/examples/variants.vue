<script lang="ts" setup>
import { Switch } from '@dotdev/ui-kit'
import { ref } from 'vue'

const first = ref<boolean>(true)
const second = ref<boolean>(true)
</script>

<template>
  <Switch v-model="first" variant="outlined" />
  <Switch v-model="second" variant="soft" />
</template>
