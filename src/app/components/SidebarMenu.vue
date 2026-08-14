<script lang="ts" setup>
import type { UIMenuItem } from 'dotdev/ui-kit'
import { Icon, Menu } from 'dotdev/ui-kit'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{ items: (UIMenuItem & { children: UIMenuItem[] })[] }>()

const route = useRoute()
const collapsed = ref(
  new Set(props.items.map((menu, idx) => (menu.children.length ? idx : -1)).filter((idx) => idx !== -1)),
)

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
          :aria-controls="`app-menu__body-${idx}`"
          :aria-expanded="!collapsed.has(idx)"
          :class="{ 'is-active': isGroupActive(idx) }"
          class="app-menu__item app-menu__item--group"
          type="button"
          @click="toggleGroup(idx)"
        >
          <Icon v-if="menu.icon" :name="menu.icon" class="app-menu__item-icon" />
          <span class="app-menu__item-label">{{ menu.label }}</span>
          <Icon :class="{ 'is-open': !collapsed.has(idx) }" class="app-menu__item-chevron" name="chevron-down" />
        </button>

        <router-link v-else-if="menu.to" :to="menu.to" class="app-menu__item">
          <Icon v-if="menu.icon" :name="menu.icon" class="app-menu__item-icon" />
          <span class="app-menu__item-label">{{ menu.label }}</span>
        </router-link>

        <div v-else class="app-menu__item">
          <Icon v-if="menu.icon" :name="menu.icon" class="app-menu__item-icon" />
          <span class="app-menu__item-label">{{ menu.label }}</span>
        </div>

        <Menu
          v-if="menu.children.length && !collapsed.has(idx)"
          :id="`app-menu__body-${idx}`"
          :items="menu.children"
          class="app-menu__body"
          size="sm"
        />
      </div>
    </template>
  </nav>
</template>
