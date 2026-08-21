<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import align from './examples/align.vue'
import appearance from './examples/appearance.vue'
import basic from './examples/basic.vue'
import borders from './examples/borders.vue'
import captionFooter from './examples/caption-footer.vue'
import colKeySlot from './examples/col-key-slot.vue'
import columnSlot from './examples/column-slot.vue'
import headerSlot from './examples/header-slot.vue'
import loadingColumn from './examples/loading-column.vue'
import stickyHeader from './examples/sticky-header.vue'

defineDocPage({
  title: 'Table',
  icon: 'table',
  styleScope: 'table',
  description: `A data table built from row, header, and cell primitives. Renders native <code>&lt;table&gt;</code> semantics with hairline separators, a row hover state, selected rows, and an optional sticky header for scrollable regions.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Pass an array of <code>data</code> objects and a <code>columns</code> array to define the table structure. Each column needs a <code>key</code> that matches a property in the data, and a <code>header</code> label.`,
      preview: basic,
    },
    {
      title: 'Loading state',
      description: `The <code>loading-column</code> slot wraps every cell and receives the same scope: <code>value</code>, <code>key</code>, <code>data</code>, and <code>index</code>. Use it to display a skeleton or spinner overlay while data is being fetched — it takes priority over all other cell slots.`,
      preview: loadingColumn,
    },
    {
      title: 'Borders',
      description: `Use the <code>border</code> prop to control how cells are separated. Available options are <code>rows</code> (default), <code>columns</code>, <code>all</code>, <code>outline</code>, and <code>none</code>.`,
      preview: borders,
    },
    {
      title: 'Alignment',
      description: `Use the <code>align</code> prop to set the default text alignment for all cells. Available values are <code>left</code> (default), <code>center</code>, and <code>right</code>. Individual columns can override this with their own <code>align</code> property.`,
      preview: align,
    },
    {
      title: 'Appearance',
      description: `Toggle <code>hover</code> and <code>striped</code> to control row styling. Both are enabled by default. Hover highlights the row under the pointer, while striped alternates background shades for easier scanning.`,
      preview: appearance,
    },
    {
      title: 'Sticky header',
      description: `Set <code>sticky-header</code> to pin the header row while scrolling. Useful inside a scrollable container with many rows.`,
      preview: stickyHeader,
    },
    {
      title: 'Column slot',
      description: `The <code>column</code> slot is a fallback that applies to every body cell. It receives <code>value</code> (the cell data), <code>key</code> (the column key), <code>data</code> (the full row object), and <code>index</code> (the row index). Use it when you need a consistent transformation across all columns — for example, rendering all values as uppercase text.`,
      preview: columnSlot,
    },
    {
      title: 'Per-column slots',
      description: `Use <code>col-{key}</code> to override a specific column. The slot receives the same scope as <code>column</code>: <code>value</code>, <code>key</code>, <code>data</code>, and <code>index</code>. Per-column slots take priority over the generic <code>column</code> fallback.`,
      preview: colKeySlot,
    },
    {
      title: 'Header slots',
      description: `The <code>header</code> slot is a fallback for all header cells, receiving <code>key</code> and <code>value</code>. Use <code>header-{key}</code> to override a specific column header. Per-column headers take priority over the generic fallback.`,
      preview: headerSlot,
    },
    {
      title: 'Caption and footer',
      description: `The <code>caption</code> slot renders a <code>&lt;caption&gt;</code> element above the table. The <code>footer</code> slot renders a <code>&lt;tfoot&gt;</code> row that spans all columns. Both are optional.`,
      preview: captionFooter,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
