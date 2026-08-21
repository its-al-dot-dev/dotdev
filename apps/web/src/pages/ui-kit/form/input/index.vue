<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import base from './examples/base.vue'
import disabled from './examples/disabled.vue'
import group from './examples/group.vue'
import invalid from './examples/invalid.vue'
import sizes from './examples/sizes.vue'
import variants from './examples/variants.vue'

defineDocPage({
  title: 'Input',
  icon: 'component-1',
  styleScope: 'input',
  description: `A flexible text input component with support for different sizes, variants, validation states, and controlled values via <code>v-model</code>. Designed for building accessible forms with consistent styling and customization options.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Use <code>v-model</code> to control the input value. The <code>placeholder</code> prop can be used to provide a hint when the field is empty.`,
      preview: base,
    },
    {
      title: 'Sizes',
      description: `Use the <code>size</code> prop to adjust the input dimensions. Available sizes are <code>sm</code>, <code>md</code>, and <code>lg</code>.`,
      preview: sizes,
    },
    {
      title: 'Variants',
      description: `Use the <code>variant</code> prop to control the visual style of the input. Available variants are <code>outlined</code>, <code>soft</code>, <code>underlined</code>, and <code>plain</code>.`,
      preview: variants,
    },
    {
      title: 'Disabled state',
      description: `Use the <code>disabled</code> prop to prevent user interaction and display the input in a disabled state.`,
      preview: disabled,
    },
    {
      title: 'Invalid state',
      description: `Use the <code>invalid</code> prop to visually indicate a validation error state. This works with all input variants.`,
      preview: invalid,
    },
    {
      title: 'Input group',
      description: `Use <code>Group</code> to combine <code>Input</code> with related controls such as addons, buttons, and icon actions. Use <code>GroupAddon</code> for additional content inside the field or attach it to the input using the <code>attach</code> prop.`,
      preview: group,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
