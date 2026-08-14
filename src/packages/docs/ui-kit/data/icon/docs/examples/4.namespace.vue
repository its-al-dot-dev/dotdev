<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import { Icon, UiKitProvider } from 'dotdev/ui-kit'

defineExample({
  title: 'Namespace',
  desc: 'The rendered element uses the BEM namespace (default <code>d</code>). Override with <code>UiKitProvider namespace="app"</code>.',
})

const defaultRoot = ref<HTMLElement>()
const customRoot = ref<HTMLElement>()
const defaultClasses = ref('')
const customClasses = ref('')

onMounted(async () => {
  await nextTick()
  defaultClasses.value = defaultRoot.value?.querySelector('span')?.getAttribute('class') ?? ''
  customClasses.value = customRoot.value?.querySelector('span')?.getAttribute('class') ?? ''
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div ref="defaultRoot">
      <Icon name="bell" />
    </div>
    <p class="text-sm text-muted">Default namespace: <code>{{ defaultClasses }}</code></p>

    <div ref="customRoot">
      <UiKitProvider namespace="app">
        <Icon name="bell" />
      </UiKitProvider>
    </div>
    <p class="text-sm text-muted">Custom namespace: <code>{{ customClasses }}</code></p>
  </div>
</template>