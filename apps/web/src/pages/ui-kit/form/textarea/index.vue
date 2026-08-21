<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import base from './examples/base.vue'
import disabled from './examples/disabled.vue'
import invalid from './examples/invalid.vue'
import sizes from './examples/sizes.vue'
import variants from './examples/variants.vue'

defineDocPage({
  title: 'Textarea',
  icon: 'component-1',
  description: `A multi-line text input component driven by a controlled <code>v-model</code>. Supports different sizes, variants, validation states, and native attributes such as <code>placeholder</code> and <code>rows</code>.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Use <code>v-model</code> to control the value. The <code>placeholder</code> prop can be used to provide a hint when the field is empty.`,
      preview: base,
    },
    {
      title: 'Sizes',
      description: `Use the <code>size</code> prop to adjust the textarea dimensions. Available sizes are <code>sm</code>, <code>md</code>, and <code>lg</code>.`,
      preview: sizes,
    },
    {
      title: 'Variants',
      description: `Use the <code>variant</code> prop to control the visual style. Available variants are <code>outlined</code>, <code>soft</code>, <code>underlined</code>, and <code>plain</code>.`,
      preview: variants,
    },
    {
      title: 'Disabled state',
      description: `Use the <code>disabled</code> prop to prevent user interaction and display the textarea in a disabled state.`,
      preview: disabled,
    },
    {
      title: 'Invalid state',
      description: `Use the <code>invalid</code> prop to visually indicate a validation error state. This works with all textarea variants.`,
      preview: invalid,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
