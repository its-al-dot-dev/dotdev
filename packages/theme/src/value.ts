import type { Registry } from "./registry"
import type { Category } from "./types"
import { parseToken, parseOpacity } from "./token/parser"
import { resolve, resolveValueWithNamespace } from "./token/resolver"
import { emit } from "./token/emitter"
import { resolveCategory } from "./token/category"

export { parseToken, parseOpacity } from "./token/parser"

export { resolve, resolveValueWithNamespace } from "./token/resolver"

export function resolveValue(input: string, registry: Registry) {
  return resolve(parseToken(input), { registry })
}

export { emit } from "./token/emitter"

export function emitValue(value: Parameters<typeof emit>[0]): string {
  return emit(value)
}

export { resolveCategory } from "./token/category"

const LENGTH_RE =
  /^[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:px|rem|em|%|vw|vh|vmin|vmax|svh|lvh|dvh|ch|ex|cm|mm|in|pt|pc)$/

