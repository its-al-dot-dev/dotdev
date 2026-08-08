<script lang="ts" setup>
import { computed } from 'vue'
import type { UITagEmits, UITagProps, UITagSlots } from './tag.types.ts'
import { Icon, useUiKitBem, useUiKitProps } from 'dotdev/ui-kit'

defineEmits<UITagEmits>()
defineSlots<UITagSlots>()
const props = withDefaults(defineProps<UITagProps>(), {
  ui: 'tag',
  is: 'div',
  border: false,
})

const ui = useUiKitProps('tag', props)

const bem = useUiKitBem(ui)
const rootClass = computed(() => {
  const { border, rounded } = ui
  return bem({ border, rounded })
})
</script>

<template>
  <component :is="ui.is" :class="rootClass">
    <slot name="prefix" />
    <Icon v-if="prefixIcon" :class="bem('icon')" :name="prefixIcon" />
    <slot />
    <span v-if="label" :class="bem('label')">
      <slot name="label">{{ label }}</slot>
    </span>
    <Icon v-if="suffixIcon" :class="bem('icon')" :name="suffixIcon" />
    <slot name="suffix" />
  </component>
</template>
