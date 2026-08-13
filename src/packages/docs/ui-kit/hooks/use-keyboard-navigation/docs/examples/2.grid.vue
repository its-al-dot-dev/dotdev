<script lang="ts" setup>
import { useKeyboardNavigation } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Grid navigation',
  desc: `Navigate a multi-column grid in all four directions with <code>columns</code>. Use <code>edgeX</code> / <code>edgeY: "auto"</code> to wrap around the edges, <code>isSkipped</code> to disable individual cells and boundary callbacks to observe edge crossings.`,
})

const items = ref<{ label: string; disabled: boolean }[]>([
  { label: 'Alpha', disabled: false },
  { label: 'Beta', disabled: true },
  { label: 'Gamma', disabled: false },
  { label: 'Delta', disabled: false },
  { label: 'Epsilon', disabled: true },
  { label: 'Zeta', disabled: false },
  { label: 'Eta', disabled: false },
  { label: 'Theta', disabled: false },
  { label: 'Iota', disabled: false },
  { label: 'Kappa', disabled: true },
  { label: 'Lambda', disabled: false },
  { label: 'Mu', disabled: false },
  { label: 'Nu', disabled: false },
  { label: 'Xi', disabled: false },
  { label: 'Omicron', disabled: false },
  { label: 'Pi', disabled: false },
  { label: 'Pi 3', disabled: false },
  { label: 'Pi 3', disabled: false },
])

const columns = 4

const { currentIndex, currentItem, setCurrentIndex, onKeydown } = useKeyboardNavigation(items, {
  columns,
  edgeX: 'auto',
  edgeY: 'auto',
  isSkipped: (item) => item.disabled,
})
</script>

<template>
  <div>
    <div
      class="grid w-max grid-cols-4 gap-2 rounded-xl border border-primary-200 bg-white p-2 outline-none transition-[border-color] focus:border-primary-400 dark:bg-primary-950"
      tabindex="0"
      @blur="setCurrentIndex(-1)"
      @keydown="onKeydown"
    >
      <div
        v-for="(item, index) in items"
        :key="item.label"
        :class="
          item.disabled
            ? 'cursor-not-allowed text-primary-400/50 dark:text-primary-600/50'
            : index === currentIndex
              ? 'ring-2 ring-brand-500 bg-primary-100 text-primary-900 dark:bg-primary-800 dark:text-primary-100'
              : 'bg-primary-100 text-primary-900 dark:bg-primary-800 dark:text-primary-100'
        "
        class="flex h-14 w-14 flex-col items-center justify-center rounded-lg text-xs font-medium"
      >
        <span>{{ item.label }}</span>
      </div>
    </div>

    <p class="mt-2 text-sm text-primary-500">Current: {{ currentItem?.label ?? 'none' }}</p>
  </div>
</template>
