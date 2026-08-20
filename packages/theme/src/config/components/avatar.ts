import { defineComponent } from '@dotdev/design'

const avatarColors = ['primary', 'neutral', 'danger', 'warning', 'info', 'success'] as const

const avatarColorBase: Record<(typeof avatarColors)[number], string> = {
  primary: 'brand',
  neutral: 'neutral',
  danger: 'danger',
  warning: 'warning',
  info: 'info',
  success: 'success',
}

const avatarSemantics = avatarColors.flatMap((color) => {
  const base = avatarColorBase[color]
  return [
    [`bg-${color}-soft`, `bg-${base}-soft`],
    [`text-${color}-soft`, `text-${base}`],
    [`bg-${color}-solid`, `bg-${base}`],
    [`text-${color}-solid`, `text-on-${base}`],
  ]
})

const avatarColorRules = avatarColors.flatMap((color) => [
  [`&--${color}.&--soft`, `avatar-bg-${color}-soft avatar-text-${color}-soft`],
  [`&--${color}.&--solid`, `avatar-bg-${color}-solid avatar-text-${color}-solid`],
])

export const avatar = defineComponent({
  ui: 'avatar',

  semantics: {
    size: '2.5em',
    'rounded-square': 'radius-md',
    border: 'color-mix(in oklab, currentColor 50%, transparent)',
    ...Object.fromEntries(avatarSemantics),
  },

  rules: {
    '&': `avatar-size box-border flex items-center justify-center relative rounded-full avatar-border`,

    '&--solid': `shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]`,

    '&--border': `border`,
    '&--square': `avatar-rounded-square`,

    ...Object.fromEntries(avatarColorRules),

    '&__image': `rounded-[inherit]`,
  },
})
