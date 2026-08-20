<script lang="ts" setup>
import { computed } from 'vue'
import { Icon, Tag } from '@dotdev/ui-kit'
import { useRoute } from 'vue-router'
import DocExample from './DocExample.vue'
import DocSidebar from './DocSidebar.vue'
import DocStyleTokens from './DocStyleTokens.vue'
import { STYLE_TOKEN_GROUPS } from './style-tokens.ts'
import type { ExampleMeta } from '../../docs/define-example.ts'
import { normalizeExamples } from '../../utils/normalize-example.ts'

const route = useRoute()

const examples = normalizeExamples(
  route.meta?.examples,
  route.meta?.sources,
  route.meta?.examplesMeta as Record<string, ExampleMeta> | undefined,
)

function formatName(name: string): string {
  return name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (char) => char.toUpperCase())
}

const title = computed(() => (typeof route.name === 'string' ? formatName(route.name) : ''))

const section = computed(() => {
  const segment = route.path.split('/').filter(Boolean)[0] ?? ''
  return formatName(segment.replace(/-/g, ' '))
})

const exampleItems = computed(() =>
  examples.map((example) => ({
    ...example,
    title: example.title ?? formatName(example.id.replace(/-/g, ' ')),
  })),
)

const sidebarItems = computed(() => [
  ...exampleItems.value.map((example) => ({
    id: `example-${example.id}`,
    title: example.title ?? '',
  })),
  { id: 'style-tokens', title: 'Style tokens' },
])
</script>

<template>
  <main class="doc-page">
    <div class="doc-page__body">
      <header class="doc-page__header">
        <div class="doc-page__caption">
          <span class="doc-page__caption-label">{{ section }}</span>

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
          <Icon v-if="route.meta.icon" :name="route.meta.icon" class="doc-page__title-icon" />
          {{ title }}
        </h1>

        <p class="doc-page__desc doc-desc" v-html="route.meta.desc" />
      </header>

      <slot />

      <hr class="doc-page__divider" />

      <div v-if="exampleItems.length" class="doc-section">
        <h3 class="doc-section__title">Examples</h3>

        <section
          v-for="example in exampleItems"
          :id="`example-${example.id}`"
          :key="example.id"
          class="doc-page__example"
        >
          <DocExample
            :code="example.code"
            :component="example.component"
            :desc="example.desc"
            :lang="example.lang"
            :title="example.title"
          />
        </section>
      </div>

      <DocStyleTokens :groups="STYLE_TOKEN_GROUPS" />
    </div>

    <DocSidebar v-if="exampleItems.length" :items="sidebarItems" />
  </main>
</template>
