<script lang="ts" setup>
import { Radio } from '@dotdev/ui-kit'
import { ref } from 'vue'

const first = ref<boolean>(true)
const second = ref<boolean>(true)
</script>

<template>
  <label class="flex items-center gap-2">
    <Radio v-model="first" variant="outlined" />
    Outlined
  </label>
  <label class="flex items-center gap-2">
    <Radio v-model="second" variant="soft" />
    Subtle
  </label>
</template>
