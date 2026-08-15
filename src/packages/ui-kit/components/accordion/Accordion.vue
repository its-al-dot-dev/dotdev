<script generic="T, L extends keyof T, V extends keyof T, M extends boolean" lang="ts" setup>
import type { UIAccordionEmits, UIAccordionProps, UIAccordionSlots } from './accordion.types'
import { computed, useId } from 'vue'
import {
  Icon,
  normalizeBooleanProp,
  Scope,
  toTemplateRef,
  useArrayModel,
  useUiKitBem,
  useUiKitProps,
} from 'dotdev/ui-kit'
import Collapse from './Collapse.vue'

defineEmits<UIAccordionEmits>()
defineSlots<UIAccordionSlots<T>>()

const props = withDefaults(defineProps<UIAccordionProps<T, L, V, M>>(), {
  ui: 'accordion',
  variant: 'outlined',
  options: () => [],
  deselectable: true,
})

const model = defineModel<M extends true ? T[] : T | undefined>()

const ui = useUiKitProps('accordion', props)
const bem = useUiKitBem(ui)
const id = useId()

const { toggle, isSelected } = useArrayModel<T>(model, {
  multiple: () => normalizeBooleanProp(ui.multiple),
  deselectable: () => ui.deselectable,
  valueKey: ui.valueKey,
})

const rootClass = computed(() => bem([ui.variant], { disabled: ui.disabled }))

function getItemId(index: number, part: 'trigger' | 'panel') {
  return `${id}-${part}-${index}`
}

function getItemLabel(item: T) {
  if (item !== null && typeof item === 'object' && ui.labelKey) return String(item[ui.labelKey])
  return String(item)
}

function getItemValue(item: T) {
  if (item !== null && typeof item === 'object' && ui.valueKey) return String(item[ui.valueKey])
  return String(item)
}

function isItemDisabled(item: T) {
  if (ui.disabled) return true
  if (ui.optionDisabled) return Boolean(ui.optionDisabled(item))
  return false
}

const uit = toTemplateRef(ui)
</script>

<template>
  <div :class="rootClass">
    <Scope
      v-for="(option, idx) in uit.options"
      :key="idx"
      #default="scope"
      :scope="{
        disabled: isItemDisabled(option),
        index: idx,
        item: option,
        label: getItemLabel(option),
        open: isSelected(option),
        toggle: () => toggle(option),
        value: getItemValue(option),
      }"
    >
      <div :class="bem('item', { disabled: scope.disabled })">
        <button
          :id="getItemId(idx, 'trigger')"
          :aria-controls="getItemId(idx, 'panel')"
          :aria-expanded="isSelected(option)"
          :class="bem('trigger', { open: scope.open, disabled: scope.disabled })"
          :disabled="scope.disabled"
          type="button"
          @click="toggle(option)"
        >
          <slot v-bind="scope">
            <span :class="bem('label')">{{ scope.label }}</span>
          </slot>

          <span :class="bem('indicator')">
            <slot name="indicator" v-bind="scope">
              <Icon aria-hidden="true" name="chevron-down" />
            </slot>
          </span>
        </button>

        <Collapse :open="scope.open">
          <div
            :id="getItemId(idx, 'panel')"
            :aria-labelledby="getItemId(idx, 'trigger')"
            :class="bem('panel')"
            role="region"
          >
            <slot name="content" v-bind="scope">
              <span :class="bem('value')">{{ scope.value }}</span>
            </slot>
          </div>
        </Collapse>
      </div>
    </Scope>
  </div>
</template>
