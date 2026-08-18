<script lang="ts" setup>
import type { UIIconEmits, UIIconProps, UIIconSlots } from './icon.types.ts'
import { useUiKitBem, useUiKitProps, useUiKitTheme } from '@dotdev/ui-kit'
import { template } from '../templates/icon.ts'

defineEmits<UIIconEmits>()
defineSlots<UIIconSlots>()
const props = withDefaults(defineProps<UIIconProps>(), {
  ui: 'icon',
})

const ui = useUiKitProps('icon', props)
const bem = useUiKitBem(ui)
const config = useUiKitTheme(ui, template)

const icons = config?.configs?.get(ui.namespace!)?.icons ?? {}
</script>

<template>
  <span v-if="ui.name || ui.is" :class="bem()">
    <component :is="ui.is" v-if="ui.is" />
    <component :is="icons[ui.name]" v-else-if="ui.name && icons[ui.name]" />
  </span>
</template>
