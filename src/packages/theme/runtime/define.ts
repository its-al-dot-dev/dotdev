import { Registry, semanticEntry } from "../registry";
import type { ThemeTokens } from "../types";
import { isPair } from "../types";
import { emitValue, resolveValue } from "../value";
import { injectCSS } from "./inject";

export interface ThemeDefinition<T extends ThemeTokens = ThemeTokens> {
  tokens?: T;
  namespace?: string;
  primitives?: { [K in keyof T["primitives"]]?: string };
  semantics?: { [K in keyof T["semantics"]]?: string | readonly [string, string] };
  components?: {
    [U in keyof T["components"]]?: {
      [K in keyof T["components"][U]]?: string | readonly [string, string];
    };
  };
}

export interface RuntimeTheme {
  namespace: string;
  tokens: ThemeTokens;
  css: string;
  inject(): void;
}

export function mergeTokens<T extends ThemeTokens = ThemeTokens>(
  base: T | undefined,
  def: ThemeDefinition<T>,
): ThemeTokens {
  const primitives: Record<string, string> = { ...(base?.primitives ?? {}) };
  for (const [name, value] of Object.entries(def.primitives ?? {})) {
    if (value != null) primitives[name] = value;
  }
  const semantics: Record<string, string | readonly [string, string]> = {
    ...(base?.semantics ?? {}),
  };
  for (const [name, value] of Object.entries(def.semantics ?? {})) {
    if (value != null) semantics[name] = value;
  }
  const components: Record<
    string,
    Record<string, string | readonly [string, string]>
  > = {};
  for (const [ui, map] of Object.entries(base?.components ?? {})) {
    components[ui] = { ...map };
  }
  for (const [ui, map] of Object.entries(def.components ?? {})) {
    components[ui] = { ...(components[ui] ?? {}), ...map };
  }
  return { primitives, semantics, components };
}

const parts = (value: string | readonly [string, string]): string[] =>
  isPair(value) ? [...value] : [value];

export function validateTokens(tokens: ThemeTokens): void {
  const known = new Set([
    ...Object.keys(tokens.primitives),
    ...Object.keys(tokens.semantics),
  ]);
  const check = (value: string) => {
    for (const match of value.matchAll(/\$([\w-]+)/g)) {
      if (!known.has(match[1])) {
        throw new Error(`Unknown token reference: $${match[1]}`);
      }
    }
  };
  for (const value of Object.values(tokens.semantics)) {
    for (const part of parts(value)) check(part);
  }
  for (const map of Object.values(tokens.components)) {
    for (const value of Object.values(map)) {
      for (const part of parts(value)) check(part);
    }
  }
}

function templateRegistry(tokens: ThemeTokens): Registry {
  const registry = new Registry();

  for (const name of Object.keys(tokens.primitives)) {
    registry.add({
      kind: "primitive",
      name,
      scope: { kind: "theme" },
      varName: `--{ns}-${name}`,
      value: "",
    });
  }

  for (const name of Object.keys(tokens.semantics)) {
    registry.add(semanticEntry({ kind: "theme" }, name, "", undefined, "{ns}"));
  }
  for (const [ui, map] of Object.entries(tokens.components)) {
    for (const name of Object.keys(map)) {
      registry.add(
        semanticEntry({ kind: "component", ui }, name, "", undefined, "{ns}"),
      );
    }
  }
  return registry;
}

export function renderRuntimeVars(
  tokens: ThemeTokens,
  namespace: string,
  component?: string,
): string {
  const ns = namespace ? `${namespace}-` : "";
  const registry = templateRegistry(tokens);
  const decl = (varName: string, value: string): string =>
    `  ${varName}: ${emitValue(resolveValue(value, registry)).replaceAll("{ns}", namespace)};`;

  const blocks: string[] = [];

  if (component) {
    const map = tokens.components[component];
    if (map) {
      const rootLines: string[] = [];
      const darkLines: string[] = [];
      for (const [name, value] of Object.entries(map)) {
        const [light, d] = Array.isArray(value) ? value : [value, undefined];
        rootLines.push(decl(`--${ns}${component}-${name}`, light));
        if (d != null) darkLines.push(decl(`--${ns}${component}-${name}`, d));
      }
      blocks.push(`:root {\n${rootLines.join("\n")}\n}`);
      if (darkLines.length) blocks.push(`.dark {\n${darkLines.join("\n")}\n}`);
    }
    return blocks.join("\n\n");
  }

  const root: string[] = [];
  const dark: string[] = [];

  for (const [name, value] of Object.entries(tokens.primitives)) {
    root.push(decl(`--${ns}${name}`, value));
  }
  for (const [name, value] of Object.entries(tokens.semantics)) {
    const [light, d] = Array.isArray(value) ? value : [value, undefined];
    root.push(decl(`--${ns}${name}`, light));
    if (d != null) dark.push(decl(`--${ns}${name}`, d));
  }

  if (root.length) blocks.push(`:root {\n${root.join("\n")}\n}`);
  if (dark.length) blocks.push(`.dark {\n${dark.join("\n")}\n}`);
  return blocks.join("\n\n");
}

export function defineTheme<T extends ThemeTokens = ThemeTokens>(
  def: ThemeDefinition<T>,
): RuntimeTheme {
  const defaults = def.tokens;
  const namespace = def.namespace ?? "s";
  const tokens = mergeTokens(defaults, def);
  validateTokens(tokens);
  return {
    namespace,
    tokens,
    css: renderRuntimeVars(tokens, namespace),
    inject() {
      injectCSS(this.css, `theme-${this.namespace}`);
    },
  };
}
