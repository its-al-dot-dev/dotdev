<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import base from './examples/base.vue'
import disabled from './examples/disabled.vue'
import invalid from './examples/invalid.vue'
import sizes from './examples/sizes.vue'
import variants from './examples/variants.vue'

defineDocPage({
  title: 'Checkbox',
  icon: 'component-1',
  styleScope: 'checkbox',
  description: `A toggleable checkbox driven by a controlled <code>v-model</code>. Supports different sizes and variants as well as disabled and invalid states, with an accessible native input underneath.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Use <code>v-model</code> to control the checked state. The component renders a single native checkbox, so wrap it in a <code>label</code> to attach a clickable label.`,
      preview: base,
    },
    {
      title: 'Variants',
      description: `Use the <code>variant</code> prop to control the visual style. Available variants are <code>outlined</code> and <code>soft</code>.`,
      preview: variants,
    },
    {
      title: 'Sizes',
      description: `Use the <code>size</code> prop to adjust the checkbox dimensions. Available sizes are <code>sm</code>, <code>md</code>, and <code>lg</code>.`,
      preview: sizes,
    },
    {
      title: 'Disabled state',
      description: `Use the <code>disabled</code> prop to prevent user interaction and display the checkbox in a disabled state.`,
      preview: disabled,
    },
    {
      title: 'Invalid state',
      description: `Use the <code>invalid</code> prop to visually indicate a validation error state. This works with all checkbox variants.`,
      preview: invalid,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
