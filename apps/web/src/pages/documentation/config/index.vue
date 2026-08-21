<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import provider from './examples/provider.vue'
import providerInherit from './examples/provider-inherit.vue'
import providerScoped from './examples/provider-scoped.vue'
import resolutionTemplate from './examples/resolution-template.vue'

defineDocPage({
  title: 'Config',
  icon: 'gear',
  description: `Global UI kit configuration. Install app-wide defaults once with <code>createUiKit()</code>, register additional namespaces with their own themes, and switch between them per subtree with <code>UiKitProvider</code>.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Install once at the app root',
      description: `Register <code>app.use(createUiKit(config))</code> before mounting and pass your icon set. Every component then resolves missing props and icons from this config.`,
      includes: ['setup'],
    },
    {
      title: 'Register multiple namespaces',
      description: `Pass an array to <code>createUiKit()</code> to register several configs side by side. Each namespace gets its own theme instance and injects its CSS variables under <code>--&lt;namespace&gt;-*</code>, so a marketing section and the workbench can coexist on one page.`,
      includes: ['namespaces'],
    },
    {
      title: 'Override theme tokens',
      description: `A namespace config accepts <code>theme</code> overrides merged on top of the base theme: raw <code>primitives</code> for palettes and scales, and <code>semantics</code> where a value pair is <code>[light, dark]</code> and <code>$name</code> references another token of the same namespace.`,
      includes: ['theme'],
    },
    {
      title: 'Per-component defaults',
      description: `Provide default props for any component key. Each prop that is not passed to an instance falls back to the configured value.`,
      includes: ['components'],
    },
    {
      title: 'Switch theme for a subtree',
      description: `Wrap any part of the tree with <code>UiKitProvider</code> and pass a registered <code>namespace</code>. Components inside resolve their tokens from that theme — different colors, sizes, and radii, with no extra wiring.`,
      preview: provider,
    },
    {
      title: 'Nested providers',
      description: `Providers can be nested: each subtree uses the nearest namespace, and the outer one resumes right after the provider closes.`,
      preview: providerScoped,
    },
    {
      title: 'The provider only re-skins',
      description: `A provider overrides just the namespace — everything else registered in <code>createUiKit()</code> (icons, defaults) keeps working inside its subtree.`,
      preview: providerInherit,
    },
    {
      title: 'Resolution order',
      description: `Props resolve top-down: <code>1)</code> local prop, <code>2)</code> config default from <code>createUiKit()</code>, <code>3)</code> component default. The first layer that provides a value wins.`,
      preview: resolutionTemplate,
      includes: ['resolution-config'],
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
