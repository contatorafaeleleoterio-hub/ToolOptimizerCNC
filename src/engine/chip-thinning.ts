/**
 * Chip Thinning Factor (CTF) Calculation Module
 *
 * When radial engagement (ae) is less than 50% of tool diameter (D),
 * the actual chip thickness is reduced. To maintain the intended chip load,
 * the feed per tooth must be compensated.
 *
 * Formula: when ae < 50%D -> fz_corr = fz / sqrt(ae/D)
 * Source: Sandvik Coromant - Modern Metal Cutting 2023
 */

export interface ChipThinningResult {
  fzEfetivo: number;
  ctfApplied: boolean;
  ctfFactor: number;
}

/**
 * Calculate effective feed per tooth with chip thinning compensation.
 *
 * @param fz - Feed per tooth (mm/tooth)
 * @param ae - Radial depth of cut (mm)
 * @param d - Tool diameter (mm)
 * @returns Effective fz and CTF metadata
 * @throws Error if inputs are invalid
 */
export function calculateEffectiveFz(
  fz: number,
  ae: number,
  d: number,
): ChipThinningResult {
  if (fz <= 0) {
    throw new Error('Feed per tooth (fz) must be greater than 0');
  }
  if (ae <= 0) {
    throw new Error('Radial depth of cut (ae) must be greater than 0');
  }
  if (d <= 0) {
    throw new Error('Tool diameter (D) must be greater than 0');
  }
  if (ae > d) {
    throw new Error('Radial depth (ae) cannot exceed tool diameter (D)');
  }

  const ratio = ae / d;

  if (ratio >= 0.5) {
    return { fzEfetivo: fz, ctfApplied: false, ctfFactor: 1.0 };
  }

  // CTF: fz_corr = fz / sqrt(ae/D)
  const sqrtRatio = Math.sqrt(ratio);
  const fzCorrigido = fz / sqrtRatio;

  return {
    fzEfetivo: fzCorrigido,
    ctfApplied: true,
    ctfFactor: 1 / sqrtRatio,
  };
}
