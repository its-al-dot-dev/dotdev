<script lang="ts" setup>
import { computed } from 'vue'
import { Icon } from '@dotdev/ui-kit'
import { theme } from '@dotdev/theme'
import DocStyleToken from './DocStyleToken.vue'
import { buildStyleTokenGroups, type ComponentTokens } from './style-tokens.ts'

interface Props {
  styleScope: string
}

const props = defineProps<Props>()

const components = theme.components as unknown as Record<string, ComponentTokens>

const groups = computed(() => buildStyleTokenGroups(props.styleScope, components?.[props.styleScope]))
</script>

<template>
  <section v-if="groups.length" id="style-tokens" aria-labelledby="style-tokens-title" class="doc-tokens">
    <header class="doc-tokens__header">
      <Icon class="doc-tokens__icon" name="tokens" />
      <h2 id="style-tokens-title" class="doc-tokens__title">Style tokens</h2>
    </header>

    <div v-for="group in groups" :key="group.id" class="doc-tokens__group">
      <h3 class="doc-tokens__group-label">{{ group.label }}</h3>

      <div class="doc-tokens__grid">
        <DocStyleToken v-for="token in group.tokens" :key="token.name" :token="token" />
      </div>
    </div>
  </section>
</template>
