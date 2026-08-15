<script lang="ts" setup>
import { Icon } from 'dotdev/ui-kit'
import DocStyleToken from './DocStyleToken.vue'
import type { StyleTokenGroup } from './style-tokens.ts'

defineProps<{ groups: StyleTokenGroup[] }>()
</script>

<template>
  <section class="doc-tokens" id="style-tokens" aria-labelledby="style-tokens-title">
    <header class="doc-tokens__header">
      <span class="doc-tokens__icon" aria-hidden="true">
        <Icon name="tokens" />
      </span>

      <div>
        <h2 id="style-tokens-title" class="doc-tokens__title">Style tokens</h2>
        <p class="doc-tokens__desc">
          The CSS variables every component composes from — color, spacing, radii, control sizes, and the type
          scale.
        </p>
      </div>
    </header>

    <div v-for="group in groups" :key="group.id" class="doc-tokens__group">
      <h3 class="doc-tokens__group-label">{{ group.label }}</h3>

      <div class="doc-tokens__grid">
        <DocStyleToken v-for="token in group.tokens" :key="token.name" :token="token" />
      </div>
    </div>
  </section>
</template>
