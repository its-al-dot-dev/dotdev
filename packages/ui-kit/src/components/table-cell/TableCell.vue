<script lang="ts" setup>
import type { UITableCellEmits, UITableCellProps, UITableCellSlots } from './table-cell.types.ts'
import { computed } from 'vue'
import { useUiKitBem, useUiKitProps, useUiKitTheme } from '@dotdev/ui-kit'
import { template } from '../templates/table.ts'

defineEmits<UITableCellEmits>()
defineSlots<UITableCellSlots>()
const props = withDefaults(defineProps<UITableCellProps>(), {
  ui: 'table',
  align: 'left',
})

const ui = useUiKitProps('table', props)

const bem = useUiKitBem(ui)
useUiKitTheme(ui, template)
const rootClass = computed(() => bem('cell', [ui.align]))
</script>

<template>
  <td :class="rootClass">
    <slot />
  </td>
</template>
