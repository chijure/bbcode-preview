export type TagKey = 'bold' | 'italic' | 'link' | 'image' | 'quote' | 'code' | 'list'

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const normalizeUrl = (url: string) => {
  const trimmed = url.trim().replace(/^['"]|['"]$/g, '')
  if (/^(https?:\/\/|mailto:)/i.test(trimmed)) return trimmed
  return null
}

const parseList = (content: string) => {
  const items = content.split(/\[\*\]/).map((item) => item.trim()).filter(Boolean)
  if (!items.length) return content
  const rendered = items.map((item) => `<li class="leading-6">${item}</li>`).join('')
  return `<ul class="list-disc list-inside space-y-1">${rendered}</ul>`
}

export const parseBBCode = (input: string) => {
  if (!input) return ''

  let safe = escapeHtml(input)

  const codeBlocks: string[] = []
  safe = safe.replace(/\[code\]([\s\S]*?)\[\/code\]/gi, (_match, code) => {
    const token = `__CODEBLOCK_${codeBlocks.length}__`
    codeBlocks.push(code)
    return token
  })

  const replacements: Array<{ regex: RegExp; replacer: string | ((substring: string, ...args: string[]) => string) }> = [
    { regex: /\[b\](.*?)\[\/b\]/gi, replacer: '<strong>$1</strong>' },
    { regex: /\[i\](.*?)\[\/i\]/gi, replacer: '<em>$1</em>' },
    { regex: /\[u\](.*?)\[\/u\]/gi, replacer: '<span class="underline decoration-sky-300">$1</span>' },
    { regex: /\[s\](.*?)\[\/s\]/gi, replacer: '<s>$1</s>' },
    { regex: /\[color=([#a-z0-9]+)\](.*?)\[\/color\]/gi, replacer: '<span style="color:$1">$2</span>' },
    { regex: /\[size=([0-9]+)\](.*?)\[\/size\]/gi, replacer: '<span style="font-size:$1px">$2</span>' },
    { regex: /\[center\](.*?)\[\/center\]/gis, replacer: '<div class="text-center">$1</div>' },
    { regex: /\[left\](.*?)\[\/left\]/gis, replacer: '<div class="text-left">$1</div>' },
    { regex: /\[right\](.*?)\[\/right\]/gis, replacer: '<div class="text-right">$1</div>' },
    {
      regex: /\[quote=([^\]]+)\](.*?)\[\/quote\]/gis,
      replacer:
        '<blockquote class="border-l-4 border-cyan-300/70 pl-3 my-3 text-slate-200"><div class="text-xs uppercase tracking-wide text-cyan-200/80 mb-1">$1</div>$2</blockquote>',
    },
    {
      regex: /\[quote\](.*?)\[\/quote\]/gis,
      replacer: '<blockquote class="border-l-4 border-cyan-300/70 pl-3 my-3 text-slate-200">$1</blockquote>',
    },
    {
      regex: /\[url=(["']?)([^\]]+?)\1\](.*?)\[\/url\]/gis,
      replacer: (_match, _quote, href, label) => {
        const cleaned = href.replace(/&amp;/g, '&').replace(/&quot;|&#0*39;|&apos;/g, '')
        const safeHref = normalizeUrl(cleaned)
        if (!safeHref) return label
        return `<a class="text-cyan-300 underline underline-offset-4" href="${safeHref}" target="_blank" rel="noopener noreferrer">${label}</a>`
      },
    },
    {
      regex: /\[url\](.*?)\[\/url\]/gis,
      replacer: (_match, href) => {
        const safeHref = normalizeUrl(href)
        if (!safeHref) return href
        return `<a class="text-cyan-300 underline underline-offset-4" href="${safeHref}" target="_blank" rel="noopener noreferrer">${href}</a>`
      },
    },
    {
      regex: /\[img\](.*?)\[\/img\]/gis,
      replacer: (_match, src) => {
        const safeSrc = normalizeUrl(src)
        if (!safeSrc) return ''
        return `<img class="max-w-full rounded-xl border border-white/5 shadow-md" src="${safeSrc}" alt="bbcode" />`
      },
    },
  ]

  replacements.forEach(({ regex, replacer }) => {
    safe = typeof replacer === 'string' ? safe.replace(regex, replacer) : safe.replace(regex, replacer)
  })

  safe = safe.replace(/__CODEBLOCK_(\d+)__/g, (_match, idx) => {
    const code = codeBlocks[Number(idx)] ?? ''
    return `<pre class="bg-slate-900/60 border border-white/5 rounded-lg p-3 overflow-auto text-amber-200 text-sm"><code>${code}</code></pre>`
  })

  safe = safe.replace(/\[list\]([\s\S]*?)\[\/list\]/gi, (_match, content) => parseList(content))
  safe = safe.replace(/\n/g, '<br />')
  return safe
}
