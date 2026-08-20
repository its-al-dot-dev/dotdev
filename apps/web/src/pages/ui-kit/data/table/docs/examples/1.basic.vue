<script lang="ts" setup>
import { Table, type UITableColumn } from '@dotdev/ui-kit'

defineExample({
  title: 'Basic usage',
  desc: `Pass an array of <code>data</code> objects and a <code>columns</code> array to define the table structure. Each column needs a <code>key</code> that matches a property in the data, and a <code>header</code> label.`,
})

const members = [
  { name: 'Ada Lovelace', role: 'Engineer', status: 'Active' },
  { name: 'Grace Hopper', role: 'Admiral', status: 'On leave' },
  { name: 'Katherine Johnson', role: 'Analyst', status: 'Active' },
  { name: 'Margaret Hamilton', role: 'Director', status: 'Contractor' },
]

type Member = (typeof members)[number]

const columns: UITableColumn<Member>[] = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
]
</script>

<template>
  <Table :columns="columns" :data="members" />
</template>
