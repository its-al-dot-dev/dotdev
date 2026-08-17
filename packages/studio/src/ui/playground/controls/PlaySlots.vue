<script lang="ts" setup>
import type { PlayComponentMeta } from '../../../plugin/component-meta.types.ts'
import PlayControlLayout from './PlayControlLayout.vue'
import PlaySlotItem from './PlaySlotItem.vue'

interface Props {
  meta?: PlayComponentMeta
}

defineProps<Props>()
</script>

<template>
  <PlayControlLayout
    :is-empty="!meta?.slots?.length"
    class="play-slots"
    empty-desc="This component has no slots defined"
    empty-title="No slots available"
    icon="box-model"
    title="Slots"
  >
    <PlaySlotItem v-for="slotMeta in meta?.slots" :key="slotMeta.name" :meta="slotMeta" />
  </PlayControlLayout>
</template>
