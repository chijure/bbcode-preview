# BBCode Preview (React + Vite + Tailwind + TS)

Vista previa de BBCode en tiempo real usando React 18, Tailwind 3 y Vite.

## Requisitos
- Node 18+
- npm

## Instalación
```bash
npm install
```

## Desarrollo
```bash
npm run dev
```
Abrir la URL que imprime Vite (ej. `http://localhost:5173`).

## Build
```bash
npm run build
```
El resultado queda en `dist/`.

## GitHub Pages
- Ajusta `base` en `vite.config.ts` si el nombre del repo cambia (por defecto `/bbcode-preview/`).
- Pages usa GitHub Actions (`.github/workflows/deploy.yml`):
  - `npm ci` + `npm run build` con Node 18, caché npm.
  - `actions/configure-pages`, `upload-pages-artifact`, `deploy-pages`.
- Fuente de Pages: habilita GitHub Pages -> Build and deployment -> Source: GitHub Actions.

## Funcionalidad
- Código en TypeScript.
- Editor de BBCode con chips para insertar etiquetas rápidas.
- Vista previa segura (escape de HTML), validación de URLs (`http`, `https`, `mailto`).
- Soporte para [b], [i], [u], [s], [color], [size], [align], [url], [img], [quote], [code], [list] con [*].
- Selector de idioma (ES/EN) vía `react-i18next`.
