import {
  inject,
  provide,
  ref,
  toValue,
  watchEffect,
  type InjectionKey,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";
import {
  mergeTokens,
  renderRuntimeVars,
  validateTokens,
  type ThemeDefinition,
} from "./define";
import type { ThemeTokens } from "../types";
import { injectCSS } from "./inject";

export interface ThemeContext {
  activeTheme: Ref<string>;
  injectStyles(namespace: string, ui: string, template: string): void;
}

export const themeInjectionKey: InjectionKey<ThemeContext> =
  Symbol("dotdev-theme");

export interface ThemeProvider {
  active: Ref<string>;
  register<T extends ThemeTokens>(name: string, def: ThemeDefinition<T>): void;
  use(name: string): void;
}

export function useThemeProvider<T extends ThemeTokens = ThemeTokens>(config: {
  tokens?: ThemeDefinition<T>;
}): ThemeProvider {
  const themes = new Map<string, ThemeTokens>();
  const active = ref<string>("default");
  let baseTokens: ThemeTokens | undefined;

  const register = <U extends ThemeTokens>(
    name: string,
    def: ThemeDefinition<U>,
  ): void => {
    if (def.tokens) baseTokens = def.tokens;
    const tokens = mergeTokens(baseTokens, def);
    validateTokens(tokens);
    themes.set(name, tokens);
    if (themes.size === 1) active.value = name;
  };

  if (config.tokens) register("default", config.tokens);

  const ctx: ThemeContext = {
    activeTheme: active,
    injectStyles(namespace, ui, template) {
      const tokens = themes.get(active.value);
      if (tokens) {
        injectCSS(renderRuntimeVars(tokens, namespace), `theme-${namespace}`);
        injectCSS(
          renderRuntimeVars(tokens, namespace, ui),
          `component-vars-${namespace}-${ui}`,
        );
      }
      injectCSS(
        template.replaceAll("{ns}", namespace),
        `component-${namespace}-${ui}`,
      );
    },
  };

  provide(themeInjectionKey, ctx);

  return {
    active,
    register,
    use(name) {
      active.value = name;
    },
  };
}

export function useComponentTheme(
  namespace: MaybeRefOrGetter<string>,
  ui: string,
  template: string,
): string {
  const ctx = inject(themeInjectionKey, null);
  if (!ctx) {
    console.warn(
      "[dotdev/theme] useComponentTheme: no useThemeProvider in the component tree",
    );
    return toValue(namespace);
  }
  watchEffect(() => {
    const ns = toValue(namespace);
    ctx.injectStyles(ns, ui, template);
  });
  return toValue(namespace);
}
