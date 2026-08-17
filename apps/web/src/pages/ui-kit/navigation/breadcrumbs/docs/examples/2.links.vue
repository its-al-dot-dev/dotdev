<script lang="ts" setup>
import { Breadcrumbs } from '@dotdev/ui-kit'

const items = [
  { label: 'Home', href: '/' },
  { label: 'UI Kit', href: '/ui-kit' },
  { label: 'Navigation', href: '/ui-kit/navigation' },
  { label: 'Breadcrumbs' },
]

defineExample({
  title: 'Links',
  desc: `Add <code>href</code> to render an item as a link. The trailing item without a link is marked with <code>aria-current="page"</code>.`,
})
</script>

<template>
  <Breadcrumbs :items="items" />
</template>
