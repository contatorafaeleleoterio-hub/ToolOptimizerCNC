/**
 * Feed Rate Calculation Module
 *
 * Formula: Vf = fz_efetivo * Z * n
 * Source: Sandvik Coromant 2023 p.142
 *
 * @param fzEfetivo - Effective feed per tooth (mm/tooth), after CTF correction
 * @param z - Number of flutes
 * @param rpm - Spindle speed (rev/min)
 * @returns Feed rate in mm/min
 * @throws Error if inputs are invalid
 */
export function calculateFeedRate(
  fzEfetivo: number,
  z: number,
  rpm: number,
): number {
  if (fzEfetivo <= 0) {
    throw new Error('Effective feed per tooth (fz) must be greater than 0');
  }
  if (z < 1) {
    throw new Error('Number of flutes (Z) must be at least 1');
  }
  if (rpm <= 0) {
    throw new Error('Spindle speed (RPM) must be greater than 0');
  }

  return fzEfetivo * z * rpm;
}
