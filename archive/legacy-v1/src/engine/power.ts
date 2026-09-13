/**
 * MRR, Power, and Torque Calculation Module
 *
 * Formulas:
 *   MRR: Q = (ap * ae * Vf) / 1000  [cm3/min]
 *   Power: Pc = (Q * Kc) / (60000 * eta)  [kW]
 *   Torque: M = (Pc * 9549) / n  [Nm]
 *
 * Sources: ASM Handbook Vol.16, DIN 6584
 */

/**
 * Calculate Material Removal Rate (MRR).
 *
 * @param ap - Axial depth of cut (mm)
 * @param ae - Radial depth of cut (mm)
 * @param vf - Feed rate (mm/min)
 * @returns MRR in cm3/min
 */
export function calculateMRR(ap: number, ae: number, vf: number): number {
  if (ap <= 0) {
    throw new Error('Axial depth (ap) must be greater than 0');
  }
  if (ae <= 0) {
    throw new Error('Radial depth (ae) must be greater than 0');
  }
  if (vf <= 0) {
    throw new Error('Feed rate (Vf) must be greater than 0');
  }

  return (ap * ae * vf) / 1000;
}

/**
 * Calculate cutting power.
 *
 * @param mrr - Material removal rate (cm3/min)
 * @param kc - Specific cutting force (N/mm2)
 * @param efficiency - Machine efficiency (0 < eta <= 1), default 0.80
 * @returns Power in kW
 */
export function calculatePower(
  mrr: number,
  kc: number,
  efficiency: number,
): number {
  if (mrr <= 0) {
    throw new Error('MRR must be greater than 0');
  }
  if (kc <= 0) {
    throw new Error('Specific cutting force (Kc) must be greater than 0');
  }
  if (efficiency <= 0 || efficiency > 1) {
    throw new Error('Efficiency must be between 0 (exclusive) and 1 (inclusive)');
  }

  return (mrr * kc) / (60000 * efficiency);
}

/**
 * Calculate spindle torque.
 *
 * @param power - Cutting power (kW)
 * @param rpm - Spindle speed (rev/min)
 * @returns Torque in Nm
 */
export function calculateTorque(power: number, rpm: number): number {
  if (power <= 0) {
    throw new Error('Power must be greater than 0');
  }
  if (rpm <= 0) {
    throw new Error('Spindle speed (RPM) must be greater than 0');
  }

  return (power * 9549) / rpm;
}
