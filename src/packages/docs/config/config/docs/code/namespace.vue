<script lang="ts" setup>
import { nextTick, onMounted, provide, ref } from 'vue'
import { Button, UI_KIT_CONFIG_KEY } from 'dotdev/ui-kit'

provide(UI_KIT_CONFIG_KEY, {
  namespace: 'app',
})

const root = ref<HTMLElement>()
const renderedClasses = ref('')

onMounted(async () => {
  await nextTick()
  renderedClasses.value = root.value?.querySelector('button')?.getAttribute('class') ?? ''
})
</script>

<template>
  <div ref="root">
    <Button label="Namespaced button" />
  </div>

  <p class="namespace-note">
    Rendered classes: <code>{{ renderedClasses }}</code>
  </p>
</template>

<style scoped>
@reference 'tailwindcss';

.namespace-note {
  @apply w-full mt-2;
}
</style>
