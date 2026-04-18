// Compact horizontal gauge bar for the "Ajustar" tab.
// Replaces segments with a continuous gradient line for a distinct mobile experience.

const SEG_RED    = '#FF4D4D';
const SEG_ORANGE = '#FFA500';
const SEG_GREEN  = '#00E676';

interface MiniResultBarProps {
  label: string;
  value: number;
  maxValue: number;
  unit: string;
  badge?: string;
  animating?: boolean;
}

export function MiniResultBar({
  label,
  value,
  maxValue,
  unit,
  badge,
  animating = false,
}: MiniResultBarProps) {
  // Scale 0–120% range.
  const ratio = maxValue > 0 ? Math.min(value / maxValue, 1.2) : 0;
  const cursorPct = Math.min(ratio / 1.2, 1) * 100; 

  const displayValue = badge ?? (
    value >= 1000
      ? `${(value / 1000).toFixed(1)}k`
      : value >= 100
      ? value.toFixed(0)
      : value.toFixed(1)
  );

  // Gradient stops matching the safety zones: 14% R, 26% O, 20% G, 26% O, 14% R
  const gradient = `linear-gradient(to right, 
    ${SEG_RED} 0%, ${SEG_RED} 14%, 
    ${SEG_ORANGE} 14%, ${SEG_ORANGE} 40%, 
    ${SEG_GREEN} 40%, ${SEG_GREEN} 60%, 
    ${SEG_ORANGE} 60%, ${SEG_ORANGE} 86%, 
    ${SEG_RED} 86%, ${SEG_RED} 100%
  )`;

  return (
    <div
      className="flex flex-col gap-1.5"
      style={animating ? { animation: 'miniGaugeFlash 0.3s ease-out' } : undefined}
    >
      {/* Label row */}
      <div className="flex items-baseline justify-between px-0.5">
        <span className="text-[9px] uppercase tracking-widest text-white/40 font-semibold">{label}</span>
        <span className="font-mono text-xs font-bold text-white">
          {displayValue}
          <span className="text-[9px] text-white/35 ml-0.5">{unit}</span>
        </span>
      </div>

      {/* Continuous Gradient Track */}
      <div className="relative h-[4px] w-full bg-white/5 rounded-full overflow-hidden">
        {/* Background track opacity dimmed */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{ background: gradient }}
        />
        
        {/* Filled part (optional, or just use the cursor) */}
        <div 
          className="absolute inset-y-0 left-0 transition-all duration-100"
          style={{ 
            width: `${cursorPct}%`, 
            background: gradient,
            boxShadow: `0 0 10px rgba(255,255,255,0.1)`
          }}
        />
      </div>

      {/* Cursor & Scale Info */}
      <div className="relative h-[2px]">
        {/* The active cursor point */}
        <div
          className="absolute top-[-8px] h-[10px] w-[3px] bg-white rounded-full transition-all duration-100 z-10"
          style={{ 
            left: `calc(${cursorPct}% - 1.5px)`,
            boxShadow: '0 0 8px rgba(255,255,255,0.8), 0 0 2px black'
          }}
        />
        {/* Baseline */}
        <div className="absolute top-0 w-full h-[1px] bg-white/10" />
      </div>
    </div>
  );
}
