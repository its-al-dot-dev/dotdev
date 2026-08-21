<script lang="ts" setup>
import { Table, type UITableColumn } from '@dotdev/ui-kit'

const items = [
  { name: 'Laptop', qty: 2, unit: '$1,200', total: '$2,400' },
  { name: 'Monitor', qty: 1, unit: '$450', total: '$450' },
  { name: 'Keyboard', qty: 3, unit: '$75', total: '$225' },
]

type Item = (typeof items)[number]

const columns: UITableColumn<Item>[] = [
  { key: 'name', header: 'Item' },
  { key: 'qty', header: 'Qty' },
  { key: 'unit', header: 'Unit price' },
  { key: 'total', header: 'Total' },
]
</script>

<template>
  <Table :columns="columns" :data="items">
    <template #caption>
      <div class="flex items-center justify-between">
        <span class="font-medium text-sm">Order #1042</span>
        <span class="text-xs opacity-60">Placed today</span>
      </div>
    </template>
    <template #footer>
      <div class="flex items-center justify-between text-sm font-medium">
        <span>Grand total</span>
        <span>$3,075</span>
      </div>
    </template>
  </Table>
</template>
