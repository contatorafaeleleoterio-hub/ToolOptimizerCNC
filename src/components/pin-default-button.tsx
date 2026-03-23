/**
 * PinDefaultButton — small 📌 button to pin a current input value as user default.
 * Pinned: #00D9FF (cyan primary). Unpinned: rgba(255,255,255,0.25).
 */

interface PinDefaultButtonProps {
  isPinned: boolean;
  onClick: () => void;
  label: string; // accessible label, e.g. "Fixar material como padrão"
}

export function PinDefaultButton({ isPinned, onClick, label }: PinDefaultButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="shrink-0 text-base leading-none hover:scale-110 transition-transform"
      style={{ color: isPinned ? '#00D9FF' : 'rgba(255,255,255,0.25)' }}
      title={label}
    >
      📌
    </button>
  );
}
