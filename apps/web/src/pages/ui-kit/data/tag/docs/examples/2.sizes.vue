<script lang="ts" setup>
import { Tag } from '@dotdev/ui-kit'

defineExample({
  title: 'Sizes',
  desc: `The tag scales with the surrounding text size. Use text size utilities such as <code>text-xs</code>, <code>text-sm</code>, <code>text-base</code>, <code>text-lg</code>, and <code>text-xl</code> to adjust it.`,
})
</script>

<template>
  <Tag class="text-xs" label="Extra small" />
  <Tag class="text-sm" label="Small" />
  <Tag class="text-base" label="Medium" />
  <Tag class="text-lg" label="Large" />
  <Tag class="text-xl" label="Extra large" />
</template>
