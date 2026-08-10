import { defineStyleSheet } from 'dotdev/theme'

export default defineStyleSheet({
  component: {
    '&-desc': `whitespace-pre-wrap`,

    '&-card': `layout-surface-panel border rounded-2xl`,
    '&-card__header, &-card__footer': `layout-border-default p-2 flex justify-between`,
    '&-card__header': `border-b`,
    '&-card__footer': `border-t`,

    '&-example': `flex flex-col min-h-60 overflow-hidden`,
    '&-example__actions': `flex gap-1`,
    '&-example__body': `flex flex-1 layout-surface-panel`,
    '&-example__canvas': `flex-1 flex items-center justify-center flex-wrap gap-4 px-6 py-6`,
    '&-example__code': `w-full flex-1`,

    '&-block': `mb-14 mt-4 scroll-mt-24`,
    '&-block__header': `mb-4`,
    '&-block__title': `ui-text-lg font-semibold mb-2`,

    '&-page': `p-4 lg:p-16 flex gap-16 items-start`,
    '&-page__group': `flex justify-between items-center mb-4`,
    // '&-page__body': `w-[calc(100%-256px-64px)]`,
    '&-page__body': `w-full`,
    '&-page__title': `font-bold text-2xl mb-2 flex items-center gap-2`,
    '&-page__desc': `text-lg mb-10 max-w-3xl layout-text-secondary`,
    '&-page__divider': `border-dashed mt-16 mb-14 layout-border-default`,

    '&-section': `scroll-mt-24`,
    '&-section__title': `font-semibold text-xl capitalize`,

    '&-desc code': `text-[0.8em] px-2 py-0.5 border ui-rounded-sm layout-text-secondary bg-[color-mix(in_oklab,currentColor_5%,transparent)] border-[color-mix(in_oklab,currentColor_25%,transparent)]`,

    '&-code': `h-full max-h-125`,
    '&-code__raw': `py-4 pr-4`,
    '&-code .s-scroll-area__thumb--x': `px-3`,
    '&-code .shiki': `flex text-base`,
    '&-code .shiki code': `pr-4`,
    '&-code .shiki span': `text-(--shiki-light) dark:text-(--shiki-dark)`,
  },
})
