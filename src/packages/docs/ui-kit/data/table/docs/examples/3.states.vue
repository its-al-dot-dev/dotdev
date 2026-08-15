<script lang="ts" setup>
import { Table, TableCell, TableHead, TableRow } from 'dotdev/ui-kit'

defineExample({
  title: 'States',
  desc: `Rows light up on hover by default; set <code>hover="false"</code> on the table to disable the wash. Pass <code>selected</code> to a <code>TableRow</code> to mark it — for example the currently focused item in a detail panel.`,
})

const releases = [
  { version: 'v0.4.0', date: 'Feb 12, 2026', author: 'asha', selected: false },
  { version: 'v0.3.2', date: 'Jan 28, 2026', author: 'mikolaj', selected: true },
  { version: 'v0.3.0', date: 'Jan 09, 2026', author: 'asha', selected: false },
  { version: 'v0.2.1', date: 'Dec 18, 2025', author: 'tom', selected: false },
]
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <Table>
      <thead>
        <TableRow>
          <TableHead>Version</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Author</TableHead>
        </TableRow>
      </thead>

      <tbody>
        <TableRow v-for="release in releases" :key="release.version" :selected="release.selected">
          <TableCell>{{ release.version }}</TableCell>
          <TableCell>{{ release.date }}</TableCell>
          <TableCell>{{ release.author }}</TableCell>
        </TableRow>
      </tbody>
    </Table>

    <Table hover>
      <thead>
        <TableRow>
          <TableHead>Version</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Author</TableHead>
        </TableRow>
      </thead>

      <tbody>
        <TableRow v-for="release in releases" :key="release.version">
          <TableCell>{{ release.version }}</TableCell>
          <TableCell>{{ release.date }}</TableCell>
          <TableCell>{{ release.author }}</TableCell>
        </TableRow>
      </tbody>
    </Table>
  </div>
</template>
