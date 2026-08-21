<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import avatar from './examples/avatar.vue'
import base from './examples/base.vue'
import border from './examples/border.vue'
import colors from './examples/colors.vue'
import element from './examples/element.vue'
import icons from './examples/icons.vue'
import rounded from './examples/rounded.vue'
import sizes from './examples/sizes.vue'
import slots from './examples/slots.vue'
import variants from './examples/variants.vue'

defineDocPage({
  title: 'Tag',
  icon: 'component-1',
  description: `A compact label for categorizing and marking content. Supports six semantic colors, soft and solid variants, a rounded style, optional prefix and suffix icons, and custom content via slots.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Pass a <code>label</code> to render text inside the tag. Use the default slot for fully custom content.`,
      preview: base,
    },
    {
      title: 'Sizes',
      description: `The tag scales with the surrounding text size. Use text size utilities such as <code>text-xs</code>, <code>text-sm</code>, <code>text-base</code>, <code>text-lg</code>, and <code>text-xl</code> to adjust it.`,
      preview: sizes,
    },
    {
      title: 'Variants',
      description: `Tags support <code>soft</code> and <code>solid</code> variants. <code>soft</code> is used by default.`,
      preview: variants,
    },
    {
      title: 'Border',
      description: `Use the <code>border</code> prop to add an outline around the tag. It is disabled by default.`,
      preview: border,
    },
    {
      title: 'Colors',
      description: `Use the <code>color</code> prop to pick from the built-in palette: <code>primary</code>, <code>neutral</code>, <code>success</code>, <code>warning</code>, <code>danger</code>, and <code>info</code>.`,
      preview: colors,
    },
    {
      title: 'Rounded',
      description: `Use the <code>rounded</code> prop to render the tag with a fully rounded (pill) shape.`,
      preview: rounded,
    },
    {
      title: 'Icons',
      description: `Use the <code>prefixIcon</code> and <code>suffixIcon</code> props to add icons before or after the label.`,
      preview: icons,
    },
    {
      title: 'Slots',
      description: `Use the <code>prefix</code>, <code>default</code>, and <code>suffix</code> slots to render custom content inside the tag.`,
      preview: slots,
    },
    {
      title: 'Element',
      description: `Use the <code>is</code> prop to render a different root element, for example a link or a button.`,
      preview: element,
    },
    {
      title: 'Avatar slot',
      description: `Combine a tag with an avatar for user badges. Render the avatar inside the default slot and use <code>rounded</code> for a pill shape.`,
      preview: avatar,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
