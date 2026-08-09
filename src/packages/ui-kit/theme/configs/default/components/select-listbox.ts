import { disabled, sizes, tw } from '../utils.ts'

export default tw({
  '&': `flex flex-col gap-0.5 transition-opacity overflow-y-auto max-h-[200px]`,
  '&--disabled': disabled,

  '&__item': `flex shrink-0 items-center outline-none select-none cursor-pointer transition-[background-color,color,opacity]`,
  '&__item:is(:hover,&__item--selected,&__item--focused)': `bg-primary-100 dark:bg-primary-800`,
  '&--sm &__item': `${sizes('sm', 'px', 'gap', 'h', 'text')} rounded-[calc(var(--ui-rounded-sm)-2px)]`,
  '&--md &__item': `${sizes('md', 'px', 'gap', 'h', 'text')} rounded-[calc(var(--ui-rounded-md)-2px)]`,
  '&--lg &__item': `${sizes('lg', 'px', 'gap', 'h', 'text')} rounded-[calc(var(--ui-rounded-lg)-2px)]`,
})
