import { defineSheet } from 'dotdev/theme'

export default defineSheet({
  name: 'avatar',

  vars: {
    'size': '2.5em',
    'rounded': '9999px',
    'bg': 'color-mix(in oklab, currentColor 10%, transparent)',
    'border': 'color-mix(in oklab, currentColor 50%, transparent)',
  },

  utilities: {
    'size': 'size-(--avatar-size)',
    'rounded': 'rounded-(--avatar-rounded)',
    'bg': 'bg-(--avatar-bg)',
    'border': 'border-(--avatar-border)',
  },

  rules: {
    '&': `avatar-size box-border flex items-center justify-center relative avatar-rounded avatar-bg avatar-border`,
    '&--border': `border`,
    '&__image': `rounded-[inherit]`,
  },
})
