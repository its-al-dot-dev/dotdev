<script lang="ts" setup>
import { Tag } from 'dotdev/ui-kit'

defineExpose({
  title: 'Element',
  desc: `Use the <code>is</code> prop to render a different root element, for example a link or a button.`,
})
</script>

<template>
  <Tag label="A link" is="a" href="https://example.com" />
  <Tag label="A button" is="button" />
  <Tag label="A label" is="label" />
</template>
