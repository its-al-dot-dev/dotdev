<script lang="ts" setup>
import { computed } from 'vue'
import type { UIRadioEmits, UIRadioProps, UIRadioSlots } from './radio.types.ts'
import { useUiKitBem, useUiKitProps, useUiKitTheme } from '@dotdev/ui-kit'
import { radioStyle } from '@dotdev/theme'

defineSlots<UIRadioSlots>()
defineEmits<UIRadioEmits>()
const props = withDefaults(defineProps<UIRadioProps>(), {
  ui: 'radio',
  size: 'md',
  variant: 'outlined',
})

const model = defineModel<boolean>({ default: false })
const ui = useUiKitProps('radio', props)

const bem = useUiKitBem(ui)
useUiKitTheme(ui, radioStyle)
const rootClass = computed(() => {
  const { disabled, invalid, size, variant } = ui
  return bem([size, variant], { disabled, invalid })
})

function onInput(event: Event) {
  model.value = (event.target as HTMLInputElement).checked
}
</script>

<template>
  <input :checked="model" :class="rootClass" :disabled="disabled" type="radio" @change="onInput" />
</template>
