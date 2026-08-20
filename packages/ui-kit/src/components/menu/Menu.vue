<script lang="ts" setup>
import { toValue } from 'vue'
import type { NormalizedMenuItem, UIMenuEmits, UIMenuProps } from './menu.types.ts'
import MenuItem from './MenuItem.vue'
import { useUiKitBem, useUiKitProps, useUiKitTheme } from '@dotdev/ui-kit'
import { menuStyle } from '@dotdev/theme'

const emit = defineEmits<UIMenuEmits>()
const props = withDefaults(defineProps<UIMenuProps>(), {
  ui: 'menu',
  size: 'md',
})

const ui = useUiKitProps('menu', props)

const bem = useUiKitBem(ui)
useUiKitTheme(ui, menuStyle)

function onSelect(item: NormalizedMenuItem, event?: Event) {
  emit('select', item, event)
}
</script>

<template>
  <ul :class="bem([ui.size])" role="menu">
    <template v-for="(item, idx) in items" :key="idx">
      <li v-if="item.kind === 'heading'" :class="[...bem('heading'), toValue(item.class)]">
        {{ item.label }}
      </li>

      <li
        v-else-if="item.kind === 'divider'"
        :class="[...bem('heading'), toValue(item.class)]"
        class="s-menu__divider"
      />

      <MenuItem
        v-else-if="toValue(item.visible) ?? true"
        :item="item"
        :namespace="ui.namespace"
        :ui="ui.ui"
        @select="onSelect"
      />
    </template>
  </ul>
</template>
