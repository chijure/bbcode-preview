import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { languages, sample, toolbarButtons, type LanguageId } from './constants'
import EditorPanel from './components/EditorPanel'
import LanguageSwitch from './components/LanguageSwitch'
import PreviewPanel from './components/PreviewPanel'
import SupportPanel from './components/SupportPanel'
import { parseBBCode, type TagKey } from './utils/bbcode'

type Theme = 'dark' | 'light'

function App() {
  const { t, i18n } = useTranslation()
  const [input, setInput] = useState(sample)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const preview = useMemo(() => parseBBCode(input), [input])
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const changeLanguage = (lng: LanguageId) => {
    i18n.changeLanguage(lng)
  }

  const insertTag = (tag: TagKey) => {
    const textarea = textareaRef.current
    if (!textarea) return
    const { selectionStart, selectionEnd, value } = textarea
    const selected = value.slice(selectionStart, selectionEnd)

    const templates: Record<TagKey, string> = {
      bold: `[b]${selected || 'texto'}[/b]`,
      italic: `[i]${selected || 'texto'}[/i]`,
      underline: `[u]${selected || 'texto'}[/u]`,
      strike: `[s]${selected || 'texto'}[/s]`,
      link: `[url=${selected ? 'https://example.com' : 'https://example.com'}]${selected || 'enlace'}[/url]`,
      image: `[img]https://placekitten.com/400/240[/img]`,
      quote: `[quote=${selected || 'Autor'}]${selected || 'Texto citado'}[/quote]`,
      code: `[code]const hello = "world";[/code]`,
      list: `[list][*]Item 1[*]Item 2[/list]`,
      color: `[color=#00bcd4]${selected || 'texto'}[/color]`,
      size: `[size=18]${selected || 'texto grande'}[/size]`,
      center: `[center]${selected || 'texto centrado'}[/center]`,
      left: `[left]${selected || 'texto alineado a la izquierda'}[/left]`,
      right: `[right]${selected || 'texto alineado a la derecha'}[/right]`,
    }

    const snippet = templates[tag] || ''
    const nextValue = value.slice(0, selectionStart) + snippet + value.slice(selectionEnd)
    setInput(nextValue)

    requestAnimationFrame(() => {
      const cursor = selectionStart + snippet.length
      textarea.focus()
      textarea.setSelectionRange(cursor, cursor)
    })
  }

  const handleLoad = () => setInput(sample)
  const handleClear = () => setInput('')
  const currentLanguage: LanguageId = (['es', 'en'] as const).includes(i18n.resolvedLanguage as LanguageId)
    ? (i18n.resolvedLanguage as LanguageId)
    : 'es'
  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  const isLight = theme === 'light'
  const primaryBtnClass = isLight
    ? 'bg-gradient-to-r from-amber-300 to-cyan-300 text-slate-900 shadow-md hover:shadow-lg'
    : 'bg-gradient-to-r from-amber-400/80 to-cyan-300/80 text-slate-900 shadow-lg hover:shadow-xl'
  const secondaryBtnClass = isLight
    ? 'border border-slate-300 bg-white text-slate-800 hover:border-slate-400'
    : 'border border-white/10 text-white hover:border-white/25 bg-white/5'
  const themeBtnClass = isLight
    ? 'border border-slate-300 bg-white text-slate-800 hover:border-slate-400'
    : 'border border-white/10 text-white hover:border-white/25 bg-white/5'

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark')
    document.body.classList.add(isLight ? 'theme-light' : 'theme-dark')
  }, [isLight])

  return (
    <div className={`${isLight ? 'theme-light text-slate-900' : 'theme-dark text-slate-100'} max-w-7xl mx-auto px-5 py-6 space-y-4`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <LanguageSwitch current={currentLanguage} options={languages} onChange={changeLanguage} />

        <div className="flex gap-2 flex-wrap">
          <button
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${primaryBtnClass}`}
            onClick={handleLoad}
          >
            {t('load_example')}
          </button>
          <button
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${secondaryBtnClass}`}
            onClick={handleClear}
          >
            {t('clear')}
          </button>
          <button
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${themeBtnClass}`}
            onClick={toggleTheme}
          >
            {isLight ? 'Modo oscuro' : 'Modo claro'}
          </button>
        </div>
      </div>

      <main className="grid md:grid-cols-2 gap-4">
        <EditorPanel
          title={t('editor')}
          subtitle={t('write_bbcode')}
          buttons={toolbarButtons}
          textareaRef={textareaRef}
          value={input}
          placeholder={t('placeholder')}
          onChange={setInput}
          onInsert={insertTag}
        />
        <PreviewPanel title={t('preview')} subtitle={t('rendered_html')} safeNote="" content={preview} />
      </main>

      <SupportPanel
        tagsTitle={t('supported_tags')}
        tipsTitle={t('tips')}
        tags={[t('tags_line1'), t('tags_line2'), t('tags_line3')]}
        tips={[t('tip_escape'), t('tip_url'), t('tip_list')]}
      />
    </div>
  )
}

export default App
