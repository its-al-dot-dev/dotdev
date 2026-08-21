<script lang="ts" setup>
import { Breadcrumbs } from '@dotdev/ui-kit'

const items = [{ label: 'Documentation', href: '/documentation' }, { label: 'Breadcrumbs' }]
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <Breadcrumbs :items="items" class="text-sm" />
    <Breadcrumbs :items="items" />
    <Breadcrumbs :items="items" class="text-lg" />
  </div>
</template>
