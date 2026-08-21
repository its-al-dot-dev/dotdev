<script generic="T extends Record<string, unknown>" lang="ts" setup>
import type { UITagElement } from '@dotdev/ui-kit'

const props = defineProps<{ is?: UITagElement; scope: T }>()
</script>

<template>
  <component :is="is" v-if="is">
    <slot v-bind="props.scope" />
  </component>
  <slot v-else v-bind="props.scope" />
</template>
