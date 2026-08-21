<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import basic from './examples/basic.vue'
import colors from './examples/colors.vue'
import label from './examples/label.vue'
import variants from './examples/variants.vue'

defineDocPage({
  title: 'Divider',
  icon: 'border-dashed',
  styleScope: 'divider',
  description: `A separator that splits content horizontally or vertically. Renders as a single line or with a centered label, in solid, dashed, or dotted styles across six colors.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `A <code>Divider</code> separates content. By default it renders as a single <code>horizontal</code> <code>solid</code> hairline; pass <code>orientation="vertical"</code> to split content side by side.`,
      preview: basic,
    },
    {
      title: 'Label',
      description: `Pass a <code>label</code> (or use the default slot) to center a title on the line. Labels are announced as content, while the lines themselves are hidden from assistive technology.`,
      preview: label,
    },
    {
      title: 'Variants',
      description: `Three line styles are available: <code>solid</code>, <code>dashed</code>, and <code>dotted</code>.`,
      preview: variants,
    },
    {
      title: 'Colors',
      description: `The divider and its label share the same accent. <code>neutral</code> keeps the line subtle and the label muted; the other colors draw the eye to the section title.`,
      preview: colors,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
