import { defineStyleSheet, sizes, tr } from 'dotdev/theme'

function generateButtons(variant: string) {
  return {
    [`&--${variant}.&--solid`]: `button-bg-${variant}-solid`,
    [`&--${variant}:is(&--outlined, &--ghost)`]: `hover:button-bg-${variant}-soft`,
    [`&--${variant}:is(&--outlined, &--ghost, &--subtle, &--text)`]: `button-text-${variant}`,
    [`&--${variant}.&--subtle`]: `button-bg-${variant}-soft hover:button-bg-${variant}-subtle`,
    [`&--${variant}:focus-visible`]: `outline-2 button-ring-${variant}`,
  }
}

export default defineStyleSheet({
  utilities: {
    'bg-primary-solid': `bg-brand-600 hover:bg-brand-700 border-brand-600`,
    'bg-primary-soft': `bg-brand-50 dark:bg-brand-600/15`,
    'bg-primary-subtle': `bg-brand-100 dark:bg-brand-600/20`,
    'text-primary': `text-brand-600 dark:text-brand-500`,
    'ring-primary': `outline-brand-500/50`,

    'bg-warning-solid': `bg-warning-600 hover:bg-warning-700 border-warning-600`,
    'bg-warning-soft': `bg-warning-50 dark:bg-warning-600/15`,
    'bg-warning-subtle': `bg-warning-100 dark:bg-warning-600/20`,
    'text-warning': `text-warning-600 dark:text-warning-500`,
    'ring-warning': `outline-warning-500/50`,

    'bg-danger-solid': `bg-danger-600 hover:bg-danger-700 border-danger-600`,
    'bg-danger-soft': `bg-danger-50 dark:bg-danger-600/15`,
    'bg-danger-subtle': `bg-danger-100 dark:bg-danger-600/20`,
    'text-danger': `text-danger-600 dark:text-danger-500`,
    'ring-danger': `outline-danger-500/50`,

    'bg-success-solid': `bg-success-600 hover:bg-success-700 border-success-600`,
    'bg-success-soft': `bg-success-50 dark:bg-success-600/15`,
    'bg-success-subtle': `bg-success-100 dark:bg-success-600/20`,
    'text-success': `text-success-600 dark:text-success-500`,
    'ring-success': `outline-success-500/50`,

    'bg-neutral-solid': `bg-primary-800 hover:bg-primary-900 border-primary-800 dark:text-primary-700 dark:bg-primary-100 dark:hover:bg-primary-200 dark:border-primary-100`,
    'bg-neutral-soft': `ui-bg-subtle-hover`,
    'bg-neutral-subtle': `ui-bg-subtle-active`,
    'text-neutral': `text-primary-700 dark:text-primary-100`,
    'ring-neutral': `outline-primary-500/50`,
    'border-neutral': `ui-border-primary`,
  },
  component: {
    '&': `ui-rounded-md inline-flex items-center justify-center font-medium ${tr('bg', 'opacity', 'border', 'color')} cursor-pointer`,
    '&--sm': sizes('sm', 'gap', 'h', 'px', 'text'),
    '&--md': sizes('md', 'gap', 'h', 'px', 'text'),
    '&--lg': sizes('lg', 'gap', 'h', 'px', 'text'),

    '&--solid': 'text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] border',
    '&--outlined': 'border border-current',
    '&:is(&--outlined, &--ghost, &--text)': 'bg-transparent ui-bg-primary',

    '&--disabled': `ui-disabled`,

    ...generateButtons('primary'),
    ...generateButtons('warning'),
    ...generateButtons('danger'),
    ...generateButtons('success'),
    ...generateButtons('neutral'),
    '&--neutral.&--outlined': 'button-border-neutral',

    '&--loading &__icon': `animate-spin`,
    '&__icon': 'text-[1.2em]',
  },
})
