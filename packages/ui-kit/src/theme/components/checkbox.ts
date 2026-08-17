import { Component } from '@dotdev/theme'

const checkIcon =
  "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%223.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M5%2013l4%204L19%207%22%2F%3E%3C%2Fsvg%3E')"

export const checkbox = new Component({
  ui: 'checkbox',

  semantics: {
    'bg-soft': 'bg-neutral-soft-hover',
    'bg-outlined': 'bg-background',
    'bg-checked': 'bg-brand',
    'border-outlined': 'border-neutral',
    'border-checked': 'border-brand',
    'border-invalid': 'border-danger',
    'ring-brand': 'ring-brand',

    'rounded-sm': '0.25rem',
    'rounded-md': '0.375rem',
    'rounded-lg': '0.5rem',
    'size-sm': '1rem',
    'size-md': '1.25rem',
    'size-lg': '1.5rem',
  },

  utilities: {
    transition: 'transition-[background-color,border-color]',
  },

  rules: {
    '&': `appearance-none cursor-pointer checkbox-transition`,

    '&--outlined': `checkbox-bg-outlined border checkbox-border-outlined`,
    '&--soft': `checkbox-bg-soft border border-transparent`,

    '&:checked': `checkbox-border-checked checkbox-bg-checked bg-[${checkIcon}] bg-center bg-no-repeat bg-contain`,

    '&:hover:not(:disabled)': `checkbox-border-checked`,
    '&:focus-visible': `outline-2 checkbox-ring-brand`,

    '&.&--invalid': `checkbox-border-invalid!`,

    '&--sm': `checkbox-rounded-sm checkbox-size-sm`,
    '&--md': `checkbox-rounded-md checkbox-size-md`,
    '&--lg': `checkbox-rounded-lg checkbox-size-lg`,

    '&:disabled': `disabled`,
  },
})
