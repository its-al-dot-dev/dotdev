<script lang="ts" setup>
import { Radio } from '@dotdev/ui-kit'
import { ref } from 'vue'

const checked = ref<boolean>(true)
</script>

<template>
  <label class="flex items-center gap-2">
    <Radio v-model="checked" size="sm" />
    Small
  </label>
  <label class="flex items-center gap-2">
    <Radio v-model="checked" size="md" />
    Medium
  </label>
  <label class="flex items-center gap-2">
    <Radio v-model="checked" size="lg" />
    Large
  </label>
</template>
