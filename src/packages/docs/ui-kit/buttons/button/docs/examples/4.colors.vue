<script lang="ts" setup>
import { Button } from 'dotdev/ui-kit'

defineExpose({
  title: 'Colors and variants',
  desc: `Combine the <code>color</code> and <code>variant</code> props in a grid. Available colors are <code>primary</code>, <code>neutral</code>, <code>warning</code>, <code>success</code>, and <code>danger</code>.`,
})

const colors = ['primary', 'neutral', 'warning', 'success', 'danger']
const variants = ['solid', 'outlined', 'subtle', 'ghost', 'text']
</script>

<template>
  <template v-for="color in colors" :key="color">
    <template v-for="variant in variants" :key="variant">
      <Button :color="color" :label="color" :variant="variant" />
    </template>
  </template>
</template>
