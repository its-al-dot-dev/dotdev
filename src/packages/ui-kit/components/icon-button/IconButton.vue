<script lang="ts" setup>
import Button from '../button/Button.vue'
import type { UIIconButtonProps } from './icon-button.types.ts'
import { useUiKitProps } from '../../config'
import { computed } from 'vue'
import { useUiKitBem } from '../../composables'

const props = withDefaults(defineProps<UIIconButtonProps>(), {
  ui: 'icon-button',
  size: 'md',
  color: 'neutral',
  variant: 'ghost',
  type: 'button',
})

const ui = useUiKitProps('icon-button', props)
const bind = computed(() => {
  const { ui: _, ...props } = ui
  return props
})

const bem = useUiKitBem(ui)
</script>

<template>
  <Button :class="bem()" v-bind="bind" />
</template>
