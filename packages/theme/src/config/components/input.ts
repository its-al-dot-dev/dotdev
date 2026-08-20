import { defineComponent } from '@dotdev/design'

export const input = defineComponent({
  ui: 'input',
  semantics: {
    'bg-soft': 'bg-neutral-soft',
    'bg-outlined': 'bg-background',
    'border-outlined': 'border-neutral',
    'border-focus': 'border-brand',
    'border-invalid': 'border-danger',
    'text-default': 'text-foreground',
    'text-placeholder': 'text-placeholder',

    'px-sm': 'space-sm',
    'px-md': 'space-md',
    'px-lg': 'space-lg',
    'h-sm': 'size-sm',
    'h-md': 'size-md',
    'h-lg': 'size-lg',
    'type-sm': 'type-sm',
    'type-md': 'type-md',
    'type-lg': 'type-md',

    rounded: 'radius-md',
  },
  utilities: {
    'size-sm': 'input-type-sm input-h-sm input-px-sm',
    'size-md': 'input-type-md input-h-md input-px-md',
    'size-lg': 'input-type-lg input-h-lg input-px-lg',
    transition: 'transition-[background-color,opacity,border,color]',
  },
  rules: {
    '&': 'input-text-default input-transition outline-none',
    '&:focus-visible': 'input-border-focus',
    '&::placeholder': 'input-text-placeholder',

    '&--outlined, &--underlined': 'input-border-outlined',
    '&--outlined, &--soft': 'input-rounded',
    '&--outlined': 'input-bg-outlined border',
    '&--underlined': 'border-b',
    '&--soft': 'input-bg-soft border border-transparent',

    '&:disabled': 'disabled',
    '&--invalid': 'input-border-invalid',
    '&--invalid:focus-visible': 'input-border-invalid',

    '&--sm': 'input-size-sm',
    '&--md': 'input-size-md',
    '&--lg': 'input-size-lg',
  },
})
