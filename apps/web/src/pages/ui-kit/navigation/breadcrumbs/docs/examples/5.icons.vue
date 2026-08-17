<script lang="ts" setup>
import { Breadcrumbs, type UIBreadcrumbItem } from '@dotdev/ui-kit'

const items: UIBreadcrumbItem[] = [
  { label: 'Home', icon: 'home', href: '/' },
  { label: 'Components', icon: 'component-1', href: '/ui-kit' },
  { label: 'Breadcrumbs', icon: 'dots-horizontal' },
]

defineExample({
  title: 'Icons',
  desc: `Each item accepts an <code>icon</code> rendered before the label.`,
})
</script>

<template>
  <Breadcrumbs :items="items" />
</template>
