<script lang="ts" setup>
import type { UITableEmits, UITableProps, UITableSlots } from './table.types.ts'
import { computed } from 'vue'
import { useUiKitBem, useUiKitProps, useUiKitTheme } from '@dotdev/ui-kit'
import { tableStyle } from '@dotdev/theme'

defineEmits<UITableEmits>()
defineSlots<UITableSlots>()
const props = withDefaults(defineProps<UITableProps>(), {
  ui: 'table',
  hover: true,
  stickyHeader: false,
})

const ui = useUiKitProps('table', props)

const bem = useUiKitBem(ui)
useUiKitTheme(ui, tableStyle)
const rootClass = computed(() => bem({ hover: ui.hover, 'sticky-header': ui.stickyHeader }))
</script>

<template>
  <table :class="rootClass">
    <caption v-if="$slots.caption" :class="bem('caption')">
      <slot name="caption" />
    </caption>

    <slot />
  </table>
</template>
