type Props = {
  title: string
  subtitle: string
  safeNote: string
  content: string
}

const PreviewPanel = ({ title, subtitle, safeNote, content }: Props) => (
  <section className="panel bg-slate-900/60 border border-white/5 rounded-2xl shadow-xl p-4 space-y-3">
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">{title}</p>
        <h2 className="text-xl font-semibold">{subtitle}</h2>
      </div>
      <div className="flex items-center gap-2 text-slate-300 text-sm">
        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-400 to-cyan-300" />
        {safeNote}
      </div>
    </div>
    <div
      id="preview"
      data-testid="preview"
      className="preview-block min-h-[280px] rounded-xl border border-white/10 bg-slate-950/60 p-4 leading-7 space-y-2"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </section>
)

export default PreviewPanel
