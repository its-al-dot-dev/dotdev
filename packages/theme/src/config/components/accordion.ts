import { defineComponent } from '@dotdev/design'

export const accordion = defineComponent({
  ui: 'accordion',

  semantics: {
    'bg-item-outlined': 'bg-background',
    'bg-item-soft': 'bg-neutral-soft',
    'border-item': 'border-default',

    'text-item': 'text-foreground',
    'text-value': 'text-foreground',
    'text-indicator': 'text-muted',
    'text-indicator-open': 'text-foreground',
    'ring-focus': 'ring-brand',
    gap: '0.5rem',

    'px-item': 'space-lg',
    'py-item': 'space-md',
    'pb-item': 'space-md',
    'gap-item': 'gap-md',
    'text-size-item': 'type-sm',
    'rounded-item': 'radius-md',
  },

  utilities: {
    transition: 'transition-[background-color,color,border-color,opacity]',
    'transition-indicator': 'transition-[transform,rotate,color]',
    'transition-panel': 'transition-[height] duration-200',
  },

  rules: {
    '&': 'flex w-full flex-col accordion-transition',
    '&--outlined': 'accordion-gap',
    '&--soft': 'accordion-gap',
    '&--disabled': 'disabled',

    '&__item': 'flex flex-col rounded-[inherit]',
    '&--outlined &__item': 'accordion-rounded-item border accordion-border-item accordion-bg-item-outlined',
    '&--soft &__item': 'accordion-rounded-item accordion-bg-item-soft',
    '&--underline &__item': 'border-b accordion-border-item last:border-b-0',

    '&__trigger': `rounded-[inherit] flex w-full items-center accordion-gap-item accordion-px-item accordion-py-item accordion-text-size-item accordion-text-item text-left font-medium outline-none cursor-pointer select-none accordion-transition`,
    '&__trigger:focus-visible': 'ring-2 accordion-ring-focus',
    '&__trigger:disabled': 'disabled',

    '&__label': 'truncate',

    '&__indicator': `ml-auto accordion-text-indicator accordion-transition-indicator`,
    '&__trigger--open &__indicator': 'rotate-180 accordion-text-indicator-open',

    '&__panel': 'accordion-transition-panel overflow-hidden',
    '&__value': 'block accordion-px-item accordion-pb-item accordion-text-size-item accordion-text-value',
  },
})
