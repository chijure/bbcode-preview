import type { LanguageId } from '../constants'

type Props = {
  current: LanguageId
  options: Array<{ id: LanguageId; label: string }>
  onChange: (lng: LanguageId) => void
}

const LanguageSwitch = ({ current, options, onChange }: Props) => (
  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-sm">
    {options.map((lng) => {
      const active = current === lng.id
      return (
        <button
          key={lng.id}
          onClick={() => onChange(lng.id)}
          className={`px-2 py-1 rounded-full transition ${
            active ? 'bg-gradient-to-r from-amber-400/80 to-cyan-300/80 text-slate-900 font-semibold' : 'text-slate-200 hover:text-white'
          }`}
          aria-pressed={active}
        >
          {lng.label}
        </button>
      )
    })}
  </div>
)

export default LanguageSwitch
