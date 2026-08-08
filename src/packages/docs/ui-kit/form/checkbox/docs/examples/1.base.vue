<script lang="ts" setup>
import { Checkbox } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExpose({
  title: 'Basic usage',
  desc: `Use <code>v-model</code> to control the checked state. The component renders a single native checkbox, so wrap it in a <code>label</code> to attach a clickable label.`,
})

const checked = ref<boolean>(false)
</script>

<template>
  <label class="flex items-center gap-2">
    <Checkbox v-model="checked" />
    Accept terms and conditions
  </label>
</template>
