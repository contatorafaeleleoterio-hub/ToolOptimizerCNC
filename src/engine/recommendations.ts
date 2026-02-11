/**
 * Recommended cutting parameter engine for ToolOptimizer CNC
 * Provides sensible defaults based on material, operation type, and tool diameter.
 */

import type { Material, ParametrosUsinagem } from '@/types';
import { TipoUsinagem } from '@/types';

/** Recommended ap/ae multipliers relative to tool diameter */
const AP_MULT: Record<TipoUsinagem, number> = {
  [TipoUsinagem.DESBASTE]: 1.0,       // ap = 1.0 × D (max)
  [TipoUsinagem.SEMI_ACABAMENTO]: 0.5, // ap = 0.5 × D
  [TipoUsinagem.ACABAMENTO]: 0.15,     // ap = 0.15 × D
};

const AE_MULT: Record<TipoUsinagem, number> = {
  [TipoUsinagem.DESBASTE]: 0.5,        // ae = 50% D
  [TipoUsinagem.SEMI_ACABAMENTO]: 0.3, // ae = 30% D
  [TipoUsinagem.ACABAMENTO]: 0.1,      // ae = 10% D
};

const FZ_BASE: Record<TipoUsinagem, number> = {
  [TipoUsinagem.DESBASTE]: 0.10,
  [TipoUsinagem.SEMI_ACABAMENTO]: 0.07,
  [TipoUsinagem.ACABAMENTO]: 0.04,
};

/**
 * Get recommended cutting parameters for given material + operation + tool diameter.
 * Uses midpoint of Vc range, and engineering-based ap/ae/fz defaults.
 */
export function getRecommendedParams(
  material: Material,
  tipoOperacao: TipoUsinagem,
  diametro: number,
): ParametrosUsinagem {
  const vcRange = material.vcRanges[tipoOperacao];
  const vc = Math.round((vcRange[0] + vcRange[1]) / 2);

  const apRaw = diametro * AP_MULT[tipoOperacao];
  const ap = Math.round(apRaw * 10) / 10; // round to 0.1

  const aeRaw = diametro * AE_MULT[tipoOperacao];
  const ae = Math.round(aeRaw * 10) / 10;

  const fz = FZ_BASE[tipoOperacao];

  return {
    ap: Math.max(0.1, ap),
    ae: Math.max(0.1, ae),
    fz,
    vc,
  };
}
