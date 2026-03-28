import { useMemo } from 'react';
import { useSimulationAnimation } from '@/hooks/use-simulation-animation';

// ─── Types ────────────────────────────────────────────────────────────────────

type ColorPalette = 'avanco' | 'power' | 'health' | 'mrr';

interface HalfMoonGaugeProps {
  value: number;
  maxValue: number;
  label?: string;
  palette?: ColorPalette;
  badge?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TOTAL_BARS = 41;
const MAX_PCT    = 150;

// Arc: -90° to +90° (180° total), step = 180/40 = 4.5° per bar
const ARC_START_DEG = -90;
const ARC_STEP_DEG  = 180 / (TOTAL_BARS - 1);

// Color tokens
const SEG_RED    = '#FF4D4D';
const SEG_ORANGE = '#FFA500';
const SEG_GREEN  = '#00E676';
const SEG_EMPTY  = '#313742';

// Static color map for 41 bars: 8 RED · 8 ORANGE · 9 GREEN · 8 ORANGE · 8 RED
function barColor(idx: number): string {
  if (idx <= 7)  return SEG_RED;
  if (idx <= 15) return SEG_ORANGE;
  if (idx <= 24) return SEG_GREEN;
  if (idx <= 32) return SEG_ORANGE;
  return SEG_RED;
}

function barGlow(idx: number): string {
  const color = barColor(idx);
  return `0 0 8px ${color}66`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HalfMoonGauge({
  value,
  maxValue,
  label = 'Indicador',
  badge,
}: HalfMoonGaugeProps) {
  const { gaugeAnimating } = useSimulationAnimation();
  const pct         = Math.min((value / maxValue) * 100, MAX_PCT);
  const activeCount = Math.round((pct / MAX_PCT) * TOTAL_BARS);

  // Needle angle: -90° at 0%, +90° at MAX_PCT
  const needleAngle = ARC_START_DEG + (pct / MAX_PCT) * 180;

  const bars = useMemo(
    () =>
      Array.from({ length: TOTAL_BARS }, (_, i) => ({
        angle:  ARC_START_DEG + i * ARC_STEP_DEG,
        isGreen: i >= 16 && i <= 24,
      })),
    [],
  );

  return (
    <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-4 shadow-glass flex flex-col items-center">
      {label && (
        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">
          {label}
        </span>
      )}

      {/* Gauge arc */}
      <div
        style={{
          position: 'relative',
          width: '240px',
          height: '120px',
          overflow: 'visible',
        }}
        data-testid="gauge-svg"
      >
        {/* Bars */}
        {bars.map(({ angle, isGreen }, i) => {
          const active = i < activeCount;
          return (
            <div
              key={i}
              data-testid={active ? 'gauge-segment-active' : 'gauge-bar'}
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                height: '120px',
                transformOrigin: 'center bottom',
                transform: `translateX(-50%) rotate(${angle}deg)`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width:  isGreen ? '6px' : '5px',
                  height: isGreen ? '26px' : '20px',
                  borderRadius: '2px',
                  background: active ? barColor(i) : SEG_EMPTY,
                  opacity:    active ? 1 : 0.3,
                  boxShadow:  active ? barGlow(i) : 'none',
                }}
              />
            </div>
          );
        })}

        {/* Needle */}
        <div
          data-testid="gauge-needle"
          style={{
            position:        'absolute',
            bottom:          '-5px',
            left:            '50%',
            width:           '3px',
            height:          '90px',
            background:      '#fff',
            borderRadius:    '10px',
            boxShadow:       '0 0 12px rgba(255,255,255,0.7), 0 0 2px black',
            transformOrigin: 'center bottom',
            transform:       `translate(-50%, 0) rotate(${needleAngle}deg)`,
            zIndex:          10,
          }}
        >
          {/* Needle base circle */}
          <div
            style={{
              position:     'absolute',
              bottom:       '-7px',
              left:         '50%',
              transform:    'translateX(-50%)',
              width:        '14px',
              height:       '14px',
              borderRadius: '50%',
              background:   '#fff',
              border:       '2px solid #14161a',
              boxShadow:    '0 0 5px rgba(255,255,255,0.5)',
            }}
          />
        </div>
      </div>

      {/* Value display */}
      <div
        className={`flex flex-col items-center mt-4 transition-all duration-450 ${gaugeAnimating ? 'scale-110' : ''}`}
      >
        {badge ? (
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-white font-mono">{Math.round(pct)}</span>
            <span className="text-xs text-gray-400 text-center max-w-24 leading-tight">{badge}</span>
          </div>
        ) : (
          <div className="flex items-baseline gap-0.5">
            <span className="text-5xl font-bold text-white font-mono">{Math.round(pct)}</span>
            <span className="text-xl text-gray-500">%</span>
          </div>
        )}
      </div>
    </div>
  );
}
