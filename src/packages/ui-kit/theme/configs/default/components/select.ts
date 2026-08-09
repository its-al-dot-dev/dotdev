import { disabled, sizes, tw } from '../utils.ts'

export default tw({
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
})
