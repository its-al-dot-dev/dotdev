<script lang="ts" setup>
import { IconButton } from '@dotdev/ui-kit'

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
