<script lang="ts" setup>
import { Breadcrumbs } from '@dotdev/ui-kit'

const items = [
  { label: 'UI Kit', href: '/ui-kit' },
  { label: 'Navigation', href: '/ui-kit/navigation' },
  { label: 'Breadcrumbs' },
]
</script>

<template>
  <Breadcrumbs :items="items">
    <template #default="{ item }">
      <span class="font-mono">{{ item.label }}</span>
    </template>
  </Breadcrumbs>
</template>
