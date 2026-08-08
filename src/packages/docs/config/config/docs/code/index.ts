import { createExample } from 'dotdev/studio'

export default {
  setup: {
    'create-ui-kit': createExample(
      () => import('./create-ui-kit.vue'),
      () => import('./create-ui-kit.vue?raw')
    ),
  },
  options: {
    namespace: createExample(
      () => import('./namespace.vue'),
      () => import('./namespace.vue?raw')
    ),
    components: createExample(
      () => import('./components.vue'),
      () => import('./components.vue?raw')
    ),
  },
  resolution: {
    priority: createExample(
      () => import('./resolution.vue'),
      () => import('./resolution.vue?raw')
    ),
  },
}
