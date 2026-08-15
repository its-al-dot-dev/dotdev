<script lang="ts" setup>
interface Props {
  open: boolean
}

const props = defineProps<Props>()

const setHeight = (el: Element, height: string) => {
  if (el instanceof HTMLElement) el.style.height = height
}

const onBeforeEnter = (el: Element) => {
  setHeight(el, '0px')
}

const onEnter = (el: Element) => {
  setHeight(el, `${el.scrollHeight}px`)
}

const onAfterEnter = (el: Element) => {
  setHeight(el, 'auto')
}

const onBeforeLeave = (el: Element) => {
  setHeight(el, `${el.scrollHeight}px`)
}

const onLeave = (el: Element) => {
  setHeight(el, '0px')
}

const onAfterLeave = (el: Element) => {
  setHeight(el, '')
}
</script>

<template>
  <Transition
    @enter="onEnter"
    @leave="onLeave"
    @before-enter="onBeforeEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @after-leave="onAfterLeave"
  >
    <slot v-if="props.open" />
  </Transition>
</template>
