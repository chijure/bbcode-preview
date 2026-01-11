type Props = {
  label: string
  onClick: () => void
}

const TagChip = ({ label, onClick }: Props) => (
  <button
    onClick={onClick}
    className="chip px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
  >
    {label}
  </button>
)

export default TagChip
