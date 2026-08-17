export type StyleTokenType = 'color' | 'space' | 'radius' | 'size' | 'label'

export interface StyleToken {
  name: string
  type: StyleTokenType
  value: string
}

export interface StyleTokenGroup {
  id: string
  label: string
  tokens: StyleToken[]
}

export const STYLE_TOKEN_GROUPS: StyleTokenGroup[] = [
  {
    id: 'color',
    label: 'Color',
    tokens: [
      { name: '--ui-brand-500', type: 'color', value: '#6366f1' },
      { name: '--ui-brand-600', type: 'color', value: '#4f46e5' },
      { name: '--ui-neutral-400', type: 'color', value: 'oklch(63.44% 0.062 279.07)' },
      { name: '--ui-neutral-800', type: 'color', value: 'oklch(29.20% 0.039 277.47)' },
      { name: '--ui-danger-600', type: 'color', value: '#dc2626' },
      { name: '--ui-warning-500', type: 'color', value: '#f59e0b' },
      { name: '--ui-info-700', type: 'color', value: '#0369a1' },
      { name: '--ui-success-700', type: 'color', value: '#047857' },
    ],
  },
  {
    id: 'spacing',
    label: 'Spacing',
    tokens: [
      { name: '--ui-space-xs', type: 'space', value: '0.5rem' },
      { name: '--ui-space-sm', type: 'space', value: '0.625rem' },
      { name: '--ui-space-md', type: 'space', value: '0.75rem' },
      { name: '--ui-space-lg', type: 'space', value: '1rem' },
      { name: '--ui-space-xl', type: 'space', value: '1.25rem' },
    ],
  },
  {
    id: 'radius',
    label: 'Radius',
    tokens: [
      { name: '--ui-radius-xs', type: 'radius', value: '0.125rem' },
      { name: '--ui-radius-sm', type: 'radius', value: '0.375rem' },
      { name: '--ui-radius-md', type: 'radius', value: '0.5rem' },
      { name: '--ui-radius-lg', type: 'radius', value: '0.75rem' },
      { name: '--ui-radius-xl', type: 'radius', value: '1rem' },
    ],
  },
  {
    id: 'sizes',
    label: 'Sizes',
    tokens: [
      { name: '--ui-size-xs', type: 'size', value: '2rem' },
      { name: '--ui-size-sm', type: 'size', value: '2.25rem' },
      { name: '--ui-size-md', type: 'size', value: '2.5rem' },
      { name: '--ui-size-lg', type: 'size', value: '2.75rem' },
      { name: '--ui-size-xl', type: 'size', value: '3rem' },
    ],
  },
  {
    id: 'typography',
    label: 'Typography',
    tokens: [
      { name: '--ui-label-xs', type: 'label', value: '0.75rem' },
      { name: '--ui-label-sm', type: 'label', value: '0.875rem' },
      { name: '--ui-label-md', type: 'label', value: '1rem' },
      { name: '--ui-label-lg', type: 'label', value: '1.125rem' },
      { name: '--ui-label-xl', type: 'label', value: '1.25rem' },
    ],
  },
]
