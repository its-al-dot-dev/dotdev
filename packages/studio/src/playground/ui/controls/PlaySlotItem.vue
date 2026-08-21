<script lang="ts" setup>
import type { PlaySlotMeta } from '../../plugin/component-meta.types.ts'
import { Tag } from '@dotdev/ui-kit'
import PlayItemLayout from './PlayItemLayout.vue'

interface Props {
  meta: PlaySlotMeta
}

defineProps<Props>()
</script>

<template>
  <PlayItemLayout :description="meta.description" :name="meta.name">
    <template v-if="meta.type" #footer>
      <Tag class="play-slot-item__scope" size="sm">{{ meta.type }}</Tag>
    </template>
  </PlayItemLayout>
</template>
