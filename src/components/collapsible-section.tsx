import { useState } from 'react';

interface CollapsibleSectionProps {
  title: string;
  summary?: string;          // shown inline when closed (e.g. "Aço 1045 | Desbaste")
  defaultOpen?: boolean;     // default: false
  children: React.ReactNode;
  pulsing?: boolean;         // NEW: for onboarding highlight
}

export function CollapsibleSection({
  title, summary, defaultOpen = false, children, pulsing = false,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div 
      className={`bg-card-dark rounded-xl border transition-all duration-500 shadow-inner-glow overflow-hidden ${
        pulsing 
          ? 'border-cyan-400/60 shadow-[0_0_15px_rgba(0,217,255,0.2)] animate-[drawerPulse_2s_infinite]' 
          : 'border-white/5'
      }`}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 transition-colors relative"
        aria-expanded={isOpen}
      >
        <span className={`text-sm font-bold uppercase tracking-widest transition-colors ${
          pulsing ? 'text-cyan-400' : 'text-gray-300'
        }`}>{title}</span>
        <div className="flex items-center gap-2">
          {!isOpen && pulsing && (
            <span className="text-[10px] font-bold text-cyan-400 animate-pulse mr-1">↑ ABRA AQUI</span>
          )}
          {!isOpen && summary && (
            <span className="text-[13px] text-gray-500 truncate max-w-[140px]">{summary}</span>
          )}
          <span
            className={`material-symbols-outlined transition-all duration-300 text-base ${
              pulsing ? 'text-cyan-400' : 'text-gray-500'
            }`}
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            expand_more
          </span>
        </div>
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes drawerPulse {
          0%, 100% { border-color: rgba(0, 217, 255, 0.3); }
          50% { border-color: rgba(0, 217, 255, 0.9); box-shadow: 0 0 12px rgba(0, 217, 255, 0.4); }
        }
      `}} />


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
