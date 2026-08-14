<script lang="ts" setup>
import { computed, getCurrentInstance, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Group, GroupAddon, Icon, IconButton, Input, Tag, useColorScheme } from 'dotdev/ui-kit'
import Logo from './components/Logo.vue'
import SidebarMenu from './components/SidebarMenu.vue'

const { scheme } = useColorScheme()
const route = useRoute()

const isMobile = ref(false)
if (typeof window !== 'undefined') {
  const mq = window.matchMedia('(max-width: 1023px)')
  isMobile.value = mq.matches

  mq.addEventListener('change', (event) => {
    isMobile.value = event.matches
  })
}

const isSidebarOpen = ref(!isMobile.value)

watch(isMobile, (mobile) => {
  isSidebarOpen.value = !mobile
})

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

watch(
  () => route.fullPath,
  () => {
    if (isMobile.value) isSidebarOpen.value = false
  },
)

interface Crumb {
  label: string
  path?: string
}

const menu = getCurrentInstance()?.appContext.config.globalProperties?.$studioMenu ?? []

const crumbs = computed(() => {
  const path = route.path
  for (const group of menu) {
    if (group.to === path) {
      return { icon: group.icon, items: [{ label: group.label ?? '', path: group.to }] }
    }

    const leaf = group.children.find((child) => child.to === path)
    if (leaf) {
      return {
        icon: group.icon,
        items: [
          { label: group.label ?? '', path: group.to },
          { label: leaf.label ?? '', path: leaf.to },
        ],
      }
    }
  }

  return { icon: undefined, items: [] as Crumb[] }
})
</script>

<template>
  <div class="layout">
    <aside v-if="isSidebarOpen" class="layout__sidebar">
      <div class="layout__sidebar-header">
        <Logo />
      </div>

      <div class="layout__sidebar-body">
        <SidebarMenu :items="$studioMenu" />
      </div>

      <footer class="layout__sidebar-footer">
        <span class="app-version">v0.1.0</span>
        <IconButton aria-label="GitHub repository" class="text-muted" icon="github-logo" />
      </footer>
    </aside>

    <div class="layout__body">
      <header class="layout__header">
        <div class="layout__header-group min-w-0">
          <IconButton aria-label="Toggle sidebar" icon="hamburger-menu" size="sm" @click="toggleSidebar" />

          <Logo v-if="!isSidebarOpen" class="shrink-0" />

          <nav v-if="crumbs.items.length" aria-label="Breadcrumb" class="app-crumb">
            <span class="app-crumb__path">
              <template v-for="(crumb, i) in crumbs.items" :key="crumb.path ?? i">
                <Icon v-if="i" class="app-crumb__sep" name="chevron-right" />
                <span :class="i === crumbs.items.length - 1 ? 'app-crumb__segment--current' : 'app-crumb__segment'">
                  {{ crumb.label }}
                </span>
              </template>
            </span>
          </nav>
        </div>

        <div class="layout__header-group">
          <Group class="w-55">
            <GroupAddon attach size="sm" variant="plain">
              <Icon class="text-muted text-xl" name="magnifying-glass" />
            </GroupAddon>
            <Input class="pl-10 w-full" placeholder="Search..." size="sm" variant="soft" />
            <GroupAddon attach class="px-1.5" variant="plain">
              <Tag is="kbd" class="app-kbd" label="⌘K" />
            </GroupAddon>
          </Group>

          <IconButton
            :icon="scheme === 'light' ? 'moon' : 'sun'"
            aria-label="Toggle color scheme"
            class="text-muted"
            size="sm"
            @click="scheme = scheme === 'dark' ? 'light' : 'dark'"
          />
        </div>
      </header>

      <RouterView />
    </div>
  </div>
</template>
