<script lang="ts" setup>
import { computed, ref } from 'vue'
import { IconButton, SelectButton, useClipboard, useColorScheme } from '@dotdev/ui-kit'
import DocBlock from './DocBlock.vue'
import DocCard from './DocCard.vue'
import DocCode from './DocCode.vue'
import { type DocExampleResult } from '../define'

interface Props {
  example: DocExampleResult
}

const props = defineProps<Props>()

const preview = computed(() => props.example.preview)
const codes = computed(() => props.example.codes)

const activeTab = ref(preview.value ? 'Example' : 'Code')
const tabs = computed(() => [...(preview.value ? ['Example'] : []), ...(codes.value.length ? ['Code'] : [])])

const activeFileName = ref(codes.value[0]?.file)
const activeCode = computed(() => codes.value.find((code) => code.file === activeFileName.value))
const files = computed(() => codes.value.map((code) => code.file))
const showFiles = computed(() => activeTab.value === 'Code' && files.value.length > 1)

const { copy, copied } = useClipboard(() => activeCode.value?.code)
const { scheme } = useColorScheme()

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
</script>

<template>
  <DocBlock :desc="example.description" :title="example.title">
    <DocCard class="doc-example">
      <template #header>
        <div class="doc-example__nav">
          <SelectButton
            v-if="tabs.length > 1"
            v-model="activeTab"
            #default="{ label }"
            :options="tabs"
            variant="outlined"
          >
            <span class="font-mono">{{ label }}</span>
          </SelectButton>
        </div>

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
          v-if="example.preview"
          v-show="activeTab === 'Example'"
          :class="{ 'doc-bg-grid': isGridVisible }"
          class="doc-example__canvas"
        >
          <component :is="example.preview" />
        </div>

        <div v-if="activeCode && activeTab === 'Code'" class="doc-example__code-view">
          <SelectButton
            v-if="showFiles"
            v-model="activeFileName"
            #default="{ label }"
            :options="files"
            class="doc-example__code-toggle"
            size="sm"
            variant="soft"
          >
            <span class="font-mono">{{ label }}</span>
          </SelectButton>

          <DocCode :code="activeCode.code" :lang="activeCode.ext" />
        </div>
      </div>
    </DocCard>
  </DocBlock>
</template>
