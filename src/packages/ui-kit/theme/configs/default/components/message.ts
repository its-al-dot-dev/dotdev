import { defineSheet } from 'dotdev/theme'

function generateMessages(variant: string) {
  return {
    [`&--${variant}.&--solid`]: `message-bg-${variant}-solid message-border-${variant}-solid message-text-${variant}-solid message-bg-${variant}-solid-hover`,
    [`&--${variant}.&--soft`]: `message-bg-${variant}-soft message-border-${variant}-soft message-text-${variant}-soft`,
  }
}

export default defineSheet({
  name: 'message',

  semantics: {
    'bg-brand-solid': ['brand-500', 'brand-400/50'],
    'bg-brand-solid-hover': ['brand-600', 'brand-300'],
    'bg-brand-soft': ['brand-50', 'brand-500'],
    'border-brand-solid': 'brand-500',
    'border-brand-soft': ['brand-200', 'brand-800'],
    'text-brand-solid': 'white',
    'text-brand-soft': ['brand-700', 'brand-100'],

    'bg-warning-solid': ['warning-500', 'warning-400/50'],
    'bg-warning-solid-hover': ['warning-600', 'warning-300'],
    'bg-warning-soft': ['warning-50', 'warning-500'],
    'border-warning-solid': 'warning-500',
    'border-warning-soft': ['warning-200', 'warning-800'],
    'text-warning-solid': 'white',
    'text-warning-soft': ['warning-700', 'warning-100'],

    'bg-danger-solid': ['danger-500', 'danger-400'],
    'bg-danger-solid-hover': ['danger-600', 'danger-300'],
    'bg-danger-soft': ['danger-50', 'danger-500'],
    'border-danger-solid': 'danger-500',
    'border-danger-soft': ['danger-200', 'danger-800'],
    'text-danger-solid': 'white',
    'text-danger-soft': ['danger-700', 'danger-100'],
  },

  utilities: {
    transition: 'transition-[background-color,color,border-color]',
  },

  rules: {
    '&': `flex items-start gap-2 border p-3 message-transition`,
    '&__icon': 'text-[1.2em]',
    ...generateMessages('brand'),
    ...generateMessages('warning'),
    ...generateMessages('danger'),
  },
})
