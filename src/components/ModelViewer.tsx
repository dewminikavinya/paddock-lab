import { useEffect, useRef, useState } from 'react'
import type { ModelViewerElement } from '@google/model-viewer'
import '@google/model-viewer'
import './ModelViewer.css'

export interface ModelViewerProps {
  src?: string
  alt?: string
}

type ViewerStatus = 'loading' | 'loaded' | 'error'

// Reset loading feedback whenever the source changes.
export default function ModelViewer({ src = '/models/model.glb', alt = 'Interactive 3D kart model' }: ModelViewerProps) {
  return <Viewer key={src} src={src} alt={alt} />
}

function Viewer({ src, alt }: Required<ModelViewerProps>) {
  const [status, setStatus] = useState<ViewerStatus>('loading')
  const [isRotating, setIsRotating] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const viewerRef = useRef<ModelViewerElement>(null)

  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.autoRotate = isRotating
    }
  }, [isRotating])

  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) return
    const onLoad = () => setStatus('loaded')
    const onError = () => setStatus('error')
    viewer.addEventListener('load', onLoad)
    viewer.addEventListener('error', onError)
    // A cached model may have loaded before the effect attached its listeners.
    if (viewer.loaded) onLoad()
    return () => {
      viewer.removeEventListener('load', onLoad)
      viewer.removeEventListener('error', onError)
    }
  }, [])

  return (
    <div className="model-viewer">
      <model-viewer
        ref={viewerRef}
        src={src}
        alt={alt}
        camera-controls
        auto-rotate-delay="0"
        rotation-per-second="20deg"
        touch-action="pan-y"
        camera-orbit="35deg 65deg 105%"
        camera-target="auto auto auto"
        field-of-view="30deg"
        shadow-intensity="1"
        shadow-softness="1"
        exposure="1"
        interaction-prompt="auto"
        loading="eager"
      />
      <div className="model-viewer-toolbar">
        <span className="model-viewer-badge">
          <span className="model-viewer-dot" aria-hidden="true" />
          3D KART
        </span>
        <div className="model-viewer-actions">
          <button
            type="button"
            className="model-viewer-toggle"
            onClick={() => setIsRotating((rotating) => !rotating)}
            aria-label={isRotating ? 'Pause automatic rotation' : 'Resume automatic rotation'}
          >
            {isRotating ? 'Pause' : 'Resume'}
          </button>
          <span className="model-viewer-badge model-viewer-hint">
            DRAG 360° <span>INTERACTIVE</span>
          </span>
        </div>
      </div>
      {status !== 'loaded' && (
        <p className="model-viewer-message" role="status">
          {status === 'error'
            ? 'Unable to load the 3D model. Check the model file and reload the page.'
            : 'Loading kart…'}
        </p>
      )}
    </div>
  )
}
