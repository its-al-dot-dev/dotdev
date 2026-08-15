import { defineSheet } from 'dotdev/theme'

export default defineSheet({
  name: 'table',

  vars: {
    'cell-padding-x': '0.75rem',
    'cell-padding-y': '0.625rem',
    'head-padding-x': '0.75rem',
    'head-padding-y': '0.5rem',
    'sticky-top': '0px',
  },

  rules: {
    '&': `w-full text-sm border-separate border-spacing-0`,

    '&__caption': `caption-top px-4 pt-2 pb-4 text-left text-xs text-muted`,

    '&__head': `px-(--table-head-padding-x) py-(--table-head-padding-y) text-left align-middle font-medium uppercase tracking-wider text-xs text-muted whitespace-nowrap border-b border-default`,
    '&__cell': `px-(--table-cell-padding-x) py-(--table-cell-padding-y) text-left align-middle border-b border-default`,

    '&__row': `transition-[background-color]`,
    '&--hover &__row:hover': `bg-neutral-soft`,
    '&__row--selected': `bg-brand-soft`,

    '&--sticky-header &__head': `sticky top-(--table-sticky-top) z-1 bg-background`,
  },
})
