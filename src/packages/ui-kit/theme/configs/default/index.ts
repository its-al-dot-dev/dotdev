import { type UiKitThemeConfig } from '../../utils/uiKitTheme.ts'
import listbox from './components/listbox.ts'
import button from './components/button.ts'
import { sizes, tw } from './utils.ts'
import ui from './components/ui.ts'
import tag from './components/tag.ts'
import input from './components/input.ts'
import textarea from './components/textarea.ts'
import group from './components/group.ts'
import selectButton from './components/select-button.ts'
import switchInput from './components/switch.ts'
import avatar from './components/avatar.ts'
import checkbox from './components/checkbox.ts'
import radio from './components/radio.ts'

const disabled = 'disabled:pointer-events-none disabled:opacity-50'

const index: UiKitThemeConfig = {
  namespace: 'd',
  theme: 'default',
  app: tw({
    layout: {
      '--header-height': '56px',
      '--sidebar-width': '240px',
      '@transition-theme': `transition-colors`,
      '@text-default': `ui-text-primary`,
      '@text-secondary': `text-primary-500 dark:text-primary-400`,
      '@border-default': `border-primary-200 dark:border-primary-800 transition-[border-color]`,

      '@surface-base': `bg-primary-50 dark:bg-primary-950`,
      '@surface-panel': `bg-white dark:bg-primary-950 layout-border-default`,

      '@header-height': `h-(--layout-header-height)`,
      '@sidebar-width': `w-(--layout-sidebar-width)`,

      '&': `flex min-h-svh layout-surface-base layout-text-default`,
      '&__body': `flex-1 min-w-0`,

      '&__header': `layout-header-height sticky top-0 z-100 flex items-center justify-between px-4 border-b`,
      '&__header-group': `flex items-center gap-2`,

      '&__header, &__sidebar': `layout-surface-panel`,

      '&__sidebar': `sticky top-0 flex flex-col h-svh layout-sidebar-width overflow-hidden border-r`,
      '&__sidebar-header': `layout-header-height flex items-center shrink-0 px-4 border-b layout-surface-panel`,
      '&__sidebar-body': `flex-1 overflow-y-auto px-2 py-4`,
      '&__sidebar-body .d-menu__heading': ``,
      '&__sidebar-body .d-menu__heading.level-0': `not-first:mt-4 uppercase text-sm layout-text-secondary`,
    },
    doc: {
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

      '&-page': `p-16 flex gap-16 items-start`,
      '&-page__group': `flex justify-between items-center mb-4`,
      '&-page__body': `w-[calc(100%-256px-64px)]`,
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
    play: {
      '&': `layout-surface-panel border rounded-2xl flex flex-col`,
      '&--full': `fixed w-screen h-screen inset-0 z-1000`,
      '&__controls': `flex-1 -m-2`,
      '&__controls-header': `p-0.5 border-b layout-border-default`,

      '&-canvas': 'flex flex-1 items-center justify-center flex-wrap gap-4 p-6 min-h-50',

      '&-control-layout__header': `h-11 px-4 py-2 border-b flex justify-between items-center layout-border-default`,
      '&-control-layout__title': `flex items-center gap-1.5 font-medium text-base`,
      '&-control-layout__toolbar, &-control-layout__header-left': `flex gap-1`,
      '&-control-layout__body': `h-[400px]`,
      '&-control-layout__body .s-scroll-area__viewport': `flex flex-col`,
      '&-control-layout__body .s-scroll-area__thumb--y': `pb-3`,
      '&-control-layout__empty': `flex-1 flex flex-col items-center justify-center gap-1 p-8 text-center`,
      '&-control-layout__empty-title': `font-medium text-base`,
      '&-control-layout__empty-desc': `text-sm layout-text-default`,

      '&-emits-log__count': `text-xs`,
      '&-emits-log__search.s-input': `min-w-36 w-36`,
      '&-emits-log__item': `cursor-pointer not-last:border-b select-none layout-border-default hover:layout-surface-base`,
      '&-emits-log__item-row': `flex items-center justify-between gap-2 px-3 py-2`,
      '&-emits-log__item-main': `flex min-w-0 items-center gap-2`,
      '&-emits-log__chevron': `layout-text-secondary`,
      '&-emits-log__badge': `text-blue-400`,
      '&-emits-log__summary': `text-sm truncate layout-text-secondary`,
      '&-emits-log__item-actions': `flex shrink-0 items-center gap-2`,
      '&-emits-log__time': `text-xs layout-text-secondary`,
      '&-emits-log__payload': `border ml-6 mr-3 mb-2.5 px-2 py-1.5 text-sm whitespace-pre-wrap break-words layout-border-default ui-rounded-sm`,

      '&-event-item__signature': `text-blue-400`,

      '&-item-layout': `not-last:border-b px-4 pt-2 pb-4 flex flex-col gap-2 layout-border-default`,
      '&-item-layout__name': `font-medium text-base`,
      '&-item-layout__name span': `ml-0.5 text-danger-600 dark:text-danger-400`,
      '&-item-layout__desc': `text-sm layout-text-secondary`,
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
  }),
  components: tw({
    ui,
    listbox,
    button,
    tag,
    input,
    textarea,
    group,
    avatar,
    switch: switchInput,
    checkbox,
    radio,
    'icon-button': {
      '&': `aspect-square px-0!`,
    },
    icon: {
      '&': `size-[1em]`,
      '& svg': `size-[1em]`,
    },
    'select-button': selectButton,
    menu: {
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
    select: {
      '&': `inline-flex justify-start cursor-pointer transition-[background-color,border-color,opacity,color] min-w-50 ${disabled}`,
      '&--sm': sizes('sm', 'pl', 'text', 'h', 'rounded'),
      '&--md': sizes('md', 'pl', 'text', 'h', 'rounded'),
      '&--lg': sizes('lg', 'pl', 'text', 'h', 'rounded'),
      '&--subtle': `bg-primary-100 dark:bg-primary-800 border border-transparent`,
      '&--outlined': `bg-transparent border border-primary-300 dark:border-primary-700`,
      '&--underlined': `bg-transparent border-b rounded-none border-primary-200 dark:border-primary-700`,
      '&:is(:hover,&--focused)': `border-primary-400 dark:border-primary-600`,
      '&--invalid': `border-danger-500/50!`,
      '&--invalid.&--subtle': `border`,
      '&__label': `select-none outline-none flex flex-1 items-center truncate`,
      '&__label--placeholder': `text-primary-400 dark:text-primary-500`,
      '&__dropdown': `flex items-center justify-center aspect-square`,
      '&__listbox-wrapper': `bg-white p-0.5 shadow-md border border-primary-100`,
      '&__listbox-wrapper--sm': sizes('sm', 'rounded'),
      '&__listbox-wrapper--md': sizes('md', 'rounded'),
      '&__listbox-wrapper--lg': sizes('lg', 'rounded'),
    },
    'select-listbox': {
      '&': `flex flex-col gap-0.5 transition-opacity overflow-y-auto max-h-[200px]`,
      '&--disabled': disabled,

      '&__item': `flex shrink-0 items-center outline-none select-none cursor-pointer transition-[background-color,color,opacity]`,
      '&__item:is(:hover,&__item--selected,&__item--focused)': `bg-primary-100 dark:bg-primary-800`,
      '&--sm &__item': `${sizes('sm', 'px', 'gap', 'h', 'text')} rounded-[calc(var(--ui-rounded-sm)-2px)]`,
      '&--md &__item': `${sizes('md', 'px', 'gap', 'h', 'text')} rounded-[calc(var(--ui-rounded-md)-2px)]`,
      '&--lg &__item': `${sizes('lg', 'px', 'gap', 'h', 'text')} rounded-[calc(var(--ui-rounded-lg)-2px)]`,
    },
  }),
}

export default index
