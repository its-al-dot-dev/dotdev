<script lang="ts" setup>
import type { StyleToken } from './style-tokens.ts'

defineProps<{ token: StyleToken }>()
</script>

<template>
  <div class="doc-token">
    <div class="doc-token__well" :class="{ 'doc-token__well--end': token.type === 'size' }" aria-hidden="true">
      <span
        v-if="token.type === 'color'"
        class="doc-token__swatch"
        :style="{ backgroundColor: token.value }"
      />
      <template v-else-if="token.type === 'space'">
        <span class="doc-token__shape" />
        <span class="doc-token__shape" :style="{ marginLeft: token.value }" />
      </template>
      <span
        v-else-if="token.type === 'radius'"
        class="doc-token__shape doc-token__shape--rect"
        :style="{ borderRadius: token.value }"
      />
      <span v-else-if="token.type === 'size'" class="doc-token__bar" :style="{ height: token.value }" />
      <span v-else class="doc-token__label" :style="{ fontSize: token.value }">Ag</span>
    </div>

    <div class="doc-token__meta">
      <span class="doc-token__name">{{ token.name }}</span>
      <span class="doc-token__value">{{ token.value }}</span>
    </div>
  </div>
</template>
