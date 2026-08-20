<script generic="T extends UITableData" lang="ts" setup>
import type { UITableData, UITableEmits, UITableProps, UITableSlots } from './table.types.ts'
import { computed } from 'vue'
import { asTemplateRef, useUiKitBem, useUiKitProps, useUiKitTheme } from '@dotdev/ui-kit'
import { tableStyle } from '@dotdev/theme'
import { Scope } from '@dotdev/ui-kit/components'

defineEmits<UITableEmits>()
defineSlots<UITableSlots<T>>()
const props = withDefaults(defineProps<UITableProps<T>>(), {
  ui: 'table',
  hover: true,
  border: 'rows',
  striped: false,
  stickyHeader: false,
})

const ui = useUiKitProps('table', props)

const bem = useUiKitBem(ui)
useUiKitTheme(ui, tableStyle)

const rootClass = computed(() => {
  const { striped, stickyHeader, border, align, hover } = ui
  return bem([border], { hover, align, striped, 'sticky-header': stickyHeader })
})

const uit = asTemplateRef(ui)
</script>

<template>
  <component is="table" :class="rootClass">
    <caption v-if="$slots.caption" :class="bem('caption')">
      <slot name="caption" />
    </caption>

    <thead>
      <tr>
        <th
          v-for="column in uit.columns"
          :key="column.key"
          :class="bem('head')"
          :style="{ width: column.width }"
          scope="col"
        >
          <slot :key="column.key" :name="`header-${column.key}`" :value="column.header">
            <slot :key="column.key" :value="column.header" name="header">
              {{ column.header }}
            </slot>
          </slot>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, idx) in uit.data" :key="idx" :class="bem('row')">
        <Scope
          is="td"
          v-for="column in uit.columns"
          :key="column.key"
          #default="scope"
          :class="bem('cell')"
          :scope="{ key: column.key, value: item[column.key], data: item, index: idx }"
          :style="{ width: column.width }"
        >
          <slot name="loading-column" v-bind="scope">
            <slot :name="`col-${column.key}`" v-bind="scope">
              <slot name="column" v-bind="scope">
                {{ item[column.key] }}
              </slot>
            </slot>
          </slot>
        </Scope>
      </tr>
    </tbody>

    <tfoot v-if="$slots.footer">
      <tr>
        <td :class="bem('cell')" :colspan="uit.columns?.length">
          <slot name="footer" />
        </td>
      </tr>
    </tfoot>
  </component>
</template>
