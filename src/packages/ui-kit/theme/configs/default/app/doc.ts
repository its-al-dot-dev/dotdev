import { defineSheet } from 'dotdev/theme'

export default defineSheet({
  name: 'doc',
  vars: {
    'grid-color': 'neutral-500/30',
    'brand-gradient': 'bg-brand-soft',
    'secondary-gradient': 'bg-surface',
  },
  semantics: {
    'bg-tint': ['brand-500/5', 'brand-400/10'],
  },
  utilities: {
    card: `bg-surface border border-default rounded-2xl transition-[background-color,border-color]`,
    'bg-grid': 'bg-[radial-gradient(var(--doc-grid-color)_1px,transparent_1px)] bg-size-[20px_20px]',
    'bg-gradient': 'bg-[linear-gradient(135deg,var(--doc-brand-gradient),var(--doc-secondary-gradient)_70%)]',
    'code-text': 'text-[0.9em]',
  },
  rules: {
    '&-page': `py-10 px-8 flex gap-10 items-start`,
    '&-page__body': `w-full`,
    '&-page__header': `doc-card p-8 mb-10 doc-bg-gradient`,
    '&-page__group': `flex justify-between items-center mb-4`,
    '&-page__title': `font-bold text-2xl mb-2 flex items-center gap-2`,
    '&-page__desc': `max-w-3xl text-muted`,
    '&-page__divider': `border-dashed mt-10 mb-10 border-default`,

    '&-section': `scroll-mt-24`,
    '&-section__title': `font-semibold text-xl capitalize`,

    '&-block': `mb-10 mt-4 scroll-mt-24`,
    '&-block__header': `mb-4`,
    '&-block__title': `text-lg font-semibold mb-2`,
    '&-block__desc': `text-muted`,

    '&-desc': `whitespace-pre-wrap`,
    '&-desc code': `doc-code-text doc-bg-tint px-2 py-0.5 rounded-sm text-foreground`,

    '&-card': `doc-card`,
    '&-card__header, &-card__footer': `border-default p-2 flex justify-between transition-[border-color]`,
    '&-card__footer': `border-t`,

    '&-example': `flex flex-col min-h-60 overflow-hidden`,
    '&-example__actions': `flex gap-1`,
    '&-example__body': `flex flex-1 bg-background transition-[background-color,border-color] mx-2 mb-2 border-default border rounded-lg overflow-hidden`,
    '&-example__canvas': `flex-1 flex items-center justify-center flex-wrap gap-4 px-6 py-6 doc-bg-grid`,
    '&-example__code': `w-full flex-1`,

    '&-code': `h-full max-h-125`,
    '&-code__raw': `py-4 pr-4`,
    // TODO .s
    '&-code .s-scroll-area__thumb--x': `px-3`,
    '&-code .shiki': `flex text-base`,
    '&-code .shiki code': `pr-4`,
    '&-code .shiki span': `text-(--shiki-light) dark:text-(--shiki-dark)`,
  },
})
