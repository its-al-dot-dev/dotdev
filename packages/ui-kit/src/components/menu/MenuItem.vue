<script lang="ts" setup>
import type { Component } from 'vue'
import { computed, toValue } from 'vue'
import { Icon, useUiKitBem } from '@dotdev/ui-kit'
import type { NormalizedMenuItem, UIMenuEmits, UIMenuItem, UIMenuItemProps } from './menu.types.ts'

const props = defineProps<UIMenuItemProps>()
const emit = defineEmits<UIMenuEmits>()

const item = computed(() => normalizeItem(props.item))
const tag = computed<Component | string>(() => {
  if (item.value.to) return 'router-link'
  if (item.value.href) return 'a'
  return 'button'
})

const bindProps = computed(() => {
  const itemValue = item.value

  return {
    to: itemValue.to,
    href: itemValue.href,
    target: itemValue.target,
    ...(tag.value === 'button' && {
      type: 'button',
      disabled: itemValue.disabled,
    }),
  }
})

const bem = useUiKitBem(props)

const classes = computed(() => [
  bem('item', {
    active: item.value.active,
    disabled: item.value.disabled,
  }),
  item.value.class,
])

function onClick(event: MouseEvent) {
  if (item.value.disabled) {
    event.preventDefault()
    event.stopPropagation()
    return
  }

  item.value.command?.(item.value, event)
  emit('select', item.value, event)
}

function normalizeItem(item: UIMenuItem): NormalizedMenuItem {
  return {
    ...item,
    kind: item.kind ?? 'item',
    visible: toValue(item.visible) ?? true,
    active: toValue(item.active) ?? false,
    disabled: toValue(item.disabled) ?? false,
    class: toValue(item.class),
  }
}
</script>

<template>
  <li :class="bem('item-wrapper')" role="none">
    <component :is="tag" :class="classes" role="menuitem" v-bind="bindProps" @click="onClick">
      <Icon v-if="item.icon" :class="bem('item-icon')" :name="item.icon" />
      <span :class="bem('item-label')">
        {{ item.label }}
      </span>
    </component>
  </li>
</template>
