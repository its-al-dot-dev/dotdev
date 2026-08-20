<script lang="ts" setup>
import { Icon, useUiKitBem, useUiKitProps, useUiKitTheme } from '@dotdev/ui-kit'
import type { UIBreadcrumbsEmits, UIBreadcrumbsProps, UIBreadcrumbsSlots } from './breadcrumbs.types.ts'
import { breadcrumbsStyle } from '@dotdev/theme'

defineEmits<UIBreadcrumbsEmits>()
defineSlots<UIBreadcrumbsSlots>()

const props = withDefaults(defineProps<UIBreadcrumbsProps>(), {
  ui: 'breadcrumbs',
  items: () => [],
  separator: '/',
  ariaLabel: 'Breadcrumb',
})

const ui = useUiKitProps('breadcrumbs', props)
const bem = useUiKitBem(ui)
useUiKitTheme(ui, breadcrumbsStyle)

function isCurrent(index: number) {
  return index === ui.items.length - 1
}
</script>

<template>
  <nav :aria-label="ui.ariaLabel" :class="bem()">
    <ol :class="bem('list')">
      <li
        v-for="(item, index) in ui.items"
        :key="item.href ?? (typeof item.to === 'string' ? item.to : index)"
        :class="bem('item', { current: isCurrent(index) })"
      >
        <template v-if="index">
          <slot v-if="$slots.separator" name="separator" />
          <Icon v-else-if="ui.separatorIcon" :class="bem('separator')" :name="ui.separatorIcon" />
          <span v-else :class="bem('separator')">{{ ui.separator }}</span>
        </template>

        <component
          :is="item.to ? 'router-link' : item.href ? 'a' : 'span'"
          :aria-current="isCurrent(index) ? 'page' : undefined"
          :class="bem('link', { current: isCurrent(index) })"
          :href="item.href ?? undefined"
          :to="item.to ?? undefined"
        >
          <slot v-if="$slots.default" :index="index" :item="item" />
          <template v-else>
            <Icon v-if="item.icon" :class="bem('icon')" :name="item.icon" />
            <span :class="bem('label')">{{ item.label }}</span>
          </template>
        </component>
      </li>
    </ol>
  </nav>
</template>
