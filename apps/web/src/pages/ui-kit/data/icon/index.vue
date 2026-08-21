<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import base from './examples/base.vue'
import custom from './examples/custom.vue'
import namespace from './examples/namespace.vue'
import sizes from './examples/sizes.vue'

defineDocPage({
  title: 'Icon',
  icon: 'component-1',
  description: `A flexible icon component that renders SVG icons from the global icon registry (provided via <code>createUiKit</code>). Supports custom components via <code>is</code> prop and any SVG component via <code>name</code>.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Pass the icon <code>name</code> from the global registry (provided by <code>createUiKit</code>).`,
      preview: base,
    },
    {
      title: 'Custom component',
      description: `Use the <code>is</code> prop to render a custom component (e.g., another icon or component).`,
      preview: custom,
    },
    {
      title: 'Sizing',
      description: `Icon size follows the parent font-size. Use standard CSS to control size, or set <code>font-size</code> on the wrapper.`,
      preview: sizes,
    },
    {
      title: 'Namespace',
      description: `The rendered element uses the BEM namespace (default <code>d</code>). Override with <code>UiKitProvider namespace="app"</code>.`,
      preview: namespace,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
