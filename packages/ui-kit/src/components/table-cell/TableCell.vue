<script lang="ts" setup>
import type { UITableCellEmits, UITableCellProps, UITableCellSlots } from './table-cell.types.ts'
import { computed } from 'vue'
import { useUiKitBem, useUiKitProps } from '@dotdev/ui-kit'

defineEmits<UITableCellEmits>()
defineSlots<UITableCellSlots>()
const props = withDefaults(defineProps<UITableCellProps>(), {
  ui: 'table',
  align: 'left',
})

const ui = useUiKitProps('table', props)

const bem = useUiKitBem(ui)
const rootClass = computed(() => bem('cell', [ui.align]))
</script>

<template>
  <td :class="rootClass">
    <slot />
  </td>
</template>
