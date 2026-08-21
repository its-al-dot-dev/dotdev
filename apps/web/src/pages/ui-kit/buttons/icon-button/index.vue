<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import base from './examples/base.vue'
import colors from './examples/colors.vue'
import disabled from './examples/disabled.vue'
import group from './examples/group.vue'
import link from './examples/link.vue'
import loading from './examples/loading.vue'
import sizes from './examples/sizes.vue'
import variants from './examples/variants.vue'

defineDocPage({
  title: 'IconButton',
  icon: 'component-1',
  description: `A square button for a single <code>icon</code> action. Wraps <code>Button</code> with a fixed square layout, supporting all sizes, colors, and variants, plus loading, disabled, and link modes.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `An <code>IconButton</code> renders a single <code>icon</code> inside a square. It defaults to the <code>ghost</code> variant and <code>neutral</code> color.`,
      preview: base,
    },
    {
      title: 'Variants',
      description: `Use the <code>variant</code> prop to change the visual style. Available variants are <code>solid</code>, <code>outlined</code>, <code>ghost</code>, <code>soft</code>, and <code>text</code>.`,
      preview: variants,
    },
    {
      title: 'Colors and variants',
      description: `Combine the <code>color</code> and <code>variant</code> props in a grid. Available colors are <code>primary</code>, <code>neutral</code>, <code>warning</code>, <code>success</code>, <code>danger</code>, and <code>info</code>.`,
      preview: colors,
    },
    {
      title: 'Sizes',
      description: `Use the <code>size</code> prop to adjust the icon button dimensions. Available sizes are <code>sm</code>, <code>md</code>, and <code>lg</code>.`,
      preview: sizes,
    },
    {
      title: 'Loading state',
      description: `Set the <code>loading</code> prop to display a spinner and prevent further interaction. The button is rendered as disabled while loading.`,
      preview: loading,
    },
    {
      title: 'Disabled state',
      description: `Use the <code>disabled</code> prop to prevent interaction and display the button in a disabled state.`,
      preview: disabled,
    },
    {
      title: 'Link mode',
      description: `Pass an <code>href</code> to render the icon button as an anchor link. Use <code>target</code> to control where the link opens.`,
      preview: link,
    },
    {
      title: 'Icon button group',
      description: `Use <code>Group</code> to combine <code>IconButton</code> with related controls for a compact toolbar.`,
      preview: group,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
