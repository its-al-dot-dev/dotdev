<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import basic from './examples/basic.vue'
import icons from './examples/icons.vue'
import links from './examples/links.vue'
import scaling from './examples/scaling.vue'
import separator from './examples/separator.vue'
import slots from './examples/slots.vue'

defineDocPage({
  title: 'Breadcrumbs',
  icon: 'component-1',
  description: `A navigation trail that shows the current page location. Renders each item as a link or a plain segment, with a text or icon <code>separator</code>, per-item icons and scoped slots. Scales with the parent font size.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Pass an <code>items</code> array of <code>{ label }</code> entries. The last item is rendered as the current page segment.`,
      preview: basic,
    },
    {
      title: 'Links',
      description: `Add <code>href</code> to render an item as a link. The trailing item without a link is marked with <code>aria-current="page"</code>.`,
      preview: links,
    },
    {
      title: 'Scaling',
      description: `Breadcrumbs inherit the font size of their parent — text, gap and separator all scale together. Set <code>font-size</code> on the wrapping element; by default the trail matches the app's base text size.`,
      preview: scaling,
    },
    {
      title: 'Separator',
      description: `The default separator is a <code>/</code> character. Pass <code>separatorIcon</code> to use an icon, or override the <code>separator</code> slot entirely.`,
      preview: separator,
    },
    {
      title: 'Icons',
      description: `Each item accepts an <code>icon</code> rendered before the label.`,
      preview: icons,
    },
    {
      title: 'Custom content',
      description: `The default slot is scoped with <code>{ item, index }</code> and replaces the label for every segment.`,
      preview: slots,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
