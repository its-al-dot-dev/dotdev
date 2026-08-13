<script lang="ts" setup>
import type { UIGroupAddonEmits, UIGroupAddonProps, UIGroupAddonSlots } from './group.types.ts'
import { useUiKitBem, useUiKitProps } from 'dotdev/ui-kit'
import { computed } from 'vue'

defineEmits<UIGroupAddonEmits>()
defineSlots<UIGroupAddonSlots>()
const props = withDefaults(defineProps<UIGroupAddonProps>(), {
  ui: 'group-addon',
  size: 'md',
  variant: 'plain',
})

const ui = useUiKitProps('group-addon', props)
const bem = useUiKitBem(ui)

const rootClass = computed(() => bem([ui.size, ui.variant], { attach: ui.attach }))
</script>

<template>
  <div :class="rootClass">
    {{ label }}
    <slot />
  </div>
</template>
