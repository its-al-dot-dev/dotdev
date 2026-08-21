<script lang="ts" setup>
import { computed } from 'vue'
import type { StyleToken } from './style-tokens.ts'

const props = defineProps<{ token: StyleToken }>()

const PADDING_SIDES: Record<string, string> = {
  padding: 'padding',
  'padding-inline': 'padding-inline',
  'padding-block': 'padding-block',
  'padding-top': 'padding-top',
  'padding-bottom': 'padding-bottom',
  'padding-inline-start': 'padding-inline-start',
  'padding-inline-end': 'padding-inline-end',
}

const isPadding = computed(() => props.token.type in PADDING_SIDES)
const isMeasure = computed(() => ['height', 'width', 'size'].includes(props.token.type))

const paddingStyle = computed(() => ({ [PADDING_SIDES[props.token.type]]: props.token.value }))

const measureStyle = computed(() => {
  const { type, value, style } = props.token
  return type === 'size' ? { width: value, height: value } : style
})
</script>

<template>
  <div class="doc-token">
    <div aria-hidden="true" class="doc-token__well doc-bg-grid">
      <span v-if="token.type === 'background'" :style="token.style" class="doc-token__bg" />

      <span
        v-else-if="token.type === 'color' || token.type === 'font-size'"
        :style="token.style"
        class="doc-token__text"
      >
        Ag
      </span>

      <span v-else-if="token.type === 'border-color'" :style="token.style" class="doc-token__border" />

      <span v-else-if="token.type === 'outline-color'" :style="token.style" class="doc-token__ring" />

      <span v-else-if="token.type === 'gap'" :style="{ gap: token.value }" class="doc-token__space">
        <span class="doc-token__shape" />
        <span class="doc-token__shape" />
      </span>

      <span v-else-if="isPadding" :style="paddingStyle" class="doc-token__padding">
        <span class="doc-token__content" />
      </span>

      <span v-else-if="token.type === 'border-radius'" :style="token.style" class="doc-token__radius" />

      <span
        v-else-if="isMeasure"
        :class="`doc-token__measure--${token.type}`"
        :style="measureStyle"
        class="doc-token__measure"
      />
    </div>

    <div class="doc-token__meta">
      <span class="doc-token__name">{{ token.name }}</span>
      <span class="doc-token__value">{{ token.value }}</span>
    </div>
  </div>
</template>
