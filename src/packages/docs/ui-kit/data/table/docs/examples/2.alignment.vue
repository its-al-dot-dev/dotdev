<script lang="ts" setup>
import { Table, TableCell, TableHead, TableRow } from 'dotdev/ui-kit'

defineExample({
  title: 'Alignment',
  desc: `Align any column independently with the <code>align</code> prop on <code>TableHead</code> and <code>TableCell</code>. Pass <code>width</code> to a header cell to lock a column — numeric columns read best centered, deltas right-aligned.`,
})

const rows = [
  { metric: 'Pushes', q1: '1,204', q2: '1,981', delta: '+64.5%' },
  { metric: 'Issues closed', q1: '412', q2: '386', delta: '-6.3%' },
  { metric: 'Review time', q1: '2d 4h', q2: '1d 9h', delta: '-31.2%' },
  { metric: 'Commits', q1: '3,017', q2: '4,256', delta: '+41.1%' },
]
</script>

<template>
  <Table>
    <thead>
      <TableRow>
        <TableHead>Metric</TableHead>
        <TableHead align="center" width="120px">Q1</TableHead>
        <TableHead align="center" width="120px">Q2</TableHead>
        <TableHead align="right">Delta</TableHead>
      </TableRow>
    </thead>

    <tbody>
      <TableRow v-for="row in rows" :key="row.metric">
        <TableCell>{{ row.metric }}</TableCell>
        <TableCell align="center">{{ row.q1 }}</TableCell>
        <TableCell align="center">{{ row.q2 }}</TableCell>
        <TableCell align="right">{{ row.delta }}</TableCell>
      </TableRow>
    </tbody>
  </Table>
</template>
