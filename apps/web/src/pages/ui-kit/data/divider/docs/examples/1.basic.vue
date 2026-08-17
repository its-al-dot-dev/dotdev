<script lang="ts" setup>
import { Divider } from '@dotdev/ui-kit'

defineExample({
  title: 'Basic usage',
  desc: `A <code>Divider</code> separates content. By default it renders as a single <code>horizontal</code> <code>solid</code> hairline; pass <code>orientation="vertical"</code> to split content side by side.`,
})
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <div class="flex flex-col gap-3">
      <p class="text-sm text-muted">Top section</p>
      <Divider />
      <p class="text-sm text-muted">Bottom section</p>
    </div>

    <div class="flex h-10 items-center gap-4">
      <span class="text-sm text-muted">Left</span>
      <Divider orientation="vertical" />
      <span class="text-sm text-muted">Right</span>
    </div>
  </div>
</template>
