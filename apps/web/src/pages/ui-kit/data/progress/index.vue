<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import basic from './examples/basic.vue'
import colors from './examples/colors.vue'
import indeterminate from './examples/indeterminate.vue'
import sizes from './examples/sizes.vue'
import upload from './examples/upload.vue'

defineDocPage({
  title: 'Progress',
  icon: 'bar-chart',
  styleScope: 'progress',
  description: `A horizontal bar that communicates completion status of a task. Supports determinate and indeterminate states, six colors, and custom sizing via utility classes.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Pass a <code>value</code> between <code>0</code> and <code>max</code> (100 by default) to render a determinate bar. The indicator width animates as the value changes.`,
      preview: basic,
    },
    {
      title: 'Colors',
      description: `Use the <code>color</code> prop to match the task semantics — <code>success</code> for finished work, <code>danger</code> for failures, or the default <code>primary</code>.`,
      preview: colors,
    },
    {
      title: 'Indeterminate',
      description: `Omit the <code>value</code> prop when progress cannot be measured. The indicator pulses to show activity without claiming a specific percentage.`,
      preview: indeterminate,
    },
    {
      title: 'Sizes',
      description: `The bar is <code>h-2</code> by default; override height and rounding with utility classes such as <code>h-1</code>, <code>h-5</code>, or <code>rounded-none</code>.`,
      preview: sizes,
    },
    {
      title: 'File upload',
      description: `Compose the bar with labels and controls for real-world flows. The value is reactive, so the indicator follows state changes automatically.`,
      preview: upload,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
