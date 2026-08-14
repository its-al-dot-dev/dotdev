<script lang="ts" setup>
import type { UiKitProviderEmits, UiKitProviderProps, UiKitProviderSlots } from './ui-kit-provider.types.ts'
import { inject, provide } from 'vue'
import { BASE_CONFIG, mergeUiKitConfig, UI_KIT_CONFIG_KEY, type UiKitConfig } from 'dotdev/ui-kit'

defineEmits<UiKitProviderEmits>()
defineSlots<UiKitProviderSlots>()

const props = withDefaults(defineProps<UiKitProviderProps>(), {
  merge: true,
})

const parentConfig = inject(UI_KIT_CONFIG_KEY, BASE_CONFIG)
const base = !props.merge ? BASE_CONFIG : parentConfig
const override: UiKitConfig =
  props.namespace !== undefined ? { ...props.config, namespace: props.namespace } : { ...props.config }

provide(UI_KIT_CONFIG_KEY, mergeUiKitConfig(base, override))
</script>

<template>
  <slot />
</template>
