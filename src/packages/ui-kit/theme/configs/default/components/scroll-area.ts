import { defineSheet } from 'dotdev/theme'

export default defineSheet({
  name: 'scroll-area',

  vars: {
    'scrollbar-y-width': '10px',
    'scrollbar-x-height': '10px',
    'thumb-y-width': '4px',
    'thumb-x-height': '4px',
    'thumb-y-size': '20px',
    'thumb-x-size': '20px',
    'thumb-y-offset': '0px',
    'thumb-x-offset': '0px',
    'thumb-radius': '999px',
  },

  semantics: {
    'bg-thumb': ['neutral-100', 'neutral-800'],
    'bg-thumb-hover': ['neutral-200', 'neutral-700'],
  },

  utilities: {
    transition: 'transition-[opacity,background-color]',
  },

  rules: {
    '&': `relative flex h-full w-full`,
    '&__viewport': `size-full outline-none min-w-0 overflow-auto scrollbar-none`,
    '&__viewport::-webkit-scrollbar': `hidden`,

    '&__scrollbar': `absolute z-10 opacity-0 scroll-area-transition`,
    '&:hover &__scrollbar, &:focus-within &__scrollbar': `opacity-100`,

    '&__scrollbar--y': `top-0 right-0 h-full w-(--scroll-area-scrollbar-y-width)`,
    '&__scrollbar--x': `bottom-0 left-0 w-full h-(--scroll-area-scrollbar-x-height)`,

    '&__thumb': `cursor-grab touch-none select-none scroll-area-bg-thumb rounded-(--scroll-area-thumb-radius)`,
    '&__thumb:active': `cursor-grabbing`,
    '&__scrollbar:hover &__thumb': `scroll-area-bg-thumb-hover`,

    '&__thumb--y': `absolute top-0 left-1/2 -translate-x-1/2 translate-y-(--scroll-area-thumb-y-offset) h-(--scroll-area-thumb-y-size) w-(--scroll-area-thumb-y-width)`,
    '&__thumb--x': `absolute left-0 top-1/2 -translate-y-1/2 translate-x-(--scroll-area-thumb-x-offset) w-(--scroll-area-thumb-x-size) h-(--scroll-area-thumb-x-height)`,
  },
})
