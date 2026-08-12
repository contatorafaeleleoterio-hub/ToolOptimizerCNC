import { useMemo, useState, useEffect, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface HalfMoonGaugeProps {
  value: number;
  maxValue: number;
  label?: string;
  badge?: string;
  /** 'md' = desktop (240×120), 'sm' = mobile (160×80). Default: 'md'. */
  size?: 'sm' | 'md';
  /** When true, animates needle+bars from 0→value via rAF with easeOutBack on value change. */
  animateOnMount?: boolean;
  /** Percentage at the end of the arc. Default: 150 (100% sits mid-scale). */
  scaleMax?: number;
  /**
   * 'centered' = green mid-scale (100% is the target, above it is overload).
   * 'ascending' = green at the end (higher is better, e.g. health score).
   */
  colorMode?: 'centered' | 'ascending';
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TOTAL_BARS   = 41;
const DEFAULT_SCALE = 150;
const ANIM_MS      = 280;

// Arc: -90° to +90° (180° total), step = 180/40 = 4.5° per bar
const ARC_START_DEG = -90;
const ARC_STEP_DEG  = 180 / (TOTAL_BARS - 1);

// Color tokens
const SEG_RED    = '#FF4D4D';
const SEG_ORANGE = '#FFA500';
const SEG_GREEN  = '#00E676';
const SEG_EMPTY  = '#313742';

type ColorMode = 'centered' | 'ascending';

/** Position of a bar along the arc, 0–100. */
function barPct(idx: number): number {
  return (idx / (TOTAL_BARS - 1)) * 100;
}

/**
 * 'centered': 8 RED · 8 ORANGE · 9 GREEN · 8 ORANGE · 8 RED (green mid-scale).
 * 'ascending': red → orange → green, split at 40% and 76% of the arc — the same
 * cutoffs getHealthLevel() uses, so a 0–100 health scale matches its own colors.
 */
function barColor(idx: number, mode: ColorMode): string {
  if (mode === 'ascending') {
    const pct = barPct(idx);
    if (pct < 40) return SEG_RED;
    if (pct < 76) return SEG_ORANGE;
    return SEG_GREEN;
  }
  if (idx <= 7)  return SEG_RED;
  if (idx <= 15) return SEG_ORANGE;
  if (idx <= 24) return SEG_GREEN;
  if (idx <= 32) return SEG_ORANGE;
  return SEG_RED;
}

function barGlow(idx: number, mode: ColorMode): string {
  const color = barColor(idx, mode);
  return `0 0 8px ${color}66`;
}

// easeOutBack: slight overshoot then settles — validated formula from story spec
function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

// ─── Size lookup ─────────────────────────────────────────────────────────────

const SIZES = {
  md: { width: 240, height: 120, needleH: 90, barGreen: 26, barNormal: 20 },
  sm: { width: 160, height: 80,  needleH: 60, barGreen: 17, barNormal: 14 },
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

export function HalfMoonGauge({
  value,
  maxValue,
  label = 'Indicador',
  badge,
  size = 'md',
  animateOnMount = false,
  scaleMax = DEFAULT_SCALE,
  colorMode = 'centered',
}: HalfMoonGaugeProps) {
  const sz = SIZES[size];
  const targetPct = Math.min(maxValue > 0 ? (value / maxValue) * 100 : 0, scaleMax);

  const [displayPct, setDisplayPct] = useState(() => (animateOnMount ? 0 : targetPct));
  const rafRef = useRef<number | null>(null);
  const displayPctRef = useRef(displayPct);

  useEffect(() => {
    if (!animateOnMount) {
      setDisplayPct(targetPct);
      displayPctRef.current = targetPct;
      return;
    }

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    const startPct = displayPctRef.current;
    if (Math.abs(targetPct - startPct) < 0.01) return;
    const startTime = performance.now();

    const animate = (now: number) => {
      const t = Math.min((now - startTime) / ANIM_MS, 1);
      const nextPct = startPct + (targetPct - startPct) * easeOutCubic(t);
      displayPctRef.current = nextPct;
      setDisplayPct(nextPct);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        displayPctRef.current = targetPct;
        setDisplayPct(targetPct);
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [value, maxValue, animateOnMount, targetPct]);

  const activeCount = Math.round((displayPct / scaleMax) * TOTAL_BARS);
  const needleAngle = ARC_START_DEG + (displayPct / scaleMax) * 180;

  const bars = useMemo(
    () =>
      Array.from({ length: TOTAL_BARS }, (_, i) => ({
        angle:  ARC_START_DEG + i * ARC_STEP_DEG,
        isGreen: colorMode === 'ascending' ? barPct(i) >= 76 : i >= 16 && i <= 24,
      })),
    [colorMode],
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
          width: `${sz.width}px`,
          height: `${sz.height}px`,
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
                height: `${sz.height}px`,
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
                  height: isGreen ? `${sz.barGreen}px` : `${sz.barNormal}px`,
                  borderRadius: '2px',
                  background: active ? barColor(i, colorMode) : SEG_EMPTY,
                  opacity:    active ? 1 : 0.3,
                  boxShadow:  active ? barGlow(i, colorMode) : 'none',
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
            height:          `${sz.needleH}px`,
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
      <div className="flex flex-col items-center mt-4">
        {badge ? (
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-white font-mono">{Math.round(displayPct)}</span>
            <span className="text-xs text-gray-400 text-center max-w-24 leading-tight whitespace-pre-line">{badge}</span>
          </div>
        ) : (
          <div className="flex items-baseline gap-0.5">
            <span className="text-5xl font-bold text-white font-mono">{Math.round(displayPct)}</span>
            <span className="text-xl text-gray-500">%</span>
          </div>
        )}
      </div>
    </div>
  );
}
