<script lang="ts" setup>
import { Icon, Tag } from '@dotdev/ui-kit'
</script>

<template>
  <Tag>
    <template #prefix>
      <Icon class="text-green-500" name="check-circled" />
    </template>
    Custom content
    <template #suffix>
      <Icon class="text-red-500" name="cross-2" />
    </template>
  </Tag>
</template>
