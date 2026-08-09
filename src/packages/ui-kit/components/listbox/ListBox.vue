<script generic="T, L extends keyof T, V extends keyof T, M extends boolean" lang="ts" setup>
import type { UIListBoxEmits, UIListBoxProps, UIListBoxSlots } from './listbox.types.ts'
import {
  Icon,
  normalizeBooleanProp,
  useArrayModel,
  useGlobalEvent,
  useTypeahead,
  useUiKitBem,
  useUiKitProps,
} from 'dotdev/ui-kit'
import { computed, ref, useId, useTemplateRef, watch } from 'vue'
import ListBoxItem from './ListBoxItem.vue'

type FocusDirection = 1 | -1 | 0

defineEmits<UIListBoxEmits>()
defineSlots<UIListBoxSlots<T>>()
const props = withDefaults(defineProps<UIListBoxProps<T, L, V, M>>(), {
  ui: 'listbox',
  options: () => [],
  disabled: false,
  deselectable: false,
  typeahead: true,
  square: false,
  checkmark: 'right',
  checkmarkIcon: 'check',
  columns: 1,
  size: 'md',
  variant: 'outlined',
})

const model = defineModel<M extends true ? T[] : T | undefined>()

const id = useId()
const ui = useUiKitProps('listbox', props)

const bem = useUiKitBem(ui)
const { toggle, isSelected } = useArrayModel<T>(model, {
  multiple: () => normalizeBooleanProp(ui.multiple),
  deselectable: () => ui.deselectable,
  valueKey: () => props.valueKey,
})

function getListboxId() {
  return `${id}-listbox`
}

function getOptionId(index: number) {
  return `${id}-listbox-option-${index}`
}

const listboxRef = useTemplateRef('listbox')

const isFocused = ref(false)
const hasNativeFocus = ref(false)
const focusedOptionIndex = ref(-1)
const isMouseNavigation = ref(false)
const hasFocusedOption = computed(() => focusedOptionIndex.value !== -1)
const isGrid = computed(() => typeof ui.columns === 'number' && ui.columns > 0)

const { search } = useTypeahead({
  options: () => ui.options,
  getLabel: getOptionLabel,
  isDisabled: isOptionDisabled,
  getCurrentIndex: () => focusedOptionIndex.value,
  onMatch: moveFocusedOptionIndex,
})

function onFocusIn(direction: FocusDirection = 1) {
  isFocused.value = true

  if (direction === 0) return

  if (!hasFocusedOption.value) {
    focusedOptionIndex.value = direction === 1 ? findFirstFocusedOptionIndex() : findLastFocusedOptionIndex()
  }

  scrollIntoView(focusedOptionIndex.value)
  // TODO: emit
  // TODO: add mouse multiselection with shift
}

function onFocusOut() {
  isFocused.value = false
  focusedOptionIndex.value = -1
  isMouseNavigation.value = false
}

function onNativeFocusIn() {
  onFocusIn()
  hasNativeFocus.value = true
}

function onNativeFocusOut() {
  onFocusOut()
  hasNativeFocus.value = false
}

function focus() {
  listboxRef.value?.focus()
}

function blur() {
  listboxRef.value?.blur()
}

function onMouseDown() {
  isMouseNavigation.value = true
}

function onKeyDown(event: KeyboardEvent) {
  if (!isFocused.value) return

  switch (event.code) {
    case 'ArrowDown':
      onArrowDown(isGrid.value)
      break

    case 'ArrowUp':
      onArrowUp(isGrid.value)
      break

    case 'ArrowLeft':
      onArrowUp()
      break

    case 'ArrowRight':
      onArrowDown()
      break

    case 'Home':
      onHome()
      break

    case 'End':
      onEnd()
      break

    case 'PageDown':
      onPageDown()
      break

    case 'PageUp':
      onPageUp()
      break

    case 'Enter':
    case 'NumpadEnter':
    case 'Space':
      onEnter()
      break

    default:
      const isPrintableKey = !event.metaKey && !event.ctrlKey && event.key.length === 1

      if (isPrintableKey && ui.typeahead) {
        search(event.key)
        event.preventDefault()
      }

      return
  }

  isMouseNavigation.value = false
  event.preventDefault()
}

useGlobalEvent('keydown', onKeyDown, { watch: isFocused })

/* Keyboard handlers */
function onArrowUp(isGrid?: boolean) {
  let index = hasFocusedOption.value ? findPrevOptionIndex(focusedOptionIndex.value) : findLastFocusedOptionIndex()
  if (isGrid) {
    index -= ui.columns - 1
    if (index < 0) return
  }

  moveFocusedOptionIndex(index)
}

function onArrowDown(isGrid?: boolean) {
  let index = hasFocusedOption.value ? findNextOptionIndex(focusedOptionIndex.value) : findFirstFocusedOptionIndex()

  if (isGrid) {
    const length = ui.options.length
    index += ui.columns - 1

    if (index >= length && !Number.isInteger(length / ui.columns)) {
      index = length - 1
    }
  }

  moveFocusedOptionIndex(index)
}

function onHome() {
  let index = findFirstOptionIndex()
  moveFocusedOptionIndex(index)
}

function onEnd() {
  let index = findLastOptionIndex()
  moveFocusedOptionIndex(index)
}

function onPageUp() {
  scrollIntoView(0)
}

function onPageDown() {
  scrollIntoView(ui.options.length - 1)
}

function onEnter() {
  if (!hasFocusedOption.value) return
  const option = ui.options[focusedOptionIndex.value]
  toggleOptionSelect(option, focusedOptionIndex.value)
}

function scrollIntoView(index = -1) {
  const id = getOptionId(index !== -1 ? index : focusedOptionIndex.value)
  const element = document.getElementById(id)
  if (!element || !element.scrollIntoView) return
  element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
}

function moveFocusedOptionIndex(index: number) {
  if (focusedOptionIndex.value === index) return
  focusedOptionIndex.value = index
  scrollIntoView()
}

/* Find option */
function findFirstFocusedOptionIndex() {
  const selectedIndex = findFirstSelectedOptionIndex()
  return selectedIndex === -1 ? findFirstOptionIndex() : selectedIndex
}

function findLastFocusedOptionIndex() {
  const selectedIndex = findLastSelectedOptionIndex()
  return selectedIndex === -1 ? findLastOptionIndex() : selectedIndex
}

function findFirstSelectedOptionIndex() {
  return ui.options.findIndex((option) => isSelected(option))
}

function findLastSelectedOptionIndex() {
  return ui.options.findLastIndex((option) => isSelected(option))
}

function findFirstOptionIndex() {
  return ui.options.findIndex((option) => !isOptionDisabled(option))
}

function findLastOptionIndex() {
  return ui.options.findLastIndex((option) => !isOptionDisabled(option))
}

function findNextOptionIndex(index: number) {
  for (let i = index + 1; i < ui.options.length; i++) {
    if (!isOptionDisabled(ui.options[i])) return i
  }

  return index
}

function findPrevOptionIndex(index: number) {
  for (let i = index - 1; i >= 0; i--) {
    if (!isOptionDisabled(ui.options[i])) return i
  }

  return index
}

/* Option handler */
function getOptionLabel(option: T) {
  return String(ui.labelKey ? option[ui.labelKey] : option)
}

function isOptionDisabled(option: T) {
  return ui.optionDisabled ? ui.optionDisabled(option) : false
}

function isOptionFocused(index: number) {
  return focusedOptionIndex.value === index
}

function toggleOptionSelect(option: T, index: number) {
  if (isOptionDisabled(option)) return

  toggle(option)
  focusedOptionIndex.value = index
}

function getOptionBindings(option: T, index: number) {
  const id = getOptionId(index)
  const label = getOptionLabel(option)
  const disabled = isOptionDisabled(option)
  const selected = isSelected(option)
  const focused = isOptionFocused(index)
  const size = ui.options.length
  const highlighted = !isMouseNavigation.value && focused
  const cls = bem('item', { selected, disabled, focused })
  const props = { index, focused, selected, disabled, label, size, highlighted }

  return {
    id,
    class: cls,
    ...props,
    onMousedown: () => {
      if (ui.disabled || disabled) return
      toggleOptionSelect(option, index)
    },
  }
}

const rootAttrs = computed(() => {
  const { size, variant, square, disabled, invalid } = ui
  return {
    id: getListboxId(),
    class: bem([size, variant], { square, disabled, invalid, grid: isGrid.value }),
    tabindex: ui.disabled ? -1 : 0,
    role: 'listbox',
    'aria-disabled': ui.disabled,
    'aria-orientation': 'vertical' as const,
    'aria-multiselectable': normalizeBooleanProp(ui.multiple),
    'aria-activedescendant': hasFocusedOption.value ? getOptionId(focusedOptionIndex.value) : undefined,
  }
})

defineExpose({
  id: getListboxId(),
  hasNativeFocus,
  isFocused,
  focus,
  blur,
  focusIn: onFocusIn,
  focusOut: onFocusOut,
})

/* prettier-ignore */
watch(() => ui.options.length, (length) => {
  const index = focusedOptionIndex.value
  if (index !== -1 && index < length) return
  focusedOptionIndex.value = -1
})

/* TODO: delete when fixed useUiKitProps types */
const checkmark = computed(() => ui.checkmark)
const columns = computed(() => ui.columns)
</script>

<template>
  <ul
    ref="listbox"
    :style="isGrid ? { '--ui-listbox-columns': columns } : undefined"
    v-bind="rootAttrs"
    @focusin="onNativeFocusIn"
    @focusout="onNativeFocusOut"
    @mousedown="onMouseDown"
  >
    <ListBoxItem v-for="(item, idx) in options" :key="idx" #default="scope" v-bind="getOptionBindings(item, idx)">
      <Icon v-if="checkmark === 'left'" :class="bem('checkmark', [checkmark])" :name="checkmarkIcon ?? 'check'" />
      <slot name="default" v-bind="{ option: item, ...scope }">{{ scope.label }}</slot>
      <Icon v-if="checkmark === 'right'" :class="bem('checkmark', [checkmark])" :name="checkmarkIcon" />
    </ListBoxItem>
  </ul>
</template>
