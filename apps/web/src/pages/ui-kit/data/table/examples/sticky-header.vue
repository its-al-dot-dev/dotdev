<script lang="ts" setup>
import { Table, type UITableColumn } from '@dotdev/ui-kit'

const rows = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  value: Math.floor(Math.random() * 100),
}))

type Row = (typeof rows)[number]

const columns: UITableColumn<Row>[] = [
  { key: 'id', header: '#' },
  { key: 'name', header: 'Name' },
  { key: 'value', header: 'Value' },
]
</script>

<template>
  <div class="max-h-64 w-full overflow-auto rounded-lg border border-default">
    <Table :columns="columns" :data="rows" sticky-header />
  </div>
</template>
