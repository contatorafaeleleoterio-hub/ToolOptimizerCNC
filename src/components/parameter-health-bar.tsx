import type { ReactNode } from 'react';
import { useMachiningStore } from '@/store';
import { MATERIAIS } from '@/data';
import { calcularSliderBounds } from '@/engine';

export type ZoneId = 'verde' | 'amarelo' | 'vermelho';

// Static RGB lookup — never interpolate zone into Tailwind class names (Tailwind v4 purge)
const ZONE_RGB: Record<ZoneId, string> = {
  verde:    '46,204,113',
  amarelo:  '243,156,18',
  vermelho: '231,76,60',
};

// ---------------------------------------------------------------------------
// Result types
// ---------------------------------------------------------------------------

export interface VcByValueResult { position: number; zone: ZoneId; zoneLabel: string; }
export interface FzByValueResult { position: number; zone: ZoneId; zoneLabel: string; ctfBadge: string | null; }
export interface AeByValueResult { position: number; zone: ZoneId; zoneLabel: string; aeDRatioDisplay: string; }
export interface ApByValueResult { position: number; zone: ZoneId; zoneLabel: string; ldDisplay: string; ldColorClass: string; }

// ---------------------------------------------------------------------------
// Pure computation functions (exported for unit testing)
// All use unidirectional position [0, 1] and ratio-based zone classification.
// ---------------------------------------------------------------------------

/**
 * Computes Vc health based on slider value vs recommended.
 * position [0, 1]: 0 = Vc zero, 1 = vcMax.
 * Always computable without simulation result.
 * Zone based on vc/vcRecomendado ratio — both too low and too high are bad.
 */
export function computeVcByValue(vc: number, vcRecomendado: number, vcMax: number): VcByValueResult {
  const position = vcMax > 0 ? Math.min(1, vc / vcMax) : 0;
  const ratio = vcRecomendado > 0 ? vc / vcRecomendado : 0;

  let zone: ZoneId;
  let zoneLabel: string;
  if (ratio < 0.50)       { zone = 'vermelho'; zoneLabel = 'Baixo';       }
  else if (ratio < 0.75)  { zone = 'amarelo';  zoneLabel = 'Sub-ótimo';   }
  else if (ratio <= 1.20) { zone = 'verde';    zoneLabel = 'Recomendado'; }
  else if (ratio <= 1.50) { zone = 'amarelo';  zoneLabel = 'Alerta';      }
  else                    { zone = 'vermelho'; zoneLabel = 'Desgaste';    }

  return { position, zone, zoneLabel };
}

/**
 * Computes chip load health — unidirectional [0, 1].
 * position = fzEfetivo / fzMax; zone based on fzEfetivo / fzRecomendado ratio.
 * Uses dynamic bounds from calcularSliderBounds (fzMax, fzRecomendado).
 * Also returns a CTF badge string when chip thinning factor is active (ctf > 1.0).
 */
export function computeFzByValue(
  fzEfetivo: number, fzRecomendado: number, fzMax: number, ctf: number
): FzByValueResult {
  const position = fzMax > 0 ? Math.min(1, Math.max(0, fzEfetivo / fzMax)) : 0;
  const ratio = fzRecomendado > 0 ? fzEfetivo / fzRecomendado : 0;

  let zone: ZoneId;
  let zoneLabel: string;
  if (ratio < 0.50)       { zone = 'vermelho'; zoneLabel = 'Atrito';    }
  else if (ratio < 0.75)  { zone = 'amarelo';  zoneLabel = 'Leve';      }
  else if (ratio <= 1.20) { zone = 'verde';    zoneLabel = 'Ideal';     }
  else if (ratio <= 1.50) { zone = 'amarelo';  zoneLabel = 'Agressivo'; }
  else                    { zone = 'vermelho'; zoneLabel = 'Vibração';  }

  const ctfBadge = ctf > 1.0 ? `CTF ×${ctf.toFixed(2)}` : null;

  return { position, zone, zoneLabel, ctfBadge };
}

/**
 * Computes radial engagement health — unidirectional [0, 1].
 * position = ae / aeMax; zone based on ae / aeRecomendado ratio.
 * Uses dynamic bounds from calcularSliderBounds (aeMax, aeRecomendado).
 * Always computable without simulation result.
 */
export function computeAeByValue(
  ae: number, aeRecomendado: number, aeMax: number, diametro: number
): AeByValueResult {
  const position = aeMax > 0 ? Math.min(1, Math.max(0, ae / aeMax)) : 0;
  const ratio = aeRecomendado > 0 ? ae / aeRecomendado : 0;
  const aeDRatio = diametro > 0 ? ae / diametro : 0;

  let zone: ZoneId;
  let zoneLabel: string;
  if (ratio < 0.50)       { zone = 'amarelo';  zoneLabel = 'CTF Alto';   }
  else if (ratio <= 1.20) { zone = 'verde';    zoneLabel = 'Ideal';      }
  else if (ratio <= 1.50) { zone = 'amarelo';  zoneLabel = 'Pesado';     }
  else                    { zone = 'vermelho'; zoneLabel = 'Excessivo';  }

  const aeDRatioDisplay = `${(aeDRatio * 100).toFixed(0)}% D`;
  return { position, zone, zoneLabel, aeDRatioDisplay };
}

/**
 * Computes axial depth health — unidirectional [0, 1], with L/D safety check.
 * position = ap / apMax; zone based on ap / apRecomendado ratio.
 * Uses dynamic bounds from calcularSliderBounds (apMax, apRecomendado).
 * L/D > 6 forces zone = vermelho / BLOQUEADO regardless of ap ratio.
 * Always computable without simulation result.
 */
export function computeApByValue(
  ap: number, apRecomendado: number, apMax: number,
  diametro: number, balanco: number
): ApByValueResult {
  const ldRatio = diametro > 0 ? balanco / diametro : 0;
  const position = apMax > 0 ? Math.min(1, Math.max(0, ap / apMax)) : 0;
  const ratio = apRecomendado > 0 ? ap / apRecomendado : 0;

  let zone: ZoneId;
  let zoneLabel: string;
  if (ldRatio > 6)        { zone = 'vermelho'; zoneLabel = 'BLOQUEADO';  }
  else if (ratio < 0.50)  { zone = 'amarelo';  zoneLabel = 'Leve';      }
  else if (ratio <= 1.20) { zone = 'verde';    zoneLabel = 'Padrão';    }
  else if (ratio <= 1.50) { zone = 'amarelo';  zoneLabel = 'Agressivo'; }
  else                    { zone = 'vermelho'; zoneLabel = 'Deflexão';  }

  // L/D color class
  let ldColorClass: string;
  if (ldRatio <= 3)      { ldColorClass = 'text-seg-verde';    }
  else if (ldRatio < 4)  { ldColorClass = 'text-seg-amarelo';  }
  else                   { ldColorClass = 'text-seg-vermelho'; }

  const ldDisplay = `L/D: ${ldRatio.toFixed(1)}`;

  return { position, zone, zoneLabel, ldDisplay, ldColorClass };
}

// ---------------------------------------------------------------------------
// Internal render helpers — all unidirectional (left → right)
// ---------------------------------------------------------------------------

interface UnidirectionalBarProps {
  paramKey: string;
  position: number;       // [0, 1]
  zone: ZoneId;
  zoneLabel: string;
  leftLabel: string;
  rightLabel: string;
  recPct: number;         // recommended tick mark position (0–100%)
  badge?: string | null;
  readout?: ReactNode;
}

/** Renders a unidirectional health bar: fill grows from left, tick at recommended. */
function UnidirectionalBar({
  paramKey, position, zone, zoneLabel, leftLabel, rightLabel, recPct, badge, readout,
}: UnidirectionalBarProps) {
  const rgb = ZONE_RGB[zone];
  const fillPct = position * 100;

  return (
    <div data-testid={`health-bar-${paramKey}`} className="flex flex-col gap-0.5">
      <div className="relative" style={{ height: '14px' }}>
        {/* Track background */}
        <div
          className="absolute inset-x-0 rounded-full"
          style={{ top: '5px', height: '4px', background: 'rgba(0,0,0,0.4)' }}
        />
        {/* Fill from left edge */}
        <div
          data-testid={`health-bar-${paramKey}-fill`}
          className="absolute rounded-full"
          style={{
            top: '5px', height: '4px',
            left: 0,
            width: `${fillPct}%`,
            backgroundColor: `rgba(${rgb},0.9)`,
            boxShadow: `0 0 6px rgba(${rgb},0.4)`,
          }}
        />
        {/* Recommended tick mark */}
        <div
          data-testid={`health-bar-${paramKey}-rec-tick`}
          className="absolute"
          style={{
            left: `${recPct}%`,
            top: '2px',
            width: '1px',
            height: '10px',
            background: 'rgba(255,255,255,0.35)',
            transform: 'translateX(-50%)',
          }}
        />
      </div>
      {/* Labels row */}
      <div className="flex justify-between items-center">
        <span className="text-[8px] text-gray-700">{leftLabel}</span>
        <span className="text-[8px] font-semibold" style={{ color: `rgba(${rgb},1)` }}>
          {zoneLabel}
        </span>
        {badge && (
          <span
            data-testid="ctf-badge"
            className="text-[8px] font-bold px-1 rounded"
            style={{ background: 'rgba(243,156,18,0.15)', color: 'rgba(243,156,18,0.9)' }}
          >
            {badge}
          </span>
        )}
        {readout}
        <span className="text-[8px] text-gray-700">{rightLabel}</span>
      </div>
    </div>
  );
}

/** Renders a grayed-out inactive bar (fz before Simular). */
function InactiveBar({ paramKey }: { paramKey: string }) {
  return (
    <div data-testid={`health-bar-${paramKey}`} className="flex flex-col gap-0.5">
      <div data-testid={`health-bar-${paramKey}-inactive`} className="relative" style={{ height: '14px' }}>
        {/* Dimmed track */}
        <div
          className="absolute inset-x-0 rounded-full"
          style={{ top: '5px', height: '4px', background: 'rgba(255,255,255,0.06)' }}
        />
        {/* Dimmed center marker */}
        <div
          className="absolute"
          style={{
            left: '50%', top: '2px',
            width: '1px', height: '10px',
            background: 'rgba(255,255,255,0.10)',
            transform: 'translateX(-50%)',
          }}
        />
      </div>
      <span className="text-[8px] text-gray-700 italic text-center leading-none">Simular para ativar</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main exported component
// ---------------------------------------------------------------------------

interface ParameterHealthBarProps {
  paramKey: 'vc' | 'fz' | 'ae' | 'ap';
}

/** Visual health indicator for a single Fine Tune parameter. All unidirectional. */
export function ParameterHealthBar({ paramKey }: ParameterHealthBarProps) {
  const resultado = useMachiningStore((s) => s.resultado);
  const parametros = useMachiningStore((s) => s.parametros);
  const ferramenta = useMachiningStore((s) => s.ferramenta);
  const materialId = useMachiningStore((s) => s.materialId);
  const tipoOperacao = useMachiningStore((s) => s.tipoOperacao);

  const material = MATERIAIS.find((m) => m.id === materialId) ?? null;
  const bounds = calcularSliderBounds(material, ferramenta, tipoOperacao);

  if (paramKey === 'vc') {
    const vcResult = computeVcByValue(parametros.vc, bounds.vc.recomendado, bounds.vc.max);
    const recPct = bounds.vc.max > 0 ? Math.min(100, (bounds.vc.recomendado / bounds.vc.max) * 100) : 50;
    return (
      <UnidirectionalBar
        paramKey="vc"
        position={vcResult.position}
        zone={vcResult.zone}
        zoneLabel={vcResult.zoneLabel}
        leftLabel="Baixo"
        rightLabel="Desgaste"
        recPct={recPct}
      />
    );
  }

  if (paramKey === 'fz') {
    if (!resultado) return <InactiveBar paramKey="fz" />;
    const fzResult = computeFzByValue(
      resultado.fzEfetivo, bounds.fz.recomendado, bounds.fz.max, resultado.seguranca.ctf,
    );
    const recPct = bounds.fz.max > 0 ? Math.min(100, (bounds.fz.recomendado / bounds.fz.max) * 100) : 50;
    return (
      <UnidirectionalBar
        paramKey="fz"
        position={fzResult.position}
        zone={fzResult.zone}
        zoneLabel={fzResult.zoneLabel}
        leftLabel="Atrito"
        rightLabel="Vibração"
        recPct={recPct}
        badge={fzResult.ctfBadge}
      />
    );
  }

  if (paramKey === 'ae') {
    const aeResult = computeAeByValue(
      parametros.ae, bounds.ae.recomendado, bounds.ae.max, ferramenta.diametro,
    );
    const recPct = bounds.ae.max > 0 ? Math.min(100, (bounds.ae.recomendado / bounds.ae.max) * 100) : 50;
    return (
      <UnidirectionalBar
        paramKey="ae"
        position={aeResult.position}
        zone={aeResult.zone}
        zoneLabel={aeResult.zoneLabel}
        leftLabel="CTF Alto"
        rightLabel="Excessivo"
        recPct={recPct}
        readout={
          <span
            data-testid="ae-ratio-display"
            className="text-[8px] text-gray-500 font-mono"
          >
            {aeResult.aeDRatioDisplay}
          </span>
        }
      />
    );
  }

  // ap
  const apResult = computeApByValue(
    parametros.ap, bounds.ap.recomendado, bounds.ap.max,
    ferramenta.diametro, ferramenta.balanco,
  );
  const recPct = bounds.ap.max > 0 ? Math.min(100, (bounds.ap.recomendado / bounds.ap.max) * 100) : 50;
  return (
    <UnidirectionalBar
      paramKey="ap"
      position={apResult.position}
      zone={apResult.zone}
      zoneLabel={apResult.zoneLabel}
      leftLabel="Leve"
      rightLabel="Deflexão"
      recPct={recPct}
      readout={
        <span
          data-testid="ap-ld-display"
          className={`text-[8px] font-mono font-semibold ${apResult.ldColorClass}`}
        >
          {apResult.ldDisplay}
        </span>
      }
    />
  );
}
