<script lang="ts" setup>
import { Divider, Icon, Tag } from '@dotdev/ui-kit'
import DocStyleTokens from './DocStyleTokens.vue'
import { useDocPage } from '../define'
import DocExample from './DocExample.vue'
import DocSidebar from './DocSidebar.vue'

const doc = useDocPage()
</script>

<template>
  <main v-if="doc" class="doc-page">
    <div class="doc-page__body">
      <header class="doc-page__header">
        <div class="doc-page__caption">
          <span class="doc-page__caption-label">{{ doc.group }}</span>

          <Tag
            is="a"
            border
            class="doc-page__gh"
            href="#"
            label="GitHub"
            prefix-icon="github-logo"
            suffix-icon="external-link"
            variant="plain"
          />
        </div>

        <h1 class="doc-page__title">
          <Icon v-if="doc.icon" :name="doc.icon" class="doc-page__title-icon" />
          {{ doc.title }}
        </h1>

        <p class="doc-page__desc doc-desc" v-html="doc.description" />
      </header>

      <slot />

      <Divider class="doc-page__divider" variant="dashed" />

      <div v-if="doc.examples.length" class="doc-section">
        <h3 class="doc-section__title">Examples</h3>

        <section v-for="example in doc.examples" :id="example.id" :key="example.id" class="doc-page__example">
          <DocExample :example="example" />
        </section>
      </div>

      <DocStyleTokens v-if="doc.styleScope" :style-scope="doc.styleScope" />
    </div>

    <DocSidebar v-if="doc.examples.length" :examples="doc.examples" />
  </main>
</template>
