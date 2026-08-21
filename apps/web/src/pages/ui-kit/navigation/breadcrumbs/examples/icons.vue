<script lang="ts" setup>
import { Breadcrumbs, type UIBreadcrumbItem } from '@dotdev/ui-kit'

const items: UIBreadcrumbItem[] = [
  { label: 'Home', icon: 'home', href: '/' },
  { label: 'Components', icon: 'component-1', href: '/ui-kit' },
  { label: 'Breadcrumbs', icon: 'dots-horizontal' },
]
</script>

<template>
  <Breadcrumbs :items="items" />
</template>
