<script lang="ts" setup>
import type { ScrollAreaEmits, ScrollAreaProps, ScrollAreaSlots } from './scroll-area.types'
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import { calculateThumbOffset, calculateThumbSize } from './utils'
import { throttleByRaf } from 'dotdev/ui-kit'

defineProps<ScrollAreaProps>()
defineSlots<ScrollAreaSlots>()
const emit = defineEmits<ScrollAreaEmits>()

const viewportRef = useTemplateRef<HTMLDivElement>('viewport')

const scrollY = ref(0)
const scrollX = ref(0)
const viewportSize = ref({ width: 0, height: 0 })
const contentSize = ref({ width: 0, height: 0 })

function updateDimensions() {
  if (!viewportRef.value) return
  const { clientWidth, clientHeight, scrollWidth, scrollHeight } = viewportRef.value

  viewportSize.value = { width: clientWidth, height: clientHeight }
  contentSize.value = { width: scrollWidth, height: scrollHeight }
}

function updateScrollPosition() {
  if (!viewportRef.value) return

  scrollY.value = viewportRef.value.scrollTop
  scrollX.value = viewportRef.value.scrollLeft

  emit('scroll', { scrollTop: scrollY.value, scrollLeft: scrollX.value })
}

const throttledUpdateScroll = throttleByRaf(updateScrollPosition)

const thumbSizeY = computed(() =>
  calculateThumbSize({
    viewportSize: viewportSize.value.height,
    contentSize: contentSize.value.height,
    minThumbSize: 20,
  })
)

const thumbOffsetY = computed(() =>
  calculateThumbOffset({
    viewportSize: viewportSize.value.height,
    contentSize: contentSize.value.height,
    thumbSize: thumbSizeY.value,
    scrollOffset: scrollY.value,
  })
)

const thumbSizeX = computed(() =>
  calculateThumbSize({
    viewportSize: viewportSize.value.width,
    contentSize: contentSize.value.width,
    minThumbSize: 20,
  })
)

const thumbOffsetX = computed(() =>
  calculateThumbOffset({
    viewportSize: viewportSize.value.width,
    contentSize: contentSize.value.width,
    thumbSize: thumbSizeX.value,
    scrollOffset: scrollX.value,
  })
)

const styleVariables = computed(() => {
  const styles: Record<string, string> = {}

  if (thumbSizeY.value > 0) {
    styles['--scroll-area-thumb-y-size'] = `${thumbSizeY.value}px`
    styles['--scroll-area-thumb-y-offset'] = `${thumbOffsetY.value}px`
  }

  if (thumbSizeX.value > 0) {
    styles['--scroll-area-thumb-x-size'] = `${thumbSizeX.value}px`
    styles['--scroll-area-thumb-x-offset'] = `${thumbOffsetX.value}px`
  }

  return styles
})

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (!viewportRef.value) return

  updateDimensions()
  updateScrollPosition()

  resizeObserver = new ResizeObserver(() => {
    updateDimensions()
  })

  resizeObserver.observe(viewportRef.value)
  if (viewportRef.value.firstElementChild) {
    resizeObserver.observe(viewportRef.value.firstElementChild)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  throttledUpdateScroll.cancel()
})
</script>

<template>
  <div :style="styleVariables" class="s-scroll-area">
    <div ref="viewport" class="s-scroll-area__viewport" @scroll="throttledUpdateScroll">
      <slot />
    </div>

    <slot v-if="thumbSizeY > 0" :offset="thumbOffsetY" :size="thumbSizeY" name="scrollbar-y">
      <div class="s-scroll-area__scrollbar s-scroll-area__scrollbar--y">
        <div class="s-scroll-area__thumb s-scroll-area__thumb--y" />
      </div>
    </slot>

    <slot v-if="thumbSizeX > 0" :offset="thumbOffsetX" :size="thumbSizeX" name="scrollbar-x">
      <div class="s-scroll-area__scrollbar s-scroll-area__scrollbar--x">
        <div class="s-scroll-area__thumb s-scroll-area__thumb--x" />
      </div>
    </slot>
  </div>
</template>
