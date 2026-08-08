import { sizes, tw } from '../utils.ts'

export default tw({
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

  '&-addon': `ui-rounded-md ui-border-primary flex items-center justify-center`,
  '&-addon--sm': sizes('xs', 'gap', 'px'),
  '&-addon--md': sizes('md', 'gap', 'px'),
  '&-addon--lg': sizes('lg', 'gap', 'px'),

  '&-addon--outlined, &--subtle': `ui-rounded-md`,
  '&-addon--outlined': `border`,
  '&-addon--underlined': `border-b`,
  '&-addon--subtle': `border ui-bg-subtle`,

  '&-addon--attach': 'absolute',
  '&--x &-addon--attach': 'inset-y-0',
  '&--y &-addon--attach': ' inset-x-0',
  '&--x &-addon--attach:first-child': 'left-0',
  '&--x &-addon--attach:last-child': 'right-0',
  '&--y &-addon--attach:first-child': 'top-0',
  '&--y &-addon--attach:last-child': 'bottom-0',
})
