<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import base from './examples/base.vue'
import border from './examples/border.vue'
import colors from './examples/colors.vue'
import sizes from './examples/sizes.vue'
import slot from './examples/slot.vue'
import square from './examples/square.vue'
import variants from './examples/variants.vue'

defineDocPage({
  title: 'Avatar',
  icon: 'component-1',
  description: `A circular or square avatar that renders an image, a text label, or an icon. Supports six semantic colors, soft and solid variants, multiple sizes, an optional border, and custom content via the default slot.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Pass an <code>src</code> to render an image, a <code>label</code> to show initials or text, or an <code>icon</code> to show a glyph. The first matching source wins.`,
      preview: base,
    },
    {
      title: 'Sizes',
      description: `The avatar inherits the surrounding text size. Use text size utilities such as <code>text-xs</code>, <code>text-sm</code>, <code>text-base</code>, <code>text-lg</code>, and <code>text-xl</code> to scale it.`,
      preview: sizes,
    },
    {
      title: 'Variants',
      description: `Avatars support <code>soft</code> and <code>solid</code> variants. <code>soft</code> is used by default.`,
      preview: variants,
    },
    {
      title: 'Border',
      description: `Set the <code>border</code> prop to draw a border around the avatar, useful when laid out over a busy background.`,
      preview: border,
    },
    {
      title: 'Colors',
      description: `Use the <code>color</code> prop to pick from the built-in palette: <code>primary</code>, <code>neutral</code>, <code>success</code>, <code>warning</code>, <code>danger</code>, and <code>info</code>.`,
      preview: colors,
    },
    {
      title: 'Default slot',
      description: `Use the default slot to render fully custom content inside the avatar, shown when no <code>src</code>, <code>label</code>, or <code>icon</code> is provided.`,
      preview: slot,
    },
    {
      title: 'Square',
      description: `Use the <code>square</code> prop to render the avatar with squared corners instead of a circle.`,
      preview: square,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
