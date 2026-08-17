<script lang="ts" setup>
import { Radio } from '@dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Disabled state',
  desc: `Use the <code>disabled</code> prop to prevent user interaction and display the radio in a disabled state.`,
})

const checked = ref<boolean>(true)
</script>

<template>
  <label class="flex items-center gap-2">
    <Radio v-model="checked" disabled />
    Checked and disabled
  </label>
  <label class="flex items-center gap-2">
    <Radio disabled />
    Disabled
  </label>
</template>
