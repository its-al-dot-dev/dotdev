<script lang="ts" setup>
import { Breadcrumbs } from '@dotdev/ui-kit'

const items = [{ label: 'Documentation', href: '/documentation' }, { label: 'Breadcrumbs' }]

defineExample({
  title: 'Scaling',
  desc: `Breadcrumbs inherit the font size of their parent — text, gap and separator all scale together. Set <code>font-size</code> on the wrapping element; by default the trail matches the app's base text size.`,
})
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <Breadcrumbs :items="items" class="text-sm" />
    <Breadcrumbs :items="items" />
    <Breadcrumbs :items="items" class="text-lg" />
  </div>
</template>
