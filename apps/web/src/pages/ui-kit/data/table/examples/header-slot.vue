<script lang="ts" setup>
import { Icon, Table, type UITableColumn } from '@dotdev/ui-kit'

const items = [
  { name: 'Vue', stars: 48000, license: 'MIT' },
  { name: 'React', stars: 230000, license: 'MIT' },
  { name: 'Svelte', stars: 82000, license: 'MIT' },
]

type Item = (typeof items)[number]

const columns: UITableColumn<Item>[] = [
  { key: 'name', header: 'Framework' },
  { key: 'stars', header: 'Stars' },
  { key: 'license', header: 'License' },
]
</script>

<template>
  <Table :columns="columns" :data="items">
    <template #header="{ value }">
      <div class="flex items-center gap-1">
        <Icon name="arrow-up" />
        {{ value }}
      </div>
    </template>
    <template #header-stars>
      <div class="flex items-center gap-1">
        <Icon class="text-amber-500" name="star" />
        Stars
      </div>
    </template>
  </Table>
</template>
