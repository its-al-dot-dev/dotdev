import { tr, tw } from '../utils.ts'

export default tw({
  '&': `flex h-6 p-0.5 border rounded-full cursor-pointer ${tr('bg', 'border')}`,
  '&__track': 'flex aspect-2/1 rounded-[inherit]',
  '&__thumb': `aspect-square rounded-[inherit] ${tr('bg', 'translate')}`,
  '&--checked &__thumb': 'translate-x-full',

  '&:focus-visible': 'outline-2 button-ring-neutral',
  '&--checked:focus-visible': 'outline-2 button-ring-primary',

  '&--outlined': 'ui-border-primary',
  '&--outlined &__thumb': 'ui-bg-subtle-active',

  '&--outlined.&--checked': 'ui-border-brand',
  '&--outlined.&--checked &__thumb': 'ui-bg-brand',

  '&--subtle': 'ui-bg-subtle-active border-transparent',
  '&--subtle &__thumb': 'bg-white',

  '&--subtle.&--checked': 'ui-bg-brand',

  '&.&--invalid': 'ui-border-danger',
  '&--disabled': 'ui-disabled',
})
