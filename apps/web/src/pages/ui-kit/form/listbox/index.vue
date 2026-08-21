<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import base from './examples/base.vue'
import checkmark from './examples/checkmark.vue'
import deselectable from './examples/deselectable.vue'
import disabledOption from './examples/disabled-option.vue'
import filter from './examples/filter.vue'
import grid from './examples/grid.vue'
import invalid from './examples/invalid.vue'
import multiple from './examples/multiple.vue'
import object from './examples/object.vue'
import sizes from './examples/sizes.vue'
import variants from './examples/variants.vue'

defineDocPage({
  title: 'ListBox',
  icon: 'component-1',
  description: `An accessible list of selectable options rendered as a native listbox. Supports single and multiple selection, custom value/label keys, deselection, and per-option disabling via a controlled <code>v-model</code>.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Use <code>v-model</code> to control the selected value and provide available options through the <code>options</code> prop.`,
      preview: base,
    },
    {
      title: 'Filtering options',
      description: `Combine the <code>filter</code> prop with an external input to create custom option filtering. The <code>ListBox</code> updates visible options while keeping keyboard navigation synchronized.`,
      preview: filter,
    },
    {
      title: 'Grid selection',
      description: `Use the <code>columns</code> prop to display options in a grid layout. Combine it with <code>multiple</code> to allow selecting multiple values from a compact collection of options.`,
      preview: grid,
    },
    {
      title: 'Checkmark position',
      description: `The <code>checkmark</code> prop controls the selection indicator. By default, the checkmark is displayed on the <code>right</code> side. Use <code>left</code> to move it or set it to <code>false</code> to hide the indicator.`,
      preview: checkmark,
    },
    {
      title: 'Sizes',
      description: `Adjust the component size using the <code>size</code> prop. Available sizes are <code>sm</code>, <code>md</code>, and <code>lg</code>.`,
      preview: sizes,
    },
    {
      title: 'Multiple selection',
      description: `Use the <code>multiple</code> prop to allow selecting multiple options. The <code>v-model</code> value should be an array containing all selected options.`,
      preview: multiple,
    },
    {
      title: 'Deselectable selection',
      description: `Use the <code>deselectable</code> prop to allow removing the current selection. This works with both single and multiple selection modes.`,
      preview: deselectable,
    },
    {
      title: 'Variants',
      description: `Use the <code>variant</code> prop to control the visual style of the list. The <code>soft</code> variant adds a soft background, while <code>plain</code> removes the default container styling for custom layouts.`,
      preview: variants,
    },
    {
      title: 'Disabled state',
      description: `Use the <code>disabled</code> prop to disable the entire component or <code>option-disabled</code> to disable specific options. Disabled options remain visible but cannot be selected.`,
      preview: disabledOption,
    },
    {
      title: 'Invalid state',
      description: `Apply the <code>invalid</code> prop to visually indicate a validation error state.`,
      preview: invalid,
    },
    {
      title: 'Object options',
      description: `Use <code>label-key</code> to specify the property displayed to the user and <code>value-key</code> to define the unique value used for selection when working with object options.`,
      preview: object,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
