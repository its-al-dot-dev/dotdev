<script lang="ts" setup>
import { computed } from 'vue'
import type { UICheckboxEmits, UICheckboxProps, UICheckboxSlots } from './checkbox.types.ts'
import { useUiKitBem, useUiKitProps, useUiKitTheme } from '@dotdev/ui-kit'
import { template } from '../templates/checkbox.ts'

defineSlots<UICheckboxSlots>()
defineEmits<UICheckboxEmits>()
const props = withDefaults(defineProps<UICheckboxProps>(), {
  ui: 'checkbox',
  size: 'md',
  variant: 'outlined',
})

const model = defineModel<boolean>({ default: false })
const ui = useUiKitProps('checkbox', props)

const bem = useUiKitBem(ui)
useUiKitTheme(ui, template)
const rootClass = computed(() => {
  const { disabled, invalid, size, variant } = ui
  return bem([size, variant], { disabled, invalid })
})
</script>

<template>
  <input v-model="model" :class="rootClass" :disabled="disabled" type="checkbox" />
</template>
