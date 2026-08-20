<script lang="ts" setup>
import { computed } from 'vue'
import type { UIInputEmits, UIInputProps, UIInputSlots } from './input.types.ts'
import { useUiKitBem, useUiKitProps, useUiKitTheme } from '@dotdev/ui-kit'
import { inputStyle } from '@dotdev/theme'

defineSlots<UIInputSlots>()
defineEmits<UIInputEmits>()
const props = withDefaults(defineProps<UIInputProps>(), {
  ui: 'input',
  size: 'md',
  variant: 'outlined',
})

const model = defineModel<string>({ default: '' })
const ui = useUiKitProps('input', props)

const bem = useUiKitBem(ui)
useUiKitTheme(ui, inputStyle)
const rootClass = computed(() => {
  const { disabled, invalid, size, variant } = ui
  return bem([size, variant], { disabled, invalid })
})
</script>

<template>
  <input v-model="model" :class="rootClass" :disabled="disabled" />
</template>
