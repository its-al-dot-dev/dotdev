<script lang="ts" setup>
import { Tag } from 'dotdev/ui-kit'

defineExample({
  title: 'Colors',
  desc: `Use the <code>color</code> prop to pick from the built-in palette: <code>primary</code>, <code>neutral</code>, <code>success</code>, <code>warning</code>, <code>danger</code>, and <code>info</code>.`,
})
</script>

<template>
  <div class="flex gap-4 w-full justify-center flex-wrap">
    <Tag color="primary" label="Primary" />
    <Tag color="neutral" label="Neutral" />
    <Tag color="success" label="Success" />
    <Tag color="warning" label="Warning" />
    <Tag color="danger" label="Danger" />
    <Tag color="info" label="Info" />
  </div>
</template>
