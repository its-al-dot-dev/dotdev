<script lang="ts" setup>
import { Table, TableCell, TableHead, TableRow } from 'dotdev/ui-kit'

defineExample({
  title: 'Sticky header',
  desc: `Pass <code>sticky-header</code> and put the table in a scroll container: the header stays pinned with a canvas-fill background while rows scroll underneath.`,
})

const logs = Array.from({ length: 14 }, (_, index) => ({
  time: `14:${String(12 + index).padStart(2, '0')}`,
  event: ['Deploy', 'Build', 'Test', 'Lint', 'Migrate'][index % 5],
  status: index % 3 === 0 ? 'Failed' : 'Passed',
}))
</script>

<template>
  <div class="max-h-72 w-full overflow-auto">
    <Table sticky-header>
      <thead>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Event</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </thead>

      <tbody>
        <TableRow v-for="log in logs" :key="`${log.time}-${log.event}`">
          <TableCell>{{ log.time }}</TableCell>
          <TableCell>{{ log.event }}</TableCell>
          <TableCell>{{ log.status }}</TableCell>
        </TableRow>
      </tbody>
    </Table>
  </div>
</template>
