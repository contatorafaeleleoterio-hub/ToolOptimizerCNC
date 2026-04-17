import type { ReactNode } from 'react';
import { useMachiningStore } from '@/store';
import { MATERIAIS } from '@/data';
import { calcularSliderBounds } from '@/engine';
import {
  computeVcByValue,
  computeFzByValue,
  computeAeByValue,
  computeApByValue,
} from './parameter-health-bar';

// ─── Color tokens ─────────────────────────────────────────────────────────────
const SEG_RED    = '#FF4D4D';
const SEG_ORANGE = '#FFA500';
const SEG_GREEN  = '#00E676';

// Proportional color map: 14% RED · 26% ORANGE · 20% GREEN · 26% ORANGE · 14% RED
// Works for any segment count (50 desktop, 30 mobile, etc.)
function segmentColor(idx: number, total: number): string {
  const pct = idx / total;
  if (pct < 0.14) return SEG_RED;
  if (pct < 0.40) return SEG_ORANGE;
  if (pct < 0.60) return SEG_GREEN;
  if (pct < 0.86) return SEG_ORANGE;
  return SEG_RED;
}

function segmentGlow(idx: number, total: number): string {
  const color = segmentColor(idx, total);
  return `0 0 8px ${color}44`;
}

// Zone label color (matching the zone semantics from parameter-health-bar)
const ZONE_RGB: Record<string, string> = {
  verde:    '46,204,113',
  amarelo:  '243,156,18',
  vermelho: '231,76,60',
};

const DEFAULT_SEGMENTS = 50;

// ─── Sub-component: active segmented bar ──────────────────────────────────────

interface SegBarProps {
  paramKey: string;
  position: number;     // [0, 1] — cursor position
  zone: string;
  zoneLabel: string;
  leftLabel: string;
  rightLabel: string;
  badge?: string | null;
  readout?: ReactNode;
  segments?: number;
  /** Dynamic ideal zone from favorites. [0-1] fractional position in the bar. */
  idealRange?: { start: number; end: number };
}

function SegBar({ paramKey, position, zone, zoneLabel, leftLabel, rightLabel, badge, readout, segments = DEFAULT_SEGMENTS, idealRange }: SegBarProps) {
  const rgb = ZONE_RGB[zone] ?? '46,204,113';
  const cursorPct = Math.min(100, Math.max(0, position * 100));
  // How many segments are "active" (to the left of cursor)
  const activeCount = Math.round((cursorPct / 100) * segments);

  // Zone overlay position: dynamic when idealRange provided, fixed 40%-60% otherwise
  const zoneLeft = idealRange ? `${idealRange.start * 100}%` : '40%';
  const zoneWidth = idealRange ? `${(idealRange.end - idealRange.start) * 100}%` : '20%';

  return (
    <div data-testid={`health-bar-${paramKey}`} className="flex flex-col gap-0.5">
      <div className="relative" style={{ height: '28px' }}>
        {/* Ideal zone highlight — dynamic when idealRange provided, fixed 40%–60% otherwise */}
        <div
          data-testid="zone-overlay"
          className="absolute"
          style={{
            left: zoneLeft,
            width: zoneWidth,
            top: 0,
            bottom: 0,
            background: 'rgba(0,230,118,0.03)',
            borderLeft: '1px solid rgba(255,255,255,0.1)',
            borderRight: '1px solid rgba(255,255,255,0.1)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Segment track */}
        <div
          className="absolute inset-x-0"
          style={{
            top: '3px',
            height: '22px',
            display: 'flex',
            gap: '2px',
            zIndex: 1,
          }}
        >
          {Array.from({ length: segments }, (_, i) => {
            const active = i < activeCount;
            const segPct = i / segments;
            const isInIdealZone = idealRange !== undefined &&
              segPct >= idealRange.start &&
              segPct <= idealRange.end;

            // When idealRange provided: in-zone = full opacity, out-of-zone = dimmed.
            // When no idealRange: preserve existing active/inactive distinction.
            const opacity = idealRange !== undefined
              ? (isInIdealZone ? 1.0 : 0.65)
              : (active ? 1 : 0.3);

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  borderRadius: '2px',
                  background: active ? segmentColor(i, segments) : 'rgba(255,255,255,0.1)',
                  opacity,
                  boxShadow: active ? segmentGlow(i, segments) : 'none',
                  borderTop: isInIdealZone ? '2px solid rgba(0,230,118,0.7)' : '2px solid transparent',
                }}
              />
            );
          })}
        </div>

        {/* Cursor — Apple-style white pill */}
        <div
          style={{
            position: 'absolute',
            left: `${cursorPct}%`,
            top: '50%',
            width: '3px',
            height: '28px',
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0 0 12px rgba(255,255,255,0.8), 0 0 2px black',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      </div>

      {/* Labels row */}
      <div className="flex justify-between items-center">
        <span className="text-[10px] text-gray-700">{leftLabel}</span>
        <span className="text-[10px] font-semibold" style={{ color: `rgba(${rgb},1)` }}>
          {zoneLabel}
        </span>
        {badge && (
          <span
            data-testid="ctf-badge"
            className="text-[10px] font-bold px-1 rounded"
            style={{ background: 'rgba(243,156,18,0.15)', color: 'rgba(243,156,18,0.9)' }}
          >
            {badge}
          </span>
        )}
        {readout}
        <span className="text-[10px] text-gray-700">{rightLabel}</span>
      </div>
    </div>
  );
}

/** Grayed-out inactive bar (fz before Simular). */
function InactiveSeg({ paramKey, segments = DEFAULT_SEGMENTS }: { paramKey: string; segments?: number }) {
  return (
    <div data-testid={`health-bar-${paramKey}`} className="flex flex-col gap-0.5">
      <div data-testid={`health-bar-${paramKey}-inactive`} style={{ height: '28px', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: '3px',
            left: 0,
            right: 0,
            height: '22px',
            display: 'flex',
            gap: '2px',
          }}
        >
          {Array.from({ length: segments }, (_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                borderRadius: '2px',
                background: 'rgba(255,255,255,0.06)',
              }}
            />
          ))}
        </div>
      </div>
      <span className="text-[10px] text-gray-700 italic text-center leading-none">Simular para ativar</span>
    </div>
  );
}

// ─── Main exported component ──────────────────────────────────────────────────

interface SegmentedGradientBarProps {
  paramKey: 'vc' | 'fz' | 'ae' | 'ap';
  /** Number of segments to render. Default 50 (desktop). Use 30 for mobile. */
  segments?: number;
  /** Dynamic ideal zone from favorites store. [0-1] fractional position. */
  idealRange?: { start: number; end: number };
}

/** Segmented gradient health indicator. Replaces ParameterHealthBar visually. */
export function SegmentedGradientBar({ paramKey, segments = DEFAULT_SEGMENTS, idealRange }: SegmentedGradientBarProps) {
  const resultado    = useMachiningStore((s) => s.resultado);
  const parametros   = useMachiningStore((s) => s.parametros);
  const ferramenta   = useMachiningStore((s) => s.ferramenta);
  const materialId   = useMachiningStore((s) => s.materialId);
  const tipoOperacao = useMachiningStore((s) => s.tipoOperacao);

  const material = MATERIAIS.find((m) => m.id === materialId) ?? null;
  const bounds   = calcularSliderBounds(material, ferramenta, tipoOperacao);

  if (paramKey === 'vc') {
    const r      = computeVcByValue(parametros.vc, bounds.vc.recomendado, bounds.vc.max);
    return (
      <SegBar paramKey="vc" position={r.position} zone={r.zone} zoneLabel={r.zoneLabel}
        leftLabel="Baixo" rightLabel="Desgaste" segments={segments} idealRange={idealRange} />
    );
  }

  if (paramKey === 'fz') {
    if (!resultado) return <InactiveSeg paramKey="fz" segments={segments} />;
    const r = computeFzByValue(resultado.fzEfetivo, bounds.fz.recomendado, bounds.fz.max, resultado.seguranca.ctf);
    return (
      <SegBar paramKey="fz" position={r.position} zone={r.zone} zoneLabel={r.zoneLabel}
        leftLabel="Atrito" rightLabel="Vibração" badge={r.ctfBadge} segments={segments} idealRange={idealRange} />
    );
  }

  if (paramKey === 'ae') {
    const r = computeAeByValue(parametros.ae, bounds.ae.recomendado, bounds.ae.max, ferramenta.diametro);
    return (
      <SegBar paramKey="ae" position={r.position} zone={r.zone} zoneLabel={r.zoneLabel}
        leftLabel="CTF Alto" rightLabel="Excessivo" segments={segments} idealRange={idealRange}
        readout={
          <span data-testid="ae-ratio-display" className="text-[10px] text-gray-500 font-mono">
            {r.aeDRatioDisplay}
          </span>
        }
      />
    );
  }

  // ap
  const r = computeApByValue(parametros.ap, bounds.ap.recomendado, bounds.ap.max, ferramenta.diametro, ferramenta.balanco);
  return (
    <SegBar paramKey="ap" position={r.position} zone={r.zone} zoneLabel={r.zoneLabel}
      leftLabel="Leve" rightLabel="Deflexão" segments={segments} idealRange={idealRange}
      readout={
        <span data-testid="ap-ld-display" className={`text-[10px] font-mono font-semibold ${r.ldColorClass}`}>
          {r.ldDisplay}
        </span>
      }
    />
  );
}
