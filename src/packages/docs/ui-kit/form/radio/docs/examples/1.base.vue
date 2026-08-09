<script lang="ts" setup>
import { Radio } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExpose({
  title: 'Basic usage',
  desc: `Use <code>v-model</code> to control the checked state. The component renders a single native radio, so wrap it in a <code>label</code> to attach a clickable label and use a shared <code>name</code> to group radios.`,
})

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
