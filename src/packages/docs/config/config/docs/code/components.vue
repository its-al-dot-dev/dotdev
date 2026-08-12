<script lang="ts" setup>
import { provide } from 'vue'
import { Button, UI_KIT_CONFIG_KEY } from 'dotdev/ui-kit'

provide(UI_KIT_CONFIG_KEY, {
  namespace: 'd',
  components: {
    button: {
      color: 'danger',
      size: 'lg',
      variant: 'soft',
    },
  },
})
</script>

<template>
  <Button label="Local override" color="primary" size="sm" />
  <Button label="Global default" />
  <Button label="Another instance" />
</template>
