<script lang="ts" setup>
import { Table, type UITableColumn } from '@dotdev/ui-kit'

const loading = [
  { name: '', role: '', status: '' },
  { name: '', role: '', status: '' },
  { name: '', role: '', status: '' },
]

type Row = (typeof loading)[number]

const columns: UITableColumn<Row>[] = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
]
</script>

<template>
  <Table :columns="columns" :data="loading">
    <template #loading-column>
      <div class="h-4 w-3/4 animate-pulse rounded bg-neutral-500/10" />
    </template>
  </Table>
</template>
