<script lang="ts" setup>
import type { PlayEventMeta } from '../../../plugin/component-meta.types.ts'
import { Tag } from 'dotdev/ui-kit'
import PlayItemLayout from './PlayItemLayout.vue'

interface Props {
  meta: PlayEventMeta
}

defineProps<Props>()
</script>

<template>
  <PlayItemLayout :description="meta.description" :name="`@${meta.name}`">
    <template v-if="meta.signature" #footer>
      <Tag class="play-event-item__signature" size="sm">{{ meta.signature }}</Tag>
    </template>
  </PlayItemLayout>
</template>
