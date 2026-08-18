<script lang="ts" setup>
import { computed } from 'vue'
import type { UISwitchEmits, UISwitchProps, UISwitchSlots } from './switch.types.ts'
import { useUiKitBem, useUiKitProps, useUiKitTheme } from '@dotdev/ui-kit'
import { template } from '../templates/switch.ts'

defineSlots<UISwitchSlots>()
defineEmits<UISwitchEmits>()
const props = withDefaults(defineProps<UISwitchProps>(), {
  ui: 'switch',
  variant: 'soft',
})

const model = defineModel<boolean>({ default: false })
const ui = useUiKitProps('switch', props)

const bem = useUiKitBem(ui)
useUiKitTheme(ui, template)
const rootClass = computed(() => {
  const { disabled, invalid, variant } = ui
  return bem([variant], { disabled, invalid, checked: model.value })
})

function toggle() {
  model.value = !model.value
}
</script>

<template>
  <button :aria-checked="model" :class="rootClass" :disabled="ui.disabled" role="switch" type="button" @click="toggle">
    <span :class="bem('track')">
      <span :class="bem('thumb')" />
    </span>
  </button>
</template>
