<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import base from './examples/base.vue'
import deselectable from './examples/deselectable.vue'
import disabled from './examples/disabled.vue'
import multiple from './examples/multiple.vue'
import objects from './examples/objects.vue'
import sizes from './examples/sizes.vue'
import slots from './examples/slots.vue'
import square from './examples/square.vue'
import variants from './examples/variants.vue'

defineDocPage({
  title: 'SelectButton',
  icon: 'component-1',
  description: `A segmented set of mutually exclusive toggle buttons driven by a controlled <code>v-model</code>. Supports single and multiple selection, object options via custom value/label keys, deselection, and per-option disabling.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Render a set of options with <code>options</code> and control the selection with <code>v-model</code>. By default only one option can be selected at a time.`,
      preview: base,
    },
    {
      title: 'Multiple selection',
      description: `Set the <code>multiple</code> prop to allow selecting several options at once. The <code>v-model</code> value should then be an array of selected options.`,
      preview: multiple,
    },
    {
      title: 'Deselectable',
      description: `Add the <code>deselectable</code> prop to clear the selection when clicking the already-selected option. Works in both single and multiple mode.`,
      preview: deselectable,
    },
    {
      title: 'Sizes',
      description: `Use the <code>size</code> prop to adjust the dimensions. Available sizes are <code>sm</code>, <code>md</code>, and <code>lg</code>.`,
      preview: sizes,
    },
    {
      title: 'Variants',
      description: `Use the <code>variant</code> prop to change the container style. Available variants are <code>soft</code>, <code>outlined</code>, and <code>plain</code>.`,
      preview: variants,
    },
    {
      title: 'Square',
      description: `Set the <code>square</code> prop to render each option as a fixed square, ideal for icon-only toggles such as rich text toolbars.`,
      preview: square,
    },
    {
      title: 'Disabled state',
      description: `Disable the whole control with <code>disabled</code> or individual options by returning <code>true</code> from <code>option-disabled</code>.`,
      preview: disabled,
    },
    {
      title: 'Object options',
      description: `Use <code>label-key</code> to pick the property shown to the user and <code>value-key</code> to define the unique field used for selection when working with object options.`,
      preview: objects,
    },
    {
      title: 'Scoped slots',
      description: `Customize each option via the default slot, which exposes <code>label</code>, <code>selected</code>, and <code>index</code>. Here a text-editing toolbar is built with icon-only options: alignment (single, always selected) and style modifiers (multiple and deselectable).`,
      preview: slots,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
