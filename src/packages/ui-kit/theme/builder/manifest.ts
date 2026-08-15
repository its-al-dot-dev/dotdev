// ============================================================================
// manifest — сбор манифеста токенов для UI (tokens.json).
//
// Чистая агрегация без IO: из IR листов ($tokenMeta) и резолвера собирает
// Record<sheetName, TokenMeta[]> с type, refs (цепочка ссылок) и резолвнутыми
// light/dark значениями. Порядок листов тот же, что у registry.collect:
// components -> app.
// ============================================================================

import type { Resolver, TokenManifest, TokenMeta, TokenRefLink } from './types.ts'
import type { SheetModel } from './sheet.ts'
import type { TokenRegistry } from './registry.ts'
import { classifyTokenType, extractRef, type TokenRefContext } from './classify.ts'

export function collectTokenManifest(
  sheets: SheetModel[],
  resolve: Resolver,
  registry: Pick<TokenRegistry, 'values' | 'owner'>,
): TokenManifest {
  // Реверсная карта: полное CSS-имя переменной -> { sheet, key }
  const varNameToRef = new Map<string, TokenRefLink>()
  for (const sheet of sheets) {
    for (const meta of sheet.$tokenMeta()) {
      varNameToRef.set(meta.varName, { sheet: sheet.$name, key: meta.key })
    }
  }

  const ctx: TokenRefContext = {
    values: registry.values,
    ownerOf: (bare) => registry.owner(bare),
    varNameToRef,
  }

  const manifest: TokenManifest = {}

  for (const sheet of sheets) {
    const meta: TokenMeta[] = sheet.$tokenMeta().map((token) => {
      const refs: { light?: TokenRefLink; dark?: TokenRefLink } = {}
      if (token.light) {
        const ref = extractRef(token.light, ctx)
        if (ref) refs.light = ref
      }
      if (token.dark) {
        const ref = extractRef(token.dark, ctx)
        if (ref) refs.dark = ref
      }

      return {
        ...token,
        type: classifyTokenType(token.key, token.light ?? token.dark ?? '', ctx),
        ...(Object.keys(refs).length ? { refs } : {}),
        ...(token.light ? { resolvedLight: resolve(token.light) } : {}),
        ...(token.dark ? { resolvedDark: resolve(token.dark) } : {}),
      }
    })

    if (!meta.length) continue
    manifest[sheet.$name] = meta
  }

  return manifest
}
