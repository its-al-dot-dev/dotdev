import { createCssVarUtilities, defineStyleSheet } from 'dotdev/theme'

export default defineStyleSheet({
  theme: {
    'size-xs': '2rem',
    'size-sm': '2.25rem',
    'size-md': '2.5rem',
    'size-lg': '2.75rem',
    'size-xl': '3rem',

    'space-xs': '0.5rem',
    'space-sm': '0.625rem',
    'space-md': '0.75rem',
    'space-lg': '1rem',
    'space-xl': '1.25rem',

    'gap-xs': '0.25rem',
    'gap-sm': '0.375rem',
    'gap-md': '0.5rem',
    'gap-lg': '0.625rem',
    'gap-xl': '0.75rem',

    'radius-xs': '0.125rem',
    'radius-sm': '0.375rem',
    'radius-md': '0.5rem',
    'radius-lg': '0.75rem',
    'radius-xl': '1rem',

    'font-size-xs': '0.75rem',
    'font-size-sm': '0.875rem',
    'font-size-md': '1rem',
    'font-size-lg': '1.125rem',
    'font-size-xl': '1.25rem',
  },
  utilities: {
    ...createCssVarUtilities({
      rounded: 'radius',
      gap: 'gap',
      pl: 'space',
      px: 'space',
      size: 'size',
      h: 'size',
      w: 'size',
      'min-w': 'size',
      text: (size) => `text-(length:--ui-font-size-${size})`,
    }),

    'bg-primary': 'bg-white dark:bg-primary-950',
    'bg-primary-hover': 'bg-primary-100/80 dark:bg-primary-900/80',
    'bg-primary-active': 'bg-primary-100 dark:bg-primary-900',

    'bg-subtle': 'bg-primary-100 dark:bg-primary-900',
    'bg-subtle-hover': 'bg-primary-200/50 dark:bg-primary-800/50',
    'bg-subtle-active': 'bg-primary-200 dark:bg-primary-800',

    'bg-brand': 'bg-brand-500',

    'text-brand': 'text-brand-500',
    'text-primary': 'text-primary-900 dark:text-primary-300',
    'text-danger': 'text-danger-500',
    'text-warning': 'text-warning-500',
    'text-success': 'text-success-500',
    'text-secondary': 'text-primary-300 dark:text-primary-700',
    'text-tertiary': 'text-primary-400 dark:text-primary-600',
    'text-placeholder': 'text-primary-500',

    'border-brand': 'border-brand-500',
    'border-primary': 'border-primary-200 dark:border-primary-800',
    'border-danger': 'border-danger-400',

    'ring-brand': 'ring-brand-500',

    disabled: 'pointer-events-none opacity-60',
  },
})
