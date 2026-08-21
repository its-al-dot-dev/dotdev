<script lang="ts" setup>
import { Checkbox } from '@dotdev/ui-kit'
import { ref } from 'vue'

const checked = ref<boolean>(false)
</script>

<template>
  <label class="flex items-center gap-2">
    <Checkbox v-model="checked" />
    Accept terms and conditions
  </label>
</template>
