<script lang="ts" setup>
import { Group, GroupAddon, Input } from '@dotdev/ui-kit'

defineExample({
  title: 'Addon variants',
  desc: 'GroupAddon supports the same semantic variants as form controls: <code>outlined</code>, <code>soft</code>, <code>underlined</code>, <code>plain</code>.',
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <Group>
      <GroupAddon label="outlined" variant="outlined" />
      <Input placeholder="Outlined addon" />
    </Group>

    <Group>
      <GroupAddon label="soft" variant="soft" />
      <Input placeholder="Soft addon" />
    </Group>

    <Group>
      <GroupAddon label="underlined" variant="underlined" />
      <Input placeholder="Underlined addon" variant="underlined" />
    </Group>

    <Group>
      <GroupAddon label="plain" variant="plain" />
      <Input placeholder="Plain addon" />
    </Group>
  </div>
</template>
