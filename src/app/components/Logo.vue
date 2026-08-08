<script lang="ts" setup>
import { Icon } from 'dotdev/ui-kit'
</script>

<template>
  <router-link class="app-logo" to="/">
    <Icon class="app-logo__icon" name="rocket" />
    <span class="app-logo__title">Dot.<span>Development</span></span>
    <!--    <span v-else class="app-sidebar__title"><span>A</span>L</span>-->
  </router-link>
  <!-- @apply text-primary-500 dark:text-primary-400;-->
</template>

<style scoped>
@reference 'tailwindcss';

.app-logo {
  @apply flex items-center gap-2;

  .app-logo__icon,
  .app-logo__title span {
  }
}
</style>
