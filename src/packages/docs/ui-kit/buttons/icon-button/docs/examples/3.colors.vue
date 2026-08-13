<script lang="ts" setup>
import { IconButton } from 'dotdev/ui-kit'

defineExample({
  title: 'Colors and variants',
  desc: `Combine the <code>color</code> and <code>variant</code> props in a grid. Available colors are <code>primary</code>, <code>neutral</code>, <code>warning</code>, <code>success</code>, <code>danger</code>, and <code>info</code>.`,
})

const colors = ['primary', 'neutral', 'warning', 'success', 'danger', 'info']
const variants = ['solid', 'outlined', 'soft', 'ghost', 'text']
</script>

<template>
  <div class="grid grid-cols-5 gap-4">
    <template v-for="color in colors" :key="color">
      <div v-for="variant in variants" :key="variant">
        <IconButton :color="color" :variant="variant" icon="download" />
      </div>
    </template>
  </div>
</template>