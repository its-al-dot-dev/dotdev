<script lang="ts" setup>
import { ScrollArea } from '@dotdev/ui-kit'

const cards = Array.from({ length: 12 }, (_, i) => `Card ${i + 1}`)
</script>

<template>
  <div class="h-40 w-full">
    <ScrollArea>
      <div class="flex w-max items-stretch gap-4 pb-4">
        <div
          v-for="card in cards"
          :key="card"
          class="flex h-24 w-40 shrink-0 flex-col items-center justify-center rounded-xl border border-default text-sm text-muted"
        >
          {{ card }}
        </div>
      </div>
    </ScrollArea>
  </div>
</template>
