import i18n, { type Resource } from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  es: {
    translation: {
      hero_eyebrow: 'Live BBCode Preview',
      hero_desc: 'Edita BBCode, inserta tags rápidos y mira la salida HTML al instante. Ideal para foros, documentación y experimentos de formato.',
      load_example: 'Cargar ejemplo',
      clear: 'Limpiar',
      badge_title: 'Listo para GitHub Pages',
      badge_desc: 'Vite + Tailwind en un build estático.',
      editor: 'Editor',
      write_bbcode: 'Escribe BBCode',
      preview: 'Vista previa',
      rendered_html: 'HTML renderizado',
      safe_output: 'Salida segura (HTML escapado por defecto)',
      supported_tags: 'Tags soportados',
      tags_line1: '[b], [i], [u], [s], [color=#hex], [size=16], [center], [left], [right]',
      tags_line2: '[url] y [url=...], [img], [quote] y [quote=autor]',
      tags_line3: '[code], [list] con [*] para cada elemento',
      tips: 'Consejos rápidos',
      tip_escape: 'Todo el texto se escapa antes de convertir para evitar scripts.',
      tip_url: 'Las URLs deben comenzar con http(s) o mailto para mostrarse.',
      tip_list: 'Combina listas: [list][*]Item 1[*]Item 2[/list].',
      placeholder: '[b]Negrita[/b], [i]cursiva[/i], [url=https://ejemplo.com]enlace[/url]...',
    },
  },
  en: {
    translation: {
      hero_eyebrow: 'Live BBCode Preview',
      hero_desc: 'Edit BBCode, drop in quick tags, and see HTML instantly. Perfect for forums, docs, and formatting experiments.',
      load_example: 'Load example',
      clear: 'Clear',
      badge_title: 'Ready for GitHub Pages',
      badge_desc: 'Vite + Tailwind in a static build.',
      editor: 'Editor',
      write_bbcode: 'Write BBCode',
      preview: 'Preview',
      rendered_html: 'Rendered HTML',
      safe_output: 'Safe output (HTML escaped by default)',
      supported_tags: 'Supported tags',
      tags_line1: '[b], [i], [u], [s], [color=#hex], [size=16], [center], [left], [right]',
      tags_line2: '[url] and [url=...], [img], [quote] and [quote=author]',
      tags_line3: '[code], [list] with [*] for each item',
      tips: 'Quick tips',
      tip_escape: 'All text is escaped before converting to avoid scripts.',
      tip_url: 'URLs must start with http(s) or mailto to render.',
      tip_list: 'Lists: [list][*]Item 1[*]Item 2[/list].',
      placeholder: '[b]Bold[/b], [i]italics[/i], [url=https://example.com]link[/url]...',
    },
  },
} satisfies Resource

i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  fallbackLng: 'en',
  initImmediate: false,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
