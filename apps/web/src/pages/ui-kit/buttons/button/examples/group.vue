<script lang="ts" setup>
import { Button, Group } from '@dotdev/ui-kit'
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
