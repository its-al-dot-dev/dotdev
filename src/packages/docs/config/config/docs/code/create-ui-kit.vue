<script lang="ts" setup>
import { provide } from 'vue'
import { Button, UI_KIT_CONFIG_KEY } from 'dotdev/ui-kit'

provide(UI_KIT_CONFIG_KEY, {
  namespace: 'd',
  components: {
    button: {
      color: 'success',
      size: 'lg',
    },
  },
})
</script>

<template>
  <Button label="Configured button" />
  <Button label="Another one" />
</template>
