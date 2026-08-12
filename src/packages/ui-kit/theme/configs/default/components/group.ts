import { defineSheet } from 'dotdev/theme'

export default defineSheet({
  name: 'group',
  semantics: {
    'bg-soft': ['neutral-100', 'neutral-800'],
    'bg-outlined': 'bg-background',
  },
  utilities: {
    'size-sm': 'gap-sm px-sm',
    'size-md': 'gap-md px-md',
    'size-lg': 'gap-lg px-lg',
  },
  rules: {
    '&': 'flex relative',
    '& > &': 'flex-1',

    // '& > *:not(&):is(:focus-visible,:focus-within)': 'z-10',

    '&--x > :not(&-addon--attach) + *': 'rounded-s-none',
    '&--x > *:has(+ :not(&-addon--attach))': 'rounded-e-none',

    '&--x > &--y:not(:first-child) > *': 'rounded-s-none',
    '&--x > &--y:not(:last-child) > *': 'rounded-e-none',

    '&--y': 'flex-col',

    '&--y > :not(&-addon--attach) + *': 'rounded-t-none',
    '&--y > *:has(+ :not(&-addon--attach))': 'rounded-b-none',

    '&--y > &--x:not(:first-child) > *': 'rounded-t-none',
    '&--y > &--x:not(:last-child) > *': 'rounded-b-none',

    '&-addon': `radius-md border-default flex items-center justify-center`,
    '&-addon--sm': 'group-size-sm',
    '&-addon--md': 'group-size-md',
    '&-addon--lg': 'group-size-lg',

    '&-addon--outlined, &--soft': `radius-md`,
    '&-addon--outlined': `group-bg-outlined border`,
    '&-addon--underlined': `border-b`,
    '&-addon--soft': `border group-bg-soft`,

    '&-addon--attach': 'absolute',
    '&--x &-addon--attach': 'inset-y-0',
    '&--y &-addon--attach': 'inset-x-0',
    '&--x &-addon--attach:first-child': 'left-0',
    '&--x &-addon--attach:last-child': 'right-0',
    '&--y &-addon--attach:first-child': 'top-0',
    '&--y &-addon--attach:last-child': 'bottom-0',
  },
})
