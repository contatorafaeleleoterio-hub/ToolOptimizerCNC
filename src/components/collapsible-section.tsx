import { useState } from 'react';

interface CollapsibleSectionProps {
  title: string;
  summary?: string;          // shown inline when closed (e.g. "Aço 1045 | Desbaste")
  defaultOpen?: boolean;     // default: false
  children: React.ReactNode;
}

export function CollapsibleSection({
  title, summary, defaultOpen = false, children,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-card-dark rounded-xl border border-white/5 shadow-inner-glow overflow-hidden">
      {/* Header — always visible */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-xs font-bold uppercase tracking-widest text-gray-300">{title}</span>
        <div className="flex items-center gap-2">
          {!isOpen && summary && (
            <span className="text-xs text-gray-500 truncate max-w-[140px]">{summary}</span>
          )}
          <span
            className="material-symbols-outlined text-gray-500 transition-transform duration-300 text-base"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            expand_more
          </span>
        </div>
      </button>

      {/* Animated content — grid-template-rows: 0fr → 1fr */}
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
    </div>
  );
}
