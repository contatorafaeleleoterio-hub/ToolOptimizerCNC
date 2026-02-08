/**
 * RPM Calculation Module
 *
 * Formula: n = (Vc * 1000) / (pi * D)
 * Source: ISO 3685:2017, Sandvik Coromant p.142
 *
 * @param vc - Cutting speed (m/min)
 * @param d - Tool diameter (mm)
 * @returns Spindle speed in RPM
 * @throws Error if vc <= 0 or d <= 0
 */
export function calculateRPM(vc: number, d: number): number {
  if (vc <= 0) {
    throw new Error('Cutting speed (Vc) must be greater than 0');
  }
  if (d <= 0) {
    throw new Error('Tool diameter (D) must be greater than 0');
  }

  return (vc * 1000) / (Math.PI * d);
}
