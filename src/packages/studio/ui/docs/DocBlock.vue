<script lang="ts" setup>

defineProps<{ title?: string; desc?: string }>()
</script>

<template>
  <div class="doc-block">
    <div class="doc-block__header">
      <h2 v-if="title" class="doc-block__title">{{ title }}</h2>
      <p v-if="desc" class="doc-block__desc doc-desc" v-html="desc" />
    </div>

    <div class="doc-block__body">
      <slot />
    </div>
  </div>
</template>
