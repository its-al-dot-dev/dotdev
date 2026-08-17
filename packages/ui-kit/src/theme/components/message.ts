import { Component } from '@dotdev/theme'

const messageColors = ['primary', 'neutral', 'danger', 'warning', 'info', 'success'] as const

const colorBase: Record<(typeof messageColors)[number], string> = {
  primary: 'brand',
  neutral: 'neutral',
  danger: 'danger',
  warning: 'warning',
  info: 'info',
  success: 'success',
}

const messageSemantics = messageColors.flatMap((color) => {
  const base = colorBase[color]
  return [
    [`bg-${color}-soft`, `bg-${base}-soft`],
    [`text-${color}`, `text-${base}`],
    [`border-${color}`, `border-${base}`],
  ]
})

const messageColorRules = messageColors.flatMap((color) => [
  [`&--${color}.&--soft`, `message-bg-${color}-soft message-text-${color}`],
  [`&--${color}.&--plain`, `message-text-${color}`],
  [`&--${color}.&--border`, `message-border-${color}`],
])

export const message = new Component({
  ui: 'message',

  semantics: {
    ...Object.fromEntries(messageSemantics),
  },

  utilities: {
    transition: 'transition-[background-color,color,border-color]',
  },

  rules: {
    '&': `flex items-start gap-2.5 p-3 radius-md message-transition`,

    '&--border': 'border',

    '&__icon': 'shrink-0 text-[1.25em] mt-px',
    '&__content': 'flex min-w-0 flex-col gap-0.5',
    '&__title': 'type-md font-medium leading-snug',
    '&__message': 'type-sm leading-snug text-muted',

    ...Object.fromEntries(messageColorRules),
  },
})
