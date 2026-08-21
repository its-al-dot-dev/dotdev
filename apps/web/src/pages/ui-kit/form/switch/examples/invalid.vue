<script lang="ts" setup>
import { Switch } from '@dotdev/ui-kit'
import { ref } from 'vue'

const first = ref<boolean>(true)
const second = ref<boolean>(false)
</script>

<template>
  <Switch v-model="first" invalid variant="outlined" />
  <Switch v-model="second" invalid variant="soft" />
</template>
