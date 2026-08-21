<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import basic from './examples/basic.vue'
import border from './examples/border.vue'
import colors from './examples/colors.vue'
import live from './examples/live.vue'
import variants from './examples/variants.vue'

defineDocPage({
  title: 'Message',
  icon: 'info-circled',
  description: `A lightweight banner that combines an icon, a title, and a body message. Comes in soft and plain variants across six colors, with an optional border.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `A <code>Message</code> combines an icon, a title, and a body message. By default it renders as a <code>soft</code> block in the <code>primary</code> color.`,
      preview: basic,
    },
    {
      title: 'Colors',
      description: `Every semantic color is available. Pick a tone that matches the meaning of the message: <code>primary</code>, <code>neutral</code>, <code>danger</code>, <code>warning</code>, <code>info</code>, or <code>success</code>.`,
      preview: colors,
    },
    {
      title: 'Variants',
      description: `Two variants are available. <code>soft</code> fills the block with a tonal background, while <code>plain</code> keeps a transparent background so the message sits flat on the canvas.`,
      preview: variants,
    },
    {
      title: 'Border',
      description: `Pass <code>border</code> to frame the message with a thin outline in the message color. The border stays subtle on the <code>soft</code> variant.`,
      preview: border,
    },
    {
      title: 'Live regions',
      description: `A message is announced to screen readers as a live region. By default it uses <code>role="status"</code> (polite). Pass <code>role="alert"</code> for urgent messages that should interrupt, or <code>role="none"</code> to turn live announcements off for static content. The icon is always hidden from assistive technology since the text already conveys the meaning.`,
      preview: live,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
