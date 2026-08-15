import { type ComponentInternalInstance, getCurrentInstance, inject } from 'vue'
import { UI_KIT_CONFIG_KEY, type UiKitBaseProps, type UiKitConfig } from 'dotdev/ui-kit'

type UiKitComponent = keyof NonNullable<UiKitConfig['components']>

export function toKebabCase(str = '') {
  if (toKebabCase.cache.has(str)) {
    return toKebabCase.cache.get(str)!
  }

  const kebab = str
    .replace(/[^a-z]/gi, '-')
    .replace(/\B([A-Z])/g, '-$1')
    .toLowerCase()

  toKebabCase.cache.set(str, kebab)

  return kebab
}

toKebabCase.cache = new Map<string, string>()

function propIsDefined(vnode: ComponentInternalInstance | null, prop: string) {
  const props = vnode?.vnode.props
  if (!props) return false

  return props[prop] !== undefined || props[toKebabCase(prop)] !== undefined
}

export function useUiKitProps<C extends UiKitComponent, P extends UiKitBaseProps>(
  component: C,
  props: P,
): { [key: string]: any } & P {
  const vm = getCurrentInstance()

  if (!vm) {
    throw new Error('useUiKitProps() can only be used inside setup()')
  }

  const config = inject(UI_KIT_CONFIG_KEY, {})
  const defaults = config.components?.[component] as Partial<P> | undefined

  return new Proxy(props, {
    get(target, _prop, receiver) {
      const prop = _prop as keyof P & string
      const value = Reflect.get(target, prop, receiver)

      if (prop === 'class' || prop === 'style') {
        return [defaults?.[prop], value].filter(Boolean)
      }

      if (propIsDefined(vm, prop)) return value

      const configValue = defaults?.[prop]

      if (configValue !== undefined) {
        return configValue
      }

      if (prop === 'namespace') {
        return config.namespace ?? 'd'
      }

      return value
    },
  })
}
