<script lang="ts" setup>
import { Breadcrumbs } from '@dotdev/ui-kit'

const items = [{ label: 'Documentation' }, { label: 'Navigation' }, { label: 'Breadcrumbs' }]
</script>

<template>
  <Breadcrumbs :items="items" />
</template>
