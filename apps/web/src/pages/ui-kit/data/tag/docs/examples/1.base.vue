<script lang="ts" setup>
import { Tag } from '@dotdev/ui-kit'

defineExample({
  title: 'Basic usage',
  desc: `Pass a <code>label</code> to render text inside the tag. Use the default slot for fully custom content.`,
})
</script>

<template>
  <Tag label="Stable" />
  <Tag label="Beta" />
  <Tag label="Deprecated" />
</template>
