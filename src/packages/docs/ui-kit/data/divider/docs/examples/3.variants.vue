<script lang="ts" setup>
import { Divider } from 'dotdev/ui-kit'

defineExample({
  title: 'Variants',
  desc: `Three line styles are available: <code>solid</code>, <code>dashed</code>, and <code>dotted</code>.`,
})
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <Divider label="Solid" />
    <Divider label="Dashed" variant="dashed" />
    <Divider label="Dotted" variant="dotted" />
  </div>
</template>
