<script lang="ts" setup>
import { Button, Group, GroupAddon, Input, Select } from '@dotdev/ui-kit'

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
]
</script>

<template>
  <div class="flex flex-col gap-4">
    <Group>
      <GroupAddon label="$" />
      <Input placeholder="Amount" type="number" />
      <GroupAddon label="USD" />
    </Group>

    <Group>
      <GroupAddon>
        <span class="font-mono text-muted">����</span>
      </GroupAddon>
      <Input placeholder="Search..." />
      <Button icon="filter" />
    </Group>

    <Group axis="y">
      <Group>
        <GroupAddon label="From" />
        <Input placeholder="Start date" type="date" />
        <GroupAddon label="To" />
        <Input placeholder="End date" type="date" />
      </Group>

      <Group>
        <GroupAddon label="Select" />
        <Select :options="options" placeholder="Choose" />
      </Group>
    </Group>
  </div>
</template>
