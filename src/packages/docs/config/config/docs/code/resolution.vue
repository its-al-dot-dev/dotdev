<script lang="ts" setup>
import { defineComponent, provide } from 'vue'
import { Button, UI_KIT_CONFIG_KEY } from 'dotdev/ui-kit'

provide(UI_KIT_CONFIG_KEY, {
  namespace: 'd',
  components: {
    button: { color: 'danger', size: 'lg' },
  },
})

const DefaultsScope = defineComponent({
  name: 'DefaultsScope',
  setup(_, { slots }) {
    provide(UI_KIT_CONFIG_KEY, { namespace: 'd' })
    return () => slots.default?.()
  },
})
</script>

<template>
  <Button label="1 · Local prop" color="warning" />
  <Button label="2 · Global config" />

  <DefaultsScope>
    <Button label="3 · Component default" />
  </DefaultsScope>
</template>
