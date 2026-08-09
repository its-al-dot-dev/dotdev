<script lang="ts" setup>
import { useKeyboardNavigation } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExpose({
  title: 'Grid navigation',
  desc: `Navigate a multi-column grid in all four directions with <code>mode="grid"</code> and <code>columns</code>. Boundary callbacks wrap the focus around the edges.`,
})

const items = ref(Array.from({ length: 12 }, (_, index) => `Item ${index + 1}`))
const columns = 4

const { currentIndex, currentItem, onKeydown } = useKeyboardNavigation(items, {
  mode: 'grid',
  columns,
  onStartReached: () => items.value.length - 1,
  onEndReached: () => 0,
  onLeftEdgeReached: ({ currentIndex }) => currentIndex + columns - 1,
  onRightEdgeReached: ({ currentIndex }) => currentIndex - (columns - 1),
})
</script>

<template>
  <div>
    <div
      tabindex="0"
      class="grid w-max grid-cols-4 gap-2 rounded-xl border border-primary-200 bg-white p-2 outline-none transition-[border-color] focus:border-primary-400 dark:bg-primary-950"
      @keydown="onKeydown"
    >
      <div
        v-for="(item, index) in items"
        :key="item"
        class="flex h-14 w-14 items-center justify-center rounded-lg text-xs font-medium"
        :class="index === currentIndex
          ? 'bg-primary-100 text-primary-900 dark:bg-primary-800 dark:text-primary-100'
          : 'text-primary-700 dark:text-primary-300'"
      >
        {{ item }}
      </div>
    </div>

    <p class="mt-2 text-sm text-primary-500">
      Current: {{ currentItem ?? 'none' }}
    </p>
  </div>
</template>
