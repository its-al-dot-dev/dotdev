<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import basic from './examples/basic.vue'
import sizes from './examples/sizes.vue'
import shapes from './examples/shapes.vue'
import variants from './examples/variants.vue'
import card from './examples/card.vue'

defineDocPage({
  title: 'Skeleton',
  icon: 'component-1',
  styleScope: 'skeleton',
  description: `A placeholder preview of content before it loads. Renders as a pulsing block that mimics the layout of text, avatars, or cards, reducing perceived loading time.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `A <code>Skeleton</code> renders as a full-width line by default. Compose several of them to mimic paragraphs of text; the pulse animation signals that content is on its way.`,
      preview: basic,
    },
    {
      title: 'Sizes',
      description: `Adjust dimensions with utility classes — <code>h-3</code>, <code>h-6</code>, or a hairline <code>h-px</code> for subtle dividers within a loading layout.`,
      preview: sizes,
    },
    {
      title: 'Shapes',
      description: `Use the <code>rounded</code> prop to turn a square skeleton into a circle, ideal for avatar placeholders next to text lines.`,
      preview: shapes,
    },
    {
      title: 'Variants',
      description: `The default <code>pulse</code> variant breathes to indicate activity; use <code>static</code> when the skeleton sits inside an already animated container or should stay still.`,
      preview: variants,
    },
    {
      title: 'Card composition',
      description: `Combine skeletons with real components to build a full loading state. Only the placeholders animate — static chrome like borders and buttons render immediately.`,
      preview: card,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
