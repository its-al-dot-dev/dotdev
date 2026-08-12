import { defineSheet } from 'dotdev/theme'

export default defineSheet({
  name: 'tag',

  vars: {
    'gap': '0.35em',
    'h': '1.75em',
    'px': '0.5em',
    'rounded': '0.5em',
    'rounded-full': '9999px',
    'bg': 'color-mix(in oklab, currentColor 10%, transparent)',
    'border': 'color-mix(in oklab, currentColor 30%, transparent)',

    'ps-avatar': '0.125rem',
    'ps-avatar-border': '1px',
    'pe-avatar': '0.125rem',
    'pe-avatar-border': '1px',
  },

  utilities: {
    'gap': 'gap-(--tag-gap)',
    'h': 'h-(--tag-h)',
    'px': 'px-(--tag-px)',
    'rounded': 'rounded-(--tag-rounded)',
    'rounded-full': 'rounded-(--tag-rounded-full)',
    'bg': 'bg-(--tag-bg)',
    'border': 'border-(--tag-border)',
    'ps-avatar': 'ps-(--tag-ps-avatar)',
    'ps-avatar-border': 'ps-(--tag-ps-avatar-border)',
    'pe-avatar': 'pe-(--tag-pe-avatar)',
    'pe-avatar-border': 'pe-(--tag-pe-avatar-border)',
  },

  rules: {
    '&': `inline-flex items-center tag-gap tag-h tag-px tag-rounded whitespace-nowrap tag-bg`,

    '&--border': `border tag-border`,
    '&--rounded': `tag-rounded-full`,

    '&__icon': `text-[1em]`,
    '& .d-avatar': `text-[0.7em] size-[calc(2.5em-4px)]`,

    '&:has(> .d-avatar:first-child)': 'tag-ps-avatar',
    '&--border:has(> .d-avatar:first-child)': 'tag-ps-avatar-border',

    '&:has(> .d-avatar:last-child)': 'tag-pe-avatar',
    '&--border:has(> .d-avatar:last-child)': 'tag-pe-avatar-border',
  },
})
