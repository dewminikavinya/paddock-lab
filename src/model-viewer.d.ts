import type { ModelViewerElement } from '@google/model-viewer'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': DetailedHTMLProps<HTMLAttributes<ModelViewerElement>, ModelViewerElement> & {
        src?: string
        alt?: string
        'camera-controls'?: boolean
        'auto-rotate-delay'?: string
        'rotation-per-second'?: string
        'touch-action'?: string
        'camera-orbit'?: string
        'camera-target'?: string
        'field-of-view'?: string
        'shadow-intensity'?: string
        'shadow-softness'?: string
        exposure?: string
        'interaction-prompt'?: 'auto' | 'none'
        loading?: 'auto' | 'lazy' | 'eager'
      }
    }
  }
}
