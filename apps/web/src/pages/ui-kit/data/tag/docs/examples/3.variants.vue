<script lang="ts" setup>
import { Tag } from '@dotdev/ui-kit'

defineExample({
  title: 'Variants',
  desc: `Tags support <code>soft</code> and <code>solid</code> variants. <code>soft</code> is used by default.`,
})
</script>

<template>
  <div class="flex gap-4 w-full justify-center flex-wrap">
    <Tag color="primary" label="Primary" />
    <Tag color="primary" variant="solid" label="Primary" />
    <Tag color="neutral" label="Neutral" />
    <Tag color="neutral" variant="solid" label="Neutral" />
    <Tag color="success" label="Success" />
    <Tag color="success" variant="solid" label="Success" />
    <Tag color="warning" label="Warning" />
    <Tag color="warning" variant="solid" label="Warning" />
    <Tag color="danger" label="Danger" />
    <Tag color="danger" variant="solid" label="Danger" />
    <Tag color="info" label="Info" />
    <Tag color="info" variant="solid" label="Info" />
  </div>
</template>
