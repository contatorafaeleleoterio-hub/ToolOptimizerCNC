export type ZoneId = 'verde' | 'amarelo' | 'vermelho';

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
// Consumed by segmented-gradient-bar.tsx for the visual health indicator.
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
