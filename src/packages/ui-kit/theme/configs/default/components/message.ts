import { defineStyleSheet, tr } from 'dotdev/theme'

function generatemsgs(variant: string) {
  return {
    [`&--${variant}.&--solid`]: `bg-msg-${variant}-solid border-msg-${variant}-solid text-msg-${variant}-solid bg-msg-${variant}-solid-hover`,
    [`&--${variant}.&--soft`]: `bg-msg-${variant}-soft border-msg-${variant}-soft text-msg-${variant}-soft`,
    [`&--${variant}.&--subtle`]: `bg-msg-${variant}-subtle text-msg-${variant}-subtle`,
  }
}

export default defineStyleSheet({
  theme: {
    'bg-msg-brand-solid': ['brand-500', 'brand-400/50'],
    'bg-msg-brand-solid-hover': ['brand-600', 'brand-300'],
    'bg-msg-brand-soft': ['brand-50', 'brand-500'],
    'bg-msg-brand-subtle': ['brand-100', 'brand-500'],
    'border-msg-brand-solid': 'brand-500',
    'border-msg-brand-soft': ['brand-200', 'brand-800'],
    'text-msg-brand-solid': 'white',
    'text-msg-brand-soft': ['brand-700', 'brand-100'],
    'text-msg-brand-subtle': ['brand-600', 'brand-100'],

    'bg-msg-warning-solid': ['warning-500', 'warning-400/50'],
    'bg-msg-warning-solid-hover': ['warning-600', 'warning-300'],
    'bg-msg-warning-soft': ['warning-50', 'warning-500'],
    'bg-msg-warning-subtle': ['warning-100', 'warning-500'],
    'border-msg-warning-solid': 'warning-500',
    'border-msg-warning-soft': ['warning-200', 'warning-800'],
    'text-msg-warning-solid': 'white',
    'text-msg-warning-soft': ['warning-700', 'warning-100'],
    'text-msg-warning-subtle': ['warning-600', 'warning-100'],

    'bg-msg-danger-solid': ['danger-500', 'danger-400'],
    'bg-msg-danger-solid-hover': ['danger-600', 'danger-300'],
    'bg-msg-danger-soft': ['danger-50', 'danger-500'],
    'bg-msg-danger-subtle': ['danger-100', 'danger-500'],
    'border-msg-danger-solid': 'danger-500',
    'border-msg-danger-soft': ['danger-200', 'danger-800'],
    'text-msg-danger-solid': 'white',
    'text-msg-danger-soft': ['danger-700', 'danger-100'],
    'text-msg-danger-subtle': ['danger-600', 'danger-100'],
  },
  component: {
    '&': `flex items-start gap-2 border p-3 ${tr('bg', 'color', 'border')}`,
    '&__icon': 'text-[1.2em]',
    '&--warning.&--solid': `bg-msg-warning-solid border-msg-warning-solid text-msg-warning-solid bg-msg-warning-solid-hover`,
    '&--warning.&--soft': `bg-msg-warning-soft border-msg-warning-soft text-msg-warning-soft`,
    '&--warning.&--subtle': `bg-msg-warning-subtle text-msg-warning-subtle`,
    ...generatemsgs('brand'),
    ...generatemsgs('warning'),
    ...generatemsgs('danger'),
  },
})
