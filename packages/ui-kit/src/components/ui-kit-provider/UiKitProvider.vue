<script lang="ts" setup>
import type { UIKitProviderEmits, UIKitProviderProps, UIKitProviderSlots } from './ui-kit-provider.types.ts'
import { provide } from 'vue'
import { UI_KIT_NAMESPACE_KEY } from '@dotdev/ui-kit'

defineEmits<UIKitProviderEmits>()
defineSlots<UIKitProviderSlots>()

const props = defineProps<UIKitProviderProps>()

if (props.namespace) {
  provide(UI_KIT_NAMESPACE_KEY, props.namespace)
}
</script>

<template>
  <slot />
</template>
