<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import base from './examples/base.vue'
import disabled from './examples/disabled.vue'
import invalid from './examples/invalid.vue'
import variants from './examples/variants.vue'

defineDocPage({
  title: 'Switch',
  icon: 'component-1',
  description: `A toggle switch component driven by a controlled <code>v-model</code>. Supports <code>outlined</code> and <code>soft</code> variants as well as disabled and invalid states for accessible forms.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Use <code>v-model</code> to control the checked state. The switch starts unchecked by default.`,
      preview: base,
    },
    {
      title: 'Variants',
      description: `Use the <code>variant</code> prop to control the visual style. Available variants are <code>outlined</code> and <code>soft</code>.`,
      preview: variants,
    },
    {
      title: 'Disabled state',
      description: `Use the <code>disabled</code> prop to prevent user interaction and display the switch in a disabled state.`,
      preview: disabled,
    },
    {
      title: 'Invalid state',
      description: `Use the <code>invalid</code> prop to visually indicate a validation error state. This works with all switch variants.`,
      preview: invalid,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
