<script lang="ts" setup>
import { Breadcrumbs } from '@dotdev/ui-kit'

const items = [
  { label: 'Documentation', href: '/documentation' },
  { label: 'Breadcrumbs' },
]

defineExample({
  title: 'Separator',
  desc: `The default separator is a <code>/</code> character. Pass <code>separatorIcon</code> to use an icon, or override the <code>separator</code> slot entirely.`,
})
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <Breadcrumbs :items="items" />
    <Breadcrumbs :items="items" separator="›" />
    <Breadcrumbs :items="items" separatorIcon="chevron-right" />
    <Breadcrumbs :items="items">
      <template #separator>
        <span class="text-muted">·</span>
      </template>
    </Breadcrumbs>
  </div>
</template>
