<script lang="ts" setup>
import type { UIListBoxItemProps } from 'dotdev/ui-kit'

const props = defineProps<UIListBoxItemProps>()
</script>

<template>
  <li
    :aria-disabled="disabled"
    :aria-label="label"
    :aria-posinset="index + 1"
    :aria-selected="selected"
    :aria-setsize="size"
    :data-highlighted="highlighted ? '' : undefined"
    role="option"
  >
    <slot v-bind="props"> {{ label }} </slot>
  </li>
</template>
