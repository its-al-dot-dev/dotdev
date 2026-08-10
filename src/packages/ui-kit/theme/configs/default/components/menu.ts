import { defineStyleSheet, disabled, sizes } from 'dotdev/theme'

export default defineStyleSheet({
  component: {
    '&': `flex flex-col gap-0.5 text-primary-600 dark:text-primary-300`,
    '&--sm': sizes('sm', 'text'),
    '&--md': sizes('md', 'text'),
    '&--lg': sizes('lg', 'text'),

    '&__heading': `font-medium py-1 transition-[color]`,
    '&--sm &__heading': sizes('sm', 'px'),
    '&--md &__heading': sizes('md', 'px'),
    '&--lg &__heading': sizes('lg', 'px'),

    '&__item': `flex w-full items-center outline-none cursor-pointer transition-[background-color,color,opacity] ${disabled}`,
    '&__item:is(:hover, :focus-visible, &__item--active, &__item.router-link-exact-active)': `text-primary-900 dark:text-primary-100 bg-primary-100 dark:bg-primary-900`,
    '&--sm &__item': sizes('sm', 'px', 'gap', 'h', 'rounded'),
    '&--md &__item': sizes('md', 'px', 'gap', 'h', 'rounded'),
    '&--lg &__item': sizes('lg', 'px', 'gap', 'h', 'rounded'),

    '&__item-icon': `text-[1.2em]`,
  },
})
