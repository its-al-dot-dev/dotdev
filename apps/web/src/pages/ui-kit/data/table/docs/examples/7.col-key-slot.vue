<script lang="ts" setup>
import { Avatar, Tag, Table, type UITableColumn } from '@dotdev/ui-kit'

defineExample({
  title: 'Per-column slots',
  desc: `Use <code>col-{key}</code> to override a specific column. The slot receives the same scope as <code>column</code>: <code>value</code>, <code>key</code>, <code>data</code>, and <code>index</code>. Per-column slots take priority over the generic <code>column</code> fallback.`,
})

const users = [
  { name: 'Alice', role: 'Admin', status: 'active', avatar: 'https://i.pravatar.cc/40?img=1' },
  { name: 'Bob', role: 'Editor', status: 'active', avatar: 'https://i.pravatar.cc/40?img=3' },
  { name: 'Charlie', role: 'Viewer', status: 'invited', avatar: 'https://i.pravatar.cc/40?img=5' },
  { name: 'Diana', role: 'Editor', status: 'suspended', avatar: 'https://i.pravatar.cc/40?img=8' },
]

type User = (typeof users)[number]

const columns: UITableColumn<User>[] = [
  { key: 'name', header: 'User' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
]

const statusColor: Record<string, string> = {
  active: 'success',
  invited: 'info',
  suspended: 'danger',
}
</script>

<template>
  <Table :columns="columns" :data="users">
    <template #col-name="{ value, data }">
      <div class="flex items-center gap-2">
        <Avatar :src="data.avatar" :alt="String(value)" class="text-xs" />
        <span>{{ value }}</span>
      </div>
    </template>
    <template #col-status="{ value }">
      <Tag :color="statusColor[value as string]" :label="String(value)" />
    </template>
  </Table>
</template>
