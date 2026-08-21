<script lang="ts" setup>
import { Radio } from '@dotdev/ui-kit'
import { ref } from 'vue'

const first = ref<boolean>(true)
const second = ref<boolean>(false)
</script>

<template>
  <label class="flex items-center gap-2">
    <Radio v-model="first" name="terms" />
    Option A
  </label>
  <label class="flex items-center gap-2">
    <Radio v-model="second" name="terms" />
    Option B
  </label>
</template>
