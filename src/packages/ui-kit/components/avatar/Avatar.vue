<script lang="ts" setup>
import type { UIAvatarEmits, UIAvatarProps, UIAvatarSlots } from './avatar.types.ts'
import { useUiKitBem, useUiKitProps } from 'dotdev/ui-kit'
import { computed } from 'vue'
import { Icon } from '../icon'

defineEmits<UIAvatarEmits>()
defineSlots<UIAvatarSlots>()
const props = withDefaults(defineProps<UIAvatarProps>(), {
  ui: 'avatar',
  border: false,
  square: false,
  color: 'neutral',
  variant: 'soft',
})

const ui = useUiKitProps('avatar', props)
const bem = useUiKitBem(ui)
const rootClass = computed(() => {
  const { border, color, square, variant } = ui
  return bem([color, variant], { border, square })
})
</script>

<template>
  <div :class="rootClass">
    <img v-if="src" :alt="alt" :class="bem('image')" :src="src" />
    <span v-else-if="label" :class="bem('label')">{{ label }}</span>
    <Icon v-else-if="icon" :class="bem('icon')" :name="icon" />
    <slot />
  </div>
</template>
