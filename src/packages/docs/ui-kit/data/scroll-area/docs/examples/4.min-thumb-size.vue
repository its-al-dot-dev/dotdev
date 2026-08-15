<script lang="ts" setup>
import { ScrollArea } from 'dotdev/ui-kit'

defineExample({
  title: 'minThumbSize',
  desc: `The <code>minThumbSize</code> prop (default <code>20</code>) prevents the thumb from disappearing on long content — compare a <code>20px</code> and a <code>60px</code> minimum.`,
})

const items = Array.from({ length: 60 }, (_, i) => `Item ${i + 1}`)
</script>

<template>
  <div class="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
    <div class="h-64">
      <ScrollArea :min-thumb-size="20">
        <ul class="flex flex-col gap-2 pr-4">
          <li
            v-for="item in items"
            :key="item"
            class="rounded-lg border border-default px-3 py-2 text-sm text-muted"
          >
            {{ item }}
          </li>
        </ul>
      </ScrollArea>
    </div>

    <div class="h-64">
      <ScrollArea :min-thumb-size="60">
        <ul class="flex flex-col gap-2 pr-4">
          <li
            v-for="item in items"
            :key="item"
            class="rounded-lg border border-default px-3 py-2 text-sm text-muted"
          >
            {{ item }}
          </li>
        </ul>
      </ScrollArea>
    </div>
  </div>
</template>
