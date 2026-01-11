# BBCode Preview (React + Vite + Tailwind + TS)

Vista previa de BBCode en tiempo real usando React 18, Tailwind 3 y Vite. Listo para desplegar en GitHub Pages.

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

## Despliegue en GitHub Pages
1. Ajusta `base` en `vite.config.js` si el nombre del repo no es `bbcode-preview`.
2. Ejecuta `npm run build`.
3. Publica el contenido de `dist/` en Pages (rama `gh-pages` o flujo de tu preferencia).

## Funcionalidad
- Código en TypeScript.
- Editor de BBCode con chips para insertar etiquetas rápidas.
- Vista previa segura (escape de HTML), validación de URLs (`http`, `https`, `mailto`).
- Soporte para [b], [i], [u], [s], [color], [size], [align], [url], [img], [quote], [code], [list] con [*].
- Selector de idioma (ES/EN) vía `react-i18next`.
