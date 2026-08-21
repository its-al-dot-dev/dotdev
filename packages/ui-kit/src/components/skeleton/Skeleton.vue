<script lang="ts" setup>
import { computed } from 'vue'
import type { UISkeletonEmits, UISkeletonProps, UISkeletonSlots } from './skeleton.types.ts'
import { useUiKitBem, useUiKitProps, useUiKitTheme } from '@dotdev/ui-kit'
import { skeletonStyle } from '@dotdev/theme'

defineEmits<UISkeletonEmits>()
defineSlots<UISkeletonSlots>()
const props = withDefaults(defineProps<UISkeletonProps>(), {
  ui: 'skeleton',
  is: 'div',
  variant: 'pulse',
  rounded: false,
})

const ui = useUiKitProps('skeleton', props)

const bem = useUiKitBem(ui)
useUiKitTheme(ui, skeletonStyle)
const rootClass = computed(() => {
  const { variant } = ui
  return bem([variant], { rounded: ui.rounded })
})
</script>

<template>
  <component :is="ui.is" :class="rootClass" />
</template>
