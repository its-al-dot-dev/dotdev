import { defineComponent } from '@dotdev/design'

export const table = defineComponent({
  ui: 'table',

  semantics: {
    'text-default': 'text-foreground',
    'text-muted': 'text-muted',
    'text-caption': 'text-muted',
    'border-cell': 'border-default',
    'bg-row-hover': 'bg-neutral-soft',
    'bg-row-selected': 'bg-brand-soft',
    'bg-sticky': 'bg-background',

    'px-cell': 'space-sm',
    'py-cell': 'space-sm',
    'px-head': 'space-sm',
    'py-head': 'space-sm',
    'top-sticky': '0px',
  },

  utilities: {
    transition: 'transition-[background-color]',
    'transition-row': 'transition-[background-color,color,box-shadow]',
  },

  rules: {
    '&': `table-text-default w-full border-separate border-spacing-0 table-transition rounded-lg overflow-hidden`,
    '&__caption': 'caption-top table-px-head pt-2 pb-4 text-left table-text-caption',
    '&__head': `table-px-head table-py-head text-left align-middle font-semibold tracking-wider whitespace-nowrap table-text-muted border-b table-border-cell`,
    '&__cell': 'table-px-cell table-py-cell text-left align-middle border-b table-border-cell',
    '&__row': 'table-transition-row',
    '&__row:last-child &__cell': 'border-b-0',

    '&--hover &__row:hover': 'table-bg-row-hover',
    '&--striped &__row:nth-child(even)': 'table-bg-row-hover',
    '&--sticky-header &__head': 'sticky table-top-sticky z-1 table-bg-sticky',

    '&--rows &__cell': 'border-b table-border-cell',
    '&--columns &__cell': 'border-r table-border-cell',
    '&--columns &__cell:last-child': 'border-r-0',
    '&--all': 'border table-border-cell',
    '&--all &__cell': 'border-r table-border-cell',
    '&--all &__head': 'border-r table-border-cell',
    '&--outline': 'border table-border-cell',
    '&--outline &__cell': 'border-b-0',
    '&--none &__cell': 'border-0',
    '&--none &__head': 'border-0',

    '&--align-left': 'text-left',
    '&--align-center': 'text-center',
    '&--align-right': 'text-right',
  },
})
