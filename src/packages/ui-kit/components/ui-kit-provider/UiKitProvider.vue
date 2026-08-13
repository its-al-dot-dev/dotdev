<script lang="ts" setup>
import type { UiKitProviderEmits, UiKitProviderProps, UiKitProviderSlots } from './ui-kit-provider.types.ts'
import { provide } from 'vue'
import { BASE_CONFIG, UI_KIT_CONFIG_KEY } from 'dotdev/ui-kit'

defineEmits<UiKitProviderEmits>()
defineSlots<UiKitProviderSlots>()

const props = defineProps<UiKitProviderProps>()

provide(UI_KIT_CONFIG_KEY, {
  ...BASE_CONFIG,
  ...props.config,
  ...(props.namespace !== undefined && {
    namespace: props.namespace,
  }),
})
</script>

<template>
  <slot />
</template>
