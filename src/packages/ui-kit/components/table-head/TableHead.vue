<script lang="ts" setup>
import type { UITableHeadEmits, UITableHeadProps, UITableHeadSlots } from './table-head.types.ts'
import { computed } from 'vue'
import { useUiKitBem, useUiKitProps } from 'dotdev/ui-kit'

defineEmits<UITableHeadEmits>()
defineSlots<UITableHeadSlots>()
const props = withDefaults(defineProps<UITableHeadProps>(), {
  ui: 'table',
  align: 'left',
  scope: 'col',
})

const ui = useUiKitProps('table', props)

const bem = useUiKitBem(ui)
const rootClass = computed(() => bem('head', [ui.align]))
</script>

<template>
  <th :class="rootClass" :scope="ui.scope" :style="ui.width ? { width: ui.width } : undefined">
    <slot />
  </th>
</template>
