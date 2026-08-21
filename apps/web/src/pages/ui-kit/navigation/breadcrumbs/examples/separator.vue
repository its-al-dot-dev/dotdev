<script lang="ts" setup>
import { Breadcrumbs } from '@dotdev/ui-kit'

const items = [{ label: 'Documentation', href: '/documentation' }, { label: 'Breadcrumbs' }]
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
