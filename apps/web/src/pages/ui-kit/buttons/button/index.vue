<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import base from './examples/base.vue'
import sizes from './examples/sizes.vue'
import variants from './examples/variants.vue'
import colors from './examples/colors.vue'
import icon from './examples/icon.vue'
import loading from './examples/loading.vue'
import disabled from './examples/disabled.vue'
import link from './examples/link.vue'
import group from './examples/group.vue'

defineDocPage({
  title: 'Button',
  icon: 'component-1',
  styleScope: 'button',
  description: `A versatile button component supporting multiple sizes, colors, and variants. Can render as a native <code>button</code> or an anchor link, with optional icons, loading and disabled states.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Pass a <code>label</code> or use the default slot to set the button content.`,
      preview: base,
    },
    {
      title: 'Sizes',
      description: `Use the <code>size</code> prop to adjust the button dimensions. Available sizes are <code>sm</code>, <code>md</code>, and <code>lg</code>.`,
      preview: sizes,
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
      title: 'Icons',
      description: `Combine an <code>icon</code> with the button content. Use <code>iconPos</code> to place the icon before (<code>prefix</code>) or after (<code>suffix</code>) the label.`,
      preview: icon,
    },
    {
      title: 'Loading state',
      description: `Set the <code>loading</code> prop to display a spinner and prevent further interaction. The button is rendered as disabled while loading and any <code>icon</code> is replaced by the inline progress indicator.`,
      preview: loading,
    },
    {
      title: 'Disabled state',
      description: `Use the <code>disabled</code> prop to prevent interaction and display the button in a disabled state. This works across all variants.`,
      preview: disabled,
    },
    {
      title: 'Link button',
      description: `Pass an <code>href</code> to render the button as an anchor link. Use <code>target</code> to control where the link opens. A disabled link button drops the <code>href</code> and becomes non-interactive.`,
      preview: link,
    },
    {
      title: 'Button group',
      description: `Use <code>Group</code> to combine <code>Button</code> with related controls such as inputs and icon actions for a compact toolbar.`,
      preview: group,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
