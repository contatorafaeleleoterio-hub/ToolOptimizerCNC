import { useMemo } from 'react';
import { useSimulationAnimation } from '@/hooks/use-simulation-animation';

interface GaugeProps {
  value: number;
  maxValue: number;
  label?: string;
}

const TOTAL_SEGMENTS = 40;
const ARC_DEG = 270;
const START_DEG = -135;
const MAX_PCT = 150;
const R = 80;
const CX = 100;
const CY = 100;

const SCALE_MARKS = [0, 20, 40, 60, 80, 100, 120, 140, 150];

export function getSegmentColor(idx: number): string {
  const pct = (idx / TOTAL_SEGMENTS) * MAX_PCT;
  if (pct <= 50) return '#39FF14';
  if (pct <= 100) return '#00FF88';
  if (pct <= 120) return '#00D9FF';
  return '#FFD700';
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function arcPath(startDeg: number, endDeg: number): string {
  const x1 = CX + R * Math.cos(toRad(startDeg));
  const y1 = CY + R * Math.sin(toRad(startDeg));
  const x2 = CX + R * Math.cos(toRad(endDeg));
  const y2 = CY + R * Math.sin(toRad(endDeg));
  return `M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`;
}

function markerPos(val: number): { x: number; y: number } {
  const angle = START_DEG + (val / MAX_PCT) * ARC_DEG;
  return {
    x: CX + 95 * Math.cos(toRad(angle)),
    y: CY + 95 * Math.sin(toRad(angle)),
  };
}

export function Gauge({ value, maxValue, label = 'Eficiência' }: GaugeProps) {
  const { gaugeAnimating } = useSimulationAnimation();
  const pct = Math.min((value / maxValue) * 100, MAX_PCT);
  const activeCount = Math.round((pct / MAX_PCT) * TOTAL_SEGMENTS);
  const isCritical = pct > 120;

  const segments = useMemo(() =>
    Array.from({ length: TOTAL_SEGMENTS }, (_, i) => {
      const segDeg = ARC_DEG / TOTAL_SEGMENTS;
      const gap = 3;
      const startAngle = START_DEG + i * segDeg;
      const endAngle = startAngle + segDeg - gap;
      return { startAngle, endAngle };
    }), []);

  return (
    <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-4 shadow-glass flex flex-col items-center">
      {label && <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">{label}</span>}
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 200 200" className="w-40 h-40" data-testid="gauge-svg">
          <defs>
            <filter id="gauge-glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Inactive track */}
          <g className="opacity-10">
            {segments.map((seg, i) => (
              <path key={`t-${i}`} d={arcPath(seg.startAngle, seg.endAngle)} stroke="white" fill="none" strokeWidth="8" />
            ))}
          </g>

          {/* Active segments */}
          <g filter="url(#gauge-glow)">
            {segments.map((seg, i) =>
              i < activeCount ? (
                <path key={`a-${i}`} d={arcPath(seg.startAngle, seg.endAngle)}
                  stroke={getSegmentColor(i)} fill="none" strokeWidth="8"
                  className={isCritical ? 'animate-pulse' : ''}
                  data-testid="gauge-segment-active" />
              ) : null
            )}
          </g>

          {/* Scale markers */}
          {SCALE_MARKS.map((val) => {
            const { x, y } = markerPos(val);
            return (
              <text key={val} x={x} y={y} textAnchor="middle" dominantBaseline="central"
                fill={val === 100 ? '#00D9FF' : '#6b7280'}
                fontSize={val === 100 ? 14 : 11}
                fontWeight={val === 100 ? 'bold' : 'normal'}
                data-testid={`scale-${val}`}>
                {val}
              </text>
            );
          })}
        </svg>

        {/* Center display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`transition-all duration-450 ${gaugeAnimating ? 'scale-110' : ''} ${isCritical ? 'animate-pulse' : ''}`}>
            <span className="text-5xl font-bold text-white font-mono">{Math.round(pct)}</span>
            <span className="text-xl text-gray-500">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
