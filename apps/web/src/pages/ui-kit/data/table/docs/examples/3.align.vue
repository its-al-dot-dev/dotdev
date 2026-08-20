<script lang="ts" setup>
import { Table, type UITableColumn } from '@dotdev/ui-kit'

defineExample({
  title: 'Alignment',
  desc: `Use the <code>align</code> prop to set the default text alignment for all cells. Available values are <code>left</code> (default), <code>center</code>, and <code>right</code>. Individual columns can override this with their own <code>align</code> property.`,
})

const scores = [
  { name: 'Alice', score: 92, grade: 'A' },
  { name: 'Bob', score: 85, grade: 'B+' },
  { name: 'Charlie', score: 78, grade: 'B-' },
  { name: 'Diana', score: 95, grade: 'A+' },
]

type Score = (typeof scores)[number]

const columns: UITableColumn<Score>[] = [
  { key: 'name', header: 'Name' },
  { key: 'score', header: 'Score', align: 'right' },
  { key: 'grade', header: 'Grade', align: 'center' },
]
</script>

<template>
  <div class="grid gap-6 w-full">
    <Table :columns="columns" :data="scores" align="left" />
    <Table :columns="columns" :data="scores" align="center" />
    <Table :columns="columns" :data="scores" align="right" />
  </div>
</template>
