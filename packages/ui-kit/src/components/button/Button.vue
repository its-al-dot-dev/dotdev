<script lang="ts" setup>
import { computed } from 'vue'
import { Icon, useUiKitBem, useUiKitProps, useUiKitTheme } from '@dotdev/ui-kit'
import type { UIButtonEmits, UIButtonProps, UIButtonSlots } from './button.types.ts'
import { buttonStyle } from '@dotdev/theme'

defineSlots<UIButtonSlots>()
const emits = defineEmits<UIButtonEmits>()
const props = withDefaults(defineProps<UIButtonProps>(), {
  ui: 'button',
  size: 'md',
  color: 'primary',
  variant: 'solid',
  iconPos: 'prefix',
  type: 'button',
})

const ui = useUiKitProps('button', props)
useUiKitTheme(ui, buttonStyle)

const bem = useUiKitBem(ui)

const rootClass = computed(() => {
  const { size, color, variant, loading, disabled } = ui
  return bem([size, color, variant], { loading, disabled })
})

const rootAttrs = computed(() => {
  const disabled = !ui.href ? ui.disabled || ui.loading || undefined : undefined
  return {
    disabled,
    href: ui.href ?? undefined,
    target: ui.target || undefined,
    type: (!ui.href && ui.type) || undefined,
  }
})

function onClick(event: MouseEvent) {
  if (ui.disabled || ui.loading) {
    event.preventDefault()
    return
  }
  emits('click', event)
}
</script>

<template>
  <component :is="ui.href ? 'a' : 'button'" :class="rootClass" v-bind="rootAttrs" @click="onClick">
    <slot name="prefix" />
    <Icon
      v-if="(ui.icon && ui.iconPos === 'prefix') || ui.loading"
      :class="bem('icon')"
      :name="ui.loading ? 'loading' : ui.icon!"
    />

    <slot>{{ label }}</slot>

    <Icon v-if="ui.icon && ui.iconPos === 'suffix' && !ui.loading" :class="bem('icon')" :name="ui.icon" />
    <slot name="suffix" />
  </component>
</template>
