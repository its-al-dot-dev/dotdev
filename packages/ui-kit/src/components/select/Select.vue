<script generic="T, L extends keyof T, V extends keyof T, M extends boolean | undefined" lang="ts" setup>
import { Floating, Icon, ListBox, useSelectOptions, useUiKitBem, useUiKitProps, useUiKitTheme } from '@dotdev/ui-kit'
import type { UISelectEmits, UISelectProps, UISelectSlots } from './select.types.ts'
import { computed, nextTick, ref, useId, useTemplateRef } from 'vue'
import { selectStyle } from '@dotdev/theme'

defineEmits<UISelectEmits>()
defineSlots<UISelectSlots>()
const props = withDefaults(defineProps<UISelectProps<T, L, V, M>>(), {
  ui: 'select',
  size: 'md',
  variant: 'outlined',
})

const model = defineModel<M extends true ? T[] : T | undefined>()

const ui = useUiKitProps<'select', UISelectProps<T, L, V, M>>('select', props)
const { getOptionLabel } = useSelectOptions<T>(ui.labelKey, ui.valueKey)
const bem = useUiKitBem(ui)
useUiKitTheme(ui, selectStyle)

const floatingRef = useTemplateRef('floating')
const comboboxRef = useTemplateRef('combobox')
const listboxRef = useTemplateRef('listbox')

const listboxId = `${useId()}-listbox`
const isFocused = ref(false)
const isOpen = computed(() => !!floatingRef.value?.isOpen)
const multiple = computed(() => ui.multiple === ('' as any) || ui.multiple === true)

const rootClass = computed(() => {
  const { size, disabled, invalid, variant } = ui
  return bem([size, variant], { disabled, invalid, focused: isFocused.value })
})

const isPlaceholder = computed(() => {
  const value = model.value
  if (Array.isArray(value)) return value.length === 0
  return value === null || value === undefined || value === ''
})

const displayLabel = computed(() => {
  if (isPlaceholder.value) return ''
  const value = model.value

  if (Array.isArray(value)) {
    return value.map(getOptionLabel).join(', ')
  }

  return getOptionLabel(value as T)
})

const comboboxAttrs = computed(() => ({
  class: bem('label', { placeholder: isPlaceholder.value }),
  tabindex: ui.disabled ? -1 : 0,
  disabled: ui.disabled,
  role: 'combobox',
  'aria-controls': listboxId,
  'aria-expanded': isOpen.value,
  'aria-haspopup': 'listbox' as const,
  'aria-label': ui.placeholder,
}))

function restoreFocus() {
  comboboxRef.value?.focus()
}

function toggleDropdown(event: Event) {
  if (ui.disabled) return
  floatingRef.value?.toggle(event)
}

function closeDropdown() {
  if (multiple.value) return
  floatingRef.value?.close()
}

function closeAndBlur() {
  floatingRef.value?.close()
  isFocused.value = false
}

function handleKeydown(event: KeyboardEvent) {
  if (ui.disabled) return
  if (event.key === 'Tab') closeAndBlur()

  if (event.key === 'Escape') {
    floatingRef.value?.close()
    return
  }

  // Если есть фокус значит клавиатурой управляет listbox
  if (listboxRef.value?.isFocused) return

  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()

      toggleDropdown(event)
      // Если список открылся и есть выбранное значение — фокусируемся на нем
      if (!isPlaceholder.value) {
        nextTick(() => listboxRef.value?.focusIn())
        event.stopPropagation()
      }

      break

    case 'ArrowDown':
    case 'ArrowUp':
      event.preventDefault()

      if (!isOpen.value) {
        floatingRef.value?.open(event)
      }

      nextTick(() => {
        listboxRef.value?.focusIn(event.key === 'ArrowUp' ? -1 : 1)
        event.stopPropagation()
      })
      break
  }
}
</script>

<template>
  <Floating ref="floating" #default="{ ref, style }" :offset="2" auto-update fit @click-outside="closeAndBlur">
    <div :class="rootClass" @click="toggleDropdown" @keydown="handleKeydown">
      <span ref="combobox" v-bind="comboboxAttrs" @focus="isFocused = true">
        {{ displayLabel || ui.placeholder }}
      </span>

      <div :class="bem('dropdown')" aria-hidden="true">
        <Icon name="chevron-down" />
      </div>
    </div>

    <Teleport to="body">
      <div v-if="isOpen" :ref="ref" :class="bem('listbox-wrapper', [size])" :style="style">
        <ListBox
          :id="listboxId"
          ref="listbox"
          v-model="model"
          :deselectable="ui.deselectable"
          :disabled="ui.disabled"
          :invalid="ui.invalid"
          :label-key="ui.labelKey"
          :multiple="multiple"
          :option-disabled="ui.optionDisabled"
          :options="ui.options"
          :placeholder="ui.placeholder"
          :size="ui.size"
          :ui="`${ui.ui}-listbox`"
          :value-key="ui.valueKey"
          tabindex="-1"
          @click="restoreFocus"
          @update:model-value="closeDropdown"
        />
      </div>
    </Teleport>
  </Floating>
</template>
