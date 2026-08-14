<script lang="ts" setup>
import type { UIMenuItem } from 'dotdev/ui-kit'
import { Icon, Menu } from 'dotdev/ui-kit'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{ items: (UIMenuItem & { children: UIMenuItem[] })[] }>()

const route = useRoute()
const collapsed = ref(new Set<number>())

function isGroupActive(idx: number) {
  return props.items[idx].children.some((child) => child.to === route.path)
}

function toggleGroup(idx: number) {
  const next = new Set(collapsed.value)
  if (next.has(idx)) next.delete(idx)
  else next.add(idx)
  collapsed.value = next
}

watch(
  () => route.path,
  () => {
    const idx = props.items.findIndex((group) => group.children.some((child) => child.to === route.path))

    if (idx !== -1) {
      const next = new Set(collapsed.value)
      next.delete(idx)
      collapsed.value = next
    }
  },
  { immediate: true },
)
</script>

<template>
  <nav class="app-menu">
    <template v-for="(menu, idx) in items" :key="idx">
      <div class="app-menu__group">
        <button
          v-if="menu.children.length"
          type="button"
          class="app-menu__item"
          :class="{ 'is-active': isGroupActive(idx) }"
          :aria-controls="`app-menu__body-${idx}`"
          :aria-expanded="!collapsed.has(idx)"
          @click="toggleGroup(idx)"
        >
          <Icon v-if="menu.icon" :name="menu.icon" class="app-menu__item-icon" />
          <span class="app-menu__item-label">{{ menu.label }}</span>
          <Icon
            class="app-menu__item-chevron"
            :class="{ 'is-open': !collapsed.has(idx) }"
            name="chevron-down"
          />
        </button>

        <router-link v-else-if="menu.to" class="app-menu__item" :to="menu.to">
          <Icon v-if="menu.icon" :name="menu.icon" class="app-menu__item-icon" />
          <span class="app-menu__item-label">{{ menu.label }}</span>
        </router-link>

        <div v-else class="app-menu__item">
          <Icon v-if="menu.icon" :name="menu.icon" class="app-menu__item-icon" />
          <span class="app-menu__item-label">{{ menu.label }}</span>
        </div>

        <div v-if="menu.children.length" :id="`app-menu__body-${idx}`" class="app-menu__body">
          <Menu v-if="!collapsed.has(idx)" :items="menu.children" size="sm" />
        </div>
      </div>

      <hr v-if="idx < items.length - 1" />
    </template>
  </nav>
</template>
