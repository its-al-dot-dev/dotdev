<script lang="ts" setup>
import { computed } from 'vue'
import type { UIProgressEmits, UIProgressProps, UIProgressSlots } from './progress.types.ts'
import { useUiKitBem, useUiKitProps, useUiKitTheme } from '@dotdev/ui-kit'
import { progressStyle } from '@dotdev/theme'

defineEmits<UIProgressEmits>()
defineSlots<UIProgressSlots>()
const props = withDefaults(defineProps<UIProgressProps>(), {
  ui: 'progress',
  max: 100,
  color: 'primary',
})

const ui = useUiKitProps('progress', props)

const bem = useUiKitBem(ui)
useUiKitTheme(ui, progressStyle)

const percent = computed(() => {
  if (ui.value == null) return null
  const ratio = (ui.value / (ui.max || 100)) * 100
  return Math.min(Math.max(ratio, 0), 100)
})

const rootClass = computed(() => {
  const { color } = ui
  return bem([color], { indeterminate: percent.value === null })
})

const indicatorStyle = computed(() => (percent.value === null ? undefined : { width: `${percent.value}%` }))
</script>

<template>
  <div
    :aria-valuemax="ui.max"
    :aria-valuenow="percent ?? undefined"
    :class="rootClass"
    aria-valuemin="0"
    role="progressbar"
  >
    <span :class="bem('indicator')" :style="indicatorStyle" />
  </div>
</template>
