<script lang="ts" setup></script>
<template>
  <div class="doc-card">
    <div v-if="$slots.header" class="doc-card__header">
      <slot name="header" />
    </div>

    <slot />

    <div v-if="$slots.footer" class="doc-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>
