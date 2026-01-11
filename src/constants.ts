import type { TagKey } from './utils/bbcode'

export type LanguageId = 'es' | 'en'
export type ButtonConfig = { key: TagKey; label: string; title?: string }

export const sample = `[b]BBCode Preview[/b]
Escribe BBCode y mira el HTML renderizado al instante.

[i]Tags comunes[/i]:
[*] [b]bold[/b], [i]italic[/i], [u]underline[/u], [s]tachado[/s]
[*] [url=https://example.com]enlace[/url], [img]https://placekitten.com/320/180[/img]
[*] [quote=Alex]BBCode sigue vivo[/quote]

[code]const greet = () => console.log("hola");[/code]`

export const toolbarButtons: ButtonConfig[] = [
  { key: 'bold', label: 'B', title: 'Negrita' },
  { key: 'italic', label: 'I', title: 'Cursiva' },
  { key: 'underline', label: 'U', title: 'Subrayado' },
  { key: 'strike', label: 'S', title: 'Tachado' },
  { key: 'list', label: '• List', title: 'Lista' },
  { key: 'left', label: 'L', title: 'Alinear izquierda' },
  { key: 'center', label: 'C', title: 'Centrar' },
  { key: 'right', label: 'R', title: 'Alinear derecha' },
  { key: 'quote', label: '❝', title: 'Cita' },
  { key: 'code', label: '</>', title: 'Código' },
  { key: 'link', label: 'Link', title: 'Enlace' },
  { key: 'image', label: 'Img', title: 'Imagen' },
  { key: 'color', label: 'Color', title: 'Color' },
  { key: 'size', label: 'Size', title: 'Tamaño' },
]

export const languages: Array<{ id: LanguageId; label: string }> = [
  { id: 'es', label: 'ES' },
  { id: 'en', label: 'EN' },
]
