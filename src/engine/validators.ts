/**
 * Validation Module for CNC machining parameters
 *
 * Validates:
 * - L/D ratio (tool overhang safety)
 * - Input parameter ranges
 * - Machine physical limits
 *
 * Source: Sandvik Coromant, ISO 3685:2017
 */

import type { LimitesMaquina } from '@/types/index';
import { REGRAS_SEGURANCA } from '@/types/index';

type NivelSeguranca = 'verde' | 'amarelo' | 'vermelho' | 'bloqueado';

/**
 * Validate L/D ratio and return safety level.
 *
 * - L/D <= 3: verde (safe)
 * - L/D 3-4: amarelo (warning)
 * - L/D 4-6: vermelho (critical)
 * - L/D > 6: bloqueado (blocked in MVP)
 *
 * @param l - Tool overhang length (mm)
 * @param d - Tool diameter (mm)
 * @returns Safety level string
 */
export function validateLDRatio(l: number, d: number): NivelSeguranca {
  if (d <= 0) {
    throw new Error('Tool diameter (D) must be greater than 0');
  }
  if (l <= 0) {
    throw new Error('Tool overhang (L) must be greater than 0');
  }

  const ratio = l / d;

  if (ratio <= REGRAS_SEGURANCA.LD.SEGURO) return 'verde';
  if (ratio < REGRAS_SEGURANCA.LD.ALERTA) return 'amarelo';
  if (ratio <= REGRAS_SEGURANCA.LD.CRITICO) return 'vermelho';
  return 'bloqueado';
}

export interface InputParams {
  d: number;
  ap: number;
  ae: number;
  fz: number;
  vc: number;
  z: number;
}

/**
 * Validate all machining input parameters.
 *
 * @throws Error with descriptive message for invalid inputs
 */
export function validateInputs(params: InputParams): void {
  if (params.d <= 0) throw new Error('Diameter (D) must be greater than 0');
  if (params.ap <= 0) throw new Error('Axial depth (ap) must be greater than 0');
  if (params.ae <= 0) throw new Error('Radial depth (ae) must be greater than 0');
  if (params.ae > params.d)
    throw new Error('Radial depth (ae) cannot exceed diameter (D)');
  if (params.fz <= 0) throw new Error('Feed per tooth (fz) must be greater than 0');
  if (params.vc <= 0) throw new Error('Cutting speed (Vc) must be greater than 0');
  if (params.z < 1) throw new Error('Number of flutes (Z) must be at least 1');
}

export interface CalculatedValues {
  rpm: number;
  power: number;
  feed: number;
}

/**
 * Validate calculated results against machine physical limits.
 *
 * @returns Array of warning messages (empty if all within limits)
 */
export function validateMachineLimits(
  values: CalculatedValues,
  limits: LimitesMaquina,
): string[] {
  const warnings: string[] = [];

  if (values.rpm > limits.maxRPM) {
    warnings.push(
      `RPM (${Math.round(values.rpm)}) excede limite da máquina (${limits.maxRPM})`,
    );
  }

  if (values.power > limits.maxPotencia) {
    warnings.push(
      `Potência (${values.power.toFixed(2)} kW) excede limite da máquina (${limits.maxPotencia} kW)`,
    );
  }

  if (values.feed > limits.maxAvanco) {
    warnings.push(
      `Avanço (${Math.round(values.feed)} mm/min) excede limite da máquina (${limits.maxAvanco} mm/min)`,
    );
  }

  return warnings;
}
