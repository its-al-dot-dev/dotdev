import { NAMESPACE } from '@dotdev/design'

export interface StyleToken {
  name: string
  type: string
  value: string
  style: string
}

export interface StyleTokenGroup {
  id: string
  label: string
  tokens: StyleToken[]
}

export type ComponentTokens = Record<string, string>

const DEFAULT_NAMESPACE = 'd'

interface TokenKeyMeta {
  label: string
  style: string
}

const TOKEN_KEYS: Record<string, TokenKeyMeta> = {
  type: { label: 'Font size', style: 'font-size' },
  text: { label: 'Text colors', style: 'color' },
  bg: { label: 'Background colors', style: 'background' },
  border: { label: 'Border colors', style: 'border-color' },
  ring: { label: 'Ring colors', style: 'outline-color' },
  rounded: { label: 'Radius', style: 'border-radius' },
  p: { label: 'Padding', style: 'padding' },
  px: { label: 'Padding inline', style: 'padding-inline' },
  py: { label: 'Padding block', style: 'padding-block' },
  pt: { label: 'Padding top', style: 'padding-top' },
  pb: { label: 'Padding bottom', style: 'padding-bottom' },
  ps: { label: 'Padding start', style: 'padding-inline-start' },
  pe: { label: 'Padding end', style: 'padding-inline-end' },
  gap: { label: 'Gap', style: 'gap' },
  h: { label: 'Height', style: 'height' },
  w: { label: 'Width', style: 'width' },
  size: { label: 'Size', style: 'size' },
}

const TOKEN_KEY_ALIASES: Record<string, string> = {
  'text-size': 'type',
}

export function buildStyleTokenGroups(scope: string, tokens: ComponentTokens | undefined): StyleTokenGroup[] {
  if (!tokens) return []

  const buckets = new Map<string, StyleToken[]>()

  for (let [name, value] of Object.entries(tokens)) {
    // TODO handle array values
    if (Array.isArray(value)) value = value[0]

    const key = resolveTokenKey(name)
    const meta = TOKEN_KEYS[key]
    if (!meta) continue

    const bucket = buckets.get(key) ?? []

    bucket.push(parseToken(`${scope}-${name}`, value, meta))
    buckets.set(key, bucket)
  }

  return Object.keys(TOKEN_KEYS)
    .filter((key) => buckets.has(key))
    .map((key) => ({ id: key, label: TOKEN_KEYS[key].label, tokens: buckets.get(key)! }))
}

function resolveTokenKey(name: string): string {
  const pair = name.split('-').slice(0, 2).join('-')
  return TOKEN_KEY_ALIASES[pair] ?? name.split('-')[0]
}

function parseToken(name: string, value: string, meta: TokenKeyMeta): StyleToken {
  const reference = value.replaceAll(NAMESPACE, DEFAULT_NAMESPACE)

  return {
    name,
    type: meta.style,
    value: resolveValue(reference),
    style: `${meta.style}: ${reference}`,
  }
}

function resolveValue(reference: string): string {
  const name = getCssVarName(reference)
  if (!name.startsWith('--') || typeof document === 'undefined') return reference

  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

function getCssVarName(value: string): string {
  const match = value.match(/^var\((--[^,\s)]+)/)
  return match?.[1] ?? value
}
