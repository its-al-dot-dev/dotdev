<script lang="ts" setup>
import type { CSSProperties, VNodeRef } from 'vue'
import { computed, ref } from 'vue'
import type { UIFloatingEmits, UIFloatingProps, UIFloatingSlots } from './floating.types'
import { useClickOutside, useFloating } from 'dotdev/ui-kit'

defineSlots<UIFloatingSlots>()
const emits = defineEmits<UIFloatingEmits>()
const props = withDefaults(defineProps<UIFloatingProps>(), {
  strategy: 'absolute',
  placement: 'bottom',
  dismissable: true,
})

const isOpen = ref<boolean>(false)
const anchor = ref<HTMLElement | null>(null)
const floating = ref<HTMLElement | null>(null)

const floatingConfig = computed(() => ({
  placement: props.placement,
  strategy: props.strategy,
  offset: props.offset,
  autoUpdate: props.autoUpdate,
  handleScroll: close,
}))

const { styles } = useFloating(anchor, floating, floatingConfig)

const floatingStyle = computed<CSSProperties>(() => ({
  ...styles.value,
  width: props.fit && anchor.value ? `${anchor.value.clientWidth}px` : undefined,
}))

function setFloatingRef(el: HTMLElement | null) {
  floating.value = el
}

function open(event?: Event) {
  const target = event?.currentTarget

  if (!(target instanceof HTMLElement)) {
    return
  }

  anchor.value = target
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

function toggle(event?: Event) {
  isOpen.value ? close() : open(event)
}

if (props.dismissable) {
  useClickOutside([anchor, floating], (event) => {
    close()
    emits('click-outside', event)
  })
}

defineExpose({
  isOpen,
  toggle,
  close,
  open,
})
</script>

<template>
  <slot
    :ref="setFloatingRef as VNodeRef | undefined"
    :close="close"
    :is-open="isOpen"
    :open="open"
    :style="floatingStyle"
    :toggle="toggle"
  />
</template>
