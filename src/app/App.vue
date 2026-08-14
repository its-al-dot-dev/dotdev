<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Logo from './components/Logo.vue'
import SidebarMenu from './components/SidebarMenu.vue'
import { Group, GroupAddon, Icon, IconButton, Input, Tag, useColorScheme } from 'dotdev/ui-kit'

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
    </aside>

    <div class="layout__body">
      <header class="layout__header">
        <div class="layout__header-group">
          <IconButton icon="hamburger-menu" @click="toggleSidebar" />
        </div>

        <Group class="w-3xs">
          <GroupAddon attach size="sm" variant="plain">
            <Icon class="text-muted text-xl" name="magnifying-glass" />
          </GroupAddon>
          <Input class="pl-10 w-full" placeholder="Search..." size="sm" variant="soft" />
          <GroupAddon attach class="px-1.5" variant="plain">
            <Tag class="text-sm text-muted" label="⌘K" />
          </GroupAddon>
        </Group>

        <div class="layout__header-group">
          <Tag class="px-2.5 gap-1.5 h-6 font-mono text-xs text-muted" label="v0.1.0" rounded />
          <IconButton
            :icon="scheme === 'light' ? 'moon' : 'sun'"
            class="text-muted"
            @click="scheme = scheme === 'dark' ? 'light' : 'dark'"
          />
          <IconButton class="text-muted" icon="github-logo" />
        </div>
      </header>

      <RouterView />
    </div>
  </div>
</template>
