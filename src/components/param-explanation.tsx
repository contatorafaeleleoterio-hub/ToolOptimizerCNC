import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-is-mobile';

interface ParamExplanationProps {
  fullLabel: string;       // ex: "VEL. DE CORTE"
  explanationText: string; // desc do SLIDER_VISUAL
}

export function ParamExplanation({ fullLabel, explanationText }: ParamExplanationProps) {
  const isMobile = useIsMobile();
  const [showPopover, setShowPopover] = useState(false);

  const handleMouseEnter = () => { if (!isMobile) setShowPopover(true); };
  const handleMouseLeave = () => { if (!isMobile) setShowPopover(false); };
  const handleClick = () => { if (isMobile) setShowPopover((v) => !v); };

  return (
    <div className="relative">
      <button
        aria-label={`O que é ${fullLabel}?`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="w-full flex items-center justify-center gap-1.5 px-2 py-1 rounded-md
                   border border-cyan-400/40 bg-cyan-500/10 text-cyan-400 text-xs
                   hover:bg-cyan-500/20 hover:border-cyan-400/60 transition-all"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>info</span>
        <span className="font-medium tracking-wide">O QUE É {fullLabel}?</span>
      </button>

      {showPopover && (
        <div
          role="tooltip"
          className="absolute bottom-full mb-2 left-0 right-0 z-10
                     bg-gray-900 border border-cyan-400/40 rounded-lg p-3
                     backdrop-blur-sm shadow-lg"
        >
          <p className="text-xs text-gray-300 leading-relaxed">{explanationText}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2
                          border-4 border-transparent border-t-cyan-400/40" />
        </div>
      )}
    </div>
  );
}
