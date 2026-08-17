import { nsPrefix } from '../utils'

export function toComponentTemplate(css: string, namespace: string): string {
  const prefix = nsPrefix(namespace)
  return css.replaceAll(`--${prefix}`, '--{ns}-').replaceAll(`.${prefix}`, '.{ns}-')
}
