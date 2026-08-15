<script lang="ts" setup>
import { Avatar, IconButton, Table, TableCell, TableHead, TableRow, Tag } from 'dotdev/ui-kit'

defineExample({
  title: 'Rich cells',
  desc: `Cells are plain slots, so any component composes inside them — avatars, tags, and actions line up in one consistent row height.`,
})

const members = [
  { name: 'Ada Lovelace', email: 'ada@dot.dev', role: 'Engineer', color: 'primary', state: 'Active' },
  { name: 'Grace Hopper', email: 'grace@dot.dev', role: 'Admiral', color: 'info', state: 'On leave' },
  { name: 'Katherine Johnson', email: 'kate@dot.dev', role: 'Analyst', color: 'success', state: 'Active' },
  { name: 'Margaret Hamilton', email: 'marge@dot.dev', role: 'Director', color: 'warning', state: 'Contractor' },
] as const
</script>

<template>
  <Table>
    <thead>
      <TableRow>
        <TableHead>Member</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>State</TableHead>
        <TableHead align="right">Actions</TableHead>
      </TableRow>
    </thead>

    <tbody>
      <TableRow v-for="member in members" :key="member.email">
        <TableCell>
          <div class="flex items-center gap-3">
            <Avatar :label="member.name.split(' ').map((part) => part[0]).join('')" color="neutral" />
            <div class="min-w-0">
              <div class="text-sm font-medium text-foreground">{{ member.name }}</div>
              <div class="font-mono text-xs text-muted">{{ member.email }}</div>
            </div>
          </div>
        </TableCell>

        <TableCell>
          <Tag :color="member.color">{{ member.role }}</Tag>
        </TableCell>

        <TableCell>{{ member.state }}</TableCell>

        <TableCell align="right">
          <div class="flex justify-end gap-1">
            <IconButton aria-label="Edit" icon="pencil-1" size="sm" variant="ghost" />
            <IconButton aria-label="Delete" icon="trash" size="sm" variant="ghost" />
          </div>
        </TableCell>
      </TableRow>
    </tbody>
  </Table>
</template>
