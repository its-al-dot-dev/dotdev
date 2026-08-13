<script lang="ts" setup>
import { Tag } from 'dotdev/ui-kit'

defineExample({
  title: 'Rounded',
  desc: `Use the <code>rounded</code> prop to render the tag with a fully rounded (pill) shape.`,
})
</script>

<template>
  <Tag label="Square" />
  <Tag label="Rounded" rounded />
</template>
