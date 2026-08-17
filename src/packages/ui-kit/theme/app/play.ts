import { Component } from 'dotdev/theme'

export const play = new Component({
  ui: 'play',

  semantics: {
    'bg-default': 'bg-surface',
    'border-default': 'border-default',
    'text-default': 'text-foreground',
    'text-secondary': 'text-muted',
    'bg-item-hover': ['neutral-200/60', 'neutral-800/60'],
    'text-danger': ['danger-600', 'danger-400'],
  },

  rules: {
    '.play': `play-bg-default border play-border-default rounded-2xl flex flex-col`,
    '.play--full': `fixed w-screen h-screen inset-0 z-1000`,
    '.play__controls': `flex-1 -m-2`,
    '.play__controls-header': `p-0.5 border-b play-border-default`,

    '.play-canvas': 'flex flex-1 items-center justify-center flex-wrap gap-4 p-6 min-h-50',

    '.play-control-layout__header': `h-11 px-4 py-2 border-b flex justify-between items-center play-border-default`,
    '.play-control-layout__title': `flex items-center gap-1.5 font-medium text-base`,
    '.play-control-layout__toolbar, .play-control-layout__header-left': `flex gap-1`,
    '.play-control-layout__body': `h-[400px]`,
    '.play-control-layout__body .d-scroll-area__viewport': `flex flex-col`,
    '.play-control-layout__empty': `flex-1 flex flex-col items-center justify-center gap-1 p-8 text-center`,
    '.play-control-layout__empty-title': `font-medium text-base`,
    '.play-control-layout__empty-desc': `text-sm play-text-secondary`,

    '.play-emits-log__count': `text-xs`,
    '.play-emits-log__search.s-input': `min-w-36 w-36`,
    '.play-emits-log__item': `cursor-pointer not-last:border-b select-none play-border-default hover:play-bg-item-hover`,
    '.play-emits-log__item-row': `flex items-center justify-between gap-2 px-3 py-2`,
    '.play-emits-log__item-main': `flex min-w-0 items-center gap-2`,
    '.play-emits-log__chevron': `play-text-secondary`,
    '.play-emits-log__badge': `text-blue-400`,
    '.play-emits-log__summary': `text-sm truncate play-text-secondary`,
    '.play-emits-log__item-actions': `flex shrink-0 items-center gap-2`,
    '.play-emits-log__time': `text-xs play-text-secondary`,
    '.play-emits-log__payload': `border play-border-default ml-6 mr-3 mb-2.5 px-2 py-1.5 text-sm whitespace-pre-wrap break-words radius-sm`,

    '.play-event-item__signature': `text-blue-400`,

    '.play-item-layout': `not-last:border-b px-4 pt-2 pb-4 flex flex-col gap-2 play-border-default`,
    '.play-item-layout__name': `font-medium text-base`,
    '.play-item-layout__name span': `ml-0.5 play-text-danger`,
    '.play-item-layout__desc': `text-sm play-text-secondary`,
    '.play-item-layout__footer': `flex items-center gap-1.5 flex-wrap`,

    '.play-prop-type': `font-mono`,
    '.play-prop-type--default': `text-blue-400`,
    '.play-prop-type--string': `text-emerald-500`,
    '.play-prop-type--number': `text-sky-400`,
    '.play-prop-type--boolean': `text-purple-400`,
    '.play-prop-type--select': `text-orange-400`,
    '.play-prop-type:is(.play-prop-type--json, .play-prop-type--object)': `text-indigo-400`,
    '.play-prop-type--unknown': `text-zinc-400`,

    '.play-slot-item__scope': `text-blue-400`,
  },
})
