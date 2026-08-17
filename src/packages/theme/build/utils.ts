import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import { Theme } from "dotdev/theme";

export async function compile(input: string, from: string): Promise<string> {
  const result = await postcss([tailwindcss()]).process(input, { from });
  return result.css;
}

export function stripBanner(css: string): string {
  return css.replace(/^\/\*![\s\S]*?\*\/\s*/, "");
}

export function findTopLevelComma(input: string): number {
  let depth = 0;
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (c === "(") depth++;
    else if (c === ")") depth--;
    else if (c === "," && depth === 0) return i;
  }
  return -1;
}

export function inlineVars(
  value: string,
  resolve: (name: string, fallback: string | undefined) => string | undefined,
  depth = 0,
): string {
  if (depth > 20) return value;
  let out = "";
  let i = 0;
  while (i < value.length) {
    const idx = value.indexOf("var(", i);
    if (idx === -1) {
      out += value.slice(i);
      break;
    }
    out += value.slice(i, idx);
    let k = idx + 4;
    let parens = 1;
    while (k < value.length) {
      const c = value[k];
      if (c === "(") parens++;
      else if (c === ")") {
        parens--;
        if (parens === 0) break;
      }
      k++;
    }
    const inner = value.slice(idx + 4, k);
    const comma = findTopLevelComma(inner);
    let name: string;
    let fallback: string | undefined;
    if (comma === -1) {
      name = inner.trim();
    } else {
      name = inner.slice(0, comma).trim();
      fallback = inner.slice(comma + 1).trim();
    }
    const replacement = resolve(name, fallback);
    if (replacement === undefined) {
      out += value.slice(idx, k + 1);
    } else {
      out += inlineVars(replacement, resolve, depth + 1);
    }
    i = k + 1;
  }
  return out;
}

export function collectLocals(root: postcss.Container): Map<string, string> {
  const locals = new Map<string, string>();
  root.walkDecls((decl) => {
    if (decl.prop.startsWith("--")) locals.set(decl.prop, decl.value);
  });
  return locals;
}

export function pruneEmptyRules(root: postcss.Container): void {
  root.each((node) => {
    if (node.type !== "rule" && node.type !== "atrule") return;
    if (node.nodes) pruneEmptyRules(node);
    if (!node.nodes || node.nodes.length === 0) node.remove();
  });
}

export function parseArgs(args: string[]): {
  input?: string;
  output?: string;
  name?: string;
} {
  const result: { input?: string; output?: string; name?: string } = {};
  for (let i = 2; i < args.length; i++) {
    if (args[i] === "--input") result.input = args[++i];
    else if (args[i] === "--name") result.name = args[++i];
    else if (args[i] === "--output") result.output = args[++i];
  }
  return result;
}

export async function loadTheme(input: string): Promise<Theme> {
  const mod = await import(input);
  return mod.default ?? Object.values(mod)[0];
}
