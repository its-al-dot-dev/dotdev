<script lang="ts" setup>
import { Table, type UITableColumn } from '@dotdev/ui-kit'

defineExample({
  title: 'Column slot',
  desc: `The <code>column</code> slot is a fallback that applies to every body cell. It receives <code>value</code> (the cell data), <code>key</code> (the column key), <code>data</code> (the full row object), and <code>index</code> (the row index). Use it when you need a consistent transformation across all columns — for example, rendering all values as uppercase text.`,
})

const items = [
  { name: 'Alice', role: 'admin', status: 'active' },
  { name: 'Bob', role: 'editor', status: 'invited' },
  { name: 'Charlie', role: 'viewer', status: 'active' },
]

type Item = (typeof items)[number]

const columns: UITableColumn<Item>[] = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
]
</script>

<template>
  <Table :columns="columns" :data="items">
    <template #column="{ value }">
      <span class="uppercase text-xs">{{ value }}</span>
    </template>
  </Table>
</template>
