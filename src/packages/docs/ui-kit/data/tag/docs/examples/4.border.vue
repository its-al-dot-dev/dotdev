<script lang="ts" setup>
import { Tag } from 'dotdev/ui-kit'

defineExpose({
  title: 'Border',
  desc: `Use the <code>border</code> prop to add an outline around the tag. It is disabled by default.`,
})
</script>

<template>
  <Tag label="Without border" />
  <Tag label="With border" border />
</template>
