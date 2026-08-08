<script lang="ts" setup>
import { Tag } from 'dotdev/ui-kit'

defineExpose({
  title: 'Colors',
  desc: `The tag uses the current text color, so set it with text color utilities such as <code>text-blue-500</code> or <code>text-green-500</code>.`,
})
</script>

<template>
  <div class="flex gap-4 w-full justify-center">
    <Tag class="text-blue-500" label="Primary" />
    <Tag class="text-green-500" label="Success" />
    <Tag class="text-yellow-500" label="Warning" />
    <Tag class="text-red-500" label="Danger" />
    <Tag class="text-purple-500" label="Purple" />
    <Tag class="text-neutral-500" label="Neutral" />
  </div>

  <div class="flex gap-4 w-full justify-center">
    <Tag border class="text-blue-500" label="Primary" />
    <Tag border class="text-green-500" label="Success" />
    <Tag border class="text-yellow-500" label="Warning" />
    <Tag border class="text-red-500" label="Danger" />
    <Tag border class="text-purple-500" label="Purple" />
    <Tag border class="text-neutral-500" label="Neutral" />
  </div>
</template>
