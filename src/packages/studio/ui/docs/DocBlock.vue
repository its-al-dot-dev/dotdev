<script lang="ts" setup>
import type { UIDocBlock } from '../../docs/config.ts'
import DocExample from './DocExample.vue'
import { provide, reactive } from 'vue'
import { STATE_SYMBOL } from './index.ts'

defineProps<{ config: UIDocBlock }>()

export interface DockBlockState {
  title: string
  desc: string
}

const state = reactive<DockBlockState>({
  title: '',
  desc: '',
})

provide(STATE_SYMBOL, state)
</script>

<template>
  <div class="doc-block">
    <div class="doc-block__header">
      <h2 class="doc-block__title">{{ state.title }}</h2>
      <p class="doc-block__desc doc-desc" v-html="state.desc" />
    </div>

    <DocExample v-if="config.component" :code="config.code" :component="config.component" />

    <div class="doc-block__body">
      <slot />
    </div>
  </div>
</template>
