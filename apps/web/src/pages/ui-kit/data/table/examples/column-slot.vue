<script lang="ts" setup>
import { Table, type UITableColumn } from '@dotdev/ui-kit'

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
