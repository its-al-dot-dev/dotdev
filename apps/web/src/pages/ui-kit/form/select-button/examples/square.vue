<script lang="ts" setup>
import { Icon, SelectButton, type UiKitIcon } from '@dotdev/ui-kit'
import { ref } from 'vue'

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
