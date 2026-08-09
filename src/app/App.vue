<script lang="ts" setup>
import Logo from './components/Logo.vue'
import { IconButton, Menu, useColorScheme } from 'dotdev/ui-kit'

const { scheme } = useColorScheme()
</script>

<template>
  <div class="layout">
    <aside class="layout__sidebar">
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
          <IconButton icon="hamburger-menu" />
        </div>

        <div class="layout__header-group">
          <IconButton
            :icon="scheme === 'light' ? 'moon' : 'sun'"
            @click="scheme = scheme === 'dark' ? 'light' : 'dark'"
          />
          <IconButton icon="bell" />
          <IconButton icon="github-logo" />
        </div>
      </header>

      <RouterView />
    </div>
  </div>
</template>
