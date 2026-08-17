import type { Directive } from 'vue'

interface HTMLElementWithClickOutside extends HTMLElement {
  __clickOutside__?: (event: Event) => void
}

type ClickOutsideHandler = (event: Event) => void
type ClickOutsideDirective = Directive<HTMLElementWithClickOutside, ClickOutsideHandler>

export const vClickOutside: ClickOutsideDirective = {
  mounted(el, binding) {
    el.__clickOutside__ = (event) => {
      if (!el.contains(event.target as Node)) {
        binding.value(event)
      }
    }

    document.addEventListener('pointerdown', el.__clickOutside__)
  },

  unmounted(el) {
    if (el.__clickOutside__) {
      document.removeEventListener('pointerdown', el.__clickOutside__)
    }
  },
} satisfies ClickOutsideDirective

declare module 'vue' {
  export interface GlobalDirectives {
    vClickOutside: ClickOutsideDirective
  }
}
