<script lang="ts" setup>
import type { PlayComponentMeta } from '../../../plugin/component-meta.types.ts'
import PlayControlLayout from './PlayControlLayout.vue'
import PlayEventItem from './PlayEventItem.vue'

interface Props {
  meta?: PlayComponentMeta
}

defineProps<Props>()
</script>

<template>
  <PlayControlLayout
    :is-empty="!meta?.events?.length"
    class="play-events"
    empty-desc="This component has no events defined"
    empty-title="No events available"
    icon="radiobutton"
    title="Emits"
  >
    <PlayEventItem v-for="eventMeta in meta?.events" :key="eventMeta.name" :meta="eventMeta" />
  </PlayControlLayout>
</template>
