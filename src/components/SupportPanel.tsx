type Props = {
  tagsTitle: string
  tipsTitle: string
  tags: string[]
  tips: string[]
}

const SupportPanel = ({ tagsTitle, tipsTitle, tags, tips }: Props) => (
  <section className="panel bg-slate-900/60 border border-white/5 rounded-2xl shadow-xl p-4 grid md:grid-cols-2 gap-4">
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">{tagsTitle}</p>
      <ul className="mt-2 text-slate-300 space-y-2 list-disc list-inside">
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">{tipsTitle}</p>
      <ul className="mt-2 text-slate-300 space-y-2 list-disc list-inside">
        {tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </div>
  </section>
)

export default SupportPanel
