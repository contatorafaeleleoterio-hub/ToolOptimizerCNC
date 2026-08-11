import { useState } from 'react';

interface CollapsibleSectionProps {
  title: string;
  summary?: string;          // shown inline when closed (e.g. "Aço 1045 | Desbaste")
  defaultOpen?: boolean;     // default: false
  children: React.ReactNode;
  /** 'card' = no grid animation, children only mount when open (formula-card style). Default: 'default'. */
  variant?: 'default' | 'card';
  /** Custom header content (e.g. icon + result value layout). Receives current open state. */
  renderHeader?: (props: { isOpen: boolean }) => React.ReactNode;
  /** Fired after toggling, with the new open state — used for haptic feedback on touch devices. */
  onToggle?: (isOpen: boolean) => void;
}

export function CollapsibleSection({
  title, summary, defaultOpen = false, children, variant = 'default', renderHeader, onToggle,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => {
    setIsOpen((v) => {
      const next = !v;
      onToggle?.(next);
      return next;
    });
  };

  return (
    <div
      className={
        variant === 'card'
          ? 'bg-surface-dark backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden shadow-glass transition-all duration-300'
          : 'bg-card-dark rounded-xl border border-white/5 shadow-inner-glow overflow-hidden'
      }
    >
      {/* Header — always visible */}
      <button
        onClick={toggle}
        className={
          renderHeader
            ? 'w-full text-left'
            : 'w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 transition-colors'
        }
        aria-expanded={isOpen}
        aria-label={renderHeader ? `${isOpen ? 'Recolher' : 'Expandir'} ${title}` : undefined}
      >
        {renderHeader ? (
          renderHeader({ isOpen })
        ) : (
          <>
            <span className="text-sm font-bold uppercase tracking-widest text-gray-300">{title}</span>
            <div className="flex items-center gap-2">
              {!isOpen && summary && (
                <span className="text-sm text-gray-500 truncate max-w-[140px]">{summary}</span>
              )}
              <span
                className="material-symbols-outlined text-gray-500 transition-transform duration-300 text-base"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                expand_more
              </span>
            </div>
          </>
        )}
      </button>

      {variant === 'card' ? (
        isOpen && (
          <div
            className="border-t border-white/5 px-4 py-4 space-y-4"
            style={{ animation: 'fadeInUp 200ms ease-out' }}
          >
            {children}
          </div>
        )
      ) : (
        /* Animated content — grid-template-rows: 0fr → 1fr */
        <div
          style={{
            display: 'grid',
            gridTemplateRows: isOpen ? '1fr' : '0fr',
            transition: 'grid-template-rows 280ms ease',
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <div className="px-3 pb-3">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
