<script lang="ts" setup>
import { Tag } from 'dotdev/ui-kit'

defineExample({
  title: 'Icons',
  desc: `Use the <code>prefixIcon</code> and <code>suffixIcon</code> props to add icons before or after the label.`,
})
</script>

<template>
  <Tag label="Verified" prefixIcon="check-circled" />
  <Tag label="External link" suffixIcon="arrow-right" />
  <Tag label="Both" prefixIcon="bell" suffixIcon="check" />
</template>
