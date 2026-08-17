const injected = new Map<string, HTMLStyleElement>();

export function injectCSS(css: string, id: string): void {
  if (typeof document === "undefined") return;
  const existing = injected.get(id);
  if (existing) {
    existing.textContent = css;
    return;
  }
  const style = document.createElement("style");
  style.setAttribute("data-theme", id);
  style.textContent = css;
  document.head.appendChild(style);
  injected.set(id, style);
}
