<script lang="ts" setup>
import type {
  TransitionPresenceEmits,
  TransitionPresenceProps,
  TransitionPresenceSlots,
} from './transition-presence.types.ts'
import { ref, watch } from 'vue'

defineEmits<TransitionPresenceEmits>()
defineSlots<TransitionPresenceSlots>()
const props = defineProps<TransitionPresenceProps>()

const rendered = ref(props.show)

watch(
  () => props.show,
  (value) => {
    if (value) rendered.value = true
  }
)

function onAfterLeave() {
  rendered.value = false
}
</script>

<template>
  <Transition :name="name" @after-leave="onAfterLeave">
    <template v-if="rendered">
      <slot />
    </template>
  </Transition>
</template>
