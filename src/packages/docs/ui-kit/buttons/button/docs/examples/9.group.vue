<script lang="ts" setup>
import { Button, Group } from 'dotdev/ui-kit'

defineExample({
  title: 'Button group',
  desc: `Use <code>Group</code> to combine <code>Button</code> with related controls such as inputs and icon actions for a compact toolbar.`,
})
</script>

<template>
  <Group>
    <Button icon="copy" label="Copy" />
    <Button icon="chevron-down" />
  </Group>
  <Group>
    <Button icon="copy" label="Copy" variant="outlined" />
    <Button class="-mx-px" icon="clipboard" label="Paste" variant="outlined" />
    <Button icon="trash" label="Clear" variant="outlined" />
  </Group>
</template>
