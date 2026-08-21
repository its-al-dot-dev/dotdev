<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import basic from './examples/basic.vue'
import custom from './examples/custom.vue'
import variants from './examples/variants.vue'

defineDocPage({
  title: 'Accordion',
  icon: 'stack',
  styleScope: 'accordion',
  description: `A vertically stacked list of interactive headers that reveal or hide associated content panels. Supports single or multiple open panels, four visual variants, and scoped slots for custom headers and content.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `An <code>Accordion</code> lets users expand and collapse sections of content. By default only one item is open at a time, and the header is rendered automatically from the item's <code>label</code>.`,
      preview: basic,
    },
    {
      title: 'Variants',
      description: `The accordion ships in four variants: <code>outlined</code> boxes, <code>soft</code> tonal panels, <code>underline</code> rows separated by hairlines, and <code>plain</code>, which adds no styling so you can compose it into your own layout.`,
      preview: variants,
    },
    {
      title: 'Custom slots & multiple',
      description: `The scoped <code>default</code> and <code>content</code> slots replace the built-in header and body. Set <code>multiple</code> to keep several sections open at the same time.`,
      preview: custom,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
