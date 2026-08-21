<script lang="ts" setup>
import type { PlayComponentMeta } from '../../plugin/component-meta.types.ts'
import PlayPropItem from './PlayPropItem.vue'
import { IconButton } from '@dotdev/ui-kit'
import { computed } from 'vue'
import PlayControlLayout from './PlayControlLayout.vue'

interface ControlsProps {
  state: Record<string, any>
  meta?: PlayComponentMeta
}

const props = defineProps<ControlsProps>()

const state = computed(() => props.state)
</script>

<template>
  <PlayControlLayout
    :is-empty="!meta?.props"
    class="play-props"
    empty-desc="This component has no configurable properties"
    empty-title="No props available"
    icon="mixer-horizontal"
    title="Props"
  >
    <template #toolbar>
      <IconButton icon="reset" size="sm" />
    </template>

    <PlayPropItem v-for="propMeta in meta?.props" :key="propMeta.name" v-model="state" :meta="propMeta" />
  </PlayControlLayout>
</template>
