import { defineSheet } from 'dotdev/theme'

const dividerColors = ['primary', 'neutral', 'danger', 'warning', 'info', 'success'] as const

const colorBase: Record<(typeof dividerColors)[number], string> = {
  primary: 'brand',
  neutral: 'neutral',
  danger: 'danger',
  warning: 'warning',
  info: 'info',
  success: 'success',
}

const dividerSemantics = dividerColors.flatMap((color) => {
  const base = colorBase[color]
  return [
    [`border-${color}`, color === 'neutral' ? 'border-default' : `border-${base}`],
    [`text-${color}`, color === 'neutral' ? 'text-muted' : `text-${base}`],
  ]
})

const dividerColorRules = dividerColors.flatMap((color) => [
  [`&--${color} &__line`, `divider-border-${color}`],
  [`&--${color} &__label`, `divider-text-${color}`],
])

export default defineSheet({
  name: 'divider',

  semantics: {
    ...Object.fromEntries(dividerSemantics),
  },

  rules: {
    '&': `flex items-center gap-2 w-full text-muted`,

    '&--vertical': 'flex-col h-full w-auto',

    '&__line': 'shrink-0',
    '&__label': 'shrink-0 whitespace-nowrap label-xs font-medium',

    '&--horizontal &__line': 'flex-1 h-0 border-t',
    '&--vertical &__line': 'flex-1 w-0 border-l',

    '&--dashed &__line': 'border-dashed',
    '&--dotted &__line': 'border-dotted',

    ...Object.fromEntries(dividerColorRules),
  },
})
