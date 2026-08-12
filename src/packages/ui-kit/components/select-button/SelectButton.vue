<script generic="T, L extends keyof T, V extends keyof T, M extends boolean" lang="ts" setup>
import {
  type UISelectButtonEmits,
  type UISelectButtonProps,
  type UISelectButtonSlots,
  useArrayModel,
  useUiKitBem,
  useUiKitProps,
} from 'dotdev/ui-kit'
import { computed } from 'vue'

defineEmits<UISelectButtonEmits>()
defineSlots<UISelectButtonSlots<T>>()
const props = withDefaults(defineProps<UISelectButtonProps<T, L, V, M>>(), {
  ui: 'select-button',
  options: () => [],
  square: false,
  disabled: false,
  deselectable: false,
  variant: 'soft',
  size: 'md',
})

const model = defineModel<M extends true ? T[] : T | undefined>()

const ui = useUiKitProps('select-button', props)

const { toggle, isSelected } = useArrayModel<T>(model, {
  multiple: () => ui.multiple === ('' as any) || ui.multiple === true,
  deselectable: () => ui.deselectable,
  valueKey: ui.valueKey,
})

const bem = useUiKitBem(ui)

const rootClass = computed(() => {
  const { size, disabled, square, variant } = ui
  return bem([size, variant], { disabled, square })
})

function optionBindings(option: T) {
  const selected = isSelected(option)

  return {
    class: bem('item', { selected }),
    ariaPressed: selected,
    disabled: ui.disabled || ui.optionDisabled?.(option),
  }
}

function getOptionKey(option: T, index: number) {
  if (props.valueKey && typeof option === 'object' && option !== null) {
    return String(option[props.valueKey])
  }
  return typeof option === 'object' ? index : String(option)
}

function getOptionLabel(option: T) {
  return String(ui.labelKey ? option[ui.labelKey] : option)
}
</script>

<template>
  <div :class="rootClass" role="group">
    <button
      v-for="(option, idx) in options"
      :key="getOptionKey(option, idx)"
      type="button"
      v-bind="optionBindings(option)"
      @click="toggle(option)"
    >
      <slot :index="idx" :label="getOptionLabel(option)" :option="option" :selected="isSelected(option)">
        {{ getOptionLabel(option) }}
      </slot>
    </button>
  </div>
</template>
