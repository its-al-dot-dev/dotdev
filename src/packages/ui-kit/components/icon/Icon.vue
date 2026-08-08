<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import type { IconProps } from './icon.types.ts'
import { icons } from './registry.ts'

const props = defineProps<IconProps>()

const svg = ref('')

watchEffect(async () => {
  const loader = icons[`./icons/${props.name}.svg`]
  svg.value = loader ? await loader() : ''
})
</script>

<template>
  <span class="d-icon" v-html="svg" />
</template>
