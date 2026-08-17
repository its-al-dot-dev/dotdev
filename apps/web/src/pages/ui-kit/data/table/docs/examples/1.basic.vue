<script lang="ts" setup>
import { Table, TableCell, TableHead, TableRow } from '@dotdev/ui-kit'

defineExample({
  title: 'Basic usage',
  desc: `Compose a <code>Table</code> from <code>TableRow</code>, <code>TableHead</code>, and <code>TableCell</code> inside native <code>thead</code>/<code>tbody</code>. Header cells render as a muted uppercase label; body cells align left. The <code>caption</code> slot labels the table for both sighted and assistive readers.`,
})

const members = [
  { name: 'Ada Lovelace', role: 'Engineer', status: 'Active' },
  { name: 'Grace Hopper', role: 'Admiral', status: 'On leave' },
  { name: 'Katherine Johnson', role: 'Analyst', status: 'Active' },
  { name: 'Margaret Hamilton', role: 'Director', status: 'Contractor' },
]
</script>

<template>
  <Table>
    <template #caption>Team members</template>

    <thead>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </thead>

    <tbody>
      <TableRow v-for="member in members" :key="member.name">
        <TableCell>{{ member.name }}</TableCell>
        <TableCell>{{ member.role }}</TableCell>
        <TableCell>{{ member.status }}</TableCell>
      </TableRow>
    </tbody>
  </Table>
</template>
