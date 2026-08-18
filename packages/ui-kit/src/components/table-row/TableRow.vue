<script lang="ts" setup>
import type { UITableRowEmits, UITableRowProps, UITableRowSlots } from './table-row.types.ts'
import { computed } from 'vue'
import { useUiKitBem, useUiKitProps, useUiKitTheme } from '@dotdev/ui-kit'
import { template } from '../templates/table.ts'

defineEmits<UITableRowEmits>()
defineSlots<UITableRowSlots>()
const props = withDefaults(defineProps<UITableRowProps>(), {
  ui: 'table',
  selected: false,
})

const ui = useUiKitProps('table', props)

const bem = useUiKitBem(ui)
useUiKitTheme(ui, template)
const rootClass = computed(() => bem('row', { selected: ui.selected }))
</script>

<template>
  <tr :class="rootClass">
    <slot />
  </tr>
</template>
