<script lang="ts" setup>
import { provide } from 'vue'
import { Button, UI_KIT_CONFIG_KEY } from 'dotdev/ui-kit'

defineExample({
  title: 'Install once at the app root',
  desc: `Register <code>app.use(createUiKit(config))</code> before mounting, and every component resolves its missing props from the config. Since <code>app.use()</code> cannot run inside a component, the examples on this page reproduce the same effect with a local <code>provide()</code>.`,
})

provide(UI_KIT_CONFIG_KEY, {
  namespace: 'd',
  components: {
    button: { color: 'primary', size: 'lg', variant: 'soft' },
  },
})
</script>

<template>
  <Button label="Resolved from config" />
  <Button label="Local prop wins" color="danger" size="sm" />
</template>
