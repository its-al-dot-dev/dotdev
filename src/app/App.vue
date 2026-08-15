<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  Breadcrumbs,
  Group,
  GroupAddon,
  Icon,
  IconButton,
  Input,
  Tag,
  useColorScheme,
  useRouterBreadcrumbs,
} from 'dotdev/ui-kit'
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

const isLanding = computed(() => route.name === 'Dashboard')

watch(
  () => route.fullPath,
  () => {
    if (isMobile.value) isSidebarOpen.value = false
  },
)

const { items } = useRouterBreadcrumbs({
  label: (record) => record.children[0]?.name,
  skip: (record) => !!record.name,
})
</script>

<template>
  <div class="layout">
    <aside v-if="isSidebarOpen && !isLanding" class="layout__sidebar">
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
          <IconButton
            v-if="!isLanding"
            aria-label="Toggle sidebar"
            icon="hamburger-menu"
            size="sm"
            @click="toggleSidebar"
          />

          <Logo v-if="!isSidebarOpen || isLanding" class="shrink-0" />
          <Breadcrumbs v-if="items.length && !isLanding" :items="items" class="text-sm" separatorIcon="chevron-right" />
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
