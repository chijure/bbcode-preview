import type { TagKey } from './utils/bbcode'

export type LanguageId = 'es' | 'en'
export type ChipConfig = { key: TagKey; label: string }

export const sample = `[b]BBCode Preview[/b]
Escribe BBCode y mira el HTML renderizado al instante.

[i]Tags comunes[/i]:
[*] [b]bold[/b], [i]italic[/i], [u]underline[/u], [s]tachado[/s]
[*] [url=https://example.com]enlace[/url], [img]https://placekitten.com/320/180[/img]
[*] [quote=Alex]BBCode sigue vivo[/quote]

[code]const greet = () => console.log("hola");[/code]`

export const chips: ChipConfig[] = [
  { key: 'bold', label: '[b]' },
  { key: 'italic', label: '[i]' },
  { key: 'link', label: '[url]' },
  { key: 'image', label: '[img]' },
  { key: 'quote', label: '[quote]' },
  { key: 'code', label: '[code]' },
  { key: 'list', label: '[list]' },
]

export const languages: Array<{ id: LanguageId; label: string }> = [
  { id: 'es', label: 'ES' },
  { id: 'en', label: 'EN' },
]
