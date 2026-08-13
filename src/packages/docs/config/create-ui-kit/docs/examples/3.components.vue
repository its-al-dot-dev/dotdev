<script lang="ts" setup>
import { provide } from 'vue'
import { Button, UI_KIT_CONFIG_KEY } from 'dotdev/ui-kit'

defineExample({
  title: 'Per-component defaults',
  desc: `Provide defaults for a component key. Each prop that is not passed to an instance falls back to the configured value.`,
})

provide(UI_KIT_CONFIG_KEY, {
  namespace: 'd',
  components: {
    button: { size: 'lg', variant: 'soft' },
  },
})
</script>

<template>
  <Button label="Large soft" />
  <Button label="Large soft" />
  <Button label="Overridden locally" size="sm" />
</template>
