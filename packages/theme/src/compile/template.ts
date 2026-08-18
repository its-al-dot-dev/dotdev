export function toComponentTemplate(css: string, namespace: string): string {
  const prefix = `${namespace}-`
  return css.replaceAll(`--${prefix}`, '--{ns}-').replaceAll(`.${prefix}`, '.{ns}-')
}
