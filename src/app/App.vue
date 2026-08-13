<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Logo from './components/Logo.vue'
import { Group, GroupAddon, Icon, IconButton, Input, Menu, Tag, useColorScheme } from 'dotdev/ui-kit'

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
    <aside
      v-if="isSidebarOpen"
      :class="isSidebarOpen ? 'layout__sidebar--open' : 'layout__sidebar--closed'"
      class="layout__sidebar"
    >
      <div class="layout__sidebar-header">
        <Logo />
      </div>

      <div class="layout__sidebar-body">
        <Menu :items="$studioMenu" size="sm" />
      </div>
    </aside>

    <div class="layout__body">
      <header class="layout__header">
        <div class="layout__header-group">
          <IconButton icon="hamburger-menu" @click="toggleSidebar" />
        </div>

        <Group>
          <GroupAddon attach>
            <Icon class="text-muted" name="magnifying-glass" />
          </GroupAddon>
          <Input class="pl-10" placeholder="Search..." variant="soft" />
        </Group>

        <div class="layout__header-group">
          <Tag class="px-3 h-7.5! font-mono text-xs text-muted" label="v0.1.0" rounded />
          <IconButton
            :icon="scheme === 'light' ? 'moon' : 'sun'"
            @click="scheme = scheme === 'dark' ? 'light' : 'dark'"
          />
          <IconButton icon="github-logo" />
        </div>
      </header>

      <RouterView />
    </div>
  </div>
</template>
