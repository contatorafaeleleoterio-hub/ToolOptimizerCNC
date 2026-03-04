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

// Empirical constant: fzEfetivo = diametro × FZ_K gives chipRatio = 1.0 (ideal center)
// Based on industry practice: optimal chip load ≈ 1.7% of tool diameter
const FZ_K = 0.017;

// ---------------------------------------------------------------------------
// Result types
// ---------------------------------------------------------------------------

export interface VcByValueResult { position: number; zone: ZoneId; zoneLabel: string; }
export interface FzResult { position: number; zone: ZoneId; zoneLabel: string; ctfBadge: string | null; }
export interface AeResult { position: number; zone: ZoneId; zoneLabel: string; aeDRatioDisplay: string; }
export interface ApResult { position: number; zone: ZoneId; zoneLabel: string; ldDisplay: string; ldColorClass: string; }

// ---------------------------------------------------------------------------
// Pure computation functions (exported for unit testing)
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
 * Computes chip load health.
 * chipRatio = fzEfetivo / (D × FZ_K); center = 1.0; position = chipRatio - 1 clamped.
 * Also returns a CTF badge string when chip thinning factor is active (ctf > 1.0).
 */
export function computeFzPosition(fzEfetivo: number, diametro: number, ctf: number): FzResult {
  const chipRatio = fzEfetivo / (diametro * FZ_K);
  const position = Math.max(-1, Math.min(1, chipRatio - 1.0));

  let zone: ZoneId;
  let zoneLabel: string;
  if (chipRatio < 0.4)       { zone = 'vermelho'; zoneLabel = 'Atrito';    }
  else if (chipRatio < 0.7)  { zone = 'amarelo';  zoneLabel = 'Leve';      }
  else if (chipRatio <= 1.4) { zone = 'verde';    zoneLabel = 'Ideal';     }
  else if (chipRatio <= 2.0) { zone = 'amarelo';  zoneLabel = 'Agressivo'; }
  else                       { zone = 'vermelho'; zoneLabel = 'Vibração';  }

  const ctfBadge = ctf > 1.0 ? `CTF ×${ctf.toFixed(2)}` : null;

  return { position, zone, zoneLabel, ctfBadge };
}

/**
 * Computes radial engagement health.
 * ae/D ratio with center = 0.50 (exact CTF threshold). Always computable.
 */
export function computeAePosition(ae: number, diametro: number): AeResult {
  const aeDRatio = ae / diametro;
  const center = 0.50;
  const position = Math.max(-1, Math.min(1, (aeDRatio - center) / center));
  const aeDRatioDisplay = `${(aeDRatio * 100).toFixed(1)}%`;

  let zone: ZoneId;
  let zoneLabel: string;
  if (aeDRatio < 0.20)       { zone = 'amarelo'; zoneLabel = 'CTF Alto';     }
  else if (aeDRatio <= 0.50) { zone = 'verde';   zoneLabel = 'CTF Ativo';    }
  else if (aeDRatio <= 0.75) { zone = 'verde';   zoneLabel = 'Engaj. Pleno'; }
  else                       { zone = 'amarelo'; zoneLabel = 'Pesado';       }

  return { position, zone, zoneLabel, aeDRatioDisplay };
}

/**
 * Computes axial depth health, modulated by L/D ratio.
 * The "safe" threshold shrinks as L/D increases (longer tools deflect more).
 * Always computable without resultado.
 */
export function computeApPosition(ap: number, diametro: number, balanco: number): ApResult {
  const ldRatio = balanco / diametro;

  // Threshold for "Agressivo" boundary, scaled by tool overhang
  let limiarAgressivo: number;
  if (ldRatio <= 3)      { limiarAgressivo = 1.5; }
  else if (ldRatio <= 4) { limiarAgressivo = 1.0; }
  else                   { limiarAgressivo = 0.6; }

  const apDRatio = ap / diametro;
  const position = Math.max(-1, Math.min(1, (apDRatio / limiarAgressivo) - 1.0));

  const ldDisplay = `L/D: ${ldRatio.toFixed(1)}`;

  let ldColorClass: string;
  if (ldRatio <= 3)      { ldColorClass = 'text-seg-verde';    }
  else if (ldRatio <= 4) { ldColorClass = 'text-seg-amarelo';  }
  else                   { ldColorClass = 'text-seg-vermelho'; }

  // Zone boundaries scale proportionally with limiarAgressivo
  const leveLimit      = limiarAgressivo / 3;
  const deflexaoLimit  = limiarAgressivo * (5 / 3);
  let zone: ZoneId;
  let zoneLabel: string;
  if (apDRatio < leveLimit)          { zone = 'amarelo';  zoneLabel = 'Leve';      }
  else if (apDRatio <= limiarAgressivo)   { zone = 'verde';    zoneLabel = 'Padrão';   }
  else if (apDRatio <= deflexaoLimit)    { zone = 'amarelo';  zoneLabel = 'Agressivo'; }
  else                                   { zone = 'vermelho'; zoneLabel = 'Deflexão'; }

  return { position, zone, zoneLabel, ldDisplay, ldColorClass };
}

// ---------------------------------------------------------------------------
// Internal render helpers
// ---------------------------------------------------------------------------

interface VcHealthBarProps {
  vc: number;
  vcRecomendado: number;
  vcMax: number;
}

/** Left-based unidirectional health bar for Vc. Always active — no simulation needed. */
function VcHealthBar({ vc, vcRecomendado, vcMax }: VcHealthBarProps) {
  const result = computeVcByValue(vc, vcRecomendado, vcMax);
  const rgb = ZONE_RGB[result.zone];
  const fillPct = result.position * 100;
  const recPct = vcMax > 0 ? Math.min(100, (vcRecomendado / vcMax) * 100) : 50;

  return (
    <div data-testid="health-bar-vc" className="flex flex-col gap-0.5">
      <div className="relative" style={{ height: '14px' }}>
        {/* Track background */}
        <div
          className="absolute inset-x-0 rounded-full"
          style={{ top: '5px', height: '4px', background: 'rgba(0,0,0,0.4)' }}
        />
        {/* Fill from left edge */}
        <div
          data-testid="health-bar-vc-fill"
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
          data-testid="health-bar-vc-rec-tick"
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
      {/* Labels */}
      <div className="flex justify-between items-center">
        <span className="text-[8px] text-gray-700">Baixo</span>
        <span className="text-[8px] font-semibold" style={{ color: `rgba(${rgb},1)` }}>
          {result.zoneLabel}
        </span>
        <span className="text-[8px] text-gray-700">Desgaste</span>
      </div>
    </div>
  );
}

interface ActiveBarProps {
  paramKey: string;
  position: number;     // [-1, 1]
  zone: ZoneId;
  zoneLabel: string;
  leftLabel: string;
  rightLabel: string;
  badge?: string | null;
  readout?: ReactNode;
}

/** Renders the colored bidirectional health bar (active state). */
function ActiveBar({ paramKey, position, zone, zoneLabel, leftLabel, rightLabel, badge, readout }: ActiveBarProps) {
  const rgb = ZONE_RGB[zone];
  const fillWidthPct = Math.abs(position) * 50;
  // Fill starts at 50% (center) if going right, or shifted left if negative
  const fillLeftPct = position >= 0 ? 50 : (0.5 + position * 0.5) * 100;

  return (
    <div data-testid={`health-bar-${paramKey}`} className="flex flex-col gap-0.5">
      {/* Track row */}
      <div className="relative" style={{ height: '14px' }}>
        {/* Track background */}
        <div
          className="absolute inset-x-0 rounded-full"
          style={{ top: '5px', height: '4px', background: 'rgba(0,0,0,0.4)' }}
        />
        {/* Center marker */}
        <div
          className="absolute"
          style={{
            left: '50%', top: '2px',
            width: '1px', height: '10px',
            background: 'rgba(255,255,255,0.25)',
            transform: 'translateX(-50%)',
          }}
        />
        {/* Colored fill extending from center */}
        <div
          data-testid={`health-bar-${paramKey}-fill`}
          className="absolute rounded-full"
          style={{
            top: '5px', height: '4px',
            left: `${fillLeftPct}%`,
            width: `${fillWidthPct}%`,
            backgroundColor: `rgba(${rgb},0.9)`,
            boxShadow: `0 0 6px rgba(${rgb},0.4)`,
          }}
        />
      </div>
      {/* Labels row */}
      <div className="flex justify-between items-center">
        <span className="text-[8px] text-gray-700">{leftLabel}</span>
        <span className="text-[8px] font-semibold" style={{ color: `rgba(${rgb},1)` }}>{zoneLabel}</span>
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

/** Renders a grayed-out inactive bar (vc/fz before Simular). */
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

/** Visual health indicator for a single Fine Tune parameter. */
export function ParameterHealthBar({ paramKey }: ParameterHealthBarProps) {
  const resultado = useMachiningStore((s) => s.resultado);
  const parametros = useMachiningStore((s) => s.parametros);
  const ferramenta = useMachiningStore((s) => s.ferramenta);
  const materialId = useMachiningStore((s) => s.materialId);
  const tipoOperacao = useMachiningStore((s) => s.tipoOperacao);

  const { diametro, balanco } = ferramenta;

  if (paramKey === 'vc') {
    const material = MATERIAIS.find((m) => m.id === materialId) ?? null;
    const vcBounds = calcularSliderBounds(material, ferramenta, tipoOperacao).vc;
    return (
      <VcHealthBar
        vc={parametros.vc}
        vcRecomendado={vcBounds.recomendado}
        vcMax={vcBounds.max}
      />
    );
  }

  if (paramKey === 'fz') {
    if (!resultado) return <InactiveBar paramKey="fz" />;
    const fzResult = computeFzPosition(resultado.fzEfetivo, diametro, resultado.seguranca.ctf);
    return (
      <ActiveBar
        paramKey="fz"
        position={fzResult.position}
        zone={fzResult.zone}
        zoneLabel={fzResult.zoneLabel}
        leftLabel="Atrito"
        rightLabel="Vibração"
        badge={fzResult.ctfBadge}
      />
    );
  }

  if (paramKey === 'ae') {
    const aeResult = computeAePosition(parametros.ae, diametro);
    return (
      <ActiveBar
        paramKey="ae"
        position={aeResult.position}
        zone={aeResult.zone}
        zoneLabel={aeResult.zoneLabel}
        leftLabel="CTF Alto"
        rightLabel="Pesado"
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
  const apResult = computeApPosition(parametros.ap, diametro, balanco);
  return (
    <ActiveBar
      paramKey="ap"
      position={apResult.position}
      zone={apResult.zone}
      zoneLabel={apResult.zoneLabel}
      leftLabel="Leve"
      rightLabel="Deflexão"
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
