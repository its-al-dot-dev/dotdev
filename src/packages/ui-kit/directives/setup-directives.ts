import type { App } from 'vue'

import { vClickOutside } from './click-outside.ts'

export function setupDirectives(app: App) {
  app.directive('click-outside', vClickOutside)
}
