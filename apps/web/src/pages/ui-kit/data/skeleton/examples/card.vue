<script lang="ts" setup>
import { Button, Skeleton } from '@dotdev/ui-kit'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-default p-4">
    <div class="flex items-center gap-3">
      <Skeleton class="size-10" rounded />
      <div class="flex flex-1 flex-col gap-2">
        <Skeleton class="h-3 w-1/2" />
        <Skeleton class="h-3 w-1/3" />
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <Skeleton />
      <Skeleton />
      <Skeleton class="w-4/5" />
    </div>

    <div class="flex justify-end gap-2">
      <Skeleton class="h-8 w-20" rounded-md />
      <Button size="sm" label="Continue" />
    </div>
  </div>
</template>
