<script lang="ts" setup>
import { Table, type UITableColumn } from '@dotdev/ui-kit'

defineExample({
  title: 'Borders',
  desc: `Use the <code>border</code> prop to control how cells are separated. Available options are <code>rows</code> (default), <code>columns</code>, <code>all</code>, <code>outline</code>, and <code>none</code>.`,
})

const items = [
  { name: 'Einstein', field: 'Physics', year: '1921' },
  { name: 'Curie', field: 'Chemistry', year: '1911' },
  { name: 'Feynman', field: 'Physics', year: '1965' },
]

type Item = (typeof items)[number]

const columns: UITableColumn<Item>[] = [
  { key: 'name', header: 'Name' },
  { key: 'field', header: 'Field' },
  { key: 'year', header: 'Year' },
]
</script>

<template>
  <div class="grid gap-6 w-full">
    <Table :columns="columns" :data="items" border="rows" />
    <Table :columns="columns" :data="items" border="columns" />
    <Table :columns="columns" :data="items" border="all" />
    <Table :columns="columns" :data="items" border="outline" />
    <Table :columns="columns" :data="items" border="none" />
  </div>
</template>
