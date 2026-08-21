import { defineComponent } from '@dotdev/design'

const progressColors = ['primary', 'neutral', 'danger', 'warning', 'info', 'success'] as const

const colorBase: Record<(typeof progressColors)[number], string> = {
  primary: 'brand',
  neutral: 'neutral',
  danger: 'danger',
  warning: 'warning',
  info: 'info',
  success: 'success',
}

const progressSemantics = progressColors.flatMap((color) => [
  [`bg-${color}`, color === 'neutral' ? 'bg-neutral' : `bg-${colorBase[color]}`],
])

const progressColorRules = progressColors.flatMap((color) => [[`&--${color} &__indicator`, `progress-bg-${color}`]])

export const progress = defineComponent({
  ui: 'progress',

  semantics: {
    ...Object.fromEntries(progressSemantics),
  },

  rules: {
    '&': 'relative block h-2 w-full overflow-hidden rounded-full bg-neutral-soft',

    '&__indicator': 'h-full rounded-[inherit] transition-[width] block duration-500',

    '&--indeterminate &__indicator': 'w-1/3 animate-pulse',

    ...Object.fromEntries(progressColorRules),
  },
})
