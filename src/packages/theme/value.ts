import type { Registry } from "./registry";
import type { Category, ResolvedValue } from "./types";

const OPACITY_RE = /\/(\d{1,3})$/;
const LENGTH_RE =
  /^[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:px|rem|em|%|vw|vh|vmin|vmax|svh|lvh|dvh|ch|ex|cm|mm|in|pt|pc)$/;

function parseOpacity(input: string): {
  base: string;
  opacity?: number;
} {
  const match = OPACITY_RE.exec(input);
  if (!match) return { base: input };
  return { base: input.slice(0, -match[0].length), opacity: Number(match[1]) };
}

export function resolveValue(input: string, registry: Registry): ResolvedValue {
  const trimmed = input.trim();
  if (trimmed.startsWith("$")) {
    const { base, opacity } = parseOpacity(trimmed);
    const entry = registry.findByName(base.slice(1));
    if (!entry) throw new Error(`Unknown token reference: ${base}`);
    return { kind: "ref", varName: entry.varName, opacity };
  }
  if (trimmed.startsWith("var(")) {
    const { base, opacity } = parseOpacity(trimmed);
    return { kind: "raw", value: base, opacity };
  }
  if (trimmed.startsWith("--")) {
    const { base, opacity } = parseOpacity(trimmed);
    const entry = registry.findByName(base.slice(2));
    if (entry) return { kind: "ref", varName: entry.varName, opacity };
    return { kind: "ref", varName: base, opacity };
  }
  const { base, opacity } = parseOpacity(trimmed);
  const entry = registry.findByName(base);
  if (entry) return { kind: "ref", varName: entry.varName, opacity };
  return { kind: "raw", value: trimmed };
}

export function emitValue(value: ResolvedValue): string {
  if (value.kind === "raw") {
    if (value.opacity == null) return value.value;
    return `color-mix(in oklab, ${value.value} ${value.opacity}%, transparent)`;
  }
  const source = `var(${value.varName})`;
  if (value.opacity == null) return source;
  return `color-mix(in oklab, ${source} ${value.opacity}%, transparent)`;
}

function categorize(raw: string): Category {
  return LENGTH_RE.test(raw.trim()) ? "length" : "color";
}

export function resolveCategory(
  input: string,
  registry: Registry,
  seen: Set<string> = new Set(),
): Category {
  const { base } = parseOpacity(input.trim());
  if (seen.has(base)) return "color";
  seen.add(base);

  const name = base.startsWith("$") ? base.slice(1) : base.replace(/^--/, "");
  const entry = registry.findByName(name);

  if (entry) {
    if (entry.kind === "primitive") return categorize(entry.value);
    if (entry.kind === "semantic")
      return resolveCategory(entry.light, registry, seen);
    return "color";
  }
  if (base.startsWith("$") || base.startsWith("--") || base.startsWith("var("))
    return "color";
  return categorize(base);
}
