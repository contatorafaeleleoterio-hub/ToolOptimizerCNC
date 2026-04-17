// Compact horizontal gauge bar for the "Ajustar" tab.
// Replaces HalfMoonGauge (160×80px) with a ~40px tall bar strip.

const SEG_RED    = '#FF4D4D';
const SEG_ORANGE = '#FFA500';
const SEG_GREEN  = '#00E676';

function segmentColor(idx: number, total: number): string {
  const pct = idx / total;
  if (pct < 0.14) return SEG_RED;
  if (pct < 0.40) return SEG_ORANGE;
  if (pct < 0.60) return SEG_GREEN;
  if (pct < 0.86) return SEG_ORANGE;
  return SEG_RED;
}

interface MiniResultBarProps {
  label: string;
  value: number;
  maxValue: number;
  unit: string;
  badge?: string;
  segments?: number;
  animating?: boolean;
}

export function MiniResultBar({
  label,
  value,
  maxValue,
  unit,
  badge,
  segments = 20,
  animating = false,
}: MiniResultBarProps) {
  const ratio = maxValue > 0 ? Math.min(value / maxValue, 1.2) : 0;
  const cursorPct = Math.min(ratio / 1.2, 1) * 100; // scale 0–120% → 0–100% display
  const activeSeg = Math.round(ratio * segments);

  const displayValue = badge ?? (
    value >= 1000
      ? `${(value / 1000).toFixed(1)}k`
      : value >= 100
      ? value.toFixed(0)
      : value.toFixed(1)
  );

  return (
    <div
      className="flex flex-col gap-1"
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

      {/* Segment bar */}
      <div className="flex gap-[2px] items-end h-[14px]">
        {Array.from({ length: segments }).map((_, i) => {
          const isActive = i < activeSeg;
          const color = segmentColor(i, segments);
          return (
            <div
              key={i}
              className="flex-1 rounded-[1px] transition-opacity duration-150"
              style={{
                height: isActive ? '14px' : '8px',
                background: isActive ? color : 'rgba(255,255,255,0.06)',
                boxShadow: isActive ? `0 0 4px ${color}55` : undefined,
              }}
            />
          );
        })}
      </div>

      {/* Cursor line */}
      <div className="relative h-[2px] bg-white/5 rounded-full">
        <div
          className="absolute top-0 h-full w-[3px] bg-white rounded-full shadow-[0_0_4px_rgba(255,255,255,0.8)]"
          style={{ left: `calc(${cursorPct}% - 1.5px)` }}
        />
      </div>
    </div>
  );
}
