<script lang="ts" setup>
import { Table, type UITableColumn } from '@dotdev/ui-kit'

const items = [
  { name: 'Vue', type: 'Framework', stars: '48k' },
  { name: 'React', type: 'Library', stars: '230k' },
  { name: 'Svelte', type: 'Compiler', stars: '82k' },
  { name: 'Angular', type: 'Framework', stars: '97k' },
  { name: 'Solid', type: 'Library', stars: '33k' },
]

type Item = (typeof items)[number]

const columns: UITableColumn<Item>[] = [
  { key: 'name', header: 'Name' },
  { key: 'type', header: 'Type' },
  { key: 'stars', header: 'Stars' },
]
</script>

<template>
  <div class="grid gap-6 w-full">
    <Table :columns="columns" :data="items" :hover="true" :striped="true" />
    <Table :columns="columns" :data="items" :hover="true" :striped="false" />
    <Table :columns="columns" :data="items" :hover="false" :striped="true" />
    <Table :columns="columns" :data="items" :hover="false" :striped="false" />
  </div>
</template>
