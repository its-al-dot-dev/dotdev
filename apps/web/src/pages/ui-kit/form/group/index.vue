<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import addon from './examples/addon.vue'
import addonSizes from './examples/addon-sizes.vue'
import addonVariants from './examples/addon-variants.vue'
import axis from './examples/axis.vue'
import base from './examples/base.vue'
import combined from './examples/combined.vue'

defineDocPage({
  title: 'Group',
  icon: 'component-1',
  description: `A flexible container for grouping related form controls. Supports horizontal (x) and vertical (y) layouts with optional attached addons for prefixes, suffixes, or actions.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Wrap related controls in a <code>Group</code>. By default it arranges children horizontally.`,
      preview: base,
    },
    {
      title: 'Axis direction',
      description: `Use the <code>axis</code> prop to change layout direction. <code>x</code> (default) is horizontal, <code>y</code> is vertical.`,
      preview: axis,
    },
    {
      title: 'GroupAddon',
      description: `Use <code>GroupAddon</code> to attach labels, icons, or actions to a group. Set <code>attach</code> to merge the addon border with the group.`,
      preview: addon,
    },
    {
      title: 'Addon variants',
      description: `GroupAddon supports the same semantic variants as form controls: <code>outlined</code>, <code>soft</code>, <code>underlined</code>, <code>plain</code>.`,
      preview: addonVariants,
    },
    {
      title: 'Addon sizes',
      description: `GroupAddon supports three sizes: <code>sm</code>, <code>md</code> (default), <code>lg</code>. Use <code>size="none"</code> to remove sizing constraints.`,
      preview: addonSizes,
    },
    {
      title: 'Combined usage',
      description: `Combine multiple addons with different configurations. Use slots for custom content like icons or actions.`,
      preview: combined,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
