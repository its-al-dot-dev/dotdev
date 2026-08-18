<script lang="ts" setup>
import type { UIIconEmits, UIIconProps, UIIconSlots } from './icon.types.ts'
import { UI_KIT_CONFIG_KEY, useUiKitBem, useUiKitProps, useUiKitTheme } from '@dotdev/ui-kit'
import { inject } from 'vue'
import { template } from '../templates/icon.ts'

defineEmits<UIIconEmits>()
defineSlots<UIIconSlots>()
const props = withDefaults(defineProps<UIIconProps>(), {
  ui: 'icon',
})

const ui = useUiKitProps('icon', props)
const bem = useUiKitBem(ui)
useUiKitTheme(ui, template)

const config = inject(UI_KIT_CONFIG_KEY, {})
const icons = config.icons ?? {}
</script>

<template>
  <span v-if="ui.name || ui.is" :class="bem()">
    <component :is="ui.is" v-if="ui.is" />
    <component :is="icons[ui.name]" v-else-if="ui.name && icons[ui.name]" />
  </span>
</template>
