<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import { Button, UiKitProvider } from '@dotdev/ui-kit'

const root = ref<HTMLElement>()
const renderedClasses = ref('')

onMounted(async () => {
  await nextTick()
  renderedClasses.value = root.value?.querySelector('button')?.getAttribute('class') ?? ''
})
</script>

<template>
  <UiKitProvider namespace="app">
    <div ref="root">
      <Button label="Namespaced button" />
    </div>
  </UiKitProvider>

  <p class="mt-2 w-full text-sm">
    Rendered classes: <code>{{ renderedClasses }}</code>
  </p>
</template>
