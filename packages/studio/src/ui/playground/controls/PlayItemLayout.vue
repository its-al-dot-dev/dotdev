<script lang="ts" setup>
interface Props {
  name: string
  required?: boolean
  description?: string
}

defineProps<Props>()
</script>

<template>
  <div class="play-item-layout">
    <div class="play-item-layout__header">
      <span class="play-item-layout__name">{{ name }}<span v-if="required">*</span></span>
      <p v-if="description" class="play-item-layout__desc">{{ description }}</p>
    </div>

    <slot />

    <div v-if="$slots.footer" class="play-item-layout__footer">
      <slot name="footer" />
    </div>
  </div>
</template>
