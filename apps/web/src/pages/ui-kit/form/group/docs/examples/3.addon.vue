<script lang="ts" setup>
import { Group, GroupAddon, Input } from '@dotdev/ui-kit'

defineExample({
  title: 'GroupAddon',
  desc: 'Use <code>GroupAddon</code> to attach labels, icons, or actions to a group. Set <code>attach</code> to merge the addon border with the group.',
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <Group class="-space-x-px">
      <GroupAddon label="Prefix" />
      <Input placeholder="With prefix addon" />
    </Group>

    <Group class="-space-x-px">
      <Input placeholder="With suffix addon" />
      <GroupAddon label="Suffix" />
    </Group>

    <Group class="-space-x-px">
      <GroupAddon label="Both" />
      <Input placeholder="Both sides" />
      <GroupAddon label="End" />
    </Group>
  </div>
</template>
