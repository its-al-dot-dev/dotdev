<script generic="T extends Record<string, unknown>" lang="ts" setup>
const props = defineProps<{ scope: T }>()
</script>

<template>
  <slot v-bind="props.scope" />
</template>
