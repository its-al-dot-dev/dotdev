import { Component } from 'dotdev/theme'

const tagColors = ['primary', 'neutral', 'danger', 'warning', 'info', 'success'] as const

const tagColorBase: Record<(typeof tagColors)[number], string> = {
  primary: 'brand',
  neutral: 'neutral',
  danger: 'danger',
  warning: 'warning',
  info: 'info',
  success: 'success',
}

const tagSemantics = tagColors.flatMap((color) => {
  const base = tagColorBase[color]
  return [
    [`bg-${color}-soft`, `bg-${base}-soft`],
    [`text-${color}-soft`, `text-${base}`],
    [`bg-${color}-solid`, `bg-${base}`],
    [`text-${color}-solid`, `text-on-${base}`],
  ]
})

const tagColorRules = tagColors.flatMap((color) => [
  [`&--${color}.&--soft`, `tag-bg-${color}-soft tag-text-${color}-soft`],
  [`&--${color}.&--solid`, `tag-bg-${color}-solid tag-text-${color}-solid`],
])

export const tag = new Component({
  ui: 'tag',

  semantics: {
    gap: '0.35em',
    h: '1.75em',
    px: '0.5em',
    rounded: '0.5em',
    border: 'color-mix(in oklab, currentColor 30%, transparent)',
    'ps-avatar': '0.125rem',
    'ps-avatar-border': '1px',
    'pe-avatar': '0.125rem',
    'pe-avatar-border': '1px',
    ...Object.fromEntries(tagSemantics),
  },

  rules: {
    '&': `inline-flex items-center tag-gap tag-h tag-px tag-rounded whitespace-nowrap`,

    '&--solid': `shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]`,

    '&--border': `border tag-border`,
    '&--rounded': `rounded-full`,

    ...Object.fromEntries(tagColorRules),

    '&__label': `text-[0.875em]`,
    '&__icon': `text-[1em]`,
    '& .d-avatar': `text-[0.7em] size-[calc(2.5em-4px)]`,

    '&:has(> .d-avatar:first-child)': 'tag-ps-avatar',
    '&--border:has(> .d-avatar:first-child)': 'tag-ps-avatar-border',

    '&:has(> .d-avatar:last-child)': 'tag-pe-avatar',
    '&--border:has(> .d-avatar:last-child)': 'tag-pe-avatar-border',
  },
})
