<script lang="ts" setup>
import { Icon, type UiKitIcon, ScrollArea } from 'dotdev/ui-kit'

interface Props {
  icon?: UiKitIcon
  title?: string
  isEmpty?: boolean
  emptyTitle?: string
  emptyDesc?: string
}

defineProps<Props>()
</script>

<template>
  <div class="play-control-layout">
    <div class="play-control-layout__header">
      <div class="play-control-layout__header-left">
        <div class="play-control-layout__title">
          <Icon v-if="icon" :name="icon" class="play-control-layout__title-icon" />
          {{ title }}
        </div>

        <slot name="header" />
      </div>

      <div class="play-control-layout__toolbar">
        <slot name="toolbar" />
      </div>
    </div>

    <ScrollArea class="play-control-layout__body">
      <div v-if="isEmpty" class="play-control-layout__empty">
        <p class="play-control-layout__empty-title">{{ emptyTitle || 'No data available' }}</p>
        <p v-if="emptyDesc" class="play-control-layout__empty-desc">{{ emptyDesc }}</p>
      </div>

      <slot v-else />
    </ScrollArea>
  </div>
</template>
