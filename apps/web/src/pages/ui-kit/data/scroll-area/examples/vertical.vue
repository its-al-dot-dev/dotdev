<script lang="ts" setup>
import { ScrollArea } from '@dotdev/ui-kit'

const items = Array.from({ length: 40 }, (_, i) => `Item ${i + 1}`)
</script>

<template>
  <div class="h-64 w-full max-w-sm">
    <ScrollArea>
      <ul class="flex flex-col gap-2 pr-4">
        <li v-for="item in items" :key="item" class="rounded-lg border border-default px-3 py-2 text-sm text-muted">
          {{ item }}
        </li>
      </ul>
    </ScrollArea>
  </div>
</template>
