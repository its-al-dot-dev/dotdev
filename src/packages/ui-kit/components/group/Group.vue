<script lang="ts" setup>
import type { UIGroupEmits, UIGroupProps, UIGroupSlots } from './group.types.ts'
import { useUiKitBem, useUiKitProps } from 'dotdev/ui-kit'
import { computed } from 'vue'

defineEmits<UIGroupEmits>()
defineSlots<UIGroupSlots>()
const props = withDefaults(defineProps<UIGroupProps>(), {
  ui: 'group',
  axis: 'x',
})

const ui = useUiKitProps('group', props)

const bem = useUiKitBem(ui)

const rootClass = computed(() => bem([ui.axis]))
</script>

<template>
  <div :class="rootClass">
    <slot />
  </div>
</template>
