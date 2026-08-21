<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import provider from './examples/provider.vue'
import providerInherit from './examples/provider-inherit.vue'
import providerNamespace from './examples/provider-namespace.vue'
import providerScoped from './examples/provider-scoped.vue'
import resolution from './examples/resolution.vue'

defineDocPage({
  title: 'Config',
  icon: 'gear',
  description: `Global UI kit configuration. Install app-wide defaults once with <code>createUiKit()</code> and override the BEM namespace for a subtree with <code>UiKitProvider</code>.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Install once at the app root',
      description: `Register <code>app.use(createUiKit(config))</code> before mounting. Every component then resolves its missing props from this config.`,
      includes: ['setup'],
    },
    {
      title: 'Set a BEM namespace',
      description: `The <code>namespace</code> option changes the BEM prefix for every component. The default is <code>d</code>.`,
      includes: ['namespace'],
    },
    {
      title: 'Per-component defaults',
      description: `Provide default props for any component key. Each prop that is not passed to an instance falls back to the configured value.`,
      includes: ['components'],
    },
    {
      title: 'Override namespace for a subtree',
      description: `Wrap any part of the tree with <code>UiKitProvider</code> and pass <code>namespace</code> to use a different BEM prefix for that subtree.`,
      preview: provider,
    },
    {
      title: 'namespace prop',
      description: `Pass <code>namespace</code> directly to change the BEM prefix for the subtree, without spreading a full config.`,
      preview: providerNamespace,
    },
    {
      title: 'Nested namespaces',
      description: `A nested <code>UiKitProvider</code> can set a different <code>namespace</code> for its subtree. The outer namespace remains active outside the provider.`,
      preview: providerScoped,
    },
    {
      title: 'Provider only changes namespace',
      description: `The provider only overrides the BEM namespace — all other config from <code>createUiKit()</code> in <code>main.ts</code> (icons, defaults) still applies inside its subtree.`,
      preview: providerInherit,
    },
    {
      title: 'Resolution order',
      description: `Props resolve in this order: <code>1)</code> local prop, <code>2)</code> config default (from <code>createUiKit</code>), <code>3)</code> component default. <code>UiKitProvider</code> only overrides the namespace for its subtree.`,
      preview: resolution,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
