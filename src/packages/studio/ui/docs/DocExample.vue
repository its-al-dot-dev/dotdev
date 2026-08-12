<script lang="ts" setup>
import { type Component, computed, inject, onMounted, ref, useTemplateRef } from 'vue'
import { IconButton, SelectButton, useClipboard, useColorScheme } from 'dotdev/ui-kit'
import DocCard from './DocCard.vue'
import DocCode from './DocCode.vue'
import { type CodeLoader, useCodeLoader } from './composables/useCodeLoader.ts'
import { STATE_SYMBOL } from './index.ts'

interface Props {
  component?: Component
  code?: CodeLoader
}

const props = defineProps<Props>()
const { rawCode } = useCodeLoader(() => props.code)

const { copy, copied } = useClipboard(rawCode)
const { scheme } = useColorScheme()
const isToggleTheme = ref(false)

const tabs = computed(() => {
  const result = []
  if (props.component) result.push('Example')
  if (props.code) result.push('Code')
  return result
})

const activeTab = ref(props.component ? 'Example' : 'Code')

const state = inject(STATE_SYMBOL, { title: '', desc: '' })
const componentRef = useTemplateRef<any>('component')

onMounted(() => {
  state.title = componentRef.value?.title ?? ''
  state.desc = componentRef.value?.desc ?? ''
})
</script>

<template>
  <DocCard class="doc-example">
    <template #header class="doc-example__header">
      <SelectButton v-if="tabs.length > 1" v-model="activeTab" :options="tabs" variant="outlined" />

      <div class="doc-example__actions">
        <IconButton
          :icon="isToggleTheme ? (scheme === 'dark' ? 'moon' : 'sun') : scheme === 'dark' ? 'sun' : 'moon'"
          @click="isToggleTheme = !isToggleTheme"
        />
        <IconButton :icon="copied ? 'check' : 'copy'" @click="copy()" />
      </div>
    </template>

    <div :class="isToggleTheme ? (scheme === 'dark' ? 'light' : 'dark') : null" class="doc-example__body">
      <div v-if="component && activeTab === 'Example'" class="doc-example__canvas">
        <component :is="component" ref="component" />
      </div>

      <div v-if="rawCode" v-show="activeTab === 'Code'" class="doc-example__code">
        <DocCode :code="rawCode" />
      </div>
    </div>
  </DocCard>
</template>
