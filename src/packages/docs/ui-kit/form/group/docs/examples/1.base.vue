<script lang="ts" setup>
import { Group, Input } from 'dotdev/ui-kit'

defineExample({
  title: 'Basic usage',
  desc: 'Wrap related controls in a <code>Group</code>. By default it arranges children horizontally.',
})
</script>

<template>
  <Group class="-space-x-px">
    <Input placeholder="First name" />
    <Input placeholder="Last name" />
  </Group>
</template>
