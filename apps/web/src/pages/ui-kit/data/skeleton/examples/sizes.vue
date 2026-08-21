<script lang="ts" setup>
import { Skeleton } from '@dotdev/ui-kit'
</script>

<template>
  <div class="flex w-full flex-col gap-3">
    <Skeleton class="h-3" />
    <Skeleton />
    <Skeleton class="h-6" />
    <Skeleton class="h-px w-full" />
  </div>
</template>
