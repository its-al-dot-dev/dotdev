<script lang="ts" setup>
import { type Component, computed, provide, reactive, ref } from 'vue'
import { IconButton, SelectButton, useClipboard, useColorScheme } from '@dotdev/ui-kit'
import DocBlock from './DocBlock.vue'
import DocCard from './DocCard.vue'
import DocCode from './DocCode.vue'
import { EXAMPLE_KEY } from '../../docs'

interface Props {
  component?: Component
  code?: string
  title?: string
  desc?: string
  lang?: string
}

const props = defineProps<Props>()

const { copy, copied } = useClipboard(props.code)
const { scheme } = useColorScheme()

const activeTab = ref(props.component ? 'Example' : 'Code')
const tabs = computed(() => [props.component && 'Example', props.code && 'Code'].filter(Boolean))

const isInvertedPreview = ref(false)
const isGridVisible = ref(true)

const previewScheme = computed(() => {
  if (!isInvertedPreview.value) return null
  return scheme.value === 'dark' ? 'light' : 'dark'
})

const previewIcon = computed(() => {
  if (!previewScheme.value) return scheme.value === 'dark' ? 'sun' : 'moon'
  return previewScheme.value === 'dark' ? 'moon' : 'sun'
})

const meta = reactive({ title: '', desc: '' })
provide(EXAMPLE_KEY, meta)
</script>

<template>
  <DocBlock :desc="meta.desc || props.desc" :title="meta.title || props.title">
    <DocCard class="doc-example">
      <template #header>
        <SelectButton
          v-if="tabs.length > 1"
          v-model="activeTab"
          #default="{ label }"
          :options="tabs"
          variant="outlined"
        >
          <span class="font-mono">{{ label }}</span>
        </SelectButton>

        <div class="doc-example__actions">
          <IconButton
            :aria-label="isGridVisible ? 'Hide canvas grid' : 'Show canvas grid'"
            :aria-pressed="isGridVisible"
            :class="isGridVisible ? 'text-brand' : 'text-muted'"
            icon="grid"
            @click="isGridVisible = !isGridVisible"
          />
          <IconButton
            :aria-label="previewScheme ? 'Revert preview scheme' : 'Preview in opposite scheme'"
            :icon="previewIcon"
            @click="isInvertedPreview = !isInvertedPreview"
          />
          <IconButton :icon="copied ? 'check' : 'copy'" aria-label="Copy source" @click="copy()" />
        </div>
      </template>

      <div :class="previewScheme" class="doc-example__body">
        <div
          v-if="component"
          v-show="activeTab === 'Example'"
          :class="{ 'doc-bg-grid': isGridVisible }"
          class="doc-example__canvas"
        >
          <component :is="component" />
        </div>

        <div v-if="code && activeTab === 'Code'" class="doc-example__code-view">
          <DocCode :code="code" :lang="lang" />
        </div>
      </div>
    </DocCard>
  </DocBlock>
</template>
