<script lang="ts" setup>
import { nextTick, onMounted, provide, ref } from 'vue'
import { Button, UI_KIT_CONFIG_KEY } from 'dotdev/ui-kit'

defineExample({
  title: 'Custom namespace',
  desc: `Change the BEM prefix of every component by setting <code>namespace</code>. Below it is <code>app</code> instead of the default <code>d</code>.`,
})

provide(UI_KIT_CONFIG_KEY, { namespace: 'app' })

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

  <p class="mt-2 w-full text-sm">
    Rendered classes: <code>{{ renderedClasses }}</code>
  </p>
</template>
