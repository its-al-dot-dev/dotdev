import { NAMESPACE } from '@dotdev/design'

export function resolveTemplate(template: string, namespace: string) {
  return template.replaceAll(NAMESPACE, namespace)
}
