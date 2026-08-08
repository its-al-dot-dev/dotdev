<script lang="ts" setup>
import { Icon, SelectButton, type UiKitIcon } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExpose({
  title: 'Square',
  desc: `Set the <code>square</code> prop to render each option as a fixed square, ideal for icon-only toggles such as rich text toolbars.`,
})

const value = ref<UiKitIcon>('text-align-center')
const options: UiKitIcon[] = ['text-align-left', 'text-align-center', 'text-align-right', 'text-align-justify']
</script>

<template>
  <SelectButton v-model="value" :options="options" square>
    <template #default="{ option }">
      <Icon :name="option" />
    </template>
  </SelectButton>
</template>
