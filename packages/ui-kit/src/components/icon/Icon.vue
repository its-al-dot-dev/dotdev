<script lang="ts" setup>
import type { UIIconEmits, UIIconProps, UIIconSlots } from './icon.types.ts'
import { useUiKitBem, useUiKitProps, useUiKitTheme } from '@dotdev/ui-kit'
import { iconStyle } from '@dotdev/theme'

defineEmits<UIIconEmits>()
defineSlots<UIIconSlots>()
const props = withDefaults(defineProps<UIIconProps>(), {
  ui: 'icon',
})

const ui = useUiKitProps('icon', props)
const bem = useUiKitBem(ui)
const state = useUiKitTheme(ui, iconStyle)
const icons = state?.config?.icons ?? {}
</script>

<template>
  <span v-if="ui.name || ui.is" :class="bem()">
    <component :is="ui.is" v-if="ui.is" />
    <component :is="icons[ui.name]" v-else-if="ui.name && icons[ui.name]" />
  </span>
</template>
