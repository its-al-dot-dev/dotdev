<script lang="ts" setup>
import { Checkbox } from '@dotdev/ui-kit'
import { ref } from 'vue'

const checked = ref<boolean>(true)
</script>

<template>
  <label class="flex items-center gap-2">
    <Checkbox v-model="checked" disabled />
    Checked and disabled
  </label>
  <label class="flex items-center gap-2">
    <Checkbox disabled />
    Disabled
  </label>
</template>
