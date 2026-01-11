type Props = {
  eyebrow: string
  title: string
  description: string
}

const Hero = ({ eyebrow, title, description }: Props) => (
  <header className="bg-slate-900/60 border border-white/5 shadow-xl rounded-xl p-4 md:p-5">
    <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-200">{eyebrow}</p>
    <h1 className="text-xl md:text-2xl font-semibold leading-tight mt-1">{title}</h1>
    <p className="text-slate-300 text-sm md:text-base mt-1.5 max-w-2xl">{description}</p>
  </header>
)

export default Hero
