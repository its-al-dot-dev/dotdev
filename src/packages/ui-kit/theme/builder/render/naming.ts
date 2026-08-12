// ============================================================================
// naming — конвенции нейминга CSS-переменных и утилит листа.
// ============================================================================

/** CSS-переменная токена: --{name}-{key} */
export const varPrefix = (name: string) => (key: string) => `--${name}-${key}`

/** Имя утилиты: глобальные листы без префикса, локальные — {name}-{key} */
export const utilityName = (name: string, scope: 'global' | 'local') => (key: string) =>
  scope === 'global' ? key : `${name}-${key}`
