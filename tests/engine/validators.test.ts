import { describe, it, expect } from 'vitest';
import {
  validateLDRatio,
  validateInputs,
  validateMachineLimits,
} from '@/engine/validators';
import { LIMITES_PADRAO_MAQUINA } from '@/types/index';

describe('validateLDRatio', () => {
  it('L/D <= 3 -> verde', () => {
    expect(validateLDRatio(30, 12)).toBe('verde'); // 2.5
    expect(validateLDRatio(36, 12)).toBe('verde'); // 3.0
  });

  it('L/D 3-4 -> amarelo', () => {
    expect(validateLDRatio(42, 12)).toBe('amarelo'); // 3.5
  });

  it('L/D 4-6 -> vermelho', () => {
    expect(validateLDRatio(48, 12)).toBe('vermelho'); // 4.0
    expect(validateLDRatio(60, 12)).toBe('vermelho'); // 5.0
    expect(validateLDRatio(72, 12)).toBe('vermelho'); // 6.0
  });

  it('L/D > 6 -> bloqueado', () => {
    expect(validateLDRatio(73, 12)).toBe('bloqueado'); // 6.08
    expect(validateLDRatio(100, 10)).toBe('bloqueado'); // 10.0
  });

  it('should throw when D <= 0', () => {
    expect(() => validateLDRatio(30, 0)).toThrow();
  });

  it('should throw when L <= 0', () => {
    expect(() => validateLDRatio(0, 12)).toThrow();
  });
});

describe('validateInputs', () => {
  it('accepts valid inputs', () => {
    expect(() =>
      validateInputs({ d: 12, ap: 3, ae: 6, fz: 0.08, vc: 100, z: 4 }),
    ).not.toThrow();
  });

  it('throws when D <= 0', () => {
    expect(() =>
      validateInputs({ d: 0, ap: 3, ae: 6, fz: 0.08, vc: 100, z: 4 }),
    ).toThrow();
  });

  it('throws when ap <= 0', () => {
    expect(() =>
      validateInputs({ d: 12, ap: 0, ae: 6, fz: 0.08, vc: 100, z: 4 }),
    ).toThrow();
  });

  it('throws when ae <= 0', () => {
    expect(() =>
      validateInputs({ d: 12, ap: 3, ae: 0, fz: 0.08, vc: 100, z: 4 }),
    ).toThrow();
  });

  it('throws when ae > D', () => {
    expect(() =>
      validateInputs({ d: 12, ap: 3, ae: 15, fz: 0.08, vc: 100, z: 4 }),
    ).toThrow();
  });

  it('throws when fz <= 0', () => {
    expect(() =>
      validateInputs({ d: 12, ap: 3, ae: 6, fz: 0, vc: 100, z: 4 }),
    ).toThrow();
  });

  it('throws when Vc <= 0', () => {
    expect(() =>
      validateInputs({ d: 12, ap: 3, ae: 6, fz: 0.08, vc: 0, z: 4 }),
    ).toThrow();
  });

  it('throws when Z < 1', () => {
    expect(() =>
      validateInputs({ d: 12, ap: 3, ae: 6, fz: 0.08, vc: 100, z: 0 }),
    ).toThrow();
  });
});

describe('validateMachineLimits', () => {
  const limits = LIMITES_PADRAO_MAQUINA;

  it('returns empty warnings when all within limits', () => {
    const warnings = validateMachineLimits(
      { rpm: 3000, power: 5, feed: 2000 },
      limits,
    );
    expect(warnings).toHaveLength(0);
  });

  it('warns when RPM exceeds maxRPM', () => {
    const warnings = validateMachineLimits(
      { rpm: 15000, power: 5, feed: 2000 },
      limits,
    );
    expect(warnings.length).toBeGreaterThan(0);
    expect(warnings.some((w) => w.includes('RPM'))).toBe(true);
  });

  it('warns when power exceeds maxPotencia', () => {
    const warnings = validateMachineLimits(
      { rpm: 3000, power: 20, feed: 2000 },
      limits,
    );
    expect(warnings.length).toBeGreaterThan(0);
    expect(warnings.some((w) => w.toLowerCase().includes('pot'))).toBe(true);
  });

  it('warns when feed exceeds maxAvanco', () => {
    const warnings = validateMachineLimits(
      { rpm: 3000, power: 5, feed: 6000 },
      limits,
    );
    expect(warnings.length).toBeGreaterThan(0);
    expect(warnings.some((w) => w.toLowerCase().includes('avan'))).toBe(true);
  });
});
