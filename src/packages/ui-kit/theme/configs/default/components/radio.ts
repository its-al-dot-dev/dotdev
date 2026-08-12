import { defineSheet } from 'dotdev/theme'

const checkIcon =
  "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22white%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%225%22%2F%3E%3C%2Fsvg%3E')"

export default defineSheet({
  name: 'radio',

  semantics: {
    'border-outlined': 'border-neutral',
    'bg-soft': 'bg-neutral-soft-hover',
    'bg-outlined': 'bg-background',

    'border-checked': 'border-brand',
    'bg-checked': 'bg-brand',
    'ring-brand': 'ring-brand',

    'border-invalid': 'border-danger',
  },

  vars: {
    'box-sm': '1rem',
    'box-md': '1.25rem',
    'box-lg': '1.5rem',
  },

  utilities: {
    'box-sm': 'size-(--radio-box-sm)',
    'box-md': 'size-(--radio-box-md)',
    'box-lg': 'size-(--radio-box-lg)',

    transition: 'transition-[background-color,border-color]',
  },

  rules: {
    '&': `appearance-none cursor-pointer rounded-full radio-transition`,

    '&--outlined': `radio-bg-outlined border radio-border-outlined`,
    '&--soft': `radio-bg-soft border border-transparent`,

    '&:checked': `radio-border-checked radio-bg-checked bg-[${checkIcon}] bg-center bg-no-repeat bg-contain`,

    '&:hover:not(:disabled)': `radio-border-checked`,
    '&:focus-visible': `outline-2 radio-ring-brand`,

    '&.&--invalid': `radio-border-invalid!`,

    '&--sm': `radio-box-sm`,
    '&--md': `radio-box-md`,
    '&--lg': `radio-box-lg`,

    '&:disabled': `disabled`,
  },
})
