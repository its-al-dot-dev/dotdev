import type { VarResolver } from './inline'

export { type VarResolver }

export function createVarResolver(
  locals: Map<string, string>,
  properties: Map<string, string>,
  namespace: string,
): VarResolver {
  const ns = `${namespace}-`
  return (name: string, fallback: string | undefined): string | undefined => {
    if (name.startsWith(`--${ns}`)) return undefined
    const local = locals.get(name)
    if (local != null) return local
    const prop = properties.get(name)
    if (prop != null) return prop
    return fallback
  }
}
