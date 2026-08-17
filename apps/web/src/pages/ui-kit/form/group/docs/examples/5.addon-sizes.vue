<script lang="ts" setup>
import { Group, GroupAddon, Input } from '@dotdev/ui-kit'

defineExample({
  title: 'Addon sizes',
  desc: 'GroupAddon supports three sizes: <code>sm</code>, <code>md</code> (default), <code>lg</code>. Use <code>size="none"</code> to remove sizing constraints.',
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <Group class="-space-x-px">
      <GroupAddon label="sm" size="sm" />
      <Input placeholder="Small addon" size="sm" />
    </Group>

    <Group class="-space-x-px">
      <GroupAddon label="md" size="md" />
      <Input placeholder="Medium addon" />
    </Group>

    <Group class="-space-x-px">
      <GroupAddon label="lg" size="lg" />
      <Input placeholder="Large addon" size="lg" />
    </Group>

    <Group class="-space-x-px">
      <GroupAddon label="none" />
      <Input placeholder="No size constraint" />
    </Group>
  </div>
</template>
