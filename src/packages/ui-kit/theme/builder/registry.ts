// ============================================================================
// registry — TokenRegistry: общий реестр токенов всех глобальных листов.
//
// Заменяет старые createRegistry + createValueRegistry. Собирает:
//   - tokens: bare-имя -> полное CSS-имя переменной (--{name}-{key});
//   - values: bare-имя -> сырая строка из конфига (для вывода типа).
//
// Правило то же, что было: в реестр попадают ТОЛЬКО глобальные листы. По ним
// резолвятся перекрёстные ссылки между листами и компонентами (алиасы вида
// 'bg-soft' в компоненте резолвятся в ui-токен).
//
// Локальные листы в реестр не попадают: их токены уже уникальны за счёт
// префикса листа (--{sheet}-{key}) и доступны только как утилиты {sheet}-{key},
// поэтому одинаковые bare-имена в разных компонентах не коллизируют.
//
// Коллизии возможны только между глобальными листами — они выводят
// предупреждение (first-wins: побеждает зарегистрированный первым).
// ============================================================================

import type { Sheet } from './types.ts'

export class TokenRegistry {
  /** bare-имя токена -> полное CSS-имя переменной (--{name}-{key}) */
  readonly tokens = new Map<string, string>()

  /** bare-имя токена -> сырое значение из конфига (для вывода типа) */
  readonly values = new Map<string, string>()

  /** bare-имя -> имя листа-владельца (для сообщений о коллизиях) */
  private readonly owners = new Map<string, string>()

  /** Регистрирует токены глобальных листов (порядок важен: first-wins) */
  collect(sheets: Sheet[]): void {
    for (const sheet of sheets) {
      if (sheet.$scope !== 'global') continue

      for (const [bare, varName] of sheet.$tokens) {
        const firstOwner = this.owners.get(bare)
        if (firstOwner) {
          console.warn(
            `[builder] duplicate global token '${bare}': keeping '${firstOwner}' (registered first), ignoring '${varName}' from sheet '${sheet.$name}'.  one of them to avoid ambiguous references.`,
          )
        } else {
          this.tokens.set(bare, varName)
          this.owners.set(bare, sheet.$name)
        }
      }

      for (const [bare, raw] of sheet.$values) {
        if (!this.values.has(bare)) this.values.set(bare, raw)
      }
    }
  }

  /** Полное CSS-имя переменной для bare-токена, либо undefined */
  lookup(bare: string): string | undefined {
    return this.tokens.get(bare)
  }

  /** Сырое значение bare-токена из конфига, либо undefined */
  raw(bare: string): string | undefined {
    return this.values.get(bare)
  }

  /** Зарегистрирован ли bare-токен в реестре */
  has(bare: string): boolean {
    return this.tokens.has(bare)
  }

  /** Имя листа-владельца bare-токена (для манифеста), либо undefined */
  owner(bare: string): string | undefined {
    return this.owners.get(bare)
  }
}
