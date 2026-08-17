<script lang="ts" setup>
import { Icon } from '@dotdev/ui-kit'

defineExample({
  title: 'Basic usage',
  desc: 'Pass the icon <code>name</code> from the global registry (provided by <code>createUiKit</code>).',
})
</script>

<template>
  <div class="flex items-center gap-4">
    <Icon name="bell" />
    <Icon name="gear" />
    <Icon name="home" />
    <Icon name="arrow-right" />
  </div>
</template>