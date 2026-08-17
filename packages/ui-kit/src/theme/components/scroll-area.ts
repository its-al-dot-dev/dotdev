import { Component } from '@dotdev/theme'

export const scrollArea = new Component({
  ui: 'scroll-area',

  semantics: {
    'w-scrollbar-y': '10px',
    'h-scrollbar-x': '10px',
    'w-thumb-y': '4px',
    'h-thumb-x': '4px',
    'size-thumb-y': '20px',
    'size-thumb-x': '20px',
    'translate-thumb-y': '0px',
    'translate-thumb-x': '0px',
    'rounded-thumb': '999px',
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

    '&__scrollbar--y': `top-0 right-0 h-full scroll-area-w-scrollbar-y`,
    '&__scrollbar--x': `bottom-0 left-0 w-full scroll-area-h-scrollbar-x`,

    '&__thumb': `cursor-grab touch-none select-none scroll-area-bg-thumb rounded-(--d-scroll-area-rounded-thumb)`,
    '&__thumb:active': `cursor-grabbing`,
    '&__scrollbar:hover &__thumb': `scroll-area-bg-thumb-hover`,

    '&__thumb--y': `absolute top-0 left-1/2 -translate-x-1/2 scroll-area-w-thumb-y translate-y-(--d-scroll-area-translate-thumb-y) h-(--d-scroll-area-size-thumb-y)`,
    '&__thumb--x': `absolute left-0 top-1/2 -translate-y-1/2 scroll-area-h-thumb-x translate-x-(--d-scroll-area-translate-thumb-x) w-(--d-scroll-area-size-thumb-x)`,
  },
})
