<script lang="ts" setup>
import { computed } from 'vue'
import type { UIMessageEmits, UIMessageProps, UIMessageSlots } from './message.types.ts'
import { Icon, useUiKitBem, useUiKitProps } from '@dotdev/ui-kit'

defineEmits<UIMessageEmits>()
defineSlots<UIMessageSlots>()
const props = withDefaults(defineProps<UIMessageProps>(), {
  ui: 'message',
  is: 'div',
  border: false,
  color: 'primary',
  variant: 'soft',
  role: 'status',
})

const ui = useUiKitProps('message', props)

const bem = useUiKitBem(ui)
const rootClass = computed(() => {
  const { border, color, variant } = ui
  return bem([color, variant], { border })
})

const rootAttrs = computed(() => {
  const { role } = ui
  if (role === 'status' || role === 'alert') return { 'aria-atomic': 'true', role }
  return {}
})
</script>

<template>
  <component :is="ui.is" :class="rootClass" v-bind="rootAttrs">
    <slot name="icon">
      <Icon v-if="icon" aria-hidden="true" :class="bem('icon')" :name="icon" />
    </slot>
    <div v-if="title || message || $slots.title || $slots.message" :class="bem('content')">
      <div v-if="title || $slots.title" :class="bem('title')">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="message || $slots.message" :class="bem('message')">
        <slot name="message">{{ message }}</slot>
      </div>
      <slot />
    </div>
  </component>
</template>
