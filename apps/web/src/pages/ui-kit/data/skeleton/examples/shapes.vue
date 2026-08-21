<script lang="ts" setup>
import { Skeleton } from '@dotdev/ui-kit'
</script>

<template>
  <div class="flex items-center gap-4">
    <Skeleton class="size-12" rounded />

    <div class="flex w-full flex-col gap-2">
      <Skeleton class="h-3 w-1/3" />
      <Skeleton class="h-3 w-2/3" />
    </div>
  </div>
</template>
