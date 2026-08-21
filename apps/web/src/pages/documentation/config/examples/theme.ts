import { defineUiKitConfig } from '@dotdev/ui-kit'

export const landing = defineUiKitConfig({
  namespace: 'landing',
  theme: {
    primitives: {
      /* Raw values — the violet ramp replaces indigo */
      'brand-500': 'oklch(60.6% 0.25 292.72)',
      'brand-600': 'oklch(54.1% 0.281 293.01)',

      /* Scales — controls get taller, type gets larger */
      'size-md': '2.75rem',
      'type-md': '1.0625rem',
      'radius-md': '0.625rem',
    },
    semantics: {
      /* Pairs are [light, dark]; $ refs resolve inside the namespace */
      'bg-brand': ['$brand-600', '$brand-500'],
      'border-default': ['$neutral-100', '$brand-500/20'],
    },
  },
})
