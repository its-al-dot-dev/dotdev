import { sizes, tr, tw } from '../utils.ts'

const checkIcon =
  "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%223.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M5%2013l4%204L19%207%22%2F%3E%3C%2Fsvg%3E')"

export default tw({
  '&': `appearance-none cursor-pointer ${tr('bg', 'border')}`,

  '&--outlined': `border ui-border-primary ui-bg-primary`,
  '&--subtle': `ui-bg-subtle border border-transparent`,

  '&:checked': `ui-border-brand ui-bg-brand bg-[${checkIcon}] bg-center bg-no-repeat bg-contain`,

  '&:hover': `ui-border-brand`,
  '&:focus-visible': `outline-2 ui-ring-brand`,

  '&--invalid': `ui-border-danger`,

  '&--sm': sizes('sm', 'size', 'rounded'),
  '&--md': sizes('md', 'size', 'rounded'),
  '&--lg': sizes('lg', 'size', 'rounded'),

  '&:disabled': `ui-disabled`,
})
