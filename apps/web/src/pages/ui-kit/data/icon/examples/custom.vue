<script lang="ts" setup>
import { Icon, IconButton } from '@dotdev/ui-kit'
import { h, defineComponent } from 'vue'

const CustomIcon = defineComponent({
  render() {
    return h('svg', { viewBox: '0 0 24 24' }, h('path', { d: 'M12 2L2 7l10 5 10-5-10-5z' }))
  },
})
</script>

<template>
  <div class="flex items-center gap-4">
    <Icon :is="CustomIcon" />
    <IconButton icon="filter" />
  </div>
</template>
