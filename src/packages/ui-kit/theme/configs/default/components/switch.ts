import { defineSheet } from 'dotdev/theme'

export default defineSheet({
  name: 'switch',

  semantics: {
    border: 'border-neutral',
    'border-checked': 'border-brand',
    'border-invalid': 'border-danger',
    'bg-soft': 'bg-neutral-soft-hover',
    'bg-outlined': 'bg-background',
    'bg-checked': 'bg-brand',
    'bg-thumb-outlined': 'bg-neutral-soft-hover',
    'bg-thumb-checked': 'bg-brand',
    'bg-thumb-soft': 'color-white',
    'ring-brand': 'ring-brand',

    h: '1.5rem',
    p: '0.125rem',
    rounded: '9999px',
  },

  utilities: {
    transition: 'transition-[background-color,border-color]',
    'transition-thumb': 'transition-[background-color,translate]',
  },

  rules: {
    '&': `flex switch-h switch-p switch-rounded border switch-border outline-none cursor-pointer switch-transition`,
    '&__track': 'flex aspect-2/1 rounded-[inherit]',
    '&__thumb': `aspect-square rounded-[inherit] switch-transition-thumb shadow-xs`,
    '&--checked &__thumb': 'translate-x-full',

    '&:focus-visible': 'ring-2 switch-ring-brand',

    '&--outlined': 'switch-bg-outlined',
    '&--outlined &__thumb': 'switch-bg-thumb-outlined',

    '&--outlined.&--checked': 'switch-border-checked',
    '&--outlined.&--checked &__thumb': 'switch-bg-thumb-checked',

    '&--soft': 'switch-bg-soft border-transparent',
    '&--soft &__thumb': 'switch-bg-thumb-soft',

    '&--soft.&--checked': 'switch-bg-checked',

    '&.&--invalid': 'switch-border-invalid',
    '&--disabled': 'disabled',
  },
})
