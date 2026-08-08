<script lang="ts" setup>
import { provide, reactive } from 'vue'
import { Button, SelectButton, UI_KIT_CONFIG_KEY } from 'dotdev/ui-kit'

const config = reactive({
  namespace: 'd',
  components: {
    button: {
      color: 'primary',
      size: 'md',
      variant: 'solid',
    },
  },
})

provide(UI_KIT_CONFIG_KEY, config)

const colorOptions = ['primary', 'neutral', 'success', 'warning', 'danger']
const sizeOptions = ['xs', 'sm', 'md', 'lg', 'xl']
const variantOptions = ['solid', 'outlined', 'ghost', 'subtle', 'text']
</script>

<template>
  <div class="config-play">
    <div class="config-play__controls">
      <SelectButton v-model="config.components.button.color" :options="colorOptions" size="sm" />
      <SelectButton v-model="config.components.button.size" :options="sizeOptions" size="sm" />
      <SelectButton v-model="config.components.button.variant" :options="variantOptions" size="sm" />
    </div>

    <div class="config-play__canvas">
      <Button label="Global default" />
      <Button color="warning" label="Local override" size="lg" />
    </div>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';

.config-play {
  @apply flex flex-col gap-4 border rounded-2xl p-4 mb-10;
}

.config-play__controls {
  @apply flex flex-wrap gap-2;
}

.config-play__canvas {
  @apply flex items-center justify-center flex-wrap gap-4;
}
</style>
