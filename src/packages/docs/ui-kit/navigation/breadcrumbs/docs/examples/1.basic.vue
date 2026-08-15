<script lang="ts" setup>
import { Breadcrumbs } from 'dotdev/ui-kit'

const items = [
  { label: 'Documentation' },
  { label: 'Navigation' },
  { label: 'Breadcrumbs' },
]

defineExample({
  title: 'Basic usage',
  desc: `Pass an <code>items</code> array of <code>{ label }</code> entries. The last item is rendered as the current page segment.`,
})
</script>

<template>
  <Breadcrumbs :items="items" />
</template>
