<script lang="ts" setup>
import { Radio } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExpose({
  title: 'Invalid state',
  desc: `Use the <code>invalid</code> prop to visually indicate a validation error state. This works with all radio variants.`,
})

const first = ref<boolean>(false)
const second = ref<boolean>(false)
</script>

<template>
  <label class="flex items-center gap-2">
    <Radio v-model="first" invalid variant="outlined" />
    Outlined
  </label>
  <label class="flex items-center gap-2">
    <Radio v-model="second" invalid variant="soft" />
    Subtle
  </label>
</template>
