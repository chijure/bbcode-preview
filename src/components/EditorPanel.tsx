import type { ChangeEvent, RefObject } from 'react'
import type { ChipConfig } from '../constants'
import type { TagKey } from '../utils/bbcode'
import TagChip from './TagChip'

type Props = {
  title: string
  subtitle: string
  chips: ChipConfig[]
  textareaRef: RefObject<HTMLTextAreaElement | null>
  value: string
  placeholder: string
  onChange: (value: string) => void
  onInsert: (tag: TagKey) => void
}

const EditorPanel = ({ title, subtitle, chips, textareaRef, value, placeholder, onChange, onInsert }: Props) => (
  <section className="panel bg-slate-900/60 border border-white/5 rounded-2xl shadow-xl p-4 space-y-3">
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">{title}</p>
        <h2 className="text-xl font-semibold">{subtitle}</h2>
      </div>
      <div className="flex gap-2 flex-wrap">
        {chips.map(({ key, label }) => (
          <TagChip key={key} label={label} onClick={() => onInsert(key)} />
        ))}
      </div>
    </div>
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
      spellCheck="false"
      className="w-full min-h-[320px] rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm leading-6 text-white focus:outline-none focus:border-cyan-300/60 font-mono"
      placeholder={placeholder}
    />
  </section>
)

export default EditorPanel
