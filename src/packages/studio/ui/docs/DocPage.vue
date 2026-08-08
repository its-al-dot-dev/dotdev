<script lang="ts" setup>
import type { DocConfig } from '../../docs/config.ts'
import DocBlock from './DocBlock.vue'
import { Icon, Tag } from 'dotdev/ui-kit'
import { useRoute } from 'vue-router'

interface Props {
  config?: DocConfig
}

defineProps<Props>()

const route = useRoute()
</script>

<template>
  <main class="doc-page">
    <div class="doc-page__body">
      <div class="doc-page__group">
        <h2 class="doc-page__title">
          <Icon v-if="route.meta.icon" :name="route.meta.icon" />
          {{ route.name }}
          <!--          <Tag label="FREE" size="sm" />-->
        </h2>

        <a href="#">
          <Tag label="GitHub" prefix-icon="github-logo" suffix-icon="external-link" />
        </a>
      </div>

      <p class="doc-page__desc doc-desc" v-html="route.meta.desc" />

      <slot />

      <hr class="doc-page__divider" />

      <div v-for="(blockEntry, key) in config?.blocks" :id="key" :key="key" class="doc-section">
        <h3 class="doc-section__title">{{ key }}</h3>

        <template v-for="(block, _k) in blockEntry" :key="_k">
          <DocBlock :id="_k" :config="block" />
        </template>

        <hr class="doc-page__divider" />
      </div>
    </div>

    <!--    <DocSidebar :config="config" />-->
  </main>
</template>
