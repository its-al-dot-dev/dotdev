import { defineComponent } from '@dotdev/design'

export const skeleton = defineComponent({
  ui: 'skeleton',

  semantics: {
    bg: ['neutral-200', 'neutral-700'],
  },

  rules: {
    '&': 'block h-4 w-full skeleton-bg',

    '&--pulse': 'animate-pulse',
    '&--rounded': 'rounded-full',
  },
})
