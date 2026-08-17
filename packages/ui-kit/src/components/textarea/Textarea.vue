<script lang="ts" setup>
import { computed } from 'vue'
import type { UITextareaEmits, UITextareaProps, UITextareaSlots } from './textarea.types.ts'
import { useUiKitBem, useUiKitProps } from '@dotdev/ui-kit'

defineSlots<UITextareaSlots>()
defineEmits<UITextareaEmits>()
const props = withDefaults(defineProps<UITextareaProps>(), {
  ui: 'textarea',
  size: 'md',
  variant: 'outlined',
  autosize: true,
})

const model = defineModel<string>({ default: '' })
const ui = useUiKitProps('textarea', props)

const bem = useUiKitBem(ui)
const rootClass = computed(() => {
  const { disabled, invalid, size, variant } = ui
  return bem([size, variant], { disabled, invalid })
})
</script>

<template>
  <textarea v-model="model" :class="rootClass" :disabled="disabled" />
</template>
