# Paddock Lab frontend

Run `npm install` and `npm run dev` from this folder. The main app renders the
kart viewer directly with `<ModelViewer />`.

## Reusing the model viewer

```tsx
import ModelViewer from './components/ModelViewer'

<ModelViewer src="/models/model.glb" alt="Interactive Electro Kart chassis" />
```

Both props are optional; the default source is `/models/model.glb` and the
default alt is `Interactive 3D kart model`. The viewer fills a parent with an
explicit height, or uses a responsive 4:3 aspect ratio when no height is set.
It can fit small containers without a forced minimum height.
Drag or use arrow keys to rotate;
scroll or pinch to zoom. Vertical touch gestures allow page scrolling.

The exported GLB belongs at [public/models/model.glb](./public/models/model.glb).
The current export embeds its textures. If replacing it from the original FBX,
export a GLB with textures embedded; the browser does not load the FBX or its
separate texture folder. Loading failures display an inline message.

Import the component into the space reserved for the kart when the page is ready.
The component contains only the 3D viewport and loading/error feedback.

This is a React + TypeScript project. Application components live in `.tsx`
files, with strict type checking configured in `tsconfig.app.json`.

Checks: `npm run typecheck`, `npm run lint`, and `npm run build`.
The build runs TypeScript checks before generating the production bundle.

## Vite template notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).
