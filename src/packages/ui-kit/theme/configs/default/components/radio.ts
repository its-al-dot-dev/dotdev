import { tr, tw } from '../utils.ts'

const checkIcon =
  "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22white%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%225%22%2F%3E%3C%2Fsvg%3E')"

export default tw({
  '&': `appearance-none cursor-pointer rounded-full ${tr('bg', 'border')}`,

  '&--outlined': `border ui-border-primary ui-bg-primary`,
  '&--subtle': `ui-bg-subtle border border-transparent`,

  '&:checked': `ui-border-brand ui-bg-brand bg-[${checkIcon}] bg-center bg-no-repeat bg-contain`,

  '&:hover:not(:disabled)': `ui-border-brand`,
  '&:focus-visible': `outline-2 ui-ring-brand`,

  '&.&--invalid': `ui-border-danger!`,

  '&--sm': `size-4`,
  '&--md': `size-5`,
  '&--lg': `size-6`,

  '&:disabled': `ui-disabled`,
})
