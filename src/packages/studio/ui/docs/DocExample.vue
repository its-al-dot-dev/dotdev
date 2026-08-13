<script lang="ts" setup>
import { type Component, computed, provide, reactive, ref } from 'vue'
import { IconButton, SelectButton, useClipboard, useColorScheme } from 'dotdev/ui-kit'
import DocCard from './DocCard.vue'
import DocCode from './DocCode.vue'
import DocBlock from './DocBlock.vue'
import { EXAMPLE_KEY } from '../../docs'

interface Props {
  component?: Component
  code?: string
}

const props = defineProps<Props>()

const { copy, copied } = useClipboard(props.code)
const { scheme } = useColorScheme()
const isToggleTheme = ref(false)

const activeTab = ref(props.component ? 'Example' : 'Code')
const tabs = computed(() => [props.component && 'Example', props.code && 'Code'].filter(Boolean))

const meta = reactive({ title: '', desc: '' })
provide(EXAMPLE_KEY, meta)
</script>

<template>
  <DocBlock :desc="meta.desc" :title="meta.title">
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
          <component :is="component" />
        </div>

        <div v-if="code" v-show="activeTab === 'Code'" class="doc-example__code">
          <DocCode :code="code" />
        </div>
      </div>
    </DocCard>
  </DocBlock>
</template>
