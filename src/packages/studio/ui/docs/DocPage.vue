<script lang="ts" setup>
import { Icon, Tag } from 'dotdev/ui-kit'
import { useRoute } from 'vue-router'
import DocExample from './DocExample.vue'
import { normalizeExamples } from '../../utils/normalize-example.ts'

const route = useRoute()

const examples = normalizeExamples(route.meta?.examples, route.meta?.sources)
</script>

<template>
  <main class="doc-page">
    <div class="doc-page__body">
      <div class="doc-page__header">
        <div class="doc-page__group">
          <h2 class="doc-page__title">
            <Icon v-if="route.meta.icon" :name="route.meta.icon" class="doc-page__title-icon" />
            {{ route.name }}
          </h2>

          <Tag
            is="a"
            class="doc-page__gh"
            color="primary"
            href="#"
            label="GitHub"
            prefix-icon="github-logo"
            suffix-icon="external-link"
          />
        </div>

        <p class="doc-page__desc doc-desc" v-html="route.meta.desc" />
      </div>

      <slot />

      <hr class="doc-page__divider" />

      <div v-if="examples.length" class="doc-section">
        <h3 class="doc-section__title">Examples</h3>
        <DocExample v-for="example in examples" :key="example.id" :code="example.code" :component="example.component" />
        <hr class="doc-page__divider" />
      </div>
    </div>

    <!--    <DocSidebar :config="config" />-->
  </main>
</template>
