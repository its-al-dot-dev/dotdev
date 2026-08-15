import { defineSheet } from 'dotdev/theme'

export default defineSheet({
  name: 'play',

  semantics: {
    'bg-default': 'bg-surface',
    'border-default': 'border-default',
    'text-default': 'text-foreground',
    'text-secondary': 'text-muted',
    'bg-item-hover': ['neutral-200/60', 'neutral-800/60'],
    'text-danger': ['danger-600', 'danger-400'],
  },

  rules: {
    '&': `play-bg-default border play-border-default rounded-2xl flex flex-col`,
    '&--full': `fixed w-screen h-screen inset-0 z-1000`,
    '&__controls': `flex-1 -m-2`,
    '&__controls-header': `p-0.5 border-b play-border-default`,

    '&-canvas': 'flex flex-1 items-center justify-center flex-wrap gap-4 p-6 min-h-50',

    '&-control-layout__header': `h-11 px-4 py-2 border-b flex justify-between items-center play-border-default`,
    '&-control-layout__title': `flex items-center gap-1.5 font-medium text-base`,
    '&-control-layout__toolbar, &-control-layout__header-left': `flex gap-1`,
    '&-control-layout__body': `h-[400px]`,
    '&-control-layout__body .d-scroll-area__viewport': `flex flex-col`,
    '&-control-layout__empty': `flex-1 flex flex-col items-center justify-center gap-1 p-8 text-center`,
    '&-control-layout__empty-title': `font-medium text-base`,
    '&-control-layout__empty-desc': `text-sm play-text-secondary`,

    '&-emits-log__count': `text-xs`,
    '&-emits-log__search.s-input': `min-w-36 w-36`,
    '&-emits-log__item': `cursor-pointer not-last:border-b select-none play-border-default hover:play-bg-item-hover`,
    '&-emits-log__item-row': `flex items-center justify-between gap-2 px-3 py-2`,
    '&-emits-log__item-main': `flex min-w-0 items-center gap-2`,
    '&-emits-log__chevron': `play-text-secondary`,
    '&-emits-log__badge': `text-blue-400`,
    '&-emits-log__summary': `text-sm truncate play-text-secondary`,
    '&-emits-log__item-actions': `flex shrink-0 items-center gap-2`,
    '&-emits-log__time': `text-xs play-text-secondary`,
    '&-emits-log__payload': `border play-border-default ml-6 mr-3 mb-2.5 px-2 py-1.5 text-sm whitespace-pre-wrap break-words radius-sm`,

    '&-event-item__signature': `text-blue-400`,

    '&-item-layout': `not-last:border-b px-4 pt-2 pb-4 flex flex-col gap-2 play-border-default`,
    '&-item-layout__name': `font-medium text-base`,
    '&-item-layout__name span': `ml-0.5 play-text-danger`,
    '&-item-layout__desc': `text-sm play-text-secondary`,
    '&-item-layout__footer': `flex items-center gap-1.5 flex-wrap`,

    '&-prop-type': `font-mono`,
    '&-prop-type--default': `text-blue-400`,
    '&-prop-type--string': `text-emerald-500`,
    '&-prop-type--number': `text-sky-400`,
    '&-prop-type--boolean': `text-purple-400`,
    '&-prop-type--select': `text-orange-400`,
    '&-prop-type:is(&--json, &--object)': `text-indigo-400`,
    '&-prop-type--unknown': `text-zinc-400`,

    '&-slot-item__scope': `text-blue-400`,
  },
})
