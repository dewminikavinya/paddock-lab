import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element was not found')
}

const AppComponent = App as unknown as () => JSX.Element

createRoot(root).render(
  <StrictMode>
    <AppComponent />
  </StrictMode>,
)
