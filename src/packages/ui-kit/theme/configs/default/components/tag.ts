import { tw } from '../utils.ts'

export default tw({
  '&': `inline-flex items-center gap-[0.35em] h-[1.75em] px-[0.5em] rounded-[0.5em] whitespace-nowrap bg-[color-mix(in_oklab,currentColor_10%,transparent)]`,

  '&--border': `border border-[color-mix(in_oklab,currentColor_30%,transparent)]`,
  '&--rounded': `rounded-full`,

  '&__icon': `text-[1em]`,
  '& .d-avatar': `text-[0.7em] size-[calc(2.5em-4px)]`,

  '&:has(> .d-avatar:first-child)': 'ps-0.5',
  '&--border:has(> .d-avatar:first-child)': 'ps-px',

  '&:has(> .d-avatar:last-child)': 'pe-0.5',
  '&--border:has(> .d-avatar:last-child)': 'pe-px',
})
