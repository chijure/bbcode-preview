type Props = {
  label: string
  title?: string
  onClick: () => void
}

const ToolbarButton = ({ label, title, onClick }: Props) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className="toolbar-btn px-2.5 py-1.5 rounded-md border border-white/10 bg-white/5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10"
  >
    {label}
  </button>
)

export default ToolbarButton
