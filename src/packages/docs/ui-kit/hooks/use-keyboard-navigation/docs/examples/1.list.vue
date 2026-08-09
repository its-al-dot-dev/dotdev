<script lang="ts" setup>
import { useKeyboardNavigation } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExpose({
  title: 'List navigation',
  desc: `Navigate a single-column list with <code>ArrowUp</code> / <code>ArrowDown</code>. Use <code>isSkipped</code> to mark items as unfocusable, e.g. disabled ones.`,
})

const items = ref([
  { label: 'Alpha', disabled: false },
  { label: 'Beta', disabled: true },
  { label: 'Gamma', disabled: false },
  { label: 'Delta', disabled: false },
  { label: 'Epsilon', disabled: true },
  { label: 'Zeta', disabled: false },
])

const { currentIndex, currentItem, onKeydown } = useKeyboardNavigation(items, {
  mode: 'list',
  isSkipped: (item) => item.disabled,
  onLeftEdgeReached: log,
  onRightEdgeReached: log,
  onStartReached: log,
  onEndReached: log,
})

function log(...args: any) {
  console.log(args[0])
  return undefined
}
</script>

<template>
  <div>
    <div
      class="flex w-56 flex-col gap-0.5 rounded-xl border border-primary-200 bg-white p-1 outline-none transition-[border-color] focus:border-primary-400 dark:bg-primary-950"
      tabindex="0"
      @keydown="onKeydown"
    >
      <div
        v-for="(item, index) in items"
        :key="item.label"
        :class="
          item.disabled
            ? 'cursor-not-allowed text-primary-400/50 dark:text-primary-600/50'
            : index === currentIndex
              ? 'bg-primary-100 text-primary-900 dark:bg-primary-800 dark:text-primary-100'
              : 'text-primary-700 dark:text-primary-300'
        "
        class="rounded-lg px-3 py-1.5 text-sm"
      >
        {{ item.label }}
      </div>
    </div>

    <p class="mt-2 text-sm text-primary-500">Current: {{ currentItem?.label ?? 'none' }}</p>
  </div>
</template>
