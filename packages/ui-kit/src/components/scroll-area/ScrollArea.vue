<script lang="ts" setup>
import type { UIScrollAreaEmits, UIScrollAreaProps, UIScrollAreaSlots } from './scroll-area.types.ts'
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import { calculateThumbOffset, calculateThumbSize } from './utils.ts'
import { throttleByRaf, useUiKitBem, useUiKitProps, useUiKitTheme } from '@dotdev/ui-kit'
import { template } from '../templates/scroll-area.ts'

defineSlots<UIScrollAreaSlots>()
const emit = defineEmits<UIScrollAreaEmits>()
const props = withDefaults(defineProps<UIScrollAreaProps>(), {
  ui: 'scroll-area',
  minThumbSize: 20,
})

const ui = useUiKitProps('scroll-area', props)
const bem = useUiKitBem(ui)
useUiKitTheme(ui, template)

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
    minThumbSize: ui.minThumbSize,
  }),
)

const thumbOffsetY = computed(() =>
  calculateThumbOffset({
    viewportSize: viewportSize.value.height,
    contentSize: contentSize.value.height,
    thumbSize: thumbSizeY.value,
    scrollOffset: scrollY.value,
  }),
)

const thumbSizeX = computed(() =>
  calculateThumbSize({
    viewportSize: viewportSize.value.width,
    contentSize: contentSize.value.width,
    minThumbSize: ui.minThumbSize,
  }),
)

const thumbOffsetX = computed(() =>
  calculateThumbOffset({
    viewportSize: viewportSize.value.width,
    contentSize: contentSize.value.width,
    thumbSize: thumbSizeX.value,
    scrollOffset: scrollX.value,
  }),
)

const styleVariables = computed(() => {
  const styles: Record<string, string> = {}

  if (thumbSizeY.value > 0) {
    styles['--d-scroll-area-size-thumb-y'] = `${thumbSizeY.value}px`
    styles['--d-scroll-area-translate-thumb-y'] = `${thumbOffsetY.value}px`
  }

  if (thumbSizeX.value > 0) {
    styles['--d-scroll-area-size-thumb-x'] = `${thumbSizeX.value}px`
    styles['--d-scroll-area-translate-thumb-x'] = `${thumbOffsetX.value}px`
  }

  return styles
})

const drag = ref<{ axis: 'y' | 'x'; pointerStart: number; scrollStart: number } | null>(null)

function onThumbPointerDown(axis: 'y' | 'x', event: PointerEvent) {
  if (!viewportRef.value) return

  drag.value = {
    axis,
    pointerStart: axis === 'y' ? event.clientY : event.clientX,
    scrollStart: axis === 'y' ? viewportRef.value.scrollTop : viewportRef.value.scrollLeft,
  }

  const target = event.currentTarget as HTMLElement
  target.setPointerCapture(event.pointerId)
  target.addEventListener('pointermove', onThumbPointerMove)
  target.addEventListener('pointerup', onThumbPointerEnd)
  target.addEventListener('pointercancel', onThumbPointerEnd)
}

function onThumbPointerMove(event: PointerEvent) {
  const state = drag.value
  if (!state || !viewportRef.value) return

  const viewport = viewportRef.value
  const isY = state.axis === 'y'
  const content = isY ? viewport.scrollHeight : viewport.scrollWidth
  const viewportSide = isY ? viewport.clientHeight : viewport.clientWidth
  const thumbSize = isY ? thumbSizeY.value : thumbSizeX.value
  const maxScroll = content - viewportSide
  const denominator = viewportSide - thumbSize

  if (maxScroll <= 0 || denominator <= 0) return

  const delta = (isY ? event.clientY : event.clientX) - state.pointerStart
  const target = state.scrollStart + delta * (maxScroll / denominator)

  if (isY) viewport.scrollTop = target
  else viewport.scrollLeft = target
}

function onThumbPointerEnd(event: PointerEvent) {
  drag.value = null

  const target = event.currentTarget as HTMLElement
  target.removeEventListener('pointermove', onThumbPointerMove)
  target.removeEventListener('pointerup', onThumbPointerEnd)
  target.removeEventListener('pointercancel', onThumbPointerEnd)
  if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId)
}

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
  <div :class="bem()" :style="styleVariables">
    <div ref="viewport" :class="bem('viewport')" tabindex="0" @scroll="throttledUpdateScroll">
      <slot />
    </div>

    <slot v-if="thumbSizeY > 0" :offset="thumbOffsetY" :size="thumbSizeY" name="scrollbar-y">
      <div :class="bem('scrollbar', 'y')">
        <div :class="bem('thumb', 'y')" aria-hidden="true" @pointerdown="onThumbPointerDown('y', $event)" />
      </div>
    </slot>

    <slot v-if="thumbSizeX > 0" :offset="thumbOffsetX" :size="thumbSizeX" name="scrollbar-x">
      <div :class="bem('scrollbar', 'x')">
        <div :class="bem('thumb', 'x')" aria-hidden="true" @pointerdown="onThumbPointerDown('x', $event)" />
      </div>
    </slot>
  </div>
</template>
