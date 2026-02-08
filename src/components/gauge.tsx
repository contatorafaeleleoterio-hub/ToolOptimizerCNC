export function getQualityLabel(pct: number): string {
  if (pct < 40) return 'Low';
  if (pct < 70) return 'Good';
  if (pct < 90) return 'High';
  return 'Max';
}

const QUALITY_COLORS: Record<string, string> = {
  Low: 'text-seg-vermelho',
  Good: 'text-secondary',
  High: 'text-primary',
  Max: 'text-seg-amarelo',
};

interface GaugeProps {
  value: number;
  maxValue: number;
  label?: string;
}

export function Gauge({ value, maxValue, label = 'Efficiency' }: GaugeProps) {
  const pct = Math.min(Math.max(Math.round((value / maxValue) * 100), 0), 100);
  const qualityLabel = getQualityLabel(pct);

  // Arc geometry: semi-circle from (10,50) to (90,50), radius 40, center (50,50)
  const R = 40;
  const CX = 50;
  const CY = 50;
  const totalArcLen = Math.PI * R; // ~125.66
  const angle = (pct / 100) * Math.PI; // 0 to PI radians

  // End point of filled arc (sweeping left to right on a top semi-circle)
  const endX = CX - R * Math.cos(angle);
  const endY = CY - R * Math.sin(angle);

  // Large arc flag: 1 if angle > PI/2 (i.e., pct > 50)
  const largeArc = pct > 50 ? 1 : 0;

  const filledPath = pct === 0
    ? ''
    : `M ${CX - R} ${CY} A ${R} ${R} 0 ${largeArc} 1 ${endX.toFixed(2)} ${endY.toFixed(2)}`;

  return (
    <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-4 shadow-glass flex flex-col items-center">
      {label && (
        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">{label}</span>
      )}
      <div className="relative w-32 h-16 flex justify-center items-end">
        <svg viewBox="0 0 100 50" className="w-32 h-16">
          <defs>
            <linearGradient id="gauge-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#00D9FF' }} />
              <stop offset="100%" style={{ stopColor: '#39FF14' }} />
            </linearGradient>
          </defs>
          {/* Background arc */}
          <path
            d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeLinecap="round"
            strokeWidth="6"
          />
          {/* Filled arc */}
          {pct > 0 && (
            <path
              d={filledPath}
              fill="none"
              stroke="url(#gauge-gradient)"
              strokeLinecap="round"
              strokeWidth="6"
              strokeDasharray={totalArcLen}
              strokeDashoffset="0"
              className="drop-shadow-[0_0_8px_rgba(57,255,20,0.4)]"
            />
          )}
        </svg>
        <div className="absolute bottom-0 flex flex-col items-center">
          <span className="text-xl font-bold text-white font-mono leading-none tracking-tighter">{pct}</span>
          <span className={`text-[7px] font-bold uppercase tracking-[0.2em] mb-1 ${QUALITY_COLORS[qualityLabel]}`}>
            {qualityLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
